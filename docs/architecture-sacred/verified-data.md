# Verified Data / Evidence layer

Complements conceptual templates with **traceable external facts**. It does not replace the source model, calculators, atlas, regionalization, validation, graph, persistence, or report engines.

```
CONCEPTUAL TEMPLATE → CURRENT PROJECT VALUE
        │
        ├─ VERIFIED EVIDENCE CANDIDATES → USER REVIEW
        │
        └──────────────┬────────────────┘
                       ▼
                 ACCEPT / REJECT
                       ▼
                 PROJECT VALUE
```

Nothing fetched from a provider is written onto a project unless the user accepts a candidate.

## What “verified” means

Verified is not “looks reasonable” and not “the validation engine said the number is plausible.”

A record is verified only if it has an identifiable source, retrieval date, geographic scope, unit, context, extraction method, and a traceable evidence object.

Provenance classes stay distinct:

| Class | Meaning |
|---|---|
| conceptual-assumption | Template / scenario hypothesis |
| source-derived | Taken from an identified engineering source already in the project |
| verified-external | Accepted from this evidence layer |
| calculated | Produced by a calculation engine |
| user-input | Typed by the user (never auto-replaced) |
| future-site-study | Still to be determined on site |

Templates remain conceptual. Evidence lives in `js/architecture/data/` and in project-level `acceptedEvidence` metadata — never inside `templates.js`.

## Source registry

One registry: `SOURCE_REGISTRY` in `js/architecture/data/source-registry.js`. Workbench, reports, export, and providers all read it. IDs are stable tokens (`SRC_WORLD_BANK_GSA`), never URLs.

Authority tiers: `TIER_1_PRIMARY` (regulators, TSOs, official agencies, multilateral dataset owners), `TIER_2_INSTITUTIONAL`, `TIER_3_TECHNICAL_SECONDARY`, `TIER_4_REFERENCE`, `UNVERIFIED`. A Tier 1 record can still be stale, out of class, or out of region. Authority does not replace context.

## Evidence model

Each evidence object keeps `rawValue` and `normalizedValue` (`"230 V"` / `230` / `V`), geography, granularity (`GLOBAL` … `SITE` … `COORDINATE` … `EQUIPMENT`), `publishedAt` / `retrievedAt` / `validFrom` / `validTo`, methodology, qualifiers, confidence 0–100, and a short excerpt.

Country-level data is labelled COUNTRY. It is not treated as a site measurement.

## Freshness and confidence

`evaluateFreshness` is category-specific: grid frequency is STATIC (years), tariffs PERIODIC, Bitcoin FAST_CHANGING. There is no universal 30-day TTL.

`calculateEvidenceConfidence` scores evidence quality (authority, geographic match, freshness, method, units, conflicts). It is **not** an accuracy certificate.

Three scores stay separate:

- Validation **Quality Score** — internal consistency
- **Regional fit** — conceptual regional compatibility
- **Evidence coverage** — share of relevant parameters with accepted evidence

## Conflicts

`detectEvidenceConflicts` never averages. Residential vs industrial tariffs are `TARIFF_CLASS` (not a disagreement). GHI vs specific yield is `NOT_COMPARABLE`.

## Solar, climate, grid, tariff, BTC

- GHI / DNI / DHI / GTI / reference PVOUT / specific yield / capacity factor are different magnitudes. GHI is never copied onto `specificYield`.
- A verified solar resource does not imply fixed tilt, tracker, or bifacial.
- Climate does not invent corrosion from coastline, flood from rainfall, or soiling loss from dust climatology.
- National voltage lists record “this level exists on the operator network.” They do not set `project.primaryKV`.
- Grid strength and short-circuit level remain site / connection-point studies.
- Only `energyCharge` (currency/kWh) can feed the existing BTC/kWh engine. Demand and fixed charges are not flattened. TOU/tiered tariffs require a load profile.
- `BTC/kWh = fiat/kWh / fiat/BTC` with matching currencies. Bitcoin provider is optional, offline/manual still works, and is not a trading feed.

## Regional intelligence

`regionalIntelligence` is verified facts with evidence. It is not `regional-profiles.js` (conceptual heuristics). The two must not be mixed silently.

## Privacy and security

Provider queries send only the fields needed (parameter, country, class). No notes, names, paths, or automatic coordinates. Source URLs must be `http:`/`https:`. Titles are untrusted text. Provider payloads are data, never executed.

## Offline

The curated catalog and registry work without a network. Cache lives beside projects in IndexedDB (v2 extra stores). Clearing the cache does not delete projects or accepted evidence.
