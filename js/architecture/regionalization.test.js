import assert from "node:assert/strict";
import { architectureTemplates as T } from "./templates.js";
import { COUNTRY_TO_REGION, REGIONAL_PROFILES } from "./regional-profiles.js";
import { calculateRegionalFit, detectNearDuplicateTemplates } from "./regionalization.js";
import { validateRegionalization } from "./regional-validation.js";

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failed += 1;
    console.error(`FAIL  ${name}\n      ${err.message}`);
  }
}

const FORBIDDEN = /snocomm|autocad|\.dwg|\/users\/|andreibarwood|saesa|calama|parinacota/i;

test(">=96 templates after regionalization", () => {
  assert.ok(T.length >= 96, String(T.length));
});

test("all have region, country, country matches region", () => {
  for (const t of T) {
    assert.ok(t.regionId, t.id);
    assert.ok(t.country, t.id);
    assert.equal(COUNTRY_TO_REGION[t.country], t.regionId, t.id);
    assert.ok(REGIONAL_PROFILES[t.regionId].countries.includes(t.country), t.id);
  }
});

test("conceptual, fit 0–100, unique IDs, no tariffs, no coords", () => {
  const ids = new Set();
  for (const t of T) {
    assert.equal(t.conceptual, true, t.id);
    const s = t.regionalization.regionalFitScore;
    assert.ok(s >= 0 && s <= 100, t.id);
    assert.equal(ids.has(t.id), false, t.id);
    ids.add(t.id);
    assert.equal(t.economics.btcPerKWh, null, t.id);
    assert.equal(t.coordinates, null, t.id);
    assert.equal(t.frequencyHz, null, t.id);
    const v = validateRegionalization(t);
    assert.equal(v.ok, true, `${t.id} ${JSON.stringify(v.errors)}`);
  }
});

test("no country or region monopolizes (>15% country, >40% region)", () => {
  const n = T.length;
  const cc = {};
  const rr = {};
  for (const t of T) {
    cc[t.country] = (cc[t.country] || 0) + 1;
    rr[t.regionId] = (rr[t.regionId] || 0) + 1;
  }
  for (const [k, v] of Object.entries(cc)) {
    assert.ok(v / n <= 0.15 + 1e-9, `${k} ${(v / n) * 100}%`);
  }
  for (const [k, v] of Object.entries(rr)) {
    assert.ok(v / n <= 0.4, `${k} ${(v / n) * 100}%`);
  }
  assert.ok(Object.keys(rr).length >= 8);
  assert.ok(Object.keys(cc).length >= 20);
});

test("no near-duplicate clones (same fingerprint, different country only)", () => {
  const clones = detectNearDuplicateTemplates(T, { threshold: 1 });
  assert.equal(clones.length, 0, JSON.stringify(clones));
});

test("privacy and no private paths in templates", () => {
  const blob = JSON.stringify(T);
  assert.equal(FORBIDDEN.test(blob), false);
  assert.equal(/\/users\//i.test(blob), false);
});

test("A oasis PV+BESS fits oasis/arid better than monsoon tropical", () => {
  const oasis = T.find((t) => t.environment.code === "E03" && t.bess.enabled && t.generation.pv);
  assert.ok(oasis, "need oasis PV+BESS");
  const arid = calculateRegionalFit(oasis, REGIONAL_PROFILES.R03);
  const trop = calculateRegionalFit(oasis, REGIONAL_PROFILES.R08);
  assert.ok(arid.score > trop.score, `${arid.score} vs ${trop.score}`);
});

test("B monsoon agriculture fits South Asia / SE better than Sahara", () => {
  const m = T.find((t) => t.environment.code === "E11" && t.application === "agriculture")
    || T.find((t) => t.environment.code === "E11");
  assert.ok(m, "need monsoon template");
  const sa = calculateRegionalFit(m, REGIONAL_PROFILES.R07);
  const se = calculateRegionalFit(m, REGIONAL_PROFILES.R08);
  const sah = calculateRegionalFit(m, REGIONAL_PROFILES.R01);
  assert.ok(Math.max(sa.score, se.score) > sah.score, `${sa.score}/${se.score} vs ${sah.score}`);
});

test("C coastal desalination activates salinity, corrosion, motor load", () => {
  const d = T.find((t) => t.application === "desalination");
  assert.ok(d);
  assert.ok(["high", "extreme"].includes(d.environment.salinityRisk));
  assert.ok(["high", "extreme"].includes(d.environment.corrosionRisk));
  assert.ok(d.loadProfile.motorLoadMW > 0.3 * d.loadProfile.peakLoadMW);
  assert.ok(d.loadProfile.transientEvents.some((e) => e.type === "pump-start" || e.type === "compressor-start"));
});

test("D mining prioritizes motor/cyclic loads and start transients", () => {
  const m = T.find((t) => t.application === "mining");
  assert.ok(m);
  assert.ok(m.loadProfile.motorLoadMW > 0.25 * m.loadProfile.peakLoadMW);
  assert.ok(m.loadProfile.transientEvents.some((e) => /motor|conveyor/.test(e.type)));
  assert.match(m.loadProfile.dominantLoadType, /motor/i);
});

test("E bulk 400/220 is not an isolated rural settlement", () => {
  const b = T.find((t) => t.application === "bulk-power" && t.substation && t.substation.primaryKV >= 400);
  assert.ok(b);
  assert.equal(b.application, "bulk-power");
  assert.notEqual(b.application, "remote-settlement");
  assert.notEqual(b.grid.mode, "off-grid");
});

test("all 8 regions represented; humid regions are not desert-cloned", () => {
  const ids = new Set(T.map((t) => t.regionId));
  for (const r of Object.keys(REGIONAL_PROFILES)) assert.ok(ids.has(r), r);
  const seDesert = T.filter((t) => t.regionId === "R08" && t.environment.code === "E01");
  assert.equal(seDesert.length, 0);
});

console.log(`\n${passed} passed, ${failed} failed, ${passed + failed} total`);
if (failed) process.exitCode = 1;
