import { VALIDATION_CONFIG } from "./validation-config.js";
import { COUNTRY_TO_REGION, REGIONAL_PROFILES } from "../regional-profiles.js";
import { validateRegionalization as baseRegional } from "../regional-validation.js";

export function validateRegion(template, issues) {
  const r = baseRegional(template);
  for (const e of r.errors) {
    issues.error(e.code, e.message, { category: "region" });
  }
  const rid = template.regionId || COUNTRY_TO_REGION[template.country];
  if (rid && REGIONAL_PROFILES[rid] && template.country && !REGIONAL_PROFILES[rid].countries.includes(template.country)) {
    issues.error("COUNTRY_REGION", "country does not belong to region", { category: "region" });
  }
  const fit = template.regionalization && template.regionalization.regionalFitScore;
  if (typeof fit === "number" && (fit < 0 || fit > 100)) {
    issues.error("FIT_RANGE", "regionalFitScore out of 0–100", { category: "region" });
  } else if (typeof fit === "number" && fit < VALIDATION_CONFIG.warnings.regionalFitLow) {
    issues.warning("LOW_FIT", "regionalFitScore below threshold", { category: "region", warningLevel: "MEDIUM" });
  }

  const env = template.environment || {};
  const levels = VALIDATION_CONFIG.riskLevels;
  for (const key of ["dustLevel", "salinityRisk", "humidityRisk", "corrosionRisk", "floodRisk", "extremeHeatRisk", "duneRisk", "accessDifficulty"]) {
    if (env[key] && !levels.includes(env[key])) {
      issues.error("RISK_ENUM", `${key} has unknown level ${env[key]}`, { category: "region" });
    }
  }
  if (env.climate === "monsoon" && env.humidityRisk === "low" && env.floodRisk === "low") {
    issues.warning("MONSOON_DRY", "monsoon climate with low humidity and flood risk", {
      category: "region",
      warningLevel: "LOW",
    });
  }

  const suit = template.siteSuitability;
  if (suit) {
    const pref = new Set(suit.preferred || []);
    for (const a of suit.avoid || []) {
      if (pref.has(a)) {
        issues.warning("SITE_CONTRADICTION", `same item in preferred and avoid: ${a}`, {
          category: "region",
          warningLevel: "MEDIUM",
        });
      }
    }
  }

  if (env.code === "E03" || env.envelope === "oasis") {
    issues.notice("OASIS_RULES", "Oasis-hamada siting principles apply only to this environment, not globally.", {
      category: "region",
    });
  }
}
