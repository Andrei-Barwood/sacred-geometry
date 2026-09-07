# Engineering report engine

Transforms a resolved project into a **conceptual** technical report. It is not a second calculator.

## Pipeline

```
Project or snapshot
    │
    ▼
resolveScenario()          (persistence)
    │
    ├── recompute()        (calculation + validation)
    ├── buildArchitectureGraph()
    └── provenance from project
            │
            ▼
     EngineeringReportModel
            │
            ├── Workbench preview
            ├── Print (browser)
            ├── Self-contained HTML export
            └── Native PDF (`buildPrintModel` → `renderEngineeringReportPdf`)
```

`generateEngineeringReport` does not mutate the project, autosave, change the active scenario, or fix errors.

## Model

Canonical object: metadata, executive summary, numbered sections (tables/notes), diagrams (inline SVG + topology text), validation, assumptions, provenance. Modes **summary / standard / detailed** filter presentation of the same model.

Status is only DRAFT / CONCEPTUAL / REVIEW. Never approved, certified, or construction-ready.

## HTML

`renderEngineeringReportHTML` escapes every user string (`textContent` semantics). Export is a static `.html` with embedded CSS, no app JS, no remote fonts required. Privacy scan runs before export. Print uses `@media print` (A4-friendly, paper background). PDF is a future print-to-PDF path, not a second layout engine.

## Known limitations

No hourly dispatch, short-circuit, protection, voltage-drop without conductors, live BTC price, or bibliography invented from country/technology. Energy coverage is a ratio, not a simulation.
