/**
 * Small UI preferences in localStorage. Not project data. Not IndexedDB.
 */

const KEY = "sacred-architecture-preferences";

export const DEFAULT_PREFERENCES = Object.freeze({
  view: "system",
  btcDisplay: "both",
  autosave: true,
  lastProjectId: null,
  lastOpenFailed: false,
  decoration: "GEOMETRIC",
  schemaVersion: 1,
});

export function loadPreferences(storage) {
  const store = storage || (typeof localStorage !== "undefined" ? localStorage : null);
  if (!store) return { ...DEFAULT_PREFERENCES };
  try {
    const raw = store.getItem(KEY);
    if (!raw) return { ...DEFAULT_PREFERENCES };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function savePreferences(prefs, storage) {
  const store = storage || (typeof localStorage !== "undefined" ? localStorage : null);
  if (!store) return { ok: false };
  try {
    store.setItem(KEY, JSON.stringify({ ...DEFAULT_PREFERENCES, ...prefs }));
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export function patchPreferences(partial, storage) {
  const next = { ...loadPreferences(storage), ...partial };
  savePreferences(next, storage);
  return next;
}
