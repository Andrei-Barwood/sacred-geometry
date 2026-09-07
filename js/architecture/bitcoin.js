/**
 * Unidades Bitcoin. Sin fetch, sin DOM, sin redondeo interno de costes.
 *
 * 1 BTC = 100_000_000 satoshis.
 * Los cálculos se hacen en satoshis cuando la tarifa autoridad es sats/kWh,
 * y en BTC cuando la autoridad es BTC/kWh. Un solo producto ENERGY × RATE.
 */

import { fail, firstError, ok, requireFinite, requireNonNegative } from "./validation.js";

export const SATS_PER_BTC = 100_000_000;
export const BTC_PER_SAT = 1 / SATS_PER_BTC;

let bitcoinPriceProvider = null;

/**
 * Extensión futura. El motor no llama a fetch() ni al provider.
 * Un provider posterior debería devolver { fiatPerBTC, currency } de forma síncrona
 * o como Promise; calculate* nunca lo invocan.
 *
 * @param {{ getFiatPerBTC?: Function, currency?: string } | null} provider
 */
export function setBitcoinPriceProvider(provider) {
  if (provider != null && (typeof provider !== "object" || Array.isArray(provider))) {
    return fail("INVALID_PROVIDER", "provider must be an object or null");
  }
  bitcoinPriceProvider = provider;
  return ok(provider);
}

export function getBitcoinPriceProvider() {
  return bitcoinPriceProvider;
}

export function btcToSats(btc) {
  const n = requireFinite(btc, "btc");
  if (!n.ok) return n;
  const sats = n.value * SATS_PER_BTC;
  if (!Number.isFinite(sats)) {
    return fail("NOT_FINITE", "btcToSats produced a non-finite result");
  }
  return ok(sats, { formula: "sats = BTC × 100_000_000" });
}

export function satsToBtc(sats) {
  const n = requireFinite(sats, "sats");
  if (!n.ok) return n;
  const btc = n.value / SATS_PER_BTC;
  if (!Number.isFinite(btc)) {
    return fail("NOT_FINITE", "satsToBtc produced a non-finite result");
  }
  return ok(btc, { formula: "BTC = sats / 100_000_000" });
}

/**
 * Presentación. No usar en la cadena de cálculo.
 * Evita notación científica.
 */
export function formatBTC(btc, options = {}) {
  const n = requireFinite(btc, "btc");
  if (!n.ok) return n;
  const abs = Math.abs(n.value);
  if (abs === 0) return ok("0 BTC");

  let digits = Number.isFinite(options.maxFractionDigits)
    ? options.maxFractionDigits
    : 8;
  if (abs > 0 && abs < 1e-8) {
    const needed = Math.ceil(-Math.log10(abs)) + 2;
    digits = Math.min(18, Math.max(digits, needed));
  }
  let body = abs.toFixed(digits);
  if (!options.keepTrailingZeros) {
    body = body.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
    if (body.includes(".")) body = body.replace(/0+$/, "").replace(/\.$/, "");
  }
  if (body === "" || body === "-") body = "0";
  const sign = n.value < 0 ? "-" : "";
  return ok(`${sign}${body} BTC`);
}

export function formatSats(sats, options = {}) {
  const n = requireFinite(sats, "sats");
  if (!n.ok) return n;
  const abs = Math.abs(n.value);
  const sign = n.value < 0 ? "-" : "";
  const whole = Math.abs(n.value - Math.round(n.value)) < 1e-6;
  if (whole) {
    return ok(`${sign}${Math.round(abs)} sats`);
  }
  const digits = Number.isFinite(options.maxFractionDigits)
    ? options.maxFractionDigits
    : 2;
  let body = abs.toFixed(digits);
  body = body.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
  return ok(`${sign}${body} sats`);
}

export function kWhFromMWh(mwh) {
  const n = requireFinite(mwh, "mwh");
  if (!n.ok) return n;
  const kwh = n.value * 1000;
  if (!Number.isFinite(kwh)) return fail("NOT_FINITE", "MWh→kWh overflow");
  return ok(kwh);
}

export function kWhFromGWh(gwh) {
  const n = requireFinite(gwh, "gwh");
  if (!n.ok) return n;
  const kwh = n.value * 1_000_000;
  if (!Number.isFinite(kwh)) return fail("NOT_FINITE", "GWh→kWh overflow");
  return ok(kwh);
}

export function energyToKWh(value, unit = "kWh") {
  const n = requireNonNegative(value, "energy");
  if (!n.ok) return n;
  if (unit === "kWh" || unit === "kwh") return ok(n.value);
  if (unit === "Wh" || unit === "wh") return ok(n.value / 1000);
  if (unit === "MWh" || unit === "mwh") return kWhFromMWh(n.value);
  if (unit === "GWh" || unit === "gwh") return kWhFromGWh(n.value);
  return fail("INVALID_UNIT", `unsupported energy unit ${unit}`);
}

export { firstError };
