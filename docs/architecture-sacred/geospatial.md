# Geospatial site intelligence

Candidate siting for **Arquitectura Sagrada**. It is **not** a detailed engineering GIS, cadastral system, or grid-code study.

Page: `arquitectura-sagrada.html` → workbench view **MAP**.

## What it does

- CRUD of candidate sites on the **active project** (lat/lon WGS84, region/comuna, land use, owner/notes, status).
- Import **GeoJSON** (points = sites, polygons = restrictions, lines/role points = grid sketch) and **CSV**.
- Export GeoJSON (sites + restriction/grid sketches + evidence **summary** properties) and CSV.
- Map layers: sites, grid, restrictions, evidence/coverage.
- A site **inherits restrictions** only by spatial intersection with **loaded** layers.
- Grid proximity is **geometry only** (distance class). No power-flow, no voltage-drop.
- Evidence bundle per site (URLs, notes, hashes, links to accepted Verified Data). Coverage % is critical siting fields with a source/value — not Quality Score.
- Active site supplies **geographic context** to regionalization (country/region/comuna). Electrical and BTC engines are not recalculated from the map.

## How to load a site (5 minutes)

1. Open Arquitectura Sagrada, start from zero or load a template.
2. Switch the view to **MAP**.
3. Create three sites with name + latitude + longitude, or **Import GeoJSON/CSV**.
   - Sample file: `js/architecture/geo/fixtures/sample-sites.geojson` (three Oman-interior points, a user-declared wadi buffer, a conceptual feeder).
4. Click a marker or list row. **Set active** to use it as project geographic context.
5. **Evaluate architecture here** records that the current Atlas architecture is being considered at that site (still conceptual).
6. If the import included a restriction polygon, the site inside it lists the restriction with source/date. If you did not load restrictions, the ficha shows **sin cobertura**.
7. If the import included a feeder line, proximity class and km appear. If not, **dato de red incompleto** — never a made-up distance.
8. Export GeoJSON or CSV.

Statuses: `candidato` | `preseleccionado` | `descartado` | `activo` (only one active).

Duplicates closer than **50 m** are rejected.

## What it does not do

- Official zoning, protected-area inventories, or national grid maps (do not invent them).
- Short-circuit, protection, voltage-drop, or dispatch.
- Survey-grade CRS transforms (WGS84 / CRS84 only).
- Binary document storage in GeoJSON (summaries only).

Persistence: `project.geospatial` on the existing project document (IndexedDB / JSON export). Clearing the map data does not delete electrical architecture.
