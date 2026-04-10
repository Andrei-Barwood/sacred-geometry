// p5.js Cover Animations for blog cards and detail headers

const P5_ESM_URL = 'https://cdn.jsdelivr.net/npm/p5@1.9.4/+esm';

let p5Promise;

const PHRASE_CONFIG = Object.freeze({
  bpm: 72,
  lpb: 12,
  patternSize: 96,
  noteDuration: 2
});

const BEAT_SECONDS = 60 / PHRASE_CONFIG.bpm;
const LINE_SECONDS = BEAT_SECONDS / PHRASE_CONFIG.lpb;
const NOTE_SECONDS = LINE_SECONDS * PHRASE_CONFIG.noteDuration;
const PATTERN_SECONDS = LINE_SECONDS * PHRASE_CONFIG.patternSize;
const INTERMITTENCE_LOW = '#3F5085';
const INTERMITTENCE_HIGH = '#F1F1F1';

const THEOREM_PALETTE = [
  '#9C9AAD',
  '#FFFFFF',
  '#9291A3',
  '#F1F1F1',
  '#2D3558',
  '#43558C',
  '#233250',
  '#3F5085',
  '#101C2F',
  '#325394',
  '#57C4DD',
  '#243871',
  '#E8F8F9',
  '#1A4859',
  '#63D1E9',
  '#3CBDF1',
  '#B1E8F2',
  '#6698CA',
  '#111B26',
  '#243871',
  '#ED6C9C',
  '#EA428B'
];

function loadP5() {
  if (!p5Promise) {
    p5Promise = import(P5_ESM_URL).then((mod) => mod.default || mod);
  }
  return p5Promise;
}

function getPhraseState(p) {
  const seconds = p.millis() * 0.001;
  const patternFloat = seconds / PATTERN_SECONDS;
  const beatFloat = seconds / BEAT_SECONDS;
  const lineFloat = seconds / LINE_SECONDS;
  const noteFloat = seconds / NOTE_SECONDS;

  const patternPhase = patternFloat - Math.floor(patternFloat);
  const beatPhase = beatFloat - Math.floor(beatFloat);
  const notePhase = noteFloat - Math.floor(noteFloat);
  const lineIndex = Math.floor(lineFloat) % PHRASE_CONFIG.patternSize;
  const halfPatternLines = PHRASE_CONFIG.patternSize * 0.5;
  const inhale = lineIndex < halfPatternLines;
  const breathPhase = inhale
    ? lineIndex / halfPatternLines
    : 1 - (lineIndex - halfPatternLines) / halfPatternLines;

  return {
    seconds,
    patternPhase,
    beatPhase,
    lineIndex,
    notePhase,
    notePulse: Math.pow(1 - notePhase, 2.2),
    inhale,
    breathPhase,
    linePulse: 0.5 + 0.5 * Math.cos(notePhase * p.TWO_PI),
    patternAngle: patternPhase * p.TWO_PI
  };
}

function getIntermittence(state, offset = 0, speed = 1, agileMix = 0.28) {
  const seconds = state.seconds * speed;
  const blend = Math.max(0, Math.min(1, agileMix));
  const foundation = 0.5 + 0.5 * Math.sin(seconds * 0.58 + offset);
  const agileLayer = 0.5 + 0.5 * Math.sin(seconds * 1.04 + offset * 1.7 + state.breathPhase * Math.PI * 0.7);
  return foundation * (1 - blend) + agileLayer * blend;
}

function createResponsiveSketch(container, lifecycle) {
  return (p) => {
    const env = {
      p,
      container,
      palette: THEOREM_PALETTE,
      tempo: PHRASE_CONFIG,
      size: { w: 640, h: 360 },
      alpha(hex, alphaValue) {
        const c = p.color(hex);
        c.setAlpha(alphaValue);
        return c;
      },
      mix(hexA, hexB, amount, alphaValue = 255) {
        const mixed = p.lerpColor(
          p.color(hexA),
          p.color(hexB),
          p.constrain(amount, 0, 1)
        );
        mixed.setAlpha(alphaValue);
        return mixed;
      },
      pick(index, alphaValue = 255) {
        const paletteIndex = ((index % THEOREM_PALETTE.length) + THEOREM_PALETTE.length) % THEOREM_PALETTE.length;
        return this.alpha(THEOREM_PALETTE[paletteIndex], alphaValue);
      },
      pointOnEllipse(cx, cy, rx, ry, angle) {
        return {
          x: cx + p.cos(angle) * rx,
          y: cy + p.sin(angle) * ry
        };
      }
    };

    function syncCanvas(force = false) {
      const w = Math.floor(container.clientWidth || 0);
      const h = Math.floor(container.clientHeight || 0);

      if (w <= 0 || h <= 0) return;
      if (!force && w === env.size.w && h === env.size.h) return;

      env.size.w = w;
      env.size.h = h;
      p.resizeCanvas(env.size.w, env.size.h);
    }

    p.setup = () => {
      const w = Math.floor(container.clientWidth || 640);
      const h = Math.floor(container.clientHeight || 360);
      env.size.w = Math.max(120, w);
      env.size.h = Math.max(90, h);

      const canvas = p.createCanvas(env.size.w, env.size.h);
      canvas.style('display', 'block');
      p.pixelDensity(1);
      p.noiseDetail(2, 0.4);
      if (typeof lifecycle.setup === 'function') lifecycle.setup(env);
    };

    p.draw = () => {
      if (!container.isConnected) {
        p.remove();
        return;
      }

      syncCanvas();
      lifecycle.draw(env, getPhraseState(p));
    };
  };
}

function drawAtmosphere(env, state, options = {}) {
  const { p, size } = env;
  const bgIndex = options.bgIndex ?? 18;
  const glowA = options.glowA ?? 9;
  const glowB = options.glowB ?? 14;
  const glowC = options.glowC ?? 21;

  p.background(THEOREM_PALETTE[bgIndex]);
  p.noStroke();

  p.fill(env.pick(glowA, 68));
  p.ellipse(
    size.w * (0.2 + 0.05 * p.sin(state.seconds * 0.12)),
    size.h * (0.24 + 0.04 * p.cos(state.seconds * 0.16)),
    size.w * 0.8,
    size.h * 0.95
  );

  p.fill(env.pick(glowB, 54));
  p.ellipse(
    size.w * (0.78 + 0.04 * p.cos(state.seconds * 0.14)),
    size.h * (0.76 + 0.03 * p.sin(state.seconds * 0.18)),
    size.w * 0.9,
    size.h * 1.02
  );

  p.fill(env.pick(glowC, 28));
  p.ellipse(
    size.w * 0.5,
    size.h * (0.1 + 0.04 * p.sin(state.seconds * 0.08)),
    size.w * 1.2,
    size.h * 0.42
  );
}

function createSteadyRadiusInlineSketch(container) {
  return createResponsiveSketch(container, {
    draw(env, state) {
      const { p, size } = env;
      const cx = size.w * 0.5;
      const cy = size.h * 0.5;
      const base = Math.min(size.w, size.h) * 0.12;
      const slowOrbitAngle = state.seconds * 0.03;
      const flicker = getIntermittence(state, 0.15, 1.08, 0.34);

      drawAtmosphere(env, state, { bgIndex: 18, glowA: 9, glowB: 14, glowC: 20 });

      p.noFill();
      const radii = [1, 1.45, 1.95, 2.45, 3.05];
      radii.forEach((multiplier, index) => {
        const pulse = 1 + 0.012 * p.sin(state.seconds * 0.11 + index * 0.9) + state.breathPhase * 0.01;
        p.stroke(env.pick(index < 2 ? 10 + index * 3 : 1 + index * 2, index === 4 ? 70 : 110));
        p.strokeWeight(index === 0 ? 2 : 1.15);
        p.circle(cx, cy, base * multiplier * pulse * 2);
      });

      p.stroke(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 52 + flicker * 66));
      p.strokeWeight(1.35);
      p.circle(cx, cy, base * (3.34 + flicker * 0.05) * 2);

      const spokeCount = 12;
      for (let i = 0; i < spokeCount; i++) {
        const angle = (p.TWO_PI / spokeCount) * i + slowOrbitAngle * 0.24;
        const inner = env.pointOnEllipse(cx, cy, base * 0.72, base * 0.72, angle);
        const outer = env.pointOnEllipse(cx, cy, base * 2.95, base * 2.95, angle);
        p.stroke(env.pick(16 + (i % 3), 26 + (i % 4) * 12));
        p.strokeWeight(0.9);
        p.line(inner.x, inner.y, outer.x, outer.y);
      }

      for (let lane = 0; lane < 3; lane++) {
        const radius = base * (1.35 + lane * 0.7);
        const beadCount = 12;
        for (let i = 0; i < beadCount; i++) {
          const angle = (p.TWO_PI / beadCount) * i + slowOrbitAngle * (0.14 + lane * 0.03);
          const point = env.pointOnEllipse(cx, cy, radius, radius * 0.9, angle);
          const shimmer = 0.5 + 0.5 * p.sin(state.seconds * 0.1 + i * 0.75 + lane * 0.9);
          const alpha = 42 + shimmer * 46;
          p.noStroke();
          p.fill(env.pick(i % 4 === 0 ? 21 : 15 + lane * 2, alpha));
          p.circle(point.x, point.y, base * (0.075 + shimmer * 0.03));
        }
      }

      p.noStroke();
      p.fill(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 28 + flicker * 38));
      p.circle(cx, cy, base * (1.22 + flicker * 0.09));

      p.push();
      p.translate(cx, cy);
      p.rotate(slowOrbitAngle * 0.18);
      p.noStroke();
      p.fill(env.pick(12, 52));
      for (let i = 0; i < 4; i++) {
        p.push();
        p.rotate((p.HALF_PI * i) + slowOrbitAngle * 0.14);
        p.beginShape();
        p.vertex(0, -base * 0.82);
        p.vertex(base * 0.26, 0);
        p.vertex(0, base * 0.18);
        p.vertex(-base * 0.26, 0);
        p.endShape(p.CLOSE);
        p.pop();
      }
      p.fill(env.pick(1, 228));
      p.circle(0, 0, base * 0.36);
      p.pop();
    }
  });
}

function createNitnemRingInlineSketch(container) {
  return createResponsiveSketch(container, {
    draw(env, state) {
      const { p, size } = env;
      const cx = size.w * 0.5;
      const cy = size.h * 0.5;
      const base = Math.min(size.w, size.h) * 0.115;
      const slowOrbitAngle = state.seconds * 0.024;
      const flicker = getIntermittence(state, 1.1, 1.48, 0.44);

      drawAtmosphere(env, state, { bgIndex: 8, glowA: 11, glowB: 16, glowC: 21 });

      const rings = [
        { radius: base * 1.15, color: 16, arc: 0.9 },
        { radius: base * 1.72, color: 10, arc: 1.08 },
        { radius: base * 2.3, color: 21, arc: 1.2 },
        { radius: base * 2.9, color: 1, arc: 1.35 }
      ];

      p.noFill();
      rings.forEach((ring, index) => {
        p.stroke(env.pick(ring.color, 112 - index * 10));
        p.strokeWeight(index === 3 ? 1.2 : 1.6);
        for (let quadrant = 0; quadrant < 4; quadrant++) {
          const baseAngle = -p.HALF_PI + quadrant * p.HALF_PI + slowOrbitAngle * 0.28 + index * 0.08;
          p.arc(cx, cy, ring.radius * 2, ring.radius * 2, baseAngle - ring.arc * 0.5, baseAngle + ring.arc * 0.5);
        }
      });

      p.noFill();
      p.stroke(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 46 + flicker * 72));
      p.strokeWeight(1.3);
      for (let quadrant = 0; quadrant < 4; quadrant++) {
        const baseAngle = -p.HALF_PI + quadrant * p.HALF_PI + slowOrbitAngle * 0.2;
        p.arc(cx, cy, base * 5.15, base * 5.15, baseAngle - 0.34, baseAngle + 0.34);
      }

      for (let quadrant = 0; quadrant < 4; quadrant++) {
        const angle = -p.HALF_PI + quadrant * p.HALF_PI;
        const gate = env.pointOnEllipse(cx, cy, base * 3.25, base * 3.05, angle);
        p.noStroke();
        p.fill(env.pick(12 + quadrant * 2, 126 + flicker * 18));
        p.circle(gate.x, gate.y, base * 0.28);
      }

      const beadTotal = 24;
      for (let i = 0; i < beadTotal; i++) {
        const angle = (p.TWO_PI / beadTotal) * i + slowOrbitAngle * 0.36;
        const orbit = env.pointOnEllipse(cx, cy, base * 2.2, base * 1.95, angle);
        const glow = 0.5 + 0.5 * p.sin(state.seconds * 0.09 + i * 0.55);
        p.noStroke();
        p.fill(env.pick(i % 6 === 0 ? 20 : 17, 82 + glow * 82));
        p.circle(orbit.x, orbit.y, base * (0.085 + glow * 0.055));
      }

      p.noStroke();
      p.fill(env.pick(1, 215));
      p.circle(cx, cy, base * 0.34);
      p.fill(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 34 + flicker * 44));
      p.circle(cx, cy, base * (1.12 + flicker * 0.11));
      p.fill(env.pick(21, 65));
      p.circle(cx, cy, base * 0.82 + (0.5 + 0.5 * p.sin(state.seconds * 0.2)) * 1.4);
    }
  });
}

function createKriyaBreathInlineSketch(container) {
  return createResponsiveSketch(container, {
    draw(env, state) {
      const { p, size } = env;
      const cx = size.w * 0.5;
      const cy = size.h * 0.5;
      const breathEnvelope = 0.24 + state.breathPhase * 0.76;
      const maxWidth = Math.min(size.w, size.h) * 0.36;
      const flicker = getIntermittence(state, 2.05, 0.82, 0.2);

      drawAtmosphere(env, state, { bgIndex: 18, glowA: 6, glowB: 14, glowC: 10 });

      p.stroke(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 14 + flicker * 10));
      p.strokeWeight(1.2);
      p.line(cx, size.h * 0.12, cx, size.h * 0.88);

      p.noFill();
      for (let lane = 0; lane < 7; lane++) {
        const yNorm = lane / 6;
        const y = p.lerp(size.h * 0.18, size.h * 0.82, yNorm);
        const amplitude = maxWidth * p.sin(yNorm * p.PI) * breathEnvelope;
        const shimmer = 1 + 0.06 * p.sin(state.seconds * 0.8 + lane * 0.6);

        p.stroke(env.pick(10 + lane, 56 + lane * 12));
        p.strokeWeight(lane === 3 ? 2 : 1.2);
        p.beginShape();
        for (let step = 0; step <= 36; step++) {
          const t = step / 36;
          const x = cx + p.sin(t * p.PI) * amplitude * shimmer;
          const yOffset = p.lerp(-18, 18, t) * (0.18 + lane * 0.02);
          p.vertex(x, y + yOffset);
        }
        p.endShape();

        p.beginShape();
        for (let step = 0; step <= 36; step++) {
          const t = step / 36;
          const x = cx - p.sin(t * p.PI) * amplitude * shimmer;
          const yOffset = p.lerp(-18, 18, t) * (0.18 + lane * 0.02);
          p.vertex(x, y + yOffset);
        }
        p.endShape();
      }

      for (let i = 0; i < 12; i++) {
        const t = (i / 12 + state.patternPhase) % 1;
        const y = state.inhale
          ? p.lerp(size.h * 0.8, size.h * 0.2, t)
          : p.lerp(size.h * 0.2, size.h * 0.8, t);
        const spread = maxWidth * 0.12 * p.sin((t + state.breathPhase) * p.PI);
        p.noStroke();
        p.fill(env.pick(i % 2 === 0 ? 15 : 21, 110));
        p.circle(cx - spread, y, 4 + (i % 3));
        p.circle(cx + spread, y, 4 + (i % 3));
      }

      p.noStroke();
      p.fill(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 8 + flicker * 10));
      p.ellipse(cx, cy, maxWidth * (0.76 + flicker * 0.035), maxWidth * (0.3 + flicker * 0.025));

      p.noStroke();
      p.fill(env.pick(16, 180));
      p.circle(cx, cy, 16 + state.notePulse * 5);
    }
  });
}

function createClinicalTranslationInlineSketch(container) {
  return createResponsiveSketch(container, {
    draw(env, state) {
      const { p, size } = env;
      const cx = size.w * 0.5;
      const cy = size.h * 0.5;
      const slowOrbitAngle = state.seconds * 0.028;
      const scanPhase = (state.seconds * 0.018) % 1;
      const flicker = getIntermittence(state, 2.9, 1.1, 0.32);

      drawAtmosphere(env, state, { bgIndex: 18, glowA: 11, glowB: 9, glowC: 21 });

      p.stroke(env.pick(1, 24));
      p.strokeWeight(1);
      for (let x = 0; x <= 12; x++) {
        const px = (size.w / 12) * x;
        p.line(px, 0, px, size.h);
      }
      for (let y = 0; y <= 8; y++) {
        const py = (size.h / 8) * y;
        p.line(0, py, size.w, py);
      }

      const respiratoryAmplitude = 18 + state.breathPhase * 18;
      p.noFill();
      p.stroke(env.pick(15, 180));
      p.strokeWeight(2.4);
      p.beginShape();
      for (let x = 0; x <= size.w; x += 8) {
        const phase = (x / size.w) * p.TWO_PI * 2.4;
        const y = cy + p.sin(phase + state.seconds * 0.12) * respiratoryAmplitude;
        p.vertex(x, y);
      }
      p.endShape();

      p.stroke(env.pick(21, 165));
      p.strokeWeight(1.6);
      p.beginShape();
      for (let x = 0; x <= size.w; x += 10) {
        const phase = (x / size.w) * p.TWO_PI * 4.2;
        const modulation = 0.6 + 0.4 * p.sin(state.seconds * 0.9 + x * 0.02);
        const y = cy - 48 + p.sin(phase + state.seconds * 0.08) * (8 + 12 * modulation);
        p.vertex(x, y);
      }
      p.endShape();

      p.noFill();
      p.stroke(env.pick(16, 100));
      p.strokeWeight(1.5);
      p.circle(cx, cy, Math.min(size.w, size.h) * 0.22);
      p.stroke(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 38 + flicker * 56));
      p.circle(cx, cy, Math.min(size.w, size.h) * 0.34);

      const sampleCount = 16;
      for (let i = 0; i < sampleCount; i++) {
        const angle = (p.TWO_PI / sampleCount) * i + slowOrbitAngle * 0.34;
        const point = env.pointOnEllipse(cx, cy, Math.min(size.w, size.h) * 0.17, Math.min(size.w, size.h) * 0.15, angle);
        const glow = 0.5 + 0.5 * p.sin(state.seconds * 0.1 + i * 0.7);
        p.noStroke();
        p.fill(env.pick(i % 4 === 0 ? 20 : 10, 70 + glow * 58));
        p.circle(point.x, point.y, 4.5 + glow * 1.8);
      }

      const scanX = scanPhase * size.w;
      p.stroke(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 36 + flicker * 54));
      p.strokeWeight(1);
      p.line(scanX, size.h * 0.14, scanX, size.h * 0.86);

      p.noStroke();
      p.fill(env.mix(INTERMITTENCE_LOW, INTERMITTENCE_HIGH, flicker, 20 + flicker * 28));
      p.circle(scanX, cy, 9 + flicker * 7);
    }
  });
}

function createConcentricVivekaSketch(container) {
  return (p) => {
    let canvasW = 640;
    let canvasH = 360;

    function colorWithAlpha(hex, alpha) {
      const c = p.color(hex);
      c.setAlpha(alpha);
      return c;
    }

    function syncCanvasSize(force = false) {
      const w = Math.floor(container.clientWidth || 0);
      const h = Math.floor(container.clientHeight || 0);

      if (w <= 0 || h <= 0) return;
      if (!force && w === canvasW && h === canvasH) return;

      canvasW = w;
      canvasH = h;
      p.resizeCanvas(canvasW, canvasH);
    }

    function drawBackground(t) {
      p.background(THEOREM_PALETTE[8]);

      p.noStroke();
      p.fill(colorWithAlpha(THEOREM_PALETTE[11], 70));
      p.ellipse(
        canvasW * (0.22 + 0.04 * p.sin(t * 0.27)),
        canvasH * (0.26 + 0.03 * p.cos(t * 0.23)),
        canvasW * 0.75,
        canvasH * 0.9
      );

      p.fill(colorWithAlpha(THEOREM_PALETTE[9], 85));
      p.ellipse(
        canvasW * (0.77 + 0.03 * p.cos(t * 0.19)),
        canvasH * (0.74 + 0.04 * p.sin(t * 0.21)),
        canvasW * 0.8,
        canvasH * 0.95
      );

      p.fill(colorWithAlpha(THEOREM_PALETTE[4], 50));
      p.ellipse(
        canvasW * 0.5,
        canvasH * (0.1 + 0.03 * p.sin(t * 0.16)),
        canvasW * 1.3,
        canvasH * 0.5
      );
    }

    function drawConcentricRings(cx, cy, radiusBase, t) {
      const rings = [1.1, 1.75, 2.45];
      const ringColors = [THEOREM_PALETTE[10], THEOREM_PALETTE[16], THEOREM_PALETTE[1]];
      const ringRadii = [];

      p.noFill();
      for (let i = 0; i < rings.length; i++) {
        const breath = 1 + 0.018 * p.sin(t * 0.22 + i * 0.95);
        const ringRadius = radiusBase * rings[i] * breath;
        ringRadii.push(ringRadius);
        p.stroke(colorWithAlpha(ringColors[i], i === 2 ? 95 : 120));
        p.strokeWeight(i === 2 ? 1.8 : 1.4);
        p.circle(cx, cy, ringRadius * 2);
      }

      p.stroke(colorWithAlpha(THEOREM_PALETTE[0], 80));
      p.strokeWeight(1);
      p.circle(cx, cy, radiusBase * 3.1 * 2);

      return ringRadii;
    }

    function drawLuminousTriangle(cx, cy, radiusBase, t) {
      const triRadius = radiusBase * 1.88 * (1 + 0.004 * p.sin(t * 0.22));
      const rotation = -p.HALF_PI + t * 0.018;

      const frontVertices = [];
      for (let i = 0; i < 3; i++) {
        const angle = rotation + i * ((2 * p.PI) / 3);
        frontVertices.push({ x: cx + triRadius * p.cos(angle), y: cy + triRadius * p.sin(angle) });
      }

      // Simulated depth vector for a slow, comfortable 3D prism effect.
      const depthMagnitude = radiusBase * (0.9 + 0.03 * p.sin(t * 0.08));
      const depthAngle = 1.02 + 0.025 * p.sin(t * 0.06);
      const depthVector = {
        x: p.cos(depthAngle) * depthMagnitude,
        y: p.sin(depthAngle) * depthMagnitude * 0.78
      };

      const backVertices = frontVertices.map((v) => ({
        x: v.x + depthVector.x,
        y: v.y + depthVector.y
      }));

      // Back face
      p.fill(colorWithAlpha(THEOREM_PALETTE[19], 82));
      p.stroke(colorWithAlpha(THEOREM_PALETTE[0], 115));
      p.strokeWeight(1.4);
      p.beginShape();
      backVertices.forEach((v) => p.vertex(v.x, v.y));
      p.endShape(p.CLOSE);

      // Side faces with depth-aware order.
      const sideFaces = [
        { indices: [0, 1], color: THEOREM_PALETTE[6] },
        { indices: [1, 2], color: THEOREM_PALETTE[5] },
        { indices: [2, 0], color: THEOREM_PALETTE[12] }
      ]
        .map((face) => {
          const [a, b] = face.indices;
          const avgY = (frontVertices[a].y + frontVertices[b].y + backVertices[a].y + backVertices[b].y) / 4;
          return { ...face, avgY };
        })
        .sort((a, b) => a.avgY - b.avgY);

      sideFaces.forEach((face, idx) => {
        const [a, b] = face.indices;
        p.fill(colorWithAlpha(face.color, 108 - idx * 6));
        p.stroke(colorWithAlpha(THEOREM_PALETTE[2], 122));
        p.strokeWeight(1.2);
        p.quad(
          frontVertices[a].x,
          frontVertices[a].y,
          frontVertices[b].x,
          frontVertices[b].y,
          backVertices[b].x,
          backVertices[b].y,
          backVertices[a].x,
          backVertices[a].y
        );
      });

      // Connector edges to reinforce the prism depth.
      p.stroke(colorWithAlpha(THEOREM_PALETTE[1], 95));
      p.strokeWeight(1.1);
      for (let i = 0; i < 3; i++) {
        p.line(frontVertices[i].x, frontVertices[i].y, backVertices[i].x, backVertices[i].y);
      }

      // Front face
      p.fill(colorWithAlpha(THEOREM_PALETTE[14], 52));
      p.stroke(colorWithAlpha(THEOREM_PALETTE[10], 178));
      p.strokeWeight(2);
      p.beginShape();
      frontVertices.forEach((v) => p.vertex(v.x, v.y));
      p.endShape(p.CLOSE);

      // Inner glow on front face for soft solidity.
      const innerInset = 0.19 + 0.008 * p.sin(t * 0.22);
      const innerVertices = frontVertices.map((v) => ({
        x: p.lerp(v.x, cx, innerInset),
        y: p.lerp(v.y, cy, innerInset)
      }));

      p.noStroke();
      p.fill(colorWithAlpha(THEOREM_PALETTE[16], 42));
      p.beginShape();
      innerVertices.forEach((v) => p.vertex(v.x, v.y));
      p.endShape(p.CLOSE);

      const vertexColors = [THEOREM_PALETTE[10], THEOREM_PALETTE[21], THEOREM_PALETTE[1]];
      const vertexLabels = ['J', 'V', 'D'];

      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(Math.max(10, Math.min(canvasW, canvasH) * 0.045));

      for (let i = 0; i < frontVertices.length; i++) {
        const v = frontVertices[i];
        p.noStroke();
        p.fill(colorWithAlpha(vertexColors[i], 220));
        p.circle(v.x, v.y, Math.max(8, radiusBase * 0.18));

        p.fill(colorWithAlpha(THEOREM_PALETTE[2], 230));
        p.text(vertexLabels[i], v.x, v.y - Math.max(16, radiusBase * 0.22));
      }

      return triRadius;
    }

    function drawRayAndPoint(cx, cy, triRadius, t) {
      const rayAngle = -p.HALF_PI + t * 0.02 + 0.1 * p.sin(t * 0.08);
      const rayLength = triRadius * 1.58;
      const targetX = cx + p.cos(rayAngle) * rayLength;
      const targetY = cy + p.sin(rayAngle) * rayLength;

      const segments = 24;
      for (let i = 0; i < segments; i++) {
        const mixA = i / segments;
        const mixB = (i + 1) / segments;
        const x1 = p.lerp(cx, targetX, mixA);
        const y1 = p.lerp(cy, targetY, mixA);
        const x2 = p.lerp(cx, targetX, mixB);
        const y2 = p.lerp(cy, targetY, mixB);

        p.stroke(colorWithAlpha(THEOREM_PALETTE[15], 22 + i * 6));
        p.strokeWeight(1.2 + mixA * 1.6);
        p.line(x1, y1, x2, y2);
      }

      p.noStroke();
      p.fill(colorWithAlpha(THEOREM_PALETTE[20], 190));
      p.circle(targetX, targetY, 10 + 2.4 * p.sin(t * 0.35));

      p.fill(colorWithAlpha(THEOREM_PALETTE[1], 130));
      p.circle(targetX, targetY, 22 + 4 * p.sin(t * 0.24));

      return { targetX, targetY, rayAngle };
    }

    function drawCenterGlow(cx, cy, radiusBase, t) {
      p.noStroke();

      p.fill(colorWithAlpha(THEOREM_PALETTE[17], 75));
      p.circle(cx, cy, radiusBase * 2.2 + 10 * p.sin(t * 0.14));

      p.fill(colorWithAlpha(THEOREM_PALETTE[16], 130));
      p.circle(cx, cy, radiusBase * 0.65);

      p.fill(colorWithAlpha(THEOREM_PALETTE[1], 210));
      p.circle(cx, cy, radiusBase * 0.24);
    }

    function drawSoftOrbits(cx, cy, radiusBase, t) {
      const orbitCount = 10;

      for (let i = 0; i < orbitCount; i++) {
        const lane = 1.25 + (i % 4) * 0.5;
        const speed = 0.05 + (i % 3) * 0.016;
        const angle = t * speed + i * 0.8;
        const x = cx + p.cos(angle) * radiusBase * lane;
        const y = cy + p.sin(angle * 1.1) * radiusBase * lane * 0.78;

        p.noStroke();
        p.fill(colorWithAlpha(THEOREM_PALETTE[(i + 5) % THEOREM_PALETTE.length], 88));
        p.circle(x, y, 3.5 + (i % 3));
      }
    }

    function drawTheoremLabels(cx, cy, ringRadii, rayInfo, radiusBase) {
      if (!rayInfo || !ringRadii || ringRadii.length < 3) return;

      function drawLabel(text, x, y) {
        const fontSize = Math.max(10, Math.min(canvasW, canvasH) * 0.038);
        const padX = fontSize * 0.42;
        const padY = fontSize * 0.26;
        p.textSize(fontSize);
        const tw = p.textWidth(text);
        const h = fontSize + padY * 1.15;

        p.noStroke();
        p.fill(colorWithAlpha(THEOREM_PALETTE[8], 170));
        p.rect(x - (tw * 0.5 + padX), y - h * 0.5, tw + padX * 2, h, 8);

        p.stroke(colorWithAlpha(THEOREM_PALETTE[10], 125));
        p.strokeWeight(0.8);
        p.noFill();
        p.rect(x - (tw * 0.5 + padX), y - h * 0.5, tw + padX * 2, h, 8);

        p.noStroke();
        p.fill(colorWithAlpha(THEOREM_PALETTE[1], 235));
        p.textAlign(p.CENTER, p.CENTER);
        p.text(text, x, y + 0.5);
      }

      p.stroke(colorWithAlpha(THEOREM_PALETTE[16], 130));
      p.strokeWeight(1);

      // Point A (center)
      const aLabelX = cx + radiusBase * 0.36;
      const aLabelY = cy + radiusBase * 0.08;
      p.line(cx, cy, aLabelX - radiusBase * 0.16, aLabelY);
      drawLabel('A', aLabelX, aLabelY);

      // Point P (target point at end of AP ray)
      const pLabelX = rayInfo.targetX + radiusBase * 0.34;
      const pLabelY = rayInfo.targetY - radiusBase * 0.18;
      p.line(rayInfo.targetX, rayInfo.targetY, pLabelX - radiusBase * 0.15, pLabelY + radiusBase * 0.03);
      drawLabel('P', pLabelX, pLabelY);

      // Ray label AP
      const midX = p.lerp(cx, rayInfo.targetX, 0.58);
      const midY = p.lerp(cy, rayInfo.targetY, 0.58);
      const normalX = -p.sin(rayInfo.rayAngle);
      const normalY = p.cos(rayInfo.rayAngle);
      const apLabelX = midX + normalX * radiusBase * 0.3;
      const apLabelY = midY + normalY * radiusBase * 0.3;
      p.line(midX, midY, apLabelX - normalX * radiusBase * 0.12, apLabelY - normalY * radiusBase * 0.12);
      drawLabel('AP', apLabelX, apLabelY);

      // Concentric circles around A: C1, C2, C3
      const ringLabels = ['C1', 'C2', 'C3'];
      const baseAngle = -0.62;
      for (let i = 0; i < 3; i++) {
        const angle = baseAngle - i * 0.12;
        const ringX = cx + p.cos(angle) * ringRadii[i];
        const ringY = cy + p.sin(angle) * ringRadii[i];
        const lx = ringX + radiusBase * (0.34 + i * 0.08);
        const ly = ringY - radiusBase * (0.06 + i * 0.02);
        p.line(ringX, ringY, lx - radiusBase * 0.17, ly);
        drawLabel(ringLabels[i], lx, ly);
      }
    }

    p.setup = () => {
      const w = Math.floor(container.clientWidth || 640);
      const h = Math.floor(container.clientHeight || 360);

      canvasW = Math.max(120, w);
      canvasH = Math.max(68, h);

      const canvas = p.createCanvas(canvasW, canvasH);
      canvas.style('display', 'block');
      p.pixelDensity(1);
      p.noiseDetail(2, 0.4);
    };

    p.draw = () => {
      if (!container.isConnected) {
        p.remove();
        return;
      }

      syncCanvasSize();

      const t = p.millis() * 0.001;
      const cx = canvasW * 0.5;
      const cy = canvasH * 0.5;
      const radiusBase = Math.min(canvasW, canvasH) * 0.15;

      drawBackground(t);
      const ringRadii = drawConcentricRings(cx, cy, radiusBase, t);
      const triRadius = drawLuminousTriangle(cx, cy, radiusBase, t);
      drawSoftOrbits(cx, cy, radiusBase, t);
      const rayInfo = drawRayAndPoint(cx, cy, triRadius, t);
      drawCenterGlow(cx, cy, radiusBase, t);
      drawTheoremLabels(cx, cy, ringRadii, rayInfo, radiusBase);
    };
  };
}

const SKETCH_FACTORIES = {
  'concentric-viveka': createConcentricVivekaSketch,
  'steady-radius': createSteadyRadiusInlineSketch,
  'nitnem-ring': createNitnemRingInlineSketch,
  'kriya-breath': createKriyaBreathInlineSketch,
  'clinical-translation': createClinicalTranslationInlineSketch
};

export function hasCoverAnimation(post) {
  return Boolean(post && typeof post.coverAnimation === 'string' && post.coverAnimation.length > 0);
}

export async function mountCoverAnimation(el, animationName) {
  await mountSketch(el, animationName, '__coverAnimationInstance', 'animated-cover--active', 'animated-cover--fallback', 'coverAnimationMounting');
}

export function unmountCoverAnimation(el) {
  unmountSketch(el, '__coverAnimationInstance');
}

export async function mountInlineAnimation(el, animationName) {
  await mountSketch(el, animationName, '__inlineAnimationInstance', 'post-animation-frame--active', 'post-animation-frame--fallback', 'inlineAnimationMounting');
}

export function unmountInlineAnimation(el) {
  unmountSketch(el, '__inlineAnimationInstance');
}

async function mountSketch(el, animationName, instanceKey, activeClass, fallbackClass, mountingFlag) {
  if (!el || !animationName) return;
  if (el[instanceKey] || el.dataset[mountingFlag] === '1') return;

  if (activeClass) el.classList.remove(activeClass);
  if (fallbackClass) el.classList.remove(fallbackClass);
  el.dataset[mountingFlag] = '1';

  try {
    const P5 = await loadP5();
    const factory = SKETCH_FACTORIES[animationName];

    if (!factory || !el.isConnected) {
      delete el.dataset[mountingFlag];
      return;
    }

    el.classList.add(activeClass);
    el[instanceKey] = new P5(factory(el), el);
  } catch (error) {
    console.error('P5 animation failed to mount:', error);
    if (fallbackClass) el.classList.add(fallbackClass);
  } finally {
    delete el.dataset[mountingFlag];
  }
}

function unmountSketch(el, instanceKey) {
  if (!el || !el[instanceKey]) return;

  el[instanceKey].remove();
  delete el[instanceKey];
  el.classList.remove('animated-cover--active', 'animated-cover--fallback', 'post-animation-frame--active', 'post-animation-frame--fallback');
}
