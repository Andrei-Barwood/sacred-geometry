import { EMPTY_WARNINGS, GRID_FEATURE_ROLES, ON_PREMISE_METERS, PROXIMITY_CLASS } from "./constants.js";
import { detectCrs, distanceToGeometryMeters } from "./geometry.js";

export function classifyProximityMeters(meters) {
  if (meters == null || !Number.isFinite(meters)) return PROXIMITY_CLASS.UNKNOWN;
  if (meters <= ON_PREMISE_METERS) return PROXIMITY_CLASS.ON_PREMISE;
  const km = meters / 1000;
  if (km < 1) return PROXIMITY_CLASS.UNDER_1;
  if (km <= 5) return PROXIMITY_CLASS.FROM_1_TO_5;
  if (km <= 15) return PROXIMITY_CLASS.FROM_5_TO_15;
  return PROXIMITY_CLASS.OVER_15;
}

export function parseGridNetwork(fc) {
  if (!fc) {
    return {
      ok: false,
      error: EMPTY_WARNINGS.INCOMPLETE_GRID,
      collection: null,
      features: [],
    };
  }
  const crs = detectCrs(fc);
  if (!crs.ok) return { ok: false, error: crs.error, collection: null, features: [] };
  const list = fc.type === "FeatureCollection" ? fc.features : fc.type === "Feature" ? [fc] : [];
  const features = [];
  for (const f of list || []) {
    if (!f?.geometry) continue;
    const t = f.geometry.type;
    if (!["Point", "MultiPoint", "LineString", "MultiLineString"].includes(t)) continue;
    const p = f.properties || {};
    const roleRaw = String(p.role || p.kind || p.gridRole || "").toLowerCase();
    if ((t === "Point" || t === "MultiPoint") && !roleRaw) continue;
    const role = GRID_FEATURE_ROLES.includes(roleRaw)
      ? roleRaw
      : /substation|s\/e|se\b/.test(roleRaw)
        ? "substation"
        : /feeder|alimentador|line/.test(roleRaw)
          ? "feeder"
          : /connection|poc|punto/.test(roleRaw)
            ? "connection"
            : "unknown";
    features.push({
      id: p.id || null,
      role,
      name: p.name || null,
      geometry: f.geometry,
      properties: { ...p, role },
    });
  }
  if (!features.length) {
    return {
      ok: false,
      error: EMPTY_WARNINGS.INCOMPLETE_GRID,
      collection: null,
      features: [],
    };
  }
  return {
    ok: true,
    error: null,
    collection: { type: "FeatureCollection", features: features.map((x) => ({ type: "Feature", geometry: x.geometry, properties: x.properties })) },
    features,
  };
}

export function gridProximityForSite(site, network, extras = {}) {
  const unknown = {
    distancia_km: null,
    clase: PROXIMITY_CLASS.UNKNOWN,
    nearestRole: null,
    nearestName: null,
    warning: EMPTY_WARNINGS.INCOMPLETE_GRID,
  };
  if (site?.lng == null || site?.lat == null) return unknown;
  const parsed = parseGridNetwork(network);
  const extraPoints = Array.isArray(extras.verifiedNodes) ? extras.verifiedNodes : [];
  if (!parsed.ok && !extraPoints.length) return unknown;

  let min = Infinity;
  let nearest = null;
  for (const f of parsed.features || []) {
    const d = distanceToGeometryMeters(site.lng, site.lat, f.geometry);
    if (d != null && d < min) {
      min = d;
      nearest = f;
    }
  }
  for (const node of extraPoints) {
    if (node?.lng == null || node?.lat == null) continue;
    const d = distanceToGeometryMeters(site.lng, site.lat, { type: "Point", coordinates: [node.lng, node.lat] });
    if (d != null && d < min) {
      min = d;
      nearest = { role: node.role || "connection", name: node.name || "verified-data node", geometry: null };
    }
  }
  if (!Number.isFinite(min) || min === Infinity) return unknown;
  return {
    distancia_km: Math.round((min / 1000) * 1000) / 1000,
    clase: classifyProximityMeters(min),
    nearestRole: nearest?.role || null,
    nearestName: nearest?.name || null,
    warning: null,
  };
}
