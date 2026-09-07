/**
 * Sacred Architecture Workbench tests.
 *   node js/architecture/ui/workbench.test.js
 */

import assert from "node:assert/strict";
import { architectureTemplates } from "../templates.js";
import { calculateResistiveCurrent } from "../current.js";
import { calculateDutyCycleEnergy } from "../energy.js";
import { calculateEnergyCost, formatBTC, formatSats } from "../economics.js";
import { roundTo } from "../units.js";
import { cloneValue } from "./clone.js";
import {
  createEmptyProject,
  createSample6kWProject,
  projectFromTemplate,
  projectToTemplate,
} from "./state.js";
import {
  addLoadPreset,
  deleteLoad,
  duplicateLoad,
  duplicateProject,
  loadTemplateById,
  patchLoad,
  setField,
  setLoadState,
  setNumericField,
  startFromZero,
} from "./actions.js";
import { recompute } from "./derive.js";
import {
  getEconomicResults,
  getProvenance,
  getSummary,
  getValidationResults,
} from "./selectors.js";
import { buildArchitectureGraph } from "./architecture-graph.js";
import {
  emptyFilters,
  featuredArchitectures,
  filterTemplates,
  templateCardModel,
} from "./template-explorer.js";
import {
  clearEnrichments,
  putEnrichment,
  ENRICHMENT_STATUS,
} from "../enrichment/index.js";
import {
  formatNumber,
  formatPower,
  parseNumericInput,
  provenanceLabel,
} from "./format.js";
import { PROVENANCE, SAMPLE_6KW_ID } from "./constants.js";
import { createWorkbench } from "./architecture-app.js";

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

function approx(actual, expected, eps, label) {
  assert.ok(
    Math.abs(actual - expected) <= eps,
    `${label}: expected ${expected} ± ${eps}, got ${actual}`
  );
}

test("empty project uses null for unknown values, not 0", () => {
  const p = createEmptyProject();
  assert.equal(p.generation.pv, null);
  assert.equal(p.bess.powerMW, null);
  assert.equal(p.bess.energyMWh, null);
  assert.equal(p.loads.profile.peakLoadMW, null);
  assert.equal(p.economics.btcPerKWh, null);
  assert.equal(p.sourceTemplateId, null);
  assert.equal(p.started, true);
});

test("start from zero does not auto-load a catalog template", () => {
  const r = startFromZero();
  assert.equal(r.project.sourceTemplateId, null);
  assert.ok(r.project.metadata.name);
});

test("template load clones and does not mutate the catalog", () => {
  const original = architectureTemplates[0];
  const before = JSON.stringify(original);
  const nameBefore = original.name;
  const peakBefore = original.loadProfile.peakLoadMW;
  const r = loadTemplateById(original.id);
  assert.equal(r.ok, true);
  assert.equal(r.project.sourceTemplateId, original.id);
  assert.notEqual(r.project.metadata.id, original.id);
  r.project.metadata.name = "MUTATED IN PROJECT";
  r.project.loads.profile.peakLoadMW = 9999;
  r.project.generation.enabled = !original.generation.enabled;
  assert.equal(original.name, nameBefore);
  assert.equal(original.loadProfile.peakLoadMW, peakBefore);
  assert.equal(JSON.stringify(original), before);
  assert.equal(architectureTemplates[0].name, nameBefore);
});

test("structuredClone path keeps catalog identity", () => {
  const t = architectureTemplates.find((x) => x.bess && x.bess.enabled) || architectureTemplates[0];
  const clone = cloneValue(t);
  clone.bess = { ...clone.bess, powerMW: 1 };
  assert.notEqual(clone, t);
  if (t.bess && t.bess.enabled) {
    assert.notEqual(t.bess.powerMW, 1);
  }
});

test("load template runs calculation and validation immediately", () => {
  const t = architectureTemplates[0];
  const r = loadTemplateById(t.id);
  const derived = recompute(r.project);
  assert.ok(derived.validation);
  assert.equal(typeof derived.validation.qualityScore, "number");
  assert.equal(derived.validation.mutated, false);
});

test("selectors: summary is contextual (no BESS duration if disabled)", () => {
  const r = loadTemplateById(architectureTemplates[0].id);
  r.project.bess.enabled = false;
  const derived = recompute(r.project);
  const cards = getSummary(r.project, derived);
  assert.equal(cards.some((c) => c.id === "bessd"), false);
});

test("load editor: add preset, duplicate, disable, delete", () => {
  let p = createEmptyProject();
  p = addLoadPreset(p, "preset-refrigeration");
  assert.equal(p.loads.items.length, 1);
  assert.equal(p.loads.items[0].name, "Refrigeration");
  const id = p.loads.items[0].id;
  p = duplicateLoad(p, id);
  assert.equal(p.loads.items.length, 2);
  p = setLoadState(p, id, "RUNNING");
  assert.equal(p.loads.items[0].state, "RUNNING");
  p = patchLoad(p, id, { enabled: false });
  assert.equal(p.loads.items[0].enabled, false);
  p = deleteLoad(p, id);
  assert.equal(p.loads.items.length, 1);
});

test("numeric input empty stays null, never 0", () => {
  const empty = parseNumericInput("");
  assert.equal(empty.ok, true);
  assert.equal(empty.value, null);
  const p = createEmptyProject();
  const r = setNumericField(p, "generation.pv.dcMWp", "");
  assert.equal(r.invalid, false);
  assert.equal(r.project.generation.pv.dcMWp, null);
});

test("6 kW sample: 1200 W / 230 V ≈ 5.22 A from the engine", () => {
  const i = calculateResistiveCurrent(1200, 230);
  assert.equal(i.ok, true);
  approx(i.value, 5.217391304347826, 1e-9, "raw current");
  approx(roundTo(i.value, 2), 5.22, 1e-9, "display 5.22 A");
  const sample = createSample6kWProject();
  assert.equal(sample.sourceTemplateId, SAMPLE_6KW_ID);
  assert.match(sample.metadata.name, /6 kW/);
  assert.ok(sample.loads.items.length > 5);
  const heater = sample.loads.items.find((l) => l.id === "heater-1200");
  assert.ok(heater);
  const hi = calculateResistiveCurrent(1200, sample.installation.voltageNominalV);
  approx(roundTo(hi.value, 2), 5.22, 1e-9, "heater current");
});

test("6 kW sample: freezer 400 W × 24 h × 30 × 0.40 = 115.2 kWh/month", () => {
  const e = calculateDutyCycleEnergy({
    powerW: 400,
    hoursPerDay: 24,
    daysPerMonth: 30,
    dutyCycle: 0.4,
  });
  assert.equal(e.ok, true);
  approx(e.value.energyMonthKWh, 115.2, 1e-6, "freezer month kWh");
  const sample = createSample6kWProject();
  const derived = recompute(sample);
  assert.equal(derived.installation.ok, true);
  const freezer = derived.installation.value.energyRows.find((r) => r.loadId === "freezer-storage");
  assert.ok(freezer);
  approx(freezer.calculated.energyMonthKWh, 115.2, 1e-6, "sample freezer from engine");
});

test("BESS duration inconsistency is an ERROR and is not auto-fixed", () => {
  const p = createEmptyProject();
  p.bess = {
    enabled: true,
    powerMW: 25,
    energyMWh: 50,
    durationHours: 4,
    roundTripEfficiency: 0.9,
    usableDoD: 0.9,
    purpose: ["backup"],
  };
  const derived = recompute(p);
  const v = getValidationResults(derived);
  const err = v.errors.find((e) => e.code === "BESS_DURATION");
  assert.ok(err, "expected BESS_DURATION error");
  assert.equal(p.bess.durationHours, 4);
  assert.equal(p.bess.energyMWh, 50);
  approx(derived.validation.derivedValues.bessDurationHours, 2, 1e-9, "derived 2 h");
});

test("specificYield null with site-study provenance is not an ERROR", () => {
  const t = architectureTemplates.find(
    (x) => x.generation?.pv && x.generation.pv.specificYieldKWhPerKWpYear == null
  );
  assert.ok(t, "need a pending-yield template");
  const project = projectFromTemplate(t);
  const prov = getProvenance(project, "generation.pv.specificYieldKWhPerKWpYear");
  assert.equal(prov.code, PROVENANCE.SITE_STUDY);
  assert.equal(provenanceLabel(prov.code), "SITE STUDY");
  const derived = recompute(project);
  const v = getValidationResults(derived);
  assert.equal(v.errors.some((e) => e.code === "YIELD_PENDING"), false);
  assert.ok(
    v.notices.some((n) => n.code === "YIELD_PENDING") ||
      v.notices.some((n) => /site study/i.test(n.message))
  );
});

test("off-grid without generation/diesel/import source is a validation ERROR", () => {
  const p = createEmptyProject();
  p.grid.mode = "off-grid";
  p.grid.importAllowed = false;
  p.generation.enabled = false;
  p.generation.pv = null;
  p.generation.wind = null;
  p.generation.diesel = null;
  p.bess.enabled = true;
  p.bess.powerMW = 2;
  p.bess.energyMWh = 4;
  p.bess.durationHours = 2;
  const derived = recompute(p);
  const v = getValidationResults(derived);
  assert.ok(v.errors.some((e) => e.code === "OFFGRID_NO_SOURCE"));
});

test("BTC display: 346 kWh × 12 sats/kWh = 4152 sats from the economics engine", () => {
  const cost = calculateEnergyCost(346, { mode: "sats", satsPerKWh: 12 });
  assert.equal(cost.ok, true);
  approx(cost.value.cost.monthSats, 4152, 1e-6, "sats");
  const btc = formatBTC(cost.value.cost.monthBTC);
  const sats = formatSats(cost.value.cost.monthSats);
  assert.equal(sats.value, "4152 sats");
  assert.equal(btc.ok, true);
  assert.equal(/e/i.test(btc.value), false);
  const p = createEmptyProject();
  p.loads.editor = "aggregated";
  p.loads.profile.averageLoadMW = 346 / 1000 / 730;
  p.economics.tariffMode = "sats";
  p.economics.satsPerKWh = 12;
  const sample = createSample6kWProject();
  sample.economics.tariffMode = "sats";
  sample.economics.satsPerKWh = 12;
  const derived = recompute(sample);
  const eco = getEconomicResults(sample, derived);
  assert.equal(eco.ok, true);
  assert.notEqual(eco.value.satsMonth, 0);
  assert.ok(eco.value.displayMonthBTC);
  assert.equal(/e/i.test(eco.value.displayMonthBTC), false);
});

test("missing energy does not display 0 BTC", () => {
  const p = createEmptyProject();
  p.economics.tariffMode = "sats";
  p.economics.satsPerKWh = 12;
  const derived = recompute(p);
  const eco = getEconomicResults(p, derived);
  if (!eco.ok) {
    assert.ok(/energy/i.test(eco.message));
    assert.equal(eco.value, null);
  } else {
    assert.notEqual(eco.value.btcMonth, 0);
  }
});

test("graph includes only configured blocks", () => {
  const empty = buildArchitectureGraph(createEmptyProject(), recompute(createEmptyProject()));
  assert.equal(empty.nodes.some((n) => n.type === "PV"), false);
  assert.equal(empty.nodes.some((n) => n.type === "BESS"), false);
  const t = architectureTemplates.find((x) => x.generation?.pv && x.bess?.enabled && x.substation?.enabled);
  const project = projectFromTemplate(t);
  const g = buildArchitectureGraph(project, recompute(project));
  assert.ok(g.nodes.some((n) => n.type === "PV"));
  assert.ok(g.nodes.some((n) => n.type === "BESS"));
  assert.ok(g.nodes.some((n) => n.type === "TRANSFORMER"));
  assert.ok(g.nodes.every((n) => n.id && n.type && n.label != null));
  assert.ok(g.edges.every((e) => e.source && e.target));
});

test("unit formatting never shows NaN or Infinity", () => {
  assert.equal(formatNumber(Number.NaN), "—");
  assert.equal(formatNumber(Infinity), "—");
  assert.equal(formatNumber(null), "—");
  assert.equal(formatPower(25, "MW"), "25 MW");
  assert.equal(formatPower(0.006, "MW"), "6 kW");
});

test("template explorer AND filters and featured gate", () => {
  const omanPumpBess = filterTemplates({
    ...emptyFilters(),
    country: "OMN",
    application: "water-pumping",
    bess: "yes",
  });
  for (const t of omanPumpBess) {
    assert.equal(t.country, "OMN");
    assert.equal(t.application, "water-pumping");
    assert.equal(t.bess.enabled, true);
  }
  const featured = featuredArchitectures(8);
  assert.ok(featured.length >= 1);
  assert.ok(featured.length <= 8);
  for (const t of featured) {
    const card = templateCardModel(t);
    assert.equal(card.valid, true);
    assert.equal(card.highWarnings, 0);
  }
});

test("search looks at name, country, region, application, description", () => {
  const q = filterTemplates({ ...emptyFilters(), search: "oman" });
  assert.ok(q.length >= 1);
  assert.ok(q.every((t) => /oman/i.test(`${t.name} ${t.country} ${t.countryName} ${t.region} ${t.application} ${t.description}`)));
});

test("duplicate project gets a new id and does not alias state", () => {
  const r = loadTemplateById(architectureTemplates[0].id);
  const d = duplicateProject(r.project);
  assert.notEqual(d.project.metadata.id, r.project.metadata.id);
  d.project.metadata.name = "COPY";
  assert.notEqual(r.project.metadata.name, "COPY");
});

test("projectToTemplate is a snapshot, not the catalog object", () => {
  const t = architectureTemplates[0];
  const project = projectFromTemplate(t);
  const back = projectToTemplate(project);
  back.name = "CHANGED";
  assert.notEqual(t.name, "CHANGED");
});

test("user field edits are provenance USER", () => {
  const p = setField(createEmptyProject(), "metadata.name", "Mine", PROVENANCE.USER);
  assert.equal(p.provenance["metadata.name"], "user-input");
});

test("workbench store startFromZero + load template", () => {
  const wb = createWorkbench();
  wb.startZero();
  assert.equal(wb.started, true);
  assert.equal(wb.project.sourceTemplateId, null);
  wb._applyTemplate(architectureTemplates[0].id, "new");
  assert.equal(wb.project.sourceTemplateId, architectureTemplates[0].id);
  assert.ok(wb.validation);
});

test("atlas explorer filters by batch_id, coverage, conflictos, stale", () => {
  clearEnrichments();
  const sample = architectureTemplates[1];
  putEnrichment({
    architecture_id: sample.id,
    template_id: sample.id,
    enrichment_status: ENRICHMENT_STATUS.PARTIAL,
    fields: [],
    conflicts: [{ id: "c1", field: "frequencyHz", resolution: "unresolved" }],
    warnings: [],
    evidence_coverage: 0.4,
    batch_id: "lote-test",
  });
  const byBatch = filterTemplates({ ...emptyFilters(), batch_id: "lote-test" });
  assert.equal(byBatch.length, 1);
  assert.equal(byBatch[0].id, sample.id);
  const low = filterTemplates({ ...emptyFilters(), coverage: "low" });
  assert.ok(low.some((t) => t.id === sample.id));
  const conflicts = filterTemplates({ ...emptyFilters(), conflicts: "yes" });
  assert.ok(conflicts.some((t) => t.id === sample.id));
  clearEnrichments();
});

test("N-1 graph redundancy payload distinguishes MW and MVA", () => {
  const t = architectureTemplates.find(
    (x) => x.substation?.redundancyMode === "N-1" && x.substation.enabled
  );
  const project = projectFromTemplate(t);
  const derived = recompute(project);
  const g = buildArchitectureGraph(project, derived);
  assert.ok(g.redundancy);
  if (g.redundancy.normalMW != null && g.redundancy.normalMVA != null) {
    assert.notEqual(g.redundancy.normalMW, g.redundancy.normalMVA);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
