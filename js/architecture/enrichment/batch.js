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
  ENRICHMENT_STATUS,
  FIELD_METHOD,
  JOB_STATUS,
  LOTE_9_24_SIZE,
  LOTE_25_48_SIZE,
  LOTE_CHUNK_SIZE,
  NEXT_LOTE_RANGE,
  REQUIRED_FIELD_KEYS,
  emptyField,
  emptyRecord,
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
import {
  detectCrossRegionCatalogConflicts,
  logEnrichPerf,
  nowMs,
  regionCoverageIndex,
  summarizePerf,
} from "./cross-region.js";

export const PILOT_BATCH_SCOPE = BATCH_SCOPE.PILOT_8;
export const LOTE_9_24_SCOPE = BATCH_SCOPE.LOTE_9_24;
export const LOTE_25_48_SCOPE = BATCH_SCOPE.LOTE_25_48;

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

export function selectLote25to48Templates(options = {}) {
  const skipIds = options.skipIds || [
    ...selectPilotTemplates().map((t) => t.id),
    ...selectLote9to24Templates().map((t) => t.id),
  ];
  const templates = options.templates || selectNextAtlasSlice(skipIds, LOTE_25_48_SIZE);
  if (templates.length !== LOTE_25_48_SIZE && options.allowShort !== true) {
    throw new Error(`13C lote 25–48 requires ${LOTE_25_48_SIZE} architectures; got ${templates.length}.`);
  }
  const skip = new Set(skipIds);
  for (const t of templates) {
    if (skip.has(t.id) && options.allowOverlap !== true) {
      throw new Error(`13C lote must not reprocess architecture ${t.id}.`);
    }
  }
  return templates;
}

export function selectLote49toEndTemplates() {
  const skip = new Set([
    ...selectPilotTemplates().map((t) => t.id),
    ...selectLote9to24Templates().map((t) => t.id),
    ...selectLote25to48Templates().map((t) => t.id),
  ]);
  return selectNextAtlasSlice(skip, architectureTemplates.length);
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

function lote49EndRange() {
  const rest = selectLote49toEndTemplates();
  return { from: 49, to: 48 + rest.length, size: rest.length };
}

function blockedStub(template, batch_id, created_at, reason) {
  const warnings = [`GATE: ${reason}`, "Architecture blocked; lote 25–48 continued."];
  const fields = REQUIRED_FIELD_KEYS.map((key) => emptyField(key, { method: FIELD_METHOD.UNKNOWN, value: null }));
  return emptyRecord({
    architecture_id: template.id,
    region_id: template.regionId || null,
    template_id: template.id,
    enrichment_status: ENRICHMENT_STATUS.BLOCKED,
    fields,
    evidence_coverage: 0,
    conflicts: [],
    warnings,
    last_enriched_at: created_at,
    batch_id,
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
  extras,
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
    next_lote:
      scope === LOTE_9_24_SCOPE
        ? NEXT_LOTE_RANGE
        : scope === LOTE_25_48_SCOPE
          ? lote49EndRange()
          : null,
    ...(extras || {}),
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

/**
 * Lote 25–48. Yields per architecture so the UI thread can paint.
 * A blocked architecture is recorded and the lote continues.
 * 1–24 ids are never written.
 */
export async function runLote25to48EnrichmentBatch(options = {}) {
  const templates = options.templates || selectLote25to48Templates();
  if (templates.length > LOTE_25_48_SIZE && options.allowExtra !== true) {
    throw new Error("13C lote is capped at architectures 25–48.");
  }
  const prior = new Set([
    ...selectPilotTemplates().map((t) => t.id),
    ...selectLote9to24Templates().map((t) => t.id),
  ]);
  const batch_id = options.batch_id || newId();
  const created_at = options.nowIso || nowIso();
  const chunkSize = options.chunkSize || LOTE_CHUNK_SIZE;
  const yieldFn = options.yieldFn || (options.yield === false ? async () => {} : yieldTick);
  const perfLog = options.perfLog || [];
  const ids = templates.map((t) => t.id);
  const job = emptyJob({
    status: JOB_STATUS.RUNNING,
    scope: LOTE_25_48_SCOPE,
    batch_id,
    started_at: created_at,
    progress: { done: 0, total: templates.length, chunk: 0 },
  });
  if (options.persist !== false) setLastJob(job);

  const txId = options.persist === false ? null : beginArchitectureTransaction(ids);
  const rows = [];
  const perfEntries = [];
  let yieldCount = 0;

  try {
    for (let i = 0; i < templates.length; i += 1) {
      const template = templates[i];
      if (prior.has(template.id)) {
        throw new Error(`13C refused to overwrite ${template.id}`);
      }
      const t0 = nowMs();
      try {
        if (typeof options.failAtId === "function" && options.failAtId(template.id)) {
          throw new Error(`forced failure at ${template.id}`);
        }
        const row = enrichOne(template, options, batch_id, created_at);
        const ms = Math.round((nowMs() - t0) * 100) / 100;
        perfEntries.push({ architecture_id: template.id, ms });
        logEnrichPerf({ architecture_id: template.id, ms }, perfLog);
        rows.push(row);
      } catch (err) {
        const ms = Math.round((nowMs() - t0) * 100) / 100;
        perfEntries.push({ architecture_id: template.id, ms });
        logEnrichPerf({ architecture_id: template.id, ms }, perfLog);
        const stub = blockedStub(template, batch_id, created_at, String(err?.message || err));
        rows.push({
          record: stub,
          snapshot_before: snapshotCoreMetrics(template),
          snapshot_after: snapshotCoreMetrics(template),
          gates: { ok: false, failures: [String(err?.message || err)], status: ENRICHMENT_STATUS.BLOCKED },
          templateId: template.id,
        });
      }
      job.progress = {
        done: rows.length,
        total: templates.length,
        chunk: Math.floor(i / chunkSize) + 1,
      };
      if (options.persist !== false) setLastJob({ ...job });
      if (options.onProgress) options.onProgress(job.progress, job);
      await yieldFn(job.progress, job);
      yieldCount += 1;
    }

    const records = rows.map((r) => r.record);
    const lote_gates = runLoteQualityGates(records, { allowBlocked: true });
    const catalogFlags = detectCrossRegionCatalogConflicts();
    for (const row of rows) {
      const rid = row.record.region_id;
      for (const flag of catalogFlags) {
        if (rid && flag.regions.includes(rid)) {
          row.record.warnings.push(
            `CATALOG: ${flag.field} differs across ${flag.regions.join("/")}; not resolved.`
          );
        }
      }
    }
    const regionIndex = regionCoverageIndex(records);
    const perf = { ...summarizePerf(perfEntries), yield_count: yieldCount };
    const blockedIds = records.filter((r) => r.enrichment_status === ENRICHMENT_STATUS.BLOCKED).map((r) => r.architecture_id);

    if (txId) {
      const committed = commitArchitectureTransaction(txId, records);
      if (!committed.ok) {
        throw new Error(committed.error || "lote 25–48 commit failed");
      }
    }

    job.status = lote_gates.ok ? JOB_STATUS.DONE : JOB_STATUS.FAILED;
    job.finished_at = options.nowIso || nowIso();
    job.coverage = lote_gates.coverage;
    job.missing_fields = lote_gates.missing_fields;
    job.gates = lote_gates;
    job.error = lote_gates.ok ? null : lote_gates.failures.join(" | ");
    const batch = buildBatchEnvelope({
      batch_id,
      scope: LOTE_25_48_SCOPE,
      created_at,
      templates,
      rows,
      lote_gates,
      job,
      chunk_size: chunkSize,
      note: lote_gates.ok
        ? "Lote 25–48. Blocked architectures did not halt the lote. Templates unchanged. Next lote = 49–end."
        : "Lote 25–48 finished with coverage below gate. Processed records were kept. Blocked did not halt siblings.",
      extras: {
        cross_region_catalog_flags: catalogFlags,
        region_coverage_index: regionIndex,
        blocked_ids: blockedIds,
        perf,
      },
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
    region_coverage_index: batch?.region_coverage_index || regionCoverageIndex(records),
    cross_region_catalog_flags: batch?.cross_region_catalog_flags || [],
    blocked_ids: batch?.blocked_ids || rows.filter((r) => r.blocked).map((r) => r.id),
    perf: batch?.perf || null,
    rows,
    generated_at: options.nowIso || nowIso(),
  };
}
