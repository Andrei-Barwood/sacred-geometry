# Sacred Architecture Workbench

Interactive workbench for **Arquitectura Sagrada**. It consumes the existing source model, calculation engine, BTC economics engine, template atlas, regionalization helpers, and validation engine. It does **not** reimplement those formulas in the UI.

Page: `arquitectura-sagrada.html`

This is a conceptual engineering workbench. It is not engineering-certified, regulatory-compliant, or construction-ready.

## State architecture

One project object is the source of truth (`createEmptyProject`, `projectFromTemplate`).

```
architectureState = {
  metadata, mode, sourceTemplateId,
  installation, loads, generation, bess, substation,
  grid, feeders, economics, scenario, site,
  assumptions, provenance, display
}
```

Unknown quantities are `null`. `0` means a known zero.

Forms, SVG, results cards, and template cards all read this state (or derived results computed from it). They do not keep a parallel copy.

## Data flow

```
USER INPUT → STATE → CALCULATION ENGINE → VALIDATION ENGINE → DERIVED RESULTS → UI
```

`recompute(project)` in `js/architecture/ui/derive.js`:

1. `projectToTemplate(project)` — snapshot for the validator (never the catalog object)
2. `validateTemplate(template)` — quality score, errors, derived electrical values
3. `summarizeInstallation(...)` — when detailed loads exist
4. `calculateEnergyCost` / `costsByEquipment` — only when energy **and** tariff exist
5. `evaluateTerrainSuitability` — preferred / avoid / investigate

Event listeners only patch state. They do not contain `P/V` or `Energy × Tariff`.

## Panels

| Area | Role |
|---|---|
| Toolbar | New, Templates, Duplicate, Reset, Validate. Save / Import / Export are disabled (persistence phase). |
| Left | Overview, Loads, Generation, BESS, Substation, Grid, Feeders, Economics, Site, Assumptions. Sections follow architecture mode. |
| Center | SYSTEM (electrical diagram) and SACRED (same graph, radial composition). Native SVG. |
| Right | Summary, Energy, Capacity, Economics, Validation. Metrics are contextual. |
| Bottom | Template explorer, enrichment, verified data, diagnostics, assumptions, **Compare**. |

Modes (`load-installation`, `generation-plant`, `substation`, `hybrid-microgrid`) hide panels. They share the same state and units.

## Template workflow

1. Start screen: Start from zero, Browse templates, Featured Architectures (valid + no HIGH warning).
2. Details dialog inspects a template **without** loading it.
3. Load template: `structuredClone` into project state, record `sourceTemplateId`, mark conceptual assumptions, run calc + validation.
4. Editing the project never writes back to `templates.js` or the in-memory catalog.
5. Compare checkboxes (max 3) open the Compare tab (`openCompareFromSelection`). Comparison is mapping-only: no ranking, no composite score. See `docs/architecture-sacred/comparison.md`.

Samples:

- Conceptual 6 kW Residential/Farm Load Study (`SAMPLE-6KW-LOAD-STUDY`) from `reference-loads.js`
- Large-scale PV + BESS + substation from the atlas

## Validation integration

`validateTemplate` is the authority. The UI maps issue categories to configuration sections (`Go to BESS`, etc.). Suggested corrections are shown; nothing is auto-fixed.

Provenance badges: SOURCE, CALCULATED, ASSUMPTION, USER, SITE STUDY.

`specificYield = null` + `future-site-study` → SITE STUDY + NOTICE, not ERROR.

## SVG graph model

The workbench consumes the Prompt 8 graph engine (`docs/architecture-sacred/graph-engine.md`).

`buildArchitectureGraph(state)` emits a canonical `{ nodes, edges, connections, voltageDomains }`. SYSTEM and SACRED run separate layout engines on that graph. The renderer does not calculate engineering quantities or infer missing equipment.

See `js/architecture/graph/` and `js/architecture/svg/`.

## Responsive strategy

- ≥1100 px: three columns (config | visualization | results)
- Tablets: configuration drawer; SVG remains visible
- Mobile: stacked Project → Summary → Visualization → Configuration → Results → Templates
- Load table becomes stacked cards
- Header: extra nav item uses a short label (`Arquitectura`); hamburger already at 1100 px; `overflow-x: hidden` on the header

## Accessibility

- Real labels on inputs, accessible names on buttons
- SVG `role="img"` plus `<title>` / `<desc>`
- Validation `aria-live` is polite and updated on explicit Validate, not on every keystroke
- Escape closes template detail and the config drawer; focus returns to the opener
- `prefers-reduced-motion` disables decorative motion
- Dark mode uses the existing `data-theme` system

## Known limitations

- No cloud persistence, accounts, or Firebase project storage
- No live Bitcoin price
- No map / coordinates (templates have country / region / subregion only)
- No Newton-Raphson, short-circuit, protection, or CAD
- Template comparison is selection-only
- Save / Import / Export are visible but disabled
- Voltage-drop is not computed without conductor data

## Modules

```
js/architecture/ui/
  architecture-app.js    Alpine store
  state.js               empty / template / 6 kW project
  actions.js             mutations
  derive.js              engine pipeline
  selectors.js           read model
  format.js              display units
  template-explorer.js   search / AND filters
  architecture-graph.js  graph model
  svg-system-view.js
  svg-sacred-view.js
  load-presets.js
  workbench.test.js
```
