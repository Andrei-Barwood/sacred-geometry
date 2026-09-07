# Report engine test results

`node js/architecture/report/report-engine.test.js` — **20 passed**.

| Fixture | Result |
|---|---|
| Empty draft | No crash; conceptual draft language |
| 6 kW study | Distinguishes kW vs kWh; freezer energy from engine (~115.2 kWh); heater current from source (~5.22 A) |
| Utility PV 25 MWp / BESS 25 MW 100 MWh / 33/11 kV | Units preserved |
| Invalid BESS 25 MW 50 MWh stored 4 h | Shows stored 4 h, calculated 2 h, ERROR; does not autofix |
| 346 kWh × 12 sats | Economics engine 4152 sats; report includes sats table when tariff set |
| Null tariff | Economics omitted; no 0 BTC |
| XSS names | Escaped in HTML |
| `/Users/example/private.pdf` | Not present in exported HTML |
| SYSTEM vs workbench graph | Semantic node/edge sets equal |
| Snapshot A/B | 25→30 MW, 100→120 MWh |
| Print CSS | `@media print` in export |

Browser print preview / A4 was not opened in this Node session.
