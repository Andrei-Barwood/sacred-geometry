/**
 * In-memory enrichment records. Independent of templates.js.
 * Writes are per architecture_id; a lote commits or rolls back as a unit.
 */

import { architectureTemplates } from "../templates.js";
import { ENRICHMENT_STATUS, JOB_STATUS, isStaleField } from "./contract.js";
import { newId } from "../storage/schema.js";

function cloneRecord(value) {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value));
}

const records = new Map();
const openTransactions = new Map();
let lastBatch = null;
let lastJob = null;

export function getEnrichment(architectureId) {
  return records.get(architectureId) || null;
}

export function listEnrichments() {
  return [...records.values()];
}

export function putEnrichment(record) {
  if (!record?.architecture_id) return;
  records.set(record.architecture_id, record);
}

export function deleteEnrichment(architectureId) {
  records.delete(architectureId);
}

export function clearEnrichments() {
  records.clear();
  lastBatch = null;
  lastJob = null;
  openTransactions.clear();
}

export function setLastBatch(batch) {
  lastBatch = batch;
  for (const rec of batch?.records || []) putEnrichment(rec);
}

export function getLastBatch() {
  return lastBatch;
}

export function getLastJob() {
  return lastJob;
}

export function setLastJob(job) {
  lastJob = job || null;
}

export function emptyJob(partial = {}) {
  return {
    id: partial.id || newId(),
    status: partial.status || JOB_STATUS.IDLE,
    scope: partial.scope || null,
    batch_id: partial.batch_id || null,
    started_at: partial.started_at || null,
    finished_at: partial.finished_at || null,
    progress: partial.progress || { done: 0, total: 0, chunk: 0 },
    error: partial.error || null,
    coverage: partial.coverage ?? null,
    missing_fields: Array.isArray(partial.missing_fields) ? partial.missing_fields : [],
    gates: partial.gates || { ok: null, failures: [] },
  };
}

/**
 * Snapshot current records for these ids. Commit writes the new set;
 * rollback restores the snapshot (including "not present").
 */
export function beginArchitectureTransaction(architectureIds) {
  const txId = newId();
  const snap = new Map();
  for (const id of architectureIds) {
    snap.set(id, records.has(id) ? cloneRecord(records.get(id)) : undefined);
  }
  openTransactions.set(txId, snap);
  return txId;
}

export function commitArchitectureTransaction(txId, nextRecords) {
  const snap = openTransactions.get(txId);
  if (!snap) throw new Error("enrichment transaction is not open");
  try {
    for (const rec of nextRecords || []) {
      if (!rec?.architecture_id) throw new Error("half-write: record missing architecture_id");
      putEnrichment(rec);
    }
    openTransactions.delete(txId);
    return { ok: true };
  } catch (err) {
    restoreSnapshot(snap);
    openTransactions.delete(txId);
    return { ok: false, error: String(err?.message || err) };
  }
}

export function rollbackArchitectureTransaction(txId) {
  const snap = openTransactions.get(txId);
  if (!snap) return { ok: true, skipped: true };
  restoreSnapshot(snap);
  openTransactions.delete(txId);
  return { ok: true };
}

function restoreSnapshot(snap) {
  for (const [id, prev] of snap) {
    if (prev === undefined) records.delete(id);
    else records.set(id, prev);
  }
}

export function atlasEnrichmentProgress() {
  const total = architectureTemplates.length;
  const enriched = architectureTemplates.filter((t) => records.has(t.id)).length;
  return {
    enriched,
    total,
    label: `${enriched}/${total}`,
    pending: total - enriched,
  };
}

export function listBatchIds() {
  const set = new Set();
  for (const rec of records.values()) {
    if (rec.batch_id) set.add(rec.batch_id);
  }
  return [...set];
}

export function enrichmentBadge(architectureId) {
  const rec = getEnrichment(architectureId);
  if (!rec) {
    return {
      status: ENRICHMENT_STATUS.PENDING,
      coverage: null,
      conflicts: 0,
      stale: 0,
      blocked: false,
      label: "pending",
    };
  }
  const stale = (rec.fields || []).filter((f) => isStaleField(f)).length;
  const nConflict = (rec.conflicts || []).filter((c) => c.resolution === "unresolved").length;
  const covPct = Math.round((rec.evidence_coverage || 0) * 100);
  const blocked = rec.enrichment_status === ENRICHMENT_STATUS.BLOCKED;
  return {
    status: rec.enrichment_status,
    coverage: rec.evidence_coverage,
    conflicts: nConflict,
    stale,
    blocked,
    label: `${covPct}% · ${nConflict} conflict${nConflict === 1 ? "" : "s"} · ${stale} stale`,
  };
}

export function matchesEnrichmentFilters(architectureId, filters = {}) {
  const rec = getEnrichment(architectureId);
  if (filters.batch_id) {
    if (!rec || rec.batch_id !== filters.batch_id) return false;
  }
  if (filters.coverage === "pending" && rec) return false;
  if (filters.coverage === "high") {
    if (!rec || (rec.evidence_coverage || 0) < 0.5) return false;
  }
  if (filters.coverage === "low") {
    if (!rec || (rec.evidence_coverage || 0) >= 0.5) return false;
  }
  if (filters.conflicts === "yes") {
    if (!rec || !(rec.conflicts || []).some((c) => c.resolution === "unresolved")) return false;
  }
  if (filters.conflicts === "no") {
    if (rec && (rec.conflicts || []).some((c) => c.resolution === "unresolved")) return false;
  }
  if (filters.stale === "yes") {
    if (!rec || !(rec.fields || []).some((f) => isStaleField(f))) return false;
  }
  if (filters.stale === "no") {
    if (rec && (rec.fields || []).some((f) => isStaleField(f))) return false;
  }
  return true;
}
