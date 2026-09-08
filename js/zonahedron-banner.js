/**
 * Home banner: equal-volume zonahedron dissection (p5.js).
 * Any zonahedron dissects into parallelepipeds, those into cubes;
 * two zonahedra of the same volume dissect one into the other.
 */

const P5_ESM_URL = 'https://cdn.jsdelivr.net/npm/p5@1.9.4/+esm';

const W = 768;
const H = 96;
const CYCLE_MS = 7200;
const CELL_COUNT = 16;

const BG = '#243871';
const FACE_TOP = '#B1E8F2';
const FACE_LEFT = '#2D3558';
const FACE_RIGHT = '#325394';
const FACE_PRISM = '#57C4DD';
const EDGE = '#101C2F';

let p5Promise;

function loadP5() {
  if (!p5Promise) {
    p5Promise = import(P5_ESM_URL).then((mod) => mod.default || mod);
  }
  return p5Promise;
}

function grid(w, h) {
  const cells = [];
  for (let j = 0; j < h; j += 1) {
    for (let i = 0; i < w; i += 1) cells.push([i, j]);
  }
  return cells;
}

function hexagon() {
  return [
    [1, 0], [2, 0], [3, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
    [1, 3], [2, 3], [3, 3],
  ];
}

function diamond() {
  return [
    [2, 0],
    [1, 1], [2, 1], [3, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
    [1, 3], [2, 3], [3, 3],
    [1, 4], [2, 4], [3, 4],
    [2, 5],
  ];
}

function chevron() {
  return [
    [0, 1], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 1], [7, 2],
    [0, 2], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 2], [7, 3],
  ];
}

function stair() {
  return [
    [0, 0],
    [0, 1], [1, 1],
    [0, 2], [1, 2], [2, 2],
    [1, 3], [2, 3], [3, 3],
    [2, 4], [3, 4], [4, 4],
    [3, 5], [4, 5],
    [4, 6], [5, 6],
  ];
}

const FIGURES = [grid(16, 1), grid(8, 2), grid(4, 4), hexagon(), diamond(), chevron(), stair()];

function centroid(cells) {
  let i = 0;
  let j = 0;
  for (const c of cells) {
    i += c[0];
    j += c[1];
  }
  const n = cells.length || 1;
  return [i / n, j / n];
}

function centered(cells) {
  const [ci, cj] = centroid(cells);
  return cells.map(([i, j]) => [i - ci, j - cj]);
}

function shuffle(list, rand) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const k = Math.floor(rand() * (i + 1));
    const tmp = out[i];
    out[i] = out[k];
    out[k] = tmp;
  }
  return out;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
}

function smoothstep(a, b, x) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function project(i, j, k, size) {
  return {
    x: (i - j) * size,
    y: (i + j) * (size * 0.5) - k * size,
  };
}

function drawParallelogram(p, pts, fill, stroke) {
  p.fill(fill);
  p.stroke(stroke);
  p.strokeWeight(0.8);
  p.beginShape();
  for (const pt of pts) p.vertex(pt.x, pt.y);
  p.endShape(p.CLOSE);
}

function drawCell(p, x, y, size, cube, shear) {
  const sx = size;
  const sy = size * 0.5;
  const h = size * cube;
  const sh = shear * size * 0.35;

  const top = [
    { x: x, y: y - h },
    { x: x + sx + sh, y: y + sy - h },
    { x: x, y: y + size - h },
    { x: x - sx + sh, y: y + sy - h },
  ];

  if (cube > 0.04) {
    const left = [
      { x: x - sx + sh, y: y + sy - h },
      { x: x, y: y + size - h },
      { x: x, y: y + size },
      { x: x - sx, y: y + sy },
    ];
    const right = [
      { x: x + sx + sh, y: y + sy - h },
      { x: x, y: y + size - h },
      { x: x, y: y + size },
      { x: x + sx, y: y + sy },
    ];
    drawParallelogram(p, left, FACE_LEFT, EDGE);
    drawParallelogram(p, right, FACE_RIGHT, EDGE);
  }

  const fill = cube > 0.5 ? FACE_TOP : FACE_PRISM;
  drawParallelogram(p, top, fill, EDGE);
}

function cyclePhase(u) {
  // hold zonogon → split to parallelepipeds → extrude cubes → travel → flatten
  if (u < 0.14) return { t: 0, split: 0, cube: 0 };
  if (u < 0.32) {
    const t = easeInOut((u - 0.14) / 0.18);
    return { t: 0, split: t, cube: 0 };
  }
  if (u < 0.48) {
    const t = easeInOut((u - 0.32) / 0.16);
    return { t: 0, split: 1, cube: t };
  }
  if (u < 0.78) {
    const t = easeInOut((u - 0.48) / 0.3);
    return { t, split: 1 - t * 0.55, cube: 1 };
  }
  const t = easeInOut((u - 0.78) / 0.22);
  return { t: 1, split: 0.45 * (1 - t), cube: 1 - t };
}

function createSketch(container, reduced) {
  return (p) => {
    let size = { w: W, h: H };
    let from = centered(FIGURES[3]);
    let to = centered(FIGURES[2]);
    let order = Array.from({ length: CELL_COUNT }, (_, i) => i);
    let lastCycle = 0;
    const rand = mulberry32(20260908);

    function pickNext() {
      let next = FIGURES[Math.floor(rand() * FIGURES.length)];
      if (next === to) next = FIGURES[Math.floor(rand() * FIGURES.length)];
      from = to;
      to = centered(next.slice(0, CELL_COUNT));
      while (to.length < CELL_COUNT) to.push(to[to.length - 1] || [0, 0]);
      order = shuffle(Array.from({ length: CELL_COUNT }, (_, i) => i), rand);
    }

    function sync() {
      const w = Math.max(120, Math.floor(container.clientWidth || W));
      const h = Math.max(48, Math.floor(container.clientHeight || H));
      if (w === size.w && h === size.h) return;
      size = { w, h };
      p.resizeCanvas(w, h);
    }

    p.setup = () => {
      const w = Math.max(120, Math.floor(container.clientWidth || W));
      const h = Math.max(48, Math.floor(container.clientHeight || H));
      size = { w, h };
      const canvas = p.createCanvas(w, h);
      canvas.style('display', 'block');
      p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
      if (reduced) p.noLoop();
    };

    p.draw = () => {
      if (!container.isConnected) {
        p.remove();
        return;
      }
      sync();
      p.background(BG);

      const s = Math.min(size.w / 22, size.h / 3.15);
      const cx = size.w * 0.5;
      const cy = size.h * 0.5;
      const elapsed = reduced ? CYCLE_MS * 0.08 : p.millis();
      const cycleIndex = Math.floor(elapsed / CYCLE_MS);
      if (!reduced && cycleIndex !== lastCycle) {
        if (cycleIndex > 0) pickNext();
        lastCycle = cycleIndex;
      }
      const u = (elapsed % CYCLE_MS) / CYCLE_MS;
      const phase = cyclePhase(u);

      const cells = [];
      for (let n = 0; n < CELL_COUNT; n += 1) {
        const a = from[n] || [0, 0];
        const b = to[order[n]] || a;
        const i = lerp(a[0], b[0], phase.t);
        const j = lerp(a[1], b[1], phase.t);
        const spread = phase.split * 0.55;
        const pos = project(i * (1 + spread), j * (1 + spread), phase.cube, s);
        cells.push({
          x: cx + pos.x,
          y: cy + pos.y,
          depth: i + j + phase.cube,
          cube: phase.cube,
          shear: (1 - phase.cube) * phase.split,
        });
      }
      cells.sort((a, b) => a.depth - b.depth);
      for (const c of cells) drawCell(p, c.x, c.y, s, c.cube, c.shear);

      if (reduced) p.redraw();
    };
  };
}

export async function mountZonahedronBanner(el) {
  if (!el || el.__zonahedronMounted) return;
  el.__zonahedronMounted = true;
  try {
    const P5 = await loadP5();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.__zonahedronInstance = new P5(createSketch(el, reduced), el);
  } catch (err) {
    console.error('Zonahedron banner failed to mount:', err);
    el.classList.add('arch-banner-stage--fallback');
  }
}
