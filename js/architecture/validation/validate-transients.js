import { VALIDATION_CONFIG } from "./validation-config.js";
import { isFiniteNumber, isPositive } from "./helpers.js";
import { LOAD_STATES } from "../models.js";

const ALLOWED_STATES = new Set(Object.values(LOAD_STATES));

export function validateTransientEvents(template, issues, derived) {
  const events = (template.loadProfile && template.loadProfile.transientEvents) || [];
  const app = template.application || "";
  for (const ev of events) {
    if (isPositive(ev.runningMW) && isPositive(ev.startingMultiple) && ev.startingCurrent == null) {
      derived[`startMultiple:${ev.type}`] = ev.startingMultiple;
    }
    if (isPositive(ev.runningCurrent) && isPositive(ev.startingCurrent)) {
      const m = ev.startingCurrent / ev.runningCurrent;
      derived[`startMultiple:${ev.type}`] = m;
      if (isFiniteNumber(ev.startingMultiple) && Math.abs(m - ev.startingMultiple) > 0.3) {
        issues.warning("INRUSH_RATIO", `${ev.type} startingMultiple disagrees with currents`, {
          category: "transients",
          warningLevel: "MEDIUM",
        });
      }
    }
    if (isPositive(ev.durationSeconds) === false && ev.durationSeconds != null && ev.durationSeconds < 0) {
      issues.error("NEG_DURATION", "transient duration negative", { category: "transients" });
    }
    if (isPositive(ev.startingMultiple) && ev.startingMultiple > VALIDATION_CONFIG.warnings.inrushMultipleHigh) {
      issues.warning("LARGE_INRUSH", "large transient motor/inrush multiple", {
        category: "transients",
        warningLevel: "MEDIUM",
      });
    }
    if (ev.type === "pump-start" && !/water|desal|agri|oasis|pump/i.test(app)) {
      issues.warning("PUMP_APP", "pump-start on a non-pumping application", {
        category: "transients",
        warningLevel: "LOW",
      });
    }
    if (/crusher|conveyor/.test(ev.type || "") && /settlement|telecom|tourism/.test(app)) {
      issues.warning("CRUSHER_RESIDENTIAL", "industrial start event on a settlement-like application", {
        category: "transients",
        warningLevel: "MEDIUM",
      });
    }
  }
  issues.notice("INRUSH_NOT_ENERGY", "Inrush is demand-only and is not added to monthly energy.", {
    category: "transients",
  });
}

export function validateLoadState(state, issues) {
  if (state == null) return;
  if (!ALLOWED_STATES.has(state)) {
    issues.error("BAD_STATE", `unknown load state ${state}`, { category: "transients" });
  }
}
