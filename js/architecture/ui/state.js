/**
 * Single source of truth for the Sacred Architecture workbench.
 * Unknown values are null. 0 means a known zero.
 */

import { TEMPLATE_DISCLAIMER, FAMILY_NAMES } from "../template-constants.js";
import { installationProfile, referenceLoads } from "../reference-loads.js";
import { pickRangeValue } from "../models.js";
import { cloneValue, newProjectId } from "./clone.js";
import {
  ARCHITECTURE_MODES,
  DISCLAIMER,
  EMPTY_LOAD_PROFILE,
  FAMILY_TO_MODE,
  MODE_TO_FAMILY,
  PROVENANCE,
  SAMPLE_6KW_ID,
  SAMPLE_6KW_NAME,
  VIEW_MODES,
  BTC_DISPLAY,
} from "./constants.js";

export function defaultDisplay() {
  return {
    view: VIEW_MODES.SYSTEM,
    btcDisplay: BTC_DISPLAY.BOTH,
    configSection: "overview",
    resultsSection: "summary",
    bottomTab: "calculators",
    loadColumns: {
      pf: false,
      runA: true,
      standbyA: false,
      cycles: false,
      energyCycle: false,
      season: true,
    },
    durationOverride: false,
  };
}

export function defaultScenario() {
  return {
    id: "normal",
    name: "Normal Operation",
    season: "winter",
    loadStates: {},
    exclusiveSelection: { "space-heater": "heater-800" },
  };
}

function emptyPv() {
  return {
    dcMWp: null,
    acMW: null,
    mounting: null,
    fixedTilt: null,
    bifacial: false,
    dcAcRatio: null,
    specificYieldKWhPerKWpYear: null,
    capacityFactor: null,
    lossesPercent: null,
    resourceProvenance: PROVENANCE.SITE_STUDY,
    capacityFactorInformationalOnly: false,
    specificYieldInformationalOnly: false,
  };
}

function emptyGeneration() {
  return {
    enabled: false,
    technologies: [],
    energyCalculationMethod: "specific-yield",
    pv: null,
    wind: null,
    diesel: null,
    other: null,
  };
}

function emptyBess() {
  return {
    enabled: false,
    powerMW: null,
    energyMWh: null,
    durationHours: null,
    roundTripEfficiency: null,
    usableDoD: null,
    purpose: [],
  };
}

function emptySubstation() {
  return {
    enabled: false,
    type: null,
    primaryKV: null,
    secondaryKV: null,
    tertiaryKV: null,
    transformerCount: null,
    transformerMVA: null,
    transformerTotalMVA: null,
    powerFactor: null,
    utilizationFactor: null,
    topology: null,
    redundancyMode: null,
    busConfiguration: null,
    gridConnection: null,
  };
}

function emptyGrid() {
  return {
    mode: "grid-connected",
    strength: null,
    frequencyHz: null,
    operator: null,
    gridCodeReference: null,
    exportAllowed: true,
    importAllowed: true,
    backupAvailable: false,
    islandable: false,
    blackStartRequired: false,
  };
}

function emptyEconomics() {
  return {
    tariffMode: null,
    btcPerKWh: null,
    satsPerKWh: null,
    fiatPerKWh: null,
    fiatPerBTC: null,
    currency: null,
  };
}

export function createEmptyProject() {
  const id = newProjectId();
  return {
    metadata: {
      id,
      name: "Untitled project",
      description:
        "Empty conceptual architecture project. Parameters must be verified through site-specific study.",
      conceptual: true,
      disclaimer: DISCLAIMER,
      family: "H",
      familyName: FAMILY_NAMES.H,
      archetype: null,
      archetypeTitle: null,
      application: null,
      validationProfile: null,
    },
    mode: ARCHITECTURE_MODES.HYBRID_MICROGRID,
    sourceTemplateId: null,
    country: null,
    countryName: null,
    region: null,
    subregion: null,
    installation: {
      voltageNominalV: 230,
      phases: 1,
      serviceLimitKW: null,
      daysPerMonth: 30,
      occupancy: null,
    },
    loads: {
      editor: "aggregated",
      items: [],
      profile: { ...EMPTY_LOAD_PROFILE },
    },
    transients: [],
    generation: emptyGeneration(),
    bess: emptyBess(),
    substation: emptySubstation(),
    grid: emptyGrid(),
    feeders: [],
    economics: emptyEconomics(),
    scenario: defaultScenario(),
    site: {
      environment: null,
      territorialRules: [],
    },
    assumptions: [
      "Empty project: unknown quantities are null, not zero.",
      "Values must be verified through site-specific study.",
    ],
    warnings: [],
    provenance: {
      "generation.pv.specificYieldKWhPerKWpYear": PROVENANCE.SITE_STUDY,
    },
    acceptedEvidence: {},
    evidenceHistory: [],
    dismissedEvidence: {},
    geospatial: {
      sites: [],
      activeSiteId: null,
      restrictions: [],
      gridNetwork: null,
      evaluatedTemplateId: null,
      warnings: [],
    },
    seasonalProfiles: null,
    display: defaultDisplay(),
    started: true,
  };
}

function normalizeGeneration(gen) {
  if (!gen) return emptyGeneration();
  const out = cloneValue(gen);
  if (!Array.isArray(out.technologies)) out.technologies = [];
  if (out.pv === undefined) out.pv = null;
  if (out.pv && out.pv.specificYieldKWhPerKWpYear === undefined) {
    out.pv.specificYieldKWhPerKWpYear = null;
  }
  if (out.pv && out.pv.capacityFactor === undefined) out.pv.capacityFactor = null;
  if (out.wind === undefined) out.wind = null;
  if (out.diesel === undefined) out.diesel = null;
  if (!out.energyCalculationMethod) out.energyCalculationMethod = "specific-yield";
  return out;
}

function normalizeBess(bess) {
  if (!bess) return emptyBess();
  const out = cloneValue(bess);
  if (!Array.isArray(out.purpose)) out.purpose = out.purpose ? [out.purpose] : [];
  if (out.enabled !== true) {
    return {
      ...emptyBess(),
      ...out,
      enabled: false,
    };
  }
  return out;
}

function normalizeSubstation(sub) {
  if (!sub) return emptySubstation();
  return { ...emptySubstation(), ...cloneValue(sub) };
}

function normalizeGrid(grid) {
  if (!grid) return emptyGrid();
  const g = cloneValue(grid);
  return {
    ...emptyGrid(),
    ...g,
    islandable: g.islandable === true || g.mode === "islandable" || g.mode === "off-grid",
  };
}

function profileFromTemplate(loadProfile) {
  if (!loadProfile) return { ...EMPTY_LOAD_PROFILE };
  const p = { ...EMPTY_LOAD_PROFILE };
  for (const key of Object.keys(EMPTY_LOAD_PROFILE)) {
    if (loadProfile[key] !== undefined) p[key] = loadProfile[key];
  }
  return p;
}

function templateProvenance(template) {
  const p = {};
  const mark = (path, code) => {
    p[path] = code;
  };
  mark("loads.profile", PROVENANCE.ASSUMPTION);
  mark("generation", PROVENANCE.ASSUMPTION);
  mark("bess", PROVENANCE.ASSUMPTION);
  mark("substation", PROVENANCE.ASSUMPTION);
  mark("grid", PROVENANCE.ASSUMPTION);
  mark("site", PROVENANCE.ASSUMPTION);
  const pv = template.generation && template.generation.pv;
  if (pv) {
    if (pv.resourceProvenance === PROVENANCE.SITE_STUDY || pv.specificYieldKWhPerKWpYear == null) {
      mark("generation.pv.specificYieldKWhPerKWpYear", PROVENANCE.SITE_STUDY);
    }
    if (pv.capacityFactor == null) {
      mark("generation.pv.capacityFactor", PROVENANCE.SITE_STUDY);
    }
  }
  if (template.economics && template.economics.btcPerKWh == null) {
    mark("economics.btcPerKWh", PROVENANCE.USER);
  }
  return p;
}

export function projectFromTemplate(template, options = {}) {
  if (!template || typeof template !== "object") {
    throw new Error("template is required");
  }
  const clone = cloneValue(template);
  const family = clone.family || "H";
  const mode = options.mode || FAMILY_TO_MODE[family] || ARCHITECTURE_MODES.HYBRID_MICROGRID;
  const loadItems = Array.isArray(options.loadItems)
    ? options.loadItems.map((item) => normalizeLoadItem(item))
    : [];

  return {
    metadata: {
      id: options.newId || newProjectId(),
      name: clone.name || "Untitled project",
      description:
        clone.description ||
        "Conceptual architecture project. Parameters must be verified through site-specific study.",
      conceptual: true,
      disclaimer: clone.disclaimer || TEMPLATE_DISCLAIMER,
      family,
      familyName: clone.familyName || FAMILY_NAMES[family] || FAMILY_NAMES.H,
      archetype: clone.archetype || null,
      archetypeTitle: clone.archetypeTitle || null,
      application: clone.application || null,
      validationProfile: options.validationProfile || null,
    },
    mode,
    sourceTemplateId: clone.id || null,
    country: clone.country ?? null,
    countryName: clone.countryName ?? null,
    region: clone.region ?? null,
    subregion: clone.subregion ?? null,
    installation: {
      voltageNominalV: options.installation?.voltageNominalV ?? 230,
      phases: options.installation?.phases ?? 1,
      serviceLimitKW: options.installation?.serviceLimitKW ?? null,
      daysPerMonth: options.installation?.daysPerMonth ?? 30,
      occupancy: options.installation?.occupancy ?? null,
    },
    loads: {
      editor: loadItems.length ? "detailed" : "aggregated",
      items: loadItems,
      profile: profileFromTemplate(clone.loadProfile),
    },
    transients: Array.isArray(clone.loadProfile?.transientEvents)
      ? cloneValue(clone.loadProfile.transientEvents).map((ev, i) => ({
          id: ev.id || `tr-${i + 1}`,
          name: ev.name || "Transient",
          type: ev.type || "custom",
          runningCurrentA: ev.runningCurrentA ?? null,
          startingCurrentA: ev.startingCurrentA ?? null,
          runningMW: ev.runningMW ?? null,
          startingMultiple: ev.startingMultiple ?? null,
          durationSeconds: ev.durationSeconds ?? null,
          associatedLoadId: ev.associatedLoadId ?? null,
        }))
      : [],
    generation: normalizeGeneration(clone.generation),
    bess: normalizeBess(clone.bess),
    substation: normalizeSubstation(clone.substation),
    grid: normalizeGrid(clone.grid),
    feeders: Array.isArray(clone.feeders) ? cloneValue(clone.feeders) : [],
    economics: {
      ...emptyEconomics(),
      btcPerKWh: clone.economics?.btcPerKWh ?? null,
      satsPerKWh: clone.economics?.satsPerKWh ?? null,
      fiatPerKWh: clone.economics?.fiatPerKWh ?? null,
      fiatPerBTC: clone.economics?.fiatPerBTC ?? null,
      currency: clone.economics?.currency ?? null,
      tariffMode:
        clone.economics?.btcPerKWh != null
          ? "btc"
          : clone.economics?.satsPerKWh != null
            ? "sats"
            : null,
    },
    scenario: options.scenario || defaultScenario(),
    site: {
      environment: clone.environment ? cloneValue(clone.environment) : null,
      territorialRules: Array.isArray(clone.territorialRules)
        ? cloneValue(clone.territorialRules)
        : [],
    },
    assumptions: Array.isArray(clone.assumptions) ? cloneValue(clone.assumptions) : [],
    warnings: Array.isArray(clone.warnings) ? cloneValue(clone.warnings) : [],
    provenance: templateProvenance(clone),
    acceptedEvidence: {},
    evidenceHistory: [],
    dismissedEvidence: {},
    geospatial: {
      sites: [],
      activeSiteId: null,
      restrictions: [],
      gridNetwork: null,
      evaluatedTemplateId: null,
      warnings: [],
    },
    seasonalProfiles: clone.seasonalProfiles ? cloneValue(clone.seasonalProfiles) : null,
    display: { ...defaultDisplay(), ...(options.display || {}) },
    started: true,
  };
}

export function normalizeLoadItem(load) {
  const item = cloneValue(load);
  if (!item.id) item.id = `load-${newProjectId("L")}`;
  if (item.enabled == null) item.enabled = true;
  if (!item.state) item.state = "OFF";
  if (item.quantity == null) item.quantity = 1;
  return item;
}

export function createSample6kWProject() {
  const items = referenceLoads.map((load) => {
    const item = normalizeLoadItem(load);
    item.state = defaultStateForSample(item);
    return item;
  });
  const project = createEmptyProject();
  project.metadata.id = newProjectId("S6");
  project.metadata.name = SAMPLE_6KW_NAME;
  project.metadata.description =
    "Conceptual 6 kW single-phase load study for residential/farm diagnostic work. Not an engineering-certified installation.";
  project.metadata.application = "residential-farm";
  project.metadata.validationProfile = "consumption-study-6kw";
  project.metadata.family = "H";
  project.metadata.familyName = FAMILY_NAMES.H;
  project.mode = ARCHITECTURE_MODES.LOAD_INSTALLATION;
  project.sourceTemplateId = SAMPLE_6KW_ID;
  project.installation = {
    voltageNominalV: installationProfile.voltageNominalV,
    phases: installationProfile.phases,
    serviceLimitKW: installationProfile.serviceLimitKW,
    daysPerMonth: installationProfile.daysPerMonth,
    occupancy: installationProfile.occupancy,
  };
  project.loads = {
    editor: "detailed",
    items,
    profile: {
      ...EMPTY_LOAD_PROFILE,
      peakLoadMW: installationProfile.serviceLimitKW / 1000,
      dominantLoadType: "mixed residential/farm",
      scaleBand: "kW-scale",
    },
  };
  project.grid = {
    ...emptyGrid(),
    mode: "grid-connected",
    strength: "strong",
    importAllowed: true,
    exportAllowed: false,
  };
  project.substation.enabled = false;
  project.generation.enabled = false;
  project.bess.enabled = false;
  project.assumptions = [
    ...(installationProfile.notes || []),
    "Conceptual diagnostic model. Not a certified installation.",
    "Inrush is demand-only and does not enter monthly energy.",
  ];
  project.provenance = {
    "loads.items": PROVENANCE.SOURCE_DERIVED,
    "installation.serviceLimitKW": PROVENANCE.SOURCE_DERIVED,
    "installation.voltageNominalV": PROVENANCE.SOURCE_DERIVED,
    "economics.btcPerKWh": PROVENANCE.USER,
  };
  project.scenario = {
    ...defaultScenario(),
    loadStates: Object.fromEntries(items.map((l) => [l.id, l.state])),
  };
  return project;
}

function defaultStateForSample(load) {
  if (load.category === "compressor") return "RUNNING";
  if (load.category === "standby") return "STANDBY";
  if (load.id === "heater-800") return "RUNNING";
  if (load.mutuallyExclusiveGroup === "space-heater") return "OFF";
  if (load.category === "lighting") return "OFF";
  return "OFF";
}

function finiteOrNull(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : v === 0 ? 0 : v ?? null;
}

export function projectToTemplate(project) {
  if (!project) return null;
  const family = project.metadata?.family || MODE_TO_FAMILY[project.mode] || "H";
  const profile = { ...(project.loads?.profile || {}) };
  if (Array.isArray(project.transients) && project.transients.length) {
    profile.transientEvents = project.transients.map((ev) => ({
      name: ev.name,
      type: ev.type,
      runningMW: ev.runningMW ?? null,
      runningCurrentA: ev.runningCurrentA ?? null,
      startingCurrentA: ev.startingCurrentA ?? null,
      startingMultiple: ev.startingMultiple ?? null,
      durationSeconds: ev.durationSeconds ?? null,
      associatedLoadId: ev.associatedLoadId ?? null,
    }));
  }
  if (profile.peakLoadMW == null && project.loads?.items?.length) {
    const watts = project.loads.items.reduce((sum, load) => {
      if (load.enabled === false) return sum;
      const p = pickRangeValue(load.nominalPowerW);
      const q = Number.isFinite(load.quantity) ? load.quantity : 1;
      return sum + (p == null ? 0 : p * q);
    }, 0);
    if (watts > 0) profile.peakLoadMW = watts / 1e6;
  }

  const env = project.site?.environment;
  const generation = cloneValue(project.generation) || emptyGeneration();
  const bess = cloneValue(project.bess) || emptyBess();
  const substation = cloneValue(project.substation) || emptySubstation();

  return {
    id: project.metadata?.id || "WB-PROJECT",
    name: project.metadata?.name || "Untitled project",
    family,
    familyName: project.metadata?.familyName || FAMILY_NAMES[family] || "HYBRID / MICROGRID",
    archetype: project.metadata?.archetype || "H01",
    archetypeTitle: project.metadata?.archetypeTitle || "Workbench project",
    country: project.country ?? null,
    countryName: project.countryName ?? null,
    region: project.region ?? null,
    regionId: project.regionId ?? null,
    subregion: project.subregion ?? null,
    application: project.metadata?.application || "conceptual-workbench",
    conceptual: true,
    featured: false,
    disclaimer: project.metadata?.disclaimer || DISCLAIMER,
    description:
      project.metadata?.description ||
      "Conceptual workbench project. Parameters must be verified through site-specific study.",
    environment: env && typeof env === "object" ? cloneValue(env) : { code: null },
    territorialRules: Array.isArray(project.site?.territorialRules)
      ? cloneValue(project.site.territorialRules)
      : [],
    grid: cloneValue(project.grid) || emptyGrid(),
    loadProfile: profile,
    seasonalProfiles: project.seasonalProfiles ?? null,
    generation,
    bess,
    substation,
    feeders: Array.isArray(project.feeders) ? cloneValue(project.feeders) : [],
    economics: {
      btcPerKWh: finiteOrNull(project.economics?.btcPerKWh),
      satsPerKWh: finiteOrNull(project.economics?.satsPerKWh),
    },
    assumptions: Array.isArray(project.assumptions) ? cloneValue(project.assumptions) : [],
    warnings: Array.isArray(project.warnings) ? cloneValue(project.warnings) : [],
  };
}

export function snapshotProject(project) {
  return cloneValue(project);
}

export { pickRangeValue };
