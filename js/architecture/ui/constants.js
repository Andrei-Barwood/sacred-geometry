/** Workbench constants. No calculation. */

export const WORKBENCH_NAME = "ARQUITECTURA SAGRADA";
export const WORKBENCH_SUBTITLE = "Potencia · Energía · Transformación · Bitcoin";
export const WORKBENCH_LEAD =
  "Workbench de arquitecturas eléctricas para cargas, generación, almacenamiento y transformación.";

export const DISCLAIMER =
  "Conceptual engineering workbench. Values must be verified through site-specific study, local grid requirements and detailed engineering.";

export const SAMPLE_6KW_ID = "SAMPLE-6KW-LOAD-STUDY";
export const SAMPLE_6KW_NAME = "Conceptual 6 kW Residential/Farm Load Study";

export const ARCHITECTURE_MODES = Object.freeze({
  LOAD_INSTALLATION: "load-installation",
  GENERATION_PLANT: "generation-plant",
  SUBSTATION: "substation",
  HYBRID_MICROGRID: "hybrid-microgrid",
});

export const MODE_LABELS = Object.freeze({
  [ARCHITECTURE_MODES.LOAD_INSTALLATION]: "Load Installation",
  [ARCHITECTURE_MODES.GENERATION_PLANT]: "Generation Plant",
  [ARCHITECTURE_MODES.SUBSTATION]: "Substation",
  [ARCHITECTURE_MODES.HYBRID_MICROGRID]: "Hybrid / Microgrid",
});

export const MODE_TO_FAMILY = Object.freeze({
  [ARCHITECTURE_MODES.LOAD_INSTALLATION]: "H",
  [ARCHITECTURE_MODES.GENERATION_PLANT]: "G",
  [ARCHITECTURE_MODES.SUBSTATION]: "S",
  [ARCHITECTURE_MODES.HYBRID_MICROGRID]: "H",
});

export const FAMILY_TO_MODE = Object.freeze({
  G: ARCHITECTURE_MODES.GENERATION_PLANT,
  S: ARCHITECTURE_MODES.SUBSTATION,
  H: ARCHITECTURE_MODES.HYBRID_MICROGRID,
});

export const CONFIG_SECTIONS = Object.freeze([
  "overview",
  "loads",
  "generation",
  "bess",
  "substation",
  "grid",
  "feeders",
  "economics",
  "site",
  "assumptions",
]);

export const CONFIG_LABELS = Object.freeze({
  overview: "Overview",
  loads: "Loads",
  generation: "Generation",
  bess: "BESS",
  substation: "Substation",
  grid: "Grid",
  feeders: "Feeders",
  economics: "Economics",
  site: "Site",
  assumptions: "Assumptions",
});

export const MODE_SECTIONS = Object.freeze({
  [ARCHITECTURE_MODES.LOAD_INSTALLATION]: [
    "overview",
    "loads",
    "grid",
    "economics",
    "site",
    "assumptions",
  ],
  [ARCHITECTURE_MODES.GENERATION_PLANT]: [
    "overview",
    "generation",
    "bess",
    "substation",
    "grid",
    "feeders",
    "economics",
    "site",
    "assumptions",
  ],
  [ARCHITECTURE_MODES.SUBSTATION]: [
    "overview",
    "substation",
    "grid",
    "feeders",
    "loads",
    "site",
    "assumptions",
  ],
  [ARCHITECTURE_MODES.HYBRID_MICROGRID]: CONFIG_SECTIONS,
});

export const GRID_MODE_DEFS = Object.freeze({
  "grid-connected":
    "Interconnected with a utility network. Import and export may be possible.",
  "weak-grid":
    "Connected to a network with limited strength or hosting capacity.",
  "off-grid":
    "No utility interconnection. Local generation is required; BESS alone is not a source.",
  islandable:
    "Normally connected; can operate isolated when the network is unavailable.",
});

export const PROVENANCE = Object.freeze({
  SOURCE_DERIVED: "source-derived",
  CALCULATED: "calculated",
  ASSUMPTION: "conceptual-assumption",
  USER: "user-input",
  SITE_STUDY: "future-site-study",
  VERIFIED: "verified-external",
});

export const PROVENANCE_LABELS = Object.freeze({
  "source-derived": "SOURCE",
  calculated: "CALCULATED",
  "conceptual-assumption": "ASSUMPTION",
  "user-input": "USER",
  "future-site-study": "SITE STUDY",
  "verified-external": "VERIFIED",
});

export const SCENARIO_PRESETS = Object.freeze([
  { id: "normal", name: "Normal Operation" },
  { id: "peak", name: "Peak Load" },
  { id: "motor-start", name: "Motor Start" },
  { id: "islanded", name: "Islanded Operation" },
  { id: "custom", name: "Custom Scenario" },
]);

export const TRANSIENT_TYPES = Object.freeze([
  "motor-start",
  "pump-start",
  "compressor-start",
  "conveyor-start",
  "process-start",
  "custom",
]);

export const LOAD_STATES = Object.freeze(["OFF", "STANDBY", "RUNNING", "STARTING"]);

export const VIEW_MODES = Object.freeze({
  SYSTEM: "system",
  SACRED: "sacred",
  MAP: "map",
});

export const BTC_DISPLAY = Object.freeze({
  BTC: "btc",
  SATS: "sats",
  BOTH: "both",
});

export const ISSUE_TO_SECTION = Object.freeze({
  bess: "bess",
  generation: "generation",
  substation: "substation",
  load: "loads",
  consumption: "loads",
  energy: "loads",
  grid: "grid",
  economics: "economics",
  feeders: "feeders",
  region: "site",
  provenance: "assumptions",
  schema: "overview",
  transients: "loads",
  application: "overview",
  privacy: "overview",
  integrity: "overview",
});

export const NODE_TYPES = Object.freeze([
  "pv",
  "wind",
  "diesel",
  "bess",
  "grid",
  "transformer",
  "bus",
  "feeder",
  "load",
  "substation",
  "future",
]);

export const VOLTAGE_LAYER = Object.freeze({
  HV: "HV",
  MV: "MV",
  LV: "LV",
});

export function voltageLayerFromKV(kv) {
  if (kv == null || !Number.isFinite(kv)) return null;
  if (kv >= 66) return VOLTAGE_LAYER.HV;
  if (kv >= 1) return VOLTAGE_LAYER.MV;
  return VOLTAGE_LAYER.LV;
}

export const EMPTY_LOAD_PROFILE = Object.freeze({
  baseLoadMW: null,
  averageLoadMW: null,
  peakLoadMW: null,
  loadFactor: null,
  criticalLoadMW: null,
  cyclicLoadMW: null,
  motorLoadMW: null,
  thermalLoadMW: null,
  interruptibleLoadMW: null,
  standbyLoadMW: null,
  seasonalVariationPercent: null,
  dominantLoadType: null,
  scaleBand: null,
});

export const LOAD_OVERLAP_NOTE =
  "Load categories may overlap and are not necessarily additive.";

export const VOLTAGE_DROP_NOTE =
  "Detailed voltage-drop calculation requires conductor data.";

export const ENERGY_REQUIRED_NOTE = "Energy is required to calculate cost.";

export const PAGE_SIZE = 12;
