import { VALIDATION_CONFIG } from "./validation-config.js";
import { checkFraction, checkNonNegative, isFiniteNumber } from "./helpers.js";

const LOAD_KEYS = [
  "baseLoadMW", "averageLoadMW", "peakLoadMW", "criticalLoadMW",
  "cyclicLoadMW", "motorLoadMW", "thermalLoadMW", "interruptibleLoadMW", "standbyLoadMW",
];

export function validateLoadProfile(template, issues, derived) {
  const load = template.loadProfile;
  if (!load) {
    issues.error("NO_LOAD", "loadProfile missing", { category: "load" });
    return;
  }
  for (const key of LOAD_KEYS) {
    if (load[key] === undefined) continue;
    if (load[key] === null) {
      issues.notice("LOAD_NULL", `${key} is null (unknown), not zero`, { category: "load" });
      continue;
    }
    checkNonNegative(load[key], key, issues, "load");
  }
  if (load.loadFactor != null) checkFraction(load.loadFactor, "loadFactor", issues, "load");

  const peak = load.peakLoadMW;
  const avg = load.averageLoadMW;
  const base = load.baseLoadMW;
  const crit = load.criticalLoadMW;
  if (isFiniteNumber(avg) && isFiniteNumber(peak) && avg > peak + 1e-9) {
    issues.error("AVG_GT_PEAK", "averageLoadMW > peakLoadMW", { category: "load" });
  }
  if (isFiniteNumber(base) && isFiniteNumber(peak) && base > peak + 1e-9) {
    issues.error("BASE_GT_PEAK", "baseLoadMW > peakLoadMW", { category: "load" });
  }
  if (isFiniteNumber(crit) && isFiniteNumber(peak) && crit > peak + 1e-9) {
    issues.error("CRIT_GT_PEAK", "criticalLoadMW > peakLoadMW", { category: "load" });
  }

  if (isFiniteNumber(avg) && isFiniteNumber(peak) && peak > 0) {
    const calc = avg / peak;
    derived.loadFactor = calc;
    if (isFiniteNumber(load.loadFactor)) {
      const diff = Math.abs(calc - load.loadFactor);
      if (diff > VALIDATION_CONFIG.tolerances.loadFactorErrorAbs) {
        issues.error("LOAD_FACTOR_MISMATCH", "stored loadFactor disagrees with average/peak", { category: "load" });
      } else if (diff > VALIDATION_CONFIG.tolerances.loadFactorAbs) {
        issues.warning("LOAD_FACTOR_TOL", "loadFactor slightly off calculated average/peak", {
          category: "load",
          warningLevel: "LOW",
        });
      }
    }
  }

  issues.notice(
    "LOAD_OVERLAP",
    "motor+cyclic+thermal are overlapping facets and are not required to sum to peakLoadMW",
    { category: "load" }
  );

  if (isFiniteNumber(load.seasonalVariationPercent) && load.seasonalVariationPercent >= VALIDATION_CONFIG.warnings.seasonalHighPct) {
    issues.warning("HIGH_SEASONAL", "high seasonal variation", { category: "load", warningLevel: "MEDIUM" });
  }
}

export function deriveScale(peakMW, generationMW) {
  const s = Math.max(peakMW || 0, generationMW || 0);
  if (s < 0.5) return "kW-scale";
  if (s < 1) return "sub-MW";
  if (s < 10) return "small-MW";
  if (s < 50) return "medium-MW";
  if (s < 200) return "large-MW";
  if (s < 500) return "utility";
  return "bulk-power";
}
