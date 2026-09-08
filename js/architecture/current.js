import { roundTo, TABLE_VOLTAGE_V } from "./units.js";
import { fail, firstError, ok, requireFinite, requirePositive } from "./validation.js";
import { pickNominalPowerW, pickQuantity, pickRangeValue } from "./models.js";

/**
 * I = P / V  — relación de diagnóstico para cargas resistivas.
 */
export function calculateResistiveCurrent(powerW, voltageV) {
  const p = requireFinite(powerW, "powerW");
  const v = requirePositive(voltageV, "voltageV");
  const err = firstError([p, v]);
  if (err) return err;
  if (p.value < 0) return fail("NEGATIVE", "powerW must be ≥ 0");
  if (p.value === 0) {
    return ok(0, { formula: "I=P/V", powerW: 0, voltageV: v.value });
  }
  const currentA = p.value / v.value;
  if (!Number.isFinite(currentA)) {
    return fail("NOT_FINITE", "I=P/V produced a non-finite result");
  }
  return ok(currentA, {
    formula: "I=P/V",
    powerW: p.value,
    voltageV: v.value,
    roundedA: roundTo(currentA, 4),
  });
}

/**
 * I = P / (V × PF). PF es obligatorio; no se inventa.
 */
export function calculateSinglePhaseCurrent(powerW, voltageV, powerFactor) {
  const p = requireFinite(powerW, "powerW");
  const v = requirePositive(voltageV, "voltageV");
  if (!p.ok) return p;
  if (!v.ok) return v;
  if (p.value < 0) return fail("NEGATIVE", "powerW must be ≥ 0");

  if (powerFactor === undefined) {
    return fail("PF_REQUIRED", "powerFactor is unknown; do not invent PF");
  }
  const pf = requireFinite(powerFactor, "powerFactor");
  if (!pf.ok) return pf;
  if (pf.value <= 0) {
    return fail("PF_ZERO", "powerFactor must be > 0");
  }
  if (pf.value > 1) {
    return fail("PF_OUT_OF_RANGE", "powerFactor must be ≤ 1");
  }

  const currentA = p.value / (v.value * pf.value);
  if (!Number.isFinite(currentA)) {
    return fail("NOT_FINITE", "I=P/(V·PF) produced a non-finite result");
  }
  return ok(currentA, {
    formula: "I=P/(V·PF)",
    powerW: p.value,
    voltageV: v.value,
    powerFactor: pf.value,
    roundedA: roundTo(currentA, 4),
  });
}

/**
 * Recalcula I al cambiar V. No usa un +4,5 % hardcodeado.
 * I2 = I1 × (V1 / V2). Equivale a P/V2 si I1 = P/V1.
 */
export function scaleCurrentForVoltage(currentA, fromVoltageV, toVoltageV) {
  const i = requireFinite(currentA, "currentA");
  const v1 = requirePositive(fromVoltageV, "fromVoltageV");
  const v2 = requirePositive(toVoltageV, "toVoltageV");
  const err = firstError([i, v1, v2]);
  if (err) return err;
  if (i.value < 0) return fail("NEGATIVE", "currentA must be ≥ 0");

  const scaledA = i.value * (v1.value / v2.value);
  const percentDifference = ((scaledA - i.value) / i.value) * 100;
  const pct = i.value === 0 ? 0 : percentDifference;

  if (!Number.isFinite(scaledA)) {
    return fail("NOT_FINITE", "voltage scaling produced a non-finite result");
  }

  return ok(scaledA, {
    formula: "I2=I1·(V1/V2)",
    fromVoltageV: v1.value,
    toVoltageV: v2.value,
    fromCurrentA: i.value,
    percentDifference: i.value === 0 ? 0 : pct,
    roundedA: roundTo(scaledA, 4),
  });
}

/**
 * Par 220/230 (u otro) a partir de P, sin porcentaje mágico.
 */
export function compareCurrentsAtVoltages(powerW, voltageA, voltageB) {
  const iA = calculateResistiveCurrent(powerW, voltageA);
  const iB = calculateResistiveCurrent(powerW, voltageB);
  if (!iA.ok) return iA;
  if (!iB.ok) return iB;
  const percentDifference = ((iB.value - iA.value) / iA.value) * 100;
  if (!Number.isFinite(percentDifference) && iA.value !== 0) {
    return fail("NOT_FINITE", "percent difference is not finite");
  }
  return ok(
    {
      currentAtA: iA.value,
      currentAtB: iB.value,
      voltageA,
      voltageB,
      percentDifference: iA.value === 0 ? 0 : percentDifference,
    },
    { formula: "I=P/V at each voltage" }
  );
}

const RESISTIVE_CATEGORIES = new Set(["resistive", "thermalCycle", "lighting"]);

/**
 * Corriente de régimen a una tensión dada.
 * Resistiva: P/V.
 * Si hay PF explícito: P/(V·PF).
 * Si no hay PF: escala la corriente documental (no se inventa PF).
 */
export function resolveRunCurrentA(load, voltageV, options = {}) {
  const v = requirePositive(voltageV, "voltageV");
  if (!v.ok) return v;
  if (!load) return fail("UNDEFINED", "load is undefined");

  const quantity = pickQuantity(load);
  const powerW = pickNominalPowerW(load);
  const tableV = Number.isFinite(load.voltageV) ? load.voltageV : TABLE_VOLTAGE_V;
  const pf = load.powerFactor;
  const category = load.category;

  if (pf != null) {
    if (powerW == null) {
      return fail("UNDEFINED", "nominalPowerW required when powerFactor is set");
    }
    const i = calculateSinglePhaseCurrent(powerW, v.value, pf);
    if (!i.ok) return i;
    return ok(i.value * quantity, {
      method: "P/(V·PF)",
      perUnitA: i.value,
      quantity,
    });
  }

  if (RESISTIVE_CATEGORIES.has(category) && powerW != null) {
    const i = calculateResistiveCurrent(powerW, v.value);
    if (!i.ok) return i;
    return ok(i.value * quantity, {
      method: "P/V",
      perUnitA: i.value,
      quantity,
    });
  }

  const docA = pickRangeValue(load.runCurrentA);
  if (docA != null) {
    const scaled = scaleCurrentForVoltage(docA, tableV, v.value);
    if (!scaled.ok) return scaled;
    return ok(scaled.value * quantity, {
      method: "document-current-scaled",
      perUnitA: scaled.value,
      tableVoltageV: tableV,
      documentCurrentA: docA,
      quantity,
    });
  }

  if (options.allowResistiveFallback && powerW != null) {
    const i = calculateResistiveCurrent(powerW, v.value);
    if (!i.ok) return i;
    return ok(i.value * quantity, {
      method: "P/V-fallback",
      assumedResistive: true,
      perUnitA: i.value,
      quantity,
    });
  }

  return fail(
    "NO_CURRENT",
    "no run current: missing document range and no resistive P/V path"
  );
}

export function resolveStandbyCurrentA(load, voltageV) {
  const v = requirePositive(voltageV, "voltageV");
  if (!v.ok) return v;
  if (!load) return fail("UNDEFINED", "load is undefined");
  const quantity = pickQuantity(load);
  const tableV = Number.isFinite(load.voltageV) ? load.voltageV : TABLE_VOLTAGE_V;
  const docA =
    pickRangeValue(load.standbyCurrentA) ?? pickRangeValue(load.offCurrentA);
  if (docA == null) {
    return fail("NO_CURRENT", "no standby/off current on load");
  }
  const scaled = scaleCurrentForVoltage(docA, tableV, v.value);
  if (!scaled.ok) return scaled;
  return ok(scaled.value * quantity, {
    method: "document-standby-scaled",
    perUnitA: scaled.value,
    quantity,
  });
}

export function resolveInrushCurrentA(load, voltageV) {
  const v = requirePositive(voltageV, "voltageV");
  if (!v.ok) return v;
  if (!load) return fail("UNDEFINED", "load is undefined");
  const quantity = pickQuantity(load);
  const tableV = Number.isFinite(load.voltageV) ? load.voltageV : TABLE_VOLTAGE_V;
  const docA = pickRangeValue(load.inrushCurrentA);
  if (docA == null) {
    return fail("NO_CURRENT", "no inrush current on load");
  }
  const scaled = scaleCurrentForVoltage(docA, tableV, v.value);
  if (!scaled.ok) return scaled;
  return ok(scaled.value * quantity, {
    method: "document-inrush-scaled",
    perUnitA: scaled.value,
    quantity,
  });
}
