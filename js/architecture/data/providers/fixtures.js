/**
 * Small synthetic provider fixtures for offline tests. Not full datasets.
 */

export const FIXTURE_BTC_USD = Object.freeze({
  bitcoin: { usd: 60000 },
});

export const FIXTURE_BTC_USD_QUOTE = Object.freeze({
  price: 60000,
  currency: "USD",
  retrievedAt: "2026-01-15T12:00:00.000Z",
});

export const FIXTURE_HTML = "<!doctype html><html><body>not json</body></html>";

export const FIXTURE_MALFORMED = "{ not json";

export const FIXTURE_POLLUTED = JSON.stringify({ bitcoin: { usd: 1 }, __proto__: { polluted: true } });

export const FIXTURE_MALICIOUS_TITLE = "<script>alert(1)</script>Official Grid";

export const FIXTURE_TARIFF_RESIDENTIAL = Object.freeze({
  currency: "USD",
  customerClass: "residential",
  energyCharge: 0.11,
});

export const FIXTURE_TARIFF_INDUSTRIAL = Object.freeze({
  currency: "USD",
  customerClass: "industrial",
  energyCharge: 0.08,
});
