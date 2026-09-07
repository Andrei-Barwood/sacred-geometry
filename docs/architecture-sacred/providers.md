# Providers

All providers implement `isAvailable`, `supports`, `fetchEvidence`, `normalize`, `validate`. They return `Evidence[]` and never mutate a project. Failure (timeout, HTTP, CORS, invalid JSON, no data) leaves the app running with the existing assumption or a site-study flag. No silent “typical” fallback.

No API secrets are stored in the repo. No public CORS proxies. No usage analytics.

| Provider | Purpose | Parameters | Source | Auth | Network | Cache | Limits |
|---|---|---|---|---|---|---|---|
| **grid** | Nominal frequency, voltage levels that exist, operator | `frequencyHz`, `nominalVoltageLevelsKV`, `gridOperator` | Curated catalog citing national operators / IEC | none | offline catalog | catalog | Country/operator scope only. Voltage list ≠ project kV. |
| **solar** | Country-level GHI and GSA reference PVOUT | `ghiAnnual`, `referencePvout` | World Bank / ESMAP Global Solar Atlas | none | offline catalog | catalog | Not specific yield. Not tracker/bifacial. Not site GHI. |
| **climate** | Prepared interface | temperature, humidity, flood, salinity, soiling | none packaged | none | none | n/a | Returns `NO_DATA` / site-study. No climate fiction. |
| **tariff** | Official tariff **references** | `tariffReference` | National regulators | none | offline catalog | catalog | No numeric retail rate unless class, voltage, and energy charge are explicit. Applicability often unknown. |
| **bitcoin** | Optional spot FX for unit conversion | `btcPrice`, `fiatPerBTC` | CoinGecko public JSON or manual | none | optional live GET | short | Fast-changing. Manual refresh only. No trading. Offline/manual always works. |

## Query

Minimal: `{ parameter, country, region, customerClass?, currency? }`. Coordinates are not sent unless the user opts in for a provider that needs them (none do in this phase).

## Live Bitcoin

`GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=…`  
Timeout 8 s, 256 KB cap, redirects rejected, JSON only. Rate-limit → `RATE_LIMITED`. HTML or malformed JSON → error, no parse-eval.

## What is not implemented

Live Global Solar Atlas coordinate API, climate station APIs, FX meshes, mass enrichment of the 96+ templates, maps / geolocation.
