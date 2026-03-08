// p5.js Cover Animations for blog cards and detail headers

const P5_ESM_URL = 'https://cdn.jsdelivr.net/npm/p5@1.9.4/+esm';

let p5Promise;

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
  'concentric-viveka': createConcentricVivekaSketch
};

export function hasCoverAnimation(post) {
  return Boolean(post && typeof post.coverAnimation === 'string' && post.coverAnimation.length > 0);
}

export async function mountCoverAnimation(el, animationName) {
  if (!el || !animationName) return;
  if (el.__coverAnimationInstance || el.dataset.coverAnimationMounting === '1') return;

  el.dataset.coverAnimationMounting = '1';

  try {
    const P5 = await loadP5();
    const factory = SKETCH_FACTORIES[animationName];

    if (!factory || !el.isConnected) {
      delete el.dataset.coverAnimationMounting;
      return;
    }

    el.classList.add('animated-cover--active');
    el.__coverAnimationInstance = new P5(factory(el), el);
  } catch (error) {
    console.error('Cover animation failed to mount:', error);
    el.classList.add('animated-cover--fallback');
  } finally {
    delete el.dataset.coverAnimationMounting;
  }
}

export function unmountCoverAnimation(el) {
  if (!el || !el.__coverAnimationInstance) return;

  el.__coverAnimationInstance.remove();
  delete el.__coverAnimationInstance;
}
