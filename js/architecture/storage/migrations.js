/**
 * Sequential schema migrations. Copy-in, never mutate the original.
 * Production schema is v1. Extra maps exist only for isolated mock tests.
 */

import { cloneValue } from "../ui/clone.js";
import { SCHEMA_VERSION } from "./schema.js";
import { normalizeProjectDocument } from "./serializer.js";

export const migrations = {
  // 1: migrateV1toV2 — reserved. Do not invent a real v2.
};

export function migrateProject(document, options = {}) {
  const current = options.currentVersion ?? SCHEMA_VERSION;
  const src = cloneValue(document);
  const fromVersion = Number(src.schemaVersion);
  const log = { fromVersion, toVersion: fromVersion, steps: [], warnings: [] };

  if (!Number.isFinite(fromVersion)) {
    return { ok: false, error: "missing schemaVersion", document: null, log };
  }
  if (fromVersion > current) {
    return {
      ok: false,
      error: "This project was created with a newer schema version.",
      document: null,
      log,
      newer: true,
    };
  }

  let doc = src;
  let v = fromVersion;
  while (v < current) {
    const step = (options.migrations || migrations)[v];
    if (typeof step !== "function") {
      log.warnings.push(`No migration registered for schema ${v} → ${v + 1}`);
      return { ok: false, error: `Cannot migrate schema ${v}`, document: null, log };
    }
    const before = v;
    doc = step(cloneValue(doc));
    v += 1;
    doc.schemaVersion = v;
    log.steps.push({ from: before, to: v });
  }
  log.toVersion = v;
  return { ok: true, error: null, document: normalizeProjectDocument(doc), log };
}
