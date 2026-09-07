import { isFiniteNumber } from "./helpers.js";

export function validateApplicationCompatibility(template, issues) {
  const app = template.application;
  const load = template.loadProfile || {};
  const peak = load.peakLoadMW;
  if (app === "desalination") {
    if (!isFiniteNumber(peak) || peak < 1) {
      issues.warning("DESAL_SMALL", "desalination without significant industrial load", {
        category: "application",
        warningLevel: "HIGH",
      });
    }
  }
  if (app === "water-pumping" && isFiniteNumber(load.motorLoadMW) && isFiniteNumber(peak) && load.motorLoadMW < 0.2 * peak) {
    issues.warning("PUMP_MOTOR", "water-pumping with low motor share", { category: "application", warningLevel: "MEDIUM" });
  }
  if (app === "telecommunications" && isFiniteNumber(peak) && peak > 50) {
    issues.warning("TELECOM_HUGE", "telecommunications at tens of MW needs explanation", {
      category: "application",
      warningLevel: "HIGH",
    });
  }
  if (app === "bulk-power" && isFiniteNumber(peak) && peak < 20) {
    issues.warning("BULK_SMALL", "bulk-power classified at modest MW", { category: "application", warningLevel: "MEDIUM" });
  }
  if (app === "remote-settlement" && isFiniteNumber(peak) && peak > 80) {
    issues.warning("SETTLEMENT_HUGE", "remote-settlement peak is very large", {
      category: "application",
      warningLevel: "HIGH",
    });
  }
}
