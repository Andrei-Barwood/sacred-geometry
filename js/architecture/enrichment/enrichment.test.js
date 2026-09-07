/**
 * Progressive Regional Enrichment — contract + 8-pilot.
 *   node js/architecture/enrichment/enrichment.test.js
 */

import assert from "node:assert/strict";
import { architectureTemplates } from "../templates.js";
import { selectPilotTemplates, PILOT_PREFERRED_IDS } from "../data/pilot.js";
import { createEvidence } from "../data/evidence-model.js";
import { GRANULARITY, CHANGE_CLASS } from "../data/constants.js";
import {
  ENRICHMENT_FORMAT,
  ENRICHMENT_STATUS,
  FIELD_METHOD,
  CONFLICT_RESOLUTION,
  REQUIRED_FIELD_KEYS,
  JOB_STATUS,
  LOCAL_SOURCE_MISSING_WARNING,
  BATCH_COVERAGE_THRESHOLD,
  NEXT_LOTE_RANGE,
  validateContract,
  enrichArchitecture,
  runPilotEnrichmentBatch,
  runLote9to24EnrichmentBatch,
  runLote25to48EnrichmentBatch,
  runLote49toEndEnrichmentBatch,
  reenrichRegion,
  SCHEMA_FROZEN_V1,
  atlasCoverageDashboard,
  exportEnrichedAtlasJSON,
  exportEnrichedAtlasCSV,
  chunkTemplates,
  selectLote9to24Templates,
  selectLote25to48Templates,
  selectLote49toEndTemplates,
  detectCrossRegionCatalogConflicts,
  loteCoverageReport,
  snapshotCoreMetrics,
  coreMetricsEqual,
  clearEnrichments,
  getEnrichment,
  listEnrichments,
  getLastBatch,
  putEnrichment,
  enrichmentBadge,
  exportEnrichmentBatchJSON,
  isPilotArchitecture,
  beginArchitectureTransaction,
  commitArchitectureTransaction,
  rollbackArchitectureTransaction,
  atlasEnrichmentProgress,
} from "./index.js";

let passed = 0;
let failed = 0;
const queue = [];
function test(name, fn) {
  queue.push(async () => {
    try {
      await fn();
      passed += 1;
    } catch (err) {
      failed += 1;
      console.error(`FAIL  ${name}\n      ${err.message}`);
    }
  });
}

function conflictingFrequency(country, hz) {
  return createEvidence({
    evidenceId: `EVD_TEST_CONFLICT_${country}_${hz}`,
    parameter: "frequencyHz",
    rawValue: `${hz} Hz`,
    normalizedValue: hz,
    unit: "Hz",
    sourceId: "SRC_IEC_60038",
    sourceUrl: "https://webstore.iec.ch/publication/181",
    retrievedAt: "2026-09-03T00:00:00.000Z",
    publishedAt: "2020-01-01",
    geography: { country },
    granularity: GRANULARITY.COUNTRY,
    methodology: "Artificial second source for conflict tests. Not averaged.",
    changeClass: CHANGE_CLASS.STATIC,
  });
}

test("fixture of 8 is one per region and preferred ids", () => {
  const eight = selectPilotTemplates();
  assert.equal(eight.length, 8);
  const regions = new Set(eight.map((t) => t.regionId));
  assert.equal(regions.size, 8);
  for (const id of PILOT_PREFERRED_IDS) {
    assert.equal(isPilotArchitecture(id), true);
  }
});

test("unknown field has no invented value", () => {
  const t = architectureTemplates.find((x) => x.id === "G-MRT-G03-001");
  const { record } = enrichArchitecture(t);
  const sy = record.fields.find((f) => f.key === "specificYield");
  assert.ok(sy);
  assert.equal(sy.method, FIELD_METHOD.UNKNOWN);
  assert.equal(sy.value, null);
  assert.equal(sy.source_id, null);
  const flood = record.fields.find((f) => f.key === "floodRisk");
  assert.equal(flood.method, FIELD_METHOD.UNKNOWN);
  assert.equal(flood.value, null);
});

test("artificial two-source conflict stays unresolved — no AI resolution", () => {
  const t = architectureTemplates.find((x) => x.id === "G-EGY-G06-001");
  const { record } = enrichArchitecture(t, {
    extraEvidence: [conflictingFrequency("EGY", 60)],
  });
  const freqConflicts = record.conflicts.filter((c) => c.field === "frequencyHz");
  assert.ok(freqConflicts.length >= 1);
  assert.ok(freqConflicts.every((c) => c.resolution === CONFLICT_RESOLUTION.UNRESOLVED));
  assert.equal(record.conflicts.some((c) => c.autoResolvedBy === "ai"), false);
  const freqFields = record.fields.filter((f) => f.key === "frequencyHz");
  assert.ok(freqFields.length >= 2);
});

test("pilot batch does not change core electrical metrics", () => {
  clearEnrichments();
  const eight = selectPilotTemplates();
  const before = eight.map((t) => ({ id: t.id, snap: snapshotCoreMetrics(t), json: JSON.stringify(t) }));
  const batch = runPilotEnrichmentBatch({ templates: eight });
  assert.equal(batch.format, ENRICHMENT_FORMAT);
  assert.equal(batch.count, 8);
  assert.equal(batch.gates.ok, true);
  assert.equal(batch.scope, "pilot-8");
  for (let i = 0; i < eight.length; i++) {
    const t = eight.find((x) => x.id === before[i].id);
    assert.equal(JSON.stringify(t), before[i].json);
    assert.equal(coreMetricsEqual(snapshotCoreMetrics(t), before[i].snap), true);
    assert.equal(coreMetricsEqual(batch.snapshot_before[i], batch.snapshot_after[i]), true);
  }
  const atlasRest = architectureTemplates.filter((t) => !eight.some((p) => p.id === t.id));
  assert.ok(atlasRest.length >= 80);
  for (const t of atlasRest.slice(0, 5)) {
    assert.equal(getEnrichment(t.id), null);
  }
});

test("contract validation and coverage 0–1", () => {
  const t = architectureTemplates.find((x) => x.id === "S-IND-S12-001");
  const { record, gates } = enrichArchitecture(t);
  const v = validateContract(record);
  assert.equal(v.ok, true);
  assert.equal(gates.ok, true);
  assert.ok(record.evidence_coverage >= 0 && record.evidence_coverage <= 1);
  assert.ok([ENRICHMENT_STATUS.PARTIAL, ENRICHMENT_STATUS.COMPLETE].includes(record.enrichment_status));
  const freq = record.fields.find((f) => f.key === "frequencyHz" && f.method === FIELD_METHOD.OFFICIAL);
  assert.ok(freq);
  assert.equal(freq.value, 50);
  assert.ok(freq.source_id);
  const derived = record.fields.filter((f) => f.method === FIELD_METHOD.DERIVED);
  for (const f of derived) {
    assert.ok(["dcAcRatio", "bessDurationHours", "annualEnergyMWh", "nMinusOneCapacityMVA", "loadFactor"].includes(f.key));
    assert.equal(f.source_id, "ENGINE_VALIDATION");
  }
});

test("batch refuses to walk the full atlas", () => {
  assert.throws(() => runPilotEnrichmentBatch({ templates: architectureTemplates.slice(0, 9) }), /capped/);
});

test("badge and JSON export", () => {
  clearEnrichments();
  const batch = runPilotEnrichmentBatch({ templates: selectPilotTemplates() });
  const id = batch.architecture_ids[0];
  const badge = enrichmentBadge(id);
  assert.ok(badge.coverage != null);
  assert.match(badge.label, /%/);
  const json = exportEnrichmentBatchJSON(batch);
  const parsed = JSON.parse(json);
  assert.equal(parsed.records.length, 8);
  assert.equal(parsed.records[0].architecture_id, parsed.architecture_ids[0]);
});

test("GHI is not stored as specificYield", () => {
  const t = architectureTemplates.find((x) => x.id === "G-OMN-G12-001");
  const { record } = enrichArchitecture(t);
  const ghi = record.fields.find((f) => f.key === "ghiAnnual");
  const sy = record.fields.find((f) => f.key === "specificYield");
  if (ghi?.value != null) {
    assert.notEqual(sy.value, ghi.value);
  }
  assert.equal(sy.method, FIELD_METHOD.UNKNOWN);
});

test("lote 9–24 is the next 16 in stable atlas order and misses the pilot", () => {
  const lote = selectLote9to24Templates();
  assert.equal(lote.length, 16);
  const ids = new Set(lote.map((t) => t.id));
  assert.equal(ids.size, 16);
  const eight = selectPilotTemplates();
  for (const t of eight) {
    assert.equal(ids.has(t.id), false);
  }
  const next = selectLote25to48Templates();
  assert.equal(next.length, NEXT_LOTE_RANGE.size);
  for (const t of next) {
    assert.equal(ids.has(t.id), false);
    assert.equal(eight.some((p) => p.id === t.id), false);
  }
});

test("16 new architectures fulfill the 13A contract", async () => {
  clearEnrichments();
  const batch = await runLote9to24EnrichmentBatch({ yield: false });
  assert.equal(batch.format, ENRICHMENT_FORMAT);
  assert.equal(batch.scope, "lote-9-24");
  assert.equal(batch.count, 16);
  assert.equal(batch.gates.ok, true);
  assert.ok(batch.gates.coverage >= BATCH_COVERAGE_THRESHOLD);
  assert.equal(batch.job.status, JOB_STATUS.DONE);
  for (const rec of batch.records) {
    const v = validateContract(rec);
    assert.equal(v.ok, true, `${rec.architecture_id}: ${v.errors.join("; ")}`);
    const keys = new Set(rec.fields.map((f) => f.key));
    for (const k of REQUIRED_FIELD_KEYS) {
      assert.equal(keys.has(k), true, `${rec.architecture_id} missing ${k}`);
    }
    const unknownValued = rec.fields.filter((f) => f.method === FIELD_METHOD.UNKNOWN && f.value != null);
    assert.equal(unknownValued.length, 0);
    assert.ok(rec.regional_fit);
    assert.equal(rec.regional_fit.method, FIELD_METHOD.ASSUMED);
    const before = batch.snapshot_before.find((s) => s.id === rec.architecture_id);
    const after = batch.snapshot_after.find((s) => s.id === rec.architecture_id);
    assert.equal(coreMetricsEqual(before, after), true);
  }
});

test("piloto de 8 intacto after lote 9–24", async () => {
  clearEnrichments();
  const eight = selectPilotTemplates();
  const beforeJson = eight.map((t) => JSON.stringify(t));
  const pilot = runPilotEnrichmentBatch({ templates: eight });
  const pilotSnap = Object.fromEntries(pilot.records.map((r) => [r.architecture_id, JSON.stringify(r)]));
  assert.equal(pilot.count, 8);
  const lote = await runLote9to24EnrichmentBatch({ yield: false });
  assert.equal(lote.count, 16);
  assert.equal(lote.gates.ok, true);
  for (let i = 0; i < eight.length; i++) {
    assert.equal(JSON.stringify(eight[i]), beforeJson[i]);
    const rec = getEnrichment(eight[i].id);
    assert.ok(rec);
    assert.equal(rec.batch_id, pilot.batch_id);
    assert.equal(JSON.stringify(rec), pilotSnap[eight[i].id]);
  }
  const progress = atlasEnrichmentProgress();
  assert.equal(progress.enriched, 24);
  assert.ok(progress.total >= 96);
  assert.equal(progress.label, `24/${progress.total}`);
});

test("failed job does not leave half-writes", async () => {
  clearEnrichments();
  const eight = selectPilotTemplates();
  const pilot = runPilotEnrichmentBatch({ templates: eight });
  const loteTemplates = selectLote9to24Templates();
  const failId = loteTemplates[5].id;
  let threw = false;
  try {
    await runLote9to24EnrichmentBatch({
      yield: false,
      failAtId: (id) => id === failId,
    });
  } catch (err) {
    threw = true;
    assert.match(String(err.message), /forced failure/);
  }
  assert.equal(threw, true);
  for (const t of loteTemplates) {
    assert.equal(getEnrichment(t.id), null, `half-write on ${t.id}`);
  }
  for (const t of eight) {
    const rec = getEnrichment(t.id);
    assert.ok(rec);
    assert.equal(rec.batch_id, pilot.batch_id);
  }
  assert.equal(listEnrichments().length, 8);
});

test("rollback by architecture_id restores prior records", () => {
  clearEnrichments();
  putEnrichment({
    architecture_id: "G-MRT-G01-001",
    template_id: "G-MRT-G01-001",
    enrichment_status: ENRICHMENT_STATUS.PARTIAL,
    fields: [],
    conflicts: [],
    warnings: [],
    evidence_coverage: 0.2,
    batch_id: "prior",
  });
  const tx = beginArchitectureTransaction(["G-MRT-G01-001", "G-MRT-G14-001"]);
  const committed = commitArchitectureTransaction(tx, [
    {
      architecture_id: "G-MRT-G01-001",
      template_id: "G-MRT-G01-001",
      enrichment_status: ENRICHMENT_STATUS.PARTIAL,
      fields: [],
      conflicts: [],
      warnings: [],
      evidence_coverage: 0.9,
      batch_id: "partial-lote",
    },
    {
      architecture_id: "G-MRT-G14-001",
      template_id: "G-MRT-G14-001",
      enrichment_status: ENRICHMENT_STATUS.PARTIAL,
      fields: [],
      conflicts: [],
      warnings: [],
      evidence_coverage: 0.9,
      batch_id: "partial-lote",
    },
  ]);
  assert.equal(committed.ok, true);
  const tx2 = beginArchitectureTransaction(["G-MRT-G01-001", "G-MRT-G14-001"]);
  putEnrichment({
    architecture_id: "G-MRT-G01-001",
    template_id: "G-MRT-G01-001",
    enrichment_status: ENRICHMENT_STATUS.BLOCKED,
    fields: [{ key: "frequencyHz", value: 99, method: "unknown", conflict_ids: [] }],
    conflicts: [],
    warnings: [],
    evidence_coverage: 0,
    batch_id: "broken",
  });
  rollbackArchitectureTransaction(tx2);
  assert.equal(getEnrichment("G-MRT-G01-001").batch_id, "partial-lote");
  assert.equal(getEnrichment("G-MRT-G14-001").batch_id, "partial-lote");
});

test("missing local source is unknown with sin fuente local, not an invented value", () => {
  const mar = architectureTemplates.find((x) => x.country === "MAR");
  assert.ok(mar);
  const { record } = enrichArchitecture(mar);
  const freq = record.fields.find((f) => f.key === "frequencyHz");
  assert.equal(freq.method, FIELD_METHOD.UNKNOWN);
  assert.equal(freq.value, null);
  assert.ok(record.warnings.some((w) => w.includes(LOCAL_SOURCE_MISSING_WARNING)));
});

test("coverage report lists id, coverage, conflictos, stale, blocked", async () => {
  clearEnrichments();
  const batch = await runLote9to24EnrichmentBatch({ yield: false });
  assert.equal(getLastBatch().batch_id, batch.batch_id);
  const report = loteCoverageReport(batch);
  assert.equal(report.rows.length, 16);
  assert.equal(report.next_lote.from, 25);
  assert.equal(report.next_lote.to, 48);
  for (const row of report.rows) {
    assert.ok(row.id);
    assert.equal(typeof row.coverage, "number");
    assert.equal(typeof row.conflictos, "number");
    assert.equal(typeof row.stale, "number");
    assert.equal(typeof row.blocked, "boolean");
  }
});

test("lote 25–48 is 24 ids after 1–24", () => {
  const eight = selectPilotTemplates();
  const loteB = selectLote9to24Templates();
  const loteC = selectLote25to48Templates();
  assert.equal(loteC.length, 24);
  const prior = new Set([...eight, ...loteB].map((t) => t.id));
  for (const t of loteC) {
    assert.equal(prior.has(t.id), false);
  }
  const rest = selectLote49toEndTemplates();
  assert.ok(rest.length >= 1);
  for (const t of rest) {
    assert.equal(loteC.some((x) => x.id === t.id), false);
    assert.equal(prior.has(t.id), false);
  }
});

test("24 new architectures in lote 25–48 fulfill the 13A contract", async () => {
  clearEnrichments();
  const batch = await runLote25to48EnrichmentBatch({ yield: false });
  assert.equal(batch.format, ENRICHMENT_FORMAT);
  assert.equal(batch.scope, "lote-25-48");
  assert.equal(batch.count, 24);
  assert.equal(batch.gates.ok, true);
  assert.ok(batch.gates.coverage >= BATCH_COVERAGE_THRESHOLD);
  assert.equal(batch.job.status, JOB_STATUS.DONE);
  for (const rec of batch.records) {
    const v = validateContract(rec);
    assert.equal(v.ok, true, `${rec.architecture_id}: ${v.errors.join("; ")}`);
    const keys = new Set(rec.fields.map((f) => f.key));
    for (const k of REQUIRED_FIELD_KEYS) {
      assert.equal(keys.has(k), true, `${rec.architecture_id} missing ${k}`);
    }
    const unknownValued = rec.fields.filter((f) => f.method === FIELD_METHOD.UNKNOWN && f.value != null);
    assert.equal(unknownValued.length, 0);
    const before = batch.snapshot_before.find((s) => s.id === rec.architecture_id);
    const after = batch.snapshot_after.find((s) => s.id === rec.architecture_id);
    assert.equal(coreMetricsEqual(before, after), true);
  }
  const freqFlag = (batch.cross_region_catalog_flags || []).find((f) => f.field === "frequencyHz");
  assert.ok(freqFlag, "catalog must flag 50 vs 60 Hz across regions");
  assert.equal(freqFlag.resolution, "unresolved");
  assert.ok(freqFlag.regions.includes("R05"));
  assert.ok(Array.isArray(batch.region_coverage_index));
  assert.ok(batch.region_coverage_index.length >= 1);
  assert.ok(batch.perf);
  assert.equal(batch.perf.count, 24);
  assert.ok(batch.next_lote.from === 49);
});

test("architectures 1–24 stay intact after lote 25–48", async () => {
  clearEnrichments();
  const eight = selectPilotTemplates();
  const beforeJson = eight.map((t) => JSON.stringify(t));
  const pilot = runPilotEnrichmentBatch({ templates: eight });
  const loteB = await runLote9to24EnrichmentBatch({ yield: false });
  const snap24 = Object.fromEntries(
    [...pilot.records, ...loteB.records].map((r) => [r.architecture_id, JSON.stringify(r)])
  );
  const loteC = await runLote25to48EnrichmentBatch({ yield: false });
  assert.equal(loteC.count, 24);
  for (let i = 0; i < eight.length; i++) {
    assert.equal(JSON.stringify(eight[i]), beforeJson[i]);
  }
  for (const id of Object.keys(snap24)) {
    const rec = getEnrichment(id);
    assert.ok(rec, `missing prior ${id}`);
    assert.equal(JSON.stringify(rec), snap24[id]);
  }
  const progress = atlasEnrichmentProgress();
  assert.equal(progress.enriched, 48);
  assert.equal(progress.label, `48/${progress.total}`);
});

test("blocked architecture does not halt lote 25–48", async () => {
  clearEnrichments();
  const eight = selectPilotTemplates();
  runPilotEnrichmentBatch({ templates: eight });
  await runLote9to24EnrichmentBatch({ yield: false });
  const loteC = selectLote25to48Templates();
  const failId = loteC[3].id;
  const batch = await runLote25to48EnrichmentBatch({
    yield: false,
    failAtId: (id) => id === failId,
  });
  assert.equal(batch.count, 24);
  assert.ok(batch.blocked_ids.includes(failId));
  const blocked = getEnrichment(failId);
  assert.ok(blocked);
  assert.equal(blocked.enrichment_status, ENRICHMENT_STATUS.BLOCKED);
  const sibling = loteC.find((t) => t.id !== failId);
  const sibRec = getEnrichment(sibling.id);
  assert.ok(sibRec);
  assert.notEqual(sibRec.enrichment_status, ENRICHMENT_STATUS.BLOCKED);
  for (const t of eight) {
    assert.ok(getEnrichment(t.id));
    assert.notEqual(getEnrichment(t.id).batch_id, batch.batch_id);
  }
});

test("perf smoke: lote 25–48 yields once per architecture", async () => {
  clearEnrichments();
  let ticks = 0;
  const batch = await runLote25to48EnrichmentBatch({
    yieldFn: async () => {
      ticks += 1;
    },
  });
  assert.equal(batch.count, 24);
  assert.equal(ticks, 24);
  assert.equal(batch.perf.yield_count, 24);
  assert.ok(batch.perf.total_ms >= 0);
  assert.equal(batch.perf.per_architecture.length, 24);
});

test("cross-region catalog detector flags frequency without resolving", () => {
  const flags = detectCrossRegionCatalogConflicts();
  const freq = flags.find((f) => f.field === "frequencyHz");
  assert.ok(freq);
  assert.equal(freq.kind, "cross_region_catalog");
  assert.equal(freq.resolution, "unresolved");
  const hz = new Set(freq.values.map((v) => v.value));
  assert.ok(hz.has(50));
  assert.ok(hz.has(60));
});

test("lote 49–end covers remaining atlas in sublotes of 16", () => {
  assert.equal(SCHEMA_FROZEN_V1, true);
  const rest = selectLote49toEndTemplates();
  assert.ok(rest.length >= 48);
  assert.equal(8 + 16 + 24 + rest.length, architectureTemplates.length);
  assert.ok(architectureTemplates.length >= 96);
  const chunks = chunkTemplates(rest, 16);
  assert.ok(chunks.length >= 4);
  assert.ok(chunks.slice(0, -1).every((c) => c.length === 16));
});

test("49–end enriches remaining rows under the 13A contract", async () => {
  clearEnrichments();
  const batch = await runLote49toEndEnrichmentBatch({ yield: false });
  assert.equal(batch.scope, "lote-49-end");
  assert.ok(batch.count >= 48);
  assert.equal(batch.gates.ok, true);
  assert.ok(batch.gates.coverage >= BATCH_COVERAGE_THRESHOLD);
  assert.equal(batch.schema_frozen_v1, true);
  assert.ok(batch.perf.sublotes >= 4);
  for (const rec of batch.records) {
    const v = validateContract(rec);
    assert.equal(v.ok, true, `${rec.architecture_id}: ${v.errors.join("; ")}`);
    if (rec.enrichment_status === ENRICHMENT_STATUS.BLOCKED) {
      assert.ok(rec.blocked_reason, `${rec.architecture_id} blocked without reason`);
    }
  }
});

test("regression: 1–48 intact and every atlas row has enrichment_status", async () => {
  clearEnrichments();
  const eight = selectPilotTemplates();
  const pilot = runPilotEnrichmentBatch({ templates: eight });
  const b = await runLote9to24EnrichmentBatch({ yield: false });
  const c = await runLote25to48EnrichmentBatch({ yield: false });
  const snap = Object.fromEntries(
    [...pilot.records, ...b.records, ...c.records].map((r) => [r.architecture_id, JSON.stringify(r)])
  );
  const d = await runLote49toEndEnrichmentBatch({ yield: false });
  assert.ok(d.count >= 48);
  for (const id of Object.keys(snap)) {
    assert.equal(JSON.stringify(getEnrichment(id)), snap[id], `mutated prior ${id}`);
  }
  const progress = atlasEnrichmentProgress();
  assert.equal(progress.enriched, architectureTemplates.length);
  assert.ok(progress.enriched >= 96);
  for (const t of architectureTemplates) {
    const rec = getEnrichment(t.id);
    assert.ok(rec, `missing ${t.id}`);
    assert.ok(["pending", "partial", "complete", "blocked"].includes(rec.enrichment_status));
  }
  const sampleIds = [
    eight[0].id,
    selectLote9to24Templates()[0].id,
    selectLote25to48Templates()[0].id,
    selectLote49toEndTemplates()[0].id,
  ];
  for (const id of sampleIds) {
    assert.equal(validateContract(getEnrichment(id)).ok, true);
  }
  const dash = atlasCoverageDashboard();
  assert.equal(dash.total, architectureTemplates.length);
  assert.equal(dash.enriched, architectureTemplates.length);
  assert.equal(dash.pending, 0);
  assert.equal(dash.complete + dash.partial + dash.blocked, dash.enriched);
  assert.equal(dash.schema_frozen_v1, true);
  for (const row of dash.blocked_list) {
    assert.ok(row.reason && row.reason !== "blocked without explicit reason");
  }
});

test("atlas export JSON+CSV has no PII and is round-trip readable", async () => {
  clearEnrichments();
  runPilotEnrichmentBatch();
  await runLote9to24EnrichmentBatch({ yield: false });
  const jsonExp = exportEnrichedAtlasJSON();
  assert.equal(jsonExp.ok, true, String(jsonExp.privacy_hits));
  const parsed = JSON.parse(jsonExp.json);
  assert.equal(parsed.format, "sacred-architecture-enrichment-atlas");
  assert.equal(parsed.schema_frozen_v1, true);
  assert.ok(parsed.records.length >= 24);
  assert.ok(parsed.dashboard);
  const csvExp = exportEnrichedAtlasCSV();
  assert.equal(csvExp.ok, true, String(csvExp.privacy_hits));
  assert.match(csvExp.csv, /architecture_id,region_id,template_id,enrichment_status/);
  assert.equal(csvExp.csv.includes("@"), false);
});

test("re-enrich region overwrites only that region", async () => {
  clearEnrichments();
  runPilotEnrichmentBatch();
  const before = getEnrichment("G-MRT-G03-001");
  const otherBefore = JSON.stringify(getEnrichment("G-EGY-G06-001"));
  assert.ok(before);
  assert.ok(otherBefore);
  const batch = await reenrichRegion("R01", { yield: false });
  assert.ok(batch.count >= 1);
  assert.equal(batch.scope, "reenrich-region");
  const after = getEnrichment("G-MRT-G03-001");
  assert.ok(after);
  assert.notEqual(after.batch_id, before.batch_id);
  assert.equal(JSON.stringify(getEnrichment("G-EGY-G06-001")), otherBefore);
});

for (const step of queue) await step();
console.log(`\nEnrichment tests: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
