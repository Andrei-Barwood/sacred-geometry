/**
 * Adapter: SYSTEM view uses the shared graph engine renderer.
 */
import { layoutSystemGraph } from "../graph/index.js";
import { renderLaidOutGraph } from "../svg/renderer.js";

export function renderSystemView(svg, graph, options = {}) {
  if (!svg) return null;
  const viewport = options.viewport || {
    width: svg.clientWidth || 1000,
    height: svg.clientHeight || 640,
  };
  const layout = layoutSystemGraph(graph, viewport);
  renderLaidOutGraph(svg, layout, {
    ...options,
    viewportMode: layout.viewport.mode,
    graphMetadata: graph?.metadata,
    summary: options.summary,
  });
  return layout;
}
