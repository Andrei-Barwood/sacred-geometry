/**
 * Workbench runtime state ↔ persistent SacredArchitectureProject.
 * Derived, UI, graph coordinates, and caches are not stored.
 */

import { cloneValue } from "../ui/clone.js";
import { createEmptyProject } from "../ui/state.js";
import {
  APP_VERSION,
  ENGINE_VERSION,
  SCHEMA_VERSION,
  TEMPLATE_VERSION,
  defaultScenarioRecord,
  newId,
  nowIso,
} from "./schema.js";
import { normalizeTags } from "./sanitizer.js";

const ARCH_KEYS = [
  "mode",
  "sourceTemplateId",
  "country",
  "countryName",
  "region",
  "subregion",
  "installation",
  "loads",
  "transients",
  "generation",
  "bess",
  "substation",
  "grid",
  "feeders",
  "economics",
  "site",
  "connections",
  "assumptions",
  "seasonalProfiles",
  "warnings",
];

function pickArchitecture(workbench) {
  const src = workbench || {};
  const architecture = {};
  for (const key of ARCH_KEYS) {
    if (src[key] !== undefined) architecture[key] = cloneValue(src[key]);
  }
  if (src.loads?.items) {
    architecture.loads = {
      ...architecture.loads,
      items: src.loads.items.map((item) => {
        const copy = cloneValue(item);
        delete copy.state;
        return copy;
      }),
    };
  }
  architecture.userNotes = src.userNotes || src.metadata?.userNotes || "";
  architecture.family = src.metadata?.family || src.family || null;
  architecture.familyName = src.metadata?.familyName || null;
  architecture.archetype = src.metadata?.archetype || null;
  architecture.archetypeTitle = src.metadata?.archetypeTitle || null;
  architecture.application = src.metadata?.application || null;
  architecture.validationProfile = src.metadata?.validationProfile || null;
  architecture.disclaimer = src.metadata?.disclaimer || null;
  if (!Array.isArray(architecture.connections)) architecture.connections = [];
  return architecture;
}

function scenarioFromWorkbench(workbench) {
  const sc = workbench?.scenario || {};
  return defaultScenarioRecord({
    id: sc.id && sc.id !== "custom" ? sc.id : undefined,
    name: sc.name || "Normal Operation",
    operatingState: sc.id || "normal",
    loadStates: sc.loadStates || {},
    overrides: {
      season: sc.season || "winter",
      exclusiveSelection: sc.exclusiveSelection || {},
    },
    gridState: sc.id === "islanded" ? { connected: false } : {},
  });
}

export function createProjectDocument(workbench, extras = {}) {
  const t = nowIso();
  const architecture = pickArchitecture(workbench);
  const scenario = extras.scenarios?.[0] || scenarioFromWorkbench(workbench);
  const tags = normalizeTags(extras.tags || workbench?.metadata?.tags || []);
  if (tags.error) throw new Error(tags.error);
  return {
    schemaVersion: SCHEMA_VERSION,
    appVersion: APP_VERSION,
    engineVersion: ENGINE_VERSION,
    projectId: extras.projectId || newId(),
    metadata: {
      name: workbench?.metadata?.name || "Untitled project",
      description: workbench?.metadata?.description || "",
      authorAlias: extras.authorAlias ?? workbench?.metadata?.authorAlias ?? null,
      tags,
      sourceTemplateId: workbench?.sourceTemplateId || null,
      sourceTemplateVersion: extras.sourceTemplateVersion ?? TEMPLATE_VERSION,
      conceptual: true,
      status: extras.status || "draft",
      createdAt: extras.createdAt || t,
      updatedAt: extras.updatedAt || t,
    },
    architecture,
    scenarios: extras.scenarios || [scenario],
    activeScenarioId: extras.activeScenarioId || scenario.id,
    snapshots: extras.snapshots || [],
    comparisons: extras.comparisons || [],
    provenance: cloneValue(workbench?.provenance || {}),
    acceptedEvidence: cloneValue(workbench?.acceptedEvidence || extras.acceptedEvidence || {}),
    evidenceHistory: cloneValue(workbench?.evidenceHistory || extras.evidenceHistory || []),
    dismissedEvidence: cloneValue(workbench?.dismissedEvidence || extras.dismissedEvidence || {}),
    geospatial: cloneValue(workbench?.geospatial || extras.geospatial || { sites: [], activeSiteId: null, restrictions: [], gridNetwork: null }),
    lastValidationStatus: extras.lastValidationStatus || null,
    createdAt: extras.createdAt || t,
    updatedAt: extras.updatedAt || t,
  };
}

export function architectureToWorkbench(doc, workbenchExtras = {}) {
  const arch = doc.architecture || {};
  const base = createEmptyProject();
  const wb = {
    ...base,
    ...cloneValue(arch),
    metadata: {
      ...base.metadata,
      id: doc.projectId,
      name: doc.metadata?.name || base.metadata.name,
      description: doc.metadata?.description || base.metadata.description,
      conceptual: true,
      disclaimer: arch.disclaimer || base.metadata.disclaimer,
      family: arch.family || base.metadata.family,
      familyName: arch.familyName || base.metadata.familyName,
      archetype: arch.archetype || null,
      archetypeTitle: arch.archetypeTitle || null,
      application: arch.application || null,
      validationProfile: arch.validationProfile || null,
      authorAlias: doc.metadata?.authorAlias ?? null,
      tags: doc.metadata?.tags || [],
      userNotes: arch.userNotes || "",
    },
    sourceTemplateId: doc.metadata?.sourceTemplateId || arch.sourceTemplateId || null,
    userNotes: arch.userNotes || "",
    provenance: cloneValue(doc.provenance || {}),
    acceptedEvidence: cloneValue(doc.acceptedEvidence || {}),
    evidenceHistory: cloneValue(doc.evidenceHistory || []),
    dismissedEvidence: cloneValue(doc.dismissedEvidence || {}),
    geospatial: cloneValue(doc.geospatial || { sites: [], activeSiteId: null, restrictions: [], gridNetwork: null }),
    connections: Array.isArray(arch.connections) ? cloneValue(arch.connections) : [],
    started: true,
    display: workbenchExtras.display || base.display,
  };
  if (!wb.loads) wb.loads = base.loads;
  if (!wb.generation) wb.generation = base.generation;
  if (!wb.bess) wb.bess = base.bess;
  if (!wb.substation) wb.substation = base.substation;
  if (!wb.grid) wb.grid = base.grid;
  return wb;
}

export function updateDocumentFromWorkbench(doc, workbench, options = {}) {
  const next = cloneValue(doc);
  next.architecture = pickArchitecture(workbench);
  next.provenance = cloneValue(workbench.provenance || {});
  next.acceptedEvidence = cloneValue(workbench.acceptedEvidence || {});
  next.evidenceHistory = cloneValue(workbench.evidenceHistory || []);
  next.dismissedEvidence = cloneValue(workbench.dismissedEvidence || {});
  next.geospatial = cloneValue(workbench.geospatial || { sites: [], activeSiteId: null, restrictions: [], gridNetwork: null });
  next.metadata = {
    ...next.metadata,
    name: workbench.metadata?.name || next.metadata.name,
    description: workbench.metadata?.description || next.metadata.description,
    sourceTemplateId: workbench.sourceTemplateId || next.metadata.sourceTemplateId,
    conceptual: true,
    updatedAt: options.touch === false ? next.metadata.updatedAt : nowIso(),
  };
  const active = (next.scenarios || []).find((s) => s.id === next.activeScenarioId);
  if (active && workbench.scenario) {
    active.loadStates = { ...(workbench.scenario.loadStates || {}) };
    active.operatingState = workbench.scenario.id || active.operatingState;
    active.name = workbench.scenario.name || active.name;
    active.overrides = {
      ...(active.overrides || {}),
      season: workbench.scenario.season,
      exclusiveSelection: workbench.scenario.exclusiveSelection,
    };
    if (workbench.scenario.id === "islanded") {
      active.gridState = { ...(active.gridState || {}), connected: false };
    }
    active.updatedAt = nowIso();
  }
  if (options.lastValidationStatus) next.lastValidationStatus = options.lastValidationStatus;
  next.updatedAt = next.metadata.updatedAt;
  next.engineVersion = ENGINE_VERSION;
  next.appVersion = APP_VERSION;
  return next;
}

export function normalizeProjectDocument(doc) {
  const src = cloneValue(doc) || {};
  const t = nowIso();
  if (!src.projectId) src.projectId = newId();
  src.schemaVersion = src.schemaVersion || SCHEMA_VERSION;
  src.appVersion = src.appVersion || APP_VERSION;
  src.engineVersion = src.engineVersion || ENGINE_VERSION;
  src.createdAt = src.createdAt || t;
  src.updatedAt = src.updatedAt || src.createdAt;
  src.metadata = src.metadata || {};
  src.metadata.name = src.metadata.name || "Untitled project";
  src.metadata.conceptual = true;
  src.metadata.sourceTemplateId = src.metadata.sourceTemplateId ?? null;
  src.metadata.authorAlias = src.metadata.authorAlias ?? null;
  const tags = normalizeTags(src.metadata.tags || []);
  src.metadata.tags = tags.error ? [] : tags;
  src.metadata.status = PROJECT_STATUS_SAFE(src.metadata.status);
  src.architecture = src.architecture || pickArchitecture(createEmptyProject());
  if (!Array.isArray(src.architecture.connections)) src.architecture.connections = [];
  if (!Array.isArray(src.scenarios) || !src.scenarios.length) {
    src.scenarios = [defaultScenarioRecord({ id: "normal", name: "Normal Operation" })];
  }
  if (!src.activeScenarioId || !src.scenarios.some((s) => s.id === src.activeScenarioId)) {
    src.activeScenarioId = src.scenarios[0].id;
  }
  if (!Array.isArray(src.snapshots)) src.snapshots = [];
  if (!Array.isArray(src.comparisons)) src.comparisons = [];
  src.provenance = src.provenance || {};
  src.acceptedEvidence = src.acceptedEvidence || {};
  src.evidenceHistory = Array.isArray(src.evidenceHistory) ? src.evidenceHistory : [];
  src.dismissedEvidence = src.dismissedEvidence || {};
  src.lastPdfSnapshotId = src.lastPdfSnapshotId || src.metadata?.lastPdfSnapshotId || null;
  src.geospatial = src.geospatial || { sites: [], activeSiteId: null, restrictions: [], gridNetwork: null };
  if (!Array.isArray(src.geospatial.sites)) src.geospatial.sites = [];
  if (!Array.isArray(src.geospatial.restrictions)) src.geospatial.restrictions = [];
  return src;
}

function PROJECT_STATUS_SAFE(status) {
  if (status === "draft" || status === "concept" || status === "review" || status === "archived") return status;
  return "draft";
}

export function structuralValidate(doc) {
  const errors = [];
  if (!doc || typeof doc !== "object") {
    return { ok: false, errors: ["missing project object"] };
  }
  if (!doc.projectId || typeof doc.projectId !== "string") errors.push("missing projectId");
  if (doc.schemaVersion == null) errors.push("missing schemaVersion");
  if (!doc.architecture || typeof doc.architecture !== "object") errors.push("missing architecture");
  if (!Array.isArray(doc.scenarios) || !doc.scenarios.length) errors.push("project must have at least one scenario");
  const ids = new Set();
  for (const sc of doc.scenarios || []) {
    if (!sc?.id) errors.push("scenario missing id");
    else if (ids.has(sc.id)) errors.push("duplicate scenario IDs");
    else ids.add(sc.id);
  }
  if (doc.activeScenarioId && !ids.has(doc.activeScenarioId)) {
    errors.push("activeScenarioId does not match a scenario");
  }
  return { ok: errors.length === 0, errors };
}
