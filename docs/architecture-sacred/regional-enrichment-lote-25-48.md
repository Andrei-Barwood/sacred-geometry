# Lote 25–48 coverage report

Progressive Regional Enrichment 13C. Contract 13A unchanged. Lote 9–24 left intact.

- Atlas progress: **48/110**
- Lote field coverage (required keys present, unknown placeholders count): **100%** — gate green (≥ 80%)
- Architecture coverage: **24/24** (0 blocked)
- Mean `evidence_coverage` of the lote: **0.27**
- Job: **done**. Yield per architecture: **24**. A blocked row would not halt siblings.
- Templates.js: not written. No power-flow, routing, or grid-code.

## Cross-region catalog flags (unresolved)

| field | regions | values | resolution |
|---|---|---|---|
| frequencyHz | R01, R02, R03, R04, R05, R06, R07, R08 | 50 Hz (most) vs **60 Hz in R05 (SAU)** | unresolved |

Do not apply 50 Hz as a corridor default. Catalog-level only; not auto-resolved.

## Coverage by region (this lote)

| region | n | field coverage | mean evidence | blocked |
|---|---:|---:|---:|---:|
| R01 | 0 | — | — | 0 |
| R02 | 1 | 100% | 10% | 0 |
| R03 | 0 | — | — | 0 |
| R04 | 4 | 100% | 20% | 0 |
| R05 | 5 | 100% | 21% | 0 |
| R06 | 7 | 100% | 31% | 0 |
| R07 | 6 | 100% | 38% | 0 |
| R08 | 1 | 100% | 15% | 0 |

## Blocked

None.

## Perf

Enrich of 24 is sub-millisecond per architecture in Node (no network). The UI job yields **once per architecture** so the thread can paint.

| | |
|---|---|
| total | ~5 ms (Node, no DOM) |
| mean | ~0.21 ms |
| max | ~0.37 ms (`G-ARE-G07-001`) |
| yield_count | 24 |

Bottlenecks to watch in 49–end (62 remaining): catalog lookup is O(catalog)×architectures; validation `audit` per template; IndexedDB persist of the batch. Keep yielding per architecture. Do not run the 62 synchronously on the UI thread.

## Table (lote 25–48)

| id | coverage | conflictos | stale | blocked |
|---|---:|---:|---:|:---:|
| G-ARE-G07-001 | 20% | 0 | 0 | no |
| G-QAT-G13-001 | 15% | 0 | 0 | no |
| G-KWT-G05-001 | 45% | 0 | 0 | no |
| G-BHR-G01-001 | 15% | 0 | 0 | no |
| G-IRN-G08-001 | 15% | 0 | 0 | no |
| G-IRN-G14-001 | 15% | 0 | 0 | no |
| G-AFG-G10-001 | 40% | 0 | 0 | no |
| G-PAK-G16-001 | 40% | 0 | 0 | no |
| G-PAK-G14-001 | 40% | 0 | 0 | no |
| G-IND-G15-001 | 45% | 0 | 0 | no |
| G-IND-G13-001 | 45% | 0 | 0 | no |
| G-IND-G02-001 | 45% | 0 | 0 | no |
| G-BGD-G01-001 | 40% | 0 | 0 | no |
| G-LKA-G01-001 | 15% | 0 | 0 | no |
| G-MMR-G15-001 | 15% | 0 | 0 | no |
| G-LBN-G11-001 | 20% | 0 | 0 | no |
| G-SYR-G13-001 | 15% | 0 | 0 | no |
| S-YEM-S01-001 | 10% | 0 | 0 | no |
| S-AFG-S01-001 | 35% | 0 | 0 | no |
| S-TUN-S02-001 | 10% | 0 | 0 | no |
| S-JOR-S03-001 | 35% | 0 | 0 | no |
| S-BGD-S02-001 | 35% | 0 | 0 | no |
| S-AFG-S04-001 | 35% | 0 | 0 | no |
| S-LBN-S04-001 | 10% | 0 | 0 | no |

## Next lote = 49–end (62)

S-MAR-S05-001, S-EGY-S06-001, S-PAK-S07-001, S-IND-S08-001, S-SAU-S09-001, S-IRN-S10-001, S-MRT-S11-001, S-SAU-S13-001, S-KWT-S14-001, S-QAT-S14-001, S-LBY-S15-001, S-OMN-S16-001, S-THA-S07-001, S-MMR-S03-001, S-BHR-S08-001, S-SDN-S02-001, S-IRQ-S07-001, S-EGY-S05-001, S-PAK-S09-001, S-IND-S11-001, S-LKA-S01-001, S-SYR-S06-001, S-OMN-S04-001, S-IRN-S12-001, S-ARE-S03-001, S-THA-S10-001, S-IND-S16-001, H-EGY-H13-001, H-OMN-H13-001, H-MRT-H01-001, H-SDN-H02-001, H-IRQ-H04-001, H-SDN-H05-001, H-IND-H06-001, H-ARE-H07-001, H-KWT-H07-001, H-MRT-H08-001, H-IRN-H08-001, H-ARE-H09-001, H-THA-H09-001, H-LBN-H10-001, H-YEM-H11-001, H-AFG-H11-001, H-LBY-H12-001, H-MMR-H12-001, H-JOR-H14-001, H-PAK-H14-001, H-IND-H15-001, H-THA-H15-001, H-ARE-H16-001, H-OMN-H16-001, H-LKA-H16-001, H-EGY-H03-001, H-IND-H05-001, H-THA-H12-001, H-SAU-H01-001, H-DZA-H02-001, H-EGY-H06-001, H-QAT-H09-001, H-SAU-H15-001, H-BGD-H03-001, H-THA-H04-001
