/** Thresholds centrales. Nada de magia dispersa. Determinista. */

export const VALIDATION_CONFIG = Object.freeze({
  modeDefault: "audit",
  featuredMinScore: 80,
  featuredMinFit: 70,
  countryShareMax: 0.15,
  regionShareMax: 0.4,
  duplicationThreshold: 0.92,
  tolerances: Object.freeze({
    loadFactorAbs: 0.02,
    loadFactorErrorAbs: 0.15,
    bessDurationRel: 0.05,
    dcAcRatioRel: 0.08,
    transformerSumRel: 0.05,
    satsRel: 1e-6,
    currentRel: 0.02,
  }),
  warnings: Object.freeze({
    dcAcHigh: 1.45,
    dcAcLow: 1.05,
    bessDurationHighH: 10,
    bessShiftShortH: 1.25,
    transformerUtilHigh: 0.9,
    feederLongKM: 80,
    seasonalHighPct: 55,
    regionalFitLow: 70,
    inrushMultipleHigh: 10,
    coverageLow: 0.5,
  }),
  scoring: Object.freeze({
    schema: 20,
    mathematics: 25,
    electrical: 20,
    regional: 15,
    provenance: 10,
    diversity: 10,
    errorPenalty: 20,
    highPenalty: 6,
    mediumPenalty: 3,
    lowPenalty: 1,
  }),
  riskLevels: Object.freeze(["low", "medium", "high", "extreme"]),
  provenances: Object.freeze([
    "source-derived",
    "calculated",
    "conceptual-assumption",
    "user-input",
    "future-site-study",
    "verified-external",
  ]),
  gridModes: Object.freeze(["grid-connected", "weak-grid", "off-grid", "islandable"]),
  families: Object.freeze(["G", "S", "H"]),
});

export const CONSUMPTION_PROFILE_ID = "consumption-study-6kw";
export const SRC_CONSUMPTION_6KW = "SRC_CONSUMPTION_6KW";
export const SRC_SIWA_ARCHITECTURE = "SRC_SIWA_ARCHITECTURE";
