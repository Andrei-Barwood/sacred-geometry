/**
 *   node js/architecture/ui/btc-ticker.test.js
 */

import assert from "node:assert/strict";
import {
  btcTickerModel,
  emptyBtcQuote,
  fiatFromBtc,
  quoteFreshness,
  quoteFromEvidence,
  satsPerFiatUnit,
  shouldRefreshQuote,
  BTC_SPOT_REFRESH_MS,
} from "./btc-ticker.js";

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failed += 1;
    console.error(`FAIL  ${name}\n      ${err.message}`);
  }
}

test("fiatFromBtc is display multiply, not a new tariff", () => {
  assert.equal(fiatFromBtc(0.001, 100_000), 100);
  assert.equal(fiatFromBtc(null, 100_000), null);
  assert.equal(fiatFromBtc(1, 0), null);
});

test("sats per fiat unit from spot", () => {
  assert.equal(Math.round(satsPerFiatUnit(100_000)), 1000);
});

test("freshness bands", () => {
  const now = Date.parse("2026-09-07T12:00:00.000Z");
  const q = { price: 90000, retrievedAt: "2026-09-07T11:50:00.000Z" };
  assert.equal(quoteFreshness(q, now), "fresh");
  assert.equal(quoteFreshness({ price: 1, retrievedAt: "2026-09-07T10:00:00.000Z" }, now), "stale");
  assert.equal(quoteFreshness({ price: 1, retrievedAt: "2026-09-01T12:00:00.000Z" }, now), "expired");
  assert.equal(quoteFreshness(emptyBtcQuote(), now), "empty");
});

test("ticker model labels informational fiat and does not invent a winner", () => {
  const quote = quoteFromEvidence({
    normalizedValue: 100000,
    unit: "USD/BTC",
    retrievedAt: "2026-09-07T12:00:00.000Z",
    sourceTitle: "CoinGecko Bitcoin spot",
  });
  const eco = { ok: true, value: { btcMonth: 0.002 } };
  const m = btcTickerModel(quote, eco, { now: Date.parse("2026-09-07T12:05:00.000Z") });
  assert.equal(m.freshness, "fresh");
  assert.equal(m.monthFiat, 200);
  assert.match(m.monthFiatLabel, /informativo/);
  assert.match(m.line, /100,000/);
  assert.equal("score" in m, false);
});

test("shouldRefresh respects 10 minute floor", () => {
  const now = Date.parse("2026-09-07T12:00:00.000Z");
  assert.equal(shouldRefreshQuote({ price: 1, retrievedAt: "2026-09-07T11:55:00.000Z" }, now), false);
  assert.equal(shouldRefreshQuote({ price: 1, retrievedAt: new Date(now - BTC_SPOT_REFRESH_MS - 1).toISOString() }, now), true);
  assert.equal(shouldRefreshQuote(emptyBtcQuote(), now), true);
});

console.log(`\nBTC ticker tests: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
