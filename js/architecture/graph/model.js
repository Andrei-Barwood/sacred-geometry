/**
 * Canonical architecture graph model. Independent of SVG and layout.
 * Types and roles are electrical semantics, not drawing instructions.
 */

export const NODE_TYPES = Object.freeze([
  "SOURCE",
  "PV",
  "WIND",
  "DIESEL",
  "OTHER_GENERATION",
  "BESS",
  "GRID",
  "TRANSFORMER",
  "BUS",
  "FEEDER",
  "LOAD",
  "SUBSTATION",
  "SWITCH",
  "BREAKER",
  "FUTURE",
  "EXTERNAL",
]);

export const EDGE_TYPES = Object.freeze([
  "electrical",
  "transformer-link",
  "feeder",
  "bus-connection",
  "storage-link",
  "backup-link",
  "future-link",
]);

export const NODE_STATES = Object.freeze([
  "OFF",
  "STANDBY",
  "RUNNING",
  "STARTING",
  "FAULT",
  "FUTURE",
  "UNKNOWN",
  "ACTIVE",
  "DISCONNECTED",
  "INACTIVE",
]);

export const EDGE_DIRECTIONS = Object.freeze(["forward", "reverse", "bidirectional", "unknown"]);

export const EDGE_STATES = Object.freeze(["existing", "future", "inactive", "disconnected", "selected"]);

export const VOLTAGE_CLASSES = Object.freeze(["LV", "MV", "HV", "EHV"]);

export const SYSTEM_LAYERS = Object.freeze([
  "generation",
  "hv",
  "transformation",
  "mv",
  "distribution",
  "loads",
]);

export const SACRED_MODES = Object.freeze(["CONCENTRIC", "RADIAL"]);

export const DECORATION_LEVELS = Object.freeze(["MINIMAL", "GEOMETRIC", "FULL"]);

export const LOAD_GROUPING = Object.freeze(["individual", "grouped", "auto"]);

export const DEFAULT_LOAD_GROUP_THRESHOLD = 8;

/**
 * Graphical classification only. Not a local-code voltage standard.
 * Accepts any positive kV.
 */
export function classifyVoltageDomain(voltageKV) {
  if (voltageKV == null || typeof voltageKV !== "number" || !Number.isFinite(voltageKV) || voltageKV <= 0) {
    return null;
  }
  if (voltageKV < 1) return "LV";
  if (voltageKV < 66) return "MV";
  if (voltageKV < 230) return "HV";
  return "EHV";
}

export function emptyElectrical() {
  return {
    voltageKV: null,
    voltageSecondaryKV: null,
    voltageTertiaryKV: null,
    activePowerMW: null,
    apparentPowerMVA: null,
    energyMWh: null,
    currentA: null,
    frequencyHz: null,
    dcMWp: null,
    durationHours: null,
    averageLoadMW: null,
    criticalLoadMW: null,
    peakLoadMW: null,
  };
}

export function createNode(partial) {
  return {
    id: partial.id,
    type: partial.type,
    role: partial.role || null,
    label: partial.label || partial.type,
    electrical: { ...emptyElectrical(), ...(partial.electrical || {}) },
    state: partial.state || "ACTIVE",
    provenance: partial.provenance || null,
    validation: partial.validation || { errors: [], warnings: [], notices: [] },
    metadata: partial.metadata || {},
  };
}

export function createEdge(partial) {
  return {
    id: partial.id,
    source: partial.source,
    target: partial.target,
    type: partial.type || "electrical",
    voltageKV: partial.voltageKV ?? null,
    direction: partial.direction || "unknown",
    state: partial.state || "existing",
    powerFlow: partial.powerFlow ?? null,
    metadata: partial.metadata || {},
  };
}

export function emptyGraph() {
  return {
    nodes: [],
    edges: [],
    groups: [],
    connections: [],
    voltageDomains: [],
    metadata: {
      notices: [],
      flow: null,
      starting: [],
      redundancy: null,
      completeness: null,
      connectionOrigin: "none",
    },
  };
}

export function isFinitePositive(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function declaredFuture(obj) {
  if (!obj || typeof obj !== "object") return false;
  if (obj.state === "FUTURE" || obj.status === "future" || obj.planned === true || obj.phase === "phase-2") {
    return true;
  }
  const blob = [obj.role, obj.name, obj.phase, obj.notes].filter(Boolean).join(" ");
  return /\bfuture\b|\bphase-2\b|\bplanned\b/i.test(blob);
}

export function semanticNodeSet(graph) {
  return (graph?.nodes || []).map((n) => n.id).slice().sort();
}

export function semanticEdgeSet(graph) {
  return (graph?.edges || [])
    .map((e) => `${e.source}|${e.target}|${e.type}`)
    .slice()
    .sort();
}

export function getTopologySignature(graph) {
  const nodes = (graph?.nodes || []).map((n) => `${n.id}:${n.type}`).sort().join(",");
  const edges = semanticEdgeSet(graph).join(",");
  return `${nodes}||${edges}`;
}
