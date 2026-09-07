/**
 * Global enrichment coverage dashboard. Reads records; does not mutate them.
 */

import { architectureTemplates } from "../templates.js";
import { ENRICHMENT_STATUS, SCHEMA_FROZEN_V1, isStaleField } from "./contract.js";
import { listEnrichments } from "./store.js";
import { detectCrossRegionCatalogConflicts, regionCoverageIndex } from "./cross-region.js";

export function blockedReasonOf(record) {
  if (!record) return null;
  if (record.blocked_reason) return record.blocked_reason;
  const w = (record.warnings || []).find((x) => /^blocked_reason:/.test(x) || /^GATE:/.test(x));
  return w ? w.replace(/^(blocked_reason:|GATE:)\s*/, "") : null;
}

export function atlasCoverageDashboard(options = {}) {
  const templates = options.templates || architectureTemplates;
  const records = options.records || listEnrichments();
  const byId = new Map(records.map((r) => [r.architecture_id, r]));
  let complete = 0;
  let partial = 0;
  let blocked = 0;
  let pending = 0;
  let stale_fields = 0;
  let open_conflicts = 0;
  let evidenceSum = 0;
  let evidenceN = 0;
  const blocked_list = [];

  for (const t of templates) {
    const rec = byId.get(t.id);
    if (!rec) {
      pending += 1;
      continue;
    }
    if (rec.enrichment_status === ENRICHMENT_STATUS.COMPLETE) complete += 1;
    else if (rec.enrichment_status === ENRICHMENT_STATUS.BLOCKED) {
      blocked += 1;
      blocked_list.push({
        architecture_id: rec.architecture_id,
        region_id: rec.region_id,
        reason: blockedReasonOf(rec) || "blocked without explicit reason",
      });
    } else partial += 1;
    evidenceSum += rec.evidence_coverage || 0;
    evidenceN += 1;
    stale_fields += (rec.fields || []).filter((f) => isStaleField(f)).length;
    open_conflicts += (rec.conflicts || []).filter((c) => c.resolution === "unresolved").length;
  }

  const total = templates.length;
  const enriched = complete + partial + blocked;
  const pct = (n) => (total ? Math.round((n / total) * 1000) / 10 : 0);

  return {
    schema_frozen_v1: SCHEMA_FROZEN_V1 === true,
    total,
    enriched,
    pending,
    complete,
    partial,
    blocked,
    pct_complete: pct(complete),
    pct_partial: pct(partial),
    pct_blocked: pct(blocked),
    pct_pending: pct(pending),
    pct_enriched: pct(enriched),
    mean_evidence_coverage: evidenceN ? Math.round((evidenceSum / evidenceN) * 1000) / 1000 : 0,
    open_conflicts,
    stale_fields,
    blocked_list,
    region_coverage_index: regionCoverageIndex(records),
    catalog_flags: detectCrossRegionCatalogConflicts(),
  };
}
