/**
 * Performance smoke for v1. Annotates timings; fails only on frozen UI-class budgets.
 *   node js/architecture/v1/perf.test.js
 */

import assert from "node:assert/strict";
import { architectureTemplates } from "../templates.js";
import { projectFromTemplate, createSample6kWProject } from "../ui/state.js";
import { createProjectDocument } from "../storage/index.js";
import { generateEngineeringReport, renderEngineeringReportPdf } from "../report/index.js";
import { evaluateGeospatial } from "../geo/index.js";
import { createSite } from "../geo/site-model.js";
import { buildComparison, ENTITY_KINDS } from "../compare/index.js";
import { filterTemplates, emptyFilters, paginate } from "../ui/template-explorer.js";

let passed = 0;
let failed = 0;
const notes = [];

function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failed += 1;
    console.error(`FAIL  ${name}\n      ${err.message}`);
  }
}

function ms(fn) {
  const t0 = performance.now();
  const value = fn();
  return { ms: performance.now() - t0, value };
}

test("atlas ≥96 filter+paginate stays under 50 ms", () => {
  assert.ok(architectureTemplates.length >= 96);
  const r = ms(() => paginate(filterTemplates(emptyFilters()), 1));
  notes.push(`atlas page ${r.ms.toFixed(1)} ms (n=${architectureTemplates.length})`);
  assert.ok(r.ms < 50, `atlas paginate ${r.ms} ms`);
  assert.ok(r.value.items.length <= 24);
});

test("map evaluation of 40 sites stays under 200 ms", () => {
  const sites = Array.from({ length: 40 }, (_, i) =>
    createSite({ id: `s${i}`, name: `S${i}`, lat: 20 + i * 0.05, lng: 50 + i * 0.05 })
  );
  const geo = { sites, restrictions: [], gridNetwork: null, activeSiteId: sites[0].id };
  const r = ms(() => evaluateGeospatial(geo, projectFromTemplate(architectureTemplates[0])));
  notes.push(`geo 40 sites ${r.ms.toFixed(1)} ms`);
  assert.ok(r.ms < 200, `geo eval ${r.ms} ms`);
  assert.equal(Object.keys(r.value.evaluations).length, 40);
});

test("PDF fixture render stays under 2500 ms", () => {
  const doc = createProjectDocument(createSample6kWProject());
  const model = generateEngineeringReport(doc, { reportMode: "standard", language: "es" });
  const r = ms(() => renderEngineeringReportPdf(model, { printedAt: "2026-01-01T00:00:00.000Z" }));
  notes.push(`pdf ${r.ms.toFixed(1)} ms bytes=${r.value.bytes?.length || 0}`);
  assert.equal(r.value.ok, true);
  assert.ok(r.ms < 2500, `pdf ${r.ms} ms`);
});

test("3-way comparison mapping stays under 80 ms", () => {
  const ids = architectureTemplates.slice(0, 3).map((t) => t.id);
  const r = ms(() =>
    buildComparison(ids.map((id) => ({ kind: ENTITY_KINDS.TEMPLATE, id })))
  );
  notes.push(`compare 3-way ${r.ms.toFixed(1)} ms`);
  assert.equal(r.value.ok, true);
  assert.ok(r.ms < 80, `compare ${r.ms} ms`);
});

console.log(notes.map((n) => `  perf  ${n}`).join("\n"));
console.log(`\nV1 perf: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
