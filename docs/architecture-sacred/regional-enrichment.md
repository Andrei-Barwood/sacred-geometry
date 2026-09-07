# Progressive Regional Enrichment (13A)

Contract + **8-architecture pilot**. The remaining atlas is not enriched.

Records live in memory / exported JSON. `templates.js` is never written.

## Contract

```json
{
  "architecture_id": "G-MRT-G03-001",
  "region_id": "R01",
  "site_id": null,
  "template_id": "G-MRT-G03-001",
  "enrichment_status": "pending | partial | complete | blocked",
  "fields": [
    {
      "key": "frequencyHz",
      "value": 50,
      "unit": "Hz",
      "source_id": "SRC_SOMELEC_MRT",
      "source_url": "https://www.somelec.mr/",
      "retrieved_at": "2026-09-03T00:00:00.000Z",
      "freshness_days": 1,
      "confidence": 72,
      "conflict_ids": [],
      "method": "measured | official | derived | assumed | unknown"
    }
  ],
  "evidence_coverage": 0.31,
  "conflicts": [
    {
      "id": "ENR_C_frequencyHz_0",
      "field": "frequencyHz",
      "a": { "evidenceId": "…", "value": 50 },
      "b": { "evidenceId": "…", "value": 60 },
      "resolution": "unresolved | prefer_official | prefer_newer | manual"
    }
  ],
  "warnings": [],
  "last_enriched_at": "…",
  "batch_id": "…"
}
```

Batch envelope: `format: sacred-architecture-enrichment-batch`, plus `snapshot_before` / `snapshot_after` of core electrical metrics.

## Methods

| method | Meaning |
|---|---|
| official | Verified Data catalog (Tier 1/2) |
| derived | Electrical / Validation / BTC engine outputs only (`dcAcRatio`, `bessDurationHours`, `annualEnergyMWh`, …) |
| assumed | Conceptual template values (load archetype, grid mode, climate envelope) |
| unknown | No source; **value must be null** |
| measured | Reserved for site measurements (none in 13A) |

Inventing a number so the form looks full is a quality-gate failure.

Conflicts default to `unresolved`. There is no AI auto-resolution.

## Freshness thresholds (stale after N days)

| Kind | Fields | Stale (days) |
|---|---|---|
| frequency | `frequencyHz` | 7300 |
| operator | `gridOperator` | 1825 |
| voltage existence | `nominalVoltageLevelsKV` | 1825 |
| radiación | `ghiAnnual`, `referencePvout`, `specificYield` | 1825 |
| tarifas | `tariffReference`, `energyCharge` | 400 |
| normativa | `gridCodeReference`, `gridStrength` | 400 |
| demanda | peak load (assumed) | 1825 |
| climate | flood/salinity (unknown until sourced) | 1825 |
| btc | (not in 13A official set) | 7 |

Same change-class policy as the Verified Data layer. No universal 30-day TTL.

## How to run

1. Open the workbench Atlas → tab **Enrichment**.
2. **Re-enrich pilot (8)**, then **Enrich lote 9–24**, then **Enrich lote 25–48**. Progress shows `48/N`.
3. Filters: `batch_id`, coverage, conflictos, stale. The job is `running | done | failed` and does not lock the workbench.
4. **Export JSON**.

A failed 9–24 lote rolls back every `architecture_id` in that lote. Lote 25–48 continues if one architecture is blocked. Architectures 1–24 are left untouched.

`node js/architecture/enrichment/enrichment.test.js`

Coverage reports: `regional-enrichment-lote-9-24.md`, `regional-enrichment-lote-25-48.md`

## 13B checklist

- [x] Unlock enrichment for lote 9–24 (next 16 in stable atlas order). Not the full 96.
- [x] Persist batches in IndexedDB next to projects (`enrichments` / `enrichmentBatches` / `enrichmentJobs`, IDB v3)
- [ ] Optional `prefer_official` / `prefer_newer` only as **explicit user** actions
- [ ] Attach `site_id` from Geospatial when an architecture is evaluated at a site
- [x] Do not auto-verify the full 96
- [x] Keep GHI ≠ specific yield
- [x] Keep country voltage lists off `primaryKV`
- [x] Job `running/done/failed`; no half-writes; lote coverage gate ≥ 80% (required fields present, unknown allowed)
- [x] Next lote = 25–48

## 13C checklist

- [x] Lote 25–48 (24 architectures). 1–24 intact.
- [x] Cross-region catalog flags (same field, different region). Unresolved.
- [x] Coverage index by region
- [x] Perf log per architecture; yield per architecture (UI thread)
- [x] Blocked architecture does not halt the lote
- [x] Next lote = 49–end (62 remaining)
