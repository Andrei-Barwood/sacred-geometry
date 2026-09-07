/**
 * Verified regional intelligence. Not regional-profiles.js (conceptual heuristics).
 */

import { queryCatalog } from "./catalog.js";
import { calculateEvidenceConfidence } from "./confidence.js";
import { detectEvidenceConflicts } from "./conflicts.js";
import { evaluateFreshness } from "./freshness.js";
import { SITE_STUDY_REASON } from "./constants.js";

const SITE_STUDY_PARAMS = [
  { parameter: "gridStrength", reason: SITE_STUDY_REASON.CONNECTION_POINT_REQUIRED, note: "Grid strength is connection-point dependent." },
  { parameter: "shortCircuitLevel", reason: SITE_STUDY_REASON.CONNECTION_POINT_REQUIRED, note: "Short-circuit level is not inferred from voltage." },
  { parameter: "floodRisk", reason: SITE_STUDY_REASON.NEEDS_SPECIALIZED_SOURCE, note: "Flood risk is not derived from rainfall." },
  { parameter: "salinityRisk", reason: SITE_STUDY_REASON.FUTURE_SITE_STUDY, note: "Salinity is not inferred from country coastline." },
  { parameter: "soilingLossPercent", reason: SITE_STUDY_REASON.FUTURE_SITE_STUDY, note: "Dust climatology is not PV soiling loss." },
  { parameter: "specificYield", reason: SITE_STUDY_REASON.FUTURE_SITE_STUDY, note: "Project specific yield needs a PV model or a source that publishes production, plus project mounting." },
];

export function regionalIntelligence(projectOrCountry, options = {}) {
  const country = typeof projectOrCountry === "string" ? projectOrCountry : projectOrCountry?.country;
  const region = typeof projectOrCountry === "object" ? projectOrCountry?.region : null;
  const evidence = country ? queryCatalog({ country }) : [];
  const conflicts = detectEvidenceConflicts(evidence);
  const facts = evidence.map((e) => ({
    parameter: e.parameter,
    value: e.normalizedValue,
    unit: e.unit,
    granularity: e.granularity,
    sourceId: e.sourceId,
    evidenceId: e.evidenceId,
    confidence: calculateEvidenceConfidence(e, { country, region }),
    freshness: evaluateFreshness(e).status,
  }));
  const pending = SITE_STUDY_PARAMS.map((p) => ({ ...p }));
  const available = facts.filter((f) => f.parameter !== "tariffReference");
  const tariff = facts.filter((f) => f.parameter === "tariffReference");
  return {
    country,
    region,
    layer: "verified-intelligence",
    not: "regional-profiles-heuristic",
    available,
    tariffReferences: tariff,
    pending,
    conflicting: conflicts,
    evidence,
    note: "Conceptual regional profiles remain separate. Intelligence facts keep their evidence.",
  };
}

export function operatorIntelligence(country) {
  const ops = queryCatalog({ country, parameter: "gridOperator" });
  const voltages = queryCatalog({ country, parameter: "nominalVoltageLevelsKV" });
  const freq = queryCatalog({ country, parameter: "frequencyHz" });
  return { country, operators: ops, voltageLevels: voltages, frequency: freq };
}
