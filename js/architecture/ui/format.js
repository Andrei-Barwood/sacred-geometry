/**
 * Presentation helpers. Never used as calculation inputs.
 * Source values stay full precision in state.
 */

import { formatBTC, formatSats } from "../bitcoin.js";
import { roundTo } from "../units.js";
import { PROVENANCE_LABELS } from "./constants.js";

export function isDisplayableNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function formatNumber(value, digits = 2) {
  if (value == null) return "—";
  if (!isDisplayableNumber(value)) return "—";
  const rounded = roundTo(value, digits);
  if (rounded == null) return "—";
  if (Object.is(rounded, -0)) return "0";
  return String(rounded);
}

export function formatFixed(value, digits) {
  if (!isDisplayableNumber(value)) return "—";
  let body = value.toFixed(digits);
  body = body.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
  return body;
}

/**
 * Auto-scale power for labels. `from` is the canonical unit of `value`.
 */
export function formatPower(value, from = "MW", digits = 2) {
  if (!isDisplayableNumber(value)) return "—";
  const mw =
    from === "W" ? value / 1e6 : from === "kW" ? value / 1e3 : value;
  const abs = Math.abs(mw);
  if (abs >= 1) return `${formatNumber(mw, digits)} MW`;
  if (abs >= 0.001) return `${formatNumber(mw * 1e3, digits)} kW`;
  return `${formatNumber(mw * 1e6, digits >= 2 ? 0 : digits)} W`;
}

export function formatEnergy(value, from = "MWh", digits = 2) {
  if (!isDisplayableNumber(value)) return "—";
  const mwh =
    from === "kWh" ? value / 1e3 : from === "Wh" ? value / 1e6 : value;
  const abs = Math.abs(mwh);
  if (abs >= 1) return `${formatNumber(mwh, digits)} MWh`;
  return `${formatNumber(mwh * 1e3, digits)} kWh`;
}

export function formatCurrent(valueA) {
  if (!isDisplayableNumber(valueA)) return "—";
  const abs = Math.abs(valueA);
  if (abs >= 1000) return `${formatNumber(valueA / 1000, 2)} kA`;
  return `${formatNumber(valueA, 2)} A`;
}

export function formatVoltageKV(kv) {
  if (!isDisplayableNumber(kv)) return "—";
  if (kv < 1) return `${formatNumber(kv * 1000, 0)} V`;
  return `${formatNumber(kv, kv >= 10 ? 0 : 1)} kV`;
}

export function formatPercent(ratioOrPercent, { isPercent = false, digits = 1 } = {}) {
  if (!isDisplayableNumber(ratioOrPercent)) return "—";
  const pct = isPercent ? ratioOrPercent : ratioOrPercent * 100;
  return `${formatNumber(pct, digits)} %`;
}

export function formatBTCDisplay(btc) {
  if (btc == null) return null;
  const r = formatBTC(btc);
  return r.ok ? r.value : null;
}

export function formatSatsDisplay(sats) {
  if (sats == null) return null;
  const r = formatSats(sats);
  return r.ok ? r.value : null;
}

export function provenanceLabel(code) {
  return PROVENANCE_LABELS[code] || null;
}

export function unitSuffix(unit) {
  if (!unit) return "";
  return String(unit);
}

/**
 * Parse a numeric field. Empty → null (unknown). Invalid → { invalid: true }.
 * Never coerces "" to 0.
 */
export function parseNumericInput(raw) {
  if (raw === "" || raw == null) {
    return { ok: true, value: null };
  }
  const text = String(raw).trim();
  if (text === "") return { ok: true, value: null };
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) {
    return { ok: false, value: undefined, invalid: true };
  }
  const n = Number(text);
  if (!Number.isFinite(n)) return { ok: false, value: undefined, invalid: true };
  return { ok: true, value: n };
}

export function displayInputValue(value) {
  if (value == null) return "";
  if (!isDisplayableNumber(value)) return "";
  return String(value);
}
