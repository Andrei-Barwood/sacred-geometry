/**
 * Adapter: SACRED view uses the same canonical graph, different layout.
 */
import { layoutSacredGraph } from "../graph/index.js";
import { renderLaidOutGraph } from "../svg/renderer.js";

export function renderSacredView(svg, graph, options = {}) {
  if (!svg) return null;
  const viewport = options.viewport || {
    width: svg.clientWidth || 1000,
    height: svg.clientHeight || 640,
    sacredMode: options.sacredMode || "CONCENTRIC",
    decoration: options.decoration || "GEOMETRIC",
  };
  const layout = layoutSacredGraph(graph, viewport);
  renderLaidOutGraph(svg, layout, {
    ...options,
    viewportMode: layout.viewport.mode,
    graphMetadata: graph?.metadata,
    summary: options.summary,
  });
  return layout;
}
