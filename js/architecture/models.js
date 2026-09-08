/**
 * Constantes de modelo y lectura de presets.
 * No calcula; solo interpreta el schema de reference-loads.js.
 */

export const LOAD_STATES = Object.freeze({
  OFF: "OFF",
  STANDBY: "STANDBY",
  RUNNING: "RUNNING",
  STARTING: "STARTING",
});

export const ENERGY_METHODS = Object.freeze({
  CONTINUOUS: "continuous",
  DUTY_CYCLE: "dutyCycle",
  CYCLES: "cycles",
  CYCLES_FROM_POWER: "cyclesFromPower",
  STANDBY: "standby",
  EMPIRICAL_ONLY: "empiricalOnly",
  SEASON_ZERO: "seasonZero",
});

export const ENERGY_COMPARE = Object.freeze({
  WITHIN: "within",
  BELOW: "below",
  ABOVE: "above",
  NO_CALCULATED: "no-calculated",
  NO_REFERENCE: "no-reference",
});

export const CURRENT_BAND = Object.freeze({
  BELOW: "below",
  NORMAL: "normal",
  WARNING: "warning",
  HIGH: "high",
  CRITICAL: "critical",
});

export const SERVICE_STATUS = Object.freeze({
  OK: "OK",
  NEAR: "NEAR",
  OVERLOAD: "OVERLOAD",
});

export const DEFAULT_THRESHOLDS = Object.freeze({
  normalPercent: 10,
  warningPercent: 15,
  nearServicePercent: 90,
  dolInrushTypicalMin: 5,
  dolInrushTypicalMax: 8,
  dolInrushAnomalyRatio: 10,
  dolInrushAnomalySeconds: 1,
  neverStopsAfterSeconds: 45 * 60,
});

export function pickRangeValue(rangeOrNumber) {
  if (rangeOrNumber == null) return null;
  if (typeof rangeOrNumber === "number") {
    return Number.isFinite(rangeOrNumber) ? rangeOrNumber : null;
  }
  if (typeof rangeOrNumber !== "object") return null;
  const { reference, min, max } = rangeOrNumber;
  if (Number.isFinite(reference)) return reference;
  if (Number.isFinite(min) && Number.isFinite(max)) return (min + max) / 2;
  if (Number.isFinite(min)) return min;
  if (Number.isFinite(max)) return max;
  return null;
}

export function pickNominalPowerW(load) {
  if (!load) return null;
  return pickRangeValue(load.nominalPowerW);
}

export function pickQuantity(load) {
  const q = load && load.quantity;
  if (q == null) return 1;
  return Number.isFinite(q) && q >= 0 ? q : 1;
}

export function energyMethodFor(load) {
  if (!load) return ENERGY_METHODS.EMPIRICAL_ONLY;
  const usage = load.usage || {};
  const hasCycleEnergy =
    pickRangeValue(usage.energyPerCycleKWh) != null &&
    pickRangeValue(usage.cyclesPerMonth) != null;
  const hasHours = pickRangeValue(usage.hoursPerDay) != null;
  const hasDuty = pickRangeValue(load.dutyCycle) != null;
  const hasCycleDuration =
    pickRangeValue(usage.cycleDurationSeconds) != null &&
    pickRangeValue(usage.cyclesPerMonth) != null;

  if (load.category === "compressor" && hasDuty) return ENERGY_METHODS.DUTY_CYCLE;
  if (hasCycleEnergy) return ENERGY_METHODS.CYCLES;
  if (hasHours) return ENERGY_METHODS.CONTINUOUS;
  if (load.category === "standby") return ENERGY_METHODS.STANDBY;
  if (
    (load.category === "thermalCycle" || load.category === "mixedCycle") &&
    hasCycleDuration
  ) {
    return ENERGY_METHODS.CYCLES_FROM_POWER;
  }
  return ENERGY_METHODS.EMPIRICAL_ONLY;
}

export function loadAppliesToSeason(load, season) {
  if (!load) return false;
  if (season === "custom" || season === "allYear") return true;
  const loadSeason = load.season || "allYear";
  if (loadSeason === "allYear" || loadSeason === "custom") return true;
  return loadSeason === season;
}

/**
 * Colapsa grupos mutuamente exclusivos (p. ej. tres posiciones de un calefactor).
 */
export function selectLoads(loads, exclusiveSelection = {}) {
  const list = Array.isArray(loads) ? loads : [];
  const seenGroups = new Map();
  const out = [];

  for (const load of list) {
    const group = load && load.mutuallyExclusiveGroup;
    if (!group) {
      out.push(load);
      continue;
    }
    if (seenGroups.has(group)) continue;
    seenGroups.set(group, true);
    const wantedId = exclusiveSelection[group];
    const chosen =
      (wantedId && list.find((item) => item.id === wantedId)) ||
      list.find((item) => item.mutuallyExclusiveGroup === group);
    if (chosen) out.push(chosen);
  }

  return out;
}
