/**
 * Canonical graph validation. Does not mutate the graph.
 */

import { EDGE_DIRECTIONS, EDGE_TYPES, NODE_STATES, NODE_TYPES, isFiniteNumber } from "./model.js";

export function validateArchitectureGraph(graph) {
  const errors = [];
  const warnings = [];
  const notices = [];
  if (!graph || typeof graph !== "object") {
    return { valid: false, errors: [{ code: "GRAPH_NULL", message: "graph is not an object" }], warnings, notices };
  }
  const nodes = Array.isArray(graph.nodes) ? graph.nodes : [];
  const edges = Array.isArray(graph.edges) ? graph.edges : [];
  const ids = new Set();
  const edgeIds = new Set();

  for (const n of nodes) {
    if (!n || !n.id) {
      errors.push({ code: "NODE_ID", message: "node missing id" });
      continue;
    }
    if (ids.has(n.id)) errors.push({ code: "DUP_NODE", message: `duplicate node id ${n.id}` });
    ids.add(n.id);
    if (!NODE_TYPES.includes(n.type)) {
      errors.push({ code: "NODE_TYPE", message: `invalid node type ${n.type} (${n.id})` });
    }
    if (n.state && !NODE_STATES.includes(n.state)) {
      errors.push({ code: "NODE_STATE", message: `invalid state ${n.state} (${n.id})` });
    }
    const kv = n.electrical?.voltageKV;
    if (kv != null && (!isFiniteNumber(kv) || kv < 0)) {
      errors.push({ code: "VOLTAGE", message: `invalid voltageKV on ${n.id}` });
    }
    if (kv === 0) {
      warnings.push({ code: "VOLTAGE_ZERO", message: `voltageKV is 0 on ${n.id}; null means unknown` });
    }
  }

  for (const e of edges) {
    if (!e || !e.id) {
      errors.push({ code: "EDGE_ID", message: "edge missing id" });
      continue;
    }
    if (edgeIds.has(e.id)) errors.push({ code: "DUP_EDGE", message: `duplicate edge id ${e.id}` });
    edgeIds.add(e.id);
    if (!ids.has(e.source) || !ids.has(e.target)) {
      errors.push({ code: "EDGE_REF", message: `edge ${e.id} references missing node` });
    }
    if (e.source === e.target) {
      errors.push({ code: "SELF_EDGE", message: `unexpected self-connection ${e.id}` });
    }
    if (e.type && !EDGE_TYPES.includes(e.type)) {
      errors.push({ code: "EDGE_TYPE", message: `invalid edge type ${e.type}` });
    }
    if (e.direction && !EDGE_DIRECTIONS.includes(e.direction)) {
      errors.push({ code: "EDGE_DIR", message: `invalid direction ${e.direction}` });
    }
    if (e.voltageKV != null && (!isFiniteNumber(e.voltageKV) || e.voltageKV < 0)) {
      errors.push({ code: "EDGE_V", message: `invalid edge voltage ${e.id}` });
    }
  }

  const degree = new Map([...ids].map((id) => [id, 0]));
  for (const e of edges) {
    if (degree.has(e.source)) degree.set(e.source, degree.get(e.source) + 1);
    if (degree.has(e.target)) degree.set(e.target, degree.get(e.target) + 1);
  }
  for (const n of nodes) {
    if (!n?.id) continue;
    if ((degree.get(n.id) || 0) > 0) continue;
    if (n.state === "FUTURE" || n.metadata?.intentionallyDisconnected) continue;
    warnings.push({ code: "ORPHAN", message: `orphaned node ${n.id}`, nodeId: n.id });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    notices,
    counts: { nodes: nodes.length, edges: edges.length, errors: errors.length, warnings: warnings.length },
  };
}
