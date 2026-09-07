/**
 * Freshness is category-specific. A grid frequency can stay FRESH for years;
 * a Bitcoin price cannot.
 */

import { CHANGE_CLASS, FRESHNESS, FRESHNESS_THRESHOLDS, PARAMETER_CHANGE_CLASS } from "./constants.js";

export function changeClassOf(evidenceOrParameter) {
  if (evidenceOrParameter && typeof evidenceOrParameter === "object") {
    return evidenceOrParameter.changeClass || PARAMETER_CHANGE_CLASS[evidenceOrParameter.parameter] || CHANGE_CLASS.SLOW_CHANGING;
  }
  return PARAMETER_CHANGE_CLASS[evidenceOrParameter] || CHANGE_CLASS.SLOW_CHANGING;
}

export function ageDays(iso, now = Date.now()) {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  return (now - t) / 86400000;
}

export function evaluateFreshness(evidence, now = Date.now()) {
  if (!evidence) return { status: FRESHNESS.UNKNOWN, ageDays: null, changeClass: null, asOf: null };
  const changeClass = changeClassOf(evidence);
  const thresholds = FRESHNESS_THRESHOLDS[changeClass] || FRESHNESS_THRESHOLDS.SLOW_CHANGING;
  const asOf = evidence.validTo || evidence.publishedAt || evidence.retrievedAt || null;
  const age = ageDays(evidence.retrievedAt || evidence.publishedAt, now);
  if (age == null || !Number.isFinite(age)) {
    return { status: FRESHNESS.UNKNOWN, ageDays: null, changeClass, asOf };
  }
  if (evidence.validTo) {
    const end = Date.parse(evidence.validTo);
    if (Number.isFinite(end) && end < now) {
      return { status: FRESHNESS.STALE, ageDays: age, changeClass, asOf, reason: "validity-ended" };
    }
  }
  let status = FRESHNESS.FRESH;
  if (age >= thresholds.staleDays) status = FRESHNESS.STALE;
  else if (age >= thresholds.agingDays) status = FRESHNESS.AGING;
  return { status, ageDays: age, changeClass, asOf, thresholds };
}

export function freshnessLabel(status) {
  return status || FRESHNESS.UNKNOWN;
}
