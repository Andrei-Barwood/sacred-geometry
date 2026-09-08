import { SATS_PER_BTC } from "../bitcoin.js";
import { isFiniteNumber, validRange } from "./helpers.js";

export function validateEconomics(template, issues, derived) {
  const eco = template.economics;
  if (!eco) {
    issues.error("NO_ECO", "economics missing", { category: "economics" });
    return;
  }
  if (eco.btcPerKWh !== null && eco.btcPerKWh !== undefined) {
    if (typeof eco.btcPerKWh === "number" && eco.btcPerKWh < 0) {
      issues.error("NEG_TARIFF", "btcPerKWh negative", { category: "economics" });
    } else if (eco.btcPerKWh !== null) {
      issues.warning("TEMPLATE_TARIFF", "regional templates should leave btcPerKWh null", {
        category: "economics",
        warningLevel: "MEDIUM",
      });
    }
  }
  if (eco.satsPerKWh != null && eco.satsPerKWh < 0) {
    issues.error("NEG_SATS", "satsPerKWh negative", { category: "economics" });
  }
  if (isFiniteNumber(eco.btcPerKWh) && isFiniteNumber(eco.satsPerKWh)) {
    const expect = eco.btcPerKWh * SATS_PER_BTC;
    const rel = Math.abs(expect - eco.satsPerKWh) / Math.max(1, expect);
    if (rel > 1e-6) {
      issues.warning("SATS_MISMATCH", "sats/kWh disagrees with BTC/kWh × 1e8", {
        category: "economics",
        warningLevel: "LOW",
      });
    }
  }
  if (eco.energyKWh === null || (template.loadProfile && template.loadProfile.energyKWh === null)) {
    derived.costBTC = null;
    issues.notice("COST_NULL", "energy unknown → cost is null, not 0", { category: "economics" });
  }
  const range = eco.energyRange;
  if (range && !validRange(range.min, range.reference, range.max)) {
    issues.error("ENERGY_RANGE", "energy min/reference/max disordered", { category: "economics" });
  }
}
