import { evaluateScenario, serviceMarginKW } from "../demand.js";
import { LOAD_STATES } from "../models.js";

export function validateScenario({ loads, states, voltageV, serviceLimitKW, exclusiveSelection }, issues, derived) {
  const sc = evaluateScenario({ loads, states, voltageV, serviceLimitKW, exclusiveSelection });
  if (!sc.ok) {
    issues.error("SCENARIO", sc.error.message, { category: "scenario" });
    return;
  }
  derived.steadyDemandKW = sc.value.steadyStatePowerKW;
  derived.steadyCurrentA = sc.value.steadyStateCurrentA;
  derived.transientCurrentA = sc.value.peakTransientCurrentA;
  derived.serviceMarginKW = sc.value.remainingServiceMarginKW;
  const margin = serviceLimitKW != null
    ? serviceMarginKW(serviceLimitKW, sc.value.steadyStatePowerKW)
    : null;
  if (margin && margin.ok && margin.value.status === "OVERLOAD") {
    issues.warning("SERVICE_OVERLOAD", "steady demand exceeds serviceLimitKW (no breaker-trip claim)", {
      category: "scenario",
      warningLevel: "HIGH",
    });
  }
  for (const st of Object.values(states || {})) {
    if (st && !Object.values(LOAD_STATES).includes(st)) {
      issues.error("BAD_STATE", `unknown state ${st}`, { category: "scenario" });
    }
  }
}
