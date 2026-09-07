/**
 * Geospatial site intelligence tests. Offline.
 *   node js/architecture/geo/geo.test.js
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  parseSitesGeoJSON,
  parseSitesCSV,
  sitesToGeoJSON,
  sitesToCSV,
  findDuplicateSite,
  roundTripEqualSites,
  inheritRestrictions,
  addSite,
  setActiveSite,
  importIntoGeospatial,
  emptyGeospatial,
  evaluateSite,
  evaluateGeospatial,
  gridProximityForSite,
  haversineMeters,
  pointInPolygon,
  createRestriction,
  createSite,
  PROXIMITY_CLASS,
  EMPTY_WARNINGS,
} from "./index.js";
import { createEmptyProject, projectFromTemplate } from "../ui/state.js";
import { createProjectDocument, architectureToWorkbench } from "../storage/index.js";
import { buildArchitectureGraph } from "../graph/index.js";
import { architectureTemplates } from "../templates.js";

const here = dirname(fileURLToPath(import.meta.url));
const sample = JSON.parse(readFileSync(join(here, "fixtures/sample-sites.geojson"), "utf8"));

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failed += 1;
    console.error(`FAIL  ${name}\n      ${err.message}`);
  }
}

test("parses GeoJSON sites, restriction polygon, and feeder line", () => {
  const r = parseSitesGeoJSON(sample, []);
  assert.equal(r.ok, true);
  assert.equal(r.sites.length, 3);
  assert.equal(r.restrictions.length, 1);
  assert.ok(r.gridNetwork);
  assert.equal(r.gridNetwork.features.length, 1);
  assert.equal(r.sites[0].lng, 56.12);
});

test("rejects non-WGS84 CRS", () => {
  const r = parseSitesGeoJSON({
    type: "FeatureCollection",
    crs: { type: "name", properties: { name: "EPSG:3857" } },
    features: [{ type: "Feature", geometry: { type: "Point", coordinates: [0, 0] }, properties: { name: "x" } }],
  });
  assert.equal(r.ok, false);
  assert.match(r.error, /WGS84/);
});

test("invalid coordinates are rejected", () => {
  const s = createSite({ name: "bad", lat: 120, lng: 10 });
  assert.equal(s.lat, null);
  const add = addSite(emptyGeospatial(), { name: "bad", lat: 120, lng: 10 });
  assert.equal(add.ok, false);
});

test("duplicates within 50 m are skipped", () => {
  const a = createSite({ name: "A", lat: 23.58, lng: 56.12 });
  const geo = { ...emptyGeospatial(), sites: [a] };
  const r = addSite(geo, { name: "A2", lat: 23.5802, lng: 56.1201 });
  assert.equal(r.ok, false);
  assert.match(r.error, /Duplicate/i);
  const d = findDuplicateSite([a], 56.1201, 23.5802);
  assert.ok(d);
  assert.ok(d.meters < 50);
});

test("oversized GeoJSON/CSV import is a recoverable error, not a throw", () => {
  const huge = "x".repeat(5 * 1024 * 1024 + 10);
  const gj = parseSitesGeoJSON(huge);
  assert.equal(gj.ok, false);
  assert.match(gj.error, /size limit/i);
  const csv = parseSitesCSV(huge);
  assert.equal(csv.ok, false);
  assert.match(csv.error, /size limit/i);
});

test("CSV import + GeoJSON/CSV round trip", () => {
  const csv = sitesToCSV([
    createSite({ name: "P1", lat: 24.1, lng: 55.2, region: "Arabian Peninsula", landUse: "desert" }),
    createSite({ name: "P2", lat: 24.4, lng: 55.5, region: "Arabian Peninsula" }),
  ]);
  const parsed = parseSitesCSV(csv);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.sites.length, 2);
  const gj = sitesToGeoJSON({ sites: parsed.sites, restrictions: [], gridNetwork: null }, null, {});
  const again = parseSitesGeoJSON(gj);
  assert.equal(again.sites.length, 2);
  assert.equal(roundTripEqualSites(parsed.sites, again.sites), true);
});

test("restriction intersection: site inside polygon inherits alerta", () => {
  const rest = createRestriction({
    name: "wadi",
    type: "ambiental",
    severity: "alerta",
    source: "fixture",
    date: "2026-09-04",
    geometry: {
      type: "Polygon",
      coordinates: [[[56.07, 23.50], [56.11, 23.50], [56.11, 23.54], [56.07, 23.54], [56.07, 23.50]]],
    },
  });
  const inside = inheritRestrictions(56.08, 23.52, [rest]);
  const outside = inheritRestrictions(56.21, 23.61, [rest]);
  assert.equal(inside.length, 1);
  assert.equal(inside[0].severity, "alerta");
  assert.equal(outside.length, 0);
  assert.equal(
    pointInPolygon(56.08, 23.52, rest.geometry.coordinates),
    true
  );
});

test("no restriction layer → sin cobertura, no invented zoning", () => {
  const site = createSite({ name: "X", lat: 23.58, lng: 56.12 });
  const ev = evaluateSite(site, emptyGeospatial(), createEmptyProject());
  assert.ok(ev.warnings.includes(EMPTY_WARNINGS.NO_RESTRICTIONS));
  assert.equal(ev.restrictions.length, 0);
});

test("no grid network → unknown class, no invented km", () => {
  const site = createSite({ name: "X", lat: 23.58, lng: 56.12 });
  const p = gridProximityForSite(site, null);
  assert.equal(p.distancia_km, null);
  assert.equal(p.clase, PROXIMITY_CLASS.UNKNOWN);
  assert.equal(p.warning, EMPTY_WARNINGS.INCOMPLETE_GRID);
});

test("grid line yields geometric distance class only", () => {
  const parsed = parseSitesGeoJSON(sample);
  const site = parsed.sites.find((s) => s.name.includes("hamada A"));
  const p = gridProximityForSite(site, parsed.gridNetwork);
  assert.equal(p.warning, null);
  assert.notEqual(p.distancia_km, null);
  assert.notEqual(p.clase, PROXIMITY_CLASS.UNKNOWN);
});

test("import sample into project geospatial and set active", () => {
  const merged = importIntoGeospatial(emptyGeospatial(), JSON.stringify(sample), "geojson");
  assert.equal(merged.ok, true);
  assert.equal(merged.geospatial.sites.length, 3);
  const act = setActiveSite(merged.geospatial, merged.geospatial.sites[0].id);
  assert.equal(act.geospatial.activeSiteId, merged.geospatial.sites[0].id);
  assert.equal(act.geospatial.sites.filter((s) => s.status === "activo").length, 1);
});

test("persistence keeps geospatial; graph stamps siteId; no electrical change", () => {
  const t = architectureTemplates.find((x) => x.id === "G-OMN-G12-001") || architectureTemplates[0];
  const wb = projectFromTemplate(t);
  const dc = wb.generation?.pv?.dcMWp;
  const merged = importIntoGeospatial(wb.geospatial, JSON.stringify(sample), "geojson");
  wb.geospatial = setActiveSite(merged.geospatial, merged.geospatial.sites[0].id).geospatial;
  const doc = createProjectDocument(wb);
  assert.equal(doc.geospatial.sites.length, 3);
  const back = architectureToWorkbench(doc);
  assert.equal(back.geospatial.sites.length, 3);
  const graph = buildArchitectureGraph(back, {});
  assert.equal(graph.metadata.siteId, back.geospatial.activeSiteId);
  assert.ok(graph.nodes.every((n) => n.metadata?.siteId === back.geospatial.activeSiteId));
  assert.equal(back.generation?.pv?.dcMWp, dc);
});

test("evaluateGeospatial lists explicit warnings", () => {
  const ev = evaluateGeospatial(emptyGeospatial(), createEmptyProject());
  assert.ok(ev.warnings.includes(EMPTY_WARNINGS.NO_SITES));
  assert.ok(ev.warnings.includes(EMPTY_WARNINGS.NO_RESTRICTIONS));
  assert.ok(ev.warnings.includes(EMPTY_WARNINGS.INCOMPLETE_GRID));
});

test("haversine known short baseline", () => {
  const d = haversineMeters(56.12, 23.58, 56.1205, 23.58);
  assert.ok(d > 40 && d < 70);
});

console.log(`\nGeospatial tests: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
