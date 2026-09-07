/**
 * Verified Data / Evidence layer constants.
 * Independent of templates, calculators, and validation quality scores.
 */

export const AUTHORITY_TIERS = Object.freeze({
  TIER_1_PRIMARY: "TIER_1_PRIMARY",
  TIER_2_INSTITUTIONAL: "TIER_2_INSTITUTIONAL",
  TIER_3_TECHNICAL_SECONDARY: "TIER_3_TECHNICAL_SECONDARY",
  TIER_4_REFERENCE: "TIER_4_REFERENCE",
  UNVERIFIED: "UNVERIFIED",
});

export const TIER_SCORE = Object.freeze({
  TIER_1_PRIMARY: 90,
  TIER_2_INSTITUTIONAL: 75,
  TIER_3_TECHNICAL_SECONDARY: 55,
  TIER_4_REFERENCE: 35,
  UNVERIFIED: 10,
});

export const GRANULARITY = Object.freeze({
  GLOBAL: "GLOBAL",
  COUNTRY: "COUNTRY",
  OPERATOR: "OPERATOR",
  REGION: "REGION",
  SUBREGION: "SUBREGION",
  SITE: "SITE",
  COORDINATE: "COORDINATE",
  EQUIPMENT: "EQUIPMENT",
});

export const GRANULARITY_RANK = Object.freeze({
  COORDINATE: 80,
  SITE: 70,
  SUBREGION: 55,
  REGION: 45,
  OPERATOR: 40,
  COUNTRY: 25,
  GLOBAL: 10,
  EQUIPMENT: 50,
});

export const CHANGE_CLASS = Object.freeze({
  STATIC: "STATIC",
  SLOW_CHANGING: "SLOW_CHANGING",
  PERIODIC: "PERIODIC",
  FAST_CHANGING: "FAST_CHANGING",
});

export const FRESHNESS = Object.freeze({
  FRESH: "FRESH",
  AGING: "AGING",
  STALE: "STALE",
  UNKNOWN: "UNKNOWN",
});

export const EVIDENCE_STATUS = Object.freeze({
  CANDIDATE: "CANDIDATE",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  DISMISSED: "DISMISSED",
  CACHED: "CACHED",
  STALE: "STALE",
  INVALID: "INVALID",
});

export const FIELD_DATA_STATUS = Object.freeze({
  UNVERIFIED: "UNVERIFIED",
  ASSUMED: "ASSUMED",
  VERIFIED: "VERIFIED",
  CALCULATED: "CALCULATED",
  USER: "USER",
  PENDING: "PENDING",
  CONFLICTING: "CONFLICTING",
  STALE: "STALE",
  SITE_STUDY: "SITE_STUDY",
});

export const PROVIDER_STATUS = Object.freeze({
  AVAILABLE: "AVAILABLE",
  OFFLINE: "OFFLINE",
  ERROR: "ERROR",
  RATE_LIMITED: "RATE_LIMITED",
  NO_DATA: "NO_DATA",
  UNSUPPORTED: "UNSUPPORTED",
});

export const CONFLICT_TYPE = Object.freeze({
  TEMPORAL: "TEMPORAL",
  GEOGRAPHIC: "GEOGRAPHIC",
  METHODOLOGICAL: "METHODOLOGICAL",
  TARIFF_CLASS: "TARIFF_CLASS",
  UNIT: "UNIT",
  SOURCE: "SOURCE",
  SYSTEM_BOUNDARY: "SYSTEM_BOUNDARY",
  MAGNITUDE: "MAGNITUDE",
  NOT_COMPARABLE: "NOT_COMPARABLE",
});

export const CONFLICT_SEVERITY = Object.freeze({
  INFO: "INFO",
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
});

export const TARIFF_STATUS = Object.freeze({
  DIRECTLY_USABLE: "DIRECTLY_USABLE",
  STRUCTURED: "STRUCTURED",
  REQUIRES_LOAD_PROFILE: "REQUIRES_LOAD_PROFILE",
  INCOMPLETE: "INCOMPLETE",
  STALE: "STALE",
});

export const TARIFF_CUSTOMER_CLASS = Object.freeze({
  RESIDENTIAL: "residential",
  COMMERCIAL: "commercial",
  INDUSTRIAL: "industrial",
  AGRICULTURAL: "agricultural",
  OTHER: "other",
  UNKNOWN: "unknown",
});

export const SOLAR_PARAMETERS = Object.freeze([
  "ghi",
  "ghiAnnual",
  "dni",
  "dhi",
  "gti",
  "referencePvout",
  "specificYield",
  "capacityFactor",
  "pvEnergyOutput",
]);

export const UPDATE_RESULT = Object.freeze({
  UNCHANGED: "UNCHANGED",
  NEWER_DATA_AVAILABLE: "NEWER_DATA_AVAILABLE",
  SOURCE_REMOVED: "SOURCE_REMOVED",
  SOURCE_ERROR: "SOURCE_ERROR",
  CONFLICT: "CONFLICT",
});

export const PROVENANCE_VERIFIED = "verified-external";

export const EVIDENCE_PROVENANCE = Object.freeze({
  CONCEPTUAL_ASSUMPTION: "conceptual-assumption",
  SOURCE_DERIVED: "source-derived",
  VERIFIED_EXTERNAL: "verified-external",
  CALCULATED: "calculated",
  USER_INPUT: "user-input",
  FUTURE_SITE_STUDY: "future-site-study",
});

export const SITE_STUDY_REASON = Object.freeze({
  FUTURE_SITE_STUDY: "future-site-study",
  NEEDS_SPECIALIZED_SOURCE: "needs-specialized-source",
  COORDINATE_REQUIRED: "coordinate-required",
  CONNECTION_POINT_REQUIRED: "connection-point-required",
  LOAD_PROFILE_REQUIRED: "load-profile-required",
  CURRENCY_CONVERSION_REQUIRED: "currency-conversion-required",
  APPLICABILITY_UNKNOWN: "applicability-unknown",
});

/** Days after which a category moves FRESH → AGING → STALE. No universal TTL. */
export const FRESHNESS_THRESHOLDS = Object.freeze({
  STATIC: { agingDays: 3650, staleDays: 7300 },
  SLOW_CHANGING: { agingDays: 730, staleDays: 1825 },
  PERIODIC: { agingDays: 180, staleDays: 400 },
  FAST_CHANGING: { agingDays: 1, staleDays: 7 },
});

export const PARAMETER_CHANGE_CLASS = Object.freeze({
  frequencyHz: CHANGE_CLASS.STATIC,
  nominalVoltageLevelsKV: CHANGE_CLASS.SLOW_CHANGING,
  gridOperator: CHANGE_CLASS.SLOW_CHANGING,
  gridCodeReference: CHANGE_CLASS.PERIODIC,
  primaryKV: CHANGE_CLASS.SLOW_CHANGING,
  secondaryKV: CHANGE_CLASS.SLOW_CHANGING,
  ghi: CHANGE_CLASS.SLOW_CHANGING,
  ghiAnnual: CHANGE_CLASS.SLOW_CHANGING,
  dni: CHANGE_CLASS.SLOW_CHANGING,
  dhi: CHANGE_CLASS.SLOW_CHANGING,
  gti: CHANGE_CLASS.SLOW_CHANGING,
  referencePvout: CHANGE_CLASS.SLOW_CHANGING,
  specificYield: CHANGE_CLASS.SLOW_CHANGING,
  capacityFactor: CHANGE_CLASS.SLOW_CHANGING,
  meanTemperatureC: CHANGE_CLASS.SLOW_CHANGING,
  humidity: CHANGE_CLASS.SLOW_CHANGING,
  precipitationMm: CHANGE_CLASS.SLOW_CHANGING,
  windSpeedMs: CHANGE_CLASS.SLOW_CHANGING,
  energyCharge: CHANGE_CLASS.PERIODIC,
  demandCharge: CHANGE_CLASS.PERIODIC,
  fixedCharge: CHANGE_CLASS.PERIODIC,
  tariffReference: CHANGE_CLASS.PERIODIC,
  fiatPerKWh: CHANGE_CLASS.PERIODIC,
  fiatPerBTC: CHANGE_CLASS.FAST_CHANGING,
  btcPrice: CHANGE_CLASS.FAST_CHANGING,
  elevationM: CHANGE_CLASS.STATIC,
  landCover: CHANGE_CLASS.SLOW_CHANGING,
  terrainClass: CHANGE_CLASS.STATIC,
});

export const INCOMPARABLE_PAIRS = Object.freeze([
  ["ghi", "specificYield"],
  ["ghiAnnual", "specificYield"],
  ["ghi", "referencePvout"],
  ["ghiAnnual", "referencePvout"],
  ["dni", "specificYield"],
  ["dhi", "specificYield"],
  ["gti", "specificYield"],
  ["energyCharge", "demandCharge"],
  ["energyCharge", "fixedCharge"],
  ["demandCharge", "fixedCharge"],
  ["fiatPerKWh", "demandCharge"],
  ["nominalVoltageLevelsKV", "primaryKV"],
]);

export const MAX_RAW_EXCERPT = 280;
export const MAX_SOURCE_TITLE = 200;
export const MAX_PAYLOAD_BYTES = 256 * 1024;
export const PROVIDER_TIMEOUT_MS = 8000;
export const CACHE_DB_STORE_EVIDENCE = "evidence";
export const CACHE_DB_STORE_PROVIDER = "providerCache";
export const CACHE_DB_STORE_RESEARCH = "researchRecords";

export const SAFE_URL_PROTOCOLS = Object.freeze(["http:", "https:"]);
export const BLOCKED_URL_PROTOCOLS = Object.freeze(["javascript:", "data:", "file:", "blob:", "vbscript:"]);
