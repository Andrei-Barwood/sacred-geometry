#!/usr/bin/env node
/**
 * 24 common-case templates (kW–low MW). Stored, not randomized at runtime.
 *   node scripts/generate-common-case-templates.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COUNTRIES } from "../js/architecture/template-constants.js";
import { COUNTRY_TO_REGION, REGIONAL_PROFILES } from "../js/architecture/regional-profiles.js";
import { calculateRegionalFit } from "../js/architecture/regionalization.js";
import { validateRegionalization } from "../js/architecture/regional-validation.js";
import { validateTemplateViability } from "../js/architecture/template-viability.js";
import { expand } from "./generate-architecture-templates.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SMALL_ASSUMPTIONS = [
  "Voltage levels are conceptual, not a national code claim.",
  "kW-scale aggregated profile. Not a certified dwelling or IEC/NEC design.",
  "Tariff is user-supplied (BTC/kWh).",
];

function make(o) {
  return {
    commonCase: true,
    featured: false,
    assumptions: SMALL_ASSUMPTIONS,
    importOk: o.gridMode !== "off-grid",
    ...o,
    tags: ["common-case", ...(o.tags || [])],
  };
}

const SEEDS = [
  make({
    id: "H-EGY-H03-C01", family: "H", arch: "H03", iso: "EGY", env: "E08", app: "settlement",
    peak: 0.006, pvDc: 0.0075, pvAc: 0.006, mount: "fixed",
    pKV: 0.4, sKV: 0.4, nTrafo: 1, mva: 0.016, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "medium", exportOk: true,
    transients: ["motor-start"], tags: ["residential", "rooftop"],
    name: "Residential 6 kW rooftop PV — grid-tied",
    description: "Single-dwelling or small farm service. Grid-tied rooftop PV, no BESS. Conceptual 6 kW peak.",
  }),
  make({
    id: "H-MAR-H01-C02", family: "H", arch: "H01", iso: "MAR", env: "E04", app: "settlement",
    peak: 0.012, pvDc: 0.02, pvAc: 0.016, mount: "fixed", bessMW: 0.008, bessH: 6,
    pKV: 0.4, sKV: 0.4, nTrafo: 1, mva: 0.025, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "off-grid", strength: "weak", exportOk: false, bessPurpose: ["backup", "solar-firming"],
    transients: ["motor-start"], tags: ["off-grid", "farm"],
    name: "Farm cabin 12 kW off-grid PV+BESS 6 h",
    description: "Isolated farm or lodge. PV with 6 h BESS. No diesel in this variant.",
  }),
  make({
    id: "H-JOR-H11-C03", family: "H", arch: "H11", iso: "JOR", env: "E02", app: "telecom",
    peak: 0.005, pvDc: 0.012, pvAc: 0.01, mount: "fixed", bessMW: 0.004, bessH: 8, dieselMW: 0.008, dieselRole: "backup",
    pKV: 0.4, sKV: 0.4, nTrafo: 1, mva: 0.016, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "off-grid", strength: "weak", exportOk: false, bessPurpose: ["backup", "grid-forming"],
    transients: ["motor-start"], tags: ["telecom", "critical"],
    name: "Telecom tower 5 kW off-grid PV+BESS+diesel",
    description: "Repeater or BTS: high load factor, long BESS, diesel backup. Not a utility plant.",
  }),
  make({
    id: "H-IND-H10-C04", family: "H", arch: "H10", iso: "IND", env: "E08", app: "hospital",
    peak: 0.04, pvDc: 0.06, pvAc: 0.048, mount: "fixed", bessMW: 0.02, bessH: 4, dieselMW: 0.025, dieselRole: "backup",
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.1, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "islandable", strength: "medium", exportOk: false, bessPurpose: ["backup", "grid-forming"],
    transients: ["motor-start"], tags: ["clinic", "critical"],
    name: "Village clinic 40 kW islandable PV+BESS",
    description: "Primary-care clinic. Critical share is high. Diesel is backup, not baseload.",
  }),
  make({
    id: "H-TUN-H12-C05", family: "H", arch: "H12", iso: "TUN", env: "E08", app: "settlement",
    peak: 0.025, pvDc: 0.035, pvAc: 0.028, mount: "fixed", bessMW: 0.015, bessH: 3,
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.063, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "medium", exportOk: true, bessPurpose: ["peak-shaving"],
    transients: ["motor-start"], tags: ["school"],
    name: "Primary school 25 kW rooftop PV+BESS 3 h",
    description: "Daytime school load aligned with PV. Short BESS for afternoon peak.",
  }),
  make({
    id: "H-SAU-H12-C06", family: "H", arch: "H12", iso: "SAU", env: "E08", app: "settlement",
    peak: 0.015, pvDc: 0.022, pvAc: 0.018, mount: "fixed", bessMW: 0.01, bessH: 4,
    pKV: 0.4, sKV: 0.4, nTrafo: 1, mva: 0.04, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "medium", exportOk: true, seasonal: "cooling",
    transients: ["motor-start"], tags: ["community"],
    name: "Community hall 15 kW PV+BESS",
    description: "Mosque or community hall. Cooling-season variation. Conceptual LV service.",
  }),
  make({
    id: "H-SDN-H06-C07", family: "H", arch: "H06", iso: "SDN", env: "E09", app: "irrigation",
    peak: 0.05, pvDc: 0.07, pvAc: 0.055, mount: "fixed",
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.1, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "weak", exportOk: false, seasonal: "irrigation",
    transients: ["pump-start"], tags: ["pumps", "agriculture"],
    name: "Irrigation pump 50 kW solar",
    description: "Seasonal pumping. PV sized near daytime pump load; grid covers coincidence.",
  }),
  make({
    id: "H-LBN-H03-C08", family: "H", arch: "H03", iso: "LBN", env: "E08", app: "industrial",
    peak: 0.02, pvDc: 0.025, pvAc: 0.02, mount: "fixed", bessMW: 0.015, bessH: 2,
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.05, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "weak-grid", strength: "weak", exportOk: false, bessPurpose: ["peak-shaving", "backup"],
    transients: ["motor-start"], tags: ["workshop"],
    name: "Workshop 20 kW weak-grid PV+BESS",
    description: "Small motors and tools. Weak grid; 2 h BESS for starts and outages.",
  }),
  make({
    id: "H-PAK-H12-C09", family: "H", arch: "H12", iso: "PAK", env: "E09", app: "agriculture",
    peak: 0.018, pvDc: 0.03, pvAc: 0.024, mount: "fixed", bessMW: 0.012, bessH: 6,
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.05, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "weak-grid", strength: "weak", exportOk: false, bessPurpose: ["energy-shifting"],
    transients: ["compressor-start"], tags: ["cold-storage"],
    name: "Farm cold room 18 kW PV+BESS 6 h",
    description: "Small cold room. Longer BESS to ride through night set-point.",
  }),
  make({
    id: "H-OMN-H09-C10", family: "H", arch: "H09", iso: "OMN", env: "E06", app: "tourism",
    peak: 0.08, pvDc: 0.1, pvAc: 0.08, mount: "fixed", bessMW: 0.04, bessH: 4,
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.16, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "medium", exportOk: true, seasonal: "tourism",
    transients: ["motor-start"], tags: ["hotel", "coast"],
    name: "Small hotel 80 kW PV+BESS 4 h",
    description: "Coastal lodge. Seasonal occupancy. Corrosion class assumed, not designed.",
  }),
  make({
    id: "H-ARE-H03-C11", family: "H", arch: "H03", iso: "ARE", env: "E08", app: "urban-distribution",
    peak: 0.05, pvDc: 0.06, pvAc: 0.05, mount: "fixed",
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.1, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "strong", exportOk: true, seasonal: "cooling",
    transients: ["motor-start"], tags: ["office", "rooftop"],
    name: "Office 50 kW rooftop PV",
    description: "Weekday office, cooling-dominated. Grid-tied, no BESS in this variant.",
  }),
  make({
    id: "H-THA-H09-C12", family: "H", arch: "H09", iso: "THA", env: "E08", app: "logistics",
    peak: 0.1, pvDc: 0.12, pvAc: 0.1, mount: "fixed", bessMW: 0.05, bessH: 2,
    pKV: 22, sKV: 0.4, nTrafo: 1, mva: 0.25, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "medium", exportOk: true, bessPurpose: ["peak-shaving"],
    transients: ["motor-start"], tags: ["warehouse"],
    name: "Warehouse 100 kW rooftop PV+BESS 2 h",
    description: "Logistics shed. Conveyors/forklifts as motor share. Short peak-shave BESS.",
  }),
  make({
    id: "H-KWT-H03-C13", family: "H", arch: "H03", iso: "KWT", env: "E08", app: "urban-distribution",
    peak: 0.15, pvDc: 0.12, pvAc: 0.1, mount: "fixed", bessMW: 0.1, bessH: 2,
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.25, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "strong", exportOk: false, bessPurpose: ["peak-shaving"],
    transients: ["motor-start"], tags: ["ev-charging"],
    name: "EV charging 150 kW with PV+BESS",
    description: "Small public charger. PV does not cover peak; BESS and grid share the rest.",
  }),
  make({
    id: "H-IRN-H12-C14", family: "H", arch: "H12", iso: "IRN", env: "E08", app: "urban-distribution",
    peak: 0.12, pvDc: 0.08, pvAc: 0.065, mount: "fixed",
    pKV: 20, sKV: 0.4, nTrafo: 1, mva: 0.25, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "medium", exportOk: true, seasonal: "cooling",
    transients: ["motor-start"], tags: ["residential", "block"],
    name: "Apartment block 120 kW with rooftop PV",
    description: "Multi-dwelling LV service. Rooftop PV is a share of energy, not the peak.",
  }),
  make({
    id: "H-IRQ-H12-C15", family: "H", arch: "H12", iso: "IRQ", env: "E08", app: "settlement",
    peak: 0.035, pvDc: 0.04, pvAc: 0.032, mount: "fixed", dieselMW: 0.02, dieselRole: "backup",
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.1, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "weak-grid", strength: "weak", exportOk: false,
    transients: ["motor-start"], tags: ["market"],
    name: "Market stalls 35 kW weak-grid PV+diesel",
    description: "Open market or souk cluster. Diesel covers evening and outages.",
  }),
  make({
    id: "H-MMR-H05-C16", family: "H", arch: "H05", iso: "MMR", env: "E09", app: "agriculture",
    peak: 0.045, pvDc: 0.06, pvAc: 0.048, mount: "fixed", bessMW: 0.02, bessH: 3,
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.1, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "grid-connected", strength: "weak", exportOk: false, seasonal: "irrigation",
    transients: ["pump-start"], tags: ["greenhouse"],
    name: "Greenhouse 45 kW PV+BESS",
    description: "Fans, pumps, lighting. Seasonal irrigation/cooling. Conceptual only.",
  }),
  make({
    id: "H-LKA-H05-C17", family: "H", arch: "H05", iso: "LKA", env: "E09", app: "agriculture",
    peak: 0.06, pvDc: 0.08, pvAc: 0.064, mount: "fixed", bessMW: 0.03, bessH: 4, dieselMW: 0.03, dieselRole: "backup",
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.16, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "weak-grid", strength: "weak", exportOk: false, bessPurpose: ["backup", "solar-firming"],
    transients: ["motor-start", "pump-start"], tags: ["dairy"],
    name: "Dairy 60 kW PV+BESS+diesel",
    description: "Milking and cooling motors. Weak grid; diesel is backup.",
  }),
  make({
    id: "H-YEM-H06-C18", family: "H", arch: "H06", iso: "YEM", env: "E14", app: "water-pumping",
    peak: 0.02, pvDc: 0.035, pvAc: 0.028, mount: "fixed", bessMW: 0.01, bessH: 4,
    pKV: 0.4, sKV: 0.4, nTrafo: 1, mva: 0.05, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "off-grid", strength: "weak", exportOk: false, bessPurpose: ["solar-firming"],
    transients: ["pump-start"], tags: ["water", "off-grid"],
    name: "Village well 20 kW off-grid solar pump",
    description: "Daytime pumping with short BESS. Remote logistics assumed.",
  }),
  make({
    id: "H-AFG-H02-C19", family: "H", arch: "H02", iso: "AFG", env: "E14", app: "industrial",
    peak: 0.04, pvDc: 0.03, pvAc: 0.024, mount: "fixed", dieselMW: 0.04, dieselRole: "prime",
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.1, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "off-grid", strength: "weak", exportOk: false,
    transients: ["motor-start"], tags: ["temporary", "construction"],
    name: "Construction site 40 kW PV+diesel",
    description: "Temporary site. Diesel is prime; PV offsets daytime energy. Not a permanent plant.",
  }),
  make({
    id: "H-DZA-H01-C20", family: "H", arch: "H01", iso: "DZA", env: "E02", app: "telecom",
    peak: 0.01, pvDc: 0.018, pvAc: 0.014, mount: "fixed", bessMW: 0.008, bessH: 10,
    pKV: 0.4, sKV: 0.4, nTrafo: 1, mva: 0.025, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "off-grid", strength: "weak", exportOk: false, bessPurpose: ["backup", "grid-forming"],
    transients: ["motor-start"], tags: ["lighting"],
    name: "Solar street lighting 10 kW + long BESS",
    description: "Night lighting cluster. High load factor at night; long BESS, no diesel.",
  }),
  make({
    id: "H-BGD-H04-C21", family: "H", arch: "H04", iso: "BGD", env: "E08", app: "industrial",
    peak: 0.4, pvDc: 0.35, pvAc: 0.28, mount: "fixed", bessMW: 0.15, bessH: 2, dieselMW: 0.2, dieselRole: "backup",
    pKV: 11, sKV: 0.4, nTrafo: 2, mva: 0.4, topo: "radial", red: "N-1", bus: "single-bus",
    gridMode: "grid-connected", strength: "medium", exportOk: false, bessPurpose: ["peak-shaving"],
    transients: ["motor-start", "process-start"], tags: ["factory"],
    name: "Small factory 400 kW PV+BESS",
    description: "Light industry. Dual 11/0.4 kV transformers. PV does not cover peak.",
  }),
  make({
    id: "H-QAT-H16-C22", family: "H", arch: "H16", iso: "QAT", env: "E06", app: "port",
    peak: 0.25, pvDc: 0.2, pvAc: 0.16, mount: "fixed", bessMW: 0.1, bessH: 2,
    pKV: 11, sKV: 0.4, nTrafo: 2, mva: 0.315, topo: "radial", red: "N-1", bus: "single-bus",
    gridMode: "grid-connected", strength: "strong", exportOk: false, bessPurpose: ["peak-shaving"],
    transients: ["motor-start"], tags: ["port", "coast"],
    name: "Port workshop 250 kW PV+BESS",
    description: "Coastal workshop. Corrosion class assumed. Grid-parallel.",
  }),
  make({
    id: "H-SYR-H03-C23", family: "H", arch: "H03", iso: "SYR", env: "E08", app: "settlement",
    peak: 0.08, pvDc: 0.1, pvAc: 0.08, mount: "fixed", bessMW: 0.04, bessH: 4, dieselMW: 0.05, dieselRole: "backup",
    pKV: 11, sKV: 0.4, nTrafo: 1, mva: 0.16, topo: "radial", red: "N", bus: "single-bus",
    gridMode: "weak-grid", strength: "weak", exportOk: false, bessPurpose: ["backup", "solar-firming"],
    transients: ["motor-start"], tags: ["cluster"],
    name: "Neighbourhood cluster 80 kW weak-grid",
    description: "A few dwellings and shops. Weak grid, 4 h BESS, diesel backup.",
  }),
  make({
    id: "H-MRT-H10-C24", family: "H", arch: "H10", iso: "MRT", env: "E08", app: "hospital",
    peak: 0.2, pvDc: 0.22, pvAc: 0.18, mount: "fixed", bessMW: 0.1, bessH: 4, dieselMW: 0.15, dieselRole: "backup",
    pKV: 11, sKV: 0.4, nTrafo: 2, mva: 0.25, topo: "radial", red: "N-1", bus: "sectionalized-single-bus",
    gridMode: "islandable", strength: "medium", exportOk: false, bessPurpose: ["backup", "grid-forming"],
    transients: ["motor-start", "transformer-energization"], tags: ["hospital", "critical"],
    name: "Hospital wing 200 kW islandable PV+BESS",
    description: "Ward/clinic wing. N-1 LV transformers. Diesel is backup, not baseload.",
  }),
];

function stripInternal(t) {
  const copy = { ...t };
  delete copy._errors;
  delete copy._ok;
  return copy;
}

/** Keep the intended country. Do not hop regions for atlas diversity. */
function stampRegion(t) {
  const regionId = COUNTRY_TO_REGION[t.country];
  const profile = REGIONAL_PROFILES[regionId];
  const fit = calculateRegionalFit(t, profile);
  t.countryName = COUNTRIES[t.country].name;
  t.regionId = regionId;
  t.region = profile.name;
  t.frequencyHz = null;
  t.frequencyProvenance = "conceptual-template";
  t.coordinates = null;
  if (t.generation?.pv) {
    t.generation.pv.specificYieldKWhPerKWpYear = null;
    t.generation.pv.capacityFactor = null;
    t.generation.pv.lossesPercent = null;
    t.generation.pv.resourceProvenance = "future-site-study";
  }
  t.informationLayers = {
    electrical: "source-derived-from-prompt-4-dataset",
    territorial: "conceptual-assumption",
    assumptions: "conceptual-assumption",
    verified: null,
  };
  t.regionalization = {
    profileId: regionId,
    regionalFitScore: fit.score,
    environmentFitScore: fit.breakdown.environment,
    applicationFitScore: fit.breakdown.application,
    assumptionsCount: (t.assumptions || []).length,
    warningsCount: (t.warnings || []).length,
    fitBreakdown: fit.breakdown,
  };
  t.commonCase = true;
  t.featured = false;
  if (!t.tags.includes("common-case")) t.tags = ["common-case", ...t.tags];
  return t;
}

function main() {
  const expanded = SEEDS.map(expand);
  const failed = expanded.filter((t) => !t._ok);
  if (failed.length) {
    console.error("viability failed", failed.map((t) => ({ id: t.id, errors: t._errors })));
    process.exit(1);
  }
  const regionalized = expanded.map(stripInternal).map(stampRegion);
  for (const t of regionalized) {
    const v = validateTemplateViability(t);
    const r = validateRegionalization(t);
    if (!v.ok || !r.ok) {
      console.error("post-stamp fail", t.id, v.errors, r.errors);
      process.exit(1);
    }
  }
  const ids = regionalized.map((t) => t.id);
  if (new Set(ids).size !== 24) {
    console.error("need 24 unique ids", ids.length);
    process.exit(1);
  }
  const body = `/**
 * 24 common-case templates (kW–low MW). Stored; not regenerated at runtime.
 * Generated by scripts/generate-common-case-templates.mjs
 */

export const COMMON_CASE_COUNT = 24;

export const commonCaseTemplates = Object.freeze(${JSON.stringify(regionalized, null, 2)});
`;
  const out = path.join(ROOT, "js/architecture/common-templates.js");
  fs.writeFileSync(out, body);
  console.log("wrote", out, regionalized.length);
}

main();
