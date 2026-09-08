/** Native SVG helpers. No innerHTML. */

export const SVG_NS = "http://www.w3.org/2000/svg";

export function el(name, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "text") {
      node.textContent = String(v);
      continue;
    }
    node.setAttribute(k, String(v));
  }
  for (const child of children) {
    if (child) node.appendChild(child);
  }
  return node;
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function nodeClass(type) {
  return `arch-node arch-node--${type}`;
}

export function edgeClass(type, status) {
  const s = status && status !== "active" ? ` arch-edge--${String(status).toLowerCase()}` : "";
  return `arch-edge arch-edge--${type || "ac"}${s}`;
}

export function wrapLabel(text, max = 18) {
  const lines = String(text || "").split("\n");
  const out = [];
  for (const line of lines) {
    if (line.length <= max) {
      out.push(line);
      continue;
    }
    const words = line.split(" ");
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > max) {
        if (cur) out.push(cur);
        cur = w;
      } else {
        cur = (cur + " " + w).trim();
      }
    }
    if (cur) out.push(cur);
  }
  return out.slice(0, 4);
}

export function multiline(x, y, lines, attrs = {}) {
  const g = el("text", { x, y, "text-anchor": "middle", ...attrs });
  const start = y - ((lines.length - 1) * 12) / 2;
  lines.forEach((line, i) => {
    g.appendChild(
      el("tspan", {
        x,
        y: start + i * 12,
        text: line,
      })
    );
  });
  return g;
}
