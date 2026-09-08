/**
 * Motor económico. Coste = energía_kWh × tarifa_por_kWh.
 * Nunca kW × tarifa. Nunca inrush × tarifa. Nunca fetch().
 */

import { fail, firstError, ok, requireFinite, requireNonNegative } from "./validation.js";
import { DEFAULT_DAYS_PER_MONTH, DEFAULT_MONTHS_PER_YEAR } from "./units.js";
import {
  SATS_PER_BTC,
  btcToSats,
  energyToKWh,
  formatBTC,
  formatSats,
  satsToBtc,
  setBitcoinPriceProvider,
  getBitcoinPriceProvider,
} from "./bitcoin.js";

export const TARIFF_MODES = Object.freeze(["btc", "sats", "fiat-converted"]);
export const COST_DAY_LABEL = "PROMEDIO DIARIO";
export const ANNUALIZED_ESTIMATE = "annualized estimate";
export const SEASONAL_ANNUAL = "seasonal annualization";

/**
 * Un solo método es autoridad. Los demás se derivan, no se editan por separado.
 */
export function resolveTariff(input) {
  if (input == null) {
    return fail("NULL_TARIFF", "tariff is null; no economic result");
  }
  if (typeof input !== "object") {
    return fail("INVALID_TARIFF", "tariff must be an object");
  }

  const mode = input.mode;
  if (!TARIFF_MODES.includes(mode)) {
    return fail("INVALID_TARIFF_MODE", `mode must be one of ${TARIFF_MODES.join(", ")}`);
  }

  if (mode === "btc") {
    const btc = requireNonNegative(input.btcPerKWh, "btcPerKWh");
    if (!btc.ok) return btc;
    const sats = btcToSats(btc.value);
    if (!sats.ok) return sats;
    return packTariff({
      mode,
      authority: "btcPerKWh",
      btcPerKWh: btc.value,
      satsPerKWh: sats.value,
      currency: input.currency ?? "BTC",
    });
  }

  if (mode === "sats") {
    const sats = requireNonNegative(input.satsPerKWh, "satsPerKWh");
    if (!sats.ok) return sats;
    const btc = satsToBtc(sats.value);
    if (!btc.ok) return btc;
    return packTariff({
      mode,
      authority: "satsPerKWh",
      btcPerKWh: btc.value,
      satsPerKWh: sats.value,
      currency: input.currency ?? "BTC",
    });
  }

  const fiat = requireNonNegative(input.fiatPerKWh, "fiatPerKWh");
  const fx = requireFinite(input.fiatPerBTC, "fiatPerBTC");
  const err = firstError([fiat, fx]);
  if (err) return err;
  if (fx.value <= 0) {
    return fail("NOT_POSITIVE", "fiatPerBTC must be > 0");
  }
  const btcPerKWh = fiat.value / fx.value;
  if (!Number.isFinite(btcPerKWh)) {
    return fail("NOT_FINITE", "fiat→BTC tariff is not finite");
  }
  const sats = btcToSats(btcPerKWh);
  if (!sats.ok) return sats;
  return packTariff({
    mode,
    authority: "fiat-converted",
    btcPerKWh,
    satsPerKWh: sats.value,
    fiatPerKWh: fiat.value,
    fiatPerBTC: fx.value,
    currency: input.currency ?? null,
    formula: "BTC/kWh = fiat_per_kWh / fiat_per_BTC",
  });
}

function packTariff(partial) {
  return ok({
    mode: partial.mode,
    authority: partial.authority,
    btcPerKWh: partial.btcPerKWh,
    satsPerKWh: partial.satsPerKWh,
    fiatPerKWh: partial.fiatPerKWh ?? null,
    fiatPerBTC: partial.fiatPerBTC ?? null,
    currency: partial.currency ?? null,
    formula: partial.formula || "sats/kWh = BTC/kWh × 100_000_000",
  });
}

/**
 * Primitiva: Cost = Energy × Tariff. Misma para fiat histórico y BTC.
 */
export function multiplyEnergyByTariff(energyKWh, tariffPerKWh) {
  const e = requireNonNegative(energyKWh, "energyKWh");
  const t = requireNonNegative(tariffPerKWh, "tariffPerKWh");
  const err = firstError([e, t]);
  if (err) return err;
  const cost = e.value * t.value;
  if (!Number.isFinite(cost)) {
    return fail("NOT_FINITE", "energy × tariff is not finite");
  }
  return ok(cost, { formula: "Cost = Energy_kWh × Tariff_per_kWh" });
}

export function calculateEnergyCostBTC(energyKWh, btcPerKWh) {
  return multiplyEnergyByTariff(energyKWh, btcPerKWh);
}

export function calculateEnergyCostSats(energyKWh, satsPerKWh) {
  return multiplyEnergyByTariff(energyKWh, satsPerKWh);
}

function costFromAuthority(energyKWh, tariff) {
  const resolved = tariff && tariff.authority ? ok(tariff) : resolveTariff(tariff);
  if (!resolved.ok) return resolved;
  const t = resolved.value;
  let btc;
  let sats;
  if (t.authority === "satsPerKWh") {
    sats = calculateEnergyCostSats(energyKWh, t.satsPerKWh);
    if (!sats.ok) return sats;
    btc = satsToBtc(sats.value);
    if (!btc.ok) return btc;
    return ok({ btc: btc.value, sats: sats.value, tariff: t });
  }
  btc = calculateEnergyCostBTC(energyKWh, t.btcPerKWh);
  if (!btc.ok) return btc;
  sats = btcToSats(btc.value);
  if (!sats.ok) return sats;
  return ok({ btc: btc.value, sats: sats.value, tariff: t });
}

export function costRangeFromEnergy(energyRange, tariff) {
  if (energyRange == null) {
    return fail("UNDEFINED", "energyRange is undefined");
  }
  const keys = ["min", "reference", "max"];
  const out = {
    minBTC: null,
    referenceBTC: null,
    maxBTC: null,
    minSats: null,
    referenceSats: null,
    maxSats: null,
  };
  for (const key of keys) {
    const e = energyRange[key];
    if (e == null) continue;
    const c = costFromAuthority(e, tariff);
    if (!c.ok) return c;
    out[`${key}BTC`] = c.value.btc;
    out[`${key}Sats`] = c.value.sats;
  }
  return ok(out);
}

function dailyAverage(monthlyValue, daysInPeriod) {
  const d = requireFinite(daysInPeriod, "daysInPeriod");
  if (!d.ok) return d;
  if (d.value <= 0) return fail("NOT_POSITIVE", "daysInPeriod must be > 0");
  const m = requireNonNegative(monthlyValue, "monthlyValue");
  if (!m.ok) return m;
  const daily = m.value / d.value;
  if (!Number.isFinite(daily)) return fail("NOT_FINITE", "daily average is not finite");
  return ok(daily, { label: COST_DAY_LABEL });
}

export function calculateEnergyCost(energyKWh, tariff, options = {}) {
  if (tariff == null) {
    return fail("NULL_TARIFF", "null tariff → no economic result");
  }
  const resolved = resolveTariff(tariff);
  if (!resolved.ok) return resolved;

  const unit = options.energyUnit || "kWh";
  const kwh = energyToKWh(energyKWh, unit);
  if (!kwh.ok) return kwh;

  const cost = costFromAuthority(kwh.value, resolved.value);
  if (!cost.ok) return cost;

  const days = options.daysInPeriod ?? options.daysPerMonth ?? DEFAULT_DAYS_PER_MONTH;
  const dayEnergy = dailyAverage(kwh.value, days);
  const dayCostBtc = dailyAverage(cost.value.btc, days);
  const dayCostSats = dailyAverage(cost.value.sats, days);
  if (!dayEnergy.ok) return dayEnergy;
  if (!dayCostBtc.ok) return dayCostBtc;
  if (!dayCostSats.ok) return dayCostSats;

  const yearEnergy = kwh.value * DEFAULT_MONTHS_PER_YEAR;
  const yearBtc = cost.value.btc * DEFAULT_MONTHS_PER_YEAR;
  const yearSats = cost.value.sats * DEFAULT_MONTHS_PER_YEAR;

  return ok({
    energy: {
      dayKWh: dayEnergy.value,
      monthKWh: kwh.value,
      yearKWh: yearEnergy,
      dayLabel: COST_DAY_LABEL,
      yearMethod: ANNUALIZED_ESTIMATE,
    },
    tariff: {
      btcPerKWh: resolved.value.btcPerKWh,
      satsPerKWh: resolved.value.satsPerKWh,
      mode: resolved.value.mode,
      authority: resolved.value.authority,
    },
    cost: {
      dayBTC: dayCostBtc.value,
      monthBTC: cost.value.btc,
      yearBTC: yearBtc,
      daySats: dayCostSats.value,
      monthSats: cost.value.sats,
      yearSats: yearSats,
      dayLabel: COST_DAY_LABEL,
    },
    inrushCost: null,
    display: {
      monthBTC: formatBTC(cost.value.btc).value,
      monthSats: formatSats(cost.value.sats).value,
    },
  });
}

export function calculateEnergyCostRange(energyRange, tariff, options = {}) {
  const range = costRangeFromEnergy(energyRange, tariff);
  if (!range.ok) return range;
  const refEnergy = energyRange.reference ?? energyRange.min ?? energyRange.max;
  if (refEnergy == null) {
    return ok({ range: range.value, point: null, inrushCost: null });
  }
  const point = calculateEnergyCost(refEnergy, tariff, options);
  if (!point.ok) return point;
  return ok({
    range: range.value,
    point: point.value,
    inrushCost: null,
  });
}

export function annualizeEnergy({
  monthlyKWh,
  winterMonthlyKWh,
  summerMonthlyKWh,
  otherMonthlyKWh,
  winterMonths,
  summerMonths,
  otherMonths,
} = {}) {
  const hasSeasons =
    winterMonths != null || summerMonths != null || otherMonths != null;

  if (!hasSeasons) {
    const m = requireNonNegative(monthlyKWh, "monthlyKWh");
    if (!m.ok) return m;
    const year = m.value * DEFAULT_MONTHS_PER_YEAR;
    if (!Number.isFinite(year)) return fail("NOT_FINITE", "annualized energy overflow");
    return ok({
      annualKWh: year,
      method: ANNUALIZED_ESTIMATE,
      winterMonths: null,
      summerMonths: null,
    });
  }

  const wM = winterMonths ?? 0;
  const sM = summerMonths ?? 0;
  const oM = otherMonths ?? 0;
  const wm = requireNonNegative(wM, "winterMonths");
  const sm = requireNonNegative(sM, "summerMonths");
  const om = requireNonNegative(oM, "otherMonths");
  const err = firstError([wm, sm, om]);
  if (err) return err;

  const wE = winterMonthlyKWh == null ? ok(0) : requireNonNegative(winterMonthlyKWh, "winterMonthlyKWh");
  const sE = summerMonthlyKWh == null ? ok(0) : requireNonNegative(summerMonthlyKWh, "summerMonthlyKWh");
  const oE = otherMonthlyKWh == null ? ok(0) : requireNonNegative(otherMonthlyKWh, "otherMonthlyKWh");
  const errE = firstError([wE, sE, oE]);
  if (errE) return errE;

  const annualKWh = wE.value * wm.value + sE.value * sm.value + oE.value * om.value;
  if (!Number.isFinite(annualKWh)) {
    return fail("NOT_FINITE", "seasonal annual energy is not finite");
  }
  return ok({
    annualKWh,
    method: SEASONAL_ANNUAL,
    winterMonths: wm.value,
    summerMonths: sm.value,
    otherMonths: om.value,
  });
}

export function calculateSeasonalCost({
  seasonalProfiles,
  tariff,
  winterMonths,
  summerMonths,
  otherMonths,
  daysInPeriod = DEFAULT_DAYS_PER_MONTH,
} = {}) {
  if (!seasonalProfiles || typeof seasonalProfiles !== "object") {
    return fail("UNDEFINED", "seasonalProfiles is required");
  }
  const resolved = resolveTariff(tariff);
  if (!resolved.ok) return resolved;

  const winterKWh = seasonalProfiles.winter && seasonalProfiles.winter.monthlyKWh;
  const summerKWh = seasonalProfiles.summer && seasonalProfiles.summer.monthlyKWh;
  const otherKWh = seasonalProfiles.custom && seasonalProfiles.custom.monthlyKWh;

  const annual = annualizeEnergy({
    winterMonthlyKWh: winterKWh,
    summerMonthlyKWh: summerKWh,
    otherMonthlyKWh: otherKWh,
    winterMonths,
    summerMonths,
    otherMonths,
  });
  if (!annual.ok) return annual;

  const yearCost = costFromAuthority(annual.value.annualKWh, resolved.value);
  if (!yearCost.ok) return yearCost;

  const seasons = {};
  for (const [name, profile] of Object.entries(seasonalProfiles)) {
    if (!profile || profile.monthlyKWh == null) continue;
    const t = profile.tariff ? resolveTariff(profile.tariff) : resolved;
    if (!t.ok) return t;
    const month = calculateEnergyCost(profile.monthlyKWh, t.value, { daysInPeriod });
    if (!month.ok) return month;
    seasons[name] = month.value;
  }

  return ok({
    annual: {
      energyKWh: annual.value.annualKWh,
      method: annual.value.method,
      btc: yearCost.value.btc,
      sats: yearCost.value.sats,
    },
    seasons,
    inrushCost: null,
  });
}

export function shareOfTotalPercent(part, total) {
  const p = requireNonNegative(part, "part");
  const t = requireFinite(total, "total");
  const err = firstError([p, t]);
  if (err) return err;
  if (t.value === 0) {
    if (p.value === 0) return ok(0);
    return fail("DIVISION_BY_ZERO", "total is 0");
  }
  if (t.value < 0) return fail("NEGATIVE", "total must be ≥ 0");
  const pct = (p.value / t.value) * 100;
  if (!Number.isFinite(pct)) return fail("NOT_FINITE", "share is not finite");
  return ok(pct);
}

export function costsByEquipment({ items, tariff, totalEnergyKWh } = {}) {
  const resolved = resolveTariff(tariff);
  if (!resolved.ok) return resolved;
  if (!Array.isArray(items)) {
    return fail("INVALID_ITEMS", "items must be an array");
  }

  const rows = [];
  let energySum = 0;
  let costSumBtc = 0;
  let standbyKWh = 0;
  let standbyBtc = 0;
  let standbySats = 0;

  for (const item of items) {
    const id = item.id;
    const e = requireNonNegative(item.energyKWh ?? 0, `energyKWh:${id}`);
    if (!e.ok) return e;
    const cost = costFromAuthority(e.value, resolved.value);
    if (!cost.ok) return cost;
    energySum += e.value;
    costSumBtc += cost.value.btc;

    const standby = item.standbyKWh == null ? 0 : item.standbyKWh;
    const sb = requireNonNegative(standby, `standbyKWh:${id}`);
    if (!sb.ok) return sb;
    const sbCost = costFromAuthority(sb.value, resolved.value);
    if (!sbCost.ok) return sbCost;
    standbyKWh += sb.value;
    standbyBtc += sbCost.value.btc;
    standbySats += sbCost.value.sats;

    rows.push({
      id,
      energyKWh: e.value,
      monthBTC: cost.value.btc,
      monthSats: cost.value.sats,
      standbyKWh: sb.value,
      standbyBTC: sbCost.value.btc,
      standbySats: sbCost.value.sats,
      inrushCost: null,
    });
  }

  const totalE = totalEnergyKWh != null ? totalEnergyKWh : energySum;
  const totalC = costFromAuthority(totalE, resolved.value);
  if (!totalC.ok) return totalC;

  for (const row of rows) {
    const eShare = shareOfTotalPercent(row.energyKWh, totalE);
    const cShare = shareOfTotalPercent(row.monthBTC, totalC.value.btc);
    if (!eShare.ok) return eShare;
    if (!cShare.ok) return cShare;
    row.shareOfTotalEnergyPercent = eShare.value;
    row.shareOfTotalCostPercent = cShare.value;
  }

  return ok({
    rows,
    totalEnergyKWh: totalE,
    totalBTC: totalC.value.btc,
    totalSats: totalC.value.sats,
    standbyKWh,
    standbyBTC: standbyBtc,
    standbySats,
    inrushCost: null,
    tariff: {
      btcPerKWh: resolved.value.btcPerKWh,
      satsPerKWh: resolved.value.satsPerKWh,
    },
  });
}

/**
 * Mismo motor para 346 kWh/mes o 50 000 MWh/año.
 */
export function calculateCostFromEnergy(energy, tariff, options = {}) {
  return calculateEnergyCost(energy, tariff, options);
}

export {
  formatBTC,
  formatSats,
  btcToSats,
  satsToBtc,
  SATS_PER_BTC,
  setBitcoinPriceProvider,
  getBitcoinPriceProvider,
  energyToKWh,
};
