/**
 * Engineering report engine tests.
 *   node js/architecture/report/report-engine.test.js
 */

import assert from "node:assert/strict";
import { createEmptyProject, createSample6kWProject, projectFromTemplate } from "../ui/state.js";
import { architectureTemplates } from "../templates.js";
import { calculateDutyCycleEnergy } from "../energy.js";
import { calculateResistiveCurrent } from "../current.js";
import { calculateEnergyCost } from "../economics.js";
import { createProjectDocument, addSnapshot, updateDocumentFromWorkbench } from "../storage/index.js";
import { semanticEdgeSet, semanticNodeSet, buildArchitectureGraph } from "../graph/index.js";
import { recompute } from "../ui/derive.js";
import {
  generateEngineeringReport,
  generateRevisionComparisonReport,
  renderEngineeringReportHTML,
  exportEngineeringReportHTML,
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

function utilityWb() {
  const t = architectureTemplates.find((x) => x.generation?.pv && x.bess?.enabled && x.substation?.enabled);
  const wb = t ? projectFromTemplate(t) : createEmptyProject();
  wb.generation.enabled = true;
  wb.generation.technologies = ["pv"];
  wb.generation.pv = { ...(wb.generation.pv || {}), dcMWp: 25, acMW: 20, specificYieldKWhPerKWpYear: null, resourceProvenance: "future-site-study" };
  wb.bess = { enabled: true, powerMW: 25, energyMWh: 100, durationHours: 4, roundTripEfficiency: 0.9, usableDoD: 0.9, purpose: ["grid-forming"] };
  wb.substation = { ...(wb.substation || {}), enabled: true, primaryKV: 33, secondaryKV: 11, tertiaryKV: null, transformerMVA: 20, transformerCount: 2, powerFactor: 0.92, redundancyMode: "N-1" };
  wb.grid = { ...(wb.grid || {}), mode: "islandable", strength: "weak" };
  wb.loads.profile.peakLoadMW = 8.2;
  wb.feeders = [{ name: "F1", voltageKV: 11, lengthKM: 4, estimatedLoadMW: 3, role: "load" }];
  return wb;
}

test("does not mutate project", () => {
  const wb = createSample6kWProject();
  const before = JSON.stringify(wb);
  generateEngineeringReport(wb, { reportMode: "standard" });
  assert.equal(JSON.stringify(wb), before);
});

test("empty project does not crash", () => {
  const r = generateEngineeringReport(createEmptyProject(), { reportMode: "summary" });
  assert.ok(r.reportMetadata.reportId);
  assert.equal(r.reportMetadata.status, "draft");
  assert.match(r.executiveSummary || "", /conceptual/i);
});

test("section numbering skips omitted BESS/economics/site", () => {
  const wb = createEmptyProject();
  wb.bess.enabled = false;
  wb.economics.tariffMode = null;
  wb.economics.btcPerKWh = null;
  wb.site.environment = null;
  const r = generateEngineeringReport(wb, { reportMode: "standard", includeEconomics: true, includeSite: true });
  const ids = r.sections.filter((s) => s.included !== false && s.number).map((s) => s.id);
  assert.equal(ids.includes("storage"), false);
  assert.equal(ids.includes("economics"), false);
  const nums = r.sections.filter((s) => s.number).map((s) => s.number);
  const sorted = nums.slice().sort((a, b) => a - b);
  assert.deepEqual(nums, sorted);
  assert.equal(new Set(nums).size, nums.length);
});

test("6 kW report distinguishes kW from kWh and uses engine energy/current", () => {
  const wb = createSample6kWProject();
  const r = generateEngineeringReport(wb, { reportMode: "detailed" });
  const html = renderEngineeringReportHTML(r);
  assert.equal(/6 kW\/month/.test(html), false);
  assert.equal(/6 kWh installed/.test(html), false);
  const freezer = calculateDutyCycleEnergy({ powerW: 400, hoursPerDay: 24, daysPerMonth: 30, dutyCycle: 0.4 });
  assert.ok(Math.abs(freezer.value.energyMonthKWh - 115.2) < 1e-6);
  const loadTable = r.sections.find((s) => s.id === "loads");
  const freezeRow = (loadTable.tables || []).flatMap((t) => t.rows).find((row) => /freezer/i.test(String(row[0])));
  assert.ok(freezeRow, "freezer row");
  assert.match(String(freezeRow.join(" ")), /115/);
  const i = calculateResistiveCurrent(1200, 230);
  assert.ok(Math.abs(i.value - 5.217) < 0.01);
  const heater = (loadTable.tables || []).flatMap((t) => t.rows).find((row) => /heater 1|1200/i.test(String(row[0])));
  if (heater) assert.match(String(heater.join(" ")), /5\.22/);
});

test("utility PV/BESS/transformer units preserved", () => {
  const r = generateEngineeringReport(utilityWb(), { reportMode: "detailed", includeSacredView: true });
  const html = renderEngineeringReportHTML(r);
  assert.match(html, /25/);
  assert.match(html, /MWp/);
  assert.match(html, /100/);
  assert.match(html, /MWh/);
  assert.match(html, /33/);
  assert.match(html, /11/);
  const bess = r.sections.find((s) => s.id === "storage");
  const blob = JSON.stringify(bess);
  assert.match(blob, /25/);
  assert.match(blob, /100/);
  assert.equal(/100 MW[^h]/.test(blob.replace(/100 MWh/g, "")), false);
});

test("invalid BESS duration is reported, not auto-fixed", () => {
  const wb = utilityWb();
  wb.bess.energyMWh = 50;
  wb.bess.durationHours = 4;
  const r = generateEngineeringReport(wb, { reportMode: "standard" });
  const bess = r.sections.find((s) => s.id === "storage");
  const text = JSON.stringify(bess);
  assert.match(text, /4/);
  assert.match(text, /2/);
  assert.match(text, /ERROR/);
  assert.equal(wb.bess.durationHours, 4);
  assert.ok(r.hasErrors);
});

test("BTC 346 kWh × 12 sats from economics engine", () => {
  const cost = calculateEnergyCost(346, { mode: "sats", satsPerKWh: 12 });
  assert.equal(cost.value.cost.monthSats, 4152);
  const wb = createSample6kWProject();
  wb.economics.tariffMode = "sats";
  wb.economics.satsPerKWh = 12;
  const r = generateEngineeringReport(wb, { reportMode: "standard", includeEconomics: true });
  const eco = r.sections.find((s) => s.id === "economics");
  assert.ok(eco && eco.included);
  const html = renderEngineeringReportHTML(r);
  assert.match(html, /sats/i);
  assert.equal(/0 BTC/.test(html) && !wb.economics.satsPerKWh, false);
});

test("null tariff omits economics and does not show 0 BTC", () => {
  const wb = utilityWb();
  wb.economics = { tariffMode: null, btcPerKWh: null, satsPerKWh: null };
  const r = generateEngineeringReport(wb, { includeEconomics: true });
  const eco = r.sections.find((s) => s.id === "economics");
  assert.ok(!eco || eco.included === false);
  const html = renderEngineeringReportHTML(r);
  assert.equal(/0 BTC/.test(html), false);
});

test("pending site study not 0 yield", () => {
  const r = generateEngineeringReport(utilityWb(), { reportMode: "detailed" });
  const gen = r.sections.find((s) => s.id === "generation");
  const blob = JSON.stringify(gen);
  assert.match(blob, /Pending site study/i);
  assert.equal(/0 kWh\/kWp/.test(blob), false);
});

test("SYSTEM/SACRED share semantic graph with workbench builder", () => {
  const wb = utilityWb();
  const r = generateEngineeringReport(wb, { includeSacredView: true, includeSystemView: true });
  const g = buildArchitectureGraph(wb, recompute(wb));
  assert.deepEqual(r.diagrams.semanticNodes, semanticNodeSet(g));
  assert.deepEqual(r.diagrams.semanticEdges, semanticEdgeSet(g));
  assert.ok(r.diagrams.systemSvg.includes("<svg"));
  assert.ok(r.diagrams.sacredSvg.includes("<svg"));
});

test("scenarios do not mix motor-start into normal report", () => {
  const wb = createSample6kWProject();
  wb.scenario.id = "normal";
  const r = generateEngineeringReport(wb, { reportMode: "standard" });
  assert.notEqual(r.reportMetadata.scenarioId, "motor-start");
});

test("HTML escapes XSS", () => {
  const wb = createEmptyProject();
  wb.metadata.name = "<script>alert(1)</script>";
  wb.loads.items = [{ id: "x", name: "<img src=x onerror=alert(1)>", enabled: true, category: "other" }];
  wb.userNotes = "<b>bad</b>";
  const r = generateEngineeringReport(wb, { reportMode: "detailed" });
  const html = renderEngineeringReportHTML(r);
  assert.equal(html.includes("<script>alert(1)</script>"), false);
  assert.match(html, /&lt;script&gt;/);
  assert.equal(html.includes("<img src=x onerror"), false);
});

test("privacy path does not leak in HTML export", () => {
  const wb = createEmptyProject();
  wb.assumptions = ["see /Users/example/private.pdf"];
  const r = generateEngineeringReport(wb, { reportMode: "standard" });
  const exp = exportEngineeringReportHTML(r);
  const html = exp.html || renderEngineeringReportHTML(r);
  assert.equal(/\/Users\/example\/private\.pdf/.test(html), false);
});

test("render does not mutate model", () => {
  const r = generateEngineeringReport(createEmptyProject());
  const before = JSON.stringify(r.sections);
  renderEngineeringReportHTML(r);
  assert.equal(JSON.stringify(r.sections), before);
});

test("revision comparison uses snapshot diff", () => {
  const wb = utilityWb();
  let doc = createProjectDocument(wb);
  const a = addSnapshot(doc, { name: "A" }).snapshot;
  wb.bess.powerMW = 30;
  wb.bess.energyMWh = 120;
  doc = updateDocumentFromWorkbench(doc, wb);
  const b = addSnapshot(doc, { name: "B" }).snapshot;
  const rep = generateRevisionComparisonReport(a, b, { projectName: "Rev" });
  const html = renderEngineeringReportHTML(rep);
  assert.match(html, /25/);
  assert.match(html, /30/);
  assert.match(html, /100/);
  assert.match(html, /120/);
});

test("never emits certified/approved/construction-ready", () => {
  const html = renderEngineeringReportHTML(generateEngineeringReport(utilityWb(), { reportMode: "detailed" }));
  assert.equal(/APPROVED|CERTIFIED|COMPLIANT|CONSTRUCTION READY|Professional Engineer/i.test(html), false);
});

test("weak-grid language is scenario not national", () => {
  const html = renderEngineeringReportHTML(generateEngineeringReport(utilityWb(), { reportMode: "standard" }));
  assert.match(html, /weak-grid connection/i);
  assert.equal(/national grid is weak/i.test(html), false);
});

test("N-1 wording is not compliance", () => {
  const html = renderEngineeringReportHTML(generateEngineeringReport(utilityWb(), { reportMode: "detailed" }));
  assert.equal(/N-1 compliant/i.test(html), false);
});

test("summary/standard/detailed share one model shape", () => {
  const wb = utilityWb();
  const a = generateEngineeringReport(wb, { reportMode: "summary" });
  const b = generateEngineeringReport(wb, { reportMode: "standard" });
  const c = generateEngineeringReport(wb, { reportMode: "detailed" });
  assert.ok(a.reportMetadata && b.sections && c.toc);
  assert.ok(c.sections.filter((s) => s.number).length >= b.sections.filter((s) => s.number).length);
});

test("verified sources section only lists accepted evidence", () => {
  const empty = generateEngineeringReport(createEmptyProject(), { reportMode: "standard" });
  assert.equal((empty.verifiedSources || []).length, 0);
  const verifiedSec = empty.sections.find((s) => s.id === "verifiedSources");
  assert.ok(!verifiedSec || verifiedSec.included === false);
});

test("print CSS present in exported HTML", () => {
  const exp = exportEngineeringReportHTML(generateEngineeringReport(createEmptyProject()));
  assert.equal(exp.ok, true);
  assert.match(exp.html, /@media print/);
  assert.match(exp.filename, /sacred-architecture-.*-report\.html/);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
