# Enrichment operations (v1 frozen)

The 13A record contract is **frozen** (`SCHEMA_FROZEN_V1`). Prompt 14–16 must read it as-is.

## Record shape Prompt 14 should consume

No mapping layer. No copying GHI onto `specificYield`. No copying `nominalVoltageLevelsKV` onto `primaryKV`.

```
architecture_id, region_id, site_id, template_id,
enrichment_status,           // pending | partial | complete | blocked
fields[],                    // key, value, unit, source_id, source_url, retrieved_at, freshness_days, confidence, conflict_ids, method
evidence_coverage,           // 0–1
conflicts[],                 // unresolved unless the user later chooses prefer_official / prefer_newer / manual
warnings[],
last_enriched_at, batch_id,
regional_fit,                // annotation; not a recalculation
blocked_reason               // null, or explicit text when status is blocked
```

`method: unknown` ⇒ `value` must be `null`.

## How to re-enrich a region

Workbench: Enrichment tab → pick `R01`…`R08` → **Re-enrich region**.

Code:

```js
import { reenrichRegion } from "./js/architecture/enrichment/index.js";
await reenrichRegion("R05"); // yields per architecture; overwrites only that region’s ids
```

It does not rewrite `templates.js`. It does not recalculate MW / MWh / MVA / BTC.

## How stale is marked

Each field kind has a stale-after threshold (`ENRICHMENT_FRESHNESS_DAYS`): frequency 7300 d, operator/voltage/GHI 1825 d, tariffs/normativa 400 d, BTC 7 d.

`isStaleField(field)` is true when `retrieved_at` is older than that cap.

On enrich, stale fields add a warning: `N field(s) exceed freshness threshold.` The dashboard counts `stale_fields`. Filters expose `stale=yes`.

Re-enriching the region refreshes `retrieved_at` on official/derived fields from current catalog + engines. Unknown placeholders stay unknown (they have no `retrieved_at`, so they are not stale).
