import { VALIDATION_CONFIG } from "./validation-config.js";
import { approximatelyEqual, checkFraction, isFiniteNumber, isPositive } from "./helpers.js";

export function validateBESS(template, issues, derived) {
  const bess = template.bess;
  if (!bess) {
    issues.error("NO_BESS_OBJECT", "bess object missing", { category: "bess" });
    return;
  }
  const purposes = Array.isArray(bess.purpose) ? bess.purpose : [];

  if (bess.enabled === false) {
    if (purposes.includes("grid-forming")) {
      issues.error("GFM_DISABLED", "grid-forming purpose but BESS disabled", { category: "bess" });
    }
    return;
  }

  if (bess.enabled === true) {
    if (!isPositive(bess.powerMW)) {
      issues.error("BESS_POWER", "enabled BESS requires powerMW > 0", { category: "bess" });
    }
    if (!isPositive(bess.energyMWh)) {
      issues.error("BESS_ENERGY", "enabled BESS requires energyMWh > 0", { category: "bess" });
    }
  }

  if (isPositive(bess.powerMW) && isPositive(bess.energyMWh)) {
    const hours = bess.energyMWh / bess.powerMW;
    derived.bessDurationHours = hours;
    if (isFiniteNumber(bess.durationHours)) {
      const rel = VALIDATION_CONFIG.tolerances.bessDurationRel;
      if (!approximatelyEqual(hours, bess.durationHours, 1e-6, rel)) {
        issues.error("BESS_DURATION", "durationHours != energyMWh / powerMW", { category: "bess" });
      }
    }
    if (hours >= VALIDATION_CONFIG.warnings.bessDurationHighH) {
      issues.warning("LONG_BESS", "unusually long BESS duration", { category: "bess", warningLevel: "MEDIUM" });
    }
    if (purposes.includes("energy-shifting") && hours < VALIDATION_CONFIG.warnings.bessShiftShortH) {
      issues.warning("SHORT_SHIFT", "energy-shifting with very short duration", {
        category: "bess",
        warningLevel: "LOW",
      });
    }
  }

  if (bess.roundTripEfficiency != null) {
    if (!checkFraction(bess.roundTripEfficiency, "roundTripEfficiency", issues, "bess") ) {
      /* already flagged */
    } else if (bess.roundTripEfficiency === 0) {
      issues.error("RTE_ZERO", "roundTripEfficiency must be > 0", { category: "bess" });
    }
  }
  if (bess.usableDoD != null) {
    if (!checkFraction(bess.usableDoD, "usableDoD", issues, "bess")) {
      /* flagged */
    } else if (bess.usableDoD === 0) {
      issues.error("DOD_ZERO", "usableDoD must be > 0", { category: "bess" });
    }
  }

  if (isPositive(bess.energyMWh) && isFiniteNumber(bess.usableDoD) && bess.usableEnergyMWh == null) {
    derived.usableEnergyMWh = bess.energyMWh * bess.usableDoD;
    if (isFiniteNumber(bess.roundTripEfficiency)) {
      derived.deliveredEnergyMWh = derived.usableEnergyMWh * bess.roundTripEfficiency;
    }
  } else if (isFiniteNumber(bess.usableEnergyMWh)) {
    derived.usableEnergyMWh = bess.usableEnergyMWh;
    issues.notice("USABLE_GIVEN", "usableEnergyMWh provided; DoD×RTE not reapplied", { category: "bess" });
  }

  if (purposes.includes("backup") && bess.energyMWh === 0) {
    issues.error("BACKUP_EMPTY", "backup purpose with energyMWh == 0", { category: "bess" });
  }
}
