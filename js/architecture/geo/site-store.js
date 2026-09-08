import { cloneValue } from "../ui/clone.js";
import { nowIso } from "../storage/schema.js";
import { MAX_RESTRICTIONS, MAX_SITES, SITE_STATUSES } from "./constants.js";
import { createSite, emptyGeospatial, normalizeGeospatial } from "./site-model.js";
import { createRestriction } from "./restriction-model.js";
import { findDuplicateSite, parseSitesCSV, parseSitesGeoJSON } from "./import-export.js";
import { addEvidenceItem } from "./evidence-bundle.js";

export function addSite(geo, partial, options = {}) {
  const g = normalizeGeospatial(geo);
  const site = createSite(partial);
  if (site.lat == null) return { ok: false, error: site.coordError || "Invalid coordinates.", geospatial: g, site: null };
  if (g.sites.length >= MAX_SITES) return { ok: false, error: "Site limit reached.", geospatial: g, site: null };
  if (!options.allowDuplicate) {
    const dup = findDuplicateSite(g.sites, site.lng, site.lat);
    if (dup) return { ok: false, error: `Duplicate within ${Math.round(dup.meters)} m of ${dup.site.name}.`, geospatial: g, site: null, duplicateOf: dup.site.id };
  }
  g.sites = [...g.sites, site];
  return { ok: true, error: null, geospatial: g, site };
}

export function updateSite(geo, id, patch) {
  const g = normalizeGeospatial(geo);
  const idx = g.sites.findIndex((s) => s.id === id);
  if (idx < 0) return { ok: false, error: "Site not found.", geospatial: g };
  const next = createSite({ ...g.sites[idx], ...patch, id, updatedAt: nowIso() });
  if (patch.lat != null || patch.lng != null || patch.lon != null) {
    if (next.lat == null) return { ok: false, error: next.coordError || "Invalid coordinates.", geospatial: g };
  }
  g.sites = g.sites.slice();
  g.sites[idx] = next;
  return { ok: true, error: null, geospatial: g, site: next };
}

export function removeSite(geo, id) {
  const g = normalizeGeospatial(geo);
  g.sites = g.sites.filter((s) => s.id !== id);
  if (g.activeSiteId === id) g.activeSiteId = null;
  return { ok: true, geospatial: g };
}

export function setActiveSite(geo, id) {
  const g = normalizeGeospatial(geo);
  if (id && !g.sites.some((s) => s.id === id)) return { ok: false, error: "Site not found.", geospatial: g };
  g.sites = g.sites.map((s) => {
    if (s.id === id) return { ...s, status: "activo", updatedAt: nowIso() };
    if (s.status === "activo") return { ...s, status: "preseleccionado", updatedAt: nowIso() };
    return s;
  });
  g.activeSiteId = id || null;
  return { ok: true, geospatial: g };
}

export function setSiteStatus(geo, id, status) {
  if (!SITE_STATUSES.includes(status)) return { ok: false, error: "Invalid status.", geospatial: normalizeGeospatial(geo) };
  if (status === "activo") return setActiveSite(geo, id);
  const g = normalizeGeospatial(geo);
  g.sites = g.sites.map((s) => (s.id === id ? { ...s, status, updatedAt: nowIso() } : s));
  if (g.activeSiteId === id) g.activeSiteId = null;
  return { ok: true, geospatial: g };
}

export function addRestriction(geo, partial) {
  const g = normalizeGeospatial(geo);
  if (g.restrictions.length >= MAX_RESTRICTIONS) return { ok: false, error: "Restriction limit.", geospatial: g };
  g.restrictions = [...g.restrictions, createRestriction(partial)];
  return { ok: true, geospatial: g };
}

export function setGridNetwork(geo, collection) {
  const g = normalizeGeospatial(geo);
  g.gridNetwork = collection || null;
  return { ok: true, geospatial: g };
}

export function mergeImport(geo, parsed) {
  let g = normalizeGeospatial(geo);
  const added = [];
  const skipped = [...(parsed.skipped || [])];
  for (const site of parsed.sites || []) {
    const r = addSite(g, site);
    if (r.ok) {
      g = r.geospatial;
      added.push(r.site);
    } else skipped.push({ name: site.name, reason: r.error });
  }
  if (parsed.restrictions?.length) {
    const existing = new Set(g.restrictions.map((r) => JSON.stringify(r.geometry)));
    for (const rest of parsed.restrictions) {
      const key = JSON.stringify(rest.geometry);
      if (existing.has(key)) continue;
      const rr = addRestriction(g, rest);
      if (rr.ok) g = rr.geospatial;
    }
  }
  if (parsed.gridNetwork) {
    g = setGridNetwork(g, parsed.gridNetwork).geospatial;
  }
  return { ok: added.length > 0 || !!(parsed.restrictions?.length || parsed.gridNetwork), geospatial: g, added, skipped };
}

export function importIntoGeospatial(geo, text, kind) {
  const g = normalizeGeospatial(geo);
  const parsed = kind === "csv" ? parseSitesCSV(text, g.sites) : parseSitesGeoJSON(text, g.sites);
  if (!parsed.ok && !(parsed.restrictions?.length || parsed.gridNetwork)) {
    return { ok: false, error: parsed.error, geospatial: g, added: [], skipped: parsed.skipped || [] };
  }
  return { ...mergeImport(g, parsed), error: parsed.error };
}

export function addSiteEvidence(geo, siteId, item) {
  const g = normalizeGeospatial(geo);
  const idx = g.sites.findIndex((s) => s.id === siteId);
  if (idx < 0) return { ok: false, error: "Site not found.", geospatial: g };
  const evidence = addEvidenceItem(g.sites[idx].evidence, item);
  return updateSite(g, siteId, { evidence });
}

export function attachGeospatialToProject(project, geo) {
  const next = cloneValue(project);
  next.geospatial = normalizeGeospatial(geo);
  return next;
}

export { emptyGeospatial, normalizeGeospatial };
