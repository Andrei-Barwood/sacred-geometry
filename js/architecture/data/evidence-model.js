/**
 * Evidence object factory. Raw and normalized values are both preserved.
 * External data never writes into templates.
 */

import {
  CHANGE_CLASS,
  EVIDENCE_STATUS,
  GRANULARITY,
  PARAMETER_CHANGE_CLASS,
} from "./constants.js";
import { fingerprintStructured, sanitizeExcerpt, sanitizePlainText, sanitizeSourceUrl, stripDangerousKeys } from "./evidence-sanitizer.js";
import { getSource } from "./source-registry.js";

export function emptyGeography(partial = {}) {
  return {
    country: partial.country ?? null,
    region: partial.region ?? null,
    subregion: partial.subregion ?? null,
    operatorTerritory: partial.operatorTerritory ?? null,
    site: partial.site ?? null,
    coordinates: partial.coordinates ?? null,
  };
}

export function parseRawNumber(raw) {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return { ok: true, value: raw, unitHint: null };
  }
  if (raw == null) return { ok: false, value: null, unitHint: null };
  if (Array.isArray(raw)) {
    const nums = raw.map((x) => Number(x)).filter((n) => Number.isFinite(n));
    return { ok: nums.length > 0, value: nums, unitHint: null };
  }
  const s = String(raw).trim();
  const unitHint = (s.match(/[A-Za-zµ°/%]+(?:\/[A-Za-zµ°]+)*(?:·[A-Za-z]+)?/g) || []).pop() || null;
  const n = Number(s.replace(/[^0-9.eE+-]/g, (ch) => (ch === "." || ch === "-" || ch === "+" ? ch : "")));
  if (Number.isFinite(n) && /[0-9]/.test(s)) return { ok: true, value: n, unitHint };
  return { ok: false, value: null, unitHint };
}

export function createEvidence(partial = {}) {
  const retrievedAt = partial.retrievedAt || new Date().toISOString();
  const source = partial.sourceId ? getSource(partial.sourceId) : null;
  const url = sanitizeSourceUrl(partial.sourceUrl || source?.homepage || null);
  const rawValue = partial.rawValue === undefined ? partial.normalizedValue : partial.rawValue;
  let normalizedValue = partial.normalizedValue;
  if (normalizedValue === undefined) {
    const parsed = parseRawNumber(rawValue);
    normalizedValue = parsed.ok ? parsed.value : null;
  }
  const evidence = {
    evidenceId: partial.evidenceId || null,
    parameter: partial.parameter || null,
    rawValue: rawValue ?? null,
    normalizedValue: normalizedValue ?? null,
    unit: partial.unit ?? null,
    sourceId: partial.sourceId || null,
    sourceUrl: url.ok ? url.url : null,
    sourceTitle: sanitizePlainText(partial.sourceTitle || source?.name || null),
    publishedAt: partial.publishedAt || null,
    retrievedAt,
    validFrom: partial.validFrom || null,
    validTo: partial.validTo || null,
    geography: emptyGeography(partial.geography || {}),
    granularity: partial.granularity || GRANULARITY.COUNTRY,
    methodology: partial.methodology || null,
    qualifiers: Array.isArray(partial.qualifiers) ? partial.qualifiers.slice() : [],
    confidence: partial.confidence ?? null,
    status: partial.status || EVIDENCE_STATUS.CANDIDATE,
    rawExcerpt: sanitizeExcerpt(partial.rawExcerpt || null),
    notes: sanitizePlainText(partial.notes || null, 400),
    changeClass: partial.changeClass || PARAMETER_CHANGE_CLASS[partial.parameter] || CHANGE_CLASS.SLOW_CHANGING,
    cached: partial.cached === true,
    providerId: partial.providerId || null,
    contentFingerprint: partial.contentFingerprint || null,
  };
  if (!evidence.contentFingerprint) {
    evidence.contentFingerprint = fingerprintStructured({
      parameter: evidence.parameter,
      normalizedValue: evidence.normalizedValue,
      unit: evidence.unit,
      sourceId: evidence.sourceId,
      publishedAt: evidence.publishedAt,
    });
  }
  return stripDangerousKeys(evidence);
}

export function evidenceSnapshotForProject(evidence) {
  if (!evidence) return null;
  return {
    evidenceId: evidence.evidenceId,
    parameter: evidence.parameter,
    value: evidence.normalizedValue,
    rawValue: evidence.rawValue,
    unit: evidence.unit,
    sourceId: evidence.sourceId,
    sourceTitle: evidence.sourceTitle,
    sourceUrl: evidence.sourceUrl,
    publishedAt: evidence.publishedAt,
    retrievedAt: evidence.retrievedAt,
    validFrom: evidence.validFrom,
    validTo: evidence.validTo,
    geography: emptyGeography(evidence.geography || {}),
    granularity: evidence.granularity,
    methodology: evidence.methodology,
    qualifiers: Array.isArray(evidence.qualifiers) ? evidence.qualifiers.slice() : [],
    confidence: evidence.confidence,
    changeClass: evidence.changeClass,
    contentFingerprint: evidence.contentFingerprint,
  };
}

export function createCandidate(projectValue, evidence, extras = {}) {
  const current = projectValue?.value;
  const next = evidence?.normalizedValue;
  let difference = null;
  let differencePercent = null;
  if (typeof current === "number" && typeof next === "number" && Number.isFinite(current) && Number.isFinite(next) && current !== 0) {
    difference = next - current;
    differencePercent = (difference / current) * 100;
  }
  return {
    parameter: evidence?.parameter || extras.parameter,
    projectPath: extras.projectPath || null,
    currentValue: current ?? null,
    currentUnit: projectValue?.unit || evidence?.unit || null,
    currentProvenance: projectValue?.provenance || extras.currentProvenance || "conceptual-assumption",
    candidateValue: next ?? null,
    candidateUnit: evidence?.unit || null,
    difference,
    differencePercent,
    evidence,
    recommended: extras.recommended === true,
    recommendationReason: extras.recommendationReason || null,
    blockedReason: extras.blockedReason || null,
    comparable: extras.comparable !== false,
  };
}
