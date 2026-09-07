/**
 * Sacred Architecture Graph Engine — public API.
 *
 * Project State → buildArchitectureGraph() → Canonical Graph
 *   ├─ layoutSystemGraph() → SYSTEM SVG
 *   └─ layoutSacredGraph() → SACRED SVG
 */

export {
  NODE_TYPES,
  EDGE_TYPES,
  NODE_STATES,
  EDGE_DIRECTIONS,
  VOLTAGE_CLASSES,
  SYSTEM_LAYERS,
  SACRED_MODES,
  DECORATION_LEVELS,
  classifyVoltageDomain,
  emptyGraph,
  getTopologySignature,
  semanticNodeSet,
  semanticEdgeSet,
} from "./model.js";

export {
  buildArchitectureGraph,
  inferTemplateConnections,
  inferArchitectureConnections,
  calculateGraphCompleteness,
} from "./build.js";

export { validateArchitectureGraph } from "./validate.js";

export {
  layoutSystemGraph,
  layoutSacredGraph,
  layoutGraph,
  selectSacredCenter,
  graphDistance,
  traceElectricalPath,
  viewportMode,
  applyStablePositions,
  fitBounds,
  degreeMap,
} from "./layout.js";

export {
  formatNodeLabel,
  formatEdgeLabel,
  textualArchitectureSummary,
  architectureTree,
  nodeDetailsModel,
} from "./format.js";
