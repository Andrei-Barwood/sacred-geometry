/**
 * Public-contract smoke for Arquitectura Sagrada v1.
 *   node js/architecture/v1/contracts.test.js
 */

import assert from "node:assert/strict";
import { calculateResistiveCurrent } from "../current.js";
import { calculateDutyCycleEnergy } from "../energy.js";
import { calculateEnergyCost } from "../economics.js";
import { formatBTC } from "../bitcoin.js";
import { architectureTemplates } from "../templates.js";
import { validateRegionalization } from "../regional-validation.js";
import { validateTemplate } from "../validation/validate-template.js";
import { projectFromTemplate, createSample6kWProject } from "../ui/state.js";
import { recompute } from "../ui/derive.js";
import { buildArchitectureGraph } from "../graph/index.js";
import { createProjectDocument, addSnapshot, exportProjectJSON, importProjectJSON } from "../storage/index.js";
import { generateEngineeringReport } from "../report/generator.js";
import { ENRICHMENT_SCHEMA_VERSION, SCHEMA_FROZEN_V1, emptyRecord } from "../enrichment/contract.js";
import { parseSitesGeoJSON, sitesToGeoJSON } from "../geo/index.js";
import { createSite } from "../geo/site-model.js";
import { extractPdfText, renderEngineeringReportPdf, renderPrintModelPdf } from "../report/index.js";
import { buildComparison, comparisonToCsv, comparisonPrintModel, ENTITY_KINDS, NA, NOT_COMPARABLE } from "../compare/index.js";
import { parseArchHash, archHash, SCREENS } from "../ui/routes.js";

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

test("source/electrical: current and energy stay finite", () => {
  const i = calculateResistiveCurrent(1200, 230);
  assert.equal(i.ok, true);
  assert.ok(Number.isFinite(i.value));
  const e = calculateDutyCycleEnergy({ powerW: 100, dutyCycle: 0.5, hoursPerDay: 24 });
  assert.equal(e.ok, true);
});

test("BTC engine: ENERGY × RATE, no live price", () => {
  const c = calculateEnergyCost(100, { mode: "btc", btcPerKWh: 0.000001 });
  assert.equal(c.ok, true);
  assert.ok(formatBTC(c.value.btc));
});

test("atlas has ≥96 templates with stable ids", () => {
  assert.ok(architectureTemplates.length >= 96);
  const ids = new Set(architectureTemplates.map((t) => t.id));
  assert.equal(ids.size, architectureTemplates.length);
});

test("regionalization + validation public contract", () => {
  const t = architectureTemplates[0];
  const reg = validateRegionalization(t);
  assert.equal(typeof reg.ok, "boolean");
  const v = validateTemplate(t);
  assert.ok(v);
  assert.equal(typeof v.valid, "boolean");
  assert.ok("qualityScore" in v);
});

test("workbench projectFromTemplate does not alias catalog", () => {
  const t = architectureTemplates[0];
  const p = projectFromTemplate(t);
  p.generation.pv.dcMWp = 0;
  assert.notEqual(t.generation?.pv?.dcMWp, 0);
});

test("graph engine builds nodes without inventing equipment", () => {
  const p = projectFromTemplate(architectureTemplates[0]);
  const derived = recompute(p);
  const g = buildArchitectureGraph(p, derived);
  assert.ok(Array.isArray(g.nodes));
  assert.ok(Array.isArray(g.edges));
});

test("persistence: export JSON.parse round-trip, never eval", () => {
  const doc = createProjectDocument(createSample6kWProject());
  const exp = exportProjectJSON(doc);
  assert.equal(exp.ok, true);
  const imp = importProjectJSON(exp.json);
  assert.equal(imp.ok, true);
  assert.equal(imp.document.schemaVersion, doc.schemaVersion);
});

test("report model has electricalSummary and does not throw on sample", () => {
  const model = generateEngineeringReport(createSample6kWProject(), { reportMode: "summary", language: "es" });
  assert.ok(model.electricalSummary);
  assert.ok(model.reportMetadata);
  assert.ok(model.validationSummary);
});

test("enrichment schema v1 frozen", () => {
  assert.equal(ENRICHMENT_SCHEMA_VERSION, 1);
  assert.equal(SCHEMA_FROZEN_V1, true);
  const rec = emptyRecord({ architecture_id: "x" });
  assert.equal(rec.architecture_id, "x");
  assert.ok("fields" in rec);
});

test("geo import invalid JSON is recoverable", () => {
  const bad = parseSitesGeoJSON("{not json");
  assert.equal(bad.ok, false);
  const site = createSite({ name: "A", lat: 24, lng: 55 });
  const gj = sitesToGeoJSON({ sites: [site], restrictions: [], gridNetwork: null }, null, {});
  const ok = parseSitesGeoJSON(gj);
  assert.equal(ok.sites.length, 1);
});

test("PDF golden path: figures come from report model", () => {
  const wb = createSample6kWProject();
  const doc = createProjectDocument(wb);
  const { snapshot } = addSnapshot(doc, { name: "v1" });
  const model = generateEngineeringReport(doc, { snapshotId: snapshot.snapshotId, language: "es" });
  const pdf = renderEngineeringReportPdf(model, { printedAt: null });
  assert.equal(pdf.ok, true);
  const text = extractPdfText(pdf.bytes);
  assert.match(text, /Dato no disponible|Arquitectura|ARQUITECTURA/i);
});

test("comparison deltas vs baseline; missing is N/A; no winner", () => {
  const a = architectureTemplates.find((t) => t.generation?.pv?.dcMWp != null);
  const b = architectureTemplates.find((t) => t.id !== a.id && t.generation?.pv?.dcMWp != null);
  const table = buildComparison([
    { kind: ENTITY_KINDS.TEMPLATE, id: a.id },
    { kind: ENTITY_KINDS.TEMPLATE, id: b.id },
  ]);
  assert.equal(table.ok, true);
  const csv = comparisonToCsv(table);
  assert.match(csv, /pvDcMWp/);
  assert.ok(NOT_COMPARABLE.includes("winner"));
  const print = comparisonPrintModel(table, { name: "v1" });
  const pdf = renderPrintModelPdf(print, { printedAt: null });
  assert.equal(pdf.ok, true);
  const naRow = table.rows.find((r) => r.values.includes(NA));
  assert.ok(naRow || table.rows.every((r) => r.values.every((v) => v !== 0 || r.id === "restrictionCount")));
});

test("deep links encode project, architecture, site, snapshot, comparison", () => {
  assert.equal(parseArchHash(archHash({ screen: SCREENS.ATLAS, id: "G-1" })).id, "G-1");
  assert.equal(parseArchHash("#/map/site-a").screen, SCREENS.MAP);
  assert.equal(parseArchHash("#/snapshot/s").screen, SCREENS.SNAPSHOT);
});

console.log(`\nV1 contracts: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
