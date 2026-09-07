import { VALIDATION_CONFIG } from "./validation-config.js";
import { approximatelyEqual, checkFraction, isFiniteNumber, isPositive } from "./helpers.js";

export function validateRedundancy(sub, issues, derived) {
  const mode = sub.redundancyMode;
  const n = sub.transformerCount;
  if ((mode === "N-1" || mode === "N+1") && (!isFiniteNumber(n) || n < 2)) {
    issues.error("N1_COUNT", `${mode} declared with transformerCount < 2`, { category: "substation" });
  }
  if (isPositive(n) && isPositive(sub.transformerMVA)) {
    derived.nMinusOneCapacityMVA = Math.max(0, n - 1) * sub.transformerMVA;
    if (isPositive(sub.powerFactor)) {
      derived.nMinusOneCapacityMW = derived.nMinusOneCapacityMVA * sub.powerFactor;
    }
  }
}

export function validateSubstation(template, issues, derived) {
  const sub = template.substation;
  if (!sub) {
    issues.error("NO_SUB", "substation object missing", { category: "substation" });
    return;
  }
  if (sub.enabled === false) return;

  if (sub.primaryKV != null && !isPositive(sub.primaryKV)) {
    issues.error("PRIMARY_KV", "primaryKV must be > 0", { category: "substation" });
  }
  if (sub.secondaryKV != null && !isPositive(sub.secondaryKV)) {
    issues.error("SECONDARY_KV", "secondaryKV must be > 0", { category: "substation" });
  }
  if (sub.tertiaryKV != null && sub.tertiaryKV !== null && !isPositive(sub.tertiaryKV)) {
    issues.error("TERTIARY_KV", "tertiaryKV must be > 0 when present", { category: "substation" });
  }
  if (sub.transformerCount != null && (!isFiniteNumber(sub.transformerCount) || sub.transformerCount < 1)) {
    issues.error("TRAFO_COUNT", "transformerCount must be >= 1", { category: "substation" });
  }
  if (sub.transformerMVA != null && !isPositive(sub.transformerMVA)) {
    issues.error("TRAFO_MVA", "transformerMVA must be > 0", { category: "substation" });
  }
  if (sub.powerFactor != null && (!isFiniteNumber(sub.powerFactor) || sub.powerFactor <= 0 || sub.powerFactor > 1)) {
    issues.error("PF", "powerFactor must be in (0, 1]", { category: "substation" });
  }
  if (sub.utilizationFactor != null) checkFraction(sub.utilizationFactor, "utilizationFactor", issues, "substation");

  if (isPositive(sub.transformerCount) && isPositive(sub.transformerMVA)) {
    const total = sub.transformerCount * sub.transformerMVA;
    derived.transformerTotalMVA = total;
    if (isFiniteNumber(sub.transformerTotalMVA) && !approximatelyEqual(total, sub.transformerTotalMVA, 1e-6, VALIDATION_CONFIG.tolerances.transformerSumRel)) {
      issues.error("TRAFO_SUM", "transformerTotalMVA != count × unit MVA", { category: "substation" });
    }
    if (isPositive(sub.powerFactor)) {
      derived.transformerCapacityMW = total * sub.powerFactor;
      derived.activeCapacityMW = derived.transformerCapacityMW;
      if (isFiniteNumber(sub.utilizationFactor) && sub.operationalCapacityMW == null) {
        derived.operationalCapacityMW = derived.activeCapacityMW * sub.utilizationFactor;
      } else if (isFiniteNumber(sub.operationalCapacityMW)) {
        derived.operationalCapacityMW = sub.operationalCapacityMW;
        issues.notice("OPCAP_GIVEN", "operationalCapacityMW stored; utilization not reapplied", {
          category: "substation",
        });
      }
    }
  }

  validateRedundancy(sub, issues, derived);

  const peak = template.loadProfile && template.loadProfile.peakLoadMW;
  const pvAc = template.generation && template.generation.pv && template.generation.pv.acMW;
  const served = Math.max(isFiniteNumber(peak) ? peak : 0, 0);
  const throughput = Math.max(served, isFiniteNumber(pvAc) ? pvAc : 0);

  if (isFiniteNumber(derived.operationalCapacityMW)) {
    if (served > derived.operationalCapacityMW + 1e-6 && served > (derived.activeCapacityMW || 0) + 1e-6) {
      issues.error("PEAK_OVER_CAPACITY", "peakLoad exceeds transformer active capacity (MW, not MVA)", {
        category: "substation",
      });
    } else if (served > derived.operationalCapacityMW + 1e-6) {
      issues.warning("PEAK_OVER_UTIL", "peak exceeds planned utilization", {
        category: "substation",
        warningLevel: "MEDIUM",
      });
    }
  }
  if (
    isFiniteNumber(derived.nMinusOneCapacityMW) &&
    isFiniteNumber(derived.activeCapacityMW) &&
    served <= derived.activeCapacityMW &&
    served > derived.nMinusOneCapacityMW + 1e-6
  ) {
    issues.warning(
      "N1_PEAK",
      "Load can be served normally but not under declared N-1 condition.",
      { category: "substation", warningLevel: "MEDIUM" }
    );
  }

  if (sub.topology === "isolated" && template.grid && template.grid.mode === "grid-connected") {
    issues.warning("TOPO_GRID", "isolated topology with grid-connected mode", {
      category: "substation",
      warningLevel: "LOW",
    });
  }

  if (isFiniteNumber(sub.utilizationFactor) && sub.utilizationFactor > VALIDATION_CONFIG.warnings.transformerUtilHigh) {
    issues.warning("HIGH_UTIL", "very high transformer loading", { category: "substation", warningLevel: "HIGH" });
  }

  derived.voltagePrimaryKV = sub.primaryKV;
  if (throughput >= 80 && sub.primaryKV === 0.4) {
    issues.error("HV_ON_LV", "large throughput at 0.4 kV", { category: "substation" });
  }
}
