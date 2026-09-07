export {
  FORMAT_PROJECT,
  FORMAT_SNAPSHOT,
  SCHEMA_VERSION,
  APP_VERSION,
  ENGINE_VERSION,
  TEMPLATE_VERSION,
  IDB_NAME,
  IDB_VERSION,
  IDB_STORE_ENRICHMENTS,
  IDB_STORE_ENRICHMENT_BATCHES,
  IDB_STORE_ENRICHMENT_JOBS,
  LIMITS,
  SAVE_STATUS,
  newId,
  nowIso,
  defaultScenarioRecord,
} from "./schema.js";

export {
  createProjectDocument,
  architectureToWorkbench,
  updateDocumentFromWorkbench,
  normalizeProjectDocument,
  structuralValidate,
} from "./serializer.js";

export {
  resolveScenario,
  addScenario,
  duplicateScenario,
  renameScenario,
  deleteScenario,
  setActiveScenario,
  syncActiveScenarioFromWorkbench,
  listScenarios,
} from "./scenarios.js";

export {
  createSnapshot,
  addSnapshot,
  restoreSnapshotInto,
  projectFromSnapshot,
  compareSnapshots,
  renameSnapshot,
  exportSnapshotEnvelope,
} from "./snapshots.js";

export { migrateProject, migrations } from "./migrations.js";

export {
  importProjectJSON,
  exportProjectJSON,
  exportSnapshotJSON,
  parseJsonText,
  safeFileStem,
} from "./import-export.js";

export {
  scanExportForPrivacy,
  scanPrivacyBlob,
  hasDangerousKeys,
  stripDangerousKeys,
} from "./sanitizer.js";

export { createProjectStore, createMemoryBackend, createIndexedDBBackend } from "./store.js";

export { loadPreferences, savePreferences, patchPreferences, DEFAULT_PREFERENCES } from "./preferences.js";
