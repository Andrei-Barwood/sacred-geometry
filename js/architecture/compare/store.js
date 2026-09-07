/**
 * Saved comparison objects live on the project document.
 */

import { newId, nowIso } from "../storage/schema.js";
import { COMPARISON_THRESHOLD_DEFAULT } from "./fields.js";

export function emptyComparison(partial = {}) {
  return {
    id: partial.id || newId(),
    name: partial.name || "Comparación",
    createdAt: partial.createdAt || nowIso(),
    updatedAt: partial.updatedAt || nowIso(),
    thresholdPct: Number.isFinite(partial.thresholdPct) ? partial.thresholdPct : COMPARISON_THRESHOLD_DEFAULT,
    userFormula: typeof partial.userFormula === "string" ? partial.userFormula : "",
    slots: Array.isArray(partial.slots) ? partial.slots.slice(0, 3) : [],
  };
}

export function normalizeSlot(slot) {
  if (!slot || typeof slot !== "object") return null;
  return {
    kind: slot.kind || "",
    id: slot.id || "",
    snapshotId: slot.snapshotId || null,
    siteId: slot.siteId || null,
    label: slot.label || "",
    engineVersion: slot.engineVersion || null,
  };
}

export function listComparisons(document) {
  return Array.isArray(document?.comparisons) ? document.comparisons : [];
}

export function saveComparison(document, comparison) {
  const rec = emptyComparison({
    ...comparison,
    slots: (comparison.slots || []).map(normalizeSlot).filter((s) => s && s.kind && s.id),
    updatedAt: nowIso(),
  });
  const next = { ...(document || {}), comparisons: [...listComparisons(document)] };
  const i = next.comparisons.findIndex((c) => c.id === rec.id);
  if (i >= 0) next.comparisons[i] = rec;
  else next.comparisons.push(rec);
  return { document: next, comparison: rec };
}

export function deleteComparison(document, comparisonId) {
  const next = { ...(document || {}), comparisons: listComparisons(document).filter((c) => c.id !== comparisonId) };
  return next;
}

export function getComparison(document, comparisonId) {
  return listComparisons(document).find((c) => c.id === comparisonId) || null;
}
