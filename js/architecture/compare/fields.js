/**
 * Comparison-view field catalog. Mapping only — no new electrical math.
 */

export const COMPARISON_THRESHOLD_DEFAULT = 5;
export const NA = "N/A";

export const ENTITY_KINDS = Object.freeze({
  TEMPLATE: "template",
  PROJECT: "project",
  SNAPSHOT: "snapshot",
  SITE: "site",
});

/** Fields that depend on engine-derived values. Deltas blocked if engines differ. */
export const ENGINE_SENSITIVE = Object.freeze([
  "dcAcRatio",
  "bessDurationHours",
  "annualEnergyMWh",
  "nMinusOneCapacityMVA",
  "loadFactor",
  "evidenceCoverage",
]);

/**
 * Comparable fields. path is dotted on the architecture-like object.
 * enrichKey reads enrichment records without recalculating.
 */
export const COMPARISON_GROUPS = Object.freeze([
  { id: "power", label: "Potencia" },
  { id: "energy", label: "Energía" },
  { id: "bess", label: "BESS" },
  { id: "mva", label: "MVA" },
  { id: "btc", label: "BTC" },
  { id: "regional", label: "Regional fit" },
  { id: "evidence", label: "Evidence / freshness" },
  { id: "warnings", label: "Warnings" },
  { id: "site", label: "Sitio / red" },
]);

export const COMPARISON_FIELDS = Object.freeze([
  { id: "peakLoadMW", group: "power", label: "Peak load", unit: "MW", kind: "number", path: "loadProfile.peakLoadMW" },
  { id: "loadFactor", group: "power", label: "Load factor", unit: "", kind: "number", path: "loadProfile.loadFactor" },
  { id: "pvDcMWp", group: "power", label: "PV DC", unit: "MWp", kind: "number", path: "generation.pv.dcMWp" },
  { id: "pvAcMW", group: "power", label: "PV AC", unit: "MW", kind: "number", path: "generation.pv.acMW" },
  { id: "dcAcRatio", group: "power", label: "DC/AC ratio", unit: "", kind: "number", path: "generation.pv.dcAcRatio" },
  { id: "windRatedMW", group: "power", label: "Wind rated", unit: "MW", kind: "number", path: "generation.wind.ratedMW" },
  { id: "dieselRatedMW", group: "power", label: "Diesel rated", unit: "MW", kind: "number", path: "generation.diesel.ratedMW" },
  { id: "specificYield", group: "energy", label: "Specific yield", unit: "kWh/kWp·y", kind: "number", path: "generation.pv.specificYieldKWhPerKWpYear" },
  { id: "annualEnergyMWh", group: "energy", label: "Annual energy", unit: "MWh", kind: "number", enrichKey: "annualEnergyMWh" },
  { id: "bessEnabled", group: "bess", label: "BESS enabled", unit: "", kind: "boolean", path: "bess.enabled" },
  { id: "bessPowerMW", group: "bess", label: "BESS power", unit: "MW", kind: "number", path: "bess.powerMW" },
  { id: "bessEnergyMWh", group: "bess", label: "BESS energy", unit: "MWh", kind: "number", path: "bess.energyMWh" },
  { id: "bessDurationHours", group: "bess", label: "BESS duration", unit: "h", kind: "number", path: "bess.durationHours", enrichKey: "bessDurationHours" },
  { id: "transformerMVA", group: "mva", label: "Transformer unit", unit: "MVA", kind: "number", path: "substation.transformerMVA" },
  { id: "transformerTotalMVA", group: "mva", label: "Transformer total", unit: "MVA", kind: "number", path: "substation.transformerTotalMVA" },
  { id: "transformerCount", group: "mva", label: "Transformer count", unit: "", kind: "number", path: "substation.transformerCount" },
  { id: "nMinusOneCapacityMVA", group: "mva", label: "N-1 capacity", unit: "MVA", kind: "number", enrichKey: "nMinusOneCapacityMVA" },
  { id: "primaryKV", group: "mva", label: "Primary voltage", unit: "kV", kind: "number", path: "substation.primaryKV" },
  { id: "secondaryKV", group: "mva", label: "Secondary voltage", unit: "kV", kind: "number", path: "substation.secondaryKV" },
  { id: "btcPerKWh", group: "btc", label: "BTC/kWh", unit: "BTC/kWh", kind: "number", path: "economics.btcPerKWh" },
  { id: "regionalFitScore", group: "regional", label: "Regional fit", unit: "", kind: "number", path: "regionalization.regionalFitScore", enrichKey: "regionalFitScore" },
  { id: "country", group: "regional", label: "Country", unit: "", kind: "string", path: "country" },
  { id: "region", group: "regional", label: "Region", unit: "", kind: "string", path: "region" },
  { id: "gridMode", group: "regional", label: "Grid mode", unit: "", kind: "string", path: "grid.mode" },
  { id: "evidenceCoverage", group: "evidence", label: "Evidence coverage", unit: "", kind: "number", enrichKey: "_coverage" },
  { id: "openConflicts", group: "evidence", label: "Open conflicts", unit: "", kind: "number", enrichKey: "_conflicts" },
  { id: "staleFields", group: "evidence", label: "Stale fields", unit: "", kind: "number", enrichKey: "_stale" },
  { id: "enrichmentStatus", group: "evidence", label: "Enrichment status", unit: "", kind: "string", enrichKey: "_status" },
  { id: "warningCount", group: "warnings", label: "Warning count", unit: "", kind: "number", path: "_warningCount" },
  { id: "siteLat", group: "site", label: "Latitude", unit: "°", kind: "number", siteKey: "lat" },
  { id: "siteLng", group: "site", label: "Longitude", unit: "°", kind: "number", siteKey: "lng" },
  { id: "proximityKm", group: "site", label: "Grid proximity", unit: "km", kind: "number", siteKey: "proximityKm" },
  { id: "proximityClass", group: "site", label: "Proximity class", unit: "", kind: "string", siteKey: "proximityClass" },
  { id: "restrictionCount", group: "site", label: "Restrictions", unit: "", kind: "number", siteKey: "restrictionCount" },
]);

/** Explicitly not in the comparison-view. */
export const NOT_COMPARABLE = Object.freeze([
  "qualityScore",
  "compositeRanking",
  "winner",
  "graphCoordinates",
  "svgLayout",
  "liveBtcPrice",
  "hourlyDispatch",
  "shortCircuit",
  "ghiAsSpecificYield",
  "voltageListAsPrimaryKV",
  "protectionCoordination",
]);

export function fieldById(id) {
  return COMPARISON_FIELDS.find((f) => f.id === id) || null;
}
