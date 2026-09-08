/**
 * Native SVG renderer for SYSTEM and SACRED layouts.
 * createElementNS + textContent only. No innerHTML. No <script>.
 */

import { formatNodeLabel, formatEdgeLabel, textualArchitectureSummary } from "../graph/format.js";
import { classifyVoltageDomain } from "../graph/model.js";

const SVG_NS = "http://www.w3.org/2000/svg";

function el(name, attrs = {}) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "text") {
      node.textContent = String(v);
      continue;
    }
    node.setAttribute(k, String(v));
  }
  return node;
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function typeClass(type) {
  return String(type || "unknown").toLowerCase().replace(/_/g, "-");
}

function edgePath(points) {
  if (!points || !points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
  return d;
}

function nodeShape(g, node) {
  const w = node.layout.width;
  const h = node.layout.height;
  const type = node.type;
  const cls = "architecture-shape";
  if (type === "TRANSFORMER") {
    g.appendChild(el("circle", { cx: -12, cy: 0, r: Math.min(h, w) / 2.6, class: cls }));
    g.appendChild(el("circle", { cx: 12, cy: 0, r: Math.min(h, w) / 2.6, class: cls }));
    return;
  }
  if (type === "BUS") {
    g.appendChild(el("rect", { x: -w / 2, y: -h / 2, width: w, height: h, rx: 2, class: `${cls} architecture-bus` }));
    return;
  }
  if (type === "BESS") {
    g.appendChild(el("rect", { x: -w / 2, y: -h / 2, width: w, height: h, rx: 6, class: cls }));
    return;
  }
  if (type === "GRID") {
    g.appendChild(el("polygon", { points: `0,${-h / 2} ${w / 2},${-h / 8} ${w / 3},${h / 2} ${-w / 3},${h / 2} ${-w / 2},${-h / 8}`, class: cls }));
    return;
  }
  if (type === "PV" || type === "WIND") {
    g.appendChild(el("polygon", { points: `0,${-h / 2} ${w / 2},${h / 3} ${-w / 2},${h / 3}`, class: cls }));
    return;
  }
  if (type === "DIESEL") {
    g.appendChild(el("rect", { x: -w / 2, y: -h / 2, width: w, height: h, rx: 4, class: cls }));
    return;
  }
  if (type === "FEEDER") {
    g.appendChild(el("rect", { x: -w / 2, y: -h / 2, width: w, height: h, rx: h / 2, class: cls }));
    return;
  }
  g.appendChild(el("circle", { r: Math.min(w, h) / 2, class: cls }));
}

function badge(g, kind, x, y) {
  const wrap = el("g", { class: `architecture-badge is-${kind}`, transform: `translate(${x} ${y})` });
  wrap.appendChild(el("circle", { r: 7, class: "architecture-badge-bg" }));
  if (kind === "error") {
    wrap.appendChild(el("text", { y: 3, "text-anchor": "middle", class: "architecture-badge-text", text: "!" }));
  } else if (kind === "warning") {
    wrap.appendChild(el("text", { y: 3, "text-anchor": "middle", class: "architecture-badge-text", text: "!" }));
  } else if (kind === "starting") {
    wrap.appendChild(el("text", { y: 3, "text-anchor": "middle", class: "architecture-badge-text", text: "S" }));
  }
  g.appendChild(wrap);
}

function arrowMarker(defs, id) {
  const m = el("marker", {
    id,
    viewBox: "0 0 10 10",
    refX: "8",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse",
  });
  m.appendChild(el("path", { d: "M 0 0 L 10 5 L 0 10 z", class: "architecture-arrow" }));
  defs.appendChild(m);
}

function hatch(defs) {
  const p = el("pattern", { id: "arch-error-hatch", width: "6", height: "6", patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" });
  p.appendChild(el("line", { x1: "0", y1: "0", x2: "0", y2: "6", class: "architecture-hatch" }));
  defs.appendChild(p);
}

/**
 * Render a laid-out graph into an SVG element.
 */
export function renderLaidOutGraph(svg, layout, options = {}) {
  if (!svg) return;
  clear(svg);
  const width = layout?.bounds?.width || 1000;
  const height = layout?.bounds?.height || 640;
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("class", `architecture-graph is-${layout?.view || "system"}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  const graphLike = { nodes: layout?.nodes || [], edges: layout?.edges || [], metadata: options.graphMetadata || {} };
  const titleText =
    layout?.view === "sacred"
      ? "Sacred geometry composition of the same electrical architecture"
      : "Conceptual electrical architecture";
  const descText = options.summary || textualArchitectureSummary(graphLike);
  svg.setAttribute("aria-labelledby", "arch-title arch-desc");
  const title = el("title", { id: "arch-title", text: titleText });
  const desc = el("desc", { id: "arch-desc", text: descText });
  svg.appendChild(title);
  svg.appendChild(desc);

  if (!layout || !layout.nodes) {
    svg.appendChild(el("text", { x: width / 2, y: height / 2, "text-anchor": "middle", class: "architecture-empty", text: "Architecture visualization unavailable." }));
    return;
  }

  const defs = el("defs");
  arrowMarker(defs, "arch-arrow");
  hatch(defs);
  svg.appendChild(defs);

  const gDeco = el("g", { class: "decorative architecture-decorative", "aria-hidden": "true", "pointer-events": "none" });
  for (const d of layout.decorative || []) {
    if (d.type === "circle") {
      gDeco.appendChild(el("circle", { cx: d.cx, cy: d.cy, r: d.r, class: d.className || "sacred-guide", fill: "none" }));
    } else if (d.type === "line") {
      gDeco.appendChild(el("line", { x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2, class: d.className || "sacred-guide" }));
    }
  }
  svg.appendChild(gDeco);

  const gEdges = el("g", { class: "edges architecture-edges" });
  const density = options.viewportMode || layout.viewport?.mode || "desktop";
  for (const e of layout.edges || []) {
    const d = edgePath(e.layout?.points);
    if (!d) continue;
    const showArrow = e.direction && e.direction !== "unknown" && e.direction !== "bidirectional";
    const path = el("path", {
      d,
      class: `architecture-edge is-${e.type} is-${e.state || "existing"}`,
      fill: "none",
      "data-edge-id": e.id,
      "data-source": e.source,
      "data-target": e.target,
      tabindex: e.type === "feeder" ? "0" : null,
      "marker-end": showArrow ? "url(#arch-arrow)" : null,
    });
    gEdges.appendChild(path);
    const label = formatEdgeLabel(e, { compact: density === "mobile" });
    if (label && e.type === "feeder" && e.layout?.points?.length) {
      const pts = e.layout.points;
      const mid = pts[Math.floor(pts.length / 2)];
      gEdges.appendChild(
        el("text", {
          x: mid.x,
          y: mid.y - 6,
          class: "architecture-edge-label",
          "text-anchor": "middle",
          text: label,
        })
      );
    }
  }
  svg.appendChild(gEdges);

  const gNodes = el("g", { class: "nodes architecture-nodes" });
  const gLabels = el("g", { class: "labels architecture-labels" });
  const gOver = el("g", { class: "overlays architecture-overlays" });
  const selectedId = options.selectedId || null;
  const focusId = options.focusId || null;
  const focusNeighbors = options.focusNeighbors || null;

  for (const node of layout.nodes) {
    const dim =
      focusId && focusNeighbors
        ? node.id !== focusId && !focusNeighbors.includes(node.id)
        : false;
    const g = el("g", {
      class: [
        "architecture-node",
        `is-${typeClass(node.type)}`,
        `is-${String(node.state || "ACTIVE").toLowerCase()}`,
        node.role === "backup" ? "is-backup" : "",
        selectedId === node.id ? "is-selected" : "",
        dim ? "is-dimmed" : "",
      ]
        .filter(Boolean)
        .join(" "),
      transform: `translate(${node.layout.x} ${node.layout.y})`,
      "data-node-id": node.id,
      "data-node-type": node.type,
      tabindex: "0",
      role: "button",
      "aria-label": formatNodeLabel(node, { density }).title,
    });
    nodeShape(g, node);
    if (node.validation?.errors?.length) {
      g.appendChild(el("rect", { x: -node.layout.width / 2, y: -node.layout.height / 2, width: node.layout.width, height: node.layout.height, fill: "url(#arch-error-hatch)", class: "architecture-error-fill", "pointer-events": "none" }));
    }
    gNodes.appendChild(g);

    const labels = formatNodeLabel(node, { density });
    const text = el("text", {
      x: node.layout.x,
      y: node.layout.y + node.layout.height / 2 + 12,
      class: "architecture-label",
      "text-anchor": "middle",
    });
    labels.lines.forEach((line, i) => {
      text.appendChild(
        el("tspan", {
          x: node.layout.x,
          dy: i === 0 ? 0 : 11,
          text: line,
        })
      );
    });
    gLabels.appendChild(text);

    const bx = node.layout.x + node.layout.width / 2 - 4;
    const by = node.layout.y - node.layout.height / 2 + 4;
    if (node.validation?.errors?.length) badge(gOver, "error", bx, by);
    else if (node.validation?.warnings?.length) badge(gOver, "warning", bx, by);
    if (node.state === "STARTING") badge(gOver, "starting", bx - 16, by);
  }

  svg.appendChild(gNodes);
  svg.appendChild(gLabels);
  svg.appendChild(gOver);

  if (options.debug) {
    const dbg = el("g", { class: "architecture-debug", "aria-hidden": "true" });
    for (const n of layout.nodes) {
      dbg.appendChild(
        el("text", {
          x: n.layout.x,
          y: n.layout.y - n.layout.height / 2 - 4,
          class: "architecture-debug-label",
          "text-anchor": "middle",
          text: `${n.id} r${n.layout.ring ?? "-"}`,
        })
      );
    }
    svg.appendChild(dbg);
  }
}

export function bindGraphInteractions(svg, handlers = {}) {
  if (!svg) return () => {};
  const onClick = (ev) => {
    const node = ev.target.closest?.("[data-node-id]");
    const edge = ev.target.closest?.("[data-edge-id]");
    if (node) handlers.onNodeSelect?.(node.getAttribute("data-node-id"));
    else if (edge) handlers.onEdgeSelect?.(edge.getAttribute("data-edge-id"));
    else handlers.onBackground?.();
  };
  const onKey = (ev) => {
    const node = ev.target.closest?.("[data-node-id]");
    if (!node) return;
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      handlers.onNodeSelect?.(node.getAttribute("data-node-id"));
    }
    if (ev.key === "Escape") handlers.onEscape?.();
  };
  svg.addEventListener("click", onClick);
  svg.addEventListener("keydown", onKey);
  return () => {
    svg.removeEventListener("click", onClick);
    svg.removeEventListener("keydown", onKey);
  };
}

export { textualArchitectureSummary };
