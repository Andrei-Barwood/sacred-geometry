/**
 * Graph engine tests.
 *   node js/architecture/graph/graph-engine.test.js
 */

import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { architectureTemplates } from "../templates.js";
import { recompute } from "../ui/derive.js";
import { createEmptyProject, createSample6kWProject, projectFromTemplate } from "../ui/state.js";
import {
  buildArchitectureGraph,
  calculateGraphCompleteness,
  classifyVoltageDomain,
  formatNodeLabel,
  getTopologySignature,
  graphDistance,
  inferTemplateConnections,
  layoutSacredGraph,
  layoutSystemGraph,
  semanticEdgeSet,
  semanticNodeSet,
  selectSacredCenter,
  textualArchitectureSummary,
  validateArchitectureGraph,
} from "./index.js";
import { NODE_TYPES } from "./model.js";

let passed = 0;
let failed = 0;
const perfReport = [];

function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failed += 1;
    console.error(`FAIL  ${name}\n      ${err.message}`);
  }
}

function fixturePvBess() {
  const t = architectureTemplates.find(
    (x) => x.generation?.pv && x.bess?.enabled && x.substation?.enabled && x.feeders?.length
  );
  return projectFromTemplate(t);
}

function simpleLoadInstallation() {
  const p = createEmptyProject();
  p.grid.mode = "grid-connected";
  p.loads.profile.peakLoadMW = 0.006;
  p.loads.profile.averageLoadMW = 0.003;
  p.generation.enabled = false;
  p.bess.enabled = false;
  p.substation.enabled = false;
  return p;
}

function pvSystem() {
  const p = createEmptyProject();
  p.generation.enabled = true;
  p.generation.technologies = ["pv"];
  p.generation.pv = { dcMWp: 25, acMW: 20, specificYieldKWhPerKWpYear: null };
  p.substation.enabled = true;
  p.substation.primaryKV = 33;
  p.substation.secondaryKV = 11;
  p.substation.transformerMVA = 20;
  p.substation.transformerCount = 1;
  p.grid.mode = "grid-connected";
  p.bess.enabled = false;
  p.loads.profile.peakLoadMW = null;
  return p;
}

function microgrid() {
  const p = pvSystem();
  p.bess.enabled = true;
  p.bess.powerMW = 25;
  p.bess.energyMWh = 100;
  p.bess.durationHours = 4;
  p.generation.technologies = ["pv", "diesel"];
  p.generation.diesel = { ratedMW: 5, role: "backup" };
  p.loads.profile.peakLoadMW = 8;
  p.grid.mode = "islandable";
  return p;
}

function multiVoltage() {
  const p = createEmptyProject();
  p.generation.enabled = true;
  p.generation.technologies = ["pv"];
  p.generation.pv = { dcMWp: 120, acMW: 95 };
  p.substation.enabled = true;
  p.substation.primaryKV = 132;
  p.substation.secondaryKV = 33;
  p.substation.transformerMVA = 80;
  p.substation.transformerCount = 2;
  p.substation.redundancyMode = "N-1";
  p.grid.mode = "grid-connected";
  p.feeders = [
    { name: "F1", voltageKV: 33, estimatedLoadMW: 20, lengthKM: 4 },
    { name: "F2", voltageKV: 33, estimatedLoadMW: 18, lengthKM: 5 },
  ];
  p.loads.profile.peakLoadMW = 40;
  return p;
}

function syntheticGraph(n) {
  const nodes = [];
  const edges = [];
  for (let i = 0; i < n; i++) {
    nodes.push({
      id: `n${i}`,
      type: i === 0 ? "BUS" : i % 5 === 0 ? "FEEDER" : "LOAD",
      role: null,
      label: `N${i}`,
      electrical: { voltageKV: 11, activePowerMW: 1 },
      state: "ACTIVE",
      provenance: null,
      validation: { errors: [], warnings: [], notices: [] },
      metadata: {},
    });
    if (i > 0) {
      edges.push({
        id: `e${i}`,
        source: "n0",
        target: `n${i}`,
        type: "electrical",
        voltageKV: 11,
        direction: "unknown",
        state: "existing",
        powerFlow: null,
        metadata: {},
      });
    }
  }
  return { nodes, edges, groups: [], connections: [], metadata: {}, voltageDomains: [] };
}

test("voltage classification is graphical only and accepts any positive kV", () => {
  assert.equal(classifyVoltageDomain(0.4), "LV");
  assert.equal(classifyVoltageDomain(11), "MV");
  assert.equal(classifyVoltageDomain(33), "MV");
  assert.equal(classifyVoltageDomain(132), "HV");
  assert.equal(classifyVoltageDomain(220), "HV");
  assert.equal(classifyVoltageDomain(400), "EHV");
  assert.equal(classifyVoltageDomain(17.5), "MV");
  assert.equal(classifyVoltageDomain(null), null);
  assert.equal(classifyVoltageDomain(0), null);
});

test("empty / disabled components create no nodes", () => {
  const g = buildArchitectureGraph(createEmptyProject(), recompute(createEmptyProject()));
  assert.equal(g.nodes.some((n) => n.type === "PV"), false);
  assert.equal(g.nodes.some((n) => n.type === "BESS"), false);
  assert.equal(g.nodes.some((n) => n.type === "TRANSFORMER"), false);
});

test("simple load installation: grid → distribution → load", () => {
  const g = buildArchitectureGraph(simpleLoadInstallation(), {});
  assert.ok(g.nodes.length >= 3, String(g.nodes.length));
  assert.ok(g.nodes.some((n) => n.type === "GRID"));
  assert.ok(g.nodes.some((n) => n.id === "bus-lv"));
  assert.ok(g.nodes.some((n) => n.type === "LOAD"));
  assert.ok(g.edges.length >= 2);
  const v = validateArchitectureGraph(g);
  assert.equal(v.valid, true, JSON.stringify(v.errors));
});

test("PV system voltages and node counts", () => {
  const g = buildArchitectureGraph(pvSystem(), {});
  assert.ok(g.nodes.some((n) => n.type === "PV"));
  assert.ok(g.nodes.some((n) => n.type === "TRANSFORMER"));
  assert.ok(g.nodes.some((n) => n.type === "GRID"));
  const tr = g.nodes.find((n) => n.type === "TRANSFORMER");
  assert.equal(tr.electrical.voltageKV, 33);
  assert.equal(tr.electrical.voltageSecondaryKV, 11);
  assert.equal(tr.electrical.apparentPowerMVA, 20);
  const label = formatNodeLabel(tr);
  assert.match(label.title, /33/);
  assert.match(label.title, /11/);
  assert.match(label.title, /20 MVA/);
  const v = validateArchitectureGraph(g);
  assert.equal(v.valid, true, JSON.stringify(v.errors));
});

test("PV + BESS microgrid keeps connections", () => {
  const g = buildArchitectureGraph(microgrid(), recompute(microgrid()));
  const ids = new Set(g.nodes.map((n) => n.id));
  assert.ok(ids.has("pv") && ids.has("bess") && ids.has("diesel") && ids.has("load"));
  const diesel = g.nodes.find((n) => n.id === "diesel");
  assert.equal(diesel.role, "backup");
  assert.equal(diesel.label, "BACKUP");
  for (const e of g.edges) {
    assert.ok(ids.has(e.source) && ids.has(e.target), e.id);
  }
});

test("multi-voltage layers are separated", () => {
  const g = buildArchitectureGraph(multiVoltage(), recompute(multiVoltage()));
  const hv = g.nodes.find((n) => n.id === "bus-hv");
  const mv = g.nodes.find((n) => n.id === "bus-mv");
  assert.equal(hv.electrical.voltageKV, 132);
  assert.equal(mv.electrical.voltageKV, 33);
  assert.ok(g.voltageDomains.some((d) => d.voltageKV === 132 && d.class === "HV"));
  assert.ok(g.voltageDomains.some((d) => d.voltageKV === 33 && d.class === "MV"));
  const sys = layoutSystemGraph(g, { width: 1200, height: 800 });
  const yHv = sys.nodes.find((n) => n.id === "bus-hv").layout.y;
  const yMv = sys.nodes.find((n) => n.id === "bus-mv").layout.y;
  const yLoad = sys.nodes.find((n) => n.id === "load").layout.y;
  assert.ok(yHv < yMv, `HV ${yHv} should be above MV ${yMv}`);
  assert.ok(yMv < yLoad, `MV ${yMv} should be above loads ${yLoad}`);
});

test("SYSTEM/SACRED semantic equivalence", () => {
  const g = buildArchitectureGraph(fixturePvBess(), recompute(fixturePvBess()));
  const sys = layoutSystemGraph(g, { width: 1440, height: 800 });
  const sac = layoutSacredGraph(g, { width: 1440, height: 800 });
  assert.deepEqual(semanticNodeSet({ nodes: sys.nodes }), semanticNodeSet(g));
  assert.deepEqual(semanticNodeSet({ nodes: sac.nodes }), semanticNodeSet(g));
  assert.deepEqual(semanticEdgeSet({ edges: sys.edges }), semanticEdgeSet(g));
  assert.deepEqual(semanticEdgeSet({ edges: sac.edges }), semanticEdgeSet(g));
});

test("resize viewports produce finite coordinates", () => {
  const g = buildArchitectureGraph(multiVoltage(), {});
  for (const vp of [
    { width: 1440, height: 800 },
    { width: 768, height: 900 },
    { width: 390, height: 700 },
  ]) {
    const sys = layoutSystemGraph(g, vp);
    const sac = layoutSacredGraph(g, vp);
    assert.equal(sys.valid, true);
    assert.equal(sac.valid, true);
    for (const n of [...sys.nodes, ...sac.nodes]) {
      assert.equal(Number.isFinite(n.layout.x), true, n.id);
      assert.equal(Number.isFinite(n.layout.y), true, n.id);
      assert.equal(Number.isFinite(n.layout.width), true);
    }
    for (const e of [...sys.edges, ...sac.edges]) {
      for (const p of e.layout.points) {
        assert.equal(Number.isFinite(p.x) && Number.isFinite(p.y), true);
      }
    }
  }
});

test("unknown transformer MVA is omitted, never 0 MVA", () => {
  const p = pvSystem();
  p.substation.transformerMVA = null;
  const g = buildArchitectureGraph(p, {});
  const tr = g.nodes.find((n) => n.type === "TRANSFORMER");
  assert.equal(tr.electrical.apparentPowerMVA, null);
  const label = formatNodeLabel(tr);
  assert.equal(/0 MVA/.test(label.title), false);
});

test("PV 25 MWp / 20 MWac and BESS 25 MW / 100 MWh / 4 h are not swapped", () => {
  const p = microgrid();
  const g = buildArchitectureGraph(p, recompute(p));
  const pv = g.nodes.find((n) => n.type === "PV");
  const bess = g.nodes.find((n) => n.type === "BESS");
  assert.equal(pv.electrical.dcMWp, 25);
  assert.equal(pv.electrical.activePowerMW, 20);
  assert.equal(bess.electrical.activePowerMW, 25);
  assert.equal(bess.electrical.energyMWh, 100);
  assert.equal(bess.electrical.durationHours, 4);
  const pvL = formatNodeLabel(pv).title;
  const bessL = formatNodeLabel(bess).title;
  assert.match(pvL, /25/);
  assert.match(pvL, /MWp/);
  assert.match(pvL, /20/);
  assert.equal(/MWh/.test(pvL), false);
  assert.match(bessL, /25 MW/);
  assert.match(bessL, /100 MWh/);
  assert.match(bessL, /4/);
});

test("BESS duration error is overlaid and not auto-corrected", () => {
  const p = microgrid();
  p.bess.powerMW = 25;
  p.bess.energyMWh = 50;
  p.bess.durationHours = 4;
  const derived = recompute(p);
  const g = buildArchitectureGraph(p, derived);
  const bess = g.nodes.find((n) => n.id === "bess");
  assert.equal(bess.electrical.durationHours, 4);
  assert.equal(bess.electrical.energyMWh, 50);
  assert.equal(bess.electrical.activePowerMW, 25);
  assert.ok((bess.validation.errors || []).some((e) => e.code === "BESS_DURATION"));
  const sys = layoutSystemGraph(g, { width: 800, height: 600 });
  const sac = layoutSacredGraph(g, { width: 800, height: 600 });
  assert.equal(sys.nodes.find((n) => n.id === "bess").electrical.durationHours, 4);
  assert.equal(sac.nodes.find((n) => n.id === "bess").electrical.durationHours, 4);
});

test("build and layout do not mutate inputs", () => {
  const p = fixturePvBess();
  const before = JSON.stringify(p);
  const derived = recompute(p);
  const g = buildArchitectureGraph(p, derived);
  assert.equal(JSON.stringify(p), before);
  const snap = JSON.stringify(g);
  layoutSystemGraph(g, { width: 1000, height: 640 });
  layoutSacredGraph(g, { width: 1000, height: 640 });
  assert.equal(JSON.stringify(g), snap);
  assert.equal(g.nodes[0].layout, undefined);
});

test("layout is deterministic", () => {
  const g = buildArchitectureGraph(multiVoltage(), {});
  const a = layoutSystemGraph(g, { width: 1100, height: 700 });
  const b = layoutSystemGraph(g, { width: 1100, height: 700 });
  const c = layoutSacredGraph(g, { width: 1100, height: 700, sacredMode: "CONCENTRIC" });
  const d = layoutSacredGraph(g, { width: 1100, height: 700, sacredMode: "CONCENTRIC" });
  assert.equal(JSON.stringify(a.nodes.map((n) => n.layout)), JSON.stringify(b.nodes.map((n) => n.layout)));
  assert.equal(JSON.stringify(c.nodes.map((n) => n.layout)), JSON.stringify(d.nodes.map((n) => n.layout)));
});

test("6 kW sample graph has grid, distribution and grouped loads without HV substation", () => {
  const p = createSample6kWProject();
  const g = buildArchitectureGraph(p, recompute(p));
  assert.equal(g.nodes.some((n) => n.type === "TRANSFORMER"), false);
  assert.ok(g.nodes.some((n) => n.type === "GRID"));
  assert.ok(g.nodes.some((n) => n.id === "bus-lv"));
  assert.ok(g.nodes.some((n) => n.type === "LOAD"));
  assert.ok(g.nodes.filter((n) => n.type === "LOAD").length >= 1);
  assert.ok(g.nodes.filter((n) => n.type === "LOAD").length < p.loads.items.length);
});

test("STARTING changes state only, not topology", () => {
  const p = createSample6kWProject();
  const a = buildArchitectureGraph(p, recompute(p));
  const motor = p.loads.items.find((l) => l.category === "motor") || p.loads.items[0];
  p.scenario.id = "motor-start";
  p.scenario.loadStates = { ...(p.scenario.loadStates || {}), [motor.id]: "STARTING" };
  motor.state = "STARTING";
  const b = buildArchitectureGraph(p, recompute(p));
  assert.equal(getTopologySignature(a), getTopologySignature(b));
  assert.ok(b.nodes.some((n) => n.state === "STARTING") || (b.metadata.starting || []).length);
});

test("islanded keeps GRID node in DISCONNECTED state", () => {
  const p = microgrid();
  p.grid.mode = "islandable";
  p.scenario.id = "islanded";
  const g = buildArchitectureGraph(p, recompute(p));
  const grid = g.nodes.find((n) => n.type === "GRID");
  assert.ok(grid);
  assert.equal(grid.state, "DISCONNECTED");
});

test("BESS enabled false is absent; enabled true OFF is present", () => {
  const p = microgrid();
  p.bess.enabled = false;
  let g = buildArchitectureGraph(p, {});
  assert.equal(g.nodes.some((n) => n.type === "BESS"), false);
  p.bess.enabled = true;
  p.bess.state = "OFF";
  g = buildArchitectureGraph(p, {});
  const bess = g.nodes.find((n) => n.type === "BESS");
  assert.ok(bess);
  assert.equal(bess.state, "OFF");
});

test("graph validation: unique ids, refs, types", () => {
  const g = buildArchitectureGraph(fixturePvBess(), recompute(fixturePvBess()));
  const v = validateArchitectureGraph(g);
  assert.equal(v.valid, true, JSON.stringify(v.errors));
  assert.equal(new Set(g.nodes.map((n) => n.id)).size, g.nodes.length);
  assert.equal(new Set(g.edges.map((e) => e.id)).size, g.edges.length);
  for (const n of g.nodes) assert.ok(NODE_TYPES.includes(n.type), n.type);
});

test("no power-flow arrows when direction is unknown", () => {
  const g = buildArchitectureGraph(simpleLoadInstallation(), {});
  assert.ok(g.edges.every((e) => e.direction === "unknown" || e.direction === "bidirectional" || e.direction === "forward"));
});

test("sacred center is not blindly PV", () => {
  const g = buildArchitectureGraph(multiVoltage(), {});
  const c = selectSacredCenter(g);
  assert.notEqual(c, "pv");
  assert.ok(["bus-mv", "bus-hv", "transformer", "substation"].includes(c));
  const dist = graphDistance(g, c);
  assert.equal(dist.get(c), 0);
});

test("textual summary and tree do not leak private data", () => {
  const g = buildArchitectureGraph(fixturePvBess(), recompute(fixturePvBess()));
  const text = textualArchitectureSummary(g) + JSON.stringify(g.nodes.map((n) => n.label));
  assert.equal(/\/Users\/|andreibarwood|@|\+?\d{8,}/i.test(text), false);
  assert.match(text, /conceptual/i);
});

test("completeness is not qualityScore", () => {
  const g = buildArchitectureGraph(simpleLoadInstallation(), {});
  const c = calculateGraphCompleteness(g);
  assert.equal(typeof c.score, "number");
  assert.ok(c.score >= 0 && c.score <= 100);
});

test("connection migration helper is pure vs catalog", () => {
  const t = architectureTemplates[0];
  const before = JSON.stringify(t);
  const conns = inferTemplateConnections(projectFromTemplate(t), {});
  assert.equal(JSON.stringify(t), before);
  assert.ok(Array.isArray(conns));
});

test("no unsafe auto-connect of PV to missing transformer", () => {
  const p = createEmptyProject();
  p.generation.enabled = true;
  p.generation.technologies = ["pv"];
  p.generation.pv = { dcMWp: 5, acMW: 4 };
  p.substation.enabled = false;
  p.grid.mode = "off-grid";
  const g = buildArchitectureGraph(p, {});
  assert.equal(g.nodes.length, 1);
  assert.equal(g.nodes[0].type, "PV");
  assert.equal(g.edges.length, 0);
  assert.ok((g.metadata.notices || []).length >= 0);
});

test("performance build+layout for 10/25/50/100 nodes", () => {
  for (const n of [10, 25, 50, 100]) {
    const g = syntheticGraph(n);
    const t0 = performance.now();
    validateArchitectureGraph(g);
    const t1 = performance.now();
    layoutSystemGraph(g, { width: 1200, height: 800 });
    const t2 = performance.now();
    layoutSacredGraph(g, { width: 1200, height: 800 });
    const t3 = performance.now();
    perfReport.push({
      nodes: n,
      validateMs: +(t1 - t0).toFixed(2),
      systemMs: +(t2 - t1).toFixed(2),
      sacredMs: +(t3 - t2).toFixed(2),
    });
  }
  assert.ok(perfReport.length === 4);
});

console.log(`\n${passed} passed, ${failed} failed`);
console.log("performance", JSON.stringify(perfReport));
if (failed) process.exit(1);
