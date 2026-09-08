/**
 * Live BTC spot for display only.
 * Does not enter ENERGY × RATE. Does not belong in comparison or PDF figures.
 */

import { SATS_PER_BTC } from "../bitcoin.js";

export const BTC_SPOT_STALE_MS = 60 * 60 * 1000;
export const BTC_SPOT_EXPIRED_MS = 24 * 60 * 60 * 1000;
export const BTC_SPOT_REFRESH_MS = 10 * 60 * 1000;

export function emptyBtcQuote() {
  return {
    price: null,
    currency: "USD",
    retrievedAt: null,
    source: "CoinGecko",
    sourceUrl: "https://www.coingecko.com/en/coins/bitcoin",
    status: "empty",
    error: null,
  };
}

export function quoteFromEvidence(ev, currency = "USD") {
  if (!ev || !Number.isFinite(ev.normalizedValue)) return emptyBtcQuote();
  return {
    price: ev.normalizedValue,
    currency: String(ev.unit || "").replace(/\/BTC$/i, "") || currency,
    retrievedAt: ev.retrievedAt || new Date().toISOString(),
    source: ev.sourceTitle || "CoinGecko",
    sourceUrl: ev.sourceUrl || "https://www.coingecko.com/en/coins/bitcoin",
    status: "ok",
    error: null,
  };
}

export function quoteFreshness(quote, now = Date.now()) {
  if (!quote || !Number.isFinite(quote.price) || !quote.retrievedAt) return "empty";
  const t = Date.parse(quote.retrievedAt);
  if (!Number.isFinite(t)) return "empty";
  const age = now - t;
  if (age > BTC_SPOT_EXPIRED_MS) return "expired";
  if (age > BTC_SPOT_STALE_MS) return "stale";
  return "fresh";
}

export function shouldRefreshQuote(quote, now = Date.now()) {
  if (!quote?.retrievedAt || !Number.isFinite(quote.price)) return true;
  const t = Date.parse(quote.retrievedAt);
  if (!Number.isFinite(t)) return true;
  return now - t >= BTC_SPOT_REFRESH_MS;
}

export function fiatFromBtc(btcAmount, fiatPerBTC) {
  if (!Number.isFinite(btcAmount) || !Number.isFinite(fiatPerBTC) || fiatPerBTC <= 0) return null;
  const fiat = btcAmount * fiatPerBTC;
  return Number.isFinite(fiat) ? fiat : null;
}

export function satsPerFiatUnit(fiatPerBTC) {
  if (!Number.isFinite(fiatPerBTC) || fiatPerBTC <= 0) return null;
  return SATS_PER_BTC / fiatPerBTC;
}

export function formatSpotFiat(amount, currency = "USD") {
  if (!Number.isFinite(amount)) return null;
  const cur = String(currency || "USD").toUpperCase();
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: Math.abs(amount) >= 100 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${cur}`;
  }
}

const FRESHNESS_LABEL = {
  fresh: "spot",
  stale: "spot atrasado",
  expired: "spot caducado",
  empty: "sin spot",
  offline: "sin red",
  error: "spot no disponible",
};

export function btcTickerModel(quote, economics = null, options = {}) {
  const now = options.now || Date.now();
  const offline = options.offline === true;
  const loading = options.loading === true;
  const q = quote && Number.isFinite(quote.price) ? quote : emptyBtcQuote();
  let freshness = quoteFreshness(q, now);
  if (offline && freshness === "empty") freshness = "offline";
  if (q.status === "error" && freshness === "empty") freshness = "error";

  const priceLabel = Number.isFinite(q.price)
    ? formatSpotFiat(q.price, q.currency || "USD")
    : "—";
  const time = q.retrievedAt ? String(q.retrievedAt).slice(11, 16) : "";
  const date = q.retrievedAt ? String(q.retrievedAt).slice(0, 10) : "";
  const line = Number.isFinite(q.price)
    ? `1 BTC ≈ ${priceLabel} · ${q.source || "CoinGecko"}${time ? ` · ${time} UTC` : ""}`
    : loading
      ? "Consultando spot BTC…"
      : FRESHNESS_LABEL[freshness] || "sin spot";

  const monthBtc = economics?.ok ? economics.value?.btcMonth : null;
  const monthFiat = fiatFromBtc(monthBtc, q.price);
  const monthFiatLabel = monthFiat == null ? null : `${formatSpotFiat(monthFiat, q.currency)} / mes (informativo, no entra al motor)`;
  const spu = satsPerFiatUnit(q.price);
  const satsLine =
    spu == null ? null : `1 ${q.currency || "USD"} ≈ ${Math.round(spu).toLocaleString("en-US")} sats`;

  return {
    line,
    freshness,
    freshnessLabel: FRESHNESS_LABEL[freshness] || freshness,
    price: q.price,
    currency: q.currency || "USD",
    retrievedAt: q.retrievedAt,
    source: q.source,
    sourceUrl: q.sourceUrl,
    monthFiat,
    monthFiatLabel,
    satsLine,
    loading,
    error: q.error || null,
    date,
  };
}
