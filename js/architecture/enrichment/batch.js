/**
 * Enrichment batches. Pilot 8 stays capped. Lote 9–24 is the next 16
 * in stable atlas order. Templates.js is never written.
 */

import { architectureTemplates } from "../templates.js";
import { newId, nowIso } from "../storage/schema.js";
import { selectPilotTemplates, PILOT_PREFERRED_IDS } from "../data/pilot.js";
import {
  BATCH_SCOPE,
  ENRICHMENT_FORMAT,
  ENRICHMENT_SCHEMA_VERSION,
  JOB_STATUS,
  LOTE_9_24_SIZE,
  LOTE_CHUNK_SIZE,
  NEXT_LOTE_RANGE,
  isStaleField,
} from "./contract.js";
import { enrichArchitecture } from "./enrich-architecture.js";
import { runLoteQualityGates } from "./quality-gates.js";
import {
  beginArchitectureTransaction,
  commitArchitectureTransaction,
  emptyJob,
  rollbackArchitectureTransaction,
  setLastBatch,
  setLastJob,
} from "./store.js";
import { snapshotCoreMetrics } from "./snapshot.js";

export const PILOT_BATCH_SCOPE = BATCH_SCOPE.PILOT_8;
export const LOTE_9_24_SCOPE = BATCH_SCOPE.LOTE_9_24;

export function isPilotArchitecture(id) {
  const set = new Set(PILOT_PREFERRED_IDS);
  return set.has(id);
}

/** Frozen atlas array order. Not featured order, not region order. */
export function atlasStableOrder() {
  return architectureTemplates.map((t) => t.id);
}

export function selectNextAtlasSlice(skipIds, count) {
  const skip = new Set(skipIds || []);
  return architectureTemplates.filter((t) => !skip.has(t.id)).slice(0, count);
}

export function selectLote9to24Templates(options = {}) {
  const skipIds = options.skipIds || selectPilotTemplates().map((t) => t.id);
  const templates = options.templates || selectNextAtlasSlice(skipIds, LOTE_9_24_SIZE);
  if (templates.length !== LOTE_9_24_SIZE && options.allowShort !== true) {
    throw new Error(`13B lote 9–24 requires ${LOTE_9_24_SIZE} architectures; got ${templates.length}.`);
  }
  const skip = new Set(skipIds);
  for (const t of templates) {
    if (skip.has(t.id) && options.allowPilotOverlap !== true) {
      throw new Error(`13B lote must not reprocess pilot architecture ${t.id}.`);
    }
  }
  return templates;
}

export function selectLote25to48Templates() {
  const skip = new Set([
    ...selectPilotTemplates().map((t) => t.id),
    ...selectLote9to24Templates().map((t) => t.id),
  ]);
  return selectNextAtlasSlice(skip, NEXT_LOTE_RANGE.size);
}

function yieldTick() {
  return new Promise((resolve) => {
    if (typeof setTimeout === "function") setTimeout(resolve, 0);
    else resolve();
  });
}

function enrichOne(template, options, batch_id, created_at) {
  const extra = options.conflictsById?.[template.id] || options.extraEvidence || options.userEvidence || [];
  return enrichArchitecture(template, {
    batch_id,
    extraEvidence: extra,
    userEvidence: options.userEvidenceById?.[template.id] || [],
    site_id: options.site_id ?? null,
    now: options.now,
    nowIso: created_at,
  });
}

function buildBatchEnvelope({
  batch_id,
  scope,
  created_at,
  templates,
  rows,
  note,
  lote_gates,
  job,
  chunk_size,
}) {
  const records = rows.map((r) => r.record);
  const gateFailures = rows.flatMap((r) => (r.gates.ok ? [] : r.gates.failures.map((f) => `${r.templateId}: ${f}`)));
  const lote = lote_gates || { ok: gateFailures.length === 0, failures: gateFailures };
  return {
    format: ENRICHMENT_FORMAT,
    schemaVersion: ENRICHMENT_SCHEMA_VERSION,
    batch_id,
    scope,
    created_at,
    count: records.length,
    architecture_ids: templates.map((t) => t.id),
    snapshot_before: templates.map((t) => snapshotCoreMetrics(t)),
    snapshot_after: templates.map((t) => snapshotCoreMetrics(t)),
    records,
    gates: {
      ok: gateFailures.length === 0 && lote.ok !== false,
      failures: [...gateFailures, ...(lote.failures || []).filter((f) => !gateFailures.includes(f))],
      coverage: lote.coverage ?? null,
      architecture_coverage: lote.architecture_coverage ?? null,
      missing_fields: lote.missing_fields || [],
    },
    job: job || null,
    chunk_size: chunk_size || null,
    note,
    next_lote: scope === LOTE_9_24_SCOPE ? NEXT_LOTE_RANGE : null,
  };
}

export function runPilotEnrichmentBatch(options = {}) {
  const templates = options.templates || selectPilotTemplates();
  if (templates.length > 8 && options.allowExtra !== true) {
    throw new Error("13A batch is capped at the 8-architecture pilot.");
  }
  const batch_id = options.batch_id || newId();
  const created_at = options.nowIso || nowIso();
  const rows = [];
  for (const template of templates) {
    if (!options.allowExtra && !isPilotArchitecture(template.id) && templates.length === 8) {
      /* selected pilot fills region gaps with catalog ids; still the 8-cap */
    }
    rows.push(enrichOne(template, options, batch_id, created_at));
  }
  const batch = buildBatchEnvelope({
    batch_id,
    scope: PILOT_BATCH_SCOPE,
    created_at,
    templates,
    rows,
    note: "Pilot 13A only. The remaining atlas is not enriched.",
  });
  if (options.persist !== false) setLastBatch(batch);
  return batch;
}

/**
 * Lote 9–24. Internal chunks of 4 for yielding; single commit of all 16.
 * On gate failure or throw: rollback every architecture_id in this lote.
 */
export async function runLote9to24EnrichmentBatch(options = {}) {
  const templates = options.templates || selectLote9to24Templates();
  if (templates.length > LOTE_9_24_SIZE && options.allowExtra !== true) {
    throw new Error("13B lote is capped at architectures 9–24.");
  }
  const batch_id = options.batch_id || newId();
  const created_at = options.nowIso || nowIso();
  const chunkSize = options.chunkSize || LOTE_CHUNK_SIZE;
  const yieldFn = options.yieldFn || (options.yield === false ? async () => {} : yieldTick);
  const ids = templates.map((t) => t.id);
  const job = emptyJob({
    status: JOB_STATUS.RUNNING,
    scope: LOTE_9_24_SCOPE,
    batch_id,
    started_at: created_at,
    progress: { done: 0, total: templates.length, chunk: 0 },
  });
  if (options.persist !== false) setLastJob(job);

  const txId = options.persist === false ? null : beginArchitectureTransaction(ids);
  const rows = [];

  try {
    for (let i = 0; i < templates.length; i += chunkSize) {
      const chunk = templates.slice(i, i + chunkSize);
      for (const template of chunk) {
        if (typeof options.failAtId === "function" && options.failAtId(template.id)) {
          throw new Error(`forced failure at ${template.id}`);
        }
        rows.push(enrichOne(template, options, batch_id, created_at));
      }
      job.progress = {
        done: rows.length,
        total: templates.length,
        chunk: Math.floor(i / chunkSize) + 1,
      };
      if (options.persist !== false) setLastJob({ ...job });
      if (options.onProgress) options.onProgress(job.progress, job);
      await yieldFn(job.progress, job);
    }

    const lote_gates = runLoteQualityGates(rows.map((r) => r.record));
    if (!lote_gates.ok) {
      job.status = JOB_STATUS.FAILED;
      job.finished_at = options.nowIso || nowIso();
      job.error = lote_gates.failures.join(" | ");
      job.coverage = lote_gates.coverage;
      job.missing_fields = lote_gates.missing_fields;
      job.gates = lote_gates;
      if (txId) rollbackArchitectureTransaction(txId);
      if (options.persist !== false) setLastJob(job);
      const batch = buildBatchEnvelope({
        batch_id,
        scope: LOTE_9_24_SCOPE,
        created_at,
        templates,
        rows,
        lote_gates,
        job,
        chunk_size: chunkSize,
        note: "Lote 9–24 halted: coverage gate failed. No records committed.",
      });
      return batch;
    }

    if (txId) {
      const committed = commitArchitectureTransaction(
        txId,
        rows.map((r) => r.record)
      );
      if (!committed.ok) {
        throw new Error(committed.error || "lote commit failed");
      }
    }

    job.status = JOB_STATUS.DONE;
    job.finished_at = options.nowIso || nowIso();
    job.coverage = lote_gates.coverage;
    job.missing_fields = lote_gates.missing_fields;
    job.gates = lote_gates;
    const batch = buildBatchEnvelope({
      batch_id,
      scope: LOTE_9_24_SCOPE,
      created_at,
      templates,
      rows,
      lote_gates,
      job,
      chunk_size: chunkSize,
      note: "Lote 9–24 (16 architectures after the 8-pilot). Templates unchanged. Next lote = 25–48.",
    });
    if (options.persist !== false) {
      setLastBatch(batch);
      setLastJob(job);
    }
    return batch;
  } catch (err) {
    if (txId) rollbackArchitectureTransaction(txId);
    job.status = JOB_STATUS.FAILED;
    job.finished_at = options.nowIso || nowIso();
    job.error = String(err?.message || err);
    job.gates = { ok: false, failures: [job.error] };
    if (options.persist !== false) setLastJob(job);
    throw err;
  }
}

export function exportEnrichmentBatchJSON(batch) {
  return JSON.stringify(batch, null, 2);
}

export function loteCoverageReport(batch, options = {}) {
  const records = batch?.records || [];
  const rows = records.map((r) => {
    const stale = (r.fields || []).filter((f) => isStaleField(f)).length;
    return {
      id: r.architecture_id,
      region_id: r.region_id,
      coverage: r.evidence_coverage,
      coverage_pct: Math.round((r.evidence_coverage || 0) * 100),
      conflictos: (r.conflicts || []).filter((c) => c.resolution === "unresolved").length,
      stale,
      blocked: r.enrichment_status === "blocked",
      status: r.enrichment_status,
      unknown_official: (r.fields || [])
        .filter((f) => f.method === "unknown" && ["frequencyHz", "gridOperator", "nominalVoltageLevelsKV", "ghiAnnual", "referencePvout", "tariffReference"].includes(f.key))
        .map((f) => f.key),
      regional_fit: r.regional_fit?.score ?? null,
    };
  });
  return {
    scope: batch?.scope || null,
    batch_id: batch?.batch_id || null,
    count: rows.length,
    gates: batch?.gates || null,
    job: batch?.job || null,
    mean_evidence_coverage: rows.length
      ? Math.round((rows.reduce((s, r) => s + (r.coverage || 0), 0) / rows.length) * 1000) / 1000
      : 0,
    lote_field_coverage: batch?.gates?.coverage ?? null,
    next_lote: batch?.next_lote || NEXT_LOTE_RANGE,
    rows,
    generated_at: options.nowIso || nowIso(),
  };
}
