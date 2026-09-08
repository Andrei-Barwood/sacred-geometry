import { CONSUMPTION_PROFILE_ID } from "./validation-config.js";
import { calculateResistiveCurrent } from "../current.js";
import { calculateDutyCycleEnergy } from "../energy.js";
import { calculateInrushRatio } from "../diagnostics.js";

/** Source-specific rules. Never applied to utility/HV templates. */
export function validateConsumptionStudy6kW(context, issues, derived) {
  if (context.validationProfile !== CONSUMPTION_PROFILE_ID) return;
  const { powerW, voltageV, measuredA, dutyCycle, category, inrushA, runA } = context;
  if (powerW != null && voltageV != null) {
    const i = calculateResistiveCurrent(powerW, voltageV);
    if (i.ok) {
      derived.expectedCurrentA = i.value;
      if (measuredA != null) {
        const pct = Math.abs(measuredA - i.value) / i.value * 100;
        derived.currentDeviationPercent = pct;
        if (pct > 15) {
          issues.warning("RESISTIVE_DEV", "resistive current deviation > 15%", {
            category: "consumption-6kw",
            warningLevel: "MEDIUM",
          });
        }
      }
    }
  }
  if (inrushA != null && runA != null) {
    const r = calculateInrushRatio(inrushA, runA);
    if (r.ok) {
      derived.inrushRatio = r.value;
      if (r.value < 5 || r.value > 8) {
        issues.notice("DOL_BAND", "DOL inrush outside typical 5–8 × In (not a trip claim)", {
          category: "consumption-6kw",
        });
      }
    }
  }
  if (dutyCycle != null && category === "compressor" && dutyCycle === 1) {
    issues.warning("COMPRESSOR_ON", "compressor duty 100% ON", {
      category: "consumption-6kw",
      warningLevel: "HIGH",
    });
  }
  if (context.freezerBenchmark) {
    const e = calculateDutyCycleEnergy({
      powerW: 400,
      hoursPerDay: 24,
      daysPerMonth: 30,
      dutyCycle: 0.4,
    });
    derived.freezerKWh = e.value.energyMonthKWh;
  }
}
