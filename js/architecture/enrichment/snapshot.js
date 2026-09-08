import { CORE_ELECTRICAL_PATHS } from "./contract.js";

function getPath(obj, path) {
  const parts = String(path).split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

export function snapshotCoreMetrics(template) {
  const out = {};
  for (const path of CORE_ELECTRICAL_PATHS) {
    const v = getPath(template, path);
    out[path] = v === undefined ? null : v;
  }
  return out;
}

export function coreMetricsEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
