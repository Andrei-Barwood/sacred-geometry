/**
 * Climate provider. Does not invent corrosion, flood, or salinity from country.
 * Returns no numeric climate fiction; site-specific hazards stay pending.
 */

import { createProvider } from "./interface.js";
import { PROVIDER_STATUS, SITE_STUDY_REASON } from "../constants.js";

const HAZARD = new Set(["floodRisk", "salinityRisk", "soilingLossPercent", "corrosionRisk"]);

export function createClimateProvider() {
  const provider = createProvider({
    id: "climate",
    name: "Climate provider",
    parameters: ["meanTemperatureC", "humidity", "precipitationMm", "windSpeedMs", "floodRisk", "salinityRisk", "soilingLossPercent"],
    requiresNetwork: false,
    fetchEvidence(query) {
      return [];
    },
    normalize(item) {
      return item;
    },
  });

  const originalFetch = provider.fetchEvidence.bind(provider);
  provider.fetchEvidence = async (query) => {
    const parameter = query?.parameter;
    if (HAZARD.has(parameter)) {
      return {
        ok: true,
        status: PROVIDER_STATUS.NO_DATA,
        evidence: [],
        error: null,
        unresolved: parameter === "floodRisk"
          ? SITE_STUDY_REASON.NEEDS_SPECIALIZED_SOURCE
          : SITE_STUDY_REASON.FUTURE_SITE_STUDY,
        note: parameter === "floodRisk"
          ? "Flood risk is not derived from rainfall alone."
          : parameter === "salinityRisk"
            ? "Salinity is not inferred from country coastline."
            : parameter === "soilingLossPercent"
              ? "Dust climatology is not PV soiling loss."
              : "Climate hazard requires site context.",
      };
    }
    const result = await originalFetch(query);
    if (!result.evidence.length) {
      return {
        ...result,
        status: PROVIDER_STATUS.NO_DATA,
        unresolved: SITE_STUDY_REASON.NEEDS_SPECIALIZED_SOURCE,
        note: "No verified climate observation is packaged for this query. National averages are not invented.",
      };
    }
    return result;
  };
  return provider;
}
