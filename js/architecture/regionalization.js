/**
 * Segunda pasada: regionalizar templates existentes.
 * No regenera arquitectura eléctrica (MW, kV, BESS energy).
 */

import {
  ATLAS_BAND,
  ATLAS_CORRIDOR,
  ATLAS_TITLE,
  CANONICAL_APPLICATIONS,
  CLIMATE_ENVELOPES,
  COUNTRY_TO_REGION,
  ENV_TO_ENVELOPE,
  ENV_TO_SUBREGION,
  REGIONAL_PROFILES,
} from "./regional-profiles.js";
import { APPLICATION_TO_LOAD, LOAD_ARCHETYPES } from "./load-archetypes.js";
import { ARCHETYPES } from "./template-constants.js";

const COMMON_ASSUMPTIONS = Object.freeze([
  "Conceptual regional scenario in the Mauritania–Thailand corridor.",
  "Country is geographic context, not a claim that this voltage or topology is the national standard.",
  "Load profile is an aggregated engineering archetype, not measured demand.",
  "Solar resource and specific yield require a site study.",
  "Tariff is user-supplied (BTC/kWh).",
]);

export function canonicalApplication(app) {
  return CANONICAL_APPLICATIONS[app] || app;
}

export function regionForCountry(iso) {
  return COUNTRY_TO_REGION[iso] || null;
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function envCode(template) {
  return template.environment && template.environment.code;
}

function hasPv(t) {
  return !!(t.generation && t.generation.pv && t.generation.pv.dcMWp > 0);
}

function hasBess(t) {
  return !!(t.bess && t.bess.enabled);
}

function scaleOf(t) {
  const peak = (t.loadProfile && t.loadProfile.peakLoadMW) || 0;
  const ac = (t.generation && t.generation.pv && t.generation.pv.acMW) || 0;
  return Math.max(peak, ac);
}

/**
 * 0–100 conceptual fit. No usa códigos de red.
 */
export function calculateRegionalFit(template, regionalProfile) {
  if (!template || !regionalProfile) return { score: 0, breakdown: {} };
  const app = canonicalApplication(template.application);
  const env = envCode(template);
  const grid = (template.grid && template.grid.mode) || "";
  const breakdown = {};

  breakdown.environment = regionalProfile.environments.includes(env) ? 22 : 6;
  if (["E11", "E12", "E07"].includes(env) && ["R01", "R02"].includes(regionalProfile.id)) {
    breakdown.environment = 2;
  }
  if (["E01", "E02"].includes(env) && ["R07", "R08"].includes(regionalProfile.id)) {
    breakdown.environment = 4;
  }

  breakdown.application = regionalProfile.suitableApplications.includes(app) ? 20 : 8;

  const modes = regionalProfile.preferredGridModes || [];
  breakdown.grid = modes.includes(grid) ? 12 : 6;
  if (grid === "off-grid" && ["R07"].includes(regionalProfile.id) && app === "bulk-power") {
    breakdown.grid = 2;
  }

  const scale = scaleOf(template);
  if (scale >= 200 && ["R05", "R07", "R02", "R06"].includes(regionalProfile.id)) {
    breakdown.scale = 12;
  } else if (scale < 1 && ["R01", "R03", "R06", "R08"].includes(regionalProfile.id)) {
    breakdown.scale = 12;
  } else {
    breakdown.scale = 8;
  }

  const loadId = APPLICATION_TO_LOAD[app];
  breakdown.load = loadId ? 10 : 6;

  const terrainOk = regionalProfile.commonTerrainConcepts.length > 0;
  breakdown.terrain = terrainOk && regionalProfile.environments.includes(env) ? 8 : 4;

  const weak = template.grid && (template.grid.strength === "weak" || grid === "off-grid" || grid === "islandable");
  breakdown.storage = hasBess(template) && weak ? 8 : hasBess(template) ? 5 : 3;

  breakdown.generation = hasPv(template) && regionalProfile.suitableApplications.includes("utility-generation")
    ? 8
    : hasPv(template)
      ? 6
      : 4;

  const score = clamp(
    Object.values(breakdown).reduce((a, b) => a + b, 0),
    0,
    100
  );
  return { score, breakdown };
}

export function bestRegionFor(template) {
  let best = null;
  for (const profile of Object.values(REGIONAL_PROFILES)) {
    const fit = calculateRegionalFit(template, profile);
    if (!best || fit.score > best.fit.score) {
      best = { profile, fit };
    }
  }
  return best;
}

/**
 * Deterministic country pick inside a region. Uses template id, not Math.random.
 */
export function assignCountry(template, regionId, occupancy) {
  const profile = REGIONAL_PROFILES[regionId];
  if (!profile) return template.country;
  const cap = occupancy && occupancy.cap ? occupancy.cap : Infinity;
  const ranked = [...profile.countries].sort((a, b) => {
    const ca = (occupancy && occupancy.counts[a]) || 0;
    const cb = (occupancy && occupancy.counts[b]) || 0;
    if (ca !== cb) return ca - cb;
    return a.localeCompare(b);
  });
  const underCap = ranked.filter((c) => ((occupancy && occupancy.counts[c]) || 0) < cap);
  const pool = underCap.length ? underCap : ranked;
  const key = template.id || template.archetype || "X";
  let h = 0;
  for (let i = 0; i < key.length; i += 1) h = (h * 33 + key.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

export function evaluateTerrainSuitability(template) {
  const warnings = [];
  const preferred = [];
  const avoid = [];
  const investigate = [];
  const env = template.environment || {};
  const pv = hasPv(template);
  const ais = template.substation && template.substation.type === "AIS";

  if (pv && (env.duneRisk === "high" || env.duneRisk === "extreme")) {
    warnings.push("PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.");
    avoid.push("mobile dunes");
    preferred.push("stable desert plateau / hamada");
  }
  if (pv && (env.floodRisk === "high" || env.floodRisk === "extreme")) {
    warnings.push("PV + flood exposure: drainage and elevation need site assessment.");
    avoid.push("high flood zone");
    avoid.push("sensitive wetland");
    investigate.push("drainage");
  }
  if (pv && env.vegetationConstraint === "high") {
    warnings.push("PV + vegetation/agriculture constraint: investigate land use.");
    investigate.push("agricultural impact");
    avoid.push("high-value agricultural soils");
  }
  if ((template.territorialRules || []).some((r) => /heritage/i.test(r))) {
    investigate.push("heritage");
    avoid.push("heritage cores");
  }
  if (ais && env.accessDifficulty === "low" && env.climate === "urban industrial") {
    warnings.push("Large AIS in a constrained urban setting: GIS or brownfield may be preferable.");
    preferred.push("industrial brownfield");
    investigate.push("land constraint");
  }
  if (env.accessDifficulty === "extreme" || env.accessDifficulty === "high") {
    warnings.push("Remote access: logistics and O&M need a site study.");
    investigate.push("access");
    preferred.push("existing grid or road corridor");
  }
  if (env.salinityRisk === "high" || env.salinityRisk === "extreme") {
    warnings.push("Corrosion protection requires detailed material selection.");
    investigate.push("salinity");
    if (["E03", "E06"].includes(env.code)) avoid.push("sabkha");
  }
  if (env.soilingRisk === "high" || env.soilingRisk === "extreme") {
    warnings.push("High soiling may increase O&M requirements.");
  }
  if (env.floodRisk === "extreme" || env.climate === "monsoon") {
    warnings.push("Drainage and flood elevation require site assessment.");
  }

  if (env.code === "E01" || env.code === "E02") preferred.push("stable desert plateau");
  if (env.code === "E08") preferred.push("industrial brownfield");
  if (env.code === "E08" || env.code === "E14") preferred.push("existing grid corridor");
  if (env.code === "E03") preferred.push("hamada above the oasis floor");

  const uniq = (arr) => [...new Set(arr)];
  return {
    warnings: uniq(warnings),
    siteSuitability: {
      preferred: uniq(preferred),
      avoid: uniq(avoid),
      investigate: uniq(investigate),
    },
  };
}

function architectureLabel(t) {
  const title = t.archetypeTitle || ARCHETYPES[t.archetype] || t.familyName;
  return title;
}

function applicationLabel(app) {
  return String(app).replace(/-/g, " ");
}

function regionalContextLabel(t) {
  const sub = t.subregion || ENV_TO_SUBREGION[envCode(t)] || "";
  const country = t.countryName || t.country;
  return `${sub} · ${country}`.replace(/^ · /, "");
}

function rebuildName(t) {
  return `${architectureLabel(t)} — ${applicationLabel(t.application)} — ${regionalContextLabel(t)}`;
}

function rebuildDescription(t) {
  const app = applicationLabel(t.application);
  const env = (t.environment && t.environment.climate) || "regional";
  const grid = t.grid && t.grid.mode;
  const bits = [
    `Conceptual ${architectureLabel(t).toLowerCase()} for a ${app} load in a ${env} setting.`,
  ];
  if (hasBess(t)) bits.push("Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate.");
  if (grid === "off-grid" || grid === "islandable" || (t.grid && t.grid.strength === "weak")) {
    bits.push(`Grid context is the scenario (${grid}${t.grid.strength ? `, strength ${t.grid.strength}` : ""}), not a national grid assessment.`);
  }
  bits.push("Parameters must be verified for local grid codes, site conditions and detailed engineering.");
  return bits.join(" ");
}

function specificAssumptions(t, regionId) {
  const out = [];
  if (hasPv(t)) out.push("Solar resource requires site-specific study; template yield is not a measured GHI.");
  if (t.substation && t.substation.enabled) {
    out.push("Grid voltage class is an archetype level and must be verified against the local utility.");
  }
  if (regionId === "R03" && envCode(t) === "E03") {
    out.push("Oasis-hamada siting principles (prefer hamada; avoid sabkha, dunes, heritage, palm groves) are conceptual, not a named-project copy.");
  }
  if (["R07", "R08"].includes(regionId)) {
    out.push("Humid/monsoon heuristics replace desert-default siting.");
  }
  if (t.grid && t.grid.strength === "weak") {
    out.push("Protection and grid-forming requirements need detailed study for this weak-grid scenario.");
  }
  return out;
}

function transientsForLoad(loadArch, existing) {
  const wanted = new Set(loadArch.transients || []);
  const keep = (existing || []).filter((ev) => wanted.has(ev.type) || ev.type === "transformer-energization");
  if (keep.length) return keep;
  return (existing || []).filter((ev) => wanted.size === 0 || wanted.has(ev.type));
}

function seasonalFor(t, loadArch) {
  const env = envCode(t);
  const app = canonicalApplication(t.application);
  if (app === "agriculture" || app === "water-pumping") {
    const peak = t.loadProfile.peakLoadMW;
    return {
      irrigationSeason: { peakLoadMW: round3(peak * 1.15), note: "irrigation / pumping" },
      mildSeason: { peakLoadMW: round3(peak * 0.7), note: "reduced pumping" },
    };
  }
  if (app === "urban-distribution" && ["E01", "E02", "E06", "E08"].includes(env)) {
    const peak = t.loadProfile.peakLoadMW;
    return {
      hotSeason: { peakLoadMW: round3(peak * 1.12), note: "cooling peak" },
      mildSeason: { peakLoadMW: round3(peak * 0.82), note: "base urban" },
    };
  }
  if (env === "E11" || (["R07", "R08"].includes(regionForCountry(t.country)) && ["agriculture", "urban-distribution", "utility-generation"].includes(app))) {
    if (env === "E11" || env === "E12" || env === "E10") {
      const peak = t.loadProfile.peakLoadMW;
      return {
        monsoonSeason: { peakLoadMW: round3(peak * 0.85), note: "cloud / flood access" },
        drySeason: { peakLoadMW: round3(peak * 1.06), note: "clearer resource, dust after dry spell" },
      };
    }
  }
  if (app === "tourism") {
    const peak = t.loadProfile.peakLoadMW;
    return {
      peakTourism: { peakLoadMW: round3(peak * 1.2), note: "occupancy" },
      offSeason: { peakLoadMW: round3(peak * 0.65), note: "resident base" },
    };
  }
  return t.seasonalProfiles;
}

function round3(n) {
  return Math.round(n * 1000) / 1000;
}

function fingerprint(t) {
  const pv = (t.generation && t.generation.pv && t.generation.pv.dcMWp) || 0;
  const bess = t.bess && t.bess.enabled ? `${t.bess.powerMW}-${t.bess.durationHours}` : "0";
  const peak = t.loadProfile && t.loadProfile.peakLoadMW;
  return [
    t.family,
    t.archetype,
    canonicalApplication(t.application),
    envCode(t),
    Math.round((peak || 0) * 2) / 2,
    Math.round(pv / 10) * 10,
    bess,
  ].join("|");
}

export function detectNearDuplicateTemplates(templates, options = {}) {
  const threshold = options.threshold ?? 1;
  const groups = new Map();
  for (const t of templates) {
    const fp = fingerprint(t);
    if (!groups.has(fp)) groups.set(fp, []);
    groups.get(fp).push(t.id);
  }
  const clones = [];
  for (const [fp, ids] of groups) {
    if (ids.length > threshold) clones.push({ fingerprint: fp, ids });
  }
  return clones;
}

export function diversityContribution(template, corpus) {
  const keys = [
    template.country,
    envCode(template),
    canonicalApplication(template.application),
    template.family,
    template.loadProfile && template.loadProfile.scaleBand,
    template.grid && template.grid.mode,
    hasBess(template) ? "bess" : "no-bess",
    hasPv(template) ? "pv" : "no-pv",
    template.substation && template.substation.primaryKV,
  ];
  let unique = 0;
  for (let i = 0; i < keys.length; i += 1) {
    const slice = keys.slice(0, i + 1).join("/");
    const others = corpus.filter((t) => {
      const k = [
        t.country,
        envCode(t),
        canonicalApplication(t.application),
        t.family,
        t.loadProfile && t.loadProfile.scaleBand,
        t.grid && t.grid.mode,
        hasBess(t) ? "bess" : "no-bess",
        hasPv(t) ? "pv" : "no-pv",
        t.substation && t.substation.primaryKV,
      ];
      return k.slice(0, i + 1).join("/") === slice;
    }).length;
    unique += others <= 2 ? 12 : others <= 6 ? 8 : 4;
  }
  return clamp(unique, 0, 100);
}

function voltageClass(kv) {
  if (kv == null) return "none";
  if (kv <= 1) return "lv";
  if (kv <= 36) return "mv";
  if (kv <= 150) return "hv";
  return "ehv";
}

function bessTag(t) {
  if (!hasBess(t)) return "no-bess";
  const h = t.bess.durationHours;
  if (h <= 1.5) return "bess-1h";
  if (h <= 3) return "bess-2h";
  if (h <= 5) return "bess-4h";
  return "bess-6h+";
}

function scaleTag(t) {
  const s = scaleOf(t);
  if (s < 1) return "small";
  if (s < 10) return "medium";
  if (s < 50) return "large";
  if (s < 200) return "utility";
  return "bulk-power";
}

/**
 * Enrich one stored template. Does not rewrite MW/kV/BESS energy.
 */
export function regionalizeTemplate(template, occupancy) {
  const t = structuredClone(template);
  const currentRegion = regionForCountry(t.country);
  const currentProfile = REGIONAL_PROFILES[currentRegion];
  const currentFit = calculateRegionalFit(t, currentProfile);
  const best = bestRegionFor(t);

  let regionId = currentRegion;
  let fit = currentFit;
  if (best && best.profile.id !== currentRegion && best.fit.score >= currentFit.score + 18) {
    regionId = best.profile.id;
    const iso = assignCountry(t, regionId, occupancy);
    t.country = iso;
    t.countryName = occupancy.names[iso] || iso;
    fit = calculateRegionalFit(t, REGIONAL_PROFILES[regionId]);
  }

  const profile = REGIONAL_PROFILES[regionId];
  t.regionId = regionId;
  t.region = profile.name;
  t.atlas = { title: ATLAS_TITLE, corridor: ATLAS_CORRIDOR, band: ATLAS_BAND };
  t.subregion = ENV_TO_SUBREGION[envCode(t)] || t.subregion;
  t.application = canonicalApplication(t.application);
  t.frequencyHz = null;
  t.frequencyProvenance = "conceptual-template";
  t.coordinates = null;

  const envelopeName = ENV_TO_ENVELOPE[envCode(t)];
  t.climateEnvelope = envelopeName || null;
  if (envelopeName && CLIMATE_ENVELOPES[envelopeName]) {
    t.environment = {
      ...CLIMATE_ENVELOPES[envelopeName],
      ...t.environment,
      envelope: envelopeName,
    };
  }

  const loadKey = APPLICATION_TO_LOAD[t.application];
  t.loadArchetype = loadKey || null;
  const loadArch = loadKey ? LOAD_ARCHETYPES[loadKey] : null;
  if (loadArch && t.loadProfile) {
    t.loadProfile.dominantLoadType = loadArch.dominant;
    t.loadProfile.transientEvents = transientsForLoad(loadArch, t.loadProfile.transientEvents);
    const seasonal = seasonalFor(t, loadArch);
    t.seasonalProfiles = seasonal;
    if (seasonal && (seasonal.irrigationSeason || seasonal.monsoonSeason || seasonal.hotSeason)) {
      t.loadProfile.seasonalVariationPercent = Math.max(t.loadProfile.seasonalVariationPercent || 0, 28);
    }
  }

  if (t.generation && t.generation.pv) {
    t.generation.pv.specificYieldKWhPerKWpYear = null;
    t.generation.pv.capacityFactor = null;
    t.generation.pv.lossesPercent = null;
    t.generation.pv.resourceProvenance = "future-site-study";
  }

  const terrain = evaluateTerrainSuitability(t);
  t.siteSuitability = terrain.siteSuitability;
  const regionalWarnings = [
    ...(profile.defaultWarnings || []),
    ...terrain.warnings,
  ];
  if (t.grid && t.grid.strength === "weak") {
    regionalWarnings.push("Protection and grid-forming requirements need detailed study.");
  }
  t.warnings = [...new Set([...(t.warnings || []).filter((w) => !/utility PV on sensitive/.test(w)), ...regionalWarnings])];

  t.assumptions = [...COMMON_ASSUMPTIONS, ...specificAssumptions(t, regionId)];
  t.name = rebuildName(t);
  t.description = rebuildDescription(t);
  t.tags = [
    String(t.countryName || t.country).toLowerCase().replace(/\s+/g, "-"),
    profile.id.toLowerCase(),
    profile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    t.environment.envelope || envCode(t),
    t.application,
    t.familyName.toLowerCase().replace(/\s+/g, "-"),
    t.grid.mode,
    voltageClass(t.substation && t.substation.primaryKV),
    bessTag(t),
    scaleTag(t),
  ];

  t.informationLayers = {
    electrical: "source-derived-from-prompt-4-dataset",
    territorial: "conceptual-assumption",
    assumptions: "conceptual-assumption",
    verified: null,
  };

  t.regionalization = {
    profileId: regionId,
    regionalFitScore: fit.score,
    environmentFitScore: fit.breakdown.environment,
    applicationFitScore: fit.breakdown.application,
    assumptionsCount: t.assumptions.length,
    warningsCount: t.warnings.length,
    fitBreakdown: fit.breakdown,
  };

  return t;
}

export function regionalizeAll(templates, countryNames) {
  const occupancy = { counts: {}, cap: Math.floor(templates.length * 0.15), names: countryNames || {} };
  for (const t of templates) {
    occupancy.counts[t.country] = (occupancy.counts[t.country] || 0) + 1;
  }
  const out = templates.map((t) => {
    const enriched = regionalizeTemplate(t, occupancy);
    occupancy.counts[t.country] = (occupancy.counts[t.country] || 0) - 1;
    occupancy.counts[enriched.country] = (occupancy.counts[enriched.country] || 0) + 1;
    return enriched;
  });
  for (const t of out) {
    t.diversityContribution = diversityContribution(t, out);
  }
  return out;
}

export { ATLAS_TITLE, ATLAS_CORRIDOR, ATLAS_BAND };
