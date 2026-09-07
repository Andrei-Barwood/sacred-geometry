/**
 * SVG markup from graph layouts. Escaped text. No DOM required.
 */

import { formatNodeLabel } from "../graph/format.js";
import { layoutSacredGraph, layoutSystemGraph } from "../graph/index.js";

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pathFrom(points) {
  if (!points?.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
  return d;
}

export function svgFromLayout(layout, options = {}) {
  if (!layout?.nodes?.length) return "";
  const w = layout.bounds?.width || 1000;
  const h = layout.bounds?.height || 640;
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" class="report-svg" aria-label="${esc(options.aria || "Architecture diagram")}">`,
    `<title>${esc(options.title || "Architecture")}</title>`,
    `<desc>${esc(options.desc || "")}</desc>`,
  ];
  for (const d of layout.decorative || []) {
    if (d.type === "circle") {
      parts.push(
        `<circle cx="${d.cx}" cy="${d.cy}" r="${d.r}" fill="none" stroke="#9C9AAD" stroke-width="1" opacity="0.4" aria-hidden="true"/>`
      );
    }
  }
  for (const e of layout.edges || []) {
    const d = pathFrom(e.layout?.points);
    if (!d) continue;
    parts.push(`<path d="${esc(d)}" fill="none" stroke="#325394" stroke-width="1.4" opacity="0.7"/>`);
  }
  for (const n of layout.nodes) {
    const x = n.layout.x;
    const y = n.layout.y;
    const bw = n.layout.width;
    const bh = n.layout.height;
    parts.push(`<g transform="translate(${x} ${y})">`);
    if (n.type === "TRANSFORMER") {
      parts.push(`<circle cx="-12" cy="0" r="16" fill="#e8f6fa" stroke="#2aa8c7"/>`);
      parts.push(`<circle cx="12" cy="0" r="16" fill="#e8f6fa" stroke="#2aa8c7"/>`);
    } else if (n.type === "BUS") {
      parts.push(
        `<rect x="${-bw / 2}" y="${-bh / 2}" width="${bw}" height="${bh}" rx="2" fill="#f7e9f2" stroke="#c23a8a"/>`
      );
    } else {
      parts.push(`<rect x="${-bw / 2}" y="${-bh / 2}" width="${bw}" height="${bh}" rx="8" fill="#f4f6fb" stroke="#325394"/>`);
    }
    parts.push(`</g>`);
    const label = formatNodeLabel(n, { density: "desktop" });
    const lines = label.lines || [n.label];
    lines.forEach((line, i) => {
      parts.push(
        `<text x="${x}" y="${y + bh / 2 + 12 + i * 11}" text-anchor="middle" font-size="10" font-family="Inter, sans-serif" fill="#101C2F">${esc(line)}</text>`
      );
    });
  }
  parts.push("</svg>");
  return parts.join("");
}

export function buildDiagrams(graph, options, summaryText) {
  const diagrams = { systemSvg: null, sacredSvg: null, notices: [] };
  const viewport = { width: 1000, height: 640 };
  try {
    if (options.includeSystemView !== false) {
      const sys = layoutSystemGraph(graph, viewport);
      diagrams.systemSvg = svgFromLayout(sys, {
        title: "SYSTEM",
        desc: summaryText,
        aria: "Conceptual electrical architecture",
      });
    }
  } catch {
    diagrams.notices.push("SYSTEM diagram unavailable.");
  }
  try {
    if (options.includeSacredView) {
      const sac = layoutSacredGraph(graph, { ...viewport, decoration: "GEOMETRIC" });
      diagrams.sacredSvg = svgFromLayout(sac, {
        title: "SACRED",
        desc: summaryText,
        aria: "Geometric representation of the same topology",
      });
    }
  } catch {
    diagrams.notices.push("SACRED diagram unavailable.");
  }
  return diagrams;
}
