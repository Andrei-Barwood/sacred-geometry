/**
 * Catalog-level cross-region flags and regional coverage index.
 * Does not resolve conflicts. Does not change the 13A record contract.
 */

import { COUNTRY_TO_REGION, REGION_IDS } from "../regional-profiles.js";
import { CATALOG_EVIDENCE } from "../data/catalog.js";
import { ENRICHMENT_STATUS, REQUIRED_FIELD_KEYS } from "./contract.js";
import { validateContract } from "./quality-gates.js";

/**
 * Fields that must not be copied as a corridor default when catalog
 * values diverge across regions. Geographic facts (GHI, operator,
 * voltage existence, tariff pages) are expected to differ.
 */
export const CROSS_REGION_CATALOG_FIELDS = Object.freeze(["frequencyHz"]);

function canonicalValue(value) {
  if (Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (value == null) return "";
  return String(value);
}

function valuesEqual(a, b) {
  return canonicalValue(a) === canonicalValue(b);
}

/**
 * Same field, different region, incompatible catalog values.
 * Flag only. resolution stays unresolved.
 */
export function detectCrossRegionCatalogConflicts(evidenceList = CATALOG_EVIDENCE) {
  const byField = new Map();
  for (const ev of evidenceList || []) {
    const field = ev?.parameter;
    if (!CROSS_REGION_CATALOG_FIELDS.includes(field)) continue;
    const country = ev.geography?.country;
    const region = country ? COUNTRY_TO_REGION[country] || null : null;
    if (!region) continue;
    if (!byField.has(field)) byField.set(field, []);
    byField.get(field).push({
      field,
      region,
      country,
      value: ev.normalizedValue,
      unit: ev.unit || null,
      source_id: ev.sourceId || null,
      evidence_id: ev.evidenceId || null,
    });
  }

  const flags = [];
  for (const [field, rows] of byField) {
    const regionValues = new Map();
    for (const row of rows) {
      if (!regionValues.has(row.region)) regionValues.set(row.region, []);
      const bucket = regionValues.get(row.region);
      if (!bucket.some((v) => valuesEqual(v.value, row.value))) bucket.push(row);
    }
    const valueSet = new Set();
    const values = [];
    for (const [region, list] of regionValues) {
      for (const row of list) {
        valueSet.add(canonicalValue(row.value));
        values.push({ region, value: row.value, unit: row.unit, source_id: row.source_id, country: row.country });
      }
    }
    const regions = [...regionValues.keys()].sort();
    if (valueSet.size < 2 || regions.length < 2) continue;
    flags.push({
      id: `CATALOG_XR_${field}`,
      field,
      kind: "cross_region_catalog",
      resolution: "unresolved",
      regions,
      values,
      note: "Catalog-level. Not resolved. Do not apply as a corridor default.",
    });
  }
  return flags;
}

export function regionCoverageIndex(records) {
  const buckets = new Map();
  for (const rid of REGION_IDS) {
    buckets.set(rid, []);
  }
  for (const rec of records || []) {
    const rid = rec.region_id || "unknown";
    if (!buckets.has(rid)) buckets.set(rid, []);
    buckets.get(rid).push(rec);
  }
  const index = [];
  for (const [region_id, list] of buckets) {
    if (!list.length && !REGION_IDS.includes(region_id)) continue;
    let present = 0;
    let total = 0;
    let evidenceSum = 0;
    let blocked = 0;
    let unknownOfficial = 0;
    let contractOk = 0;
    for (const rec of list) {
      const keys = new Set((rec.fields || []).map((f) => f.key));
      for (const key of REQUIRED_FIELD_KEYS) {
        total += 1;
        if (keys.has(key)) present += 1;
      }
      evidenceSum += rec.evidence_coverage || 0;
      if (rec.enrichment_status === ENRICHMENT_STATUS.BLOCKED) blocked += 1;
      unknownOfficial += (rec.fields || []).filter((f) => f.method === "unknown" && f.value == null).length;
      if (validateContract(rec).ok) contractOk += 1;
    }
    const n = list.length;
    index.push({
      region_id,
      n,
      field_coverage: total ? Math.round((present / total) * 1000) / 1000 : null,
      mean_evidence_coverage: n ? Math.round((evidenceSum / n) * 1000) / 1000 : null,
      blocked,
      contract_ok: contractOk,
      unknown_placeholders: unknownOfficial,
    });
  }
  return index;
}

export function nowMs() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }
  return Date.now();
}

export function logEnrichPerf(entry, sink) {
  const line = `[enrich-perf] ${entry.architecture_id} ${entry.ms}ms`;
  if (sink && typeof sink.push === "function") sink.push(line);
  if (typeof console !== "undefined" && typeof console.debug === "function") {
    console.debug(line);
  }
  return line;
}

export function summarizePerf(entries) {
  const list = (entries || []).slice().sort((a, b) => b.ms - a.ms);
  const total_ms = Math.round(list.reduce((s, e) => s + e.ms, 0) * 100) / 100;
  return {
    count: list.length,
    total_ms,
    mean_ms: list.length ? Math.round((total_ms / list.length) * 100) / 100 : 0,
    max_ms: list.length ? list[0].ms : 0,
    slowest: list.slice(0, 5),
    per_architecture: (entries || []).map((e) => ({ architecture_id: e.architecture_id, ms: e.ms })),
  };
}
