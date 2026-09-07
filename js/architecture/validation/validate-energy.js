import { isFiniteNumber, isPositive } from "./helpers.js";
import { calculateDutyCycleEnergy } from "../energy.js";

export function validateEnergy(template, issues, derived, options = {}) {
  if (options.validationProfile === "consumption-study-6kw" && options.dutyCase) {
    const c = options.dutyCase;
    const r = calculateDutyCycleEnergy({
      powerW: c.powerW,
      hoursPerDay: c.hoursPerDay,
      daysPerMonth: c.daysPerMonth,
      dutyCycle: c.dutyCycle,
    });
    if (!r.ok) {
      issues.error("DUTY_ENERGY", r.error.message, { category: "energy" });
    } else {
      derived.calculatedEnergyKWh = r.value.energyMonthKWh;
    }
  }

  const duty = options.dutyCycle;
  if (duty != null) {
    if (!isFiniteNumber(duty) || duty < 0 || duty > 1) {
      issues.error("DUTY_RANGE", "dutyCycle must be in [0, 1]", { category: "energy" });
    } else if (duty === 1 && options.expectedCycling) {
      issues.warning("DUTY_ALWAYS_ON", "dutyCycle = 1 but archetype is expected to cycle", {
        category: "energy",
        warningLevel: "MEDIUM",
      });
    }
  }

  if (isPositive(derived.annualEnergyMWh) && isPositive(template.loadProfile?.peakLoadMW)) {
    const monthly12 = template.loadProfile.averageLoadMW * 8760 / 12;
    derived.annualizedEstimateMWh = monthly12 * 12;
  }
}

export function validateSeasonalProfiles(template, issues) {
  const sp = template.seasonalProfiles;
  if (!sp) return;
  let months = 0;
  let monthModel = false;
  for (const [key, val] of Object.entries(sp)) {
    if (!val || typeof val !== "object") continue;
    if (val.peakLoadMW != null && val.peakLoadMW < 0) {
      issues.error("SEASON_NEG", `${key} peakLoadMW negative`, { category: "energy" });
    }
    if (isFiniteNumber(val.months)) {
      monthModel = true;
      months += val.months;
    }
  }
  if (monthModel && Math.abs(months - 12) > 1e-6) {
    issues.error("SEASON_MONTHS", "seasonal months do not sum to 12", { category: "energy" });
  }
}
