/**
 * Comparison workbench tests.
 *   node js/architecture/compare/compare.test.js
 */

import assert from "node:assert/strict";
import { architectureTemplates } from "../templates.js";
import { projectFromTemplate, createSample6kWProject } from "../ui/state.js";
import { createProjectDocument, addSnapshot } from "../storage/index.js";
import { extractPdfText, renderPrintModelPdf } from "../report/index.js";
import {
  NA,
  NOT_COMPARABLE,
  buildComparison,
  numericDelta,
  comparisonToCsv,
  comparisonPrintModel,
  saveComparison,
  getComparison,
  projectEntity,
  formatViewValue,
  ENTITY_KINDS,
} from "./index.js";

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

const tA = architectureTemplates.find((t) => t.generation?.pv?.dcMWp != null);
const tB = architectureTemplates.find((t) => t.id !== tA.id && t.generation?.pv?.dcMWp != null && t.generation.pv.dcMWp !== tA.generation.pv.dcMWp);
const tC = architectureTemplates.find((t) => t.id !== tA.id && t.id !== tB.id && t.bess?.enabled);

test("A vs B numeric delta matches stored fields", () => {
  const table = buildComparison([
    { kind: ENTITY_KINDS.TEMPLATE, id: tA.id },
    { kind: ENTITY_KINDS.TEMPLATE, id: tB.id },
  ]);
  assert.equal(table.ok, true);
  const row = table.rows.find((r) => r.id === "pvDcMWp");
  assert.ok(row);
  const a = tA.generation.pv.dcMWp;
  const b = tB.generation.pv.dcMWp;
  assert.equal(row.values[0], a);
  assert.equal(row.values[1], b);
  const d = numericDelta(a, b);
  assert.equal(row.deltas[0].abs, d.abs);
  assert.equal(row.deltas[0].na, false);
});

test("missing field is N/A not 0", () => {
  const noBess = architectureTemplates.find((t) => t.bess?.enabled !== true && t.generation?.pv);
  const table = buildComparison([
    { kind: ENTITY_KINDS.TEMPLATE, id: tA.id },
    { kind: ENTITY_KINDS.TEMPLATE, id: noBess.id },
  ]);
  const energy = table.rows.find((r) => r.id === "bessEnergyMWh");
  const slot = noBess.bess?.energyMWh == null;
  if (slot) {
    assert.equal(energy.values[1], NA);
    assert.notEqual(energy.values[1], 0);
    assert.equal(energy.deltas[0].na, true);
  }
  const yieldRow = table.rows.find((r) => r.id === "specificYield");
  if (tA.generation.pv.specificYieldKWhPerKWpYear == null) {
    assert.equal(yieldRow.values[0], NA);
  }
});

test("three-way comparison has two deltas vs baseline", () => {
  const table = buildComparison([
    { kind: ENTITY_KINDS.TEMPLATE, id: tA.id },
    { kind: ENTITY_KINDS.TEMPLATE, id: tB.id },
    { kind: ENTITY_KINDS.TEMPLATE, id: tC.id },
  ]);
  assert.equal(table.ok, true);
  assert.equal(table.views.length, 3);
  for (const row of table.rows) {
    assert.equal(row.values.length, 3);
    assert.equal(row.deltas.length, 2);
  }
});

test("saved comparison reopens with the same slots", () => {
  const doc = createProjectDocument(createSample6kWProject());
  const { document, comparison } = saveComparison(doc, {
    name: "A vs B",
    thresholdPct: 8,
    slots: [
      { kind: ENTITY_KINDS.TEMPLATE, id: tA.id },
      { kind: ENTITY_KINDS.TEMPLATE, id: tB.id },
    ],
  });
  const loaded = getComparison(document, comparison.id);
  assert.ok(loaded);
  assert.equal(loaded.thresholdPct, 8);
  assert.equal(loaded.slots.length, 2);
  const table = buildComparison(loaded.slots);
  assert.equal(table.ok, true);
  assert.equal(table.thresholdPct, 5);
  const table2 = buildComparison(loaded.slots, {}, { thresholdPct: loaded.thresholdPct });
  assert.equal(table2.thresholdPct, 8);
});

test("CSV and PDF reuse table figures — no new numbers", () => {
  const table = buildComparison([
    { kind: ENTITY_KINDS.TEMPLATE, id: tA.id },
    { kind: ENTITY_KINDS.TEMPLATE, id: tB.id },
  ]);
  const csv = comparisonToCsv(table);
  const dc = table.rows.find((r) => r.id === "pvDcMWp");
  assert.match(csv, new RegExp(String(dc.values[0])));
  assert.match(csv, new RegExp(String(dc.values[1])));
  const print = comparisonPrintModel(table, { name: "Test compare", comparisonId: "cmp-1" });
  const pdf = renderPrintModelPdf(print, { filename: "cmp.pdf", printedAt: null });
  assert.equal(pdf.ok, true);
  const text = extractPdfText(pdf.bytes);
  assert.match(text, /no clasifica un ganador/i);
  assert.match(text, new RegExp(String(dc.values[0])));
  assert.match(text, new RegExp(String(dc.values[1])));
  const invented = (text.match(/\b9999\b/) || []).length;
  assert.equal(invented, 0);
});

test("engine mismatch blocks derived-field deltas", () => {
  const table = buildComparison([
    { kind: ENTITY_KINDS.TEMPLATE, id: tA.id, engineVersion: "1.0.0" },
    { kind: ENTITY_KINDS.TEMPLATE, id: tB.id, engineVersion: "9.9.9" },
  ]);
  assert.equal(table.engineMismatch, true);
  const annual = table.rows.find((r) => r.id === "annualEnergyMWh");
  assert.equal(annual.engineBlocked, true);
  assert.equal(annual.deltas[0].blocked, true);
  const stored = table.rows.find((r) => r.id === "pvDcMWp");
  assert.equal(stored.engineBlocked, false);
  assert.ok(table.warnings.some((w) => w.code === "ENGINE_MISMATCH"));
});

test("snapshot entity projects stored architecture", () => {
  const wb = projectFromTemplate(tA);
  const doc = createProjectDocument(wb);
  const { snapshot } = addSnapshot(doc, { name: "snap-a" });
  const view = projectEntity(
    { kind: ENTITY_KINDS.SNAPSHOT, id: snapshot.snapshotId, snapshotId: snapshot.snapshotId, snapshot },
    { projectDocument: doc }
  );
  assert.equal(view.ok, true);
  assert.equal(view.values.pvDcMWp.value, tA.generation.pv.dcMWp);
});

test("user formula is stored and printed, never evaluated", () => {
  const doc = createProjectDocument(createSample6kWProject());
  const { document, comparison } = saveComparison(doc, {
    name: "A vs B",
    userFormula: "(pvA - pvB) / peakA",
    slots: [
      { kind: ENTITY_KINDS.TEMPLATE, id: tA.id },
      { kind: ENTITY_KINDS.TEMPLATE, id: tB.id },
    ],
  });
  assert.equal(getComparison(document, comparison.id).userFormula, "(pvA - pvB) / peakA");
  const table = buildComparison(comparison.slots);
  const print = comparisonPrintModel(table, { userFormula: comparison.userFormula });
  assert.match(print.sections[0].paragraphs.join(" "), /no evaluada/);
  assert.match(print.sections[0].paragraphs.join(" "), /pvA - pvB/);
  assert.equal(table.rows.some((r) => r.id === "winner" || r.id === "qualityScore"), false);
});

test("NOT_COMPARABLE list excludes ranking and live BTC", () => {
  assert.ok(NOT_COMPARABLE.includes("winner"));
  assert.ok(NOT_COMPARABLE.includes("qualityScore"));
  assert.ok(NOT_COMPARABLE.includes("liveBtcPrice"));
});

test("project maps loads.profile.peakLoadMW; missing site is N/A not 0", () => {
  const wb = projectFromTemplate(tA);
  const view = projectEntity({ kind: ENTITY_KINDS.PROJECT, id: wb.metadata.id, project: wb });
  assert.equal(view.ok, true);
  assert.equal(view.values.peakLoadMW.value, tA.loadProfile.peakLoadMW);
  assert.equal(view.values.pvDcMWp.value, tA.generation.pv.dcMWp);
  assert.equal(view.values.proximityKm.na, true);
  assert.equal(formatViewValue(view.values.proximityKm), NA);
  assert.notEqual(formatViewValue(view.values.proximityKm), 0);
});

test("site slot reads stored proximity; architecture fields stay mapped", () => {
  const wb = projectFromTemplate(tA);
  wb.geospatial = {
    sites: [{ id: "s1", name: "Sitio A", lat: 25.1, lng: 55.2, restrictions: [{ id: "r1" }] }],
    activeSiteId: "s1",
  };
  const view = projectEntity(
    { kind: ENTITY_KINDS.SITE, id: "s1", siteId: "s1", project: wb },
    {
      siteEvaluations: {
        s1: { proximity: { distancia_km: 12.5, clase: "cercana" }, restrictions: [{ id: "r1" }] },
      },
    }
  );
  assert.equal(view.ok, true);
  assert.equal(view.values.proximityKm.value, 12.5);
  assert.equal(view.values.proximityClass.value, "cercana");
  assert.equal(view.values.restrictionCount.value, 1);
  assert.equal(view.values.pvDcMWp.value, tA.generation.pv.dcMWp);
});

test("mixed template + project share the comparison-view", () => {
  const wb = projectFromTemplate(tB);
  const table = buildComparison(
    [
      { kind: ENTITY_KINDS.TEMPLATE, id: tA.id },
      { kind: ENTITY_KINDS.PROJECT, id: wb.metadata.id, project: wb },
    ],
    {}
  );
  assert.equal(table.ok, true);
  const peak = table.rows.find((r) => r.id === "peakLoadMW");
  assert.equal(peak.values[0], tA.loadProfile.peakLoadMW);
  assert.equal(peak.values[1], tB.loadProfile.peakLoadMW);
});

console.log(`\nComparison tests: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
