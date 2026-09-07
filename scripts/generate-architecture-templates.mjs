#!/usr/bin/env node
/**
 * Deterministic generator for Arquitectura Sagrada templates.
 * Run: node scripts/generate-architecture-templates.mjs
 * Output is stored; the website does not regenerate at runtime.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ARCHETYPES,
  COUNTRIES,
  ENVIRONMENTS,
  FAMILY_NAMES,
  TEMPLATE_DISCLAIMER,
  YIELD_BY_ENV,
} from "../js/architecture/template-constants.js";
import { scaleBand, validateTemplateViability } from "../js/architecture/template-viability.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SHAPES = {
  "utility-export": { lf: 0.28, base: 0.22, cyclic: 0.04, motor: 0.18, thermal: 0.04, critical: 0.12, interruptible: 0, standby: 0.06, dominant: "auxiliary", seasonal: 8 },
  collector: { lf: 0.3, base: 0.2, cyclic: 0.05, motor: 0.2, thermal: 0.04, critical: 0.1, interruptible: 0, standby: 0.05, dominant: "auxiliary", seasonal: 8 },
  industrial: { lf: 0.7, base: 0.48, cyclic: 0.14, motor: 0.28, thermal: 0.12, critical: 0.22, interruptible: 0.1, standby: 0.04, dominant: "motor", seasonal: 12 },
  mining: { lf: 0.72, base: 0.5, cyclic: 0.1, motor: 0.4, thermal: 0.06, critical: 0.25, interruptible: 0.08, standby: 0.03, dominant: "motor", seasonal: 8 },
  agriculture: { lf: 0.38, base: 0.18, cyclic: 0.35, motor: 0.4, thermal: 0.05, critical: 0.08, interruptible: 0.25, standby: 0.03, dominant: "cyclic", seasonal: 55 },
  irrigation: { lf: 0.35, base: 0.15, cyclic: 0.45, motor: 0.5, thermal: 0.04, critical: 0.06, interruptible: 0.3, standby: 0.02, dominant: "cyclic", seasonal: 65 },
  desalination: { lf: 0.82, base: 0.7, cyclic: 0.08, motor: 0.55, thermal: 0.05, critical: 0.4, interruptible: 0.05, standby: 0.04, dominant: "motor", seasonal: 10 },
  "water-pumping": { lf: 0.42, base: 0.2, cyclic: 0.4, motor: 0.55, thermal: 0.02, critical: 0.15, interruptible: 0.2, standby: 0.03, dominant: "motor", seasonal: 40 },
  settlement: { lf: 0.42, base: 0.28, cyclic: 0.18, motor: 0.12, thermal: 0.22, critical: 0.18, interruptible: 0.08, standby: 0.06, dominant: "thermal", seasonal: 28 },
  telecom: { lf: 0.88, base: 0.8, cyclic: 0.04, motor: 0.08, thermal: 0.12, critical: 0.9, interruptible: 0, standby: 0.05, dominant: "electronic", seasonal: 8 },
  hospital: { lf: 0.72, base: 0.55, cyclic: 0.08, motor: 0.12, thermal: 0.18, critical: 0.7, interruptible: 0.02, standby: 0.06, dominant: "critical", seasonal: 15 },
  port: { lf: 0.52, base: 0.3, cyclic: 0.22, motor: 0.35, thermal: 0.08, critical: 0.2, interruptible: 0.12, standby: 0.04, dominant: "motor", seasonal: 18 },
  airport: { lf: 0.48, base: 0.32, cyclic: 0.15, motor: 0.18, thermal: 0.16, critical: 0.45, interruptible: 0.08, standby: 0.05, dominant: "critical", seasonal: 20 },
  logistics: { lf: 0.5, base: 0.3, cyclic: 0.2, motor: 0.28, thermal: 0.1, critical: 0.18, interruptible: 0.1, standby: 0.04, dominant: "motor", seasonal: 16 },
  "urban-distribution": { lf: 0.58, base: 0.4, cyclic: 0.12, motor: 0.1, thermal: 0.22, critical: 0.2, interruptible: 0.06, standby: 0.05, dominant: "thermal", seasonal: 22 },
  "bulk-transfer": { lf: 0.55, base: 0.45, cyclic: 0.05, motor: 0.08, thermal: 0.04, critical: 0.3, interruptible: 0, standby: 0.02, dominant: "base", seasonal: 8 },
  tourism: { lf: 0.4, base: 0.22, cyclic: 0.16, motor: 0.12, thermal: 0.3, critical: 0.2, interruptible: 0.15, standby: 0.06, dominant: "thermal", seasonal: 50 },
  oasis: { lf: 0.45, base: 0.3, cyclic: 0.2, motor: 0.22, thermal: 0.14, critical: 0.2, interruptible: 0.1, standby: 0.05, dominant: "mixed", seasonal: 25 },
};

const TRANSIENTS = {
  "motor-start": { type: "motor-start", startingMultiple: 6, durationSeconds: 4 },
  "pump-start": { type: "pump-start", startingMultiple: 5.5, durationSeconds: 3 },
  "compressor-start": { type: "compressor-start", startingMultiple: 6.5, durationSeconds: 0.4 },
  "transformer-energization": { type: "transformer-energization", startingMultiple: 8, durationSeconds: 0.2 },
  "conveyor-start": { type: "conveyor-start", startingMultiple: 5, durationSeconds: 5 },
  "process-start": { type: "process-start", startingMultiple: 4, durationSeconds: 8 },
};

const TERRITORIAL = {
  E01: ["avoid mobile dunes", "prefer hamada over erg", "dry cleaning for soiling", "extreme heat derating"],
  E02: ["prefer compact hamada parcels", "dust sealing for outdoor gear", "limit water use for cleaning"],
  E03: ["avoid sabkha and oasis floor", "avoid heritage cores and palm groves", "prefer plateau/hamada above the oasis", "saline dew: dry cleaning"],
  E04: ["setback from seasonal wadis", "dust and heat derating"],
  E05: ["access and snow/ice on access roads", "altitude derating", "avoid steep unstable slopes"],
  E06: ["avoid sabkha", "high corrosion class for hardware", "saline aerosol on insulators"],
  E07: ["flood elevation", "humidity/corrosion", "storm surge setback"],
  E08: ["urban land constraints", "noise and GIS preference", "existing infrastructure reuse"],
  E09: ["avoid high-value agricultural soils", "irrigation electrical diversity", "seasonal feeder loading"],
  E10: ["floodplain setback", "alluvial grounding conditions"],
  E11: ["monsoon flood and lightning", "seasonal soiling after dry spells", "access during floods"],
  E12: ["humidity and vegetation clearance", "flood and lightning"],
  E13: ["dust from extraction", "heavy-vehicle access", "avoid unconsolidated spoil"],
  E14: ["long logistics chain", "security of remote assets", "limited water"],
};

function r2(n) {
  return Math.round(n * 1000) / 1000;
}

function expand(seed) {
  const country = COUNTRIES[seed.iso];
  const env = ENVIRONMENTS[seed.env];
  const shape = SHAPES[seed.app];
  const peak = seed.peak;
  const lf = seed.lf || shape.lf;
  const avg = r2(peak * lf);
  const yieldK = YIELD_BY_ENV[seed.env];
  const pvOn = seed.pvDc > 0;
  const bessOn = seed.bessMW > 0;
  const windOn = seed.windMW > 0;
  const dieselOn = seed.dieselMW > 0;
  const subOn = seed.pKV > 0;
  const dcAc = pvOn && seed.pvAc > 0 ? r2(seed.pvDc / seed.pvAc) : null;
  const energyMethod = pvOn ? "specific-yield" : windOn ? "capacity-factor" : null;
  const cfInfo = pvOn ? r2(yieldK / 8760) : null;

  const transients = (seed.transients || []).map((name) => {
    const lib = TRANSIENTS[name];
    const running = name.includes("pump") || name.includes("motor") || name.includes("conveyor")
      ? r2(peak * Math.max(shape.motor, 0.15))
      : r2(Math.max(peak * 0.2, 0.05));
    return {
      name: name.replace(/-/g, " "),
      type: lib.type,
      runningMW: running,
      startingMultiple: lib.startingMultiple,
      durationSeconds: lib.durationSeconds,
    };
  });

  let seasonalProfiles = null;
  if (seed.seasonal === "irrigation") {
    seasonalProfiles = {
      hotSeason: { peakLoadMW: r2(peak * 1.2), note: "irrigation and cooling" },
      mildSeason: { peakLoadMW: r2(peak * 0.65), note: "reduced pumping" },
    };
  } else if (seed.seasonal === "monsoon") {
    seasonalProfiles = {
      monsoonSeason: { peakLoadMW: r2(peak * 0.8), pvYieldFactor: 0.72, note: "cloud cover and flood access" },
      drySeason: { peakLoadMW: r2(peak * 1.08), pvYieldFactor: 1.06, note: "clearer resource, dust" },
    };
  } else if (seed.seasonal === "cooling") {
    seasonalProfiles = {
      hotSeason: { peakLoadMW: r2(peak * 1.18), note: "cooling-dominated" },
      mildSeason: { peakLoadMW: r2(peak * 0.78), note: "base urban/industrial" },
    };
  } else if (seed.seasonal === "tourism") {
    seasonalProfiles = {
      peakSeason: { peakLoadMW: r2(peak * 1.25), note: "visitor occupancy" },
      offSeason: { peakLoadMW: r2(peak * 0.6), note: "resident base" },
    };
  }

  const feeders = seed.feeders || defaultFeeders(seed);

  const template = {
    id: seed.id,
    name: seed.name,
    family: seed.family,
    familyName: FAMILY_NAMES[seed.family],
    archetype: seed.arch,
    archetypeTitle: ARCHETYPES[seed.arch],
    country: seed.iso,
    countryName: country.name,
    region: country.region,
    subregion: country.subregion,
    application: seed.app,
    conceptual: true,
    featured: !!seed.featured,
    disclaimer: TEMPLATE_DISCLAIMER,
    description: seed.description,
    environment: {
      code: seed.env,
      ...env,
    },
    territorialRules: TERRITORIAL[seed.env],
    grid: {
      mode: seed.gridMode,
      strength: seed.strength,
      exportAllowed: !!seed.exportOk,
      importAllowed: seed.importOk !== false && seed.gridMode !== "off-grid",
      backupAvailable: dieselOn || bessOn,
      blackStartRequired: seed.gridMode === "off-grid" || seed.gridMode === "islandable",
    },
    loadProfile: {
      baseLoadMW: r2(peak * shape.base),
      averageLoadMW: avg,
      peakLoadMW: peak,
      loadFactor: lf,
      criticalLoadMW: r2(peak * shape.critical),
      cyclicLoadMW: r2(peak * shape.cyclic),
      motorLoadMW: r2(peak * shape.motor),
      thermalLoadMW: r2(peak * shape.thermal),
      interruptibleLoadMW: r2(peak * shape.interruptible),
      standbyLoadMW: r2(peak * shape.standby),
      seasonalVariationPercent: seed.seasonal ? shape.seasonal : 8,
      dominantLoadType: shape.dominant,
      scaleBand: scaleBand(Math.max(peak, seed.pvAc || 0, seed.bessMW || 0)),
      transientEvents: transients,
    },
    seasonalProfiles,
    generation: {
      enabled: pvOn || windOn || dieselOn,
      technologies: [
        pvOn ? "pv" : null,
        windOn ? "wind" : null,
        dieselOn ? "diesel" : null,
      ].filter(Boolean),
      energyCalculationMethod: energyMethod,
      pv: pvOn
        ? {
            dcMWp: seed.pvDc,
            acMW: seed.pvAc,
            mounting: seed.mount || "fixed",
            bifacial: !!seed.bifacial,
            dcAcRatio: dcAc,
            specificYieldKWhPerKWpYear: yieldK,
            capacityFactor: cfInfo,
            lossesPercent: seed.env === "E01" || seed.env === "E13" ? 14 : 11,
          }
        : null,
      wind: windOn
        ? { ratedMW: seed.windMW, capacityFactor: seed.windCf || 0.32 }
        : null,
      diesel: dieselOn
        ? { ratedMW: seed.dieselMW, role: seed.dieselRole || "backup" }
        : null,
    },
    bess: bessOn
      ? {
          enabled: true,
          powerMW: seed.bessMW,
          energyMWh: r2(seed.bessMW * seed.bessH),
          durationHours: seed.bessH,
          roundTripEfficiency: 0.88,
          usableDoD: 0.9,
          purpose: seed.bessPurpose || ["solar-firming", "energy-shifting"],
        }
      : { enabled: false },
    substation: subOn
      ? {
          enabled: true,
          type: seed.subType || (seed.env === "E08" ? "GIS" : "AIS"),
          primaryKV: seed.pKV,
          secondaryKV: seed.sKV,
          tertiaryKV: seed.tKV || null,
          transformerCount: seed.nTrafo,
          transformerMVA: seed.mva,
          transformerTotalMVA: r2(seed.nTrafo * seed.mva),
          powerFactor: seed.pf || 0.92,
          utilizationFactor: seed.util || 0.75,
          topology: seed.topo,
          redundancyMode: seed.red,
          busConfiguration: seed.bus,
          gridConnection: seed.gridMode,
        }
      : { enabled: false },
    feeders,
    economics: { btcPerKWh: null },
    assumptions: seed.assumptions || [
      "Voltage levels are conceptual, not a national code claim.",
      "Load is an aggregated MW-scale profile, not a scaled 6 kW dwelling.",
      "Tariff is user-supplied.",
    ],
    warnings: [],
    tags: seed.tags || [],
    qualityScore: 0,
  };

  const verdict = validateTemplateViability(template);
  template.warnings = verdict.warnings.map((w) => w.message);
  template.qualityScore = score(template, verdict);
  template._errors = verdict.errors;
  template._ok = verdict.ok;
  return template;
}

function score(t, verdict) {
  let q = 90;
  if (t.featured) q += 3;
  if (t.seasonalProfiles) q += 2;
  if (t.loadProfile.transientEvents.length) q += 2;
  q -= verdict.errors.length * 12;
  q -= verdict.warnings.length * 3;
  const fields = [t.generation, t.bess, t.substation, t.grid, t.environment, t.loadProfile];
  q += fields.filter(Boolean).length;
  return Math.max(0, Math.min(100, q));
}

function defaultFeeders(seed) {
  if (seed.family === "G" && seed.pvAc > 10) {
    return [
      { name: "collector-A", voltageKV: seed.sKV || 33, role: "array collector", lengthKM: 4, estimatedLoadMW: r2((seed.pvAc || 0) * 0.5), lossesPercent: 1.5 },
      { name: "collector-B", voltageKV: seed.sKV || 33, role: "array collector", lengthKM: 5, estimatedLoadMW: r2((seed.pvAc || 0) * 0.5), lossesPercent: 1.6 },
    ];
  }
  if (seed.family === "S" || seed.family === "H") {
    const v = seed.sKV || 11;
    const share = r2(seed.peak / 2);
    return [
      { name: "feeder-north", voltageKV: v, role: "distribution", lengthKM: seed.family === "H" ? 8 : 12, estimatedLoadMW: share, lossesPercent: 2.5 },
      { name: "feeder-south", voltageKV: v, role: "distribution", lengthKM: seed.family === "H" ? 6 : 15, estimatedLoadMW: r2(seed.peak - share), lossesPercent: 2.8 },
    ];
  }
  return [];
}

/**
 * Curated scenarios — not a climate × topology product.
 * Columns documented in make().
 */
function make(o) {
  return o;
}

const SEEDS = [
  // ——— GENERATION ———
  make({ family: "G", arch: "G03", iso: "MRT", env: "E01", app: "utility-export", peak: 5.2, pvDc: 120, pvAc: 95, mount: "single-axis", bifacial: true, pKV: 132, sKV: 33, nTrafo: 2, mva: 80, topo: "collector", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, featured: true, transients: ["transformer-energization"], tags: ["desert", "tracker", "bifacial"], name: "Conceptual bifacial tracker plant — interior Mauritania", description: "Utility PV on hamada, exporting through a 132/33 kV collector. Auxiliary load only at the plant." }),
  make({ family: "G", arch: "G01", iso: "MRT", env: "E02", app: "utility-export", peak: 3.1, pvDc: 72, pvAc: 60, mount: "fixed", pKV: 66, sKV: 33, nTrafo: 2, mva: 40, topo: "collector", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, transients: ["transformer-energization"], tags: ["fixed-tilt"], name: "Conceptual fixed-tilt PV — interior Mauritania", description: "Lower-capex fixed tilt on arid plain, 66 kV collector." }),
  make({ family: "G", arch: "G14", iso: "MRT", env: "E13", app: "mining", peak: 28, pvDc: 55, pvAc: 45, mount: "fixed", pKV: 33, sKV: 11, nTrafo: 2, mva: 31.5, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, dieselMW: 12, dieselRole: "process backup", transients: ["conveyor-start", "motor-start"], tags: ["mining"], name: "Conceptual solar for extraction loads — Mauritania", description: "On-site PV reduces diesel at an extractive site. Motors dominate; PV does not cover peak." }),
  make({ family: "G", arch: "G02", iso: "MAR", env: "E04", app: "utility-export", peak: 6.4, pvDc: 100, pvAc: 82, mount: "single-axis", pKV: 132, sKV: 33, nTrafo: 2, mva: 63, topo: "collector", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, transients: ["transformer-energization"], tags: ["tracker"], name: "Conceptual single-axis PV — Moroccan plateau", description: "Tracker plant on semi-arid plateau feeding 132 kV." }),
  make({ family: "G", arch: "G09", iso: "MAR", env: "E04", app: "utility-export", peak: 7.5, pvDc: 70, pvAc: 58, mount: "single-axis", bessMW: 30, bessH: 3, windMW: 40, windCf: 0.34, pKV: 132, sKV: 33, nTrafo: 2, mva: 80, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, bessPurpose: ["renewable-integration", "energy-shifting"], transients: ["transformer-energization"], tags: ["hybrid", "wind"], name: "Conceptual PV–wind–BESS hybrid — Morocco", description: "Complementary solar and wind with a 3 h buffer. Energy method is PV specific-yield; wind uses capacity factor separately." }),
  make({ family: "G", arch: "G01", iso: "DZA", env: "E01", app: "utility-export", peak: 9.0, pvDc: 240, pvAc: 200, mount: "fixed", pKV: 220, sKV: 33, nTrafo: 2, mva: 160, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, transients: ["transformer-energization"], tags: ["utility-scale"], name: "Conceptual utility PV — Algerian Sahara", description: "Large fixed-tilt block exporting at 220 kV." }),
  make({ family: "G", arch: "G16", iso: "DZA", env: "E01", app: "collector", peak: 11, pvDc: 310, pvAc: 250, mount: "single-axis", bifacial: true, pKV: 220, sKV: 66, nTrafo: 2, mva: 180, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, transients: ["transformer-energization"], tags: ["collector"], name: "Conceptual renewable collector — Algeria", description: "Multi-block PV gathered at 66 kV into a 220 kV interface." }),
  make({ family: "G", arch: "G15", iso: "TUN", env: "E09", app: "irrigation", peak: 6.8, pvDc: 14, pvAc: 11, mount: "fixed", pKV: 33, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, seasonal: "irrigation", transients: ["pump-start"], tags: ["agriculture"], name: "Conceptual solar pumping hub — Tunisia", description: "Seasonal irrigation peak; PV sized below coincident pump peak, grid covers the rest." }),
  make({ family: "G", arch: "G10", iso: "LBY", env: "E02", app: "settlement", peak: 4.2, pvDc: 12, pvAc: 10, mount: "fixed", dieselMW: 5, dieselRole: "backup", pKV: 33, sKV: 11, nTrafo: 1, mva: 16, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, transients: ["motor-start"], tags: ["diesel"], name: "Conceptual PV with diesel backup — Libya", description: "Weak-grid settlement with diesel covering night and motor starts." }),
  make({ family: "G", arch: "G06", iso: "EGY", env: "E03", app: "oasis", peak: 14, pvDc: 28, pvAc: 22, mount: "single-axis", bifacial: true, bessMW: 18, bessH: 4, pKV: 33, sKV: 11, nTrafo: 2, mva: 25, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "islandable", strength: "weak", exportOk: false, featured: true, dieselMW: 8, dieselRole: "black-start / backup", bessPurpose: ["grid-forming", "backup", "solar-firming"], transients: ["pump-start", "transformer-energization"], tags: ["oasis", "featured"], name: "Conceptual oasis PV+BESS 4 h — Egypt", description: "Hamada-sited PV and 4 h BESS supporting oasis loads. Diesel is backup, not baseload." }),
  make({ family: "G", arch: "G02", iso: "EGY", env: "E02", app: "utility-export", peak: 8.5, pvDc: 160, pvAc: 130, mount: "single-axis", pKV: 220, sKV: 33, nTrafo: 2, mva: 125, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, transients: ["transformer-energization"], tags: ["tracker"], name: "Conceptual tracker plant — Western Desert Egypt", description: "Export plant, not a copy of any named site." }),
  make({ family: "G", arch: "G15", iso: "SDN", env: "E09", app: "irrigation", peak: 11, pvDc: 22, pvAc: 18, mount: "fixed", pKV: 33, sKV: 11, nTrafo: 2, mva: 20, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, seasonal: "irrigation", transients: ["pump-start"], tags: ["nile", "pumps"], name: "Conceptual agricultural pumping hub — Sudan", description: "High seasonal variation; interruptible irrigation." }),
  make({ family: "G", arch: "G05", iso: "JOR", env: "E02", app: "industrial", peak: 18, pvDc: 42, pvAc: 34, mount: "fixed", bessMW: 20, bessH: 2, pKV: 132, sKV: 33, nTrafo: 2, mva: 40, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, bessPurpose: ["peak-shaving", "energy-shifting"], transients: ["motor-start"], tags: ["industry"], name: "Conceptual industrial PV+BESS 2 h — Jordan", description: "Self-generation with 2 h peak shaving; grid remains available." }),
  make({ family: "G", arch: "G13", iso: "IRQ", env: "E10", app: "industrial", peak: 22, pvDc: 36, pvAc: 30, mount: "fixed", pKV: 132, sKV: 11, nTrafo: 2, mva: 40, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "grid-connected", strength: "medium", exportOk: false, transients: ["process-start", "motor-start"], tags: ["industry"], name: "Conceptual industrial self-generation — Mesopotamia", description: "Behind-the-meter PV on a river-valley industrial site; flood setback assumed." }),
  make({ family: "G", arch: "G16", iso: "SAU", env: "E01", app: "collector", peak: 18, pvDc: 480, pvAc: 390, mount: "single-axis", bifacial: true, pKV: 380, sKV: 132, nTrafo: 2, mva: 300, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, featured: true, transients: ["transformer-energization"], tags: ["utility-scale", "collector"], name: "Conceptual desert solar collector — Arabian interior", description: "Utility-scale collector into a 380/132 kV interface. 380 kV used as a bulk conceptual level, not a code claim." }),
  make({ family: "G", arch: "G04", iso: "SAU", env: "E02", app: "utility-export", peak: 10, pvDc: 140, pvAc: 115, mount: "single-axis", bessMW: 80, bessH: 1, pKV: 132, sKV: 33, nTrafo: 2, mva: 100, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, bessPurpose: ["frequency-support", "solar-firming"], transients: ["transformer-energization"], tags: ["1h-bess"], name: "Conceptual PV+BESS 1 h — Arabian interior", description: "Short-duration BESS for ramps, not energy shifting." }),
  make({ family: "G", arch: "G10", iso: "YEM", env: "E14", app: "settlement", peak: 1.8, pvDc: 4.5, pvAc: 3.6, mount: "fixed", dieselMW: 2.2, dieselRole: "backup", pKV: 11, sKV: 0.4, nTrafo: 2, mva: 2.5, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, transients: ["motor-start"], tags: ["remote"], name: "Conceptual PV+diesel for a remote settlement — Yemen", description: "Sub-10 MW remote cluster, 11/0.4 kV." }),
  make({ family: "G", arch: "G12", iso: "OMN", env: "E06", app: "desalination", peak: 32, pvDc: 48, pvAc: 40, mount: "fixed", pKV: 132, sKV: 33, nTrafo: 2, mva: 50, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: false, featured: true, transients: ["pump-start", "compressor-start"], tags: ["desalination", "coast"], name: "Conceptual solar for desalination — coastal Oman", description: "High load factor pumping/RO. PV covers a share of energy, not the full peak." }),
  make({ family: "G", arch: "G06", iso: "OMN", env: "E03", app: "oasis", peak: 9.5, pvDc: 20, pvAc: 16, mount: "fixed", bessMW: 12, bessH: 4, pKV: 33, sKV: 11, nTrafo: 2, mva: 20, topo: "radial", red: "N", bus: "single-bus", gridMode: "islandable", strength: "weak", exportOk: false, dieselMW: 6, bessPurpose: ["grid-forming", "backup"], transients: ["pump-start"], tags: ["oasis"], name: "Conceptual oasis PV+BESS — Oman", description: "Similar architecture class to other oasis cases, different scale and country context." }),
  make({ family: "G", arch: "G07", iso: "ARE", env: "E06", app: "industrial", peak: 40, pvDc: 75, pvAc: 60, mount: "fixed", bessMW: 35, bessH: 6, pKV: 132, sKV: 33, nTrafo: 2, mva: 63, topo: "radial", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, bessPurpose: ["energy-shifting", "peak-shaving"], transients: ["motor-start"], tags: ["long-duration"], name: "Conceptual industrial PV+BESS 6 h — Gulf coast", description: "Longer duration shifting for an industrial offtaker." }),
  make({ family: "G", arch: "G13", iso: "QAT", env: "E08", app: "industrial", peak: 16, pvDc: 24, pvAc: 20, mount: "fixed", pKV: 66, sKV: 11, nTrafo: 2, mva: 25, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "strong", exportOk: false, transients: ["process-start"], tags: ["industry"], name: "Conceptual industrial rooftop/field PV — Qatar", description: "Urban-industrial self-generation, GIS-friendly 66/11 kV." }),
  make({ family: "G", arch: "G05", iso: "KWT", env: "E02", app: "utility-export", peak: 7, pvDc: 90, pvAc: 72, mount: "single-axis", bessMW: 40, bessH: 2, pKV: 132, sKV: 33, nTrafo: 2, mva: 63, topo: "collector", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, transients: ["transformer-energization"], tags: ["bess"], name: "Conceptual PV+BESS 2 h — Kuwait", description: "Ramp control on a desert-adjacent export plant." }),
  make({ family: "G", arch: "G01", iso: "BHR", env: "E06", app: "industrial", peak: 8, pvDc: 12, pvAc: 10, mount: "fixed", pKV: 66, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "strong", exportOk: false, transients: ["motor-start"], tags: ["saline"], name: "Conceptual coastal PV — Bahrain", description: "Corrosion-class hardware assumed; modest DC block." }),
  make({ family: "G", arch: "G08", iso: "IRN", env: "E04", app: "utility-export", peak: 9, pvDc: 80, pvAc: 65, mount: "fixed", windMW: 50, windCf: 0.3, pKV: 132, sKV: 33, nTrafo: 2, mva: 80, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, transients: ["transformer-energization"], tags: ["wind"], name: "Conceptual PV+wind hybrid — Iranian plateau", description: "Two resources, no BESS in this variant." }),
  make({ family: "G", arch: "G14", iso: "IRN", env: "E13", app: "mining", peak: 45, pvDc: 70, pvAc: 55, mount: "fixed", pKV: 132, sKV: 33, nTrafo: 2, mva: 63, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, dieselMW: 20, transients: ["conveyor-start", "motor-start"], tags: ["mining"], name: "Conceptual mining solar — Iran", description: "Dust-extreme extraction zone; diesel covers night and starts." }),
  make({ family: "G", arch: "G10", iso: "AFG", env: "E05", app: "settlement", peak: 2.4, pvDc: 6, pvAc: 5, mount: "fixed", dieselMW: 2.5, pKV: 20, sKV: 0.4, nTrafo: 2, mva: 4, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, transients: ["motor-start"], tags: ["highland"], name: "Conceptual highland PV+diesel — Afghanistan", description: "Altitude derating; 20/0.4 kV conceptual local step-down." }),
  make({ family: "G", arch: "G16", iso: "PAK", env: "E02", app: "collector", peak: 10, pvDc: 150, pvAc: 120, mount: "single-axis", pKV: 132, sKV: 33, nTrafo: 2, mva: 100, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, transients: ["transformer-energization"], tags: ["collector"], name: "Conceptual collector plant — Pakistan arid belt", description: "132/33 kV gathering station for desert PV." }),
  make({ family: "G", arch: "G14", iso: "PAK", env: "E13", app: "mining", peak: 38, pvDc: 50, pvAc: 40, mount: "fixed", dieselMW: 15, pKV: 66, sKV: 11, nTrafo: 2, mva: 40, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, transients: ["conveyor-start"], tags: ["mining"], name: "Conceptual extraction PV — Pakistan", description: "Process motors plus PV energy hedge." }),
  make({ family: "G", arch: "G15", iso: "IND", env: "E09", app: "agriculture", peak: 14, pvDc: 28, pvAc: 22, mount: "fixed", pKV: 33, sKV: 11, nTrafo: 2, mva: 25, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, seasonal: "irrigation", transients: ["pump-start"], tags: ["agriculture"], name: "Conceptual agricultural solar hub — India", description: "Daytime pumping aligned with PV; seasonal irrigation spike." }),
  make({ family: "G", arch: "G13", iso: "IND", env: "E08", app: "industrial", peak: 36, pvDc: 48, pvAc: 40, mount: "fixed", pKV: 132, sKV: 33, nTrafo: 2, mva: 50, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, transients: ["process-start"], tags: ["industry"], name: "Conceptual industrial self-generation — India", description: "Park-scale PV, grid-parallel." }),
  make({ family: "G", arch: "G02", iso: "IND", env: "E11", app: "utility-export", peak: 7, pvDc: 90, pvAc: 72, mount: "single-axis", pKV: 132, sKV: 33, nTrafo: 2, mva: 63, topo: "collector", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, seasonal: "monsoon", transients: ["transformer-energization"], tags: ["monsoon"], name: "Conceptual tracker plant — monsoon India", description: "Yield uses a drier-climate baseline; monsoon profile derates resource, not a second energy formula." }),
  make({ family: "G", arch: "G01", iso: "BGD", env: "E10", app: "utility-export", peak: 4.5, pvDc: 40, pvAc: 32, mount: "fixed", pKV: 132, sKV: 33, nTrafo: 2, mva: 40, topo: "collector", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, seasonal: "monsoon", transients: ["transformer-energization"], tags: ["floodplain"], name: "Conceptual PV on raised ground — Bangladesh", description: "Flood setback; not floating-plant detailed design." }),
  make({ family: "G", arch: "G01", iso: "LKA", env: "E12", app: "utility-export", peak: 3.8, pvDc: 30, pvAc: 24, mount: "fixed", pKV: 132, sKV: 33, nTrafo: 2, mva: 31.5, topo: "collector", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, transients: ["transformer-energization"], tags: ["humid"], name: "Conceptual humid-climate PV — Sri Lanka", description: "Lower specific yield; humidity/corrosion class." }),
  make({ family: "G", arch: "G15", iso: "MMR", env: "E11", app: "irrigation", peak: 8, pvDc: 16, pvAc: 13, mount: "fixed", pKV: 33, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, seasonal: "monsoon", transients: ["pump-start"], tags: ["monsoon", "pumps"], name: "Conceptual monsoon pumping PV — Myanmar", description: "Dry-season irrigation vs monsoon cloud cover." }),
  make({ family: "G", arch: "G15", iso: "THA", env: "E09", app: "agriculture", peak: 10, pvDc: 20, pvAc: 16, mount: "fixed", pKV: 22, sKV: 0.4, nTrafo: 2, mva: 16, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, seasonal: "irrigation", transients: ["pump-start"], tags: ["agriculture"], name: "Conceptual agri-PV hub — Thailand", description: "22/0.4 kV conceptual local distribution for pumps." }),
  make({ family: "G", arch: "G11", iso: "LBN", env: "E05", app: "settlement", peak: 3.2, pvDc: 8, pvAc: 6.5, mount: "fixed", bessMW: 4, bessH: 4, dieselMW: 3, pKV: 66, sKV: 11, nTrafo: 2, mva: 10, topo: "radial", red: "N", bus: "single-bus", gridMode: "islandable", strength: "weak", exportOk: false, bessPurpose: ["backup", "grid-forming"], transients: ["motor-start"], tags: ["highland"], name: "Conceptual PV+diesel+BESS — Lebanese highland", description: "Islandable cluster, modest MW." }),
  make({ family: "G", arch: "G13", iso: "SYR", env: "E09", app: "agriculture", peak: 7.5, pvDc: 15, pvAc: 12, mount: "fixed", pKV: 66, sKV: 20, nTrafo: 2, mva: 16, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, seasonal: "irrigation", transients: ["pump-start"], tags: ["agriculture"], name: "Conceptual agricultural PV — Syria", description: "Weak-grid agri cluster." }),

  // ——— SUBSTATIONS ———
  make({ family: "S", arch: "S01", iso: "YEM", env: "E14", app: "settlement", peak: 0.35, pKV: 11, sKV: 0.4, nTrafo: 2, mva: 0.4, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "weak", tags: ["lv"], name: "Conceptual 11/0.4 kV local station — Yemen", description: "kW-scale settlement transformer pair." }),
  make({ family: "S", arch: "S01", iso: "AFG", env: "E05", app: "settlement", peak: 0.28, pKV: 20, sKV: 0.4, nTrafo: 1, mva: 0.4, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", tags: ["lv"], name: "Conceptual 20/0.4 kV local station — Afghanistan", description: "Single transformer, N redundancy only." }),
  make({ family: "S", arch: "S02", iso: "TUN", env: "E08", app: "urban-distribution", peak: 12, pKV: 33, sKV: 11, nTrafo: 1, mva: 20, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "medium", seasonal: "cooling", transients: ["transformer-energization"], tags: ["urban"], name: "Conceptual 33/11 kV radial urban — Tunisia", description: "Single transformer radial; cooling season." }),
  make({ family: "S", arch: "S03", iso: "JOR", env: "E08", app: "urban-distribution", peak: 22, pKV: 33, sKV: 11, nTrafo: 2, mva: 20, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "grid-connected", strength: "medium", seasonal: "cooling", transients: ["transformer-energization"], tags: ["urban"], name: "Conceptual 33/11 kV dual transformer — Jordan", description: "N-1 urban distribution." }),
  make({ family: "S", arch: "S02", iso: "BGD", env: "E11", app: "urban-distribution", peak: 18, pKV: 33, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", featured: true, seasonal: "monsoon", transients: ["transformer-energization"], tags: ["monsoon"], name: "Conceptual monsoon 33/11 kV — Bangladesh", description: "Flood-aware urban/rural mix." }),
  make({ family: "S", arch: "S04", iso: "AFG", env: "E05", app: "urban-distribution", peak: 14, pKV: 66, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", featured: true, transients: ["transformer-energization"], tags: ["highland"], name: "Conceptual 66/11 kV highland — Afghanistan", description: "Access-constrained mountain town supply." }),
  make({ family: "S", arch: "S04", iso: "LBN", env: "E05", app: "urban-distribution", peak: 16, pKV: 66, sKV: 11, nTrafo: 2, mva: 20, topo: "ring", red: "N-1", bus: "sectionalized-single-bus", gridMode: "grid-connected", strength: "medium", transients: ["transformer-energization"], tags: ["highland"], name: "Conceptual 66/11 kV — Lebanon", description: "Ring-fed highland distribution." }),
  make({ family: "S", arch: "S05", iso: "MAR", env: "E04", app: "collector", peak: 48, pvDc: 0, pvAc: 0, pKV: 66, sKV: 33, nTrafo: 2, mva: 40, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "medium", transients: ["transformer-energization"], tags: ["collector"], name: "Conceptual 66/33 kV collector — Morocco", description: "Gathers several PV blocks; load is through-power plus auxiliaries." }),
  make({ family: "S", arch: "S06", iso: "EGY", env: "E08", app: "urban-distribution", peak: 55, pKV: 110, sKV: 33, nTrafo: 2, mva: 50, topo: "radial", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", seasonal: "cooling", transients: ["transformer-energization"], tags: ["urban"], name: "Conceptual 110/33 kV — Egypt", description: "City-scale step-down. 110 kV is a conceptual primary, not a code statement." }),
  make({ family: "S", arch: "S07", iso: "PAK", env: "E08", app: "industrial", peak: 70, pKV: 132, sKV: 33, nTrafo: 2, mva: 63, topo: "radial", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "medium", transients: ["motor-start", "transformer-energization"], tags: ["industry"], name: "Conceptual 132/33 kV industrial — Pakistan", description: "Industrial park infeed." }),
  make({ family: "S", arch: "S08", iso: "IND", env: "E08", app: "industrial", peak: 48, pKV: 132, sKV: 11, nTrafo: 2, mva: 40, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "grid-connected", strength: "strong", transients: ["motor-start"], tags: ["industry"], name: "Conceptual 132/11 kV industrial — India", description: "Direct 11 kV industrial boards." }),
  make({ family: "S", arch: "S09", iso: "SAU", env: "E02", app: "bulk-transfer", peak: 280, pKV: 220, sKV: 132, nTrafo: 2, mva: 200, topo: "meshed", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", transients: ["transformer-energization"], tags: ["transmission"], name: "Conceptual 220/132 kV interface — Saudi Arabia", description: "Bulk transfer, not a distribution microgrid." }),
  make({ family: "S", arch: "S10", iso: "IRN", env: "E04", app: "bulk-transfer", peak: 210, pKV: 220, sKV: 66, nTrafo: 2, mva: 160, topo: "meshed", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", transients: ["transformer-energization"], tags: ["transmission"], name: "Conceptual 220/66 kV — Iran", description: "Regional step-down from 220 kV." }),
  make({ family: "S", arch: "S11", iso: "MRT", env: "E01", app: "collector", peak: 12, pvDc: 180, pvAc: 150, mount: "single-axis", pKV: 220, sKV: 33, nTrafo: 2, mva: 125, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, transients: ["transformer-energization"], tags: ["collector", "desert"], name: "Conceptual 220/33 kV renewable collector — Mauritania", description: "AIS desert collector for PV export." }),
  make({ family: "S", arch: "S12", iso: "IND", env: "E08", app: "bulk-transfer", peak: 520, pKV: 400, sKV: 220, nTrafo: 2, mva: 400, topo: "meshed", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", featured: true, transients: ["transformer-energization"], tags: ["bulk"], name: "Conceptual 400/220 kV bulk interface — India", description: "Transmission interface only." }),
  make({ family: "S", arch: "S13", iso: "SAU", env: "E02", app: "bulk-transfer", peak: 420, pKV: 380, sKV: 132, nTrafo: 2, mva: 300, topo: "meshed", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", transients: ["transformer-energization"], tags: ["bulk"], name: "Conceptual 380/132 kV — Arabian interior", description: "Bulk to sub-transmission. 380 kV used conceptually." }),
  make({ family: "S", arch: "S14", iso: "KWT", env: "E08", app: "urban-distribution", peak: 85, pKV: 132, sKV: 11, nTrafo: 3, mva: 40, topo: "ring", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", featured: true, seasonal: "cooling", subType: "GIS", transients: ["transformer-energization"], tags: ["gis", "urban"], name: "Conceptual GIS urban substation — Kuwait", description: "Compact GIS, cooling-driven peak." }),
  make({ family: "S", arch: "S14", iso: "QAT", env: "E08", app: "urban-distribution", peak: 70, pKV: 66, sKV: 11, nTrafo: 2, mva: 50, topo: "ring", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", subType: "GIS", transients: ["transformer-energization"], tags: ["gis"], name: "Conceptual GIS 66/11 kV — Qatar", description: "Urban GIS ring." }),
  make({ family: "S", arch: "S15", iso: "DZA", env: "E01", app: "collector", peak: 15, pvDc: 200, pvAc: 165, mount: "fixed", pKV: 220, sKV: 33, nTrafo: 2, mva: 125, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", featured: true, subType: "AIS", transients: ["transformer-energization"], tags: ["ais", "desert"], name: "Conceptual AIS desert substation — Algeria", description: "Open-air AIS, extreme heat and dust." }),
  make({ family: "S", arch: "S15", iso: "LBY", env: "E02", app: "urban-distribution", peak: 28, pKV: 66, sKV: 11, nTrafo: 2, mva: 25, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", subType: "AIS", transients: ["transformer-energization"], tags: ["ais"], name: "Conceptual AIS 66/11 kV — Libya", description: "Desert-fringe town supply." }),
  make({ family: "S", arch: "S16", iso: "OMN", env: "E02", app: "collector", peak: 20, pvDc: 90, pvAc: 72, mount: "single-axis", bessMW: 40, bessH: 2, pKV: 132, sKV: 33, nTrafo: 2, mva: 63, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, bessPurpose: ["renewable-integration", "frequency-support"], transients: ["transformer-energization"], tags: ["bess", "collector"], name: "Conceptual collector substation with BESS — Oman", description: "BESS at the POI, not at each inverter." }),
  make({ family: "S", arch: "S07", iso: "THA", env: "E12", app: "urban-distribution", peak: 60, pKV: 115, sKV: 22, nTrafo: 2, mva: 50, topo: "ring", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", seasonal: "cooling", transients: ["transformer-energization"], tags: ["humid"], name: "Conceptual 115/22 kV — Thailand", description: "115 and 22 kV used as conceptual regional levels, not a code claim." }),
  make({ family: "S", arch: "S03", iso: "MMR", env: "E11", app: "urban-distribution", peak: 20, pKV: 33, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", seasonal: "monsoon", transients: ["transformer-energization"], tags: ["monsoon"], name: "Conceptual 33/11 kV — Myanmar", description: "Monsoon loading and access." }),
  make({ family: "S", arch: "S08", iso: "BHR", env: "E08", app: "industrial", peak: 24, pKV: 66, sKV: 11, nTrafo: 2, mva: 20, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "strong", transients: ["motor-start"], tags: ["industry"], name: "Conceptual industrial 66/11 kV — Bahrain", description: "Compact industrial infeed." }),
  make({ family: "S", arch: "S02", iso: "SDN", env: "E09", app: "agriculture", peak: 9, pKV: 33, sKV: 11, nTrafo: 2, mva: 10, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", seasonal: "irrigation", transients: ["pump-start"], tags: ["agriculture"], name: "Conceptual 33/11 kV agri — Sudan", description: "Seasonal pump feeders." }),
  make({ family: "S", arch: "S07", iso: "IRQ", env: "E10", app: "urban-distribution", peak: 64, pKV: 132, sKV: 33, nTrafo: 2, mva: 50, topo: "radial", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "medium", transients: ["transformer-energization"], tags: ["river"], name: "Conceptual 132/33 kV — Iraq", description: "River-valley city infeed; flood setback." }),
  make({ family: "S", arch: "S05", iso: "EGY", env: "E02", app: "collector", peak: 35, pvDc: 80, pvAc: 65, mount: "single-axis", pKV: 66, sKV: 33, nTrafo: 2, mva: 40, topo: "collector", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, transients: ["transformer-energization"], tags: ["collector"], name: "Conceptual 66/33 kV PV collector — Egypt", description: "Mid-voltage gathering." }),
  make({ family: "S", arch: "S09", iso: "PAK", env: "E04", app: "bulk-transfer", peak: 240, pKV: 220, sKV: 132, nTrafo: 2, mva: 180, topo: "meshed", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", transients: ["transformer-energization"], tags: ["transmission"], name: "Conceptual 220/132 kV — Pakistan", description: "Corridor bulk step-down." }),
  make({ family: "S", arch: "S11", iso: "IND", env: "E09", app: "collector", peak: 16, pvDc: 220, pvAc: 180, mount: "fixed", pKV: 220, sKV: 33, nTrafo: 2, mva: 150, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, transients: ["transformer-energization"], tags: ["collector"], name: "Conceptual 220/33 kV agri-zone collector — India", description: "Utility PV into 220 kV in an agricultural interior, sited off high-value soils." }),
  make({ family: "S", arch: "S01", iso: "LKA", env: "E12", app: "settlement", peak: 0.45, pKV: 11, sKV: 0.4, nTrafo: 2, mva: 0.63, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "medium", tags: ["lv"], name: "Conceptual 11/0.4 kV — Sri Lanka", description: "Humid coastal settlement transformer." }),
  make({ family: "S", arch: "S06", iso: "SYR", env: "E08", app: "urban-distribution", peak: 40, pKV: 66, sKV: 20, nTrafo: 2, mva: 31.5, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", transients: ["transformer-energization"], tags: ["urban"], name: "Conceptual 66/20 kV — Syria", description: "20 kV as a conceptual distribution level." }),
  make({ family: "S", arch: "S04", iso: "OMN", env: "E03", app: "oasis", peak: 11, pKV: 33, sKV: 11, nTrafo: 2, mva: 12.5, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", transients: ["pump-start"], tags: ["oasis"], name: "Conceptual 33/11 kV oasis — Oman", description: "Oasis town infeed, pumps on 11 kV." }),
  make({ family: "S", arch: "S12", iso: "IRN", env: "E04", app: "bulk-transfer", peak: 480, pKV: 400, sKV: 230, nTrafo: 2, mva: 350, topo: "meshed", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", transients: ["transformer-energization"], tags: ["bulk"], name: "Conceptual 400/230 kV — Iran", description: "Bulk plateau interface." }),
  make({ family: "S", arch: "S03", iso: "ARE", env: "E08", app: "urban-distribution", peak: 26, pKV: 33, sKV: 11, nTrafo: 2, mva: 20, topo: "ring", red: "N-1", bus: "sectionalized-single-bus", gridMode: "grid-connected", strength: "strong", seasonal: "cooling", transients: ["transformer-energization"], tags: ["urban"], name: "Conceptual 33/11 kV dual — UAE", description: "Urban dual-transformer." }),
  make({ family: "S", arch: "S10", iso: "THA", env: "E12", app: "bulk-transfer", peak: 190, pKV: 230, sKV: 69, nTrafo: 2, mva: 150, topo: "meshed", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", transients: ["transformer-energization"], tags: ["transmission"], name: "Conceptual 230/69 kV — Thailand", description: "Conceptual regional voltages." }),
  make({ family: "S", arch: "S16", iso: "IND", env: "E02", app: "collector", peak: 14, pvDc: 160, pvAc: 130, mount: "single-axis", bessMW: 60, bessH: 2, pKV: 220, sKV: 33, nTrafo: 2, mva: 125, topo: "collector", red: "N-1", bus: "double-bus", gridMode: "grid-connected", strength: "strong", exportOk: true, bessPurpose: ["renewable-integration", "solar-firming"], transients: ["transformer-energization"], tags: ["bess"], name: "Conceptual collector + BESS — arid India", description: "POI battery on a PV collector." }),

  // ——— HYBRID / MICROGRID ———
  make({ family: "H", arch: "H13", iso: "EGY", env: "E03", app: "oasis", peak: 8.5, pvDc: 18, pvAc: 14, mount: "fixed", bessMW: 10, bessH: 4, dieselMW: 5, pKV: 33, sKV: 11, nTrafo: 2, mva: 12.5, topo: "radial", red: "N", bus: "single-bus", gridMode: "islandable", strength: "isolated", exportOk: false, featured: true, dieselRole: "backup", bessPurpose: ["grid-forming", "backup", "solar-firming"], transients: ["pump-start"], tags: ["oasis", "featured"], name: "Conceptual oasis microgrid — Egypt", description: "Islandable 33/11 kV oasis system with 4 h BESS. Siting prefers hamada, not palm groves or sabkha." }),
  make({ family: "H", arch: "H13", iso: "OMN", env: "E03", app: "oasis", peak: 6.2, pvDc: 14, pvAc: 11, mount: "fixed", bessMW: 8, bessH: 4, dieselMW: 4, pKV: 33, sKV: 11, nTrafo: 2, mva: 10, topo: "radial", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, bessPurpose: ["grid-forming", "backup"], transients: ["pump-start"], tags: ["oasis"], name: "Conceptual oasis microgrid — Oman", description: "Off-grid oasis cluster." }),
  make({ family: "H", arch: "H01", iso: "MRT", env: "E14", app: "settlement", peak: 0.42, pvDc: 1.1, pvAc: 0.9, mount: "fixed", bessMW: 0.35, bessH: 6, pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.63, topo: "isolated", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, bessPurpose: ["grid-forming", "backup"], transients: ["motor-start"], tags: ["off-grid", "kw"], name: "Conceptual isolated PV+BESS settlement — Mauritania", description: "kW-scale isolated mini-grid." }),
  make({ family: "H", arch: "H02", iso: "SDN", env: "E14", app: "settlement", peak: 1.6, pvDc: 3.2, pvAc: 2.6, mount: "fixed", bessMW: 1.2, bessH: 4, dieselMW: 1.5, pKV: 11, sKV: 0.4, nTrafo: 2, mva: 1.6, topo: "radial", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, bessPurpose: ["grid-forming", "backup"], transients: ["motor-start"], tags: ["off-grid"], name: "Conceptual PV+BESS+diesel settlement — Sudan", description: "Remote settlement, diesel for nights and starts." }),
  make({ family: "H", arch: "H03", iso: "PAK", env: "E08", app: "industrial", peak: 24, pvDc: 20, pvAc: 16, mount: "fixed", bessMW: 12, bessH: 2, pKV: 132, sKV: 11, nTrafo: 2, mva: 25, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, featured: true, bessPurpose: ["peak-shaving", "frequency-support"], transients: ["motor-start", "process-start"], tags: ["weak-grid", "industry"], name: "Conceptual weak-grid industrial PV+BESS — Pakistan", description: "Grid exists but is weak; BESS supports motors; PV energy hedge." }),
  make({ family: "H", arch: "H04", iso: "IRQ", env: "E08", app: "industrial", peak: 18, pvDc: 12, pvAc: 10, mount: "fixed", bessMW: 10, bessH: 3, dieselMW: 16, pKV: 33, sKV: 11, nTrafo: 2, mva: 20, topo: "isolated", red: "N-1", bus: "sectionalized-single-bus", gridMode: "islandable", strength: "isolated", exportOk: false, dieselRole: "island baseload / backup", bessPurpose: ["grid-forming", "peak-shaving"], transients: ["process-start"], tags: ["islanded"], name: "Conceptual islanded industrial microgrid — Iraq", description: "Can island; diesel + BESS + partial PV." }),
  make({ family: "H", arch: "H05", iso: "SDN", env: "E09", app: "irrigation", peak: 5.5, pvDc: 9, pvAc: 7.2, mount: "fixed", bessMW: 3, bessH: 4, dieselMW: 2, pKV: 33, sKV: 11, nTrafo: 2, mva: 8, topo: "radial", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, featured: true, seasonal: "irrigation", bessPurpose: ["energy-shifting", "backup"], transients: ["pump-start"], tags: ["agriculture"], name: "Conceptual remote agricultural microgrid — Sudan", description: "Seasonal pumps, interruptible load." }),
  make({ family: "H", arch: "H06", iso: "IND", env: "E10", app: "water-pumping", peak: 4.8, pvDc: 8, pvAc: 6.5, mount: "fixed", bessMW: 2.5, bessH: 5, pKV: 33, sKV: 11, nTrafo: 2, mva: 8, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, seasonal: "irrigation", transients: ["pump-start"], tags: ["pumps"], name: "Conceptual water-pumping microgrid — India", description: "Duty-cycle pumps, not a scaled freezer." }),
  make({ family: "H", arch: "H07", iso: "ARE", env: "E06", app: "desalination", peak: 28, pvDc: 40, pvAc: 32, mount: "fixed", bessMW: 15, bessH: 3, dieselMW: 12, pKV: 132, sKV: 33, nTrafo: 2, mva: 40, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "islandable", strength: "medium", exportOk: false, featured: true, transients: ["pump-start", "compressor-start"], tags: ["desalination"], name: "Conceptual desalination microgrid — UAE", description: "High LF RO/pumping; PV + BESS + diesel." }),
  make({ family: "H", arch: "H07", iso: "KWT", env: "E06", app: "desalination", peak: 22, pvDc: 30, pvAc: 24, mount: "fixed", bessMW: 10, bessH: 2, pKV: 132, sKV: 33, nTrafo: 2, mva: 31.5, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "strong", exportOk: false, transients: ["pump-start"], tags: ["desalination"], name: "Conceptual desalination PV assist — Kuwait", description: "Grid-connected high-LF water load." }),
  make({ family: "H", arch: "H08", iso: "MRT", env: "E13", app: "mining", peak: 22, pvDc: 18, pvAc: 15, mount: "fixed", bessMW: 8, bessH: 2, dieselMW: 18, pKV: 33, sKV: 11, nTrafo: 2, mva: 25, topo: "isolated", red: "N-1", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, featured: true, transients: ["conveyor-start", "motor-start"], tags: ["mining"], name: "Conceptual mining microgrid — Mauritania", description: "Off-grid extraction; diesel still required for night and starts." }),
  make({ family: "H", arch: "H08", iso: "IRN", env: "E13", app: "mining", peak: 35, pvDc: 25, pvAc: 20, mount: "fixed", bessMW: 12, bessH: 2, dieselMW: 24, pKV: 66, sKV: 11, nTrafo: 2, mva: 31.5, topo: "isolated", red: "N-1", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, transients: ["conveyor-start"], tags: ["mining"], name: "Conceptual mining microgrid — Iran", description: "Dust-extreme, motor-heavy." }),
  make({ family: "H", arch: "H09", iso: "ARE", env: "E06", app: "airport", peak: 14, pvDc: 10, pvAc: 8, mount: "fixed", bessMW: 8, bessH: 2, dieselMW: 10, pKV: 33, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "islandable", strength: "medium", exportOk: false, transients: ["motor-start"], tags: ["airport"], name: "Conceptual airport logistics microgrid — UAE", description: "Critical load high; PV is energy, not the sole source." }),
  make({ family: "H", arch: "H09", iso: "THA", env: "E07", app: "logistics", peak: 9, pvDc: 8, pvAc: 6.5, mount: "fixed", bessMW: 4, bessH: 2, pKV: 22, sKV: 11, nTrafo: 2, mva: 12.5, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: false, transients: ["conveyor-start"], tags: ["logistics"], name: "Conceptual logistics hub microgrid — Thailand", description: "Coastal humid logistics." }),
  make({ family: "H", arch: "H10", iso: "JOR", env: "E08", app: "hospital", peak: 3.6, pvDc: 4, pvAc: 3.2, mount: "fixed", bessMW: 2.5, bessH: 4, dieselMW: 3.5, pKV: 11, sKV: 0.4, nTrafo: 2, mva: 2.5, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "islandable", strength: "medium", exportOk: false, featured: true, bessPurpose: ["backup", "grid-forming"], transients: ["compressor-start"], tags: ["critical"], name: "Conceptual hospital microgrid — Jordan", description: "Critical load ≈ peak; diesel + BESS required." }),
  make({ family: "H", arch: "H10", iso: "LBN", env: "E08", app: "hospital", peak: 2.8, pvDc: 3, pvAc: 2.4, mount: "fixed", bessMW: 2, bessH: 4, dieselMW: 2.5, pKV: 20, sKV: 0.4, nTrafo: 2, mva: 2, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "islandable", strength: "weak", exportOk: false, transients: ["compressor-start"], tags: ["critical"], name: "Conceptual hospital microgrid — Lebanon", description: "Weak-grid critical facility." }),
  make({ family: "H", arch: "H11", iso: "YEM", env: "E14", app: "telecom", peak: 0.08, pvDc: 0.18, pvAc: 0.14, mount: "fixed", bessMW: 0.06, bessH: 8, pKV: 0.4, sKV: 0.4, nTrafo: 1, mva: 0.16, topo: "isolated", red: "NONE", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, bessPurpose: ["backup", "grid-forming"], tags: ["telecom", "kw"], name: "Conceptual telecom energy hub — Yemen", description: "kW-scale repeater; high load factor electronics." }),
  make({ family: "H", arch: "H11", iso: "AFG", env: "E05", app: "telecom", peak: 0.06, pvDc: 0.15, pvAc: 0.12, mount: "fixed", bessMW: 0.05, bessH: 8, pKV: 0.4, sKV: 0.4, nTrafo: 1, mva: 0.1, topo: "isolated", red: "NONE", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, bessPurpose: ["backup"], tags: ["telecom"], name: "Conceptual highland telecom hub — Afghanistan", description: "Altitude, access, 8 h battery." }),
  make({ family: "H", arch: "H12", iso: "LBY", env: "E02", app: "settlement", peak: 2.1, pvDc: 4.5, pvAc: 3.6, mount: "fixed", bessMW: 1.6, bessH: 5, dieselMW: 1.8, pKV: 11, sKV: 0.4, nTrafo: 2, mva: 2, topo: "radial", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, transients: ["motor-start"], tags: ["settlement"], name: "Conceptual remote settlement microgrid — Libya", description: "Off-grid town cluster." }),
  make({ family: "H", arch: "H12", iso: "MMR", env: "E12", app: "settlement", peak: 1.2, pvDc: 2.2, pvAc: 1.8, mount: "fixed", bessMW: 0.9, bessH: 6, pKV: 11, sKV: 0.4, nTrafo: 2, mva: 1.25, topo: "radial", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, transients: ["motor-start"], tags: ["settlement"], name: "Conceptual remote settlement — Myanmar", description: "Humid off-grid village cluster." }),
  make({ family: "H", arch: "H14", iso: "JOR", env: "E14", app: "logistics", peak: 1.4, pvDc: 2.5, pvAc: 2, mount: "fixed", bessMW: 1, bessH: 4, dieselMW: 1.2, pKV: 11, sKV: 0.4, nTrafo: 2, mva: 1.6, topo: "radial", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, transients: ["motor-start"], tags: ["remote"], name: "Conceptual remote infrastructure microgrid — Jordan", description: "Corridor outpost, not a named facility." }),
  make({ family: "H", arch: "H14", iso: "PAK", env: "E14", app: "telecom", peak: 0.25, pvDc: 0.6, pvAc: 0.48, mount: "fixed", bessMW: 0.2, bessH: 8, dieselMW: 0.15, pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.4, topo: "isolated", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, tags: ["remote"], name: "Conceptual remote corridor hub — Pakistan", description: "Sub-MW isolated site." }),
  make({ family: "H", arch: "H15", iso: "IND", env: "E08", app: "industrial", peak: 30, pvDc: 22, pvAc: 18, mount: "fixed", bessMW: 12, bessH: 2, dieselMW: 10, pKV: 132, sKV: 11, nTrafo: 2, mva: 31.5, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "islandable", strength: "medium", exportOk: true, transients: ["process-start", "motor-start"], tags: ["industry"], name: "Conceptual industrial park microgrid — India", description: "Park can island; PV < peak; grid export optional." }),
  make({ family: "H", arch: "H15", iso: "THA", env: "E08", app: "industrial", peak: 18, pvDc: 14, pvAc: 11, mount: "fixed", bessMW: 8, bessH: 2, pKV: 115, sKV: 22, nTrafo: 2, mva: 20, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: true, transients: ["motor-start"], tags: ["industry"], name: "Conceptual industrial park — Thailand", description: "Grid-parallel park." }),
  make({ family: "H", arch: "H16", iso: "ARE", env: "E07", app: "port", peak: 20, pvDc: 16, pvAc: 13, mount: "fixed", bessMW: 10, bessH: 2, dieselMW: 8, pKV: 33, sKV: 11, nTrafo: 2, mva: 25, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "islandable", strength: "medium", exportOk: false, featured: true, transients: ["conveyor-start", "motor-start"], tags: ["port"], name: "Conceptual port microgrid — UAE", description: "Coastal saline, cranes/conveyors as transients." }),
  make({ family: "H", arch: "H16", iso: "OMN", env: "E06", app: "port", peak: 12, pvDc: 10, pvAc: 8, mount: "fixed", bessMW: 6, bessH: 3, pKV: 33, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, transients: ["conveyor-start"], tags: ["port"], name: "Conceptual port energy system — Oman", description: "Weak-grid port." }),
  make({ family: "H", arch: "H16", iso: "LKA", env: "E07", app: "port", peak: 8, pvDc: 6, pvAc: 5, mount: "fixed", bessMW: 3, bessH: 2, pKV: 33, sKV: 11, nTrafo: 2, mva: 10, topo: "radial", red: "N", bus: "single-bus", gridMode: "grid-connected", strength: "medium", exportOk: false, transients: ["motor-start"], tags: ["port"], name: "Conceptual coastal port microgrid — Sri Lanka", description: "Humid coastal port loads." }),
  make({ family: "H", arch: "H03", iso: "EGY", env: "E08", app: "industrial", peak: 15, pvDc: 12, pvAc: 10, mount: "fixed", bessMW: 8, bessH: 2, pKV: 66, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N-1", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, transients: ["motor-start"], tags: ["weak-grid"], name: "Conceptual weak-grid industrial — Egypt", description: "Urban-industrial weak infeed." }),
  make({ family: "H", arch: "H05", iso: "IND", env: "E09", app: "agriculture", peak: 6, pvDc: 10, pvAc: 8, mount: "fixed", bessMW: 3, bessH: 4, pKV: 33, sKV: 11, nTrafo: 2, mva: 8, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: true, seasonal: "irrigation", transients: ["pump-start"], tags: ["agriculture"], name: "Conceptual agri microgrid — India", description: "Day-aligned PV, seasonal pumps." }),
  make({ family: "H", arch: "H12", iso: "THA", env: "E11", app: "settlement", peak: 0.9, pvDc: 1.6, pvAc: 1.3, mount: "fixed", bessMW: 0.7, bessH: 6, pKV: 22, sKV: 0.4, nTrafo: 2, mva: 1, topo: "radial", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, seasonal: "monsoon", transients: ["motor-start"], tags: ["monsoon"], name: "Conceptual monsoon settlement microgrid — Thailand", description: "Off-grid, monsoon access risk." }),
  make({ family: "H", arch: "H01", iso: "SAU", env: "E01", app: "settlement", peak: 0.55, pvDc: 1.4, pvAc: 1.1, mount: "fixed", bessMW: 0.5, bessH: 8, pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.8, topo: "isolated", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, bessPurpose: ["grid-forming", "backup"], tags: ["desert"], name: "Conceptual isolated desert camp — Saudi Arabia", description: "Hyper-arid isolated load, long BESS." }),
  make({ family: "H", arch: "H02", iso: "DZA", env: "E01", app: "settlement", peak: 3.4, pvDc: 7, pvAc: 5.6, mount: "fixed", bessMW: 2.5, bessH: 4, dieselMW: 3, pKV: 33, sKV: 11, nTrafo: 2, mva: 5, topo: "radial", red: "N", bus: "single-bus", gridMode: "off-grid", strength: "isolated", exportOk: false, transients: ["motor-start"], tags: ["desert"], name: "Conceptual Sahara cluster microgrid — Algeria", description: "Off-grid desert town." }),
  make({ family: "H", arch: "H06", iso: "EGY", env: "E03", app: "water-pumping", peak: 3.8, pvDc: 7, pvAc: 5.5, mount: "fixed", bessMW: 2, bessH: 4, pKV: 11, sKV: 0.4, nTrafo: 2, mva: 4, topo: "radial", red: "N", bus: "single-bus", gridMode: "islandable", strength: "weak", exportOk: false, transients: ["pump-start"], tags: ["pumps", "oasis"], name: "Conceptual oasis pumping microgrid — Egypt", description: "Wells and distribution pumps." }),
  make({ family: "H", arch: "H09", iso: "QAT", env: "E08", app: "airport", peak: 11, pvDc: 8, pvAc: 6.5, mount: "fixed", bessMW: 6, bessH: 2, dieselMW: 8, pKV: 66, sKV: 11, nTrafo: 2, mva: 16, topo: "radial", red: "N-1", bus: "sectionalized-single-bus", gridMode: "islandable", strength: "strong", exportOk: false, transients: ["motor-start"], tags: ["airport"], name: "Conceptual airport energy hub — Qatar", description: "Critical + logistics." }),
  make({ family: "H", arch: "H15", iso: "SAU", env: "E08", app: "industrial", peak: 42, pvDc: 30, pvAc: 24, mount: "fixed", bessMW: 18, bessH: 2, dieselMW: 15, pKV: 132, sKV: 13.8, nTrafo: 2, mva: 40, topo: "radial", red: "N-1", bus: "double-bus", gridMode: "islandable", strength: "strong", exportOk: true, transients: ["process-start"], tags: ["industry"], name: "Conceptual industrial park microgrid — Saudi Arabia", description: "13.8 kV as a conceptual industrial bus." }),
  make({ family: "H", arch: "H03", iso: "BGD", env: "E11", app: "urban-distribution", peak: 7.5, pvDc: 6, pvAc: 5, mount: "fixed", bessMW: 4, bessH: 2, pKV: 33, sKV: 11, nTrafo: 2, mva: 10, topo: "radial", red: "N", bus: "single-bus", gridMode: "weak-grid", strength: "weak", exportOk: false, seasonal: "monsoon", transients: ["motor-start"], tags: ["weak-grid", "monsoon"], name: "Conceptual weak-grid urban cluster — Bangladesh", description: "Monsoon + weak infeed." }),
  make({ family: "H", arch: "H04", iso: "THA", env: "E12", app: "industrial", peak: 12, pvDc: 8, pvAc: 6.5, mount: "fixed", bessMW: 6, bessH: 3, dieselMW: 10, pKV: 22, sKV: 0.4, nTrafo: 2, mva: 12.5, topo: "isolated", red: "N-1", bus: "single-bus", gridMode: "islandable", strength: "isolated", exportOk: false, transients: ["process-start"], tags: ["islanded"], name: "Conceptual islanded industrial — Thailand", description: "Can disconnect from a humid urban grid." }),
];

function assignIds(seeds) {
  const counts = {};
  return seeds.map((s) => {
    const key = `${s.family}-${s.iso}-${s.arch}`;
    counts[key] = (counts[key] || 0) + 1;
    const id = `${key}-${String(counts[key]).padStart(3, "0")}`;
    return { ...s, id };
  });
}

function stripInternal(t) {
  const { _errors, _ok, ...rest } = t;
  return rest;
}

function writeTemplatesModule(templates) {
  const body = `/**
 * Arquitectura Sagrada — stored conceptual templates.
 * Generated by scripts/generate-architecture-templates.mjs
 * Do not randomize at runtime.
 */

export const architectureTemplates = Object.freeze(${JSON.stringify(templates, null, 2)});

export const TEMPLATE_COUNT = architectureTemplates.length;
`;
  const out = path.join(ROOT, "js/architecture/templates.js");
  fs.writeFileSync(out, body);
  return out;
}

function catalog(templates, rejected) {
  const by = (fn) => {
    const m = {};
    for (const t of templates) {
      const k = fn(t);
      m[k] = (m[k] || 0) + 1;
    }
    return m;
  };
  const family = by((t) => t.familyName);
  const country = by((t) => t.countryName);
  const region = by((t) => t.region);
  const env = by((t) => t.environment.climate);
  const scale = by((t) => t.loadProfile.scaleBand);
  const bess = templates.filter((t) => t.bess.enabled).length;
  const off = templates.filter((t) => t.grid.mode === "off-grid").length;
  const weak = templates.filter((t) => t.grid.strength === "weak" || t.grid.mode === "weak-grid").length;
  const gc = templates.filter((t) => t.grid.mode === "grid-connected").length;
  const seasonal = templates.filter((t) => t.seasonalProfiles).length;
  const trans = templates.filter((t) => t.loadProfile.transientEvents.length).length;
  const featured = templates.filter((t) => t.featured).length;

  const md = `# Template catalog

Conceptual dataset for Arquitectura Sagrada. Country is geographic context, not a grid-code claim.

- Total templates: **${templates.length}**
- Featured: ${featured}
- Rejected candidates: ${rejected.length}

## By family

${Object.entries(family).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## By country

${Object.entries(country).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## By region

${Object.entries(region).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## By environment

${Object.entries(env).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## By scale

${Object.entries(scale).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Grid and storage

- BESS enabled: ${bess}
- Off-grid: ${off}
- Weak-grid (mode or strength): ${weak}
- Grid-connected: ${gc}
- Seasonal profiles: ${seasonal}
- Transient events: ${trans}

## Rejected (if any)

${rejected.length ? rejected.map((r) => `- ${r.id}: ${r.errors.map((e) => e.code).join(", ")}`).join("\n") : "_None after viability filter._"}
`;
  fs.writeFileSync(path.join(ROOT, "docs/architecture-sacred/template-catalog.md"), md);

  const countries = Object.keys(country);
  const families = ["GENERATION", "SUBSTATION", "HYBRID / MICROGRID"];
  const apps = [...new Set(templates.map((t) => t.application))].sort();
  const envs = [...new Set(templates.map((t) => t.environment.code))].sort();

  let matrix = `# Template coverage

Counts of conceptual templates. Uneven is acceptable; monopoly is not.

## Country × family

| Country | GENERATION | SUBSTATION | HYBRID / MICROGRID | Total |
|---|---:|---:|---:|---:|
`;
  for (const c of Object.keys(COUNTRIES)) {
    const name = COUNTRIES[c].name;
    const g = templates.filter((t) => t.country === c && t.family === "G").length;
    const s = templates.filter((t) => t.country === c && t.family === "S").length;
    const h = templates.filter((t) => t.country === c && t.family === "H").length;
    matrix += `| ${name} | ${g} | ${s} | ${h} | ${g + s + h} |\n`;
  }

  matrix += `\n## Environment × family\n\n| Environment | G | S | H | Total |\n|---|---:|---:|---:|---:|\n`;
  for (const e of envs) {
    const g = templates.filter((t) => t.environment.code === e && t.family === "G").length;
    const s = templates.filter((t) => t.environment.code === e && t.family === "S").length;
    const h = templates.filter((t) => t.environment.code === e && t.family === "H").length;
    matrix += `| ${e} ${ENVIRONMENTS[e].climate} | ${g} | ${s} | ${h} | ${g + s + h} |\n`;
  }

  matrix += `\n## Application counts\n\n`;
  for (const a of apps) {
    matrix += `- ${a}: ${templates.filter((t) => t.application === a).length}\n`;
  }

  const maxCountry = Math.max(...Object.values(country));
  const minCountry = Math.min(...Object.values(country));
  matrix += `\nMax templates in one country: ${maxCountry}. Min (among represented): ${minCountry}. Represented countries: ${countries.length}.\n`;
  fs.writeFileSync(path.join(ROOT, "docs/architecture-sacred/template-coverage.md"), matrix);

  const warnLines = ["# Template warnings\n", "Viability warnings (templates remain editable).\n"];
  for (const t of templates) {
    if (t.warnings.length) warnLines.push(`## ${t.id}\n${t.warnings.map((w) => `- ${w}`).join("\n")}\n`);
  }
  fs.writeFileSync(path.join(ROOT, "docs/architecture-sacred/template-warnings.md"), warnLines.join("\n"));
}

function main() {
  const seeded = assignIds(SEEDS);
  const expanded = seeded.map(expand);
  const accepted = [];
  const rejected = [];
  for (const t of expanded) {
    if (t._ok) accepted.push(stripInternal(t));
    else rejected.push({ id: t.id, errors: t._errors, name: t.name });
  }

  if (accepted.length < 96) {
    console.error("Need 96 valid templates, got", accepted.length);
    console.error(rejected.slice(0, 20));
    process.exit(1);
  }

  const ids = new Set(accepted.map((t) => t.id));
  if (ids.size !== accepted.length) {
    console.error("duplicate ids");
    process.exit(1);
  }

  const out = writeTemplatesModule(accepted);
  catalog(accepted, rejected);
  console.log("wrote", out);
  console.log("accepted", accepted.length, "rejected", rejected.length);
  if (rejected.length) console.log(rejected);
}

main();
