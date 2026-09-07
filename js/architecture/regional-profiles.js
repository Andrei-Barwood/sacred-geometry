/**
 * Heurísticas conceptuales del corredor Mauritania–Tailandia.
 * No son normativa ni inventario nacional.
 */

export const ATLAS_TITLE = "Regional Electrical Architecture Atlas";
export const ATLAS_CORRIDOR = "Corridor Mauritania–Thailand";
export const ATLAS_BAND = "North Africa · Middle East · South Asia";

export const REGION_IDS = Object.freeze([
  "R01", "R02", "R03", "R04", "R05", "R06", "R07", "R08",
]);

export const COUNTRY_TO_REGION = Object.freeze({
  MRT: "R01", MAR: "R01",
  DZA: "R02", TUN: "R02", LBY: "R02",
  EGY: "R03", SDN: "R03",
  JOR: "R04", LBN: "R04", SYR: "R04", IRQ: "R04",
  SAU: "R05", YEM: "R05", OMN: "R05", ARE: "R05", QAT: "R05", BHR: "R05", KWT: "R05",
  IRN: "R06", AFG: "R06", PAK: "R06",
  IND: "R07", BGD: "R07", LKA: "R07",
  MMR: "R08", THA: "R08",
});

export const CLIMATE_ENVELOPES = Object.freeze({
  "hyper-arid": {
    dustLevel: "extreme", soilingRisk: "high", humidityRisk: "low",
    corrosionRisk: "medium", floodRisk: "low", extremeHeatRisk: "high",
    duneRisk: "high", waterAvailability: "low",
  },
  "hot-arid": {
    dustLevel: "high", soilingRisk: "high", humidityRisk: "low",
    corrosionRisk: "low", floodRisk: "low", extremeHeatRisk: "high",
    duneRisk: "medium", waterAvailability: "low",
  },
  "semi-arid": {
    dustLevel: "medium", soilingRisk: "medium", humidityRisk: "low",
    corrosionRisk: "low", floodRisk: "low", extremeHeatRisk: "medium",
    duneRisk: "low", waterAvailability: "medium",
  },
  oasis: {
    dustLevel: "high", soilingRisk: "high", humidityRisk: "medium",
    corrosionRisk: "high", floodRisk: "medium", extremeHeatRisk: "high",
    duneRisk: "medium", waterAvailability: "medium",
  },
  "coastal-saline": {
    dustLevel: "medium", soilingRisk: "high", humidityRisk: "high",
    corrosionRisk: "extreme", floodRisk: "medium", extremeHeatRisk: "high",
    duneRisk: "low", waterAvailability: "medium",
  },
  "hot-humid-coastal": {
    dustLevel: "low", soilingRisk: "medium", humidityRisk: "extreme",
    corrosionRisk: "high", floodRisk: "high", extremeHeatRisk: "medium",
    duneRisk: "low", waterAvailability: "high",
  },
  mountain: {
    dustLevel: "low", soilingRisk: "low", humidityRisk: "medium",
    corrosionRisk: "medium", floodRisk: "medium", extremeHeatRisk: "low",
    duneRisk: "low", waterAvailability: "medium",
  },
  "high-plateau": {
    dustLevel: "medium", soilingRisk: "medium", humidityRisk: "low",
    corrosionRisk: "low", floodRisk: "low", extremeHeatRisk: "medium",
    duneRisk: "low", waterAvailability: "medium",
  },
  "river-valley": {
    dustLevel: "low", soilingRisk: "medium", humidityRisk: "high",
    corrosionRisk: "medium", floodRisk: "high", extremeHeatRisk: "medium",
    duneRisk: "low", waterAvailability: "high",
  },
  "urban-industrial": {
    dustLevel: "medium", soilingRisk: "medium", humidityRisk: "medium",
    corrosionRisk: "medium", floodRisk: "medium", extremeHeatRisk: "medium",
    duneRisk: "low", waterAvailability: "high",
  },
  monsoon: {
    dustLevel: "medium", soilingRisk: "high", humidityRisk: "high",
    corrosionRisk: "high", floodRisk: "extreme", extremeHeatRisk: "medium",
    duneRisk: "low", waterAvailability: "high",
  },
  "tropical-humid": {
    dustLevel: "low", soilingRisk: "medium", humidityRisk: "extreme",
    corrosionRisk: "high", floodRisk: "high", extremeHeatRisk: "medium",
    duneRisk: "low", waterAvailability: "high",
  },
  agricultural: {
    dustLevel: "medium", soilingRisk: "medium", humidityRisk: "medium",
    corrosionRisk: "medium", floodRisk: "medium", extremeHeatRisk: "medium",
    duneRisk: "low", waterAvailability: "medium",
  },
  "remote-corridor": {
    dustLevel: "high", soilingRisk: "high", humidityRisk: "low",
    corrosionRisk: "medium", floodRisk: "low", extremeHeatRisk: "high",
    duneRisk: "medium", waterAvailability: "low",
  },
});

export const ENV_TO_ENVELOPE = Object.freeze({
  E01: "hyper-arid",
  E02: "hot-arid",
  E03: "oasis",
  E04: "high-plateau",
  E05: "mountain",
  E06: "coastal-saline",
  E07: "hot-humid-coastal",
  E08: "urban-industrial",
  E09: "agricultural",
  E10: "river-valley",
  E11: "monsoon",
  E12: "tropical-humid",
  E13: "remote-corridor",
  E14: "remote-corridor",
});

export const ENV_TO_SUBREGION = Object.freeze({
  E01: "interior desert",
  E02: "interior desert",
  E03: "oasis",
  E04: "high plateau",
  E05: "mountain region",
  E06: "coastal zone",
  E07: "coastal zone",
  E08: "urban perimeter",
  E09: "agricultural interior",
  E10: "river valley",
  E11: "agricultural interior",
  E12: "agricultural interior",
  E13: "industrial corridor",
  E14: "remote settlement",
});

export const CANONICAL_APPLICATIONS = Object.freeze({
  "utility-export": "utility-generation",
  collector: "renewable-collector",
  industrial: "industrial",
  mining: "mining",
  agriculture: "agriculture",
  irrigation: "agriculture",
  desalination: "desalination",
  "water-pumping": "water-pumping",
  settlement: "remote-settlement",
  telecom: "telecommunications",
  hospital: "critical-infrastructure",
  port: "port",
  airport: "airport",
  logistics: "logistics",
  "urban-distribution": "urban-distribution",
  "bulk-transfer": "bulk-power",
  tourism: "tourism",
  oasis: "water-pumping",
});

export const REGIONAL_PROFILES = Object.freeze({
  R01: {
    id: "R01",
    name: "Atlantic Sahara",
    countries: ["MRT", "MAR"],
    environments: ["E01", "E02", "E06", "E13", "E14"],
    commonTerrainConcepts: ["hamada", "reg", "coastal transition", "remote track"],
    climateTraits: ["hyper-arid to hot-arid", "high dust", "water scarcity"],
    operationalChallenges: ["soiling", "heat derating", "remote access", "water for cleaning"],
    suitableApplications: [
      "utility-generation", "mining", "water-pumping", "remote-settlement",
      "renewable-collector", "desalination",
    ],
    siteConstraints: ["mobile dunes", "water scarcity", "long logistics"],
    seasonalCharacteristics: ["limited rainfall seasonality", "heat-driven cooling if urban"],
    defaultWarnings: ["High soiling may increase O&M requirements."],
    preferredGridModes: ["weak-grid", "off-grid", "grid-connected", "islandable"],
  },
  R02: {
    id: "R02",
    name: "Maghreb",
    countries: ["DZA", "TUN", "LBY"],
    environments: ["E01", "E02", "E04", "E05", "E06", "E08", "E09"],
    commonTerrainConcepts: ["sahara fringe", "atlas highland", "coast", "urban fringe"],
    climateTraits: ["arid interior", "semi-arid plateau", "mediterranean coast"],
    operationalChallenges: ["dust inland", "coastal corrosion", "terrain access in highlands"],
    suitableApplications: [
      "utility-generation", "renewable-collector", "urban-distribution",
      "agriculture", "industrial", "bulk-power", "port",
    ],
    siteConstraints: ["agricultural soils near coast", "highland access"],
    seasonalCharacteristics: ["mild/hot season contrast on the coast"],
    defaultWarnings: [],
    preferredGridModes: ["grid-connected", "weak-grid"],
  },
  R03: {
    id: "R03",
    name: "Nile / Northeast Africa",
    countries: ["EGY", "SDN"],
    environments: ["E01", "E02", "E03", "E09", "E10", "E14"],
    commonTerrainConcepts: ["hamada", "oasis floor", "nile alluvium", "desert interior"],
    climateTraits: ["hot-arid", "oasis humidity pockets", "river-valley flood"],
    operationalChallenges: ["sabkha/salinity in oases", "dunes", "weak remote feeders", "heritage and agriculture setbacks"],
    suitableApplications: [
      "utility-generation", "water-pumping", "agriculture", "remote-settlement",
      "tourism", "renewable-collector", "urban-distribution", "desalination",
    ],
    siteConstraints: ["sabkha", "palm groves", "heritage cores", "mobile dunes"],
    seasonalCharacteristics: ["irrigation season", "heat"],
    defaultWarnings: ["Oasis siting: prefer stable hamada; investigate salinity and heritage."],
    preferredGridModes: ["islandable", "weak-grid", "off-grid", "grid-connected"],
  },
  R04: {
    id: "R04",
    name: "Levant / Mesopotamia",
    countries: ["JOR", "LBN", "SYR", "IRQ"],
    environments: ["E04", "E05", "E08", "E09", "E10", "E14"],
    commonTerrainConcepts: ["plateau", "highland", "river valley", "urban industrial"],
    climateTraits: ["semi-arid", "highland cooler", "alluvial heat"],
    operationalChallenges: ["weak-grid pockets", "urban land", "irrigation diversity"],
    suitableApplications: [
      "urban-distribution", "industrial", "agriculture", "water-pumping",
      "critical-infrastructure", "remote-settlement", "logistics",
    ],
    siteConstraints: ["urban density", "alluvial flooding", "highland access"],
    seasonalCharacteristics: ["cooling peak in cities", "irrigation season"],
    defaultWarnings: [],
    preferredGridModes: ["grid-connected", "weak-grid", "islandable"],
  },
  R05: {
    id: "R05",
    name: "Arabian Peninsula",
    countries: ["SAU", "YEM", "OMN", "ARE", "QAT", "BHR", "KWT"],
    environments: ["E01", "E02", "E03", "E06", "E07", "E08", "E14"],
    commonTerrainConcepts: ["interior desert", "oasis transition", "gulf coast", "urban industrial"],
    climateTraits: ["extreme heat inland", "coastal humidity/salinity", "dust"],
    operationalChallenges: ["heat", "soiling", "corrosion on coast", "water process loads"],
    suitableApplications: [
      "utility-generation", "desalination", "port", "airport", "industrial",
      "renewable-collector", "urban-distribution", "water-pumping",
      "critical-infrastructure", "logistics", "remote-settlement",
    ],
    siteConstraints: ["sabkha on coasts", "extreme heat derating", "urban land"],
    seasonalCharacteristics: ["hotSeason cooling", "limited rainfall"],
    defaultWarnings: ["Extreme heat and dust require equipment derating studies."],
    preferredGridModes: ["grid-connected", "islandable", "off-grid", "weak-grid"],
  },
  R06: {
    id: "R06",
    name: "Iranian Plateau / Central Corridor",
    countries: ["IRN", "AFG", "PAK"],
    environments: ["E02", "E04", "E05", "E08", "E09", "E13", "E14"],
    commonTerrainConcepts: ["high plateau", "mountain", "arid belt", "industrial corridor"],
    climateTraits: ["altitude", "temperature swing", "arid to monsoon-fringe in the east"],
    operationalChallenges: ["terrain access", "altitude derating", "remote infrastructure", "weak-grid interiors"],
    suitableApplications: [
      "mining", "industrial", "renewable-collector", "utility-generation",
      "remote-settlement", "agriculture", "urban-distribution", "bulk-power",
    ],
    siteConstraints: ["steep slopes", "access roads", "dust from extraction"],
    seasonalCharacteristics: ["hot/mild contrast", "irrigation in valleys"],
    defaultWarnings: ["Access and altitude may govern constructability more than resource."],
    preferredGridModes: ["grid-connected", "weak-grid", "off-grid", "islandable"],
  },
  R07: {
    id: "R07",
    name: "South Asia",
    countries: ["IND", "BGD", "LKA"],
    environments: ["E07", "E08", "E09", "E10", "E11", "E12"],
    commonTerrainConcepts: ["alluvial plain", "delta", "humid coast", "agricultural interior"],
    climateTraits: ["monsoon", "humidity", "flood", "heat with moisture"],
    operationalChallenges: ["flood elevation", "agricultural land", "dense load", "vegetation clearance"],
    suitableApplications: [
      "urban-distribution", "industrial", "agriculture", "water-pumping",
      "utility-generation", "critical-infrastructure", "renewable-collector",
      "bulk-power", "port",
    ],
    siteConstraints: ["floodplain", "high-value farmland", "drainage"],
    seasonalCharacteristics: ["monsoonSeason", "irrigationSeason", "dry-season soiling"],
    defaultWarnings: ["Drainage and flood elevation require site assessment."],
    preferredGridModes: ["grid-connected", "weak-grid", "islandable"],
  },
  R08: {
    id: "R08",
    name: "Southeast Transition",
    countries: ["MMR", "THA"],
    environments: ["E07", "E08", "E09", "E11", "E12"],
    commonTerrainConcepts: ["humid lowland", "agricultural basin", "urban industrial", "coast"],
    climateTraits: ["hot-humid", "monsoon", "flood", "vegetation"],
    operationalChallenges: ["humidity/corrosion", "flood access", "vegetation", "rural feeders"],
    suitableApplications: [
      "agriculture", "urban-distribution", "industrial", "water-pumping",
      "port", "critical-infrastructure", "remote-settlement", "utility-generation",
    ],
    siteConstraints: ["wetlands", "flood zone", "farmland"],
    seasonalCharacteristics: ["monsoonSeason", "irrigationSeason"],
    defaultWarnings: ["Humid/monsoon conditions dominate siting over desert heuristics."],
    preferredGridModes: ["grid-connected", "weak-grid", "off-grid", "islandable"],
  },
});
