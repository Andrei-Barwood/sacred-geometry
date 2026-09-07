/**
 * PROJECT STATE → canonical architecture graph.
 * Pure. Does not mutate projectState. Does not compute engineering quantities.
 * Electrical numbers are copied from project state / derived engine results.
 */

import { pickNominalPowerW, pickRangeValue } from "../models.js";
import {
  classifyVoltageDomain,
  createEdge,
  createNode,
  declaredFuture,
  DEFAULT_LOAD_GROUP_THRESHOLD,
  emptyGraph,
  isFiniteNumber,
  isFinitePositive,
} from "./model.js";

const ISSUE_NODE = Object.freeze({
  bess: "bess",
  generation: "pv",
  substation: "transformer",
  load: "load",
  consumption: "load",
  energy: "load",
  grid: "grid",
  feeders: null,
  transients: "load",
});

function finite(value) {
  return isFiniteNumber(value) ? value : null;
}

function cloneJson(value) {
  if (value == null) return value;
  return JSON.parse(JSON.stringify(value));
}

function issuesFor(derived, category, nodeId) {
  const v = derived?.validation;
  if (!v) return { errors: [], warnings: [], notices: [] };
  const match = (list) =>
    (list || []).filter((i) => {
      if (i.category === category) return true;
      if (nodeId && (i.nodeId === nodeId || i.target === nodeId)) return true;
      return false;
    });
  return {
    errors: match(v.errors),
    warnings: match(v.warnings),
    notices: match(v.notices),
  };
}

function operationalState(raw, fallback = "ACTIVE") {
  if (!raw) return fallback;
  const u = String(raw).toUpperCase();
  if (u === "OFF") return "OFF";
  if (u === "STANDBY") return "STANDBY";
  if (u === "RUNNING") return "RUNNING";
  if (u === "STARTING") return "STARTING";
  if (u === "FAULT") return "FAULT";
  if (u === "FUTURE") return "FUTURE";
  if (u === "DISCONNECTED") return "DISCONNECTED";
  if (u === "INACTIVE") return "INACTIVE";
  return fallback;
}

function transformerRole(primaryKV, secondaryKV) {
  if (!isFinitePositive(primaryKV) || !isFinitePositive(secondaryKV)) return null;
  if (secondaryKV > primaryKV) return "step-up";
  if (secondaryKV < primaryKV) return "step-down";
  return "isolation";
}

function bessRole(bess) {
  const purposes = Array.isArray(bess?.purpose) ? bess.purpose : [];
  if (purposes.includes("grid-forming")) return "grid-forming";
  if (purposes.includes("peak-shaving") || purposes.includes("peak_shaving")) return "peak-shaving";
  if (purposes.includes("backup")) return "backup";
  if (purposes.includes("energy-shifting")) return "energy-shifting";
  return purposes[0] || "storage";
}

function dieselRole(diesel) {
  const role = String(diesel?.role || "").toLowerCase();
  if (/backup|black-start|standby/.test(role)) return "backup";
  return role || "generation";
}

function flowHint(project, derived) {
  const grid = project?.grid;
  if (!grid) return null;
  if (project.scenario?.id === "islanded") return "ISLANDED";
  if (grid.mode === "off-grid") return "ISLANDED";
  const genOn = project.generation?.enabled === true;
  if (grid.mode === "grid-connected" || grid.mode === "weak-grid" || grid.mode === "islandable") {
    if (grid.exportAllowed && grid.importAllowed) return null;
    if (grid.exportAllowed && genOn) return "EXPORT";
    if (grid.importAllowed && !genOn) return "IMPORT";
    if (grid.exportAllowed) return "EXPORT";
    if (grid.importAllowed) return "IMPORT";
  }
  if (grid.backupAvailable) return "BACKUP";
  return null;
}

function peakLoadMW(project) {
  const p = project?.loads?.profile?.peakLoadMW;
  if (isFiniteNumber(p)) return p;
  const items = project?.loads?.items || [];
  if (!items.length) return null;
  let watts = 0;
  let any = false;
  for (const load of items) {
    if (load.enabled === false) continue;
    const w = pickNominalPowerW(load);
    if (w == null) continue;
    any = true;
    const q = Number.isFinite(load.quantity) ? load.quantity : 1;
    watts += w * q;
  }
  return any ? watts / 1e6 : null;
}

function collectStarting(project) {
  const starting = [];
  const states = project.scenario?.loadStates || {};
  for (const load of project.loads?.items || []) {
    if (load.enabled === false) continue;
    const st = states[load.id] || load.state;
    if (String(st).toUpperCase() !== "STARTING") continue;
    starting.push({
      id: load.id,
      name: load.name,
      runningA: pickRangeValue(load.runCurrentA),
      transientA: pickRangeValue(load.inrushCurrentA),
      duration: pickRangeValue(load.inrushDurationSeconds),
    });
  }
  for (const ev of project.transients || []) {
    if (project.scenario?.id === "motor-start" || String(ev.type || "").includes("start")) {
      starting.push({
        id: ev.id,
        name: ev.name,
        runningA: ev.runningCurrentA,
        runningMW: ev.runningMW,
        transientA: ev.startingCurrentA,
        multiple: ev.startingMultiple,
        duration: ev.durationSeconds,
      });
    }
  }
  return starting;
}

function voltageDomainsFrom(nodes, edges) {
  const set = new Set();
  for (const n of nodes) {
    const v = n.electrical?.voltageKV;
    if (isFinitePositive(v)) set.add(v);
    const s = n.electrical?.voltageSecondaryKV;
    if (isFinitePositive(s)) set.add(s);
  }
  for (const e of edges) {
    if (isFinitePositive(e.voltageKV)) set.add(e.voltageKV);
  }
  return [...set]
    .sort((a, b) => b - a)
    .map((kv) => ({ voltageKV: kv, class: classifyVoltageDomain(kv) }));
}

function loadGroupingMode(project, options) {
  const requested = options.loadGrouping || "auto";
  const items = (project.loads?.items || []).filter((l) => l.enabled !== false);
  const threshold = options.loadGroupThreshold ?? DEFAULT_LOAD_GROUP_THRESHOLD;
  if (requested === "individual") return "individual";
  if (requested === "grouped") return "grouped";
  if (items.length > threshold) return "grouped";
  if (items.length > 0 && project.loads?.editor === "detailed") return "individual";
  return "aggregated";
}

function groupLoads(items) {
  const groups = new Map();
  for (const load of items) {
    const key = load.category || load.circuit || "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(load);
  }
  return groups;
}

function addNode(nodes, node) {
  nodes.push(createNode(node));
}

/**
 * Deterministic connection inference from co-present architecture.
 * origin is always tagged. Never invents missing equipment.
 */
export function inferArchitectureConnections(ids, project, flow) {
  const connections = [];
  const add = (from, to, type, extra = {}) => {
    if (!ids.has(from) || !ids.has(to) || from === to) return;
    connections.push({
      id: `c-${from}-${to}`,
      from,
      to,
      type,
      voltageKV: extra.voltageKV ?? null,
      origin: "inferred-architecture",
      direction: extra.direction || "unknown",
      state: extra.state || "existing",
      powerFlow: extra.powerFlow ?? null,
    });
  };

  const sub = project.substation || {};
  const collector = ids.has("transformer")
    ? "transformer"
    : ids.has("bus-mv")
      ? "bus-mv"
      : ids.has("bus-lv")
        ? "bus-lv"
        : null;

  if (ids.has("bus-hv") && ids.has("transformer")) {
    add("bus-hv", "transformer", "transformer-link", { voltageKV: sub.primaryKV });
  }
  if (ids.has("transformer") && ids.has("bus-mv")) {
    add("transformer", "bus-mv", "transformer-link", { voltageKV: sub.secondaryKV });
  }
  if (ids.has("substation") && ids.has("transformer")) {
    add("substation", "transformer", "bus-connection");
  }

  const gridDir =
    flow === "IMPORT" ? "forward" : flow === "EXPORT" ? "reverse" : flow === "ISLANDED" ? "unknown" : "unknown";
  const gridState = flow === "ISLANDED" ? "disconnected" : "existing";
  if (ids.has("grid") && ids.has("bus-hv")) {
    add("grid", "bus-hv", "electrical", { voltageKV: sub.primaryKV, direction: gridDir, state: gridState, powerFlow: flow });
  } else if (ids.has("grid") && ids.has("transformer")) {
    add("grid", "transformer", "electrical", { voltageKV: sub.primaryKV, direction: gridDir, state: gridState, powerFlow: flow });
  } else if (ids.has("grid") && ids.has("bus-lv")) {
    add("grid", "bus-lv", "electrical", { direction: gridDir, state: gridState, powerFlow: flow });
  }

  for (const src of ["pv", "wind"]) {
    if (!ids.has(src)) continue;
    if (collector) add(src, collector, "electrical");
  }
  if (ids.has("diesel")) {
    const type = dieselRole(project.generation?.diesel) === "backup" ? "backup-link" : "electrical";
    if (collector) add("diesel", collector, type);
    else if (ids.has("bus-lv")) add("diesel", "bus-lv", type);
  }
  if (ids.has("other-generation") && collector) add("other-generation", collector, "electrical");

  if (ids.has("bess")) {
    const bus = ids.has("bus-mv") ? "bus-mv" : ids.has("transformer") ? "transformer" : ids.has("bus-lv") ? "bus-lv" : null;
    if (bus) add("bess", bus, "storage-link", { direction: "bidirectional" });
  }

  const feederIds = [...ids].filter((id) => id.startsWith("feeder-"));
  const feederParent = ids.has("bus-mv") ? "bus-mv" : ids.has("transformer") ? "transformer" : ids.has("bus-lv") ? "bus-lv" : null;
  const loadIds = [...ids].filter((id) => id === "load" || id.startsWith("load-"));
  feederIds.forEach((fid, i) => {
    const feeder = (project.feeders || [])[i];
    const future = declaredFuture(feeder);
    if (feederParent) add(feederParent, fid, "feeder", { voltageKV: feeder?.voltageKV, state: future ? "future" : "existing" });
    if (ids.has("load")) add(fid, "load", "feeder", { voltageKV: feeder?.voltageKV });
  });

  if (!feederIds.length) {
    const from = ids.has("bus-mv") ? "bus-mv" : ids.has("bus-lv") ? "bus-lv" : ids.has("transformer") ? "transformer" : ids.has("grid") ? "grid" : null;
    for (const lid of loadIds) {
      if (from) add(from, lid, "electrical");
    }
  } else {
    for (const lid of loadIds) {
      if (lid !== "load" && feederIds.length === 1) add(feederIds[0], lid, "feeder");
    }
  }

  return connections;
}

function declaredConnections(project, ids) {
  const raw = project.connections;
  if (!Array.isArray(raw) || !raw.length) return null;
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (!c || !c.from || !c.to) continue;
    out.push({
      id: c.id || `c-declared-${i + 1}`,
      from: c.from,
      to: c.to,
      type: c.type || "electrical",
      voltageKV: c.voltageKV ?? null,
      origin: "declared",
      direction: c.direction || "unknown",
      state: c.state || (declaredFuture(c) ? "future" : "existing"),
      powerFlow: c.powerFlow ?? null,
      unresolved: !ids.has(c.from) || !ids.has(c.to),
    });
  }
  return out;
}

/**
 * Runtime migration helper. Does not mutate the 96-template catalog.
 * Produces a connections[] snapshot for a project/template-shaped object.
 */
export function inferTemplateConnections(template, derived = {}) {
  const graph = buildArchitectureGraph(template, derived, { connectionsOnly: false });
  return graph.connections.slice();
}

export function calculateGraphCompleteness(graph) {
  const nodes = graph?.nodes || [];
  const edges = graph?.edges || [];
  const ids = new Set(nodes.map((n) => n.id));
  if (!nodes.length) {
    return { score: 0, connected: 0, isolated: 0, unresolved: 0, note: "empty" };
  }
  const degree = new Map(nodes.map((n) => [n.id, 0]));
  for (const e of edges) {
    if (ids.has(e.source)) degree.set(e.source, (degree.get(e.source) || 0) + 1);
    if (ids.has(e.target)) degree.set(e.target, (degree.get(e.target) || 0) + 1);
  }
  let isolated = 0;
  for (const n of nodes) {
    if ((degree.get(n.id) || 0) === 0 && n.state !== "FUTURE") isolated += 1;
  }
  const unresolved = (graph.connections || []).filter((c) => c.unresolved).length;
  const connected = nodes.length - isolated;
  const score = Math.round((connected / nodes.length) * 100);
  return { score, connected, isolated, unresolved, note: isolated ? "incomplete-topology" : "connected" };
}

export function buildArchitectureGraph(projectState, derived = {}, options = {}) {
  if (!projectState) return emptyGraph();

  const project = projectState;
  const d = derived?.validation?.derivedValues || {};
  const nodes = [];
  const groups = [];
  const notices = [];
  const gen = project.generation || {};
  const techs = new Set(gen.technologies || []);
  const pv = gen.pv;
  const wind = gen.wind;
  const diesel = gen.diesel;
  const other = gen.other;
  const pvOn = gen.enabled === true && pv && (techs.has("pv") || pv.dcMWp != null || pv.acMW != null);
  const windOn = gen.enabled === true && wind && (techs.has("wind") || wind.ratedMW != null);
  const dieselOn = gen.enabled === true && diesel && (techs.has("diesel") || diesel.ratedMW != null);
  const otherOn = gen.enabled === true && other && (techs.has("other") || other.ratedMW != null);
  const bessOn = project.bess?.enabled === true;
  const subOn = project.substation?.enabled === true;
  const grid = project.grid || {};
  const scenarioId = project.scenario?.id;
  const islanded = scenarioId === "islanded";
  const showGrid =
    grid.mode === "grid-connected" || grid.mode === "weak-grid" || grid.mode === "islandable";
  const feeders = Array.isArray(project.feeders) ? project.feeders : [];
  const collapseFeeders =
    options.collapseFeeders === true ||
    (options.autoCollapseFeeders !== false && feeders.length > (options.feederCollapseThreshold ?? 12));

  const peakMW = peakLoadMW(project);
  const items = (project.loads?.items || []).filter((l) => l.enabled !== false);
  const grouping = loadGroupingMode(project, options);
  const hasAggregatedLoad = isFiniteNumber(peakMW) || isFiniteNumber(project.loads?.profile?.averageLoadMW);
  const hasLoad = grouping === "aggregated" ? hasAggregatedLoad : items.length > 0 || hasAggregatedLoad;
  const flow = flowHint(project, derived);
  const starting = collectStarting(project);
  const loadStates = project.scenario?.loadStates || {};

  if (pvOn) {
    addNode(nodes, {
      id: "pv",
      type: "PV",
      role: "generation",
      label: "PV ARRAY",
      electrical: {
        dcMWp: finite(pv.dcMWp),
        activePowerMW: finite(pv.acMW),
        voltageKV: null,
      },
      state: declaredFuture(pv) ? "FUTURE" : "ACTIVE",
      provenance: pv.resourceProvenance || project.provenance?.["generation.pv.specificYieldKWhPerKWpYear"] || null,
      validation: issuesFor(derived, "generation", "pv"),
      metadata: {
        mounting: pv.mounting || null,
        bifacial: pv.bifacial === true,
        specificYieldKWhPerKWpYear: pv.specificYieldKWhPerKWpYear ?? null,
        capacityFactor: pv.capacityFactor ?? null,
        lossesPercent: pv.lossesPercent ?? null,
        dcAcRatio: finite(d.dcAcRatio),
      },
    });
  }

  if (windOn) {
    addNode(nodes, {
      id: "wind",
      type: "WIND",
      role: "generation",
      label: "Wind",
      electrical: { activePowerMW: finite(wind.ratedMW) },
      state: declaredFuture(wind) ? "FUTURE" : "ACTIVE",
      validation: issuesFor(derived, "generation", "wind"),
      metadata: { capacityFactor: wind.capacityFactor ?? null },
    });
  }

  if (dieselOn) {
    const role = dieselRole(diesel);
    addNode(nodes, {
      id: "diesel",
      type: "DIESEL",
      role,
      label: role === "backup" ? "BACKUP" : "Diesel",
      electrical: { activePowerMW: finite(diesel.ratedMW) },
      state: declaredFuture(diesel) ? "FUTURE" : "ACTIVE",
      validation: issuesFor(derived, "generation", "diesel"),
      metadata: { sourceRole: diesel.role || null },
    });
  }

  if (otherOn) {
    addNode(nodes, {
      id: "other-generation",
      type: "OTHER_GENERATION",
      role: "generation",
      label: other.label || "Other",
      electrical: { activePowerMW: finite(other.ratedMW) },
      state: "ACTIVE",
    });
  }

  if (bessOn) {
    const bess = project.bess;
    addNode(nodes, {
      id: "bess",
      type: "BESS",
      role: bessRole(bess),
      label: "BESS",
      electrical: {
        activePowerMW: finite(bess.powerMW),
        energyMWh: finite(bess.energyMWh),
        durationHours: finite(bess.durationHours),
      },
      state: operationalState(bess.state, "ACTIVE"),
      provenance: project.provenance?.bess || null,
      validation: issuesFor(derived, "bess", "bess"),
      metadata: {
        derivedDurationHours: finite(d.bessDurationHours),
        usableEnergyMWh: finite(d.usableEnergyMWh),
        deliveredEnergyMWh: finite(d.deliveredEnergyMWh),
        roundTripEfficiency: finite(bess.roundTripEfficiency),
        usableDoD: finite(bess.usableDoD),
        purpose: Array.isArray(bess.purpose) ? bess.purpose.slice() : [],
      },
    });
  }

  if (showGrid) {
    const disconnected = islanded || (grid.mode === "islandable" && scenarioId === "islanded");
    addNode(nodes, {
      id: "grid",
      type: "GRID",
      role: grid.mode || "grid-connected",
      label: "GRID",
      electrical: { voltageKV: finite(project.substation?.primaryKV) },
      state: disconnected ? "DISCONNECTED" : "ACTIVE",
      validation: issuesFor(derived, "grid", "grid"),
      metadata: {
        mode: grid.mode,
        strength: grid.strength || null,
        importAllowed: grid.importAllowed === true,
        exportAllowed: grid.exportAllowed === true,
        islandable: grid.mode === "islandable" || grid.islandable === true,
        flow,
      },
    });
  }

  if (subOn) {
    const sub = project.substation;
    const pri = finite(sub.primaryKV);
    const sec = finite(sub.secondaryKV);
    const ter = finite(sub.tertiaryKV);
    addNode(nodes, {
      id: "transformer",
      type: "TRANSFORMER",
      role: transformerRole(pri, sec),
      label: "TR-01",
      electrical: {
        voltageKV: pri,
        voltageSecondaryKV: sec,
        voltageTertiaryKV: ter,
        apparentPowerMVA: finite(sub.transformerMVA),
        activePowerMW: finite(d.activeCapacityMW),
      },
      state: "ACTIVE",
      validation: issuesFor(derived, "substation", "transformer"),
      metadata: {
        transformerCount: finite(sub.transformerCount),
        totalMVA: finite(d.transformerTotalMVA) ?? (isFiniteNumber(sub.transformerTotalMVA) ? sub.transformerTotalMVA : null),
        utilizationFactor: finite(sub.utilizationFactor),
        operationalCapacityMW: finite(d.operationalCapacityMW),
        redundancyMode: sub.redundancyMode || null,
        nMinusOneCapacityMVA: finite(d.nMinusOneCapacityMVA),
        nMinusOneCapacityMW: finite(d.nMinusOneCapacityMW),
      },
    });
    addNode(nodes, {
      id: "substation",
      type: "SUBSTATION",
      role: sub.topology || null,
      label: sub.type ? `Substation ${sub.type}` : "Substation",
      electrical: {
        voltageKV: pri,
        apparentPowerMVA: finite(d.transformerTotalMVA) ?? finite(sub.transformerTotalMVA),
      },
      state: "ACTIVE",
      metadata: { busConfiguration: sub.busConfiguration || null, type: sub.type || null },
    });
    if (isFinitePositive(pri)) {
      addNode(nodes, {
        id: "bus-hv",
        type: "BUS",
        role: "hv-bus",
        label: "BUS",
        electrical: { voltageKV: pri },
        state: "ACTIVE",
        metadata: { layerHint: classifyVoltageDomain(pri) },
      });
    }
    if (isFinitePositive(sec)) {
      addNode(nodes, {
        id: "bus-mv",
        type: "BUS",
        role: "mv-bus",
        label: "BUS",
        electrical: { voltageKV: sec },
        state: "ACTIVE",
        metadata: { layerHint: classifyVoltageDomain(sec) },
      });
    }
  }

  const visibleFeeders = collapseFeeders
    ? []
    : feeders;
  if (collapseFeeders && feeders.length) {
    addNode(nodes, {
      id: "feeder-group",
      type: "FEEDER",
      role: "group",
      label: `Feeders (${feeders.length})`,
      electrical: {
        voltageKV: finite(feeders[0]?.voltageKV),
        activePowerMW: feeders.reduce((s, f) => s + (finite(f.estimatedLoadMW) || 0), 0) || null,
      },
      state: "ACTIVE",
      metadata: { collapsed: true, members: feeders.map((f, i) => f.name || `feeder-${i + 1}`) },
    });
    groups.push({ id: "feeders", type: "feeders", collapsed: true, members: feeders.map((_, i) => `feeder-${i + 1}`) });
  } else {
    visibleFeeders.forEach((f, i) => {
      const future = declaredFuture(f);
      addNode(nodes, {
        id: `feeder-${i + 1}`,
        type: "FEEDER",
        role: f.role || "distribution",
        label: f.name || `Feeder ${i + 1}`,
        electrical: {
          voltageKV: finite(f.voltageKV),
          activePowerMW: finite(f.estimatedLoadMW),
        },
        state: future ? "FUTURE" : "ACTIVE",
        validation: issuesFor(derived, "feeders", `feeder-${i + 1}`),
        metadata: { lengthKM: finite(f.lengthKM), lossesPercent: finite(f.lossesPercent), index: i },
      });
    });
  }

  if (!subOn && showGrid && hasLoad) {
    const lv = project.installation?.voltageNominalV;
    addNode(nodes, {
      id: "bus-lv",
      type: "BUS",
      role: "main-distribution",
      label: "Main distribution",
      electrical: { voltageKV: isFinitePositive(lv) ? lv / 1000 : 0.4 },
      state: "ACTIVE",
      metadata: { inferred: true, layerHint: "LV" },
    });
  }

  if (hasLoad) {
    if (grouping === "individual" && items.length) {
      items.forEach((load) => {
        const w = pickNominalPowerW(load);
        const st = operationalState(loadStates[load.id] || load.state, "OFF");
        addNode(nodes, {
          id: `load-${load.id}`,
          type: "LOAD",
          role: load.category || "load",
          label: load.name || load.id,
          electrical: {
            voltageKV: isFinitePositive(load.voltageV)
              ? load.voltageV >= 50
                ? load.voltageV / 1000
                : load.voltageV
              : finite(project.installation?.voltageNominalV)
                ? project.installation.voltageNominalV / 1000
                : null,
            activePowerMW: w == null ? null : (w * (Number.isFinite(load.quantity) ? load.quantity : 1)) / 1e6,
            currentA: finite(pickRangeValue(load.runCurrentA)),
          },
          state: st,
          validation: issuesFor(derived, "load", load.id),
          metadata: {
            loadId: load.id,
            category: load.category,
            inrushA: finite(pickRangeValue(load.inrushCurrentA)),
            inrushDuration: finite(pickRangeValue(load.inrushDurationSeconds)),
            quantity: load.quantity ?? 1,
          },
        });
      });
    } else if (grouping === "grouped" && items.length) {
      for (const [cat, members] of groupLoads(items)) {
        const watts = members.reduce((s, l) => {
          const w = pickNominalPowerW(l);
          const q = Number.isFinite(l.quantity) ? l.quantity : 1;
          return s + (w == null ? 0 : w * q);
        }, 0);
        const startingMember = members.find((l) => operationalState(loadStates[l.id] || l.state, "OFF") === "STARTING");
        addNode(nodes, {
          id: `load-group-${cat}`,
          type: "LOAD",
          role: cat,
          label: cat.replace(/-/g, " "),
          electrical: { activePowerMW: watts > 0 ? watts / 1e6 : null, peakLoadMW: watts > 0 ? watts / 1e6 : null },
          state: startingMember ? "STARTING" : "ACTIVE",
          metadata: {
            grouped: true,
            members: members.map((m) => m.id),
            count: members.length,
          },
        });
        groups.push({ id: `grp-${cat}`, type: "loads", collapsed: true, members: members.map((m) => m.id) });
      }
    } else if (hasAggregatedLoad || items.length) {
      const profile = project.loads?.profile || {};
      addNode(nodes, {
        id: "load",
        type: "LOAD",
        role: profile.dominantLoadType || "aggregated",
        label: "LOAD",
        electrical: {
          peakLoadMW: finite(profile.peakLoadMW) ?? peakMW,
          averageLoadMW: finite(profile.averageLoadMW),
          criticalLoadMW: finite(profile.criticalLoadMW),
          activePowerMW: finite(profile.peakLoadMW) ?? peakMW,
          voltageKV: finite(project.substation?.secondaryKV) ??
            (finite(project.installation?.voltageNominalV) ? project.installation.voltageNominalV / 1000 : null),
        },
        state: starting.length ? "STARTING" : "ACTIVE",
        validation: issuesFor(derived, "load", "load"),
        metadata: { aggregated: true },
      });
    }
  }

  if (collapseFeeders && nodes.some((n) => n.id === "feeder-group")) {
    // treated as a feeder node in connections via id feeder-group
  }

  const ids = new Set(nodes.map((n) => n.id));
  if (ids.has("feeder-group")) {
    ids.add("feeder-group");
  }

  let connections = declaredConnections(project, ids);
  let origin = "declared";
  if (!connections) {
    const inferIds = new Set(ids);
    if (ids.has("feeder-group")) {
      /* map group as a single feeder target */
    }
    connections = inferArchitectureConnections(inferIds, project, flow);
    if (ids.has("feeder-group")) {
      const parent = ids.has("bus-mv") ? "bus-mv" : ids.has("transformer") ? "transformer" : ids.has("bus-lv") ? "bus-lv" : null;
      if (parent) {
        connections.push({
          id: "c-parent-feeder-group",
          from: parent,
          to: "feeder-group",
          type: "feeder",
          origin: "inferred-architecture",
          direction: "unknown",
          state: "existing",
          voltageKV: finite(feeders[0]?.voltageKV),
          powerFlow: null,
        });
      }
      if (ids.has("load")) {
        connections.push({
          id: "c-feeder-group-load",
          from: "feeder-group",
          to: "load",
          type: "feeder",
          origin: "inferred-architecture",
          direction: "unknown",
          state: "existing",
          voltageKV: finite(feeders[0]?.voltageKV),
          powerFlow: null,
        });
      }
    }
    origin = "inferred-architecture";
  }

  const edges = [];
  for (const c of connections) {
    if (c.unresolved) {
      notices.push({ code: "UNRESOLVED_CONNECTION", message: `Connection ${c.from} → ${c.to} references a missing node.` });
      continue;
    }
    if (!ids.has(c.from) || !ids.has(c.to)) continue;
    edges.push(
      createEdge({
        id: c.id.replace(/^c-/, "e-"),
        source: c.from,
        target: c.to,
        type: c.type,
        voltageKV: c.voltageKV ?? null,
        direction: c.direction || "unknown",
        state: c.state || "existing",
        powerFlow: c.powerFlow ?? null,
        metadata: { origin: c.origin, connectionId: c.id },
      })
    );
  }

  const isolated = nodes.filter((n) => {
    const deg = edges.filter((e) => e.source === n.id || e.target === n.id).length;
    return deg === 0;
  });
  if (isolated.length && nodes.length > 1) {
    notices.push({
      code: "INCOMPLETE_TOPOLOGY",
      message: "Connection topology incomplete.",
      nodes: isolated.map((n) => n.id),
    });
  }

  const graph = {
    nodes,
    edges,
    groups,
    connections,
    voltageDomains: voltageDomainsFrom(nodes, edges),
    metadata: {
      notices,
      flow,
      starting,
      redundancy:
        subOn && project.substation?.redundancyMode === "N-1"
          ? {
              normalMVA: finite(d.transformerTotalMVA) ?? finite(project.substation.transformerTotalMVA),
              n1MVA: finite(d.nMinusOneCapacityMVA),
              normalMW: finite(d.activeCapacityMW),
              n1MW: finite(d.nMinusOneCapacityMW),
            }
          : null,
      completeness: null,
      connectionOrigin: origin,
      grouping,
      scenarioId: scenarioId || null,
    },
    flow,
    redundancy: null,
  };
  graph.metadata.completeness = calculateGraphCompleteness(graph);
  graph.redundancy = graph.metadata.redundancy;
  const siteId = project.geospatial?.activeSiteId || null;
  graph.metadata.siteId = siteId;
  if (siteId) {
    for (const n of graph.nodes) {
      n.metadata = { ...(n.metadata || {}), siteId };
    }
  }
  void cloneJson;
  return graph;
}
