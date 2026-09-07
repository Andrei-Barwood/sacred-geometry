import { cloneValue } from "../ui/clone.js";
import { newId, nowIso } from "../storage/schema.js";
import { sanitizePlainText } from "../data/evidence-sanitizer.js";
import { MAX_NAME, MAX_NOTE, SITE_STATUSES } from "./constants.js";
import { validateLngLat } from "./geometry.js";

export function emptyEvidenceBundle() {
  return { items: [] };
}

export function createSite(partial = {}) {
  const lng = partial.lng ?? partial.lon ?? partial.longitude;
  const lat = partial.lat ?? partial.latitude;
  const coords = validateLngLat(Number(lng), Number(lat));
  const status = SITE_STATUSES.includes(partial.status) ? partial.status : "candidato";
  const t = nowIso();
  return {
    id: partial.id || newId(),
    name: sanitizePlainText(partial.name || "Untitled site", MAX_NAME) || "Untitled site",
    lat: coords.ok ? coords.lat : null,
    lng: coords.ok ? coords.lng : null,
    lon: coords.ok ? coords.lng : null,
    region: sanitizePlainText(partial.region || null, 120),
    comuna: sanitizePlainText(partial.comuna || partial.commune || null, 120),
    country: sanitizePlainText(partial.country || null, 8),
    altitudeM:
      partial.altitudeM == null || partial.altitudeM === ""
        ? null
        : Number.isFinite(Number(partial.altitudeM))
          ? Number(partial.altitudeM)
          : null,
    landUse: sanitizePlainText(partial.landUse || partial.land_use || null, 120),
    owner: sanitizePlainText(partial.owner || null, 120),
    notes: sanitizePlainText(partial.notes || null, MAX_NOTE),
    status,
    evidence: normalizeEvidenceBundle(partial.evidence),
    anchoredArchitectureId: partial.anchoredArchitectureId || partial.sourceTemplateId || null,
    createdAt: partial.createdAt || t,
    updatedAt: partial.updatedAt || t,
    coordError: coords.ok ? null : coords.error,
  };
}

export function normalizeEvidenceBundle(raw) {
  const items = Array.isArray(raw?.items) ? raw.items : Array.isArray(raw) ? raw : [];
  return {
    items: items.slice(0, 24).map((item) => ({
      id: item.id || newId(),
      kind: ["url", "note", "document-ref"].includes(item.kind) ? item.kind : item.url ? "url" : "note",
      title: sanitizePlainText(item.title || null, 200),
      url: typeof item.url === "string" ? item.url : null,
      note: sanitizePlainText(item.note || null, MAX_NOTE),
      hash: sanitizePlainText(item.hash || null, 128),
      retrievedAt: item.retrievedAt || null,
      evidenceId: item.evidenceId || null,
      sourceId: item.sourceId || null,
    })),
  };
}

export function emptyGeospatial() {
  return {
    sites: [],
    activeSiteId: null,
    restrictions: [],
    gridNetwork: null,
    evaluatedTemplateId: null,
    warnings: [],
  };
}

export function normalizeGeospatial(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const sites = Array.isArray(src.sites) ? src.sites.map((s) => createSite(s)) : [];
  let activeSiteId = src.activeSiteId || null;
  if (activeSiteId && !sites.some((s) => s.id === activeSiteId)) activeSiteId = null;
  return {
    sites,
    activeSiteId,
    restrictions: Array.isArray(src.restrictions) ? src.restrictions : [],
    gridNetwork: src.gridNetwork && src.gridNetwork.type === "FeatureCollection" ? src.gridNetwork : src.gridNetwork || null,
    evaluatedTemplateId: src.evaluatedTemplateId || null,
    warnings: Array.isArray(src.warnings) ? src.warnings.slice() : [],
  };
}

export function cloneGeospatial(geo) {
  return cloneValue(normalizeGeospatial(geo));
}

export function getActiveSite(geo) {
  const g = normalizeGeospatial(geo);
  if (!g.activeSiteId) return null;
  return g.sites.find((s) => s.id === g.activeSiteId) || null;
}
