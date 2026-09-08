# Comparison workbench (Prompt 15)

Cara a cara de 2 o 3 entidades. **No hay ganador por IA, ranking ni score compuesto.** La proyección al comparison-view es mapping: se leen cifras ya almacenadas. Missing → `N/A`, nunca `0`.

Página: pestaña **Compare** en `arquitectura-sagrada.html`. Motor: `js/architecture/compare/`.

```
entidad (template | project | snapshot | site)
    │  projectEntity()     ← mapping, no engines
    ▼
comparison-view
    │  buildComparison()   ← deltas vs slot 1, umbral %
    ▼
tabla + warnings dedup + evidence lado a lado
    │
    ├─ CSV de la tabla
    └─ PDF via Prompt 14 (renderPrintModelPdf, otro view-model)
```

Persistencia: `document.comparisons[]` (ids + snapshot ids + umbral + fórmula visible del usuario). Reabrible.

## Entidades

| Kind | Fuente | Notas |
|---|---|---|
| `template` | Atlas `architectureTemplates` | Campos del template + enrichment del id |
| `project` | Documento o workbench abierto | `loads.profile` se mapea a `loadProfile` |
| `snapshot` | `document.snapshots[].payload.architecture` | Motor del snapshot |
| `site` | Sitio del proyecto con arquitectura anclada | Proximidad y restricciones **ya evaluadas** (Prompt 12), no se recalculan |

Mezclar tipos está permitido: todos proyectan al mismo comparison-view; lo que no aplica es `N/A`.

## Comparison-view — campos comparables

Leídos, no recalculados. Deltas vs el slot 1 (baseline). Highlight si `|Δ%| ≥ umbral` (default 5) o diferencia cualitativa.

| id | Grupo | Unidad | Origen |
|---|---|---|---|
| `peakLoadMW` | Potencia | MW | `loadProfile.peakLoadMW` o `loads.profile.peakLoadMW` |
| `loadFactor` | Potencia | | `loadProfile.loadFactor` |
| `pvDcMWp` | Potencia | MWp | `generation.pv.dcMWp` |
| `pvAcMW` | Potencia | MW | `generation.pv.acMW` |
| `dcAcRatio` | Potencia | | `generation.pv.dcAcRatio` |
| `windRatedMW` | Potencia | MW | `generation.wind.ratedMW` |
| `dieselRatedMW` | Potencia | MW | `generation.diesel.ratedMW` |
| `specificYield` | Energía | kWh/kWp·y | `generation.pv.specificYieldKWhPerKWpYear` |
| `annualEnergyMWh` | Energía | MWh | enrichment `annualEnergyMWh` |
| `bessEnabled` | BESS | | `bess.enabled` |
| `bessPowerMW` | BESS | MW | `bess.powerMW` |
| `bessEnergyMWh` | BESS | MWh | `bess.energyMWh` |
| `bessDurationHours` | BESS | h | `bess.durationHours` / enrichment |
| `transformerMVA` | MVA | MVA | `substation.transformerMVA` |
| `transformerTotalMVA` | MVA | MVA | `substation.transformerTotalMVA` |
| `transformerCount` | MVA | | `substation.transformerCount` |
| `nMinusOneCapacityMVA` | MVA | MVA | enrichment `nMinusOneCapacityMVA` |
| `primaryKV` | MVA | kV | `substation.primaryKV` |
| `secondaryKV` | MVA | kV | `substation.secondaryKV` |
| `btcPerKWh` | BTC | BTC/kWh | `economics.btcPerKWh` |
| `regionalFitScore` | Regional | | `regionalization.regionalFitScore` / enrichment |
| `country` | Regional | | `country` |
| `region` | Regional | | `region` |
| `gridMode` | Regional | | `grid.mode` |
| `evidenceCoverage` | Evidence | | enrichment `evidence_coverage` |
| `openConflicts` | Evidence | | conflictos unresolved |
| `staleFields` | Evidence | | campos stale |
| `enrichmentStatus` | Evidence | | `enrichment_status` |
| `warningCount` | Warnings | | recuento de warnings almacenados |
| `siteLat` | Sitio | ° | sitio.lat |
| `siteLng` | Sitio | ° | sitio.lng |
| `proximityKm` | Sitio | km | evaluación geo `distancia_km` |
| `proximityClass` | Sitio | | evaluación geo `clase` |
| `restrictionCount` | Sitio | | restricciones del sitio |

Warnings se unen y se deduplican por `code`. Evidence coverage se muestra lado a lado, no se promedia.

## Campos expresamente no comparables

No entran al comparison-view. No hay mapping que los invente.

| id | Motivo |
|---|---|
| `qualityScore` | Score de validación, no magnitud comparable cara a cara |
| `compositeRanking` | Ranking compuesto (prohibido) |
| `winner` | Ganador por IA / score mágico (prohibido) |
| `graphCoordinates` | Layout SVG, no ingeniería |
| `svgLayout` | Vista SYSTEM/SACRED |
| `liveBtcPrice` | Precio de mercado en vivo, no del modelo |
| `hourlyDispatch` | Serie temporal, no un escalar del comparison-view |
| `shortCircuit` | No se calcula ni se proyecta aquí |
| `ghiAsSpecificYield` | No sustituir GHI por yield |
| `voltageListAsPrimaryKV` | No colapsar lista de tensiones a un kV |
| `protectionCoordination` | Fuera de alcance |

Tampoco se comparan: tarifas reconvertidas, energía recalculada, BESS duration inventada, N-1 recalculado, fit regional recomputado, proximidad a red calculada al vuelo.

## Motores distintos

Si los `engineVersion` de los slots no coinciden: warning **HIGH** `ENGINE_MISMATCH` — «no comparable en rigor». Se bloquean deltas de campos engine-sensitive:

`dcAcRatio`, `bessDurationHours`, `annualEnergyMWh`, `nMinusOneCapacityMVA`, `loadFactor`, `evidenceCoverage`.

Los campos almacenados de plantilla/proyecto (p. ej. `pvDcMWp`) siguen mostrando delta.

## Export

- CSV: exactamente `comparisonToCsv(table)` (valores, `N/A`, deltas, highlight, engine_blocked).
- PDF: `comparisonPrintModel` → `renderPrintModelPdf` (Prompt 14). Incluye la frase «Esta comparación no clasifica un ganador.» No genera cifras nuevas.

## Tests

```
node js/architecture/compare/compare.test.js
```
