/**
 * Project mutations. Return new state. Never write into templates.js.
 */

import { cloneValue, newProjectId } from "./clone.js";
import { architectureTemplates } from "../templates.js";
import {
  createEmptyProject,
  createSample6kWProject,
  projectFromTemplate,
  snapshotProject,
  normalizeLoadItem,
} from "./state.js";
import { createBlankLoad, createLoadFromPreset } from "./load-presets.js";
import { SCENARIO_PRESETS, PROVENANCE, ARCHITECTURE_MODES, MODE_TO_FAMILY } from "./constants.js";
import { FAMILY_NAMES } from "../template-constants.js";
import { parseNumericInput } from "./format.js";

export function findCatalogTemplate(id) {
  return architectureTemplates.find((t) => t.id === id) || null;
}

export function loadTemplateById(id) {
  const original = findCatalogTemplate(id);
  if (!original) return { ok: false, error: "TEMPLATE_NOT_FOUND", project: null };
  const project = projectFromTemplate(original, { newId: newProjectId() });
  return {
    ok: true,
    project,
    baseline: snapshotProject(project),
    originalId: original.id,
  };
}

export function startFromZero() {
  const project = createEmptyProject();
  return { project, baseline: snapshotProject(project) };
}

export function loadSample6kW() {
  const project = createSample6kWProject();
  return { project, baseline: snapshotProject(project) };
}

export function duplicateProject(project) {
  const copy = cloneValue(project);
  copy.metadata = {
    ...copy.metadata,
    id: newProjectId(),
    name: `${copy.metadata?.name || "Project"} copy`,
  };
  copy.started = true;
  return { project: copy, baseline: snapshotProject(copy) };
}

export function resetProject(baseline) {
  if (!baseline) return startFromZero();
  const project = cloneValue(baseline);
  return { project, baseline: snapshotProject(project) };
}

export function setField(project, path, value, provenance = PROVENANCE.USER) {
  const next = cloneValue(project);
  const parts = String(path).split(".");
  let obj = next;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (obj[key] == null || typeof obj[key] !== "object") obj[key] = {};
    obj = obj[key];
  }
  obj[parts[parts.length - 1]] = value;
  next.provenance = { ...(next.provenance || {}), [path]: provenance };
  return next;
}

export function setNumericField(project, path, raw) {
  const parsed = parseNumericInput(raw);
  if (!parsed.ok) return { project, invalid: true };
  return { project: setField(project, path, parsed.value), invalid: false };
}

export function setMode(project, mode) {
  if (!Object.values(ARCHITECTURE_MODES).includes(mode)) return project;
  const next = cloneValue(project);
  next.mode = mode;
  next.metadata.family = MODE_TO_FAMILY[mode] || next.metadata.family;
  next.metadata.familyName = FAMILY_NAMES[next.metadata.family] || next.metadata.familyName;
  return next;
}

export function setEnergyMethod(project, method) {
  const next = cloneValue(project);
  if (!next.generation) next.generation = {};
  next.generation.energyCalculationMethod = method;
  if (next.generation.pv) {
    if (method === "specific-yield") {
      next.generation.pv.capacityFactorInformationalOnly = true;
      next.generation.pv.specificYieldInformationalOnly = false;
    } else if (method === "capacity-factor") {
      next.generation.pv.specificYieldInformationalOnly = true;
      next.generation.pv.capacityFactorInformationalOnly = false;
    }
  }
  next.provenance = {
    ...(next.provenance || {}),
    "generation.energyCalculationMethod": PROVENANCE.USER,
  };
  return next;
}

export function toggleTechnology(project, tech, enabled) {
  const next = cloneValue(project);
  if (!next.generation) next.generation = { enabled: false, technologies: [] };
  const set = new Set(next.generation.technologies || []);
  if (enabled) set.add(tech);
  else set.delete(tech);
  next.generation.technologies = [...set];
  next.generation.enabled = set.size > 0;
  if (tech === "pv") {
    if (enabled && !next.generation.pv) {
      next.generation.pv = {
        dcMWp: null,
        acMW: null,
        mounting: null,
        bifacial: false,
        specificYieldKWhPerKWpYear: null,
        capacityFactor: null,
        lossesPercent: null,
        resourceProvenance: PROVENANCE.SITE_STUDY,
      };
    }
    if (!enabled) next.generation.pv = next.generation.pv; // keep data, just inactive
  }
  if (tech === "wind" && enabled && !next.generation.wind) {
    next.generation.wind = { ratedMW: null, capacityFactor: null };
  }
  if (tech === "diesel" && enabled && !next.generation.diesel) {
    next.generation.diesel = { ratedMW: null, role: "backup" };
  }
  if (tech === "other" && enabled && !next.generation.other) {
    next.generation.other = { ratedMW: null, label: "Other" };
  }
  return next;
}

export function addLoad(project, item) {
  const next = cloneValue(project);
  const load = normalizeLoadItem(item || createBlankLoad());
  next.loads.items = [...(next.loads.items || []), load];
  next.loads.editor = "detailed";
  return next;
}

export function addLoadPreset(project, presetId) {
  const item = createLoadFromPreset(presetId);
  if (!item) return project;
  return addLoad(project, item);
}

export function duplicateLoad(project, loadId) {
  const next = cloneValue(project);
  const items = next.loads.items || [];
  const idx = items.findIndex((l) => l.id === loadId);
  if (idx < 0) return project;
  const copy = cloneValue(items[idx]);
  copy.id = `${items[idx].id}-copy-${newProjectId("L")}`;
  copy.name = `${items[idx].name || "Load"} copy`;
  items.splice(idx + 1, 0, copy);
  next.loads.items = items;
  return next;
}

export function deleteLoad(project, loadId) {
  const next = cloneValue(project);
  next.loads.items = (next.loads.items || []).filter((l) => l.id !== loadId);
  return next;
}

export function patchLoad(project, loadId, patch) {
  const next = cloneValue(project);
  next.loads.items = (next.loads.items || []).map((l) =>
    l.id === loadId ? { ...l, ...patch } : l
  );
  next.provenance = { ...(next.provenance || {}), [`loads.items.${loadId}`]: PROVENANCE.USER };
  return next;
}

export function setLoadState(project, loadId, state) {
  const next = patchLoad(project, loadId, { state });
  next.scenario = next.scenario || {};
  next.scenario.loadStates = { ...(next.scenario.loadStates || {}), [loadId]: state };
  next.scenario.id = "custom";
  next.scenario.name = "Custom Scenario";
  return next;
}

export function applyScenario(project, scenarioId) {
  const preset = SCENARIO_PRESETS.find((s) => s.id === scenarioId);
  if (!preset) return project;
  const next = cloneValue(project);
  const states = {};
  for (const load of next.loads.items || []) {
    let state = "OFF";
    if (scenarioId === "normal") {
      if (load.category === "compressor") state = "RUNNING";
      else if (load.category === "standby") state = "STANDBY";
      else if (load.id?.includes("heater-800") || load.presetId === "preset-heater") state = "RUNNING";
      else state = "OFF";
    } else if (scenarioId === "peak") {
      state = load.category === "standby" ? "STANDBY" : "RUNNING";
    } else if (scenarioId === "motor-start") {
      if (load.category === "motor" || /gate|pump|motor/i.test(load.name || "")) state = "STARTING";
      else if (load.category === "compressor") state = "RUNNING";
      else state = "OFF";
    } else if (scenarioId === "islanded") {
      if (load.category === "compressor" || load.category === "lighting") state = "RUNNING";
      else if (load.category === "standby") state = "STANDBY";
      else state = "OFF";
    } else {
      state = load.state || "OFF";
    }
    load.state = state;
    states[load.id] = state;
  }
  next.scenario = {
    id: preset.id,
    name: preset.name,
    season: next.scenario?.season || "winter",
    loadStates: states,
    exclusiveSelection: next.scenario?.exclusiveSelection || { "space-heater": "heater-800" },
  };
  return next;
}

export function addTransient(project, partial = {}) {
  const next = cloneValue(project);
  const ev = {
    id: `tr-${newProjectId("T")}`,
    name: partial.name || "Transient event",
    type: partial.type || "custom",
    runningCurrentA: partial.runningCurrentA ?? null,
    startingCurrentA: partial.startingCurrentA ?? null,
    startingMultiple: partial.startingMultiple ?? null,
    durationSeconds: partial.durationSeconds ?? null,
    associatedLoadId: partial.associatedLoadId ?? null,
    runningMW: partial.runningMW ?? null,
  };
  next.transients = [...(next.transients || []), ev];
  return next;
}

export function patchTransient(project, id, patch) {
  const next = cloneValue(project);
  next.transients = (next.transients || []).map((ev) => (ev.id === id ? { ...ev, ...patch } : ev));
  return next;
}

export function deleteTransient(project, id) {
  const next = cloneValue(project);
  next.transients = (next.transients || []).filter((ev) => ev.id !== id);
  return next;
}

export function addFeeder(project) {
  const next = cloneValue(project);
  next.feeders = [
    ...(next.feeders || []),
    {
      name: `Feeder ${(next.feeders?.length || 0) + 1}`,
      voltageKV: null,
      role: "distribution",
      lengthKM: null,
      estimatedLoadMW: null,
      lossesPercent: null,
    },
  ];
  return next;
}

export function patchFeeder(project, index, patch) {
  const next = cloneValue(project);
  next.feeders = (next.feeders || []).map((f, i) => (i === index ? { ...f, ...patch } : f));
  return next;
}

export function deleteFeeder(project, index) {
  const next = cloneValue(project);
  next.feeders = (next.feeders || []).filter((_, i) => i !== index);
  return next;
}

export function toggleCompare(selected, id, max = 3) {
  const set = [...selected];
  const i = set.indexOf(id);
  if (i >= 0) {
    set.splice(i, 1);
    return set;
  }
  if (set.length >= max) return set;
  set.push(id);
  return set;
}
