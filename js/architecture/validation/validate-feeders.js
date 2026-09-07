import { VALIDATION_CONFIG } from "./validation-config.js";
import { checkNonNegative, isPositive } from "./helpers.js";

export function validateFeeders(template, issues) {
  const feeders = template.feeders;
  if (!feeders) return;
  if (!Array.isArray(feeders)) {
    issues.error("FEEDERS_TYPE", "feeders must be an array", { category: "feeders" });
    return;
  }
  for (const f of feeders) {
    if (f.voltageKV != null && !isPositive(f.voltageKV)) {
      issues.error("FEEDER_KV", `${f.name || "feeder"} voltageKV must be > 0`, { category: "feeders" });
    }
    if (f.lengthKM != null) checkNonNegative(f.lengthKM, `${f.name}.lengthKM`, issues, "feeders");
    if (f.estimatedLoadMW != null) checkNonNegative(f.estimatedLoadMW, `${f.name}.load`, issues, "feeders");
    if (f.lossesPercent != null) {
      checkNonNegative(f.lossesPercent, `${f.name}.losses`, issues, "feeders");
      if (f.lossesPercent > 100) issues.error("FEEDER_LOSS", "feeder losses > 100%", { category: "feeders" });
    }
    if (f.lengthKM > VALIDATION_CONFIG.warnings.feederLongKM) {
      issues.warning("LONG_FEEDER", `${f.name || "feeder"} is unusually long`, {
        category: "feeders",
        warningLevel: "MEDIUM",
      });
    }
  }
  issues.notice(
    "NO_VDROP",
    "Detailed voltage-drop calculation requires conductor parameters.",
    { category: "feeders" }
  );
}
