/**
 * Optional Bitcoin spot provider. Manual / offline always works.
 * Live fetch is CoinGecko public JSON — no API key, no trading.
 */

import { createProvider } from "./interface.js";
import { PROVIDER_STATUS, CHANGE_CLASS, GRANULARITY } from "../constants.js";
import { createEvidence } from "../evidence-model.js";
import { fetchJson } from "../fetch-client.js";
import { validateEvidence } from "../evidence-validation.js";
import { btcQuoteRecord } from "../btc-conversion.js";

const VS = new Set(["usd", "eur", "gbp", "sar", "aed", "inr", "egp", "pkr", "thb", "kwd", "omr", "qar", "bhd", "jod", "dzd", "mad"]);

export function createBitcoinProvider(options = {}) {
  const live = options.live !== false;
  const fetchImpl = options.fetchJson || fetchJson;
  const fixture = options.fixture || null;

  return createProvider({
    id: "bitcoin",
    name: "Bitcoin price provider",
    parameters: ["btcPrice", "fiatPerBTC"],
    requiresNetwork: live && !fixture,
    isAvailable() {
      if (fixture) return true;
      if (!live) return true;
      return typeof fetch === "function";
    },
    supports(query) {
      const p = query?.parameter;
      return !p || p === "btcPrice" || p === "fiatPerBTC";
    },
    async fetchEvidence(query) {
      const currency = String(query.currency || query.quote || "USD").toLowerCase();
      if (fixture) {
        const quote = btcQuoteRecord({
          price: fixture.price,
          currency: fixture.currency || currency.toUpperCase(),
          sourceId: "SRC_COINGECKO_BTC",
          retrievedAt: fixture.retrievedAt || new Date().toISOString(),
          status: PROVIDER_STATUS.AVAILABLE,
        });
        return [quoteToEvidence(quote, query)];
      }
      if (!VS.has(currency)) {
        return [];
      }
      if (!live) return [];
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${encodeURIComponent(currency)}`;
      const res = await fetchImpl(url, { timeoutMs: query.timeoutMs, signal: query.signal });
      if (!res.ok) {
        const err = new Error(res.error || res.status);
        err.status = res.status;
        throw err;
      }
      const price = res.value?.bitcoin?.[currency];
      if (!Number.isFinite(price)) return [];
      const quote = btcQuoteRecord({
        price,
        currency: currency.toUpperCase(),
        pair: `${currency.toUpperCase()}/BTC`,
        sourceId: "SRC_COINGECKO_BTC",
        retrievedAt: new Date().toISOString(),
        status: PROVIDER_STATUS.AVAILABLE,
      });
      return [quoteToEvidence(quote, query)];
    },
    normalize(item, query) {
      if (item && item.parameter) return { ...item, providerId: "bitcoin" };
      return quoteToEvidence(item, query);
    },
    validate: validateEvidence,
  });
}

function quoteToEvidence(quote, query = {}) {
  return createEvidence({
    evidenceId: `EVD_BTC_${quote.currency}_${Date.parse(quote.retrievedAt) || "live"}`,
    parameter: query.parameter === "fiatPerBTC" ? "fiatPerBTC" : "btcPrice",
    rawValue: `${quote.price} ${quote.currency}/BTC`,
    normalizedValue: quote.price,
    unit: `${quote.currency}/BTC`,
    sourceId: "SRC_COINGECKO_BTC",
    sourceUrl: "https://www.coingecko.com/en/coins/bitcoin",
    sourceTitle: "CoinGecko Bitcoin spot",
    retrievedAt: quote.retrievedAt,
    publishedAt: quote.retrievedAt,
    geography: {},
    granularity: GRANULARITY.GLOBAL,
    methodology: "Public spot index. Conversion input only. Not a trading recommendation.",
    qualifiers: ["fast-changing", "spot", "not-trading"],
    changeClass: CHANGE_CLASS.FAST_CHANGING,
    providerId: "bitcoin",
    notes: "Do not persist as a timeless current price without retrievedAt.",
  });
}
