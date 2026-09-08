/**
 * Scenario CRUD and pure resolution. Scenarios are operating state, not architecture copies.
 */

import { cloneValue } from "../ui/clone.js";
import { defaultScenarioRecord, newId, nowIso } from "./schema.js";
import { architectureToWorkbench } from "./serializer.js";

export function listScenarios(doc) {
  return (doc?.scenarios || []).slice();
}

export function getScenario(doc, scenarioId) {
  return (doc?.scenarios || []).find((s) => s.id === scenarioId) || null;
}

export function addScenario(doc, partial = {}) {
  const next = cloneValue(doc);
  const rec = defaultScenarioRecord({
    ...partial,
    id: partial.id || newId(),
    name: partial.name || "Custom scenario",
    operatingState: partial.operatingState || "custom",
  });
  next.scenarios = [...(next.scenarios || []), rec];
  next.updatedAt = nowIso();
  return { document: next, scenario: rec };
}

export function duplicateScenario(doc, scenarioId) {
  const src = getScenario(doc, scenarioId);
  if (!src) return { document: doc, scenario: null };
  return addScenario(doc, {
    ...cloneValue(src),
    id: newId(),
    name: `${src.name} copy`,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  });
}

export function renameScenario(doc, scenarioId, name) {
  const next = cloneValue(doc);
  const sc = (next.scenarios || []).find((s) => s.id === scenarioId);
  if (!sc) return next;
  sc.name = String(name || sc.name);
  sc.updatedAt = nowIso();
  next.updatedAt = sc.updatedAt;
  return next;
}

export function deleteScenario(doc, scenarioId) {
  const list = doc?.scenarios || [];
  if (list.length <= 1) {
    return { ok: false, error: "Cannot delete the only remaining scenario.", document: doc };
  }
  if (!list.some((s) => s.id === scenarioId)) {
    return { ok: false, error: "Scenario not found.", document: doc };
  }
  const next = cloneValue(doc);
  next.scenarios = next.scenarios.filter((s) => s.id !== scenarioId);
  if (next.activeScenarioId === scenarioId) {
    next.activeScenarioId = next.scenarios[0].id;
  }
  next.updatedAt = nowIso();
  return { ok: true, error: null, document: next, activeScenarioId: next.activeScenarioId };
}

export function setActiveScenario(doc, scenarioId) {
  if (!getScenario(doc, scenarioId)) return doc;
  const next = cloneValue(doc);
  next.activeScenarioId = scenarioId;
  next.updatedAt = nowIso();
  return next;
}

/**
 * Pure. Does not mutate project/document.
 * Returns a workbench runtime state with operating overrides applied.
 */
export function resolveScenario(projectDocument, scenarioId) {
  const doc = cloneValue(projectDocument);
  const id = scenarioId || doc.activeScenarioId;
  const sc = getScenario(doc, id) || (doc.scenarios || [])[0];
  const wb = architectureToWorkbench(doc);
  if (!sc) return wb;

  const loadStates = { ...(sc.loadStates || {}) };
  wb.scenario = {
    id: sc.gridState?.connected === false ? "islanded" : sc.operatingState || "normal",
    name: sc.name,
    season: sc.overrides?.season || "winter",
    loadStates,
    exclusiveSelection: sc.overrides?.exclusiveSelection || {},
  };

  if (Array.isArray(wb.loads?.items)) {
    wb.loads.items = wb.loads.items.map((item) => ({
      ...item,
      state: loadStates[item.id] || item.state || "OFF",
    }));
  }

  const genStates = sc.generationStates || {};
  if (wb.generation) {
    if (genStates.pv) wb.generation = { ...wb.generation, pvState: genStates.pv };
    if (genStates.diesel) wb.generation = { ...wb.generation, dieselState: genStates.diesel };
    if (genStates.wind) wb.generation = { ...wb.generation, windState: genStates.wind };
  }

  if (sc.bessState && wb.bess) {
    wb.bess = { ...wb.bess, state: sc.bessState };
  }

  if (sc.gridState && typeof sc.gridState === "object") {
    wb.grid = { ...wb.grid };
    if (sc.gridState.connected === false) {
      wb.scenario.id = "islanded";
    }
  }

  wb._activeScenarioId = sc.id;
  return wb;
}

export function syncActiveScenarioFromWorkbench(doc, workbench) {
  const next = cloneValue(doc);
  const sc = (next.scenarios || []).find((s) => s.id === next.activeScenarioId);
  if (!sc || !workbench?.scenario) return next;
  sc.loadStates = { ...(workbench.scenario.loadStates || {}) };
  sc.operatingState = workbench.scenario.id || sc.operatingState;
  sc.overrides = {
    ...(sc.overrides || {}),
    season: workbench.scenario.season,
    exclusiveSelection: workbench.scenario.exclusiveSelection,
  };
  if (workbench.bess?.state) sc.bessState = workbench.bess.state;
  if (workbench.scenario.id === "islanded") sc.gridState = { ...(sc.gridState || {}), connected: false };
  sc.updatedAt = nowIso();
  next.updatedAt = sc.updatedAt;
  return next;
}
