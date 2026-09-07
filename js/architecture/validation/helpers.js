import { WATTS_PER_KILOWATT, KILOWATTS_PER_MEGAWATT } from "../units.js";

export function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function isNull(value) {
  return value === null;
}

export function isAbsent(value) {
  return value === null || value === undefined;
}

export function isPositive(value) {
  return isFiniteNumber(value) && value > 0;
}

export function isNonNegative(value) {
  return isFiniteNumber(value) && value >= 0;
}

export function isFraction(value) {
  return isFiniteNumber(value) && value >= 0 && value <= 1;
}

export function isPercentage(value) {
  return isFiniteNumber(value) && value >= 0 && value <= 100;
}

export function validRange(min, reference, max) {
  if (isFiniteNumber(min) && isFiniteNumber(max) && min > max) return false;
  if (isFiniteNumber(min) && isFiniteNumber(reference) && reference < min) return false;
  if (isFiniteNumber(max) && isFiniteNumber(reference) && reference > max) return false;
  return true;
}

export function approximatelyEqual(a, b, absTol = 1e-9, relTol = 1e-6) {
  if (!isFiniteNumber(a) || !isFiniteNumber(b)) return false;
  const diff = Math.abs(a - b);
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return diff <= absTol || diff <= relTol * scale;
}

export function assertKnownNumber(value, name, issues, category) {
  if (value === undefined) return false;
  if (value === null) return false;
  if (typeof value === "string") {
    issues.error("AMBIGUOUS_NUMBER", `${name} is a string, not a number`, { category });
    return false;
  }
  if (typeof value !== "number" || Number.isNaN(value)) {
    issues.error("NAN", `${name} is NaN or not numeric`, { category });
    return false;
  }
  if (!Number.isFinite(value)) {
    issues.error("NOT_FINITE", `${name} is Infinity`, { category });
    return false;
  }
  return true;
}

export function checkNonNegative(value, name, issues, category) {
  if (!assertKnownNumber(value, name, issues, category)) return false;
  if (value < 0) {
    issues.error("NEGATIVE", `${name} is negative`, { category });
    return false;
  }
  return true;
}

export function checkFraction(value, name, issues, category) {
  if (!assertKnownNumber(value, name, issues, category)) return false;
  if (value < 0 || value > 1) {
    issues.error("FRACTION", `${name} must be in [0, 1]`, { category });
    return false;
  }
  return true;
}

export function wattsPerKw() {
  return WATTS_PER_KILOWATT;
}

export function kwPerMw() {
  return KILOWATTS_PER_MEGAWATT;
}
