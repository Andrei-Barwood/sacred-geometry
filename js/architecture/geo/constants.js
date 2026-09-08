/**
 * Geospatial site intelligence. Geometry and annotations only.
 * Does not compute power, energy, voltage-drop, or BTC.
 */

export const SITE_STATUSES = Object.freeze(["candidato", "preseleccionado", "descartado", "activo"]);

export const RESTRICTION_TYPES = Object.freeze([
  "ambiental",
  "territorial",
  "electrica",
  "normativa",
  "otra",
]);

export const RESTRICTION_SEVERITY = Object.freeze(["bloqueo", "alerta", "informativo"]);

export const GRID_FEATURE_ROLES = Object.freeze(["feeder", "substation", "connection", "unknown"]);

export const PROXIMITY_CLASS = Object.freeze({
  ON_PREMISE: "sobre predio",
  UNDER_1: "<1 km",
  FROM_1_TO_5: "1–5 km",
  FROM_5_TO_15: "5–15 km",
  OVER_15: ">15 km",
  UNKNOWN: "desconocida",
});

export const CRS_WGS84 = "EPSG:4326";
export const DUPLICATE_METERS = 50;
export const ON_PREMISE_METERS = 25;

export const MAX_SITES = 200;
export const MAX_RESTRICTIONS = 80;
export const MAX_GRID_FEATURES = 200;
export const MAX_EVIDENCE_ITEMS = 24;
export const MAX_NOTE = 2000;
export const MAX_NAME = 200;

export const CRITICAL_SITE_FIELDS = Object.freeze([
  "coordinates",
  "name",
  "region",
  "landUse",
  "evidence",
]);

export const EMPTY_WARNINGS = Object.freeze({
  NO_SITES: "sin sitios",
  NO_RESTRICTIONS: "sin cobertura",
  INCOMPLETE_GRID: "dato de red incompleto",
  TILE_ERROR: "Tiles OSM requieren red. Sitios y restricciones siguen en el proyecto; el mapa base no se finge offline.",
  NOT_WGS84: "Coordinates must be WGS84 (EPSG:4326) longitude/latitude.",
});
