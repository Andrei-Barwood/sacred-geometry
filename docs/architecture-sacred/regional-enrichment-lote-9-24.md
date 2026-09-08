# Lote 9–24 coverage report

Progressive Regional Enrichment 13B. Contract 13A unchanged.

- Atlas progress: **24/110**
- Lote field coverage (required keys present, unknown placeholders count): **100%** — gate green (≥ 80%)
- Architecture coverage: **16/16** not blocked
- Mean `evidence_coverage` of the lote: **0.33** (official + derived over the full field set; site-study unknowns stay unknown)
- Job: **done**
- Templates.js: not written. Power, energy, BESS, MVA, BTC: not recalculated.
- Next lote: **25–48**

Unknown official targets without a catalog row are `method: unknown`, `value: null`, warning **sin fuente local**. GHI is never copied onto specific yield.

## Table (24 architectures)

| id | coverage | conflictos | stale | blocked |
|---|---:|---:|---:|:---:|
| G-MRT-G03-001 | 40% | 0 | 0 | no |
| S-DZA-S15-001 | 45% | 0 | 0 | no |
| G-EGY-G06-001 | 50% | 0 | 0 | no |
| H-JOR-H10-001 | 45% | 0 | 0 | no |
| G-OMN-G12-001 | 45% | 0 | 0 | no |
| H-PAK-H03-001 | 45% | 0 | 0 | no |
| S-IND-S12-001 | 40% | 0 | 0 | no |
| G-THA-G15-001 | 40% | 0 | 0 | no |
| G-MRT-G01-001 | 40% | 0 | 0 | no |
| G-MRT-G14-001 | 40% | 0 | 0 | no |
| G-MAR-G02-001 | 15% | 0 | 0 | no |
| G-MAR-G09-001 | 20% | 0 | 0 | no |
| G-DZA-G01-001 | 45% | 0 | 0 | no |
| G-DZA-G16-001 | 45% | 0 | 0 | no |
| G-TUN-G15-001 | 15% | 0 | 0 | no |
| G-LBY-G10-001 | 15% | 0 | 0 | no |
| G-EGY-G02-001 | 45% | 0 | 0 | no |
| G-SDN-G15-001 | 30% | 0 | 0 | no |
| G-JOR-G05-001 | 50% | 0 | 0 | no |
| G-IRQ-G13-001 | 15% | 0 | 0 | no |
| G-SAU-G16-001 | 45% | 0 | 0 | no |
| G-SAU-G04-001 | 50% | 0 | 0 | no |
| G-YEM-G10-001 | 15% | 0 | 0 | no |
| G-OMN-G06-001 | 50% | 0 | 0 | no |

Rows 1–8 = 13A pilot. Rows 9–24 = lote 9–24 (next 16 in frozen `architectureTemplates` order after the actual pilot eight).

## Official targets without a local source (lote)

| id | country (template) | missing official keys |
|---|---|---|
| G-MRT-G01-001 | MRT | tariffReference |
| G-MRT-G14-001 | MRT | tariffReference |
| G-MAR-G02-001 | TUN | frequencyHz, gridOperator, nominalVoltageLevelsKV, ghiAnnual, referencePvout, tariffReference |
| G-MAR-G09-001 | LBY | frequencyHz, gridOperator, nominalVoltageLevelsKV, ghiAnnual, referencePvout, tariffReference |
| G-TUN-G15-001 | TUN | frequencyHz, gridOperator, nominalVoltageLevelsKV, ghiAnnual, referencePvout, tariffReference |
| G-LBY-G10-001 | LBY | frequencyHz, gridOperator, nominalVoltageLevelsKV, ghiAnnual, referencePvout, tariffReference |
| G-SDN-G15-001 | SDN | gridOperator, nominalVoltageLevelsKV, tariffReference |
| G-IRQ-G13-001 | IRQ | frequencyHz, gridOperator, nominalVoltageLevelsKV, ghiAnnual, referencePvout, tariffReference |
| G-YEM-G10-001 | YEM | frequencyHz, gridOperator, nominalVoltageLevelsKV, ghiAnnual, referencePvout, tariffReference |

These stay unknown. They are not invented. They do not fail the 80% lote gate because the contract fields are present.

Site-study fields remain unknown on every row: `specificYield`, `floodRisk`, `salinityRisk`, `gridStrength`, `shortCircuitLevel`, `energyCharge`.
