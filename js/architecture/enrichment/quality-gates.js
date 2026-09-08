/**
 * Quality gates for a regional enrichment record.
 * Failures block the record. They never invent values.
 */

import {
  BATCH_COVERAGE_THRESHOLD,
  CONFLICT_RESOLUTION,
  ENGINE_DERIVED_KEYS,
  ENRICHMENT_STATUS,
  FIELD_METHOD,
  REQUIRED_FIELD_KEYS,
} from "./contract.js";
import { coreMetricsEqual } from "./snapshot.js";

const METHODS = new Set(Object.values(FIELD_METHOD));
const RESOLUTIONS = new Set(Object.values(CONFLICT_RESOLUTION));
const STATUSES = new Set(Object.values(ENRICHMENT_STATUS));

export function validateContract(record) {
  const errors = [];
  if (!record || typeof record !== "object") return { ok: false, errors: ["missing record"] };
  if (!record.architecture_id) errors.push("missing architecture_id");
  if (!record.template_id) errors.push("missing template_id");
  if (!STATUSES.has(record.enrichment_status)) errors.push("invalid enrichment_status");
  if (!Array.isArray(record.fields)) errors.push("fields must be an array");
  if (!Array.isArray(record.conflicts)) errors.push("conflicts must be an array");
  if (!Array.isArray(record.warnings)) errors.push("warnings must be an array");
  const cov = record.evidence_coverage;
  if (typeof cov !== "number" || cov < 0 || cov > 1 || !Number.isFinite(cov)) {
    errors.push("evidence_coverage must be 0–1");
  }
  for (const f of record.fields || []) {
    if (!f.key) errors.push("field missing key");
    if (!METHODS.has(f.method)) errors.push(`invalid method on ${f.key}`);
    if (!Array.isArray(f.conflict_ids)) errors.push(`conflict_ids on ${f.key}`);
    if (f.method === FIELD_METHOD.UNKNOWN && f.value != null) {
      errors.push(`unknown field ${f.key} must not carry an invented value`);
    }
    if (f.method === FIELD_METHOD.OFFICIAL && !f.source_id) {
      errors.push(`official field ${f.key} needs source_id`);
    }
    if (f.method === FIELD_METHOD.DERIVED && !ENGINE_DERIVED_KEYS.includes(f.key)) {
      errors.push(`derived field ${f.key} is not an Electrical/BTC/Report engine output`);
    }
    if (f.method === FIELD_METHOD.MEASURED && !f.source_id) {
      errors.push(`measured field ${f.key} needs source_id`);
    }
  }
  for (const c of record.conflicts || []) {
    if (!c.id || !c.field) errors.push("conflict missing id/field");
    if (!RESOLUTIONS.has(c.resolution)) errors.push(`invalid conflict resolution on ${c.id}`);
  }
  return { ok: errors.length === 0, errors };
}

export function runQualityGates(record, snapshotBefore, snapshotAfter) {
  const failures = [];
  const schema = validateContract(record);
  if (!schema.ok) failures.push(...schema.errors.map((e) => `contract: ${e}`));
  if (snapshotBefore && snapshotAfter && !coreMetricsEqual(snapshotBefore, snapshotAfter)) {
    failures.push("core electrical metrics changed; enrichment must not rewrite the atlas");
  }
  for (const c of record.conflicts || []) {
    if (c.resolution !== CONFLICT_RESOLUTION.UNRESOLVED && c.autoResolvedBy === "ai") {
      failures.push(`conflict ${c.id} auto-resolved by AI`);
    }
  }
  const status = failures.length
    ? ENRICHMENT_STATUS.BLOCKED
    : record.enrichment_status === ENRICHMENT_STATUS.COMPLETE
      ? ENRICHMENT_STATUS.COMPLETE
      : ENRICHMENT_STATUS.PARTIAL;
  return {
    ok: failures.length === 0,
    failures,
    status,
  };
}

/**
 * Prompt 13 lote gate. Coverage is the share of required contract fields
 * present on each record (unknown placeholders count). Evidence gaps are
 * reported, not invented. Halt if lote coverage < 80%.
 */
export function runLoteQualityGates(records, options = {}) {
  const threshold = options.threshold ?? BATCH_COVERAGE_THRESHOLD;
  const failures = [];
  const missing_fields = [];
  const blocked = [];
  let present = 0;
  let total = 0;
  let okRecords = 0;

  if (!Array.isArray(records) || !records.length) {
    return {
      ok: false,
      failures: ["lote has no records"],
      coverage: 0,
      architecture_coverage: 0,
      missing_fields: [],
      blocked: [],
      threshold,
    };
  }

  for (const record of records) {
    const schema = validateContract(record);
    if (!schema.ok) {
      failures.push(`${record?.architecture_id || "?"}: ${schema.errors.join("; ")}`);
    }
    const keys = new Set((record?.fields || []).map((f) => f.key));
    let recordComplete = schema.ok;
    for (const key of REQUIRED_FIELD_KEYS) {
      total += 1;
      if (keys.has(key)) present += 1;
      else {
        recordComplete = false;
        missing_fields.push({ architecture_id: record?.architecture_id || null, field: key });
      }
    }
    if (record?.enrichment_status === ENRICHMENT_STATUS.BLOCKED) {
      blocked.push(record.architecture_id);
      if (options.allowBlocked !== true) {
        recordComplete = false;
        failures.push(`${record.architecture_id}: blocked`);
      }
    }
    if (recordComplete) okRecords += 1;
  }

  const coverage = total ? Math.round((present / total) * 1000) / 1000 : 0;
  const architecture_coverage = Math.round((okRecords / records.length) * 1000) / 1000;
  if (coverage < threshold) {
    failures.push(
      `lote coverage ${Math.round(coverage * 100)}% < ${Math.round(threshold * 100)}%; missing ${missing_fields.length} field(s)`
    );
  }
  if (architecture_coverage < threshold) {
    failures.push(
      `architecture coverage ${Math.round(architecture_coverage * 100)}% < ${Math.round(threshold * 100)}%`
    );
  }
  return {
    ok: failures.length === 0,
    failures,
    coverage,
    architecture_coverage,
    missing_fields,
    blocked,
    threshold,
  };
}
