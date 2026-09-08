import { newId, nowIso } from "../storage/schema.js";
import { isSafeHref, sanitizePlainText } from "../data/evidence-sanitizer.js";
import { CRITICAL_SITE_FIELDS, MAX_EVIDENCE_ITEMS, MAX_NOTE } from "./constants.js";
import { calculateEvidenceCoverage } from "../data/coverage.js";

export function addEvidenceItem(bundle, partial = {}) {
  const items = [...(bundle?.items || [])];
  if (items.length >= MAX_EVIDENCE_ITEMS) return { ...bundle, items };
  const url = typeof partial.url === "string" && isSafeHref(partial.url) ? partial.url : partial.url ? null : null;
  if (partial.url && !url && partial.kind === "url") {
    return { ...bundle, items, error: "Only http(s) URLs are stored." };
  }
  items.push({
    id: partial.id || newId(),
    kind: partial.kind || (url ? "url" : "note"),
    title: sanitizePlainText(partial.title || null, 200),
    url: url,
    note: sanitizePlainText(partial.note || null, MAX_NOTE),
    hash: sanitizePlainText(partial.hash || null, 128),
    retrievedAt: partial.retrievedAt || nowIso(),
    evidenceId: partial.evidenceId || null,
    sourceId: partial.sourceId || null,
  });
  return { items };
}

export function evidenceSummary(bundle) {
  const items = bundle?.items || [];
  return {
    count: items.length,
    titles: items.map((i) => i.title || i.kind).filter(Boolean).slice(0, 8),
    sourceIds: [...new Set(items.map((i) => i.sourceId).filter(Boolean))],
    evidenceIds: [...new Set(items.map((i) => i.evidenceId).filter(Boolean))],
  };
}

export function siteEvidenceCoverage(site, project) {
  const fields = {
    coordinates: site?.lat != null && site?.lng != null,
    name: !!(site?.name && site.name !== "Untitled site"),
    region: !!(site?.region || site?.comuna),
    landUse: !!site?.landUse,
    evidence: (site?.evidence?.items || []).length > 0,
  };
  const filled = CRITICAL_SITE_FIELDS.filter((k) => fields[k]).length;
  const percent = Math.round((filled / CRITICAL_SITE_FIELDS.length) * 100);
  const verified = project ? calculateEvidenceCoverage(project) : null;
  return {
    percent,
    fields,
    critical: CRITICAL_SITE_FIELDS.slice(),
    verifiedDataCoverage: verified?.evidenceCoverageScore ?? null,
    note: "Site evidence coverage is the share of critical siting fields with a declared value or source. It is not engineering quality.",
  };
}

export function linkVerifiedToSite(bundle, evidenceRecord) {
  if (!evidenceRecord) return bundle;
  return addEvidenceItem(bundle, {
    kind: "document-ref",
    title: evidenceRecord.sourceTitle || evidenceRecord.parameter,
    evidenceId: evidenceRecord.evidenceId,
    sourceId: evidenceRecord.sourceId,
    retrievedAt: evidenceRecord.retrievedAt,
    hash: evidenceRecord.contentFingerprint || null,
    url: evidenceRecord.sourceUrl || null,
  });
}
