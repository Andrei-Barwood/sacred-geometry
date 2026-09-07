/**
 * Sacred Architecture project schema constants.
 * schemaVersion = file structure. engineVersion = math engines. idbVersion = IndexedDB.
 */

export const FORMAT_PROJECT = "sacred-architecture-project";
export const FORMAT_SNAPSHOT = "sacred-architecture-snapshot";
export const SCHEMA_VERSION = 1;
export const APP_VERSION = "1.0.0";
export const ENGINE_VERSION = "1.0.0";
export const TEMPLATE_VERSION = 1;
export const IDB_NAME = "sacredArchitecture";
export const IDB_VERSION = 3;
export const IDB_STORE_PROJECTS = "projects";
export const IDB_STORE_ENRICHMENTS = "enrichments";
export const IDB_STORE_ENRICHMENT_BATCHES = "enrichmentBatches";
export const IDB_STORE_ENRICHMENT_JOBS = "enrichmentJobs";

export const LIMITS = Object.freeze({
  maxImportBytes: 5 * 1024 * 1024,
  maxDepth: 24,
  maxName: 200,
  maxDescription: 4000,
  maxNotes: 8000,
  maxTag: 48,
  maxTags: 24,
  maxAutomaticSnapshots: 12,
});

export const PROJECT_STATUS = Object.freeze(["draft", "concept", "review", "archived"]);

export const SAVE_STATUS = Object.freeze({
  IDLE: "idle",
  UNSAVED: "unsaved",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error",
  UNAVAILABLE: "unavailable",
});

export function newId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function defaultScenarioRecord(overrides = {}) {
  const t = nowIso();
  return {
    id: overrides.id || newId(),
    name: overrides.name || "Normal Operation",
    description: overrides.description || "Default operating scenario.",
    operatingState: overrides.operatingState || "normal",
    loadStates: overrides.loadStates || {},
    generationStates: overrides.generationStates || {},
    bessState: overrides.bessState || null,
    gridState: overrides.gridState || {},
    overrides: overrides.overrides || {},
    notes: overrides.notes || "",
    createdAt: overrides.createdAt || t,
    updatedAt: overrides.updatedAt || t,
  };
}
