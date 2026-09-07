/**
 * BTC conversion for verified tariffs. Does not trade, predict, or wallet.
 * BTC/kWh = fiat/kWh / fiat/BTC. Currencies must match.
 */

import { SATS_PER_BTC } from "../bitcoin.js";

export function convertFiatTariffToBtc(energyCharge, btcPrice) {
  if (energyCharge == null || btcPrice == null) {
    return { ok: false, error: "missing-inputs", btcPerKWh: null, satsPerKWh: null };
  }
  const fiatPerKWh = Number(energyCharge.value ?? energyCharge);
  const fiatPerBTC = Number(btcPrice.price ?? btcPrice.value ?? btcPrice);
  const c1 = energyCharge.currency || energyCharge.unitCurrency || null;
  const c2 = btcPrice.currency || btcPrice.pair?.split("/")?.[0] || btcPrice.quote || null;
  if (!Number.isFinite(fiatPerKWh) || !Number.isFinite(fiatPerBTC) || fiatPerBTC <= 0) {
    return { ok: false, error: "invalid-numbers", btcPerKWh: null, satsPerKWh: null };
  }
  if (c1 && c2 && String(c1).toUpperCase() !== String(c2).toUpperCase()) {
    return {
      ok: false,
      error: "currency-mismatch",
      message: "Currency conversion required.",
      btcPerKWh: null,
      satsPerKWh: null,
      tariffCurrency: c1,
      btcCurrency: c2,
    };
  }
  const btcPerKWh = fiatPerKWh / fiatPerBTC;
  if (!Number.isFinite(btcPerKWh)) {
    return { ok: false, error: "not-finite", btcPerKWh: null, satsPerKWh: null };
  }
  return {
    ok: true,
    error: null,
    btcPerKWh,
    satsPerKWh: btcPerKWh * SATS_PER_BTC,
    formula: "BTC/kWh = fiat/kWh / fiat/BTC",
    tariffCurrency: c1,
    btcCurrency: c2 || c1,
    tariff: energyCharge,
    btcPrice,
  };
}

export function btcQuoteRecord(partial) {
  return {
    pair: partial.pair || `${partial.currency || "USD"}/BTC`,
    price: partial.price,
    currency: partial.currency || "USD",
    sourceId: partial.sourceId || null,
    retrievedAt: partial.retrievedAt || null,
    status: partial.status || "AVAILABLE",
  };
}
