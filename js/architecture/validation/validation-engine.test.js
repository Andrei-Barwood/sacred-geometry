import assert from "node:assert/strict";
import { architectureTemplates as T } from "../templates.js";
import { validateTemplate } from "./validate-template.js";
import { validateTemplateDataset } from "./validate-dataset.js";
import { validateTemplateSchema } from "./validate-schema.js";
import { createIssueBag } from "./issues.js";
import { approximatelyEqual, isFiniteNumber } from "./helpers.js";
import { CONSUMPTION_PROFILE_ID } from "./validation-config.js";
import { validateConsumptionStudy6kW } from "./validate-consumption.js";
import { wattsToKilowatts, kilowattsToMegawatts } from "../units.js";
import { LOAD_STATES } from "../models.js";
import { evaluateScenario } from "../demand.js";
import { getLoadById, referenceLoads, installationProfile } from "../reference-loads.js";

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (e) {
    failed += 1;
    console.error("FAIL", name, e.message);
  }
}

function invalid(patch) {
  const base = structuredClone(T[0]);
  return Object.assign(base, patch);
}

test("floating point helper", () => {
  assert.equal(approximatelyEqual(0.1 + 0.2, 0.3), true);
  assert.equal(isFiniteNumber(NaN), false);
  assert.equal(isFiniteNumber(Infinity), false);
});

test("units.js conversions", () => {
  assert.equal(wattsToKilowatts(1000), 1);
  assert.equal(kilowattsToMegawatts(1000), 1);
});

test("schema missing family", () => {
  const issues = createIssueBag();
  validateTemplateSchema({ conceptual: true }, issues);
  assert.ok(issues.snapshot().errors.some((e) => e.code === "MISSING_FIELD"));
});

test("immutability", () => {
  const t = T[0];
  const snap = JSON.stringify(t);
  validateTemplate(t, { mode: "audit" });
  assert.equal(JSON.stringify(t), snap);
});

test("negative load → ERROR", () => {
  const t = structuredClone(T[0]);
  t.loadProfile.peakLoadMW = -1;
  const r = validateTemplate(t);
  assert.equal(r.valid, false);
  assert.ok(r.errors.some((e) => e.code === "NEGATIVE"));
});

test("loadFactor 1.3 → ERROR", () => {
  const t = structuredClone(T[0]);
  t.loadProfile.loadFactor = 1.3;
  const r = validateTemplate(t);
  assert.ok(r.errors.some((e) => e.code === "FRACTION"));
});

test("BESS enabled 0 MW → ERROR", () => {
  const t = structuredClone(T.find((x) => x.bess.enabled) || T[0]);
  t.bess = { enabled: true, powerMW: 0, energyMWh: 10, durationHours: 0, purpose: ["backup"] };
  const r = validateTemplate(t);
  assert.ok(r.errors.some((e) => e.code === "BESS_POWER" || e.code === "BESS_DURATION" || e.code === "BACKUP_EMPTY"));
});

test("N-1 with one transformer → ERROR", () => {
  const t = structuredClone(T[0]);
  t.substation.transformerCount = 1;
  t.substation.redundancyMode = "N-1";
  t.substation.transformerTotalMVA = t.substation.transformerMVA;
  const r = validateTemplate(t);
  assert.ok(r.errors.some((e) => e.code === "N1_COUNT"));
});

test("off-grid without generation → ERROR", () => {
  const t = structuredClone(T[0]);
  t.grid.mode = "off-grid";
  t.generation = { enabled: false, pv: null, wind: null, diesel: null };
  t.bess = { enabled: true, powerMW: 1, energyMWh: 4, durationHours: 4, purpose: ["backup"] };
  const r = validateTemplate(t);
  assert.ok(r.errors.some((e) => e.code === "OFFGRID_NO_SOURCE"));
});

test("negative BTC tariff → ERROR", () => {
  const t = structuredClone(T[0]);
  t.economics.btcPerKWh = -0.1;
  const r = validateTemplate(t);
  assert.ok(r.errors.some((e) => e.code === "NEG_TARIFF"));
});

test("two PV energy methods → ERROR", () => {
  const t = structuredClone(T.find((x) => x.generation.pv));
  t.generation.useSpecificYield = true;
  t.generation.useCapacityFactor = true;
  t.generation.pv.specificYieldKWhPerKWpYear = 1800;
  t.generation.pv.capacityFactor = 0.2;
  const r = validateTemplate(t);
  assert.ok(r.errors.some((e) => e.code === "TWO_METHODS"));
});

test("country outside region → ERROR", () => {
  const t = structuredClone(T[0]);
  t.country = "THA";
  t.countryName = "Thailand";
  t.regionId = "R01";
  const r = validateTemplate(t);
  assert.ok(r.errors.some((e) => e.code === "COUNTRY_REGION"));
});

test("private path → ERROR", () => {
  const t = structuredClone(T[0]);
  t.notes = "/Users/andreibarwood/secret";
  const r = validateTemplate(t);
  assert.ok(r.errors.some((e) => String(e.code).startsWith("PRIVACY")));
});

test("NaN / Infinity → ERROR", () => {
  const t = structuredClone(T[0]);
  t.loadProfile.peakLoadMW = NaN;
  assert.ok(validateTemplate(t).errors.some((e) => e.code === "NAN"));
  const t2 = structuredClone(T[0]);
  t2.loadProfile.peakLoadMW = Infinity;
  assert.ok(validateTemplate(t2).errors.some((e) => e.code === "NOT_FINITE"));
});

test("high DC/AC is WARNING not ERROR", () => {
  const t = structuredClone(T.find((x) => x.generation.pv));
  t.generation.pv.dcMWp = 200;
  t.generation.pv.acMW = 100;
  t.generation.pv.dcAcRatio = 2;
  const r = validateTemplate(t);
  assert.ok(r.warnings.some((w) => w.code === "DCAC_RANGE"));
  assert.ok(!r.errors.some((e) => e.code === "DCAC_RANGE"));
});

test("null specific yield is NOTICE not ERROR", () => {
  const t = T.find((x) => x.generation.pv && x.generation.pv.specificYieldKWhPerKWpYear == null);
  assert.ok(t);
  const r = validateTemplate(t);
  assert.ok(r.notices.some((n) => n.code === "YIELD_PENDING" || n.code === "YIELD_SITE_STUDY"));
  assert.ok(!r.errors.some((e) => /YIELD/.test(e.code)));
});

test("6kW profile rules do not run on utility templates", () => {
  const r = validateTemplate(T[0]);
  assert.ok(!r.errors.some((e) => e.category === "consumption-6kw"));
  const issues = createIssueBag();
  const derived = {};
  validateConsumptionStudy6kW({ validationProfile: CONSUMPTION_PROFILE_ID, powerW: 1200, voltageV: 230, measuredA: 5.22 }, issues, derived);
  assert.ok(derived.expectedCurrentA);
});

test("STARTING does not rewrite monthly energy; scenario uses demand engine", () => {
  const sc = evaluateScenario({
    loads: [getLoadById("heater-1200"), getLoadById("freezer-storage")],
    voltageV: 230,
    serviceLimitKW: installationProfile.serviceLimitKW,
    exclusiveSelection: { "space-heater": "heater-1200" },
    states: { "heater-1200": LOAD_STATES.RUNNING, "freezer-storage": LOAD_STATES.STARTING },
  });
  assert.equal(sc.ok, true);
  assert.ok(sc.value.peakTransientCurrentA > sc.value.steadyStateCurrentA);
  assert.equal(sc.value.rows.find((x) => x.loadId === "freezer-storage").layer, "transient");
});

test("dataset audit", () => {
  const ds = validateTemplateDataset(T, { mode: "audit" });
  assert.equal(ds.duplicateCount, 0);
  assert.ok(ds.templateCount >= 96);
  assert.ok(ds.elapsedMs < 5000, `slow ${ds.elapsedMs}`);
});

test("determinism", () => {
  const a = JSON.stringify(validateTemplate(T[3]));
  const b = JSON.stringify(validateTemplate(T[3]));
  assert.equal(a, b);
});

test("null vs 0", () => {
  const t = structuredClone(T[0]);
  t.generation.pv.specificYieldKWhPerKWpYear = null;
  const r = validateTemplate(t);
  assert.ok(r.notices.length >= 1);
  const t2 = structuredClone(T[0]);
  if (t2.bess) t2.bess.enabled = false;
  t2.generation.diesel = { ratedMW: 0 };
  t2.generation.enabled = true;
  const r2 = validateTemplate(t2);
  assert.ok(r2.errors.some((e) => e.code === "DIESEL_ZERO"));
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exitCode = 1;
