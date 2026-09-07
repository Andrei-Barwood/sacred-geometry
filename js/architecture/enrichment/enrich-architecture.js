/**
 * Build one enrichment record. Does not mutate the template.
 * Official values come from Verified Data. derived values only from existing engines.
 */

import { COUNTRY_TO_REGION } from "../regional-profiles.js";
import { queryCatalog } from "../data/catalog.js";
import { getSource } from "../data/source-registry.js";
import { detectEvidenceConflicts } from "../data/conflicts.js";
import { calculateEvidenceConfidence } from "../data/confidence.js";
import { AUTHORITY_TIERS } from "../data/constants.js";
import { validateTemplate } from "../validation/validate-template.js";
import { nowIso, newId } from "../storage/schema.js";
import {
  CONFLICT_RESOLUTION,
  emptyField,
  emptyRecord,
  ENGINE_DERIVED_KEYS,
  ENRICHMENT_STATUS,
  FIELD_METHOD,
  freshnessThresholdDays,
  isStaleField,
  LOCAL_SOURCE_MISSING_WARNING,
  OFFICIAL_TARGET_KEYS,
  UNKNOWN_UNTIL_SOURCED,
} from "./contract.js";
import { snapshotCoreMetrics } from "./snapshot.js";
import { runQualityGates } from "./quality-gates.js";

function ageDays(iso, now) {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  return Math.round(((now - t) / 86400000) * 10) / 10;
}

function methodFromSource(sourceId) {
  const src = getSource(sourceId);
  if (!src) return FIELD_METHOD.UNKNOWN;
  if (src.authorityTier === AUTHORITY_TIERS.TIER_1_PRIMARY || src.authorityTier === AUTHORITY_TIERS.TIER_2_INSTITUTIONAL) {
    return FIELD_METHOD.OFFICIAL;
  }
  if (src.category === "fixture") return FIELD_METHOD.ASSUMED;
  return FIELD_METHOD.OFFICIAL;
}

function fieldFromEvidence(ev, now) {
  const method = methodFromSource(ev.sourceId);
  const retrieved = ev.retrievedAt || ev.publishedAt || null;
  return emptyField(ev.parameter, {
    value: ev.normalizedValue ?? null,
    unit: ev.unit || null,
    source_id: ev.sourceId || null,
    source_url: ev.sourceUrl || null,
    retrieved_at: retrieved,
    freshness_days: ageDays(retrieved, now),
    confidence: ev.confidence ?? calculateEvidenceConfidence(ev, { country: ev.geography?.country }),
    method,
  });
}

function pickOfficial(fieldsForKey) {
  if (!fieldsForKey.length) return null;
  const official = fieldsForKey.filter((f) => f.method === FIELD_METHOD.OFFICIAL);
  const pool = official.length ? official : fieldsForKey;
  return pool.slice().sort((a, b) => (b.confidence || 0) - (a.confidence || 0))[0];
}

function conflictId(field, i) {
  return `ENR_C_${field}_${i}`;
}

export function enrichArchitecture(template, options = {}) {
  const now = options.now || Date.now();
  const nowIsoStr = options.nowIso || nowIso();
  const batchId = options.batch_id || null;
  const siteId = options.site_id ?? null;
  const before = snapshotCoreMetrics(template);
  const warnings = [];
  const extra = [
    ...(Array.isArray(options.extraEvidence) ? options.extraEvidence : []),
    ...(Array.isArray(options.userEvidence) ? options.userEvidence : []),
  ];
  const catalog = queryCatalog({ country: template.country });
  const evidence = [...catalog, ...extra];
  if (!catalog.length) {
    warnings.push(`${LOCAL_SOURCE_MISSING_WARNING}: no Verified Data catalog rows for ${template.country || "unknown country"}.`);
  }

  const comparableConflicts = detectEvidenceConflicts(evidence).filter((c) => {
    if (c.comparable === false) return false;
    if (!c.parameter || String(c.parameter).includes("|")) return false;
    return true;
  });
  const conflicts = comparableConflicts.map((c, i) => ({
    id: conflictId(c.parameter, i),
    field: c.parameter,
    a: { evidenceId: c.evidenceIds?.[0], value: c.values?.[0] },
    b: { evidenceId: c.evidenceIds?.[1], value: c.values?.[1] },
    resolution: CONFLICT_RESOLUTION.UNRESOLVED,
    explanation: c.explanation,
  }));

  const byKey = new Map();
  for (const ev of evidence) {
    if (!ev?.parameter) continue;
    if (ev.parameter === "specificYield") {
      warnings.push("Catalog must not supply project specific yield from GHI.");
      continue;
    }
    const f = fieldFromEvidence(ev, now);
    if (!byKey.has(f.key)) byKey.set(f.key, []);
    byKey.get(f.key).push(f);
  }

  const fields = [];
  const usedConflict = new Set();

  for (const key of OFFICIAL_TARGET_KEYS) {
    const list = byKey.get(key) || [];
    const related = conflicts.filter((c) => c.field === key);
    related.forEach((c) => usedConflict.add(c.id));
    if (!list.length) {
      fields.push(emptyField(key, { method: FIELD_METHOD.UNKNOWN, value: null }));
      warnings.push(`${key}: ${LOCAL_SOURCE_MISSING_WARNING}`);
      continue;
    }
    if (related.length) {
      for (const f of list) {
        f.conflict_ids = related.map((c) => c.id);
        fields.push(f);
      }
      warnings.push(`${key}: sources disagree; left unresolved.`);
      continue;
    }
    const chosen = pickOfficial(list);
    fields.push(chosen);
    if (list.length > 1) {
      warnings.push(`${key}: ${list.length} agreeing sources; recorded the higher-confidence official value. Not averaged.`);
    }
  }

  for (const key of UNKNOWN_UNTIL_SOURCED) {
    if (fields.some((f) => f.key === key)) continue;
    const list = byKey.get(key) || [];
    if (key === "specificYield" || !list.length) {
      fields.push(
        emptyField(key, {
          method: FIELD_METHOD.UNKNOWN,
          value: null,
        })
      );
      if (key === "specificYield") {
        warnings.push("specificYield remains unknown pending site study or a source that publishes production.");
      } else if (!list.length) {
        warnings.push(`${key}: ${LOCAL_SOURCE_MISSING_WARNING}`);
      }
    } else {
      fields.push(pickOfficial(list));
    }
  }

  const assumed = [
    { key: "loads.profile.peakLoadMW", value: template.loadProfile?.peakLoadMW ?? null, unit: "MW" },
    { key: "grid.mode", value: template.grid?.mode ?? null, unit: null },
    { key: "climate", value: template.environment?.climate ?? null, unit: null },
  ];
  for (const a of assumed) {
    fields.push(
      emptyField(a.key, {
        value: a.value,
        unit: a.unit,
        method: FIELD_METHOD.ASSUMED,
        source_id: null,
        retrieved_at: null,
        freshness_days: null,
        confidence: null,
      })
    );
  }

  const validation = validateTemplate(template, { mode: "audit" });
  const derived = validation.derivedValues || {};
  for (const key of ENGINE_DERIVED_KEYS) {
    const value = derived[key];
    if (value == null) {
      fields.push(emptyField(key, { method: FIELD_METHOD.UNKNOWN, value: null }));
      continue;
    }
    const units = {
      dcAcRatio: "1",
      bessDurationHours: "h",
      annualEnergyMWh: "MWh",
      nMinusOneCapacityMVA: "MVA",
      loadFactor: "1",
    };
    fields.push(
      emptyField(key, {
        value,
        unit: units[key] || null,
        method: FIELD_METHOD.DERIVED,
        source_id: "ENGINE_VALIDATION",
        source_url: null,
        retrieved_at: nowIsoStr,
        freshness_days: 0,
        confidence: null,
      })
    );
  }

  if (!validation.valid) {
    warnings.push(`Validation engine reports ${validation.counts?.errors || 0} error(s). Enrichment does not fix them.`);
  }

  const sourced = fields.filter((f) => f.method === FIELD_METHOD.OFFICIAL || f.method === FIELD_METHOD.MEASURED || f.method === FIELD_METHOD.DERIVED);
  const coverage = fields.length ? Math.round((sourced.length / fields.length) * 1000) / 1000 : 0;

  const unresolved = conflicts.filter((c) => c.resolution === CONFLICT_RESOLUTION.UNRESOLVED);
  const officialCount = fields.filter((f) => f.method === FIELD_METHOD.OFFICIAL).length;
  let status = ENRICHMENT_STATUS.PARTIAL;
  if (officialCount >= 4 && unresolved.length === 0 && coverage >= 0.35) status = ENRICHMENT_STATUS.COMPLETE;

  const stale = fields.filter((f) => isStaleField(f, now));
  if (stale.length) warnings.push(`${stale.length} field(s) exceed freshness threshold.`);

  for (const f of fields) {
    if (f.freshness_days != null && f.freshness_days > freshnessThresholdDays(f.key)) {
      f.conflict_ids = f.conflict_ids || [];
    }
  }

  const regionalization = template.regionalization || {};
  const record = emptyRecord({
    architecture_id: template.id,
    region_id: template.regionId || COUNTRY_TO_REGION[template.country] || null,
    site_id: siteId,
    template_id: template.id,
    enrichment_status: status,
    fields,
    evidence_coverage: coverage,
    conflicts,
    warnings,
    last_enriched_at: nowIsoStr,
    batch_id: batchId,
    regional_fit: {
      score: Number.isFinite(regionalization.regionalFitScore) ? regionalization.regionalFitScore : null,
      breakdown: regionalization.fitBreakdown || null,
      profile_id: regionalization.profileId || template.regionId || COUNTRY_TO_REGION[template.country] || null,
      method: FIELD_METHOD.ASSUMED,
      evidence_ids: fields
        .filter((f) => f.source_id && (f.method === FIELD_METHOD.OFFICIAL || f.method === FIELD_METHOD.MEASURED))
        .map((f) => f.source_id),
      note: "Annotated from existing regionalization. Power, energy, BESS, MVA and BTC were not recalculated.",
    },
  });

  const after = snapshotCoreMetrics(template);
  const gates = runQualityGates(record, before, after);
  if (!gates.ok) {
    record.enrichment_status = ENRICHMENT_STATUS.BLOCKED;
    record.blocked_reason = gates.failures.join("; ");
    record.warnings = [
      ...record.warnings,
      `blocked_reason: ${record.blocked_reason}`,
      ...gates.failures.map((f) => `GATE: ${f}`),
    ];
  }

  return {
    record,
    snapshot_before: before,
    snapshot_after: after,
    gates,
    templateId: template.id,
  };
}

void newId;
void conflictId;
