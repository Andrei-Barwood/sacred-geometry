import { VALIDATION_CONFIG } from "./validation-config.js";
import { approximatelyEqual, checkFraction, checkNonNegative, isFiniteNumber, isPositive } from "./helpers.js";

export function validatePV(template, issues, derived) {
  const gen = template.generation;
  if (!gen) return;
  if (!gen.enabled) return;
  const pv = gen.pv;
  if (!pv) return;

  if (pv.dcMWp != null) checkNonNegative(pv.dcMWp, "pv.dcMWp", issues, "generation");
  if (pv.acMW != null) checkNonNegative(pv.acMW, "pv.acMW", issues, "generation");
  if (pv.capacityFactor != null) checkFraction(pv.capacityFactor, "pv.capacityFactor", issues, "generation");
  if (pv.specificYieldKWhPerKWpYear != null) {
    checkNonNegative(pv.specificYieldKWhPerKWpYear, "specificYield", issues, "generation");
  }
  if (pv.lossesPercent != null) {
    if (!checkNonNegative(pv.lossesPercent, "lossesPercent", issues, "generation")) return;
    if (pv.lossesPercent >= 100) {
      issues.error("LOSSES_100", "PV lossesPercent >= 100", { category: "generation" });
    }
  }

  if (isPositive(pv.dcMWp) && isPositive(pv.acMW)) {
    if (pv.acMW > pv.dcMWp + 1e-9) {
      issues.error("AC_GT_DC", "PV AC greater than DC", { category: "generation" });
    }
    const ratio = pv.dcMWp / pv.acMW;
    derived.dcAcRatio = ratio;
    if (pv.dcAcRatio != null && isFiniteNumber(pv.dcAcRatio)) {
      if (!approximatelyEqual(ratio, pv.dcAcRatio, 1e-6, VALIDATION_CONFIG.tolerances.dcAcRatioRel)) {
        issues.warning("DCAC_STORED", "stored dcAcRatio differs from dc/ac", {
          category: "generation",
          warningLevel: "LOW",
        });
      }
    }
    if (ratio > VALIDATION_CONFIG.warnings.dcAcHigh || ratio < VALIDATION_CONFIG.warnings.dcAcLow) {
      issues.warning("DCAC_RANGE", `DC/AC ratio ${ratio.toFixed(2)} is unusual`, {
        category: "generation",
        warningLevel: "MEDIUM",
      });
    }
  }

  const method = gen.energyCalculationMethod;
  const hasYield = pv.specificYieldKWhPerKWpYear != null;
  const hasCf = pv.capacityFactor != null;
  if (gen.useSpecificYield === true && gen.useCapacityFactor === true && !pv.capacityFactorInformationalOnly && !pv.specificYieldInformationalOnly) {
    issues.error("TWO_METHODS", "both energy methods active", { category: "generation" });
  }
  if (hasYield && hasCf && pv.capacityFactorInformationalOnly !== true && pv.specificYieldInformationalOnly !== true) {
    if (method === "specific-yield") {
      issues.notice("CF_INFORMATIONAL", "capacityFactor present alongside specific-yield; not summed", {
        category: "generation",
      });
    }
  }
  if (method === "specific-yield" && pv.specificYieldKWhPerKWpYear == null) {
    issues.notice("YIELD_PENDING", "Specific yield is intentionally pending site study.", {
      category: "generation",
      provenance: true,
    });
  }
  if (method === "capacity-factor" && pv.capacityFactor == null) {
    issues.notice("CF_PENDING", "Capacity factor pending site study.", { category: "generation", provenance: true });
  }

  if (method === "specific-yield" && hasYield && isPositive(pv.dcMWp)) {
    derived.annualEnergyMWh = (pv.dcMWp * 1000 * pv.specificYieldKWhPerKWpYear) / 1000;
  } else if (method === "capacity-factor" && hasCf && isPositive(pv.acMW)) {
    derived.annualEnergyMWh = pv.acMW * 8760 * pv.capacityFactor;
  }

  if (hasYield && pv.lossesPercent != null && pv.yieldIncludesLosses === true) {
    issues.warning("DOUBLE_LOSSES", "specific yield already net of losses and lossesPercent is also set", {
      category: "generation",
      warningLevel: "HIGH",
    });
  }

  if (isPositive(pv.dcMWp) && pv.dcMWp >= 20 && template.substation && template.substation.primaryKV === 0.4) {
    issues.error("PV_LV", "utility-scale PV at 0.4 kV", { category: "generation" });
  }
}

export function validateGeneration(template, issues, derived) {
  validatePV(template, issues, derived);
  const wind = template.generation && template.generation.wind;
  if (wind && wind.capacityFactor != null) {
    checkFraction(wind.capacityFactor, "wind.capacityFactor", issues, "generation");
  }
  if (template.generation && template.generation.diesel && template.generation.diesel.ratedMW === 0) {
    issues.error("DIESEL_ZERO", "diesel ratedMW is 0", { category: "generation" });
  }
}
