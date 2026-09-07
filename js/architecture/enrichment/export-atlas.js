/**
 * Atlas enrichment export. JSON + CSV. No PII.
 */

import { ENRICHMENT_ATLAS_FORMAT, ENRICHMENT_SCHEMA_VERSION, SCHEMA_FROZEN_V1, isStaleField } from "./contract.js";
import { listEnrichments } from "./store.js";
import { atlasCoverageDashboard, blockedReasonOf } from "./dashboard.js";
import { nowIso } from "../storage/schema.js";

/** Export PII scan. Omits the template phone regex (false-positives on ISO dates). */
const EXPORT_PII = [
  [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i, "EMAIL"],
  [/\/Users\//i, "PATH"],
  [/\/home\//i, "PATH"],
  [/andreibarwood/i, "PERSON"],
];

function scanExportPrivacy(text) {
  const hits = [];
  for (const [re, code] of EXPORT_PII) {
    if (re.test(text)) hits.push(code);
  }
  return hits;
}

const CSV_COLUMNS = [
  "architecture_id",
  "region_id",
  "template_id",
  "enrichment_status",
  "evidence_coverage",
  "conflicts_open",
  "stale_fields",
  "blocked_reason",
  "last_enriched_at",
  "batch_id",
];

function csvEscape(value) {
  if (value == null) return "";
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function contractRecord(rec) {
  return {
    architecture_id: rec.architecture_id,
    region_id: rec.region_id ?? null,
    site_id: rec.site_id ?? null,
    template_id: rec.template_id,
    enrichment_status: rec.enrichment_status,
    fields: rec.fields || [],
    evidence_coverage: rec.evidence_coverage,
    conflicts: rec.conflicts || [],
    warnings: rec.warnings || [],
    last_enriched_at: rec.last_enriched_at,
    batch_id: rec.batch_id,
    regional_fit: rec.regional_fit ?? null,
    blocked_reason: rec.blocked_reason ?? blockedReasonOf(rec),
  };
}

export function exportEnrichedAtlasJSON(options = {}) {
  const records = (options.records || listEnrichments()).map(contractRecord);
  const dashboard = atlasCoverageDashboard({ records: options.records, templates: options.templates });
  const payload = {
    format: ENRICHMENT_ATLAS_FORMAT,
    schemaVersion: ENRICHMENT_SCHEMA_VERSION,
    schema_frozen_v1: SCHEMA_FROZEN_V1,
    generated_at: options.nowIso || nowIso(),
    dashboard,
    records,
  };
  const json = JSON.stringify(payload, null, 2);
  const privacy = scanExportPrivacy(json);
  return {
    json,
    payload,
    privacy_hits: privacy,
    ok: privacy.length === 0,
  };
}

export function exportEnrichedAtlasCSV(options = {}) {
  const records = options.records || listEnrichments();
  const lines = [CSV_COLUMNS.join(",")];
  for (const rec of records) {
    const row = {
      architecture_id: rec.architecture_id,
      region_id: rec.region_id || "",
      template_id: rec.template_id || "",
      enrichment_status: rec.enrichment_status || "",
      evidence_coverage: rec.evidence_coverage ?? "",
      conflicts_open: (rec.conflicts || []).filter((c) => c.resolution === "unresolved").length,
      stale_fields: (rec.fields || []).filter((f) => isStaleField(f)).length,
      blocked_reason: rec.enrichment_status === "blocked" ? blockedReasonOf(rec) || "" : "",
      last_enriched_at: rec.last_enriched_at || "",
      batch_id: rec.batch_id || "",
    };
    lines.push(CSV_COLUMNS.map((k) => csvEscape(row[k])).join(","));
  }
  const csv = `${lines.join("\n")}\n`;
  const privacy = scanExportPrivacy(csv);
  return { csv, privacy_hits: privacy, ok: privacy.length === 0 };
}
