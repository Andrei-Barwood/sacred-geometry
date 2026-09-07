/**
 * Rank evidence candidates. Never selectOneTruthAutomatically.
 * Authority tier is not absolute truth: scope and class still matter.
 */

import { GRANULARITY_RANK } from "./constants.js";
import { calculateEvidenceConfidence } from "./confidence.js";
import { detectEvidenceConflicts } from "./conflicts.js";
import { evaluateFreshness } from "./freshness.js";
import { getSource } from "./source-registry.js";
import { TIER_SCORE } from "./constants.js";
import { currentFieldProvenance } from "./field-provenance.js";
import { createCandidate } from "./evidence-model.js";
import { parameterMeta } from "./parameter-map.js";
import { PROVENANCE } from "../ui/constants.js";

export function matchEvidenceToProject(project, evidence) {
  if (!evidence) return { applicable: false, score: 0, reasons: ["missing"] };
  const country = project?.country || project?.architecture?.country;
  const region = project?.region || project?.architecture?.region;
  const subregion = project?.subregion || project?.architecture?.subregion;
  const site = project?.site?.name || project?.metadata?.id;
  const g = evidence.geography || {};
  const reasons = [];
  let score = 0;

  if (g.country && country && g.country !== country) {
    return { applicable: false, score: 0, reasons: ["country-mismatch"] };
  }
  if (evidence.granularity === "SITE" && g.site && site && g.site !== site && g.site !== project?.sourceTemplateId) {
    return { applicable: false, score: 0, reasons: ["site-mismatch"] };
  }
  if (g.country && country && g.country === country) {
    score += 20;
    reasons.push("country");
  }
  if (g.region && region && String(g.region).toLowerCase() === String(region).toLowerCase()) {
    score += 12;
    reasons.push("region");
  }
  if (g.subregion && subregion && String(g.subregion).toLowerCase() === String(subregion).toLowerCase()) {
    score += 10;
    reasons.push("subregion");
  }
  if (g.site && site && g.site === site) {
    score += 25;
    reasons.push("site");
  }
  score += (GRANULARITY_RANK[evidence.granularity] || 0) * 0.2;
  return { applicable: true, score, reasons };
}

export function rankEvidenceCandidates(project, evidenceList, parameter) {
  const conflicts = detectEvidenceConflicts(evidenceList);
  const conflictIds = new Set();
  for (const c of conflicts) {
    if (c.comparable) (c.evidenceIds || []).forEach((id) => conflictIds.add(id));
  }
  const ranked = (evidenceList || [])
    .map((ev) => {
      const match = matchEvidenceToProject(project, ev);
      const source = getSource(ev.sourceId);
      const confidence = calculateEvidenceConfidence(ev, {
        country: project?.country,
        region: project?.region,
        subregion: project?.subregion,
        site: project?.site?.name,
        hasConflict: conflictIds.has(ev.evidenceId),
      });
      const freshness = evaluateFreshness(ev);
      const tier = TIER_SCORE[source?.authorityTier] || 0;
      const applicability = match.applicable ? match.score : -1000;
      const rank =
        applicability * 4 +
        confidence * 1.2 +
        (GRANULARITY_RANK[ev.granularity] || 0) * 0.8 +
        tier * 0.15;
      return { evidence: ev, match, confidence, freshness, rank, source };
    })
    .filter((r) => r.match.applicable)
    .sort((a, b) => b.rank - a.rank);

  const recommended = ranked[0] || null;
  let recommendationReason = null;
  if (recommended) {
    const bits = [];
    const src = recommended.source;
    if (src) bits.push(`${src.organization} (${src.authorityTier.replace(/_/g, " ")})`);
    bits.push(`${recommended.evidence.granularity.toLowerCase()} scope`);
    bits.push(`freshness ${recommended.freshness.status}`);
    if (recommended.match.reasons.includes("site")) bits.push("matches the project site");
    else if (recommended.match.reasons.includes("country")) bits.push("matches the project country");
    recommendationReason = `Recommended because this source is ${bits.join(", ")}. Authority does not replace context.`;
  }

  return { ranked, recommended, recommendationReason, conflicts };
}

export function buildCandidates(project, evidenceList, parameter) {
  const meta = parameterMeta(parameter);
  const current = currentFieldProvenance(project, parameter);
  const { ranked, recommended, recommendationReason, conflicts } = rankEvidenceCandidates(project, evidenceList, parameter);
  const userLocked = current.provenance === PROVENANCE.USER || current.provenance === "user-input";
  return ranked.map((r) =>
    createCandidate(
      { value: current.value, unit: meta?.unit, provenance: current.provenance },
      r.evidence,
      {
        parameter,
        projectPath: meta?.path,
        recommended: recommended && r.evidence.evidenceId === recommended.evidence.evidenceId,
        recommendationReason: recommended && r.evidence.evidenceId === recommended.evidence.evidenceId ? recommendationReason : null,
        blockedReason: userLocked ? "USER INPUT is not replaced automatically. A different verified value is available." : null,
        currentProvenance: current.provenance,
      }
    )
  ).concat(conflicts.length ? [] : []);
}
