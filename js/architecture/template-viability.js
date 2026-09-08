import {
  ARCHETYPES,
  COUNTRIES,
  ENVIRONMENTS,
  FAMILIES,
} from "./template-constants.js";

const FORBIDDEN = [
  /snocomm/i,
  /autocad/i,
  /\.dwg\b/i,
  /\/users\//i,
  /andreibarwood/i,
  /saesa/i,
  /\bsec\b/i,
  /calama/i,
  /parinacota/i,
];

function num(v) {
  return typeof v === "number" && Number.isFinite(v);
}

function push(list, code, message) {
  list.push({ code, message });
}

function voltageFitsScale(peakMW, primaryKV) {
  if (!num(peakMW) || !num(primaryKV)) return true;
  if (peakMW < 0.4 && primaryKV >= 66) return false;
  if (peakMW < 2 && primaryKV >= 132) return false;
  if (peakMW < 8 && primaryKV >= 220) return false;
  if (peakMW < 40 && primaryKV >= 400) return false;
  if (peakMW > 80 && primaryKV <= 0.4) return false;
  if (peakMW > 250 && primaryKV <= 11) return false;
  return true;
}

export function validateTemplateViability(t) {
  const errors = [];
  const warnings = [];
  if (!t || typeof t !== "object") {
    return { ok: false, errors: [{ code: "EMPTY", message: "template missing" }], warnings };
  }

  if (t.conceptual !== true) push(errors, "NOT_CONCEPTUAL", "conceptual must be true");
  if (!FAMILIES.includes(t.family)) push(errors, "FAMILY", "invalid family");
  if (!t.archetype || !ARCHETYPES[t.archetype]) push(errors, "ARCHETYPE", "unknown archetype");
  if (!t.country || !COUNTRIES[t.country]) push(errors, "COUNTRY", "unknown country");
  if (!t.environment || !ENVIRONMENTS[t.environment.code || t.environment.id]) {
    if (!t.environment || !t.environment.climate) {
      push(errors, "ENVIRONMENT", "environment missing");
    }
  }
  if (!t.id || /\s/.test(t.id) || !/^[\x20-\x7E]+$/.test(t.id)) {
    push(errors, "ID", "id must be unique ASCII without spaces");
  }

  const blob = JSON.stringify(t);
  for (const re of FORBIDDEN) {
    if (re.test(blob)) push(errors, "PRIVACY", `forbidden token matches ${re}`);
  }

  const load = t.loadProfile || {};
  const peak = load.peakLoadMW;
  const avg = load.averageLoadMW;
  const lf = load.loadFactor;
  const gen = t.generation || {};
  const bess = t.bess || {};
  const sub = t.substation || {};
  const scaleMW = Math.max(
    peak || 0,
    (gen.pv && gen.pv.acMW) || 0,
    (gen.wind && gen.wind.ratedMW) || 0,
    (gen.diesel && gen.diesel.ratedMW) || 0,
    bess.powerMW || 0,
    (sub.transformerTotalMVA || 0) * (sub.powerFactor || 0.9)
  );

  if (num(peak) && peak < 0) push(errors, "NEG_PEAK", "peakLoadMW negative");
  if (num(avg) && avg < 0) push(errors, "NEG_AVG", "averageLoadMW negative");
  if (num(lf) && (lf < 0 || lf > 1)) push(errors, "LOAD_FACTOR", "loadFactor out of [0,1]");
  if (num(peak) && num(avg) && avg > peak + 1e-9) {
    push(errors, "AVG_GT_PEAK", "averageLoadMW > peakLoadMW");
  }
  for (const k of [
    "baseLoadMW",
    "criticalLoadMW",
    "cyclicLoadMW",
    "motorLoadMW",
    "thermalLoadMW",
    "interruptibleLoadMW",
    "standbyLoadMW",
  ]) {
    if (num(load[k]) && load[k] < 0) push(errors, "NEG_LOAD", `${k} negative`);
  }

  if (sub.enabled) {
    if (num(sub.primaryKV) && !voltageFitsScale(scaleMW, sub.primaryKV)) {
      push(errors, "VOLTAGE_SCALE", "primary voltage incoherent with electrical scale");
    }
    if (sub.redundancyMode === "N-1" && (sub.transformerCount || 0) < 2) {
      push(errors, "N1_COUNT", "N-1 declared with a single transformer");
    }
    if (num(sub.transformerCount) && num(sub.transformerMVA) && num(sub.transformerTotalMVA)) {
      const expect = sub.transformerCount * sub.transformerMVA;
      if (Math.abs(expect - sub.transformerTotalMVA) > 0.05 * Math.max(1, expect)) {
        push(errors, "TRAFO_SUM", "transformerTotalMVA != count × unit MVA");
      }
    }
    if (num(sub.powerFactor) && (sub.powerFactor <= 0 || sub.powerFactor > 1)) {
      push(errors, "PF", "powerFactor out of (0,1]");
    }
    if (num(sub.utilizationFactor) && (sub.utilizationFactor < 0 || sub.utilizationFactor > 1)) {
      push(errors, "UTIL", "utilizationFactor out of [0,1]");
    }
    if (num(peak) && num(sub.transformerTotalMVA) && num(sub.powerFactor)) {
      const cap = sub.transformerTotalMVA * sub.powerFactor;
      if (peak > cap + 1e-6) {
        push(errors, "TRAFO_CAPACITY", "peakLoad exceeds transformer apparent capacity");
      } else if (sub.utilizationFactor && peak > cap * sub.utilizationFactor) {
        push(warnings, "TRAFO_LOADING", "peak exceeds planned utilization");
      }
    }
    if (t.family === "H" && scaleMW < 5 && sub.primaryKV >= 220) {
      push(errors, "HV_MICROGRID", "bulk HV for a small microgrid");
    }
  }

  if (gen.enabled && gen.pv) {
    const pv = gen.pv;
    if (num(pv.dcMWp) && pv.dcMWp < 0) push(errors, "NEG_PV", "dcMWp negative");
    if (num(pv.acMW) && pv.acMW < 0) push(errors, "NEG_PV_AC", "acMW negative");
    if (num(pv.dcMWp) && num(pv.acMW) && pv.acMW > pv.dcMWp + 1e-9) {
      push(errors, "AC_GT_DC", "PV AC greater than DC without explanation");
    }
    if (num(pv.dcAcRatio) && num(pv.dcMWp) && num(pv.acMW) && pv.acMW > 0) {
      const r = pv.dcMWp / pv.acMW;
      if (Math.abs(r - pv.dcAcRatio) > 0.08) {
        push(warnings, "DCAC_MISMATCH", "dcAcRatio does not match dc/ac");
      }
      if (pv.dcAcRatio > 1.45) push(warnings, "HIGH_DCAC", "high DC/AC ratio");
    }
    if (num(pv.capacityFactor) && (pv.capacityFactor < 0 || pv.capacityFactor > 1)) {
      push(errors, "CF", "capacityFactor out of [0,1]");
    }
    if (num(pv.lossesPercent) && (pv.lossesPercent < 0 || pv.lossesPercent >= 100)) {
      push(errors, "LOSSES", "lossesPercent out of range");
    }
    if (
      gen.energyCalculationMethod !== "specific-yield" &&
      gen.energyCalculationMethod !== "capacity-factor"
    ) {
      push(errors, "ENERGY_METHOD", "energyCalculationMethod required");
    }
    if (num(pv.dcMWp) && pv.dcMWp >= 20 && sub.enabled && sub.secondaryKV === 0.4 && !sub.primaryKV) {
      push(errors, "PV_400V", "utility-scale PV on 400 V without transformation");
    }
    if (num(pv.dcMWp) && pv.dcMWp >= 20 && sub.enabled && sub.primaryKV === 0.4) {
      push(errors, "PV_400V", "utility-scale PV connected at 0.4 kV");
    }
  }

  if (gen.enabled && gen.wind && num(gen.wind.capacityFactor)) {
    if (gen.wind.capacityFactor < 0 || gen.wind.capacityFactor > 1) {
      push(errors, "WIND_CF", "wind capacityFactor out of [0,1]");
    }
  }

  if (gen.diesel && gen.diesel.ratedMW === 0) {
    push(errors, "DIESEL_ZERO", "diesel backup with zero power");
  }

  if (bess.enabled) {
    if (!num(bess.powerMW) || bess.powerMW <= 0) {
      push(errors, "BESS_POWER", "BESS enabled with powerMW ≤ 0");
    }
    if (!num(bess.energyMWh) || bess.energyMWh < 0) {
      push(errors, "BESS_ENERGY", "BESS energy invalid");
    }
    if (num(bess.powerMW) && bess.powerMW > 0 && num(bess.energyMWh) && num(bess.durationHours)) {
      const d = bess.energyMWh / bess.powerMW;
      if (Math.abs(d - bess.durationHours) > 0.05 * Math.max(1, d)) {
        push(errors, "BESS_DURATION", "durationHours != energyMWh / powerMW");
      }
    }
    if (num(bess.roundTripEfficiency) && (bess.roundTripEfficiency <= 0 || bess.roundTripEfficiency > 1)) {
      push(errors, "RTE", "roundTripEfficiency out of (0,1]");
    }
    if (num(bess.usableDoD) && (bess.usableDoD <= 0 || bess.usableDoD > 1)) {
      push(errors, "DOD", "usableDoD out of (0,1]");
    }
    if (num(bess.durationHours) && bess.durationHours >= 10) {
      push(warnings, "LONG_BESS", "high BESS duration");
    }
    if (Array.isArray(bess.purpose) && bess.purpose.includes("grid-forming") && bess.enabled === false) {
      push(errors, "GFM_OFF", "grid-forming BESS disabled");
    }
  }

  const grid = t.grid || {};
  if (grid.mode === "off-grid" || grid.strength === "isolated") {
    const hasPv = gen.enabled && gen.pv && gen.pv.dcMWp > 0;
    const hasWind = gen.enabled && gen.wind && gen.wind.ratedMW > 0;
    const hasDiesel = gen.diesel && gen.diesel.ratedMW > 0;
    const hasBess = bess.enabled && bess.powerMW > 0;
    if (!hasPv && !hasWind && !hasDiesel) {
      push(errors, "OFFGRID_NO_GEN", "off-grid without generation or backup");
    }
    if (!hasDiesel && !hasBess) {
      push(warnings, "OFFGRID_NO_BACKUP", "off-grid without diesel or BESS");
    }
  }
  if (grid.strength === "weak" && grid.mode === "grid-connected" && !bess.enabled && !(gen.diesel && gen.diesel.ratedMW > 0)) {
    push(warnings, "WEAK_NO_SUPPORT", "weak grid without BESS or diesel");
  }

  const app = t.application;
  if (app === "desalination") {
    if (!num(peak) || peak < 1) push(errors, "DESAL_LOAD", "desalination without significant load");
    if (!num(load.motorLoadMW) || load.motorLoadMW < 0.3 * (peak || 0)) {
      push(warnings, "DESAL_MOTORS", "desalination motor share looks low");
    }
  }

  if (t.environment) {
    const env = t.environment;
    if (env.dustLevel === "extreme" || env.soilingRisk === "extreme") {
      push(warnings, "EXTREME_DUST", "extreme dust / soiling");
    }
    if (env.salinityRisk === "extreme" || env.corrosionRisk === "extreme") {
      push(warnings, "HIGH_SALINITY", "extreme salinity / corrosion");
    }
    if (env.duneRisk === "high" || env.duneRisk === "extreme") {
      push(warnings, "DUNE", "mobile dune risk — siting constraint");
    }
    if (env.vegetationConstraint === "high" && gen.enabled && gen.pv && gen.pv.dcMWp > 10) {
      push(warnings, "AGRI_LAND", "utility PV on sensitive vegetation / agriculture");
    }
  }

  if (Array.isArray(t.feeders)) {
    for (const f of t.feeders) {
      if (num(f.lengthKM) && f.lengthKM > 80) push(warnings, "LONG_FEEDER", `${f.name || "feeder"} is long`);
      if (num(f.estimatedLoadMW) && f.estimatedLoadMW < 0) push(errors, "NEG_FEEDER", "feeder load negative");
    }
  }

  if (load.seasonalVariationPercent >= 60) {
    push(warnings, "HIGH_SEASONAL", "high seasonal variation");
  }

  if (t.economics && t.economics.btcPerKWh !== null && t.economics.btcPerKWh !== undefined) {
    push(errors, "TARIFF", "btcPerKWh must be null on templates");
  }

  if (grid.strength === "weak") push(warnings, "WEAK_GRID", "weak-grid context");

  return { ok: errors.length === 0, errors, warnings };
}

export function scaleBand(peakMW) {
  if (peakMW < 0.5) return "kW-scale";
  if (peakMW < 1) return "sub-MW";
  if (peakMW < 10) return "1–10 MW";
  if (peakMW < 50) return "10–50 MW";
  if (peakMW < 200) return "50–200 MW";
  if (peakMW < 500) return "200–500 MW";
  return "500+ MW";
}
