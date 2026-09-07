/**
 * Tests del motor económico. Ejecutar:
 *   node js/architecture/economics.test.js
 *
 * 252 unidades/kWh es un chequeo histórico de Energy×Tariff, no una tarifa pública.
 */

import assert from "node:assert/strict";
import {
  SATS_PER_BTC,
  btcToSats,
  satsToBtc,
  formatBTC,
  formatSats,
  energyToKWh,
  setBitcoinPriceProvider,
  getBitcoinPriceProvider,
  resolveTariff,
  multiplyEnergyByTariff,
  calculateEnergyCostBTC,
  calculateEnergyCostSats,
  calculateEnergyCost,
  calculateEnergyCostRange,
  costRangeFromEnergy,
  annualizeEnergy,
  calculateSeasonalCost,
  shareOfTotalPercent,
  costsByEquipment,
  COST_DAY_LABEL,
  ANNUALIZED_ESTIMATE,
  SEASONAL_ANNUAL,
} from "./economics.js";

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

function approx(actual, expected, eps, label) {
  assert.ok(
    Math.abs(actual - expected) <= eps,
    `${label}: expected ${expected} ± ${eps}, got ${actual}`
  );
}

test("1 BTC = 100,000,000 sats", () => {
  assert.equal(SATS_PER_BTC, 100_000_000);
  const s = btcToSats(1);
  assert.equal(s.ok, true);
  assert.equal(s.value, 100_000_000);
});

test("1 sat = 0.00000001 BTC", () => {
  const b = satsToBtc(1);
  assert.equal(b.value, 0.00000001);
  const back = btcToSats(0.00000001);
  approx(back.value, 1, 1e-9, "roundtrip sat");
});

test("0 kWh → 0 BTC", () => {
  const c = calculateEnergyCostBTC(0, 0.001);
  assert.equal(c.value, 0);
  const z = calculateEnergyCost(0, { mode: "sats", satsPerKWh: 50 });
  assert.equal(z.value.cost.monthBTC, 0);
  assert.equal(z.value.cost.monthSats, 0);
});

test("negative tariff rejected", () => {
  const t = resolveTariff({ mode: "btc", btcPerKWh: -0.1 });
  assert.equal(t.ok, false);
  const c = calculateEnergyCostBTC(10, -1);
  assert.equal(c.ok, false);
  assert.equal(c.value, null);
});

test("negative energy rejected", () => {
  const c = calculateEnergyCostBTC(-1, 0.01);
  assert.equal(c.ok, false);
  assert.equal(c.value, null);
});

test("null tariff → no economic result", () => {
  const c = calculateEnergyCost(100, null);
  assert.equal(c.ok, false);
  assert.equal(c.error.code, "NULL_TARIFF");
  assert.equal(c.value, null);
});

test("historical Energy×Tariff: 346 × 252 = 87192", () => {
  const r = multiplyEnergyByTariff(346, 252);
  assert.equal(r.ok, true);
  assert.equal(r.value, 87192);
  assert.equal(r.formula, "Cost = Energy_kWh × Tariff_per_kWh");
});

test("historical Energy×Tariff: 236 × 252 = 59472", () => {
  const r = multiplyEnergyByTariff(236, 252);
  assert.equal(r.value, 59472);
});

test("BTC path uses the same Energy×Tariff architecture", () => {
  const btc = calculateEnergyCostBTC(346, 0.000002);
  approx(btc.value, 346 * 0.000002, 1e-18, "346 kWh BTC");
  const fromSats = calculateEnergyCostSats(346, 200);
  assert.equal(fromSats.value, 346 * 200);
});

test("sats authority derives BTC/kWh; BTC authority derives sats/kWh", () => {
  const fromSats = resolveTariff({ mode: "sats", satsPerKWh: 250 });
  assert.equal(fromSats.value.authority, "satsPerKWh");
  approx(fromSats.value.btcPerKWh, 250 / 100_000_000, 1e-18, "derive BTC");
  const fromBtc = resolveTariff({ mode: "btc", btcPerKWh: 0.000001 });
  assert.equal(fromBtc.value.authority, "btcPerKWh");
  approx(fromBtc.value.satsPerKWh, 100, 1e-9, "derive sats");
});

test("range 90–140 kWh produces a cost range, not a single point", () => {
  const tariff = { mode: "sats", satsPerKWh: 100 };
  const range = costRangeFromEnergy(
    { min: 90, reference: 120, max: 140 },
    tariff
  );
  assert.equal(range.ok, true);
  assert.equal(range.value.minSats, 9000);
  assert.equal(range.value.referenceSats, 12000);
  assert.equal(range.value.maxSats, 14000);
  approx(range.value.minBTC, 9000 / 1e8, 1e-18, "min BTC");
  const packed = calculateEnergyCostRange(
    { min: 90, reference: 120, max: 140 },
    tariff
  );
  assert.equal(packed.value.point.energy.monthKWh, 120);
  assert.equal(packed.value.inrushCost, null);
});

test("fiat → BTC conversion is user-supplied, not an API", () => {
  const t = resolveTariff({
    mode: "fiat-converted",
    fiatPerKWh: 0.12,
    fiatPerBTC: 60_000,
    currency: "USD",
  });
  assert.equal(t.ok, true);
  approx(t.value.btcPerKWh, 0.12 / 60_000, 1e-18, "0.12/60000");
  const cost = calculateEnergyCost(100, t.value);
  approx(cost.value.cost.monthBTC, 100 * (0.12 / 60_000), 1e-18, "100 kWh");
});

test("daily cost is labeled PROMEDIO DIARIO", () => {
  const c = calculateEnergyCost(346, { mode: "sats", satsPerKWh: 10 }, { daysInPeriod: 30 });
  assert.equal(c.value.energy.dayLabel, COST_DAY_LABEL);
  assert.equal(c.value.cost.dayLabel, COST_DAY_LABEL);
  approx(c.value.energy.dayKWh, 346 / 30, 1e-12, "avg day kWh");
  approx(c.value.cost.daySats, (346 * 10) / 30, 1e-12, "avg day sats");
});

test("annualized estimate vs seasonal annualization", () => {
  const flat = annualizeEnergy({ monthlyKWh: 300 });
  assert.equal(flat.value.annualKWh, 3600);
  assert.equal(flat.value.method, ANNUALIZED_ESTIMATE);

  const seasonal = annualizeEnergy({
    winterMonthlyKWh: 346,
    summerMonthlyKWh: 236,
    winterMonths: 4,
    summerMonths: 8,
  });
  assert.equal(seasonal.value.annualKWh, 346 * 4 + 236 * 8);
  assert.equal(seasonal.value.annualKWh, 3272);
  assert.equal(seasonal.value.method, SEASONAL_ANNUAL);

  const priced = calculateSeasonalCost({
    seasonalProfiles: {
      winter: { monthlyKWh: 346 },
      summer: { monthlyKWh: 236 },
    },
    tariff: { mode: "sats", satsPerKWh: 1 },
    winterMonths: 4,
    summerMonths: 8,
  });
  assert.equal(priced.value.annual.energyKWh, 3272);
  assert.equal(priced.value.annual.sats, 3272);
  assert.equal(priced.value.annual.method, SEASONAL_ANNUAL);
});

test("standby costs are separate; inrush is never billed", () => {
  const by = costsByEquipment({
    tariff: { mode: "sats", satsPerKWh: 20 },
    items: [
      { id: "freezer-storage", energyKWh: 120, standbyKWh: 0 },
      { id: "gate-standby", energyKWh: 3.6, standbyKWh: 3.6 },
    ],
  });
  assert.equal(by.ok, true);
  assert.equal(by.value.standbyKWh, 3.6);
  assert.equal(by.value.standbySats, 3.6 * 20);
  assert.equal(by.value.inrushCost, null);
  assert.equal(by.value.rows[0].inrushCost, null);
});

test("share of energy equals share of cost at a common tariff", () => {
  const by = costsByEquipment({
    tariff: { mode: "btc", btcPerKWh: 0.00001 },
    items: [
      { id: "a", energyKWh: 120 },
      { id: "b", energyKWh: 80 },
      { id: "c", energyKWh: 200 },
    ],
  });
  assert.equal(by.value.totalEnergyKWh, 400);
  for (const row of by.value.rows) {
    approx(
      row.shareOfTotalEnergyPercent,
      row.shareOfTotalCostPercent,
      1e-10,
      `${row.id} energy share vs cost share`
    );
  }
  approx(by.value.rows[0].shareOfTotalEnergyPercent, 30, 1e-12, "120/400");
});

test("formatBTC avoids scientific notation on tiny amounts", () => {
  const tiny = formatBTC(1.234567891234e-7);
  assert.equal(tiny.ok, true);
  assert.equal(tiny.value.includes("e"), false);
  assert.equal(tiny.value.includes("E"), false);
  assert.match(tiny.value, /BTC$/);
  const sats = formatSats(123);
  assert.equal(sats.value, "123 sats");
  const zero = formatBTC(0);
  assert.equal(zero.value, "0 BTC");
});

test("extremely small BTC/kWh remains finite and formattable", () => {
  const t = resolveTariff({ mode: "btc", btcPerKWh: 1e-16 });
  const c = calculateEnergyCost(50, t.value);
  assert.equal(c.ok, true);
  assert.ok(Number.isFinite(c.value.cost.monthBTC));
  assert.ok(Number.isFinite(c.value.cost.monthSats));
  const shown = formatBTC(c.value.cost.monthBTC);
  assert.equal(shown.value.includes("e"), false);
});

test("utility-scale MWh uses the same Energy×Tariff motor", () => {
  const kwh = energyToKWh(50_000, "MWh");
  assert.equal(kwh.value, 50_000_000);
  const c = calculateEnergyCost(50_000, { mode: "sats", satsPerKWh: 2 }, { energyUnit: "MWh" });
  assert.equal(c.value.energy.monthKWh, 50_000_000);
  assert.equal(c.value.cost.monthSats, 100_000_000);
  assert.equal(c.value.cost.monthBTC, 1);
});

test("cost needs energy (kWh), not power (kW)", () => {
  const sixKWh = multiplyEnergyByTariff(6, 10);
  assert.equal(sixKWh.value, 60);
  const sixKWForFiveHours = multiplyEnergyByTariff(6 * 5, 10);
  assert.equal(sixKWForFiveHours.value, 300);
  assert.notEqual(sixKWh.value, sixKWForFiveHours.value);
});

test("setBitcoinPriceProvider is stored but calculate* never calls it", () => {
  let called = 0;
  const provider = {
    getFiatPerBTC() {
      called += 1;
      return 99_999;
    },
  };
  setBitcoinPriceProvider(provider);
  assert.equal(getBitcoinPriceProvider(), provider);
  calculateEnergyCost(10, { mode: "sats", satsPerKWh: 1 });
  resolveTariff({
    mode: "fiat-converted",
    fiatPerKWh: 0.2,
    fiatPerBTC: 80_000,
  });
  assert.equal(called, 0);
  setBitcoinPriceProvider(null);
  assert.equal(getBitcoinPriceProvider(), null);
});

test("NaN / Infinity rejected", () => {
  assert.equal(calculateEnergyCostBTC(NaN, 1).ok, false);
  assert.equal(calculateEnergyCostBTC(Infinity, 1).ok, false);
  assert.equal(btcToSats(Infinity).ok, false);
  assert.equal(resolveTariff({ mode: "sats", satsPerKWh: NaN }).ok, false);
});

console.log(`\n${passed} passed, ${failed} failed, ${passed + failed} total`);
if (failed) process.exitCode = 1;
