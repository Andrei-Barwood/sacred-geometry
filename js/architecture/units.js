/** Conversiones. Sin redondeo silencioso de resultados de ingeniería. */

export const WATTS_PER_KILOWATT = 1000;
export const KILOWATTS_PER_MEGAWATT = 1000;
export const WATTS_PER_MEGAWATT = WATTS_PER_KILOWATT * KILOWATTS_PER_MEGAWATT;
export const SECONDS_PER_HOUR = 3600;
export const HOURS_PER_DAY = 24;
export const DEFAULT_DAYS_PER_MONTH = 30;
export const DEFAULT_MONTHS_PER_YEAR = 12;
export const TABLE_VOLTAGE_V = 230;

export function wattsToKilowatts(powerW) {
  return powerW / WATTS_PER_KILOWATT;
}

export function kilowattsToWatts(powerKW) {
  return powerKW * WATTS_PER_KILOWATT;
}

export function kilowattsToMegawatts(powerKW) {
  return powerKW / KILOWATTS_PER_MEGAWATT;
}

export function megawattsToKilowatts(powerMW) {
  return powerMW * KILOWATTS_PER_MEGAWATT;
}

export function secondsToHours(seconds) {
  return seconds / SECONDS_PER_HOUR;
}

export function hoursToSeconds(hours) {
  return hours * SECONDS_PER_HOUR;
}

export function ratioToPercent(ratio) {
  return ratio * 100;
}

export function percentToRatio(percent) {
  return percent / 100;
}

/**
 * Redondeo explícito para comparación / UI. El valor de ingeniería se conserva aparte.
 */
export function roundTo(value, digits) {
  if (!Number.isFinite(value)) return null;
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}
