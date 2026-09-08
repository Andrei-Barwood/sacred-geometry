/**
 * Lightweight WGS84 map: OSM tiles + SVG overlays.
 * No electrical math. Leaflet is not required.
 */

import { EMPTY_WARNINGS } from "./constants.js";
import { evaluateSite } from "./evaluate.js";

function lngX(lng, z) {
  return ((lng + 180) / 360) * 2 ** z;
}
function latY(lat, z) {
  const s = Math.sin((lat * Math.PI) / 180);
  return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * 2 ** z;
}
function tileUrl(x, y, z) {
  return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
}

const SEVERITY_FILL = {
  bloqueo: "rgba(180, 35, 24, 0.28)",
  alerta: "rgba(181, 71, 8, 0.28)",
  informativo: "rgba(23, 92, 211, 0.22)",
};

export function createMapView(container, options = {}) {
  if (!container) return null;
  const state = {
    z: options.zoom ?? 4,
    lng: options.lng ?? 45,
    lat: options.lat ?? 25,
    layers: {
      sitios: true,
      red: true,
      restricciones: true,
      evidencia: true,
      cobertura: true,
      ...(options.layers || {}),
    },
    tileError: false,
    selectedId: null,
    dragging: false,
    last: null,
    geospatial: null,
    evaluations: {},
    popups: options.popups || {},
    onSelect: options.onSelect || null,
  };

  container.classList.add("wb-geo-map");
  container.innerHTML = "";
  const tiles = document.createElement("div");
  tiles.className = "wb-geo-tiles";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("wb-geo-svg");
  const markers = document.createElement("div");
  markers.className = "wb-geo-markers";
  const empty = document.createElement("div");
  empty.className = "wb-geo-empty";
  const err = document.createElement("div");
  err.className = "wb-geo-tile-error";
  err.hidden = true;
  err.textContent = EMPTY_WARNINGS.TILE_ERROR;
  container.append(tiles, svg, markers, empty, err);

  function project(lng, lat) {
    const w = container.clientWidth || 400;
    const h = container.clientHeight || 280;
    const z = state.z;
    const cx = lngX(state.lng, z);
    const cy = latY(state.lat, z);
    const x = (lngX(lng, z) - cx) * 256 + w / 2;
    const y = (latY(lat, z) - cy) * 256 + h / 2;
    return { x, y };
  }

  function renderTiles() {
    const offline = typeof navigator !== "undefined" && navigator.onLine === false;
    if (offline) {
      tiles.innerHTML = "";
      err.hidden = false;
      err.textContent = EMPTY_WARNINGS.TILE_ERROR;
      return;
    }
    const w = container.clientWidth || 400;
    const h = container.clientHeight || 280;
    const z = Math.max(2, Math.min(18, Math.round(state.z)));
    const cx = lngX(state.lng, z);
    const cy = latY(state.lat, z);
    const minX = Math.floor(cx - w / 512 - 1);
    const maxX = Math.floor(cx + w / 512 + 1);
    const minY = Math.floor(cy - h / 512 - 1);
    const maxY = Math.floor(cy + h / 512 + 1);
    const n = 2 ** z;
    tiles.innerHTML = "";
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (y < 0 || y >= n) continue;
        const tx = ((x % n) + n) % n;
        const img = document.createElement("img");
        img.alt = "";
        img.draggable = false;
        img.src = tileUrl(tx, y, z);
        img.style.left = `${(x - cx) * 256 + w / 2}px`;
        img.style.top = `${(y - cy) * 256 + h / 2}px`;
        img.addEventListener("error", () => {
          state.tileError = true;
          err.hidden = false;
        });
        tiles.appendChild(img);
      }
    }
  }

  function ringToPath(ring) {
    return ring
      .map((c, i) => {
        const p = project(c[0], c[1]);
        return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ") + " Z";
  }

  function geomToPath(geometry) {
    if (!geometry) return "";
    if (geometry.type === "Polygon") return (geometry.coordinates || []).map(ringToPath).join(" ");
    if (geometry.type === "MultiPolygon") {
      return (geometry.coordinates || []).map((poly) => poly.map(ringToPath).join(" ")).join(" ");
    }
    if (geometry.type === "LineString") {
      return (geometry.coordinates || [])
        .map((c, i) => {
          const p = project(c[0], c[1]);
          return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        })
        .join(" ");
    }
    if (geometry.type === "MultiLineString") {
      return (geometry.coordinates || [])
        .map((line) =>
          line
            .map((c, i) => {
              const p = project(c[0], c[1]);
              return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
            })
            .join(" ")
        )
        .join(" ");
    }
    return "";
  }

  function renderOverlays() {
    const g = state.geospatial;
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.innerHTML = "";
    if (!g) return;
    if (state.layers.restricciones) {
      for (const r of g.restrictions || []) {
        const d = geomToPath(r.geometry);
        if (!d) continue;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", SEVERITY_FILL[r.severity] || SEVERITY_FILL.informativo);
        path.setAttribute("stroke", "rgba(20,20,20,0.45)");
        path.setAttribute("stroke-width", "1");
        svg.appendChild(path);
      }
    }
    if (state.layers.red && g.gridNetwork?.features) {
      for (const f of g.gridNetwork.features) {
        const d = geomToPath(f.geometry);
        if (!d) continue;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#c9a227");
        path.setAttribute("stroke-width", "2.2");
        svg.appendChild(path);
        if (f.geometry?.type === "Point") {
          const p = project(f.geometry.coordinates[0], f.geometry.coordinates[1]);
          const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          c.setAttribute("cx", p.x);
          c.setAttribute("cy", p.y);
          c.setAttribute("r", "5");
          c.setAttribute("fill", "#c9a227");
          svg.appendChild(c);
        }
      }
    }
  }

  function renderMarkers() {
    const g = state.geospatial;
    markers.innerHTML = "";
    const sites = g?.sites || [];
    empty.hidden = sites.length > 0;
    empty.textContent = EMPTY_WARNINGS.NO_SITES;
    if (!state.layers.sitios) return;
    for (const s of sites) {
      if (s.lng == null || s.lat == null) continue;
      const p = project(s.lng, s.lat);
      const el = document.createElement("button");
      el.type = "button";
      el.className = "wb-geo-marker";
      el.dataset.status = s.status;
      if (s.id === g.activeSiteId) el.classList.add("is-active");
      if (s.id === state.selectedId) el.classList.add("is-selected");
      el.style.left = `${p.x}px`;
      el.style.top = `${p.y}px`;
      el.title = s.name;
      el.setAttribute("aria-label", s.name);
      const ev = state.evaluations[s.id] || evaluateSite(s, g, options.project);
      if (state.layers.cobertura && ev.coverage) {
        el.dataset.coverage = String(ev.coverage.percent);
      }
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        state.selectedId = s.id;
        if (state.onSelect) state.onSelect(s.id);
        render();
      });
      const popup = document.createElement("div");
      popup.className = "wb-geo-popup";
      popup.hidden = s.id !== state.selectedId;
      const lines = (state.popups[s.id] || [
        { label: "Site", value: s.name },
        { label: "Status", value: s.status },
        { label: "Coverage", value: `${ev.coverage?.percent ?? "—"} %` },
        { label: "Grid", value: ev.proximity?.clase || "desconocida" },
      ])
        .map((row) => `<div><span>${escapeHtml(row.label)}</span> ${escapeHtml(String(row.value ?? "—"))}</div>`)
        .join("");
      popup.innerHTML = lines;
      el.appendChild(popup);
      markers.appendChild(el);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render() {
    renderTiles();
    renderOverlays();
    renderMarkers();
  }

  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => render());
    ro.observe(container);
  }

  container.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".wb-geo-marker")) return;
    state.dragging = true;
    state.last = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener("pointerup", () => {
    state.dragging = false;
  });
  window.addEventListener("pointermove", (e) => {
    if (!state.dragging || !state.last) return;
    const dx = e.clientX - state.last.x;
    const dy = e.clientY - state.last.y;
    state.last = { x: e.clientX, y: e.clientY };
    const z = state.z;
    state.lng -= (dx / 256) * (360 / 2 ** z);
    const span = 170 / 2 ** (z - 2);
    state.lat = Math.max(-85, Math.min(85, state.lat + (dy / 256) * span));
    render();
  });
  container.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const next = state.z + (e.deltaY > 0 ? -0.4 : 0.4);
      state.z = Math.max(2, Math.min(17, next));
      render();
    },
    { passive: false }
  );

  return {
    render,
    setData(geospatial, evaluations, popups) {
      state.geospatial = geospatial;
      state.evaluations = evaluations || {};
      if (popups) state.popups = popups;
      const active = geospatial?.sites?.find((s) => s.id === geospatial.activeSiteId);
      if (active?.lat != null) {
        state.lat = active.lat;
        state.lng = active.lng;
        if (state.z < 8) state.z = 10;
      }
      render();
    },
    setLayers(partial) {
      Object.assign(state.layers, partial);
      render();
    },
    setSelected(id) {
      state.selectedId = id;
      render();
    },
    fitSites(sites) {
      const pts = (sites || []).filter((s) => s.lat != null);
      if (!pts.length) return;
      const lats = pts.map((s) => s.lat);
      const lngs = pts.map((s) => s.lng);
      state.lat = (Math.min(...lats) + Math.max(...lats)) / 2;
      state.lng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
      state.z = pts.length === 1 ? 11 : 6;
      render();
    },
    destroy() {
      container.innerHTML = "";
    },
  };
}
