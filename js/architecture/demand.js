import { kilowattsToWatts, roundTo, wattsToKilowatts } from "./units.js";
import { fail, ok, requirePositive } from "./validation.js";
import {
  LOAD_STATES,
  SERVICE_STATUS,
  DEFAULT_THRESHOLDS,
  pickNominalPowerW,
  pickQuantity,
  selectLoads,
} from "./models.js";
import {
  resolveInrushCurrentA,
  resolveRunCurrentA,
  resolveStandbyCurrentA,
} from "./current.js";

function stateOf(states, loadId) {
  if (!states || states[loadId] == null) return LOAD_STATES.OFF;
  return states[loadId];
}

function currentForState(load, state, voltageV) {
  if (state === LOAD_STATES.OFF) {
    return ok(0, { method: "off" });
  }
  if (state === LOAD_STATES.STANDBY) {
    const s = resolveStandbyCurrentA(load, voltageV);
    if (!s.ok) return ok(0, { method: "standby-missing", warning: s.error });
    return s;
  }
  if (state === LOAD_STATES.RUNNING) {
    return resolveRunCurrentA(load, voltageV);
  }
  if (state === LOAD_STATES.STARTING) {
    const inrush = resolveInrushCurrentA(load, voltageV);
    if (inrush.ok) return { ...inrush, layer: "transient" };
    return resolveRunCurrentA(load, voltageV);
  }
  return fail("INVALID_STATE", `unknown load state ${state}`);
}

export function connectedPower(loads, options = {}) {
  const list = options.collapseExclusive
    ? selectLoads(loads, options.exclusiveSelection || {})
    : Array.isArray(loads)
      ? loads
      : [];
  let watts = 0;
  for (const load of list) {
    const p = pickNominalPowerW(load);
    if (p == null) continue;
    watts += p * pickQuantity(load);
  }
  if (!Number.isFinite(watts)) {
    return fail("NOT_FINITE", "connected power is not finite");
  }
  return ok({
    connectedPowerW: watts,
    connectedPowerKW: wattsToKilowatts(watts),
    loadCount: list.length,
  });
}

export function serviceMarginKW(serviceLimitKW, steadyDemandKW) {
  const limit = requirePositive(serviceLimitKW, "serviceLimitKW");
  if (!limit.ok) return limit;
  if (steadyDemandKW == null) {
    return fail("UNDEFINED", "steadyDemandKW is undefined");
  }
  if (typeof steadyDemandKW !== "number" || !Number.isFinite(steadyDemandKW)) {
    return fail("NAN", "steadyDemandKW is not finite");
  }
  if (steadyDemandKW < 0) return fail("NEGATIVE", "steadyDemandKW must be ≥ 0");

  const marginKW = limit.value - steadyDemandKW;
  const usagePercent = (steadyDemandKW / limit.value) * 100;
  if (!Number.isFinite(marginKW) || !Number.isFinite(usagePercent)) {
    return fail("NOT_FINITE", "service margin produced a non-finite result");
  }

  let status = SERVICE_STATUS.OK;
  if (steadyDemandKW > limit.value) status = SERVICE_STATUS.OVERLOAD;
  else if (usagePercent >= DEFAULT_THRESHOLDS.nearServicePercent) {
    status = SERVICE_STATUS.NEAR;
  }

  return ok({
    serviceLimitKW: limit.value,
    steadyDemandKW,
    serviceMarginKW: marginKW,
    serviceUsagePercent: usagePercent,
    status,
    protectionTripClaimed: false,
  });
}

/**
 * Snapshot de simultaneidad: estados por carga, no un Fd global.
 */
export function evaluateScenario({
  loads,
  states = {},
  voltageV,
  serviceLimitKW,
  exclusiveSelection = {},
} = {}) {
  const v = requirePositive(voltageV, "voltageV");
  if (!v.ok) return v;
  const list = selectLoads(loads, exclusiveSelection);

  let steadyA = 0;
  let transientExtraA = 0;
  const rows = [];

  for (const load of list) {
    const state = stateOf(states, load.id);
    const current = currentForState(load, state, v.value);
    if (!current.ok) {
      rows.push({
        loadId: load.id,
        state,
        error: current.error,
        currentA: null,
      });
      continue;
    }

    const isStarting = state === LOAD_STATES.STARTING;
    if (state === LOAD_STATES.RUNNING || state === LOAD_STATES.STANDBY) {
      steadyA += current.value;
    }
    if (isStarting) {
      transientExtraA += current.value;
    }

    rows.push({
      loadId: load.id,
      state,
      currentA: current.value,
      method: current.method,
      layer: isStarting ? "transient" : "steady",
    });
  }

  const transientA = steadyA + transientExtraA;
  const steadyW = steadyA * v.value;
  const transientW = transientA * v.value;
  const steadyKW = wattsToKilowatts(steadyW);
  const transientKW = wattsToKilowatts(transientW);

  if (![steadyA, transientA, steadyKW].every(Number.isFinite)) {
    return fail("NOT_FINITE", "scenario currents are not finite");
  }

  const margin =
    serviceLimitKW != null ? serviceMarginKW(serviceLimitKW, steadyKW) : null;

  return ok({
    voltageV: v.value,
    activeLoads: { ...states },
    rows,
    steadyStateCurrentA: steadyA,
    steadyStatePowerW: steadyW,
    steadyStatePowerKW: steadyKW,
    peakTransientCurrentA: transientA,
    additionalInrushCurrentA: transientExtraA,
    transientPowerW: transientW,
    transientPowerKW: transientKW,
    remainingServiceMarginKW: margin && margin.ok ? margin.value.serviceMarginKW : null,
    service: margin && margin.ok ? margin.value : margin,
  });
}

/**
 * Evento transitorio explícito: cargas en régimen + una o más que arrancan.
 */
export function evaluateTransientEvent({
  voltageV,
  serviceLimitKW,
  running = [],
  starting = [],
} = {}) {
  const v = requirePositive(voltageV, "voltageV");
  if (!v.ok) return v;

  let baseRunningCurrentA = 0;
  for (const item of running) {
    const i = currentFromEventMember(item, v.value, "run");
    if (!i.ok) return i;
    baseRunningCurrentA += i.value;
  }

  let additionalInrushCurrentA = 0;
  for (const item of starting) {
    const i = currentFromEventMember(item, v.value, "inrush");
    if (!i.ok) return i;
    additionalInrushCurrentA += i.value;
  }

  const transientCurrentA = baseRunningCurrentA + additionalInrushCurrentA;
  const steadyKW = wattsToKilowatts(baseRunningCurrentA * v.value);
  const transientKW = wattsToKilowatts(transientCurrentA * v.value);

  if (![transientCurrentA, steadyKW, transientKW].every(Number.isFinite)) {
    return fail("NOT_FINITE", "transient event produced a non-finite result");
  }

  const margin =
    serviceLimitKW != null ? serviceMarginKW(serviceLimitKW, steadyKW) : null;

  return ok({
    voltageV: v.value,
    baseRunningCurrentA,
    additionalInrushCurrentA,
    transientCurrentA,
    steadyKW,
    transientKW,
    inrushConvertedToMonthlyKWh: 0,
    service: margin && margin.ok ? margin.value : margin,
    remainingServiceMarginKW: margin && margin.ok ? margin.value.serviceMarginKW : null,
    transientExceedsService:
      serviceLimitKW != null ? transientKW > serviceLimitKW : null,
    protectionTripClaimed: false,
    rounded: {
      baseRunningCurrentA: roundTo(baseRunningCurrentA, 3),
      additionalInrushCurrentA: roundTo(additionalInrushCurrentA, 3),
      transientCurrentA: roundTo(transientCurrentA, 3),
    },
  });
}

function currentFromEventMember(item, voltageV, kind) {
  const quantity = Number.isFinite(item.quantity) ? item.quantity : 1;
  if (kind === "inrush") {
    if (item.inrushCurrentA != null) {
      if (!Number.isFinite(item.inrushCurrentA) || item.inrushCurrentA < 0) {
        return fail("INVALID_NUMBER", "inrushCurrentA is invalid");
      }
      return ok(item.inrushCurrentA * quantity);
    }
    if (item.load) return resolveInrushCurrentA(item.load, voltageV);
    return fail("NO_CURRENT", "starting member has no inrush");
  }

  if (item.currentA != null) {
    if (!Number.isFinite(item.currentA) || item.currentA < 0) {
      return fail("INVALID_NUMBER", "currentA is invalid");
    }
    return ok(item.currentA * quantity);
  }
  if (item.powerW != null) {
    if (!Number.isFinite(item.powerW) || item.powerW < 0) {
      return fail("INVALID_NUMBER", "powerW is invalid");
    }
    return ok((item.powerW / voltageV) * quantity, { method: "P/V" });
  }
  if (item.load) return resolveRunCurrentA(item.load, voltageV);
  return fail("NO_CURRENT", "running member has no current or power");
}

export function apparentPowerKW(currentA, voltageV) {
  const v = requirePositive(voltageV, "voltageV");
  if (!v.ok) return v;
  if (!Number.isFinite(currentA) || currentA < 0) {
    return fail("INVALID_NUMBER", "currentA is invalid");
  }
  return ok(wattsToKilowatts(currentA * v.value));
}

export { kilowattsToWatts };
