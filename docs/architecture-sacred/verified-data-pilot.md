# Verified-data 8-template pilot

The pilot checks provider architecture, matching, registry, conflicts, freshness, UI flow, and report citations. It does **not** declare the atlas verified.

Selection: one template per atlas region (`R01`–`R08`), preferring featured architectures.

| Region | Template | Country |
|---|---|---|
| R01 Atlantic Sahara | `G-MRT-G03-001` | Mauritania |
| R02 Maghreb | `S-DZA-S15-001` | Algeria |
| R03 Nile / Northeast Africa | `G-EGY-G06-001` | Egypt |
| R04 Levant / Mesopotamia | `G-JOR-G05-001` | Jordan |
| R05 Arabian Peninsula | `G-OMN-G12-001` | Oman |
| R06 Iranian Plateau / Central Corridor | `H-PAK-H03-001` | Pakistan |
| R07 South Asia | `S-IND-S12-001` | India |
| R08 Southeast Transition | `G-THA-G15-001` | Thailand |

Offline catalog lookup (candidates only — nothing accepted, so accepted coverage stays 0):

| Region | Template | Country | Candidates | Granularity | Pending site studies |
|---|---|---|---|---|---|
| R01 | G-MRT-G03-001 | MRT | frequency, voltage levels (exist), operator, GHI, reference PVOUT | COUNTRY / OPERATOR | flood, salinity, grid strength, short-circuit, specific yield |
| R02 | S-DZA-S15-001 | DZA | same + tariff reference | COUNTRY / OPERATOR | same |
| R03 | G-EGY-G06-001 | EGY | same + tariff reference | COUNTRY / OPERATOR | same; Siwa 33/11 kV is **not** applied as Egypt default |
| R04 | H-JOR-H10-001 | JOR | frequency, voltage levels, operator, GHI, PVOUT | COUNTRY / OPERATOR | same |
| R05 | G-OMN-G12-001 | OMN | same + tariff reference | COUNTRY / OPERATOR | salinity is **not** inferred from coastline |
| R06 | H-PAK-H03-001 | PAK | frequency, voltage levels, operator, GHI, PVOUT | COUNTRY / OPERATOR | same |
| R07 | S-IND-S12-001 | IND | same + CERC tariff reference (applicability unknown) | COUNTRY / OPERATOR | national 400/220 kV list does not set `primaryKV` |
| R08 | G-THA-G15-001 | THA | frequency, voltage levels (22 kV MV, not 11 kV), operator, GHI, PVOUT | COUNTRY / OPERATOR | same |

GHI is never copied onto specific yield. Voltage lists record existence on the operator network. GHI vs reference PVOUT is `NOT_COMPARABLE`, not a source disagreement. No values are written onto templates.

Run: `node js/architecture/data/data.test.js` (includes `runPilot`). Templates in `templates.js` are not modified.
