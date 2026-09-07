import { newId, nowIso } from "../storage/schema.js";
import { sanitizePlainText } from "../data/evidence-sanitizer.js";
import { MAX_NOTE, RESTRICTION_SEVERITY, RESTRICTION_TYPES } from "./constants.js";
import { detectCrs, pointInGeometry } from "./geometry.js";

export function createRestriction(partial = {}) {
  const type = RESTRICTION_TYPES.includes(partial.type) ? partial.type : "otra";
  const severity = RESTRICTION_SEVERITY.includes(partial.severity) ? partial.severity : "informativo";
  return {
    id: partial.id || newId(),
    name: sanitizePlainText(partial.name || "Restriction", 200) || "Restriction",
    type,
    severity,
    geometry: partial.geometry || null,
    source: sanitizePlainText(partial.source || partial.provenance?.source || null, 200),
    sourceUrl: typeof partial.sourceUrl === "string" ? partial.sourceUrl : null,
    date: partial.date || partial.publishedAt || null,
    retrievedAt: partial.retrievedAt || nowIso(),
    notes: sanitizePlainText(partial.notes || null, MAX_NOTE),
    provenance: {
      source: sanitizePlainText(partial.provenance?.source || partial.source || null, 200),
      date: partial.provenance?.date || partial.date || null,
      retrievedAt: partial.retrievedAt || nowIso(),
    },
  };
}

export function restrictionsFromGeoJSON(fc) {
  const crs = detectCrs(fc);
  if (!crs.ok) return { ok: false, error: crs.error, restrictions: [] };
  const features = fc?.type === "FeatureCollection" ? fc.features : fc?.type === "Feature" ? [fc] : [];
  const restrictions = [];
  for (const f of features || []) {
    if (!f || !f.geometry) continue;
    const g = f.geometry.type;
    if (g !== "Polygon" && g !== "MultiPolygon") continue;
    const p = f.properties || {};
    restrictions.push(
      createRestriction({
        id: p.id,
        name: p.name || p.title || "Restriction",
        type: p.type || p.restrictionType,
        severity: p.severity,
        geometry: f.geometry,
        source: p.source || p.provenance,
        sourceUrl: p.sourceUrl,
        date: p.date || p.publishedAt,
        notes: p.notes || p.description,
      })
    );
  }
  return { ok: true, error: null, restrictions };
}

export function inheritRestrictions(lng, lat, restrictions) {
  const hits = [];
  for (const r of restrictions || []) {
    if (!r?.geometry) continue;
    if (pointInGeometry(lng, lat, r.geometry)) hits.push(r);
  }
  return hits;
}
