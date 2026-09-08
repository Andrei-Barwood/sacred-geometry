/**
 * WGS84 geometry helpers. Distances are geodesic approximations (haversine).
 * Not a survey-grade GIS.
 */

import { CRS_WGS84, EMPTY_WARNINGS } from "./constants.js";

const R_EARTH_M = 6371000;

export function validateLngLat(lng, lat) {
  if (typeof lng !== "number" || typeof lat !== "number") {
    return { ok: false, error: "Coordinates must be numbers." };
  }
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
    return { ok: false, error: "Coordinates must be finite WGS84 numbers." };
  }
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return { ok: false, error: EMPTY_WARNINGS.NOT_WGS84 };
  }
  return { ok: true, error: null, lng, lat, crs: CRS_WGS84 };
}

export function parseCoordinatePair(rawLng, rawLat) {
  const lng = Number(rawLng);
  const lat = Number(rawLat);
  return validateLngLat(lng, lat);
}

export function haversineMeters(lng1, lat1, lng2, lat2) {
  const a = validateLngLat(lng1, lat1);
  const b = validateLngLat(lng2, lat2);
  if (!a.ok || !b.ok) return null;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const s =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return 2 * R_EARTH_M * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

function toRad(d) {
  return (d * Math.PI) / 180;
}

function toXY(lng, lat, originLng, originLat) {
  const x = haversineMeters(originLng, originLat, lng, originLat);
  const y = haversineMeters(originLng, originLat, originLng, lat);
  const sx = lng >= originLng ? 1 : -1;
  const sy = lat >= originLat ? 1 : -1;
  return { x: (x || 0) * sx, y: (y || 0) * sy };
}

function distPointToSegmentXY(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

export function distancePointToLineStringMeters(lng, lat, coordinates) {
  if (!Array.isArray(coordinates) || coordinates.length < 2) return null;
  let min = Infinity;
  for (let i = 0; i < coordinates.length - 1; i++) {
    const a = coordinates[i];
    const b = coordinates[i + 1];
    if (!Array.isArray(a) || !Array.isArray(b) || a.length < 2 || b.length < 2) continue;
    const oLng = a[0];
    const oLat = a[1];
    const p = toXY(lng, lat, oLng, oLat);
    const pa = toXY(a[0], a[1], oLng, oLat);
    const pb = toXY(b[0], b[1], oLng, oLat);
    const d = distPointToSegmentXY(p.x, p.y, pa.x, pa.y, pb.x, pb.y);
    if (d < min) min = d;
  }
  return Number.isFinite(min) ? min : null;
}

export function pointInRing(lng, lat, ring) {
  if (!Array.isArray(ring) || ring.length < 4) return false;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    if (yj === yi) continue;
    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function pointInPolygon(lng, lat, polygonCoords) {
  if (!Array.isArray(polygonCoords) || !polygonCoords.length) return false;
  if (!pointInRing(lng, lat, polygonCoords[0])) return false;
  for (let i = 1; i < polygonCoords.length; i++) {
    if (pointInRing(lng, lat, polygonCoords[i])) return false;
  }
  return true;
}

export function pointInGeometry(lng, lat, geometry) {
  if (!geometry || !geometry.type) return false;
  const t = geometry.type;
  const c = geometry.coordinates;
  if (t === "Point") {
    const d = haversineMeters(lng, lat, c[0], c[1]);
    return d != null && d <= 1;
  }
  if (t === "Polygon") return pointInPolygon(lng, lat, c);
  if (t === "MultiPolygon") {
    return (c || []).some((poly) => pointInPolygon(lng, lat, poly));
  }
  if (t === "LineString") {
    const d = distancePointToLineStringMeters(lng, lat, c);
    return d != null && d <= 1;
  }
  if (t === "MultiLineString") {
    return (c || []).some((line) => {
      const d = distancePointToLineStringMeters(lng, lat, line);
      return d != null && d <= 1;
    });
  }
  if (t === "GeometryCollection") {
    return (geometry.geometries || []).some((g) => pointInGeometry(lng, lat, g));
  }
  return false;
}

export function distanceToGeometryMeters(lng, lat, geometry) {
  if (!geometry) return null;
  const t = geometry.type;
  const c = geometry.coordinates;
  if (t === "Point") return haversineMeters(lng, lat, c[0], c[1]);
  if (t === "MultiPoint") {
    let min = Infinity;
    for (const p of c || []) {
      const d = haversineMeters(lng, lat, p[0], p[1]);
      if (d != null && d < min) min = d;
    }
    return Number.isFinite(min) ? min : null;
  }
  if (t === "LineString") return distancePointToLineStringMeters(lng, lat, c);
  if (t === "MultiLineString") {
    let min = Infinity;
    for (const line of c || []) {
      const d = distancePointToLineStringMeters(lng, lat, line);
      if (d != null && d < min) min = d;
    }
    return Number.isFinite(min) ? min : null;
  }
  if (t === "Polygon") {
    if (pointInPolygon(lng, lat, c)) return 0;
    const ring = c[0] || [];
    return distancePointToLineStringMeters(lng, lat, ring);
  }
  if (t === "MultiPolygon") {
    let min = Infinity;
    for (const poly of c || []) {
      if (pointInPolygon(lng, lat, poly)) return 0;
      const d = distancePointToLineStringMeters(lng, lat, poly[0] || []);
      if (d != null && d < min) min = d;
    }
    return Number.isFinite(min) ? min : null;
  }
  return null;
}

export function detectCrs(obj) {
  const name = obj?.crs?.properties?.name || obj?.crs?.name || null;
  if (!name) return { ok: true, assumed: CRS_WGS84 };
  const s = String(name);
  if (/4326|WGS.?84|CRS84/i.test(s)) return { ok: true, assumed: CRS_WGS84 };
  return { ok: false, error: EMPTY_WARNINGS.NOT_WGS84, name: s };
}

void toRad;
