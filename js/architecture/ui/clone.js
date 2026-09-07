/**
 * Deep clone that never aliases the source.
 * Templates must remain immutable after a project is loaded.
 */

export function cloneValue(value) {
  if (value === undefined) return undefined;
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return jsonClone(value);
}

function jsonClone(value) {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value));
}

export function newProjectId(prefix = "WB") {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${t}-${r}`;
}
