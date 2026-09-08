/**
 * Layout engines. Consume a canonical graph; never mutate it.
 * Same graph + same viewport + same mode => same coordinates.
 */

import { SYSTEM_LAYERS, classifyVoltageDomain } from "./model.js";

export function viewportMode(viewport = {}) {
  const w = viewport.width || 1000;
  if (w >= 1200) return "desktop-wide";
  if (w >= 900) return "desktop";
  if (w >= 600) return "tablet";
  return "mobile";
}

export function nodeSize(node, mode) {
  if (node.type === "BUS") {
    return { width: mode === "mobile" ? 160 : 220, height: 22 };
  }
  if (node.type === "TRANSFORMER") return { width: 96, height: 70 };
  if (node.type === "BESS") return { width: 100, height: 64 };
  if (node.type === "GRID") return { width: 88, height: 60 };
  if (node.type === "FEEDER") return { width: 90, height: 48 };
  if (node.type === "LOAD") return { width: 92, height: 52 };
  return { width: 88, height: 56 };
}

export function assignSystemLayer(node) {
  if (node.type === "PV" || node.type === "WIND" || node.type === "OTHER_GENERATION") return "generation";
  if (node.type === "DIESEL") return "generation";
  if (node.type === "GRID") return "generation";
  if (node.type === "BUS") {
    const cls = classifyVoltageDomain(node.electrical?.voltageKV) || node.metadata?.layerHint;
    if (cls === "HV" || cls === "EHV") return "hv";
    if (cls === "LV" || node.role === "main-distribution") return "loads";
    return "mv";
  }
  if (node.type === "TRANSFORMER" || node.type === "SUBSTATION" || node.type === "BESS") return "transformation";
  if (node.type === "FEEDER") return "distribution";
  if (node.type === "LOAD") return "loads";
  return "transformation";
}

function sortNodes(nodes) {
  return nodes.slice().sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return String(a.id).localeCompare(String(b.id));
  });
}

function orthogonalPoints(x1, y1, x2, y2) {
  if (Math.abs(x1 - x2) < 1 || Math.abs(y1 - y2) < 1) {
    return [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ];
  }
  const midY = (y1 + y2) / 2;
  return [
    { x: x1, y: y1 },
    { x: x1, y: midY },
    { x: x2, y: midY },
    { x: x2, y: y2 },
  ];
}

function boxesOverlap(a, b, pad = 4) {
  return !(
    a.x + a.width / 2 + pad < b.x - b.width / 2 ||
    b.x + b.width / 2 + pad < a.x - a.width / 2 ||
    a.y + a.height / 2 + pad < b.y - b.height / 2 ||
    b.y + b.height / 2 + pad < a.y - a.height / 2
  );
}

function resolveCollisions(placed) {
  const out = placed.map((p) => ({ ...p }));
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        if (!boxesOverlap(out[i], out[j], 8)) continue;
        const dx = out[j].x - out[i].x;
        const nudge = (out[i].width + out[j].width) / 2 + 12 - Math.abs(dx);
        if (nudge > 0) {
          const dir = dx >= 0 ? 1 : -1;
          out[j] = { ...out[j], x: out[j].x + dir * (nudge / 2) };
          out[i] = { ...out[i], x: out[i].x - dir * (nudge / 2) };
        }
      }
    }
  }
  return out;
}

function finiteCoord(n) {
  return typeof n === "number" && Number.isFinite(n);
}

export function degreeMap(graph) {
  const d = new Map((graph.nodes || []).map((n) => [n.id, 0]));
  for (const e of graph.edges || []) {
    if (d.has(e.source)) d.set(e.source, d.get(e.source) + 1);
    if (d.has(e.target)) d.set(e.target, d.get(e.target) + 1);
  }
  return d;
}

export function adjacency(graph) {
  const adj = new Map((graph.nodes || []).map((n) => [n.id, []]));
  for (const e of graph.edges || []) {
    if (!adj.has(e.source) || !adj.has(e.target)) continue;
    adj.get(e.source).push(e.target);
    adj.get(e.target).push(e.source);
  }
  return adj;
}

export function graphDistance(graph, centerId) {
  const adj = adjacency(graph);
  const dist = new Map((graph.nodes || []).map((n) => [n.id, Infinity]));
  if (!dist.has(centerId)) return dist;
  dist.set(centerId, 0);
  const q = [centerId];
  while (q.length) {
    const cur = q.shift();
    for (const nb of adj.get(cur) || []) {
      if (dist.get(nb) === Infinity) {
        dist.set(nb, dist.get(cur) + 1);
        q.push(nb);
      }
    }
  }
  return dist;
}

export function selectSacredCenter(graph) {
  const nodes = graph?.nodes || [];
  if (!nodes.length) return null;
  const prefer = ["bus-mv", "bus-hv", "bus-lv", "transformer", "substation"];
  for (const id of prefer) {
    if (nodes.some((n) => n.id === id)) return id;
  }
  const bus = nodes.find((n) => n.type === "BUS");
  if (bus) return bus.id;
  const deg = degreeMap(graph);
  let best = nodes[0].id;
  let bestD = -1;
  for (const n of nodes) {
    const d = deg.get(n.id) || 0;
    if (d > bestD || (d === bestD && n.id.localeCompare(best) < 0)) {
      best = n.id;
      bestD = d;
    }
  }
  return best;
}

export function traceElectricalPath(graph, nodeId) {
  const adj = adjacency(graph);
  if (!adj.has(nodeId)) return { nodeId, connected: [], upstream: [], downstream: [] };
  const neighbors = (adj.get(nodeId) || []).slice().sort();
  const edges = (graph.edges || []).filter((e) => e.source === nodeId || e.target === nodeId);
  const upstream = [];
  const downstream = [];
  for (const e of edges) {
    if (e.direction === "unknown" || e.direction === "bidirectional") continue;
    if (e.direction === "forward" && e.source === nodeId) downstream.push(e.target);
    if (e.direction === "forward" && e.target === nodeId) upstream.push(e.source);
    if (e.direction === "reverse" && e.source === nodeId) upstream.push(e.target);
    if (e.direction === "reverse" && e.target === nodeId) downstream.push(e.source);
  }
  return {
    nodeId,
    connected: neighbors,
    upstream: upstream.sort(),
    downstream: downstream.sort(),
    canLabelFlow: upstream.length + downstream.length > 0,
  };
}

function copyNode(n, layout) {
  return { ...n, electrical: { ...n.electrical }, metadata: { ...n.metadata }, layout };
}

function copyEdge(e, layout) {
  return { ...e, metadata: { ...e.metadata }, layout };
}

export function layoutSystemGraph(graph, viewport = {}) {
  const width = Math.max(320, viewport.width || 1000);
  const height = Math.max(360, viewport.height || 640);
  const mode = viewport.mode || viewportMode({ width });
  const padX = mode === "mobile" ? 48 : 70;
  const padY = 48;
  const nodes = sortNodes(graph?.nodes || []);
  const layers = new Map(SYSTEM_LAYERS.map((l) => [l, []]));
  for (const n of nodes) {
    const layer = assignSystemLayer(n);
    layers.get(layer).push(n);
  }
  const activeLayers = SYSTEM_LAYERS.filter((l) => layers.get(l).length);
  const layerGap = activeLayers.length > 1 ? (height - padY * 2) / Math.max(activeLayers.length - 1, 1) : 0;
  const vertical = mode === "mobile" || mode === "tablet";

  let placed = [];
  if (vertical || true) {
    activeLayers.forEach((layerName, li) => {
      const list = layers.get(layerName);
      const y = padY + 20 + li * (activeLayers.length === 1 ? 0 : layerGap);
      const innerW = width - padX * 2;
      list.forEach((n, i) => {
        const size = nodeSize(n, mode);
        const x =
          list.length === 1
            ? width / 2
            : padX + (innerW * (i + 0.5)) / list.length;
        placed.push({
          id: n.id,
          x,
          y: n.type === "BUS" ? y : y,
          width: n.type === "BUS" ? Math.min(innerW, Math.max(size.width, 40 + list.length * 24)) : size.width,
          height: size.height,
          layer: layerName,
          node: n,
        });
      });
    });
  }

  placed = resolveCollisions(placed);
  for (const p of placed) {
    p.x = Math.min(width - p.width / 2 - 8, Math.max(p.width / 2 + 8, p.x));
    p.y = Math.min(height - p.height / 2 - 24, Math.max(p.height / 2 + 8, p.y));
  }

  const byId = new Map(placed.map((p) => [p.id, p]));
  const laidNodes = nodes.map((n) => {
    const p = byId.get(n.id);
    return copyNode(n, {
      x: p.x,
      y: p.y,
      width: p.width,
      height: p.height,
      layer: p.layer,
      ring: null,
      depth: null,
    });
  });

  const laidEdges = (graph.edges || []).map((e) => {
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) return copyEdge(e, { points: [] });
    const y1 = a.y + a.height / 2;
    const y2 = b.y - b.height / 2;
    return copyEdge(e, { points: orthogonalPoints(a.x, y1, b.x, y2) });
  });

  const collisions = [];
  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      if (boxesOverlap(placed[i], placed[j], 0)) {
        collisions.push([placed[i].id, placed[j].id]);
      }
    }
  }

  return {
    view: "system",
    viewport: { width, height, mode },
    nodes: laidNodes,
    edges: laidEdges,
    decorative: [],
    collisions,
    bounds: { width, height },
    valid: laidNodes.every((n) => finiteCoord(n.layout.x) && finiteCoord(n.layout.y)),
  };
}

export function layoutSacredGraph(graph, viewport = {}) {
  const width = Math.max(320, viewport.width || 1000);
  const height = Math.max(360, viewport.height || 640);
  const mode = viewport.sacredMode || "CONCENTRIC";
  const decoration = viewport.decoration || "GEOMETRIC";
  const cx = width / 2;
  const cy = height / 2;
  const nodes = sortNodes(graph?.nodes || []);
  if (!nodes.length) {
    return {
      view: "sacred",
      viewport: { width, height, mode },
      nodes: [],
      edges: [],
      decorative: [],
      collisions: [],
      bounds: { width, height },
      valid: true,
      centerId: null,
    };
  }
  const centerId = selectSacredCenter(graph);
  const dist = graphDistance(graph, centerId);
  const maxR = Math.min(width, height) * 0.42;
  const depths = nodes.map((n) => {
    const d = dist.get(n.id);
    return Number.isFinite(d) ? d : 3;
  });
  const maxD = Math.max(1, ...depths);

  const byRing = new Map();
  nodes.forEach((n, i) => {
    const depth = depths[i];
    if (!byRing.has(depth)) byRing.set(depth, []);
    byRing.get(depth).push(n);
  });

  const placed = [];
  for (const [depth, list] of [...byRing.entries()].sort((a, b) => a[0] - b[0])) {
    const radius = depth === 0 ? 0 : (maxR * depth) / maxD;
    const sorted = sortNodes(list);
    const slice = (Math.PI * 2) / Math.max(sorted.length, 1);
    const start = -Math.PI / 2;
    sorted.forEach((n, i) => {
      const angle = mode === "RADIAL" ? start + i * slice : start + (i + 0.5) * slice;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      const size = nodeSize(n, viewportMode({ width }));
      placed.push({
        id: n.id,
        x,
        y,
        width: size.width * 0.9,
        height: size.height * 0.9,
        ring: depth,
        depth,
        angle,
        node: n,
      });
    });
  }

  const byId = new Map(placed.map((p) => [p.id, p]));
  const laidNodes = nodes.map((n) => {
    const p = byId.get(n.id);
    return copyNode(n, {
      x: p.x,
      y: p.y,
      width: p.width,
      height: p.height,
      layer: null,
      ring: p.ring,
      depth: p.depth,
      angle: p.angle,
    });
  });

  const laidEdges = (graph.edges || []).map((e) => {
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) return copyEdge(e, { points: [] });
    const points =
      mode === "RADIAL"
        ? [
            { x: a.x, y: a.y },
            { x: b.x, y: b.y },
          ]
        : [
            { x: a.x, y: a.y },
            { x: (a.x + cx) / 2 + (b.x + cx) / 4 - cx / 4, y: (a.y + cy) / 2 + (b.y + cy) / 4 - cy / 4 },
            { x: b.x, y: b.y },
          ];
    return copyEdge(e, { points });
  });

  const decorative = [];
  if (decoration !== "MINIMAL") {
    for (let r = 1; r <= maxD; r++) {
      decorative.push({
        type: "circle",
        cx,
        cy,
        r: (maxR * r) / maxD,
        className: "sacred-guide architecture-guide",
      });
    }
    if (decoration === "FULL") {
      const spokes = Math.max(6, nodes.length);
      for (let i = 0; i < spokes; i++) {
        const a = -Math.PI / 2 + (i * Math.PI * 2) / spokes;
        decorative.push({
          type: "line",
          x1: cx,
          y1: cy,
          x2: cx + Math.cos(a) * maxR,
          y2: cy + Math.sin(a) * maxR,
          className: "sacred-guide architecture-guide",
        });
      }
    }
  }

  return {
    view: "sacred",
    viewport: { width, height, mode, decoration },
    nodes: laidNodes,
    edges: laidEdges,
    decorative,
    collisions: [],
    bounds: { width, height },
    valid: laidNodes.every((n) => finiteCoord(n.layout.x) && finiteCoord(n.layout.y)),
    centerId,
  };
}

export function layoutGraph(graph, view, viewport) {
  if (view === "sacred") return layoutSacredGraph(graph, viewport);
  return layoutSystemGraph(graph, viewport);
}

export function applyStablePositions(nextLayout, prevLayout) {
  if (!prevLayout?.nodes?.length) return nextLayout;
  const prev = new Map(prevLayout.nodes.map((n) => [n.id, n.layout]));
  return {
    ...nextLayout,
    nodes: nextLayout.nodes.map((n) => {
      const p = prev.get(n.id);
      if (!p) return n;
      return { ...n, layout: { ...n.layout, x: p.x, y: p.y } };
    }),
  };
}

export function fitBounds(layout, padding = 24) {
  const nodes = layout.nodes || [];
  if (!nodes.length) return { minX: 0, minY: 0, maxX: layout.bounds?.width || 1, maxY: layout.bounds?.height || 1 };
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const n of nodes) {
    minX = Math.min(minX, n.layout.x - n.layout.width / 2);
    maxX = Math.max(maxX, n.layout.x + n.layout.width / 2);
    minY = Math.min(minY, n.layout.y - n.layout.height / 2 - 18);
    maxY = Math.max(maxY, n.layout.y + n.layout.height / 2 + 22);
  }
  return {
    minX: minX - padding,
    minY: minY - padding,
    maxX: maxX + padding,
    maxY: maxY + padding,
  };
}
