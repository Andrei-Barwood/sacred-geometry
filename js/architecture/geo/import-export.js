import { stripDangerousKeys } from "../storage/sanitizer.js";
import { LIMITS } from "../storage/schema.js";
import { DUPLICATE_METERS, EMPTY_WARNINGS, MAX_GRID_FEATURES, MAX_RESTRICTIONS, MAX_SITES } from "./constants.js";
import { detectCrs, haversineMeters } from "./geometry.js";
import { createSite } from "./site-model.js";
import { createRestriction, restrictionsFromGeoJSON } from "./restriction-model.js";
import { parseGridNetwork } from "./grid-network.js";
import { evidenceSummary, siteEvidenceCoverage } from "./evidence-bundle.js";

export function findDuplicateSite(sites, lng, lat, meters = DUPLICATE_METERS) {
  for (const s of sites || []) {
    if (s.lng == null || s.lat == null) continue;
    const d = haversineMeters(lng, lat, s.lng, s.lat);
    if (d != null && d < meters) return { site: s, meters: d };
  }
  return null;
}

function featureLngLat(feature) {
  const g = feature?.geometry;
  if (!g) return null;
  if (g.type === "Point") return { lng: g.coordinates[0], lat: g.coordinates[1] };
  if (g.type === "MultiPoint" && g.coordinates[0]) return { lng: g.coordinates[0][0], lat: g.coordinates[0][1] };
  return null;
}

export function parseSitesGeoJSON(textOrObj, existing = []) {
  let obj = textOrObj;
  if (typeof textOrObj === "string") {
    if (textOrObj.length > LIMITS.maxImportBytes) {
      return { ok: false, error: "File exceeds the import size limit.", sites: [], skipped: [], restrictions: [], gridNetwork: null };
    }
    try {
      obj = JSON.parse(textOrObj);
    } catch {
      return { ok: false, error: "Invalid JSON.", sites: [], skipped: [], restrictions: [], gridNetwork: null };
    }
  }
  obj = stripDangerousKeys(obj);
  const crs = detectCrs(obj);
  if (!crs.ok) return { ok: false, error: crs.error, sites: [], skipped: [], restrictions: [], gridNetwork: null };

  const features = obj?.type === "FeatureCollection" ? obj.features || [] : obj?.type === "Feature" ? [obj] : [];
  const sites = [];
  const skipped = [];
  const acc = [...(existing || [])];

  for (const f of features) {
    const pt = featureLngLat(f);
    if (!pt) continue;
    const p = f.properties || {};
    const site = createSite({
      ...p,
      lat: pt.lat,
      lng: pt.lng,
      name: p.name || p.title,
    });
    if (site.lat == null) {
      skipped.push({ reason: site.coordError || "invalid coordinates", name: site.name });
      continue;
    }
    const dup = findDuplicateSite([...acc, ...sites], site.lng, site.lat);
    if (dup) {
      skipped.push({ reason: `duplicate within ${Math.round(dup.meters)} m of ${dup.site.name}`, name: site.name });
      continue;
    }
    if (sites.length + acc.length >= MAX_SITES) {
      skipped.push({ reason: "site limit", name: site.name });
      continue;
    }
    sites.push(site);
  }

  const rest = restrictionsFromGeoJSON(obj);
  const grid = parseGridNetwork(obj);
  const restrictions = (rest.restrictions || []).slice(0, MAX_RESTRICTIONS);
  let gridNetwork = null;
  if (grid.ok) {
    gridNetwork = {
      type: "FeatureCollection",
      features: grid.collection.features.slice(0, MAX_GRID_FEATURES),
    };
  }

  return {
    ok: sites.length > 0 || restrictions.length > 0 || !!gridNetwork,
    error: sites.length || restrictions.length || gridNetwork ? null : "No Point sites, restriction polygons, or grid lines found.",
    sites,
    skipped,
    restrictions,
    gridNetwork,
    warnings: [
      ...skipped.map((s) => s.reason),
      rest.ok ? null : rest.error,
      grid.ok || !features.some((f) => /LineString|Point/.test(f?.geometry?.type) && /feeder|substation|connection/i.test(JSON.stringify(f.properties || {})))
        ? null
        : EMPTY_WARNINGS.INCOMPLETE_GRID,
    ].filter(Boolean),
  };
}

function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") out.push(cur), (cur = "");
    else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

export function parseSitesCSV(text, existing = []) {
  const raw = String(text || "");
  if (raw.length > LIMITS.maxImportBytes) {
    return { ok: false, error: "File exceeds the import size limit.", sites: [], skipped: [] };
  }
  const lines = raw
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((l) => l.trim());
  if (!lines.length) return { ok: false, error: "Empty CSV.", sites: [], skipped: [] };
  const header = splitCsvLine(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, ""));
  const idx = (names) => {
    for (const n of names) {
      const i = header.indexOf(n);
      if (i >= 0) return i;
    }
    return -1;
  };
  const iLat = idx(["lat", "latitude", "y"]);
  const iLng = idx(["lng", "lon", "long", "longitude", "x"]);
  if (iLat < 0 || iLng < 0) return { ok: false, error: "CSV needs lat and lon columns.", sites: [], skipped: [] };
  const sites = [];
  const skipped = [];
  const acc = [...(existing || [])];
  for (let r = 1; r < lines.length; r++) {
    const cols = splitCsvLine(lines[r]);
    const pick = (names) => {
      const i = idx(names);
      return i >= 0 ? cols[i] : "";
    };
    const site = createSite({
      name: pick(["name", "nombre", "title"]),
      lat: cols[iLat],
      lng: cols[iLng],
      region: pick(["region"]),
      comuna: pick(["comuna", "commune", "municipality"]),
      country: pick(["country"]),
      altitudeM: pick(["altitudem", "altitude", "elev", "elevation"]),
      landUse: pick(["landuse", "land_use", "uso"]),
      owner: pick(["owner", "titular"]),
      notes: pick(["notes", "notas"]),
      status: pick(["status", "estado"]) || "candidato",
    });
    if (site.lat == null) {
      skipped.push({ reason: site.coordError || "invalid coordinates", name: site.name });
      continue;
    }
    const dup = findDuplicateSite([...acc, ...sites], site.lng, site.lat);
    if (dup) {
      skipped.push({ reason: `duplicate within ${Math.round(dup.meters)} m of ${dup.site.name}`, name: site.name });
      continue;
    }
    if (sites.length + acc.length >= MAX_SITES) break;
    sites.push(site);
  }
  return { ok: sites.length > 0, error: sites.length ? null : "No valid rows.", sites, skipped };
}

export function sitesToGeoJSON(geo, project, evaluations = {}) {
  const g = geo || { sites: [] };
  const features = (g.sites || []).map((s) => {
    const cov = siteEvidenceCoverage(s, project);
    const ev = evidenceSummary(s.evidence);
    const prox = evaluations[s.id]?.proximity || null;
    const rest = (evaluations[s.id]?.restrictions || []).map((r) => r.id);
    return {
      type: "Feature",
      geometry: s.lng != null && s.lat != null ? { type: "Point", coordinates: [s.lng, s.lat] } : null,
      properties: {
        id: s.id,
        name: s.name,
        status: s.status,
        region: s.region,
        comuna: s.comuna,
        country: s.country,
        altitudeM: s.altitudeM,
        landUse: s.landUse,
        owner: s.owner,
        notes: s.notes,
        evidenceCount: ev.count,
        evidenceTitles: ev.titles,
        sourceIds: ev.sourceIds,
        evidenceCoveragePercent: cov.percent,
        restrictionIds: rest,
        gridProximityClass: prox?.clase || null,
        gridDistanceKm: prox?.distancia_km ?? null,
        anchoredArchitectureId: s.anchoredArchitectureId,
      },
    };
  });
  const restrictionFeatures = (g.restrictions || [])
    .filter((r) => r.geometry)
    .map((r) => ({
      type: "Feature",
      geometry: r.geometry,
      properties: {
        id: r.id,
        name: r.name,
        kind: "restriction",
        type: r.type,
        severity: r.severity,
        source: r.source,
        date: r.date,
      },
    }));
  const gridFeatures = g.gridNetwork?.features || [];
  return {
    type: "FeatureCollection",
    crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    features: [...features, ...restrictionFeatures, ...gridFeatures],
  };
}

export function sitesToCSV(sites) {
  const header = ["id", "name", "lat", "lon", "region", "comuna", "country", "altitudeM", "landUse", "owner", "status", "notes"];
  const esc = (v) => {
    if (v == null) return "";
    const s = String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const rows = (sites || []).map((s) =>
    [s.id, s.name, s.lat, s.lng, s.region, s.comuna, s.country, s.altitudeM, s.landUse, s.owner, s.status, s.notes].map(esc).join(",")
  );
  return [header.join(","), ...rows].join("\n");
}

export function roundTripEqualSites(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  const key = (s) => `${s.name}|${Number(s.lat).toFixed(6)}|${Number(s.lng).toFixed(6)}`;
  const sa = a.map(key).sort();
  const sb = b.map(key).sort();
  return sa.every((k, i) => k === sb[i]);
}
