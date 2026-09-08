import { fail, firstError, ok, requireFinite, requireNonNegative } from "./validation.js";
import { CURRENT_BAND, DEFAULT_THRESHOLDS, pickRangeValue } from "./models.js";

function thresholds(overrides) {
  return { ...DEFAULT_THRESHOLDS, ...(overrides || {}) };
}

/**
 * duty = onTime / totalObservationTime
 */
export function calculateDutyCycle(onTime, totalObservationTime) {
  const on = requireNonNegative(onTime, "onTime");
  const total = requireFinite(totalObservationTime, "totalObservationTime");
  const err = firstError([on, total]);
  if (err) return err;
  if (total.value <= 0) {
    return fail("NOT_POSITIVE", "totalObservationTime must be > 0");
  }
  if (on.value > total.value) {
    return fail("DUTY_OUT_OF_RANGE", "onTime cannot exceed totalObservationTime");
  }
  const duty = on.value / total.value;
  if (!Number.isFinite(duty)) {
    return fail("NOT_FINITE", "duty cycle is not finite");
  }
  return ok(duty, { percent: duty * 100 });
}

export function evaluateDutyCycle(dutyCycle, healthyRange, options = {}) {
  const duty = requireFinite(dutyCycle, "dutyCycle");
  if (!duty.ok) return duty;
  if (duty.value < 0 || duty.value > 1) {
    return fail("DUTY_OUT_OF_RANGE", "dutyCycle must be in [0, 1]");
  }
  const min = pickRangeValue({ min: healthyRange && healthyRange.min, reference: healthyRange && healthyRange.min });
  const max = healthyRange && Number.isFinite(healthyRange.max) ? healthyRange.max : null;
  const lo = healthyRange && Number.isFinite(healthyRange.min) ? healthyRange.min : null;

  if (duty.value === 1 && options.alwaysOnIsFailure) {
    return ok({
      status: CURRENT_BAND.CRITICAL,
      dutyCycle: duty.value,
      reason: "neverStops",
      healthyRange: healthyRange || null,
    });
  }

  if (lo == null || max == null) {
    return ok({
      status: CURRENT_BAND.NORMAL,
      dutyCycle: duty.value,
      healthyRange: healthyRange || null,
      reason: "no-range",
    });
  }

  let status = CURRENT_BAND.NORMAL;
  if (duty.value < lo) status = CURRENT_BAND.BELOW;
  else if (duty.value > max) status = CURRENT_BAND.WARNING;
  if (options.alertAbove != null && duty.value > options.alertAbove) {
    status = CURRENT_BAND.CRITICAL;
  }

  return ok({
    status,
    dutyCycle: duty.value,
    healthyRange: { min: lo, max },
  });
}

export function evaluateCycling({
  numberOfCycles,
  onTime,
  offTime,
  observationPeriod,
  neverStopsAfterSeconds = DEFAULT_THRESHOLDS.neverStopsAfterSeconds,
} = {}) {
  const obs = requireFinite(observationPeriod, "observationPeriod");
  if (!obs.ok) return obs;
  if (obs.value <= 0) return fail("NOT_POSITIVE", "observationPeriod must be > 0");

  const off = offTime == null ? null : requireNonNegative(offTime, "offTime");
  if (off && !off.ok) return off;
  const on = onTime == null ? null : requireNonNegative(onTime, "onTime");
  if (on && !on.ok) return on;

  const neverStops =
    off != null &&
    off.value === 0 &&
    obs.value >= neverStopsAfterSeconds;

  return ok({
    numberOfCycles: numberOfCycles ?? null,
    onTime: on ? on.value : null,
    offTime: off ? off.value : null,
    observationPeriod: obs.value,
    neverStops,
    neverStopsAfterSeconds,
  });
}

export function calculateInrushRatio(inrushCurrentA, runCurrentA) {
  const inrush = requireNonNegative(inrushCurrentA, "inrushCurrentA");
  const run = requireFinite(runCurrentA, "runCurrentA");
  const err = firstError([inrush, run]);
  if (err) return err;
  if (run.value === 0) {
    return fail("DIVISION_BY_ZERO", "runCurrentA is 0; inrush ratio undefined");
  }
  if (run.value < 0) return fail("NEGATIVE", "runCurrentA must be ≥ 0");
  const ratio = inrush.value / run.value;
  if (!Number.isFinite(ratio)) {
    return fail("NOT_FINITE", "inrush ratio is not finite");
  }
  return ok(ratio, { inrushCurrentA: inrush.value, runCurrentA: run.value });
}

/**
 * Evaluación DOL configurable. No es regla de protección.
 */
export function evaluateInrush(ratio, options = {}) {
  const r = requireFinite(ratio, "ratio");
  if (!r.ok) return r;
  if (r.value < 0) return fail("NEGATIVE", "ratio must be ≥ 0");
  const t = thresholds(options);

  let band = CURRENT_BAND.NORMAL;
  if (r.value > t.dolInrushAnomalyRatio) band = CURRENT_BAND.HIGH;
  else if (r.value > t.dolInrushTypicalMax) band = CURRENT_BAND.WARNING;
  else if (r.value < t.dolInrushTypicalMin) band = CURRENT_BAND.BELOW;

  const duration = options.durationSeconds;
  let durationBand = null;
  if (duration != null) {
    const d = requireNonNegative(duration, "durationSeconds");
    if (!d.ok) return d;
    durationBand =
      d.value > t.dolInrushAnomalySeconds ? CURRENT_BAND.WARNING : CURRENT_BAND.NORMAL;
  }

  return ok({
    ratio: r.value,
    typicalMin: t.dolInrushTypicalMin,
    typicalMax: t.dolInrushTypicalMax,
    anomalyRatio: t.dolInrushAnomalyRatio,
    band,
    durationSeconds: duration ?? null,
    durationBand,
    protectionTripClaimed: false,
  });
}

export function currentDeviationPercent(measuredCurrent, expectedCurrent) {
  const m = requireFinite(measuredCurrent, "measuredCurrent");
  const e = requireFinite(expectedCurrent, "expectedCurrent");
  const err = firstError([m, e]);
  if (err) return err;
  if (e.value === 0) {
    return fail("DIVISION_BY_ZERO", "expectedCurrent is 0");
  }
  const pct = (Math.abs(m.value - e.value) / e.value) * 100;
  if (!Number.isFinite(pct)) return fail("NOT_FINITE", "deviation is not finite");
  return ok(pct, { measuredCurrent: m.value, expectedCurrent: e.value });
}

/**
 * below | normal | warning | high | critical
 */
export function compareCurrentToReference({
  measuredA,
  expectedA,
  documentRange,
  options = {},
} = {}) {
  const measured = requireNonNegative(measuredA, "measuredA");
  if (!measured.ok) return measured;
  const t = thresholds(options);

  const min = documentRange && Number.isFinite(documentRange.min) ? documentRange.min : null;
  const max = documentRange && Number.isFinite(documentRange.max) ? documentRange.max : null;

  let deviationPct = null;
  if (expectedA != null) {
    const d = currentDeviationPercent(measured.value, expectedA);
    if (!d.ok) return d;
    deviationPct = d.value;
  }

  let status = CURRENT_BAND.NORMAL;
  if (min != null && measured.value < min) status = CURRENT_BAND.BELOW;
  else if (max != null && measured.value > max) status = CURRENT_BAND.HIGH;
  else if (min != null && max != null) status = CURRENT_BAND.NORMAL;

  if (deviationPct != null) {
    if (deviationPct > t.warningPercent) {
      status = status === CURRENT_BAND.BELOW ? CURRENT_BAND.BELOW : CURRENT_BAND.HIGH;
    } else if (deviationPct > t.normalPercent) {
      if (status === CURRENT_BAND.NORMAL) status = CURRENT_BAND.WARNING;
    }
  }

  if (options.criticalAbove != null && measured.value > options.criticalAbove) {
    status = CURRENT_BAND.CRITICAL;
  }

  return ok({
    status,
    measuredA: measured.value,
    expectedA: expectedA ?? null,
    documentRange: documentRange || null,
    currentDeviationPercent: deviationPct,
    thresholds: { normalPercent: t.normalPercent, warningPercent: t.warningPercent },
  });
}

export function evaluateStandby({
  measuredA,
  documentRange,
  hours,
  voltageV,
} = {}) {
  const i = requireNonNegative(measuredA, "measuredA");
  if (!i.ok) return i;
  const max = documentRange && Number.isFinite(documentRange.max) ? documentRange.max : null;
  const status =
    max != null && i.value > max ? CURRENT_BAND.WARNING : CURRENT_BAND.NORMAL;

  let energyKWh = null;
  if (hours != null && voltageV != null) {
    const h = requireNonNegative(hours, "hours");
    const v = requireFinite(voltageV, "voltageV");
    const err = firstError([h, v]);
    if (err) return err;
    if (v.value <= 0) return fail("NOT_POSITIVE", "voltageV must be > 0");
    energyKWh = (v.value * i.value * h.value) / 1000;
    if (!Number.isFinite(energyKWh)) {
      return fail("NOT_FINITE", "standby energy is not finite");
    }
  }

  return ok({
    status,
    measuredA: i.value,
    documentRange: documentRange || null,
    hiddenLoad: status !== CURRENT_BAND.NORMAL,
    energyKWh,
  });
}
