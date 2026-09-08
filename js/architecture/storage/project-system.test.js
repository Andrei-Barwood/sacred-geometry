/**
 * Persistence / scenarios / snapshots / import-export tests.
 *   node js/architecture/storage/project-system.test.js
 */

import assert from "node:assert/strict";
import { createEmptyProject, createSample6kWProject, projectFromTemplate } from "../ui/state.js";
import { architectureTemplates } from "../templates.js";
import { recompute } from "../ui/derive.js";
import {
  SCHEMA_VERSION,
  addScenario,
  addSnapshot,
  architectureToWorkbench,
  compareSnapshots,
  createMemoryBackend,
  createProjectDocument,
  createProjectStore,
  deleteScenario,
  exportProjectJSON,
  hasDangerousKeys,
  importProjectJSON,
  loadPreferences,
  migrateProject,
  parseJsonText,
  projectFromSnapshot,
  resolveScenario,
  restoreSnapshotInto,
  savePreferences,
  scanExportForPrivacy,
  setActiveScenario,
  structuralValidate,
  updateDocumentFromWorkbench,
} from "./index.js";
import { migrations } from "./migrations.js";
import { LIMITS } from "./schema.js";
import { saveComparison, getComparison } from "../compare/index.js";

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

function utilityWorkbench() {
  const t = architectureTemplates.find(
    (x) => x.generation?.pv?.dcMWp >= 20 && x.bess?.enabled && x.substation?.enabled
  );
  const wb = t
    ? projectFromTemplate(t)
    : createEmptyProject();
  if (!t) {
    wb.generation.enabled = true;
    wb.generation.technologies = ["pv"];
    wb.generation.pv = {
      dcMWp: 25,
      acMW: 20,
      specificYieldKWhPerKWpYear: null,
      capacityFactor: null,
    };
    wb.bess = {
      enabled: true,
      powerMW: 25,
      energyMWh: 100,
      durationHours: 4,
      roundTripEfficiency: 0.9,
      usableDoD: 0.9,
      purpose: ["grid-forming"],
      state: "ACTIVE",
    };
    wb.substation = {
      enabled: true,
      primaryKV: 33,
      secondaryKV: 11,
      tertiaryKV: null,
      transformerMVA: 20,
      transformerCount: 2,
      powerFactor: 0.925,
      redundancyMode: "N-1",
    };
    wb.loads.profile.peakLoadMW = 8.2;
  } else {
    wb.generation.pv.dcMWp = 25;
    wb.generation.pv.acMW = 20;
    wb.bess.powerMW = 25;
    wb.bess.energyMWh = 100;
    wb.bess.durationHours = 4;
  }
  wb.economics.btcPerKWh = 0.00000012;
  wb.economics.tariffMode = "btc";
  wb.connections = [{ id: "c-pv-tr", from: "pv", to: "transformer", type: "electrical" }];
  return wb;
}

async function roundTrip(wb) {
  const store = await createProjectStore({ backend: createMemoryBackend() });
  const doc = createProjectDocument(wb);
  const saved = await store.saveProject(doc);
  assert.equal(saved.ok, true, saved.error);
  const loaded = await store.loadProject(saved.document.projectId);
  assert.equal(loaded.ok, true);
  const exported = exportProjectJSON(loaded.document);
  assert.equal(exported.ok, true, exported.error);
  const imported = importProjectJSON(exported.json);
  assert.equal(imported.ok, true, imported.error);
  return { store, doc: imported.document, workbench: architectureToWorkbench(imported.document) };
}

test("6 kW save/load preserves loads, duty, service limit", async () => {
  const wb = createSample6kWProject();
  const { workbench, doc } = await roundTrip(wb);
  assert.equal(workbench.installation.serviceLimitKW, 6);
  assert.ok(workbench.loads.items.length > 5);
  const freezer = workbench.loads.items.find((l) => l.id === "freezer-storage");
  assert.ok(freezer);
  assert.equal(freezer.dutyCycle?.reference ?? freezer.dutyCycle, wb.loads.items.find((l) => l.id === "freezer-storage").dutyCycle?.reference);
  assert.equal(doc.architecture.installation.serviceLimitKW, 6);
  assert.ok(doc.scenarios.length >= 1);
});

test("utility-scale round trip preserves MW/MWh/MVA/kV/BTC/nulls/connections", async () => {
  const wb = utilityWorkbench();
  wb.generation.pv.specificYieldKWhPerKWpYear = null;
  wb.substation.tertiaryKV = null;
  const { workbench } = await roundTrip(wb);
  assert.equal(workbench.generation.pv.dcMWp, 25);
  assert.equal(workbench.generation.pv.acMW, 20);
  assert.equal(workbench.bess.powerMW, 25);
  assert.equal(workbench.bess.energyMWh, 100);
  assert.equal(workbench.substation.transformerMVA, workbench.substation.transformerMVA);
  assert.equal(workbench.generation.pv.specificYieldKWhPerKWpYear, null);
  assert.equal(workbench.substation.tertiaryKV, null);
  assert.equal(workbench.economics.btcPerKWh, 0.00000012);
  assert.ok(workbench.connections?.length >= 1);
});

test("decimals survive JSON round trip", async () => {
  const wb = createEmptyProject();
  wb.generation.enabled = true;
  wb.generation.pv = { dcMWp: 29.7, acMW: 22.1, specificYieldKWhPerKWpYear: null };
  wb.substation = { enabled: true, primaryKV: 11.5, secondaryKV: 0.4, transformerMVA: 5, powerFactor: 0.925 };
  wb.economics = { tariffMode: "btc", btcPerKWh: 0.00000012, satsPerKWh: null };
  const { workbench } = await roundTrip(wb);
  assert.equal(workbench.generation.pv.dcMWp, 29.7);
  assert.equal(workbench.substation.primaryKV, 11.5);
  assert.equal(workbench.substation.powerFactor, 0.925);
  assert.equal(workbench.economics.btcPerKWh, 0.00000012);
  assert.equal(workbench.generation.pv.specificYieldKWhPerKWpYear, null);
});

test("nulls are not coerced to 0", async () => {
  const wb = createEmptyProject();
  wb.generation.enabled = true;
  wb.generation.pv = { dcMWp: null, acMW: null, specificYieldKWhPerKWpYear: null };
  wb.economics.btcPerKWh = null;
  wb.substation.tertiaryKV = null;
  const { workbench } = await roundTrip(wb);
  assert.equal(workbench.generation.pv.specificYieldKWhPerKWpYear, null);
  assert.equal(workbench.economics.btcPerKWh, null);
  assert.equal(workbench.substation.tertiaryKV, null);
  assert.notEqual(workbench.generation.pv.specificYieldKWhPerKWpYear, 0);
});

test("snapshot A/B BESS diff", () => {
  const wb = utilityWorkbench();
  let doc = createProjectDocument(wb);
  const a = addSnapshot(doc, { name: "A" }).snapshot;
  wb.bess.powerMW = 30;
  wb.bess.energyMWh = 120;
  doc = updateDocumentFromWorkbench(doc, wb);
  const b = addSnapshot(doc, { name: "B" }).snapshot;
  const diff = compareSnapshots(a, b);
  const bess = (diff.groups.BESS || []).map((r) => r.text).join("\n");
  assert.match(bess, /25/);
  assert.match(bess, /30/);
  assert.match(bess, /100/);
  assert.match(bess, /120/);
  assert.equal(/annualEnergy|qualityScore/.test(JSON.stringify(diff)), false);
});

test("scenario islanded does not change physical topology", () => {
  const wb = utilityWorkbench();
  let doc = createProjectDocument(wb);
  const added = addScenario(doc, {
    name: "Islanded",
    operatingState: "islanded",
    gridState: { connected: false },
    bessState: "RUNNING",
    generationStates: { diesel: "STANDBY" },
  });
  doc = added.document;
  const normal = resolveScenario(doc, doc.scenarios[0].id);
  const island = resolveScenario(doc, added.scenario.id);
  assert.equal(normal.bess.enabled, island.bess.enabled);
  assert.equal(normal.generation.pv.dcMWp, island.generation.pv.dcMWp);
  assert.equal(island.scenario.id, "islanded");
  assert.equal(island.bess.state, "RUNNING");
  assert.notEqual(JSON.stringify(normal), JSON.stringify(island));
});

test("cannot delete the only scenario", () => {
  const doc = createProjectDocument(createEmptyProject());
  const r = deleteScenario(doc, doc.activeScenarioId);
  assert.equal(r.ok, false);
});

test("snapshot restore keeps projectId; new project from snapshot gets a new id", () => {
  const wb = utilityWorkbench();
  let doc = createProjectDocument(wb);
  const { document: d2, snapshot } = addSnapshot(doc, { name: "rev-a" });
  wb.bess.powerMW = 99;
  const dirty = updateDocumentFromWorkbench(d2, wb);
  const restored = restoreSnapshotInto(dirty, snapshot.snapshotId);
  assert.equal(restored.ok, true);
  assert.equal(restored.document.projectId, doc.projectId);
  assert.equal(restored.document.architecture.bess.powerMW, 25);
  const fresh = projectFromSnapshot(d2, snapshot.snapshotId);
  assert.notEqual(fresh.projectId, doc.projectId);
});

test("export/import reconstructs after delete", async () => {
  const store = await createProjectStore({ backend: createMemoryBackend() });
  const doc = createProjectDocument(utilityWorkbench());
  await store.saveProject(doc);
  const exp = exportProjectJSON(doc);
  await store.deleteProject(doc.projectId);
  const listed = await store.listProjects();
  assert.equal(listed.some((p) => p.projectId === doc.projectId), false);
  const imp = importProjectJSON(exp.json);
  assert.equal(imp.ok, true);
  await store.saveProject(imp.document);
  const loaded = await store.loadProject(doc.projectId);
  assert.equal(loaded.ok, true);
  assert.equal(loaded.document.architecture.bess.energyMWh, 100);
});

test("import collision is detected, never auto-overwrite", async () => {
  const store = await createProjectStore({ backend: createMemoryBackend() });
  const doc = createProjectDocument(createEmptyProject());
  await store.saveProject(doc);
  const exists = await store.exists(doc.projectId);
  assert.equal(exists, true);
  const exp = exportProjectJSON(doc);
  const imp = importProjectJSON(exp.json);
  assert.equal(imp.document.projectId, doc.projectId);
  assert.equal(await store.exists(imp.document.projectId), true);
});

test("newer schema is rejected", () => {
  const envelope = {
    format: "sacred-architecture-project",
    schemaVersion: SCHEMA_VERSION + 10,
    project: {
      ...createProjectDocument(createEmptyProject()),
      schemaVersion: SCHEMA_VERSION + 10,
    },
  };
  const r = importProjectJSON(JSON.stringify(envelope));
  assert.equal(r.ok, false);
  assert.match(r.error, /newer schema/i);
});

test("malicious project name is plain text in JSON", () => {
  const wb = createEmptyProject();
  wb.metadata.name = "<img src=x onerror=alert(1)>";
  const doc = createProjectDocument(wb);
  const exp = exportProjectJSON(doc);
  assert.equal(exp.ok, true);
  assert.match(exp.json, /onerror/);
  assert.equal(/<script/.test(exp.json) && exp.json.includes("eval"), false);
  const imp = importProjectJSON(exp.json);
  assert.equal(imp.document.metadata.name, "<img src=x onerror=alert(1)>");
});

test("prototype pollution keys rejected", () => {
  const raw = `{
    "format": "sacred-architecture-project",
    "schemaVersion": 1,
    "project": {
      "projectId": "x",
      "schemaVersion": 1,
      "architecture": {},
      "scenarios": [{ "id": "normal", "name": "N" }],
      "activeScenarioId": "normal",
      "__proto__": { "polluted": true }
    }
  }`;
  const r = importProjectJSON(raw);
  assert.equal(r.ok, false);
});

test("oversized import rejected", () => {
  const r = parseJsonText("{\"x\":1}", { maxBytes: 3 });
  assert.equal(r.ok, false);
});

test("invalid JSON / unknown format / missing project", () => {
  assert.equal(importProjectJSON("{").ok, false);
  assert.equal(importProjectJSON(JSON.stringify({ format: "nope", project: {} })).ok, false);
  assert.equal(importProjectJSON("null").ok, false);
});

test("privacy scanner blocks /Users paths on export", () => {
  const wb = createEmptyProject();
  wb.assumptions = ["see /Users/example/private.pdf"];
  const doc = createProjectDocument(wb);
  const scan = scanExportForPrivacy(doc);
  assert.equal(scan.ok, false);
  const exp = exportProjectJSON(doc);
  assert.equal(exp.ok, false);
});

test("engineering errors still import (BESS duration)", () => {
  const wb = utilityWorkbench();
  wb.bess.powerMW = 25;
  wb.bess.energyMWh = 50;
  wb.bess.durationHours = 4;
  const doc = createProjectDocument(wb);
  const exp = exportProjectJSON(doc);
  const imp = importProjectJSON(exp.json);
  assert.equal(imp.ok, true);
  const derived = recompute(architectureToWorkbench(imp.document));
  assert.ok(derived.validation.errors.some((e) => e.code === "BESS_DURATION"));
});

test("save failure keeps document in memory", async () => {
  const failing = {
    kind: "indexeddb",
    async get() { return null; },
    async put() { throw new Error("QuotaExceededError"); },
    async delete() {},
    async getAll() { return []; },
  };
  const store = await createProjectStore({ backend: failing });
  const doc = createProjectDocument(createEmptyProject());
  const r = await store.saveProject(doc);
  assert.equal(r.ok, false);
  assert.match(r.error, /could not be saved/i);
  assert.equal(r.document.projectId, doc.projectId);
  const exp = exportProjectJSON(r.document);
  assert.equal(exp.ok, true);
});

test("mock sequential migrations are copy-in", () => {
  const fake = {
    1: (d) => ({ ...d, schemaVersion: 2, migratedFlag: true }),
  };
  const src = createProjectDocument(createEmptyProject());
  src.schemaVersion = 1;
  const before = JSON.stringify(src);
  const r = migrateProject(src, { currentVersion: 2, migrations: fake });
  assert.equal(r.ok, true);
  assert.equal(r.document.schemaVersion, 2);
  assert.equal(r.document.migratedFlag, true);
  assert.equal(JSON.stringify(src), before);
  assert.deepEqual(r.log.steps, [{ from: 1, to: 2 }]);
});

test("structural validate requires scenarios", () => {
  const doc = createProjectDocument(createEmptyProject());
  doc.scenarios = [];
  const v = structuralValidate(doc);
  assert.equal(v.ok, false);
});

test("preferences stay out of the project document", () => {
  const mem = {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; },
  };
  savePreferences({ view: "sacred", btcDisplay: "sats" }, mem);
  const prefs = loadPreferences(mem);
  assert.equal(prefs.view, "sacred");
  const doc = createProjectDocument(createEmptyProject());
  assert.equal(doc.architecture.display, undefined);
  assert.equal(JSON.stringify(doc).includes("tooltipVisible"), false);
});

test("derived values are not the persistence source", () => {
  const doc = createProjectDocument(utilityWorkbench());
  const json = JSON.stringify(doc);
  assert.equal(/bessDurationHours/.test(json), false);
  assert.equal(/qualityScore/.test(json), false);
  assert.equal(/layout":\{"x"/.test(json), false);
});

test("same root format for 6 kW and utility", () => {
  const a = createProjectDocument(createSample6kWProject());
  const b = createProjectDocument(utilityWorkbench());
  assert.equal(a.schemaVersion, b.schemaVersion);
  assert.ok(a.architecture.loads);
  assert.ok(b.architecture.bess);
});

test("saved comparison round-trips on the project document", async () => {
  const wb = createSample6kWProject();
  const tA = architectureTemplates[0];
  const tB = architectureTemplates[1];
  let doc = createProjectDocument(wb);
  assert.ok(Array.isArray(doc.comparisons));
  const saved = saveComparison(doc, {
    name: "A vs B",
    thresholdPct: 7,
    slots: [
      { kind: "template", id: tA.id },
      { kind: "template", id: tB.id },
    ],
  });
  doc = saved.document;
  const store = await createProjectStore({ backend: createMemoryBackend() });
  const wrote = await store.saveProject(doc);
  assert.equal(wrote.ok, true, wrote.error);
  const loaded = await store.loadProject(wrote.document.projectId);
  const rec = getComparison(loaded.document, saved.comparison.id);
  assert.ok(rec);
  assert.equal(rec.thresholdPct, 7);
  assert.equal(rec.slots.length, 2);
  assert.equal(rec.slots[0].id, tA.id);
});

test("accepted evidence metadata persists and cache is separate", async () => {
  const wb = createEmptyProject();
  wb.acceptedEvidence = {
    frequencyHz: {
      evidenceId: "EVD_TEST",
      value: 50,
      unit: "Hz",
      sourceId: "SRC_CEA_IND",
      retrievedAt: "2026-09-03T00:00:00.000Z",
      granularity: "COUNTRY",
    },
  };
  const store = await createProjectStore({ backend: createMemoryBackend() });
  const saved = await store.saveProject(createProjectDocument(wb));
  assert.equal(saved.ok, true);
  const loaded = await store.loadProject(saved.document.projectId);
  assert.equal(loaded.document.acceptedEvidence.frequencyHz.value, 50);
  assert.equal(loaded.document.schemaVersion, SCHEMA_VERSION);
});

for (const job of queue) await job();

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
