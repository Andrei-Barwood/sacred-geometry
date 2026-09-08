/**
 * Structural validation of evidence objects. Quality of evidence ≠ engineering accuracy.
 */

import { AUTHORITY_TIERS, GRANULARITY, SOLAR_PARAMETERS } from "./constants.js";
import { sanitizeSourceUrl } from "./evidence-sanitizer.js";
import { getSource } from "./source-registry.js";

const ISO = /^\d{4}-\d{2}-\d{2}/;

export function validateEvidence(evidence, options = {}) {
  const errors = [];
  const warnings = [];
  if (!evidence || typeof evidence !== "object") {
    return { ok: false, errors: ["missing evidence object"], warnings };
  }
  if (!evidence.evidenceId) errors.push("missing evidenceId");
  if (!evidence.parameter) errors.push("missing parameter");
  if (!evidence.sourceId) errors.push("missing sourceId");
  const source = getSource(evidence.sourceId);
  if (!source && !options.allowUnknownSource) errors.push("unknown source");
  if (source && source.authorityTier === AUTHORITY_TIERS.UNVERIFIED) {
    warnings.push("source is UNVERIFIED");
  }
  if (evidence.normalizedValue == null && evidence.rawValue == null) {
    errors.push("missing value");
  }
  if (typeof evidence.normalizedValue === "number" && !Number.isFinite(evidence.normalizedValue)) {
    errors.push("NaN value");
  }
  if (evidence.normalizedValue != null && !evidence.unit) errors.push("missing unit");
  if (evidence.sourceUrl) {
    const url = sanitizeSourceUrl(evidence.sourceUrl);
    if (!url.ok) errors.push("invalid URL");
  }
  if (evidence.retrievedAt) {
    const t = Date.parse(evidence.retrievedAt);
    if (!Number.isFinite(t)) errors.push("invalid retrievedAt");
    else if (t > Date.now() + 120000) errors.push("future retrievedAt");
  } else {
    warnings.push("missing retrievedAt");
  }
  if (evidence.publishedAt && !ISO.test(String(evidence.publishedAt))) {
    warnings.push("publishedAt not ISO-like");
  }
  if (evidence.validFrom && evidence.validTo) {
    if (Date.parse(evidence.validTo) < Date.parse(evidence.validFrom)) {
      errors.push("validTo before validFrom");
    }
  }
  if (!evidence.geography || typeof evidence.geography !== "object") {
    errors.push("invalid geographic scope");
  }
  if (evidence.granularity && !GRANULARITY[evidence.granularity]) {
    errors.push("invalid geographic scope");
  }
  if (evidence.confidence != null) {
    const c = Number(evidence.confidence);
    if (!Number.isFinite(c) || c < 0 || c > 100) errors.push("confidence outside 0–100");
  }
  if (SOLAR_PARAMETERS.includes(evidence.parameter) && evidence.unit) {
    if (evidence.parameter === "ghiAnnual" && /kWp/i.test(evidence.unit)) {
      errors.push("GHI must not use kWh/kWp units");
    }
    if (evidence.parameter === "specificYield" && /m²|m2/i.test(evidence.unit)) {
      errors.push("specific yield must not use kWh/m² units");
    }
  }
  return { ok: errors.length === 0, errors, warnings };
}

export function assertComparableUnits(a, b) {
  if (!a?.unit || !b?.unit) return false;
  return normalizeUnit(a.unit) === normalizeUnit(b.unit);
}

export function normalizeUnit(unit) {
  if (!unit) return "";
  return String(unit)
    .replace(/·/g, "/")
    .replace(/\s+/g, "")
    .replace(/m²/g, "m2")
    .replace(/year/g, "y")
    .replace(/yr/g, "y")
    .toLowerCase();
}
