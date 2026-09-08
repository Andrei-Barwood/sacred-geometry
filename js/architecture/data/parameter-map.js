/**
 * Parameter → project path and affected engines.
 * Evidence does not decide what to recalculate; engines remain authority.
 */

export const PARAMETER_MAP = Object.freeze({
  frequencyHz: {
    path: "grid.frequencyHz",
    engines: [],
    label: "Nominal frequency",
    unit: "Hz",
    siteStudyIfMissing: false,
  },
  nominalVoltageLevelsKV: {
    path: null,
    engines: [],
    label: "Voltage levels present on the operator network",
    unit: "kV",
    note: "Existence of a level is not a project connection voltage.",
    writePolicy: "never-from-country-voltage-list",
  },
  gridOperator: {
    path: "grid.operator",
    engines: [],
    label: "Grid operator",
    unit: null,
  },
  gridCodeReference: {
    path: "grid.gridCodeReference",
    engines: [],
    label: "Grid-code reference",
    unit: null,
    note: "Citation only. Not a compliance finding.",
  },
  primaryKV: {
    path: "substation.primaryKV",
    engines: ["validation", "graph"],
    label: "Project primary voltage",
    unit: "kV",
    writePolicy: "never-from-country-voltage-list",
  },
  secondaryKV: {
    path: "substation.secondaryKV",
    engines: ["validation", "graph"],
    label: "Project secondary voltage",
    unit: "kV",
    writePolicy: "never-from-country-voltage-list",
  },
  gridStrength: {
    path: "grid.strength",
    engines: ["validation"],
    label: "Grid strength",
    unit: null,
    writePolicy: "site-study",
    note: "Grid strength is connection-point dependent. National data is not used.",
  },
  shortCircuitLevel: {
    path: "grid.shortCircuitLevel",
    engines: [],
    label: "Short-circuit level",
    unit: "kA",
    writePolicy: "site-study",
  },
  ghiAnnual: {
    path: null,
    engines: [],
    label: "GHI (annual)",
    unit: "kWh/m2/year",
    writePolicy: "never-as-specific-yield",
  },
  ghi: {
    path: null,
    engines: [],
    label: "GHI",
    unit: "kWh/m2/day",
    writePolicy: "never-as-specific-yield",
  },
  dni: { path: null, engines: [], label: "DNI", unit: "kWh/m2/year" },
  dhi: { path: null, engines: [], label: "DHI", unit: "kWh/m2/year" },
  gti: { path: null, engines: [], label: "GTI", unit: "kWh/m2/year" },
  referencePvout: {
    path: null,
    engines: [],
    label: "Reference PVOUT (GSA system)",
    unit: "kWh/kWp/year",
    writePolicy: "never-as-project-yield",
    note: "Reference-system production. Mounting, tracking and losses belong to the project.",
  },
  specificYield: {
    path: "generation.pv.specificYieldKWhPerKWpYear",
    engines: ["energy"],
    label: "Specific yield",
    unit: "kWh/kWp/year",
  },
  capacityFactor: {
    path: "generation.pv.capacityFactor",
    engines: ["energy"],
    label: "Capacity factor",
    unit: "1",
  },
  meanTemperatureC: {
    path: null,
    engines: [],
    label: "Mean temperature",
    unit: "°C",
  },
  floodRisk: {
    path: "site.environment.floodRisk",
    engines: [],
    writePolicy: "site-study",
    label: "Flood risk",
    note: "Not derived from rainfall alone.",
  },
  salinityRisk: {
    path: "site.environment.salinityRisk",
    engines: [],
    writePolicy: "site-study",
    label: "Salinity risk",
    note: "Not inferred from country coastline.",
  },
  soilingLossPercent: {
    path: "generation.pv.lossesPercent",
    engines: ["energy"],
    writePolicy: "site-study",
    label: "PV soiling loss",
    note: "Dust climatology is not soiling loss.",
  },
  energyCharge: {
    path: "economics.fiatPerKWh",
    engines: ["economics"],
    label: "Energy charge",
    unit: "currency/kWh",
  },
  fiatPerKWh: {
    path: "economics.fiatPerKWh",
    engines: ["economics"],
    label: "Fiat energy tariff",
    unit: "currency/kWh",
  },
  demandCharge: {
    path: null,
    engines: [],
    writePolicy: "not-energy-charge",
    label: "Demand charge",
    unit: "currency/kW",
  },
  fixedCharge: {
    path: null,
    engines: [],
    writePolicy: "not-energy-charge",
    label: "Fixed charge",
    unit: "currency/month",
  },
  tariffReference: {
    path: "economics.tariffReference",
    engines: [],
    label: "Official tariff reference",
    unit: null,
  },
  fiatPerBTC: {
    path: "economics.fiatPerBTC",
    engines: ["economics"],
    label: "Bitcoin price",
    unit: "fiat/BTC",
  },
  btcPrice: {
    path: "economics.fiatPerBTC",
    engines: ["economics"],
    label: "Bitcoin price",
    unit: "fiat/BTC",
  },
  transformerMVA: {
    path: "substation.transformerMVA",
    engines: ["validation", "graph"],
    label: "Transformer rating",
    unit: "MVA",
  },
});

export function parameterMeta(parameter) {
  return PARAMETER_MAP[parameter] || null;
}

export function enginesAffectedBy(parameter) {
  return parameterMeta(parameter)?.engines?.slice() || [];
}

export function getByPath(obj, path) {
  if (!obj || !path) return undefined;
  const parts = String(path).split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

export function setByPath(obj, path, value) {
  const parts = String(path).split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    if (cur[k] == null || typeof cur[k] !== "object") cur[k] = {};
    cur = cur[k];
  }
  cur[parts[parts.length - 1]] = value;
  return obj;
}
