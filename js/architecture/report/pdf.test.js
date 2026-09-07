/**
 * Native PDF renderer tests.
 *   node js/architecture/report/pdf.test.js
 *
 * Golden: same Report Model → same table values in print-model and PDF text.
 * To regenerate: run this file; it rebuilds from createSample6kWProject + generateEngineeringReport.
 */

import assert from "node:assert/strict";
import { createSample6kWProject, createEmptyProject, projectFromTemplate } from "../ui/state.js";
import { architectureTemplates } from "../templates.js";
import { createProjectDocument, addSnapshot } from "../storage/index.js";
import {
  generateEngineeringReport,
  buildPrintModel,
  renderEngineeringReportPdf,
  extractPdfText,
  DATO_NO_DISPONIBLE,
  contentHash,
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

function fixtureModel() {
  const wb = createSample6kWProject();
  return generateEngineeringReport(wb, {
    reportMode: "detailed",
    includeProvenance: true,
    includeSacredView: true,
    includeValidation: true,
    includeSite: true,
    includeVerifiedSources: true,
    language: "es",
    snapshotId: "snap-golden-0001",
    snapshotMeta: { snapshotId: "snap-golden-0001" },
  });
}

test("print-model does not invent values for unknown cells", () => {
  const model = fixtureModel();
  const pm = buildPrintModel(model, { printedAt: "2026-09-07T00:00:00.000Z" });
  const blob = JSON.stringify(pm);
  assert.match(blob, new RegExp(DATO_NO_DISPONIBLE));
  for (const sec of pm.sections) {
    for (const tbl of sec.tables || []) {
      for (const row of tbl.rows || []) {
        for (const cell of row) {
          assert.notEqual(cell, "—");
          assert.notEqual(String(cell).toLowerCase(), "not available");
        }
      }
    }
  }
});

test("PDF tables match Report Model electrical figures", () => {
  const model = fixtureModel();
  const pm = buildPrintModel(model, { printedAt: null });
  const electrical = model.electricalSummary || [];
  assert.ok(electrical.length >= 1);
  for (const row of electrical) {
    const mapped = pm.electricalSummary.find((r) => r.label === row.label);
    assert.ok(mapped, `missing ${row.label}`);
    if (row.value == null || row.value === "—") {
      assert.equal(mapped.value, DATO_NO_DISPONIBLE);
    } else {
      assert.equal(mapped.value, String(row.value));
    }
  }
  const pdf = renderEngineeringReportPdf(model, { printedAt: null, printModel: pm });
  assert.equal(pdf.ok, true);
  const text = extractPdfText(pdf.bytes);
  for (const row of electrical) {
    if (row.value && row.value !== "—") {
      const token = String(row.value).split(/\s+/)[0];
      if (/\d/.test(token)) assert.ok(text.includes(token), `PDF missing ${token} for ${row.label}`);
    }
  }
});

test("warnings from the Report Model appear in the PDF", () => {
  const wb = createSample6kWProject();
  const model = generateEngineeringReport(wb, { reportMode: "detailed", language: "es", snapshotId: "s1", snapshotMeta: { snapshotId: "s1" } });
  model.validationSummary.highWarnings = [{ message: "GOLDEN-WARNING-XYZ", warningLevel: "HIGH" }];
  model.hasErrors = true;
  const pdf = renderEngineeringReportPdf(model, { printedAt: null });
  const text = extractPdfText(pdf.bytes);
  assert.match(text, /GOLDEN-WARNING-XYZ/);
  assert.match(text, /ERRORES DE VALIDACIÓN/);
});

test("unknown specific yield prints Dato no disponible, not an estimate", () => {
  const t = architectureTemplates.find((x) => x.generation?.pv);
  const wb = projectFromTemplate(t);
  wb.generation.pv.specificYieldKWhPerKWpYear = null;
  const model = generateEngineeringReport(wb, {
    reportMode: "detailed",
    language: "es",
    snapshotId: "s-yield",
    snapshotMeta: { snapshotId: "s-yield" },
  });
  const pdf = renderEngineeringReportPdf(model, { printedAt: null });
  const text = extractPdfText(pdf.bytes);
  assert.match(text, new RegExp(DATO_NO_DISPONIBLE));
  assert.equal(/specific yield[\s\S]{0,40}\d{3,4}\s*kWh\/kWp/i.test(text), false);
});

test("same snapshot yields the same content hash (print timestamp excluded)", () => {
  const model = fixtureModel();
  const a = buildPrintModel(model, { printedAt: "2026-01-01T00:00:00.000Z" });
  const b = buildPrintModel(model, { printedAt: "2026-12-31T23:59:59.000Z" });
  assert.equal(a.contentHash, b.contentHash);
  const pa = renderEngineeringReportPdf(model, { printedAt: "2026-01-01T00:00:00.000Z" });
  const pb = renderEngineeringReportPdf(model, { printedAt: "2026-01-01T00:00:00.000Z" });
  assert.equal(Buffer.from(pa.bytes).toString("binary"), Buffer.from(pb.bytes).toString("binary"));
  void contentHash;
});

test("PDF from project snapshot does not change report figures", () => {
  const wb = createSample6kWProject();
  const doc = createProjectDocument(wb);
  const snap = addSnapshot(doc, { name: "PDF", note: "pdf-render" });
  snap.document.lastPdfSnapshotId = snap.snapshot.snapshotId;
  const modelA = generateEngineeringReport(snap.document, {
    reportMode: "detailed",
    language: "es",
    snapshotId: snap.snapshot.snapshotId,
    snapshotMeta: { snapshotId: snap.snapshot.snapshotId },
  });
  const frozen = {
    ...snap.document,
    architecture: snap.snapshot.payload.architecture,
    scenarios: snap.snapshot.payload.scenarios,
    activeScenarioId: snap.snapshot.payload.activeScenarioId,
  };
  const modelB = generateEngineeringReport(frozen, {
    reportMode: "detailed",
    language: "es",
    snapshotId: snap.snapshot.snapshotId,
    snapshotMeta: { snapshotId: snap.snapshot.snapshotId },
  });
  assert.equal(JSON.stringify(modelA.electricalSummary), JSON.stringify(modelB.electricalSummary));
  const pdfA = renderEngineeringReportPdf(modelA, { printedAt: "t0" });
  const pdfB = renderEngineeringReportPdf(modelB, { printedAt: "t0" });
  assert.equal(pdfA.printModel.contentHash, pdfB.printModel.contentHash);
});

test("filename is stable and Spanish cover is present", () => {
  const model = fixtureModel();
  const pdf = renderEngineeringReportPdf(model, { printedAt: null });
  assert.match(pdf.filename, /\.pdf$/);
  assert.match(pdf.filename, /snap-gol/);
  const text = extractPdfText(pdf.bytes);
  assert.match(text, /ARQUITECTURA SAGRADA/);
  assert.match(text, /Informe técnico/);
  assert.match(text, /Snapshot/);
  assert.ok(pdf.bytes[0] === 0x25 && pdf.bytes[1] === 0x50); // %P
});

test("empty project PDF still builds", () => {
  const model = generateEngineeringReport(createEmptyProject(), { reportMode: "summary", language: "es" });
  const pdf = renderEngineeringReportPdf(model, { printedAt: null });
  assert.equal(pdf.ok, true);
  assert.ok(pdf.bytes.length > 200);
});

console.log(`\nPDF tests: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
