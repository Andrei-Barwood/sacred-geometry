# Validation engine

Independent QA layer for Arquitectura Sagrada. Pure functions. Does **not** mutate templates. Does **not** silently clamp values.

## Severities

| Level | Meaning |
|---|---|
| ERROR | Cannot load the template into the calculator (math, schema, privacy, impossible physics). |
| WARNING | Loadable; needs engineering review. Split HIGH / MEDIUM / LOW. |
| NOTICE | Informational (e.g. yield pending site study). |
| ASSUMPTION | Conceptual value used to build the scenario. |

`null` means unknown/pending. `0` means a known zero. They are not interchangeable.

## Pipeline

`validateTemplate(template, { mode: "audit" \| "fast" })`

1. schema  
2. load profile  
3. generation / PV  
4. BESS  
5. substation / N-1  
6. grid  
7. transients  
8. energy / seasons  
9. economics  
10. region  
11. provenance  
12. privacy  
13. feeders  
14. application  
15. quality score  

`fast` stops after blocking schema errors. Tests and reports use `audit`.

`validateTemplateDataset(templates)` audits the whole atlas. Duplicate detection is **O(n)** via fingerprints (not O(n³)).

## Physics (selected)

- Load facets (motor/cyclic/thermal) **may overlap**; they are **not** required to sum to peak.  
- `loadFactor` vs `average/peak` compared with tolerance (not exact float equality).  
- BESS `durationHours = energyMWh / powerMW`.  
- Usable energy: `energyMWh × DoD`; delivered: `usable × RTE` only if `usableEnergyMWh` is not already stored.  
- Transformer: MVA stays MVA; MW = MVA × PF when PF exists.  
- Off-grid: BESS alone is not a generation source.  
- Inrush is demand-only; never added to monthly kWh.  
- Cost = energy × tariff, never kW × tariff without time. Missing energy → cost `null`, not `0`.

## Source-specific rules

`validationProfile === "consumption-study-6kw"` enables 6 kW clamp rules (±10 % resistive, DOL 5–8×, freezer duty). **Not** applied to utility PV, 132 kV substations, or 400 kV interfaces.

BESS 25 MW / 100 MWh = 4 h and 2 MW / 4 MWh = 2 h are **mathematical** benchmarks, not site recommendations.

Historical `346 × 252` tests **Energy × tariff** only. That tariff is not a public regional rate.

## Regional / provenance

Country must belong to `regionId` via `regional-profiles.js`. Low fit is a WARNING. Oasis-hamada exclusions apply only when the environment is oasis, not globally.

Provenance enum: `source-derived` (needs sourceId), `calculated`, `conceptual-assumption`, `user-input`, `future-site-study`. `verified` without a source is an ERROR. Null yield with `future-site-study` is a NOTICE.

## Scoring (0–100)

Weights: schema 20, mathematics 25, electrical 20, regional 15, provenance 10, diversity 10.  
Penalties: error 20, HIGH 6, MEDIUM 3, LOW 1.  
**Not** approval, compliance, or safety certification.

## Thresholds

Centralized in `validation-config.js` (DC/AC, BESS duration, utilization, feeder length, country share 15 %, etc.).

## Limitations (future detailed engineering)

The engine does **not** check local codes, protection, short-circuit, grounding, arc flash, selectivity, dynamics, stability, permits, or constructability.

## Known featured HIGH warning

`S-AFG-S04-001` (66/11 kV highland substation, weak-grid, no BESS/diesel). Valid mathematically. HIGH `WEAK_NO_STRATEGY` is appropriate for a substation-only weak-feeder scenario. Not auto-fixed.
