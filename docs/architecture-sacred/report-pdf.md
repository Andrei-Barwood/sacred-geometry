# Native PDF renderer (Prompt 14)

Lib: **custom PDF 1.4 writer** (`js/architecture/report/pdf-writer.js`) — Helvetica WinAnsi, no npm PDF library (the Pages bundle has none). Not HTML-print.

## Pipeline

```
Report Model (Prompt 10)
    │  buildPrintModel()     ← no electrical/BTC/fit math
    ▼
Print view-model (ES labels, “Dato no disponible”)
    │  renderEngineeringReportPdf()
    ▼
PDF bytes + filename {proyecto}-{arquitectura}-{snapshot}-{fecha}.pdf
```

`printedAt` lives only on the cover as **Impreso:** and is excluded from `contentHash`. Same snapshot → same hash and same bytes if `printedAt` is fixed.

## Report Model → PDF sections

| PDF | Source |
|---|---|
| Portada | `projectMetadata`, `reportMetadata.snapshotId`, `generatedAt`, `contentHash` |
| SYSTEM / SACRED | `architectureSummary`, `diagrams.topology` / captions (existing taxonomy) |
| Resumen ejecutivo numérico | `electricalSummary` |
| Tablas eléctrica, BESS, MVA, energía, BTC, regional fit, evidence coverage | `sections[].tables` as produced by the generator |
| Sitio / geo | `sections` id `site` + `geo` (coordinates, restrictions, proximity from Prompt 12) |
| Provenance | `sections` id `provenance` + verified sources |
| Warnings / supuestos | `validationSummary` + `assumptions` |
| Pie | `engineVersion`, `REPORT_PDF_RENDERER_VERSION`, `snapshotId` |

Unknown cells (`—`, null, empty) → **Dato no disponible** and empty provenance. Warnings are copied, never dropped.

## Snapshot

`document.lastPdfSnapshotId` is stored when **Descargar PDF** runs. Regenerating from that snapshot uses the snapshot payload, not live edits.

## Golden test

```
node js/architecture/report/pdf.test.js
```

Rebuilds the fixture from `createSample6kWProject()` + `generateEngineeringReport`. Asserts electrical table values, unknown yield, warnings, and hash stability. To refresh after a Report Model change, just re-run the file — there is no binary fixture to check in.

## Comparison PDF (Prompt 15)

The comparison workbench reuses `renderPrintModelPdf` with a different view-model (`comparisonPrintModel`). Same writer, no electrical/BTC/fit math, no ranking. See `docs/architecture-sacred/comparison.md`.
