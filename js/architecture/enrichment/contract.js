/**
 * Progressive Regional Enrichment contract.
 * Records live beside templates; they never mutate templates.js.
 */

export const ENRICHMENT_FORMAT = "sacred-architecture-enrichment-batch";
export const ENRICHMENT_ATLAS_FORMAT = "sacred-architecture-enrichment-atlas";
export const ENRICHMENT_SCHEMA_VERSION = 1;
/** v1 required keys are frozen. Optional annotations may exist; readers ignore unknown keys. */
export const SCHEMA_FROZEN_V1 = true;

export const ENRICHMENT_STATUS = Object.freeze({
  PENDING: "pending",
  PARTIAL: "partial",
  COMPLETE: "complete",
  BLOCKED: "blocked",
});

export const FIELD_METHOD = Object.freeze({
  MEASURED: "measured",
  OFFICIAL: "official",
  DERIVED: "derived",
  ASSUMED: "assumed",
  UNKNOWN: "unknown",
});

export const CONFLICT_RESOLUTION = Object.freeze({
  UNRESOLVED: "unresolved",
  PREFER_OFFICIAL: "prefer_official",
  PREFER_NEWER: "prefer_newer",
  MANUAL: "manual",
});

/** Kind → stale-after days. Same change-class policy as Verified Data. */
export const ENRICHMENT_FRESHNESS_DAYS = Object.freeze({
  tarifas: 400,
  radiacion: 1825,
  demanda: 1825,
  normativa: 400,
  frequency: 7300,
  operator: 1825,
  voltage_existence: 1825,
  climate: 1825,
  btc: 7,
  derived: 3650,
  assumed: 3650,
});

export const FIELD_KIND = Object.freeze({
  frequencyHz: "frequency",
  gridOperator: "operator",
  nominalVoltageLevelsKV: "voltage_existence",
  gridCodeReference: "normativa",
  ghiAnnual: "radiacion",
  referencePvout: "radiacion",
  specificYield: "radiacion",
  capacityFactor: "radiacion",
  energyCharge: "tarifas",
  tariffReference: "tarifas",
  fiatPerKWh: "tarifas",
  floodRisk: "climate",
  salinityRisk: "climate",
  gridStrength: "normativa",
  shortCircuitLevel: "normativa",
  peakLoadMW: "demanda",
  "loads.profile.peakLoadMW": "demanda",
  dcAcRatio: "derived",
  bessDurationHours: "derived",
  annualEnergyMWh: "derived",
  climate: "climate",
  "grid.mode": "assumed",
});

export const OFFICIAL_TARGET_KEYS = Object.freeze([
  "frequencyHz",
  "gridOperator",
  "nominalVoltageLevelsKV",
  "ghiAnnual",
  "referencePvout",
  "tariffReference",
]);

export const UNKNOWN_UNTIL_SOURCED = Object.freeze([
  "specificYield",
  "floodRisk",
  "salinityRisk",
  "gridStrength",
  "shortCircuitLevel",
  "energyCharge",
]);

export const ENGINE_DERIVED_KEYS = Object.freeze([
  "dcAcRatio",
  "bessDurationHours",
  "annualEnergyMWh",
  "nMinusOneCapacityMVA",
  "loadFactor",
]);

export const ASSUMED_TARGET_KEYS = Object.freeze([
  "loads.profile.peakLoadMW",
  "grid.mode",
  "climate",
]);

/** Full 13A field set. Unknown placeholders count as present. */
export const REQUIRED_FIELD_KEYS = Object.freeze([
  ...OFFICIAL_TARGET_KEYS,
  ...UNKNOWN_UNTIL_SOURCED,
  ...ASSUMED_TARGET_KEYS,
  ...ENGINE_DERIVED_KEYS,
]);

export const BATCH_SCOPE = Object.freeze({
  PILOT_8: "pilot-8",
  LOTE_9_24: "lote-9-24",
  LOTE_25_48: "lote-25-48",
  LOTE_49_END: "lote-49-end",
  REENRICH_REGION: "reenrich-region",
});

export const LOTE_9_24_SIZE = 16;
export const LOTE_25_48_SIZE = 24;
export const LOTE_CHUNK_SIZE = 4;
export const SUBLOTE_SIZE = 16;
export const BATCH_COVERAGE_THRESHOLD = 0.8;
/** Next after 9–24 (13B). */
export const NEXT_LOTE_RANGE = Object.freeze({ from: 25, to: 48, size: 24 });
/** Next after 25–48 (13C). Size filled at runtime from remaining atlas. */
export const LOTE_49_END_RANGE = Object.freeze({ from: 49, to: null, size: null });

export const JOB_STATUS = Object.freeze({
  IDLE: "idle",
  RUNNING: "running",
  DONE: "done",
  FAILED: "failed",
});

export const LOCAL_SOURCE_MISSING_WARNING = "sin fuente local";

export const CORE_ELECTRICAL_PATHS = Object.freeze([
  "id",
  "generation.pv.dcMWp",
  "generation.pv.acMW",
  "generation.pv.specificYieldKWhPerKWpYear",
  "bess.enabled",
  "bess.powerMW",
  "bess.energyMWh",
  "substation.primaryKV",
  "substation.secondaryKV",
  "substation.transformerMVA",
  "loadProfile.peakLoadMW",
  "frequencyHz",
  "economics.btcPerKWh",
]);

export function emptyField(key, extras = {}) {
  return {
    key,
    value: extras.value === undefined ? null : extras.value,
    unit: extras.unit ?? null,
    source_id: extras.source_id ?? null,
    source_url: extras.source_url ?? null,
    retrieved_at: extras.retrieved_at ?? null,
    freshness_days: extras.freshness_days ?? null,
    confidence: extras.confidence ?? null,
    conflict_ids: Array.isArray(extras.conflict_ids) ? extras.conflict_ids.slice() : [],
    method: extras.method || FIELD_METHOD.UNKNOWN,
  };
}

export function emptyRecord(partial = {}) {
  return {
    architecture_id: partial.architecture_id || null,
    region_id: partial.region_id || null,
    site_id: partial.site_id ?? null,
    template_id: partial.template_id || partial.architecture_id || null,
    enrichment_status: partial.enrichment_status || ENRICHMENT_STATUS.PENDING,
    fields: Array.isArray(partial.fields) ? partial.fields : [],
    evidence_coverage: Number.isFinite(partial.evidence_coverage) ? partial.evidence_coverage : 0,
    conflicts: Array.isArray(partial.conflicts) ? partial.conflicts : [],
    warnings: Array.isArray(partial.warnings) ? partial.warnings : [],
    last_enriched_at: partial.last_enriched_at || null,
    batch_id: partial.batch_id || null,
    regional_fit: partial.regional_fit === undefined ? null : partial.regional_fit,
    blocked_reason: partial.blocked_reason === undefined ? null : partial.blocked_reason,
  };
}

export function freshnessThresholdDays(key) {
  const kind = FIELD_KIND[key] || "assumed";
  return ENRICHMENT_FRESHNESS_DAYS[kind] ?? ENRICHMENT_FRESHNESS_DAYS.assumed;
}

export function isStaleField(field, now = Date.now()) {
  if (!field?.retrieved_at) return false;
  const t = Date.parse(field.retrieved_at);
  if (!Number.isFinite(t)) return false;
  const days = (now - t) / 86400000;
  const cap = freshnessThresholdDays(field.key);
  return days > cap;
}
