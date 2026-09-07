/**
 * JSON import/export. Local only. JSON.parse, never eval.
 */

import { cloneValue } from "../ui/clone.js";
import {
  FORMAT_PROJECT,
  FORMAT_SNAPSHOT,
  LIMITS,
  SCHEMA_VERSION,
  nowIso,
} from "./schema.js";
import {
  hasDangerousKeys,
  maxDepthOf,
  safeFileStem,
  scanExportForPrivacy,
  scanPrivacyBlob,
  stripDangerousKeys,
} from "./sanitizer.js";
import { migrateProject } from "./migrations.js";
import { structuralValidate } from "./serializer.js";
import { assertStringLimit } from "./sanitizer.js";

function reject(error, extra = {}) {
  return { ok: false, error, preview: null, document: null, ...extra };
}

export function parseJsonText(text, options = {}) {
  const maxBytes = options.maxBytes ?? LIMITS.maxImportBytes;
  if (typeof text !== "string") return reject("Unknown project format.");
  const bytes = typeof TextEncoder !== "undefined" ? new TextEncoder().encode(text).length : text.length;
  if (bytes > maxBytes) return reject("File exceeds the import size limit.");
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return reject("Invalid JSON.");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return reject("missing project object");
  }
  if (hasDangerousKeys(parsed)) return reject("Prototype-pollution keys are not allowed.");
  if (maxDepthOf(parsed) > LIMITS.maxDepth) return reject("JSON nesting exceeds the structural limit.");
  return { ok: true, value: stripDangerousKeys(parsed), error: null };
}

export function identifyEnvelope(parsed) {
  if (parsed.format === FORMAT_PROJECT && parsed.project) {
    return { format: FORMAT_PROJECT, document: parsed.project, exportedAt: parsed.exportedAt || null };
  }
  if (parsed.format === FORMAT_SNAPSHOT && parsed.snapshot) {
    return { format: FORMAT_SNAPSHOT, snapshot: parsed.snapshot, exportedAt: parsed.exportedAt || null };
  }
  if (parsed.projectId && parsed.architecture) {
    return { format: FORMAT_PROJECT, document: parsed, exportedAt: null, unwrapped: true };
  }
  return { format: null };
}

export function importProjectJSON(text, options = {}) {
  const parsed = parseJsonText(text, options);
  if (!parsed.ok) return parsed;
  const ident = identifyEnvelope(parsed.value);
  if (!ident.format) return reject("Unknown project format.");
  if (ident.format !== FORMAT_PROJECT) return reject("Unknown project format.");

  const migrated = migrateProject(ident.document, options);
  if (!migrated.ok) return reject(migrated.error, { newer: migrated.newer, log: migrated.log });

  const doc = migrated.document;
  const struct = structuralValidate(doc);
  if (!struct.ok) return reject(struct.errors[0] || "Structural error.", { errors: struct.errors });

  const nameErr = assertStringLimit(doc.metadata?.name, LIMITS.maxName, "name");
  const descErr = assertStringLimit(doc.metadata?.description, LIMITS.maxDescription, "description");
  const notesErr = assertStringLimit(doc.architecture?.userNotes, LIMITS.maxNotes, "notes");
  if (nameErr || descErr || notesErr) return reject(nameErr || descErr || notesErr);

  const privacyHits = scanPrivacyBlob(doc);
  const preview = {
    name: doc.metadata?.name,
    schemaVersion: doc.schemaVersion,
    architectureType: doc.architecture?.mode || null,
    sourceTemplate: doc.metadata?.sourceTemplateId || null,
    scenarios: (doc.scenarios || []).length,
    snapshots: (doc.snapshots || []).length,
    projectId: doc.projectId,
    privacyHits,
    migration: migrated.log,
    errors: [],
    warnings: privacyHits.length ? ["PRIVACY WARNING: local path or personal data detected."] : [],
  };

  return {
    ok: true,
    error: null,
    document: doc,
    preview,
    log: migrated.log,
  };
}

export function exportProjectJSON(document) {
  const privacy = scanExportForPrivacy(document);
  if (!privacy.ok) {
    return { ok: false, error: privacy.message, hits: privacy.hits, json: null, filename: null };
  }
  const envelope = {
    format: FORMAT_PROJECT,
    schemaVersion: SCHEMA_VERSION,
    exportedAt: nowIso(),
    project: cloneValue(document),
  };
  delete envelope.project.lastValidationStatus;
  const json = JSON.stringify(envelope, null, 2);
  const filename = `sacred-architecture-${safeFileStem(document.metadata?.name)}.json`;
  return { ok: true, error: null, json, filename, envelope };
}

export function exportSnapshotJSON(snapshot) {
  const privacy = scanExportForPrivacy(snapshot);
  if (!privacy.ok) return { ok: false, error: privacy.message, json: null };
  const envelope = {
    format: FORMAT_SNAPSHOT,
    schemaVersion: SCHEMA_VERSION,
    exportedAt: nowIso(),
    snapshot: cloneValue(snapshot),
  };
  const json = JSON.stringify(envelope, null, 2);
  const filename = `sacred-architecture-snapshot-${safeFileStem(snapshot.name)}.json`;
  return { ok: true, json, filename, envelope };
}

export { safeFileStem };
