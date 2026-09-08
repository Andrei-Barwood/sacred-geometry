/**
 * Resultado controlado. Ninguna función pública debe entregar NaN o Infinity.
 */

export function ok(value, extra = {}) {
  return { ok: true, value, error: null, ...extra };
}

export function fail(code, message, extra = {}) {
  return {
    ok: false,
    value: null,
    error: { code, message },
    ...extra,
  };
}

export function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function isDefined(value) {
  return value !== undefined && value !== null;
}

/**
 * @returns {{ ok: true, value: number } | { ok: false, value: null, error: object }}
 */
export function requireFinite(value, name) {
  if (value === undefined) {
    return fail("UNDEFINED", `${name} is undefined`);
  }
  if (value === null) {
    return fail("NULL", `${name} is null`);
  }
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fail("NAN", `${name} is not a finite number`);
  }
  if (!Number.isFinite(value)) {
    return fail("NOT_FINITE", `${name} is not finite`);
  }
  return ok(value);
}

export function requireNonNegative(value, name) {
  const n = requireFinite(value, name);
  if (!n.ok) return n;
  if (n.value < 0) {
    return fail("NEGATIVE", `${name} must be ≥ 0`);
  }
  return n;
}

export function requirePositive(value, name) {
  const n = requireFinite(value, name);
  if (!n.ok) return n;
  if (n.value <= 0) {
    return fail("NOT_POSITIVE", `${name} must be > 0`);
  }
  return n;
}

export function firstError(results) {
  return results.find((r) => r && r.ok === false) || null;
}

export function finiteOrNull(value) {
  return isFiniteNumber(value) ? value : null;
}
