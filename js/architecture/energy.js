import {
  DEFAULT_DAYS_PER_MONTH,
  DEFAULT_MONTHS_PER_YEAR,
  HOURS_PER_DAY,
  secondsToHours,
  wattsToKilowatts,
} from "./units.js";
import {
  fail,
  firstError,
  ok,
  requireFinite,
  requireNonNegative,
  requirePositive,
} from "./validation.js";
import {
  ENERGY_COMPARE,
  ENERGY_METHODS,
  energyMethodFor,
  loadAppliesToSeason,
  pickNominalPowerW,
  pickQuantity,
  pickRangeValue,
} from "./models.js";

function days(options) {
  const n = options && options.daysPerMonth;
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_DAYS_PER_MONTH;
}

function packEnergy(monthKWh, daysPerMonth) {
  const dayKWh = monthKWh / daysPerMonth;
  const yearKWh = monthKWh * DEFAULT_MONTHS_PER_YEAR;
  if (![monthKWh, dayKWh, yearKWh].every(Number.isFinite)) {
    return fail("NOT_FINITE", "energy pack produced a non-finite result");
  }
  return ok({
    energyDayKWh: dayKWh,
    energyMonthKWh: monthKWh,
    energyYearKWh: yearKWh,
    daysPerMonth,
  });
}

/** E_day = P_kW × hoursPerDay ; E_month = E_day × daysPerMonth */
export function calculateContinuousEnergy({
  powerW,
  hoursPerDay,
  daysPerMonth = DEFAULT_DAYS_PER_MONTH,
} = {}) {
  const p = requireNonNegative(powerW, "powerW");
  const h = requireNonNegative(hoursPerDay, "hoursPerDay");
  const d = requirePositive(daysPerMonth, "daysPerMonth");
  const err = firstError([p, h, d]);
  if (err) return err;
  const monthKWh = wattsToKilowatts(p.value) * h.value * d.value;
  const packed = packEnergy(monthKWh, d.value);
  if (!packed.ok) return packed;
  return ok(packed.value, { method: ENERGY_METHODS.CONTINUOUS, formula: "E=P_kW·h·N_d" });
}

/**
 * E = P_kW × timeHours × dutyCycle.
 * Para nevera/freezer: timeHours = 24 × daysPerMonth.
 */
export function calculateDutyCycleEnergy({
  powerW,
  hoursPerDay = HOURS_PER_DAY,
  daysPerMonth = DEFAULT_DAYS_PER_MONTH,
  dutyCycle,
} = {}) {
  const p = requireNonNegative(powerW, "powerW");
  const h = requireNonNegative(hoursPerDay, "hoursPerDay");
  const d = requirePositive(daysPerMonth, "daysPerMonth");
  const duty = requireFinite(dutyCycle, "dutyCycle");
  const err = firstError([p, h, d, duty]);
  if (err) return err;
  if (duty.value < 0 || duty.value > 1) {
    return fail("DUTY_OUT_OF_RANGE", "dutyCycle must be in [0, 1]");
  }
  const timeHours = h.value * d.value;
  const monthKWh = wattsToKilowatts(p.value) * timeHours * duty.value;
  const packed = packEnergy(monthKWh, d.value);
  if (!packed.ok) return packed;
  return ok(packed.value, {
    method: ENERGY_METHODS.DUTY_CYCLE,
    formula: "E=P_kW·t·duty",
    timeHours,
    dutyCycle: duty.value,
  });
}

export function calculateCycleEnergy({
  cyclesPerMonth,
  energyPerCycleKWh,
  daysPerMonth = DEFAULT_DAYS_PER_MONTH,
} = {}) {
  const n = requireNonNegative(cyclesPerMonth, "cyclesPerMonth");
  const e = requireNonNegative(energyPerCycleKWh, "energyPerCycleKWh");
  const d = requirePositive(daysPerMonth, "daysPerMonth");
  const err = firstError([n, e, d]);
  if (err) return err;
  const monthKWh = n.value * e.value;
  const packed = packEnergy(monthKWh, d.value);
  if (!packed.ok) return packed;
  return ok(packed.value, {
    method: ENERGY_METHODS.CYCLES,
    formula: "E=n_cycles·e_cycle",
  });
}

/**
 * E = P_kW × cycleDurationHours × cycles.
 * Solo si `enabled === true`.
 */
export function calculateCycleEnergyFromPower({
  powerW,
  cycleDurationHours,
  cyclesPerMonth,
  daysPerMonth = DEFAULT_DAYS_PER_MONTH,
  enabled = false,
} = {}) {
  if (!enabled) {
    return fail(
      "APPROXIMATION_DISABLED",
      "cycle energy from power is disabled; pass enabled: true"
    );
  }
  const p = requireNonNegative(powerW, "powerW");
  const dur = requireNonNegative(cycleDurationHours, "cycleDurationHours");
  const n = requireNonNegative(cyclesPerMonth, "cyclesPerMonth");
  const d = requirePositive(daysPerMonth, "daysPerMonth");
  const err = firstError([p, dur, n, d]);
  if (err) return err;
  const monthKWh = wattsToKilowatts(p.value) * dur.value * n.value;
  const packed = packEnergy(monthKWh, d.value);
  if (!packed.ok) return packed;
  return ok(packed.value, {
    method: ENERGY_METHODS.CYCLES_FROM_POWER,
    formula: "E=P_kW·t_cycle·n",
  });
}

/**
 * Stand-by: P × hours, o V × I × hours cuando P no está y V,I son válidos.
 */
export function calculateStandbyEnergy({
  powerW,
  voltageV,
  currentA,
  hours,
  daysPerMonth = DEFAULT_DAYS_PER_MONTH,
} = {}) {
  const h = requireNonNegative(hours, "hours");
  if (!h.ok) return h;
  const d = requirePositive(daysPerMonth, "daysPerMonth");
  if (!d.ok) return d;

  let pW = null;
  if (powerW != null) {
    const p = requireNonNegative(powerW, "powerW");
    if (!p.ok) return p;
    pW = p.value;
  } else if (voltageV != null && currentA != null) {
    const v = requirePositive(voltageV, "voltageV");
    const i = requireNonNegative(currentA, "currentA");
    const err = firstError([v, i]);
    if (err) return err;
    pW = v.value * i.value;
  } else {
    return fail("UNDEFINED", "standby energy needs powerW or (voltageV and currentA)");
  }

  const monthKWh = wattsToKilowatts(pW) * h.value;
  const packed = packEnergy(monthKWh, d.value);
  if (!packed.ok) return packed;
  return ok(packed.value, {
    method: ENERGY_METHODS.STANDBY,
    formula: powerW != null ? "E=P·t" : "E=V·I·t",
    powerW: pW,
  });
}

export function compareEnergyToReference(calculatedKWh, referenceRange) {
  if (calculatedKWh == null) {
    return ok({
      status: ENERGY_COMPARE.NO_CALCULATED,
      calculatedKWh: null,
      reference: referenceRange || null,
    });
  }
  const calc = requireFinite(calculatedKWh, "calculatedKWh");
  if (!calc.ok) return calc;
  if (calc.value < 0) return fail("NEGATIVE", "calculatedKWh must be ≥ 0");

  if (!referenceRange || typeof referenceRange !== "object") {
    if (typeof referenceRange === "number") {
      return compareEnergyToReference(calc.value, { reference: referenceRange });
    }
    return ok({
      status: ENERGY_COMPARE.NO_REFERENCE,
      calculatedKWh: calc.value,
      reference: null,
    });
  }

  const min = Number.isFinite(referenceRange.min) ? referenceRange.min : null;
  const max = Number.isFinite(referenceRange.max) ? referenceRange.max : null;
  const ref = Number.isFinite(referenceRange.reference)
    ? referenceRange.reference
    : null;

  let status = ENERGY_COMPARE.NO_REFERENCE;
  if (min != null && max != null) {
    if (calc.value < min) status = ENERGY_COMPARE.BELOW;
    else if (calc.value > max) status = ENERGY_COMPARE.ABOVE;
    else status = ENERGY_COMPARE.WITHIN;
  } else if (ref != null) {
    status = calc.value === ref ? ENERGY_COMPARE.WITHIN : ENERGY_COMPARE.ABOVE;
    if (calc.value < ref) status = ENERGY_COMPARE.BELOW;
    if (Math.abs(calc.value - ref) < 1e-9) status = ENERGY_COMPARE.WITHIN;
  }

  return ok({
    status,
    calculatedKWh: calc.value,
    reference: { min, reference: ref, max },
    deltaVsReference: ref != null ? calc.value - ref : null,
  });
}

function seasonZero(daysPerMonth, method) {
  const packed = packEnergy(0, daysPerMonth);
  if (!packed.ok) return packed;
  return ok(packed.value, { method, formula: "season-excluded" });
}

/**
 * Energía de una carga. `calculated` y `reference` conviven; ninguno sustituye al otro.
 */
export function calculateLoadEnergy(load, options = {}) {
  if (!load) return fail("UNDEFINED", "load is undefined");
  const daysPerMonth = days(options);
  const season = options.season || "allYear";
  const quantity = pickQuantity(load);

  if (!loadAppliesToSeason(load, season)) {
    const z = seasonZero(daysPerMonth, ENERGY_METHODS.SEASON_ZERO);
    if (!z.ok) return z;
    return ok({
      loadId: load.id,
      method: ENERGY_METHODS.SEASON_ZERO,
      calculated: z.value,
      reference: load.monthlyEnergyKWh || null,
      comparison: compareEnergyToReference(0, { reference: 0 }).value,
      quantity,
    });
  }

  if (
    season === "summer" &&
    load.seasonalEnergyKWh &&
    pickRangeValue(load.seasonalEnergyKWh.summer) === 0
  ) {
    const z = seasonZero(daysPerMonth, ENERGY_METHODS.SEASON_ZERO);
    if (!z.ok) return z;
    return ok({
      loadId: load.id,
      method: ENERGY_METHODS.SEASON_ZERO,
      calculated: z.value,
      reference: load.seasonalEnergyKWh.summer,
      comparison: compareEnergyToReference(0, load.seasonalEnergyKWh.summer).value,
      quantity,
    });
  }

  const method = energyMethodFor(load);
  const powerW = pickNominalPowerW(load);
  const usage = load.usage || {};
  let calc = fail("NO_CALCULATED", "no calculation path for this load");

  if (method === ENERGY_METHODS.DUTY_CYCLE) {
    calc = calculateDutyCycleEnergy({
      powerW,
      hoursPerDay: HOURS_PER_DAY,
      daysPerMonth,
      dutyCycle: pickRangeValue(load.dutyCycle),
    });
  } else if (method === ENERGY_METHODS.CONTINUOUS) {
    calc = calculateContinuousEnergy({
      powerW,
      hoursPerDay: pickRangeValue(usage.hoursPerDay),
      daysPerMonth,
    });
  } else if (method === ENERGY_METHODS.CYCLES) {
    calc = calculateCycleEnergy({
      cyclesPerMonth: pickRangeValue(usage.cyclesPerMonth),
      energyPerCycleKWh: pickRangeValue(usage.energyPerCycleKWh),
      daysPerMonth,
    });
  } else if (method === ENERGY_METHODS.CYCLES_FROM_POWER) {
    const durS = pickRangeValue(usage.cycleDurationSeconds);
    calc = calculateCycleEnergyFromPower({
      powerW,
      cycleDurationHours: durS != null ? secondsToHours(durS) : null,
      cyclesPerMonth: pickRangeValue(usage.cyclesPerMonth),
      daysPerMonth,
      enabled: options.allowCyclePowerApproximation === true,
    });
  } else if (method === ENERGY_METHODS.STANDBY) {
    const hours =
      pickRangeValue(usage.hoursPerDay) != null
        ? pickRangeValue(usage.hoursPerDay) * daysPerMonth
        : HOURS_PER_DAY * daysPerMonth;
    calc = calculateStandbyEnergy({
      powerW,
      voltageV: options.voltageV,
      currentA: pickRangeValue(load.standbyCurrentA),
      hours,
      daysPerMonth,
    });
  }

  const calculated = calc.ok
    ? scalePacked(calc.value, quantity)
    : null;
  const calculatedError = calc.ok ? null : calc.error;
  const reference = resolveReferenceEnergy(load, season);
  const comparison = compareEnergyToReference(
    calculated ? calculated.energyMonthKWh : null,
    reference
  );

  return ok({
    loadId: load.id,
    method: calc.ok ? calc.method : method,
    formula: calc.ok ? calc.formula : null,
    calculated,
    calculatedError,
    reference,
    comparison: comparison.ok ? comparison.value : null,
    quantity,
  });
}

function scalePacked(packed, quantity) {
  if (quantity === 1) return packed;
  return {
    energyDayKWh: packed.energyDayKWh * quantity,
    energyMonthKWh: packed.energyMonthKWh * quantity,
    energyYearKWh: packed.energyYearKWh * quantity,
    daysPerMonth: packed.daysPerMonth,
  };
}

function resolveReferenceEnergy(load, season) {
  if (season === "summer" && load.seasonalEnergyKWh && load.seasonalEnergyKWh.summer) {
    return load.seasonalEnergyKWh.summer;
  }
  if (season === "winter" && load.seasonalEnergyKWh && load.seasonalEnergyKWh.winter) {
    return load.seasonalEnergyKWh.winter;
  }
  return load.monthlyEnergyKWh || null;
}

/**
 * El usuario elige la estación. No se infiere del calendario.
 */
export function calculateSeason(season, options = {}) {
  const allowed = ["winter", "summer", "custom", "allYear"];
  if (!allowed.includes(season)) {
    return fail("INVALID_SEASON", `season must be one of ${allowed.join(", ")}`);
  }
  if (season === "custom") {
    const w = options.winterMonths;
    const s = options.summerMonths;
    if (w != null) {
      const wr = requireNonNegative(w, "winterMonths");
      if (!wr.ok) return wr;
    }
    if (s != null) {
      const sr = requireNonNegative(s, "summerMonths");
      if (!sr.ok) return sr;
    }
  }
  return ok({
    season,
    winterMonths: season === "custom" ? options.winterMonths ?? null : season === "winter" ? DEFAULT_MONTHS_PER_YEAR : 0,
    summerMonths: season === "custom" ? options.summerMonths ?? null : season === "summer" ? DEFAULT_MONTHS_PER_YEAR : 0,
    inferredFromCalendar: false,
  });
}
