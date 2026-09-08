# Sacred Architecture Graph Engine

Reusable visualization pipeline for Arquitectura Sagrada. SYSTEM view and SACRED view consume the **same canonical graph**. Only layout and visual grammar change.

Geometry is visualization / organization. It does **not** improve electrical performance, optimize power, or represent physical efficiency.

## Pipeline

```
Project State
    │
    ▼
buildArchitectureGraph()
    │
    ▼
Canonical Graph
    │
    ├── layoutSystemGraph()
    │        │
    │        ▼
    │    SYSTEM SVG
    │
    └── layoutSacredGraph()
             │
             ▼
         SACRED SVG
```

The renderer does not calculate power, energy, current, BESS duration, transformer capacity, N-1, BTC, load factor, or DC/AC ratio. Those values are copied from project state and the existing engines (`derived.validation.derivedValues`).

## Canonical graph model

```
{
  nodes: [],
  edges: [],
  groups: [],
  connections: [],
  voltageDomains: [],
  metadata: { notices, flow, starting, redundancy, completeness, connectionOrigin }
}
```

### Nodes

`id`, `type`, `role`, `label`, `electrical { voltageKV, activePowerMW, apparentPowerMVA, energyMWh, currentA, dcMWp, durationHours, … }`, `state`, `provenance`, `validation`, `metadata`.

**Types:** SOURCE, PV, WIND, DIESEL, OTHER_GENERATION, BESS, GRID, TRANSFORMER, BUS, FEEDER, LOAD, SUBSTATION, SWITCH, BREAKER, FUTURE, EXTERNAL.

Breakers/switches are omitted unless present in project state. Disabled / null equipment is not drawn.

**Role** is independent of type (transformer `step-up` / `step-down`, BESS `grid-forming` / `peak-shaving`, diesel `backup`).

**States:** OFF, STANDBY, RUNNING, STARTING, FAULT, FUTURE, UNKNOWN, ACTIVE, DISCONNECTED, INACTIVE.

Physical topology ≠ operating state. `bess.enabled === false` → no node. `enabled === true` and `state === OFF` → node present, inactive.

### Edges

`id`, `source`, `target`, `type`, `voltageKV`, `direction`, `state`, `powerFlow`, `metadata`.

**Types:** electrical, transformer-link, feeder, bus-connection, storage-link, backup-link, future-link.

**Direction** (power flow) is separate from topology: `forward` | `reverse` | `bidirectional` | `unknown`. Arrows are drawn only when direction is known.

Line styles: solid existing, dashed future/backup, muted inactive/disconnected, highlight selected.

## Connection model

Templates today do not store `connections[]`. The builder:

1. Uses `project.connections` when declared (`origin: "declared"`).
2. Otherwise runs `inferArchitectureConnections()` (`origin: "inferred-architecture"`), a documented ruleset from co-present equipment (PV → collector, transformer ↔ buses, feeders from MV bus, etc.).
3. Does **not** invent a transformer or grid to complete a lonely PV plant. Isolated nodes get a topology NOTICE.

`inferTemplateConnections(template)` is a pure migration helper. It does not rewrite the 96-template catalog.

Unresolved refs stay unresolved. Completeness (`calculateGraphCompleteness`) is **not** the validation quality score.

## SYSTEM layout

`layoutSystemGraph(graph, viewport)` — hierarchical, deterministic.

Layer order (top → bottom):

GENERATION / GRID → HV → TRANSFORMATION → MV → DISTRIBUTION → LOADS

Mobile uses the same order with a vertical flow and side branches for BESS / backup / grid.

Buses are wide bars. Transformers use two circles. Orthogonal (H/V) routing. Basic collision nudging. Viewport modes: desktop-wide / desktop / tablet / mobile. Layout is recomputed from container size (ResizeObserver), not a 1920×1080 bitmap.

Load grouping (`individual` | `grouped` | `auto`): if detailed loads exceed 8, they are grouped visually by category. Source load data is not mutated. Feeders can collapse into a group node when numerous.

## SACRED layout

`layoutSacredGraph(graph, viewport)` — same nodes and edges.

- Default mode: **CONCENTRIC**. **RADIAL** is implemented. Mandala / vesica / hexagonal / spiral are reserved.
- `selectSacredCenter()` prefers main MV bus → HV bus → transformer → substation → highest degree. Never “always PV”.
- Ring index = graph hop distance from the center (`graphDistance`).
- Empty sectors stay empty (no fake equipment).
- Decorative rings/spokes: `class="decorative"`, `pointer-events="none"`, `aria-hidden`. They must not look like wires.
- Decoration levels: MINIMAL / GEOMETRIC (default) / FULL. Electrical information is unchanged.

## Voltage domains

Any positive `voltageKV` is accepted. `classifyVoltageDomain()` is an **internal graphic** class (LV < 1 kV, MV < 66, HV < 230, else EHV), not a local-code standard.

## Interaction

Stable node IDs across SYSTEM ↔ SACRED. Selection persists. Click / Tab / Enter / Space open details in the workbench panel. Escape clears selection and focus mode. Focus mode dims non-neighbors (`traceElectricalPath`). Tooltips/details work from keyboard, not hover-only. BTC tariff changes do not change topology (`getTopologySignature`).

Zoom is not required for typical projects; FIT is via responsive viewBox. No particle flow animation.

## Accessibility

SVG `role="img"` + title/desc from `textualArchitectureSummary(graph)`. Decorative geometry is hidden. An HTML architecture tree lists generation, storage, transformation, distribution, loads, grid. Essential labels exist without hover (printable SYSTEM view). `prefers-reduced-motion` disables starting pulse.

## Performance

Node timings on this machine (build/layout only, ms):

| nodes | validate | system | sacred |
|---|---|---|---|
| 10 | <1 | <1 | <1 |
| 25 | <1 | <1 | <1 |
| 50 | <1 | <1 | <1 |
| 100 | <1 | ~1–3 | <1 |

No D3 / Cytoscape / Graphviz. Native SVG + JS.

## Modules

```
js/architecture/graph/   model, build, validate, layout, format, index
js/architecture/svg/     renderer (defs, nodes, edges, labels, overlays, interaction)
```

Workbench adapters: `js/architecture/ui/architecture-graph.js`, `svg-system-view.js`, `svg-sacred-view.js`.

## Known limitations

- Inferred connections are architectural, not a studied one-line from the utility.
- No AC power-flow, short-circuit, or protection coordination.
- Zoom/pan is not a full GIS camera; large feeder sets collapse rather than virtualize 100 full-size nodes.
- Export SVG / PDF reporting is structured for reuse but not implemented.
- Debug coordinates are off in production (`graphDebug` flag).
