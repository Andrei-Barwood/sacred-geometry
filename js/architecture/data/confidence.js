/**
 * Evidence confidence 0–100. Quality of the evidence record, not accuracy certification.
 */

import { GRANULARITY_RANK, TIER_SCORE } from "./constants.js";
import { getSource } from "./source-registry.js";
import { evaluateFreshness } from "./freshness.js";
import { FRESHNESS } from "./constants.js";

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function geoMatchScore(evidence, context = {}) {
  const g = evidence.geography || {};
  if (context.site && g.site && context.site === g.site) return 20;
  if (context.coordinates && g.coordinates) return 18;
  if (context.subregion && g.subregion && context.subregion === g.subregion) return 14;
  if (context.region && g.region && context.region === g.region) return 10;
  if (context.country && g.country && context.country === g.country) return 8;
  if (context.country && g.country && context.country !== g.country) return 0;
  if (!g.country && evidence.granularity === "GLOBAL") return 4;
  return 6;
}

export function calculateEvidenceConfidence(evidence, context = {}) {
  if (!evidence) return 0;
  const source = getSource(evidence.sourceId);
  const tier = source?.authorityTier || "UNVERIFIED";
  let score = (TIER_SCORE[tier] || 10) * 0.45;

  const gran = GRANULARITY_RANK[evidence.granularity] || 10;
  score += gran * 0.18;

  score += geoMatchScore(evidence, context);

  const fresh = evaluateFreshness(evidence, context.now);
  if (fresh.status === FRESHNESS.FRESH) score += 10;
  else if (fresh.status === FRESHNESS.AGING) score += 5;
  else if (fresh.status === FRESHNESS.STALE) score -= 12;
  else score -= 2;

  if (evidence.methodology) score += 6;
  else score -= 4;
  if (evidence.unit) score += 5;
  else score -= 8;
  if (evidence.normalizedValue != null && Number.isFinite(evidence.normalizedValue)) score += 4;
  if (Array.isArray(evidence.normalizedValue)) score += 2;
  if (evidence.sourceUrl) score += 3;
  if (evidence.publishedAt) score += 2;
  if (context.hasConflict) score -= 10;
  if (context.wrongClass) score -= 20;
  if (context.scopeMismatch) score -= 15;

  return Math.round(clamp(score, 0, 100));
}

export function confidenceDisclaimer() {
  return "Confidence scores evaluate evidence quality (source, scope, freshness, method). They are not a certification, guarantee, or accuracy certificate.";
}
