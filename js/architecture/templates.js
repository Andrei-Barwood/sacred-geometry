/**
 * Arquitectura Sagrada — stored conceptual templates.
 * Electrical architecture from Prompt 4; regionalization from Prompt 5.
 * Do not randomize at runtime.
 */

export const architectureTemplates = Object.freeze([
  {
    "id": "G-MRT-G03-001",
    "name": "Utility bifacial PV tracker — utility generation — interior desert · Mauritania",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G03",
    "archetypeTitle": "Utility bifacial PV tracker",
    "country": "MRT",
    "countryName": "Mauritania",
    "region": "Atlantic Sahara",
    "subregion": "interior desert",
    "application": "utility-generation",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility bifacial pv tracker for a utility generation load in a hyper-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "extreme",
      "duneRisk": "high",
      "waterAvailability": "low",
      "code": "E01",
      "climate": "hyper-arid desert",
      "terrain": "reg / hamada",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "hyper-arid"
    },
    "territorialRules": [
      "avoid mobile dunes",
      "prefer hamada over erg",
      "dry cleaning for soiling",
      "extreme heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.144,
      "averageLoadMW": 1.456,
      "peakLoadMW": 5.2,
      "loadFactor": 0.28,
      "criticalLoadMW": 0.624,
      "cyclicLoadMW": 0.208,
      "motorLoadMW": 0.936,
      "thermalLoadMW": 0.208,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.312,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 1.04,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 120,
        "acMW": 95,
        "mounting": "single-axis",
        "bifacial": true,
        "dcAcRatio": 1.263,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 80,
      "transformerTotalMVA": 160,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 47.5,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 47.5,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "mobile dune risk — siting constraint",
      "High soiling may increase O&M requirements.",
      "PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.",
      "Remote access: logistics and O&M need a site study."
    ],
    "tags": [
      "mauritania",
      "r01",
      "atlantic-sahara",
      "hyper-arid",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 95,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hyper-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau / hamada",
        "existing grid or road corridor",
        "stable desert plateau"
      ],
      "avoid": [
        "mobile dunes"
      ],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "G-MRT-G01-001",
    "name": "Utility PV fixed tilt — utility generation — interior desert · Mauritania",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G01",
    "archetypeTitle": "Utility PV fixed tilt",
    "country": "MRT",
    "countryName": "Mauritania",
    "region": "Atlantic Sahara",
    "subregion": "interior desert",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility pv fixed tilt for a utility generation load in a hot-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.682,
      "averageLoadMW": 0.868,
      "peakLoadMW": 3.1,
      "loadFactor": 0.28,
      "criticalLoadMW": 0.372,
      "cyclicLoadMW": 0.124,
      "motorLoadMW": 0.558,
      "thermalLoadMW": 0.124,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.186,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 0.62,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 72,
        "acMW": 60,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 30,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 30,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "mauritania",
      "r01",
      "atlantic-sahara",
      "hot-arid",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-MRT-G14-001",
    "name": "Solar mining / extraction infrastructure — mining — industrial corridor · Mauritania",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G14",
    "archetypeTitle": "Solar mining / extraction infrastructure",
    "country": "MRT",
    "countryName": "Mauritania",
    "region": "Atlantic Sahara",
    "subregion": "industrial corridor",
    "application": "mining",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar mining / extraction infrastructure for a mining load in a mining / extraction zone setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E13",
      "climate": "mining / extraction zone",
      "terrain": "extractive plateau",
      "salinityRisk": "medium",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "dust from extraction",
      "heavy-vehicle access",
      "avoid unconsolidated spoil"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 14,
      "averageLoadMW": 20.16,
      "peakLoadMW": 28,
      "loadFactor": 0.72,
      "criticalLoadMW": 7,
      "cyclicLoadMW": 2.8,
      "motorLoadMW": 11.2,
      "thermalLoadMW": 1.68,
      "interruptibleLoadMW": 2.24,
      "standbyLoadMW": 0.84,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor-industrial",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "conveyor start",
          "type": "conveyor-start",
          "runningMW": 11.2,
          "startingMultiple": 5,
          "durationSeconds": 5
        },
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 11.2,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 55,
        "acMW": 45,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.222,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 12,
        "role": "process backup"
      }
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 31.5,
      "transformerTotalMVA": 63,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 22.5,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 22.5,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "extreme dust / soiling",
      "weak-grid context",
      "High soiling may increase O&M requirements.",
      "Remote access: logistics and O&M need a site study.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "mauritania",
      "r01",
      "atlantic-sahara",
      "remote-corridor",
      "mining",
      "generation",
      "weak-grid",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 92,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_MINING",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-MAR-G02-001",
    "name": "Utility PV single-axis tracker — utility generation — high plateau · Tunisia",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G02",
    "archetypeTitle": "Utility PV single-axis tracker",
    "country": "TUN",
    "countryName": "Tunisia",
    "region": "Maghreb",
    "subregion": "high plateau",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility pv single-axis tracker for a utility generation load in a semi-arid plateau setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E04",
      "climate": "semi-arid plateau",
      "terrain": "plateau",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "high-plateau"
    },
    "territorialRules": [
      "setback from seasonal wadis",
      "dust and heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.408,
      "averageLoadMW": 1.792,
      "peakLoadMW": 6.4,
      "loadFactor": 0.28,
      "criticalLoadMW": 0.768,
      "cyclicLoadMW": 0.256,
      "motorLoadMW": 1.152,
      "thermalLoadMW": 0.256,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.384,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 1.28,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 100,
        "acMW": 82,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.22,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 63,
      "transformerTotalMVA": 126,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 41,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 41,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [],
    "tags": [
      "tunisia",
      "r02",
      "maghreb",
      "high-plateau",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "high-plateau",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 0,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-MAR-G09-001",
    "name": "PV + wind + BESS — utility generation — high plateau · Libya",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G09",
    "archetypeTitle": "PV + wind + BESS",
    "country": "LBY",
    "countryName": "Libya",
    "region": "Maghreb",
    "subregion": "high plateau",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + wind + bess for a utility generation load in a semi-arid plateau setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E04",
      "climate": "semi-arid plateau",
      "terrain": "plateau",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "high-plateau"
    },
    "territorialRules": [
      "setback from seasonal wadis",
      "dust and heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.65,
      "averageLoadMW": 2.1,
      "peakLoadMW": 7.5,
      "loadFactor": 0.28,
      "criticalLoadMW": 0.9,
      "cyclicLoadMW": 0.3,
      "motorLoadMW": 1.35,
      "thermalLoadMW": 0.3,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.45,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 1.5,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "wind"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 70,
        "acMW": 58,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.207,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": {
        "ratedMW": 40,
        "capacityFactor": 0.34
      },
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 30,
      "energyMWh": 90,
      "durationHours": 3,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "renewable-integration",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 80,
      "transformerTotalMVA": 160,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 29,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 29,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [],
    "tags": [
      "libya",
      "r02",
      "maghreb",
      "high-plateau",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "bess-2h",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "high-plateau",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 0,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-DZA-G01-001",
    "name": "Utility PV fixed tilt — utility generation — interior desert · Algeria",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G01",
    "archetypeTitle": "Utility PV fixed tilt",
    "country": "DZA",
    "countryName": "Algeria",
    "region": "Maghreb",
    "subregion": "interior desert",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility pv fixed tilt for a utility generation load in a hyper-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "extreme",
      "duneRisk": "high",
      "waterAvailability": "low",
      "code": "E01",
      "climate": "hyper-arid desert",
      "terrain": "reg / hamada",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "hyper-arid"
    },
    "territorialRules": [
      "avoid mobile dunes",
      "prefer hamada over erg",
      "dry cleaning for soiling",
      "extreme heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.98,
      "averageLoadMW": 2.52,
      "peakLoadMW": 9,
      "loadFactor": 0.28,
      "criticalLoadMW": 1.08,
      "cyclicLoadMW": 0.36,
      "motorLoadMW": 1.62,
      "thermalLoadMW": 0.36,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.54,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "200–500 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 1.8,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 240,
        "acMW": 200,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 160,
      "transformerTotalMVA": 320,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 100,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 100,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "mobile dune risk — siting constraint",
      "PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "algeria",
      "r02",
      "maghreb",
      "hyper-arid",
      "utility-generation",
      "generation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 92,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hyper-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau / hamada",
        "existing grid or road corridor",
        "stable desert plateau"
      ],
      "avoid": [
        "mobile dunes"
      ],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 95,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-DZA-G16-001",
    "name": "Renewable collector plant feeding HV/MV substation — renewable collector — interior desert · Algeria",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G16",
    "archetypeTitle": "Renewable collector plant feeding HV/MV substation",
    "country": "DZA",
    "countryName": "Algeria",
    "region": "Maghreb",
    "subregion": "interior desert",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual renewable collector plant feeding hv/mv substation for a renewable collector load in a hyper-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "extreme",
      "duneRisk": "high",
      "waterAvailability": "low",
      "code": "E01",
      "climate": "hyper-arid desert",
      "terrain": "reg / hamada",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "hyper-arid"
    },
    "territorialRules": [
      "avoid mobile dunes",
      "prefer hamada over erg",
      "dry cleaning for soiling",
      "extreme heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 2.2,
      "averageLoadMW": 3.3,
      "peakLoadMW": 11,
      "loadFactor": 0.3,
      "criticalLoadMW": 1.1,
      "cyclicLoadMW": 0.55,
      "motorLoadMW": 2.2,
      "thermalLoadMW": 0.44,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.55,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "200–500 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 2.2,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 310,
        "acMW": 250,
        "mounting": "single-axis",
        "bifacial": true,
        "dcAcRatio": 1.24,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 66,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 180,
      "transformerTotalMVA": 360,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 66,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 125,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 66,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 125,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "mobile dune risk — siting constraint",
      "PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "algeria",
      "r02",
      "maghreb",
      "hyper-arid",
      "renewable-collector",
      "generation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 92,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hyper-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau / hamada",
        "existing grid or road corridor",
        "stable desert plateau"
      ],
      "avoid": [
        "mobile dunes"
      ],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 95,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-TUN-G15-001",
    "name": "Solar agricultural pumping hub — agriculture — agricultural interior · Tunisia",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G15",
    "archetypeTitle": "Solar agricultural pumping hub",
    "country": "TUN",
    "countryName": "Tunisia",
    "region": "Maghreb",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar agricultural pumping hub for a agriculture load in a agricultural interior setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.02,
      "averageLoadMW": 2.38,
      "peakLoadMW": 6.8,
      "loadFactor": 0.35,
      "criticalLoadMW": 0.408,
      "cyclicLoadMW": 3.06,
      "motorLoadMW": 3.4,
      "thermalLoadMW": 0.272,
      "interruptibleLoadMW": 2.04,
      "standbyLoadMW": 0.136,
      "seasonalVariationPercent": 65,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 3.4,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 7.82,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 4.76,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 14,
        "acMW": 11,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.273,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 5.5,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 5.5,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "high seasonal variation",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "tunisia",
      "r02",
      "maghreb",
      "agricultural",
      "agriculture",
      "generation",
      "grid-connected",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 94,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high-value agricultural soils"
      ],
      "investigate": [
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-LBY-G10-001",
    "name": "PV + diesel backup — remote settlement — interior desert · Libya",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G10",
    "archetypeTitle": "PV + diesel backup",
    "country": "LBY",
    "countryName": "Libya",
    "region": "Maghreb",
    "subregion": "interior desert",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + diesel backup for a remote settlement load in a hot-arid desert setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.176,
      "averageLoadMW": 1.764,
      "peakLoadMW": 4.2,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.756,
      "cyclicLoadMW": 0.756,
      "motorLoadMW": 0.504,
      "thermalLoadMW": 0.924,
      "interruptibleLoadMW": 0.336,
      "standbyLoadMW": 0.252,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.63,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 12,
        "acMW": 10,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 5,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 1,
      "transformerMVA": 16,
      "transformerTotalMVA": 16,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "libya",
      "r02",
      "maghreb",
      "hot-arid",
      "remote-settlement",
      "generation",
      "weak-grid",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 79,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-EGY-G06-001",
    "name": "PV + BESS 4 h — water pumping — oasis · Egypt",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G06",
    "archetypeTitle": "PV + BESS 4 h",
    "country": "EGY",
    "countryName": "Egypt",
    "region": "Nile / Northeast Africa",
    "subregion": "oasis",
    "application": "water-pumping",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + bess 4 h for a water pumping load in a oasis / hamada setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "medium",
      "corrosionRisk": "high",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "medium",
      "code": "E03",
      "climate": "oasis / hamada",
      "terrain": "escarpment and oasis floor",
      "salinityRisk": "high",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "oasis"
    },
    "territorialRules": [
      "avoid sabkha and oasis floor",
      "avoid heritage cores and palm groves",
      "prefer plateau/hamada above the oasis",
      "saline dew: dry cleaning"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 4.2,
      "averageLoadMW": 6.3,
      "peakLoadMW": 14,
      "loadFactor": 0.45,
      "criticalLoadMW": 2.8,
      "cyclicLoadMW": 2.8,
      "motorLoadMW": 3.08,
      "thermalLoadMW": 1.96,
      "interruptibleLoadMW": 1.4,
      "standbyLoadMW": 0.7,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 3.08,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        },
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 2.8,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 16.1,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 9.8,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 28,
        "acMW": 22,
        "mounting": "single-axis",
        "bifacial": true,
        "dcAcRatio": 1.273,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 8,
        "role": "black-start / backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 18,
      "energyMWh": 72,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "grid-forming",
        "backup",
        "solar-firming"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 25,
      "transformerTotalMVA": 50,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 11,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 11,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Oasis-hamada siting principles (prefer hamada; avoid sabkha, dunes, heritage, palm groves) are conceptual, not a named-project copy.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "egypt",
      "r03",
      "nile-northeast-africa",
      "oasis",
      "water-pumping",
      "generation",
      "islandable",
      "mv",
      "bess-4h",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "oasis",
    "loadArchetype": "LOAD_WATER_PUMPING",
    "siteSuitability": {
      "preferred": [
        "hamada above the oasis floor"
      ],
      "avoid": [
        "high-value agricultural soils",
        "heritage cores",
        "sabkha"
      ],
      "investigate": [
        "agricultural impact",
        "heritage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 9,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "G-EGY-G02-001",
    "name": "Utility PV single-axis tracker — utility generation — interior desert · Egypt",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G02",
    "archetypeTitle": "Utility PV single-axis tracker",
    "country": "EGY",
    "countryName": "Egypt",
    "region": "Nile / Northeast Africa",
    "subregion": "interior desert",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility pv single-axis tracker for a utility generation load in a hot-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.87,
      "averageLoadMW": 2.38,
      "peakLoadMW": 8.5,
      "loadFactor": 0.28,
      "criticalLoadMW": 1.02,
      "cyclicLoadMW": 0.34,
      "motorLoadMW": 1.53,
      "thermalLoadMW": 0.34,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.51,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 1.7,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 160,
        "acMW": 130,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 125,
      "transformerTotalMVA": 250,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 65,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 65,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "egypt",
      "r03",
      "nile-northeast-africa",
      "hot-arid",
      "utility-generation",
      "generation",
      "grid-connected",
      "ehv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-SDN-G15-001",
    "name": "Solar agricultural pumping hub — agriculture — agricultural interior · Sudan",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G15",
    "archetypeTitle": "Solar agricultural pumping hub",
    "country": "SDN",
    "countryName": "Sudan",
    "region": "Nile / Northeast Africa",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar agricultural pumping hub for a agriculture load in a agricultural interior setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.65,
      "averageLoadMW": 3.85,
      "peakLoadMW": 11,
      "loadFactor": 0.35,
      "criticalLoadMW": 0.66,
      "cyclicLoadMW": 4.95,
      "motorLoadMW": 5.5,
      "thermalLoadMW": 0.44,
      "interruptibleLoadMW": 3.3,
      "standbyLoadMW": 0.22,
      "seasonalVariationPercent": 65,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 5.5,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 12.65,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 7.7,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 22,
        "acMW": 18,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.222,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 20,
      "transformerTotalMVA": 40,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 9,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 9,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "high seasonal variation",
      "weak-grid context",
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "sudan",
      "r03",
      "nile-northeast-africa",
      "agricultural",
      "agriculture",
      "generation",
      "weak-grid",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 91,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high-value agricultural soils"
      ],
      "investigate": [
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "G-JOR-G05-001",
    "name": "PV + BESS 2 h — industrial — interior desert · Algeria",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G05",
    "archetypeTitle": "PV + BESS 2 h",
    "country": "DZA",
    "countryName": "Algeria",
    "region": "Maghreb",
    "subregion": "interior desert",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + bess 2 h for a industrial load in a hot-arid desert setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 8.64,
      "averageLoadMW": 12.6,
      "peakLoadMW": 18,
      "loadFactor": 0.7,
      "criticalLoadMW": 3.96,
      "cyclicLoadMW": 2.52,
      "motorLoadMW": 5.04,
      "thermalLoadMW": 2.16,
      "interruptibleLoadMW": 1.8,
      "standbyLoadMW": 0.72,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 5.04,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 42,
        "acMW": 34,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.235,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 20,
      "energyMWh": 40,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "peak-shaving",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 17,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 17,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "algeria",
      "r02",
      "maghreb",
      "hot-arid",
      "industrial",
      "generation",
      "grid-connected",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-IRQ-G13-001",
    "name": "Solar industrial self-generation — industrial — river valley · Iraq",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G13",
    "archetypeTitle": "Solar industrial self-generation",
    "country": "IRQ",
    "countryName": "Iraq",
    "region": "Levant / Mesopotamia",
    "subregion": "river valley",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar industrial self-generation for a industrial load in a river valley setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "high",
      "corrosionRisk": "medium",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E10",
      "climate": "river valley",
      "terrain": "alluvial valley",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "river-valley"
    },
    "territorialRules": [
      "floodplain setback",
      "alluvial grounding conditions"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 10.56,
      "averageLoadMW": 15.4,
      "peakLoadMW": 22,
      "loadFactor": 0.7,
      "criticalLoadMW": 4.84,
      "cyclicLoadMW": 3.08,
      "motorLoadMW": 6.16,
      "thermalLoadMW": 2.64,
      "interruptibleLoadMW": 2.2,
      "standbyLoadMW": 0.88,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "process start",
          "type": "process-start",
          "runningMW": 4.4,
          "startingMultiple": 4,
          "durationSeconds": 8
        },
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 6.16,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 36,
        "acMW": 30,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 15,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 15,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "iraq",
      "r04",
      "levant-mesopotamia",
      "river-valley",
      "industrial",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "river-valley",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 89,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 6
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-SAU-G16-001",
    "name": "Renewable collector plant feeding HV/MV substation — renewable collector — interior desert · Saudi Arabia",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G16",
    "archetypeTitle": "Renewable collector plant feeding HV/MV substation",
    "country": "SAU",
    "countryName": "Saudi Arabia",
    "region": "Arabian Peninsula",
    "subregion": "interior desert",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual renewable collector plant feeding hv/mv substation for a renewable collector load in a hyper-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "extreme",
      "duneRisk": "high",
      "waterAvailability": "low",
      "code": "E01",
      "climate": "hyper-arid desert",
      "terrain": "reg / hamada",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "hyper-arid"
    },
    "territorialRules": [
      "avoid mobile dunes",
      "prefer hamada over erg",
      "dry cleaning for soiling",
      "extreme heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 3.6,
      "averageLoadMW": 5.4,
      "peakLoadMW": 18,
      "loadFactor": 0.3,
      "criticalLoadMW": 1.8,
      "cyclicLoadMW": 0.9,
      "motorLoadMW": 3.6,
      "thermalLoadMW": 0.72,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.9,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "200–500 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 3.6,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 480,
        "acMW": 390,
        "mounting": "single-axis",
        "bifacial": true,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 380,
      "secondaryKV": 132,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 300,
      "transformerTotalMVA": 600,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 132,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 195,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 132,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 195,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "mobile dune risk — siting constraint",
      "Extreme heat and dust require equipment derating studies.",
      "PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "saudi-arabia",
      "r05",
      "arabian-peninsula",
      "hyper-arid",
      "renewable-collector",
      "generation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hyper-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau / hamada",
        "existing grid or road corridor",
        "stable desert plateau"
      ],
      "avoid": [
        "mobile dunes"
      ],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 95,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-SAU-G04-001",
    "name": "PV + BESS 1 h — utility generation — interior desert · Saudi Arabia",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G04",
    "archetypeTitle": "PV + BESS 1 h",
    "country": "SAU",
    "countryName": "Saudi Arabia",
    "region": "Arabian Peninsula",
    "subregion": "interior desert",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + bess 1 h for a utility generation load in a hot-arid desert setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 2.2,
      "averageLoadMW": 2.8,
      "peakLoadMW": 10,
      "loadFactor": 0.28,
      "criticalLoadMW": 1.2,
      "cyclicLoadMW": 0.4,
      "motorLoadMW": 1.8,
      "thermalLoadMW": 0.4,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.6,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 2,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 140,
        "acMW": 115,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.217,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 80,
      "energyMWh": 80,
      "durationHours": 1,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "frequency-support",
        "solar-firming"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 100,
      "transformerTotalMVA": 200,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 57.5,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 57.5,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "saudi-arabia",
      "r05",
      "arabian-peninsula",
      "hot-arid",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "bess-1h",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-YEM-G10-001",
    "name": "PV + diesel backup — remote settlement — remote settlement · Yemen",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G10",
    "archetypeTitle": "PV + diesel backup",
    "country": "YEM",
    "countryName": "Yemen",
    "region": "Arabian Peninsula",
    "subregion": "remote settlement",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + diesel backup for a remote settlement load in a remote infrastructure corridor setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E14",
      "climate": "remote infrastructure corridor",
      "terrain": "sparse corridor",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "extreme",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "long logistics chain",
      "security of remote assets",
      "limited water"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.504,
      "averageLoadMW": 0.756,
      "peakLoadMW": 1.8,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.324,
      "cyclicLoadMW": 0.324,
      "motorLoadMW": 0.216,
      "thermalLoadMW": 0.396,
      "interruptibleLoadMW": 0.144,
      "standbyLoadMW": 0.108,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.27,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 4.5,
        "acMW": 3.6,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 2.2,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 2.5,
      "transformerTotalMVA": 5,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Extreme heat and dust require equipment derating studies.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "yemen",
      "r05",
      "arabian-peninsula",
      "remote-corridor",
      "remote-settlement",
      "generation",
      "weak-grid",
      "mv",
      "no-bess",
      "medium"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-OMN-G12-001",
    "name": "Solar generation for water pumping / desalination — desalination — coastal zone · Oman",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G12",
    "archetypeTitle": "Solar generation for water pumping / desalination",
    "country": "OMN",
    "countryName": "Oman",
    "region": "Arabian Peninsula",
    "subregion": "coastal zone",
    "application": "desalination",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar generation for water pumping / desalination for a desalination load in a coastal saline setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "extreme",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E06",
      "climate": "coastal saline",
      "terrain": "coastal sabkha fringe",
      "salinityRisk": "extreme",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "coastal-saline"
    },
    "territorialRules": [
      "avoid sabkha",
      "high corrosion class for hardware",
      "saline aerosol on insulators"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 22.4,
      "averageLoadMW": 26.24,
      "peakLoadMW": 32,
      "loadFactor": 0.82,
      "criticalLoadMW": 12.8,
      "cyclicLoadMW": 2.56,
      "motorLoadMW": 17.6,
      "thermalLoadMW": 1.6,
      "interruptibleLoadMW": 1.6,
      "standbyLoadMW": 1.28,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "continuous-industrial",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 17.6,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        },
        {
          "name": "compressor start",
          "type": "compressor-start",
          "runningMW": 6.4,
          "startingMultiple": 6.5,
          "durationSeconds": 0.4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 48,
        "acMW": 40,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 50,
      "transformerTotalMVA": 100,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 20,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 20,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme salinity / corrosion",
      "Extreme heat and dust require equipment derating studies.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "oman",
      "r05",
      "arabian-peninsula",
      "coastal-saline",
      "desalination",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "coastal-saline",
    "loadArchetype": "LOAD_DESALINATION",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "sabkha"
      ],
      "investigate": [
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-OMN-G06-001",
    "name": "PV + BESS 4 h — water pumping — oasis · Oman",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G06",
    "archetypeTitle": "PV + BESS 4 h",
    "country": "OMN",
    "countryName": "Oman",
    "region": "Arabian Peninsula",
    "subregion": "oasis",
    "application": "water-pumping",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + bess 4 h for a water pumping load in a oasis / hamada setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "medium",
      "corrosionRisk": "high",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "medium",
      "code": "E03",
      "climate": "oasis / hamada",
      "terrain": "escarpment and oasis floor",
      "salinityRisk": "high",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "oasis"
    },
    "territorialRules": [
      "avoid sabkha and oasis floor",
      "avoid heritage cores and palm groves",
      "prefer plateau/hamada above the oasis",
      "saline dew: dry cleaning"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 2.85,
      "averageLoadMW": 4.275,
      "peakLoadMW": 9.5,
      "loadFactor": 0.45,
      "criticalLoadMW": 1.9,
      "cyclicLoadMW": 1.9,
      "motorLoadMW": 2.09,
      "thermalLoadMW": 1.33,
      "interruptibleLoadMW": 0.95,
      "standbyLoadMW": 0.475,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 2.09,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 10.925,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 6.65,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 20,
        "acMW": 16,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 6,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 12,
      "energyMWh": 48,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "grid-forming",
        "backup"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 20,
      "transformerTotalMVA": 40,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 8,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 8,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Extreme heat and dust require equipment derating studies.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "oman",
      "r05",
      "arabian-peninsula",
      "oasis",
      "water-pumping",
      "generation",
      "islandable",
      "mv",
      "bess-4h",
      "large"
    ],
    "qualityScore": 92,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "oasis",
    "loadArchetype": "LOAD_WATER_PUMPING",
    "siteSuitability": {
      "preferred": [
        "hamada above the oasis floor"
      ],
      "avoid": [
        "high-value agricultural soils",
        "heritage cores",
        "sabkha"
      ],
      "investigate": [
        "agricultural impact",
        "heritage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "G-ARE-G07-001",
    "name": "PV + BESS 6–8 h — industrial — coastal zone · United Arab Emirates",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G07",
    "archetypeTitle": "PV + BESS 6–8 h",
    "country": "ARE",
    "countryName": "United Arab Emirates",
    "region": "Arabian Peninsula",
    "subregion": "coastal zone",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + bess 6–8 h for a industrial load in a coastal saline setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "extreme",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E06",
      "climate": "coastal saline",
      "terrain": "coastal sabkha fringe",
      "salinityRisk": "extreme",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "coastal-saline"
    },
    "territorialRules": [
      "avoid sabkha",
      "high corrosion class for hardware",
      "saline aerosol on insulators"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 19.2,
      "averageLoadMW": 28,
      "peakLoadMW": 40,
      "loadFactor": 0.7,
      "criticalLoadMW": 8.8,
      "cyclicLoadMW": 5.6,
      "motorLoadMW": 11.2,
      "thermalLoadMW": 4.8,
      "interruptibleLoadMW": 4,
      "standbyLoadMW": 1.6,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 11.2,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 75,
        "acMW": 60,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 35,
      "energyMWh": 210,
      "durationHours": 6,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "energy-shifting",
        "peak-shaving"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 63,
      "transformerTotalMVA": 126,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 30,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 30,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme salinity / corrosion",
      "Extreme heat and dust require equipment derating studies.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "united-arab-emirates",
      "r05",
      "arabian-peninsula",
      "coastal-saline",
      "industrial",
      "generation",
      "grid-connected",
      "hv",
      "bess-6h+",
      "utility"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "coastal-saline",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "sabkha"
      ],
      "investigate": [
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-QAT-G13-001",
    "name": "Solar industrial self-generation — industrial — urban perimeter · Qatar",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G13",
    "archetypeTitle": "Solar industrial self-generation",
    "country": "QAT",
    "countryName": "Qatar",
    "region": "Arabian Peninsula",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar industrial self-generation for a industrial load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 7.68,
      "averageLoadMW": 11.2,
      "peakLoadMW": 16,
      "loadFactor": 0.7,
      "criticalLoadMW": 3.52,
      "cyclicLoadMW": 2.24,
      "motorLoadMW": 4.48,
      "thermalLoadMW": 1.92,
      "interruptibleLoadMW": 1.6,
      "standbyLoadMW": 0.64,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "process start",
          "type": "process-start",
          "runningMW": 3.2,
          "startingMultiple": 4,
          "durationSeconds": 8
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 24,
        "acMW": 20,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 25,
      "transformerTotalMVA": 50,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 10,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 10,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies."
    ],
    "tags": [
      "qatar",
      "r05",
      "arabian-peninsula",
      "urban-industrial",
      "industrial",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-KWT-G05-001",
    "name": "PV + BESS 2 h — utility generation — interior desert · Kuwait",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G05",
    "archetypeTitle": "PV + BESS 2 h",
    "country": "KWT",
    "countryName": "Kuwait",
    "region": "Arabian Peninsula",
    "subregion": "interior desert",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + bess 2 h for a utility generation load in a hot-arid desert setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.54,
      "averageLoadMW": 1.96,
      "peakLoadMW": 7,
      "loadFactor": 0.28,
      "criticalLoadMW": 0.84,
      "cyclicLoadMW": 0.28,
      "motorLoadMW": 1.26,
      "thermalLoadMW": 0.28,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.42,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 1.4,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 90,
        "acMW": 72,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 40,
      "energyMWh": 80,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 63,
      "transformerTotalMVA": 126,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 36,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 36,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "kuwait",
      "r05",
      "arabian-peninsula",
      "hot-arid",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "bess-2h",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-BHR-G01-001",
    "name": "Utility PV fixed tilt — industrial — coastal zone · Bahrain",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G01",
    "archetypeTitle": "Utility PV fixed tilt",
    "country": "BHR",
    "countryName": "Bahrain",
    "region": "Arabian Peninsula",
    "subregion": "coastal zone",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility pv fixed tilt for a industrial load in a coastal saline setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "extreme",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E06",
      "climate": "coastal saline",
      "terrain": "coastal sabkha fringe",
      "salinityRisk": "extreme",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "coastal-saline"
    },
    "territorialRules": [
      "avoid sabkha",
      "high corrosion class for hardware",
      "saline aerosol on insulators"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 3.84,
      "averageLoadMW": 5.6,
      "peakLoadMW": 8,
      "loadFactor": 0.7,
      "criticalLoadMW": 1.76,
      "cyclicLoadMW": 1.12,
      "motorLoadMW": 2.24,
      "thermalLoadMW": 0.96,
      "interruptibleLoadMW": 0.8,
      "standbyLoadMW": 0.32,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 2.24,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 12,
        "acMW": 10,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme salinity / corrosion",
      "Extreme heat and dust require equipment derating studies.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "bahrain",
      "r05",
      "arabian-peninsula",
      "coastal-saline",
      "industrial",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "coastal-saline",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "sabkha"
      ],
      "investigate": [
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-IRN-G08-001",
    "name": "PV + wind hybrid — utility generation — high plateau · Iran",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G08",
    "archetypeTitle": "PV + wind hybrid",
    "country": "IRN",
    "countryName": "Iran",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "high plateau",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + wind hybrid for a utility generation load in a semi-arid plateau setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E04",
      "climate": "semi-arid plateau",
      "terrain": "plateau",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "high-plateau"
    },
    "territorialRules": [
      "setback from seasonal wadis",
      "dust and heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.98,
      "averageLoadMW": 2.52,
      "peakLoadMW": 9,
      "loadFactor": 0.28,
      "criticalLoadMW": 1.08,
      "cyclicLoadMW": 0.36,
      "motorLoadMW": 1.62,
      "thermalLoadMW": 0.36,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.54,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 1.8,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "wind"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 80,
        "acMW": 65,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": {
        "ratedMW": 50,
        "capacityFactor": 0.3
      },
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 80,
      "transformerTotalMVA": 160,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 32.5,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 32.5,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Access and altitude may govern constructability more than resource."
    ],
    "tags": [
      "iran",
      "r06",
      "iranian-plateau-central-corridor",
      "high-plateau",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "high-plateau",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-IRN-G14-001",
    "name": "Solar mining / extraction infrastructure — mining — industrial corridor · Iran",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G14",
    "archetypeTitle": "Solar mining / extraction infrastructure",
    "country": "IRN",
    "countryName": "Iran",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "industrial corridor",
    "application": "mining",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar mining / extraction infrastructure for a mining load in a mining / extraction zone setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E13",
      "climate": "mining / extraction zone",
      "terrain": "extractive plateau",
      "salinityRisk": "medium",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "dust from extraction",
      "heavy-vehicle access",
      "avoid unconsolidated spoil"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 22.5,
      "averageLoadMW": 32.4,
      "peakLoadMW": 45,
      "loadFactor": 0.72,
      "criticalLoadMW": 11.25,
      "cyclicLoadMW": 4.5,
      "motorLoadMW": 18,
      "thermalLoadMW": 2.7,
      "interruptibleLoadMW": 3.6,
      "standbyLoadMW": 1.35,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor-industrial",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "conveyor start",
          "type": "conveyor-start",
          "runningMW": 18,
          "startingMultiple": 5,
          "durationSeconds": 5
        },
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 18,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 70,
        "acMW": 55,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.273,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 20,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 63,
      "transformerTotalMVA": 126,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 27.5,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 27.5,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "extreme dust / soiling",
      "weak-grid context",
      "Access and altitude may govern constructability more than resource.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "iran",
      "r06",
      "iranian-plateau-central-corridor",
      "remote-corridor",
      "mining",
      "generation",
      "weak-grid",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 92,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_MINING",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-AFG-G10-001",
    "name": "PV + diesel backup — remote settlement — mountain region · Afghanistan",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G10",
    "archetypeTitle": "PV + diesel backup",
    "country": "AFG",
    "countryName": "Afghanistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "mountain region",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + diesel backup for a remote settlement load in a mountain / highland setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "low",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "low",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E05",
      "climate": "mountain / highland",
      "terrain": "highland",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "high",
      "envelope": "mountain"
    },
    "territorialRules": [
      "access and snow/ice on access roads",
      "altitude derating",
      "avoid steep unstable slopes"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.672,
      "averageLoadMW": 1.008,
      "peakLoadMW": 2.4,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.432,
      "cyclicLoadMW": 0.432,
      "motorLoadMW": 0.288,
      "thermalLoadMW": 0.528,
      "interruptibleLoadMW": 0.192,
      "standbyLoadMW": 0.144,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.36,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 6,
        "acMW": 5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 2.5,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 20,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 4,
      "transformerTotalMVA": 8,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Access and altitude may govern constructability more than resource.",
      "Remote access: logistics and O&M need a site study.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "afghanistan",
      "r06",
      "iranian-plateau-central-corridor",
      "mountain",
      "remote-settlement",
      "generation",
      "weak-grid",
      "mv",
      "no-bess",
      "medium"
    ],
    "qualityScore": 95,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "mountain",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-PAK-G16-001",
    "name": "Renewable collector plant feeding HV/MV substation — renewable collector — interior desert · Pakistan",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G16",
    "archetypeTitle": "Renewable collector plant feeding HV/MV substation",
    "country": "PAK",
    "countryName": "Pakistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "interior desert",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual renewable collector plant feeding hv/mv substation for a renewable collector load in a hot-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 2,
      "averageLoadMW": 3,
      "peakLoadMW": 10,
      "loadFactor": 0.3,
      "criticalLoadMW": 1,
      "cyclicLoadMW": 0.5,
      "motorLoadMW": 2,
      "thermalLoadMW": 0.4,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.5,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 2,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 150,
        "acMW": 120,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 100,
      "transformerTotalMVA": 200,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 60,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 60,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Access and altitude may govern constructability more than resource.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "pakistan",
      "r06",
      "iranian-plateau-central-corridor",
      "hot-arid",
      "renewable-collector",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-PAK-G14-001",
    "name": "Solar mining / extraction infrastructure — mining — industrial corridor · Pakistan",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G14",
    "archetypeTitle": "Solar mining / extraction infrastructure",
    "country": "PAK",
    "countryName": "Pakistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "industrial corridor",
    "application": "mining",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar mining / extraction infrastructure for a mining load in a mining / extraction zone setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E13",
      "climate": "mining / extraction zone",
      "terrain": "extractive plateau",
      "salinityRisk": "medium",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "dust from extraction",
      "heavy-vehicle access",
      "avoid unconsolidated spoil"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 19,
      "averageLoadMW": 27.36,
      "peakLoadMW": 38,
      "loadFactor": 0.72,
      "criticalLoadMW": 9.5,
      "cyclicLoadMW": 3.8,
      "motorLoadMW": 15.2,
      "thermalLoadMW": 2.28,
      "interruptibleLoadMW": 3.04,
      "standbyLoadMW": 1.14,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor-industrial",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "conveyor start",
          "type": "conveyor-start",
          "runningMW": 15.2,
          "startingMultiple": 5,
          "durationSeconds": 5
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 50,
        "acMW": 40,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 15,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 20,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 20,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "extreme dust / soiling",
      "weak-grid context",
      "Access and altitude may govern constructability more than resource.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "pakistan",
      "r06",
      "iranian-plateau-central-corridor",
      "remote-corridor",
      "mining",
      "generation",
      "weak-grid",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 92,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_MINING",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-IND-G15-001",
    "name": "Solar agricultural pumping hub — agriculture — agricultural interior · India",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G15",
    "archetypeTitle": "Solar agricultural pumping hub",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar agricultural pumping hub for a agriculture load in a agricultural interior setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 2.52,
      "averageLoadMW": 5.32,
      "peakLoadMW": 14,
      "loadFactor": 0.38,
      "criticalLoadMW": 1.12,
      "cyclicLoadMW": 4.9,
      "motorLoadMW": 5.6,
      "thermalLoadMW": 0.7,
      "interruptibleLoadMW": 3.5,
      "standbyLoadMW": 0.42,
      "seasonalVariationPercent": 55,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 5.6,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 16.1,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 9.8,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 28,
        "acMW": 22,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.273,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 25,
      "transformerTotalMVA": 50,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 11,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 11,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "agricultural",
      "agriculture",
      "generation",
      "grid-connected",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 97,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high-value agricultural soils"
      ],
      "investigate": [
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "G-IND-G13-001",
    "name": "Solar industrial self-generation — industrial — urban perimeter · India",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G13",
    "archetypeTitle": "Solar industrial self-generation",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar industrial self-generation for a industrial load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 17.28,
      "averageLoadMW": 25.2,
      "peakLoadMW": 36,
      "loadFactor": 0.7,
      "criticalLoadMW": 7.92,
      "cyclicLoadMW": 5.04,
      "motorLoadMW": 10.08,
      "thermalLoadMW": 4.32,
      "interruptibleLoadMW": 3.6,
      "standbyLoadMW": 1.44,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "process start",
          "type": "process-start",
          "runningMW": 7.2,
          "startingMultiple": 4,
          "durationSeconds": 8
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 48,
        "acMW": 40,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 50,
      "transformerTotalMVA": 100,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 20,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 20,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "urban-industrial",
      "industrial",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 92
  },
  {
    "id": "G-IND-G02-001",
    "name": "Utility PV single-axis tracker — utility generation — agricultural interior · India",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G02",
    "archetypeTitle": "Utility PV single-axis tracker",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "agricultural interior",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility pv single-axis tracker for a utility generation load in a monsoon setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "high",
      "floodRisk": "extreme",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E11",
      "climate": "monsoon",
      "terrain": "seasonal floodplain",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "high",
      "envelope": "monsoon"
    },
    "territorialRules": [
      "monsoon flood and lightning",
      "seasonal soiling after dry spells",
      "access during floods"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.54,
      "averageLoadMW": 1.96,
      "peakLoadMW": 7,
      "loadFactor": 0.28,
      "criticalLoadMW": 0.84,
      "cyclicLoadMW": 0.28,
      "motorLoadMW": 1.26,
      "thermalLoadMW": 0.28,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.42,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 1.4,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "monsoonSeason": {
        "peakLoadMW": 5.95,
        "note": "cloud / flood access"
      },
      "drySeason": {
        "peakLoadMW": 7.42,
        "note": "clearer resource, dust after dry spell"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 90,
        "acMW": 72,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 63,
      "transformerTotalMVA": 126,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 36,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 36,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "monsoon",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 97,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "monsoon",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact",
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-BGD-G01-001",
    "name": "Utility PV fixed tilt — utility generation — river valley · Bangladesh",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G01",
    "archetypeTitle": "Utility PV fixed tilt",
    "country": "BGD",
    "countryName": "Bangladesh",
    "region": "South Asia",
    "subregion": "river valley",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility pv fixed tilt for a utility generation load in a river valley setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "high",
      "corrosionRisk": "medium",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E10",
      "climate": "river valley",
      "terrain": "alluvial valley",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "river-valley"
    },
    "territorialRules": [
      "floodplain setback",
      "alluvial grounding conditions"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.99,
      "averageLoadMW": 1.26,
      "peakLoadMW": 4.5,
      "loadFactor": 0.28,
      "criticalLoadMW": 0.54,
      "cyclicLoadMW": 0.18,
      "motorLoadMW": 0.81,
      "thermalLoadMW": 0.18,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.27,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "auxiliary",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 0.9,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "monsoonSeason": {
        "peakLoadMW": 3.825,
        "note": "cloud / flood access"
      },
      "drySeason": {
        "peakLoadMW": 4.77,
        "note": "clearer resource, dust after dry spell"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 40,
        "acMW": 32,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 16,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 16,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "bangladesh",
      "r07",
      "south-asia",
      "river-valley",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 97,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "river-valley",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-LKA-G01-001",
    "name": "Utility PV fixed tilt — utility generation — agricultural interior · Sri Lanka",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G01",
    "archetypeTitle": "Utility PV fixed tilt",
    "country": "LKA",
    "countryName": "Sri Lanka",
    "region": "South Asia",
    "subregion": "agricultural interior",
    "application": "utility-generation",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual utility pv fixed tilt for a utility generation load in a tropical humid setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E12",
      "climate": "tropical humid",
      "terrain": "humid lowland",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "tropical-humid"
    },
    "territorialRules": [
      "humidity and vegetation clearance",
      "flood and lightning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.836,
      "averageLoadMW": 1.064,
      "peakLoadMW": 3.8,
      "loadFactor": 0.28,
      "criticalLoadMW": 0.456,
      "cyclicLoadMW": 0.152,
      "motorLoadMW": 0.684,
      "thermalLoadMW": 0.152,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.228,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "auxiliary",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 0.76,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "monsoonSeason": {
        "peakLoadMW": 3.23,
        "note": "cloud / flood access"
      },
      "drySeason": {
        "peakLoadMW": 4.028,
        "note": "clearer resource, dust after dry spell"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 30,
        "acMW": 24,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 31.5,
      "transformerTotalMVA": 63,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 12,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 33,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 12,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "sri-lanka",
      "r07",
      "south-asia",
      "tropical-humid",
      "utility-generation",
      "generation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "tropical-humid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-MMR-G15-001",
    "name": "Solar agricultural pumping hub — agriculture — agricultural interior · Myanmar",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G15",
    "archetypeTitle": "Solar agricultural pumping hub",
    "country": "MMR",
    "countryName": "Myanmar",
    "region": "Southeast Transition",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar agricultural pumping hub for a agriculture load in a monsoon setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "high",
      "floodRisk": "extreme",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E11",
      "climate": "monsoon",
      "terrain": "seasonal floodplain",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "high",
      "envelope": "monsoon"
    },
    "territorialRules": [
      "monsoon flood and lightning",
      "seasonal soiling after dry spells",
      "access during floods"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.2,
      "averageLoadMW": 2.8,
      "peakLoadMW": 8,
      "loadFactor": 0.35,
      "criticalLoadMW": 0.48,
      "cyclicLoadMW": 3.6,
      "motorLoadMW": 4,
      "thermalLoadMW": 0.32,
      "interruptibleLoadMW": 2.4,
      "standbyLoadMW": 0.16,
      "seasonalVariationPercent": 65,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 4,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 9.2,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 5.6,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 16,
        "acMW": 13,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 6.5,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 11,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 6.5,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "high seasonal variation",
      "weak-grid context",
      "Humid/monsoon conditions dominate siting over desert heuristics.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements.",
      "Drainage and flood elevation require site assessment.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "myanmar",
      "r08",
      "southeast-transition",
      "monsoon",
      "agriculture",
      "generation",
      "weak-grid",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 91,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "monsoon",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact",
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 9,
      "warningsCount": 9,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-THA-G15-001",
    "name": "Solar agricultural pumping hub — agriculture — agricultural interior · Thailand",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G15",
    "archetypeTitle": "Solar agricultural pumping hub",
    "country": "THA",
    "countryName": "Thailand",
    "region": "Southeast Transition",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar agricultural pumping hub for a agriculture load in a agricultural interior setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.8,
      "averageLoadMW": 3.8,
      "peakLoadMW": 10,
      "loadFactor": 0.38,
      "criticalLoadMW": 0.8,
      "cyclicLoadMW": 3.5,
      "motorLoadMW": 4,
      "thermalLoadMW": 0.5,
      "interruptibleLoadMW": 2.5,
      "standbyLoadMW": 0.3,
      "seasonalVariationPercent": 55,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 4,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 11.5,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 7,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 20,
        "acMW": 16,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 22,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 0.4,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 8,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 0.4,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 8,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Humid/monsoon conditions dominate siting over desert heuristics.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "thailand",
      "r08",
      "southeast-transition",
      "agricultural",
      "agriculture",
      "generation",
      "grid-connected",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 97,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high-value agricultural soils"
      ],
      "investigate": [
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-LBN-G11-001",
    "name": "PV + diesel + BESS microgrid — remote settlement — mountain region · Lebanon",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G11",
    "archetypeTitle": "PV + diesel + BESS microgrid",
    "country": "LBN",
    "countryName": "Lebanon",
    "region": "Levant / Mesopotamia",
    "subregion": "mountain region",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv + diesel + bess microgrid for a remote settlement load in a mountain / highland setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "low",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "low",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E05",
      "climate": "mountain / highland",
      "terrain": "highland",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "high",
      "envelope": "mountain"
    },
    "territorialRules": [
      "access and snow/ice on access roads",
      "altitude derating",
      "avoid steep unstable slopes"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.896,
      "averageLoadMW": 1.344,
      "peakLoadMW": 3.2,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.576,
      "cyclicLoadMW": 0.576,
      "motorLoadMW": 0.384,
      "thermalLoadMW": 0.704,
      "interruptibleLoadMW": 0.256,
      "standbyLoadMW": 0.192,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.48,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 8,
        "acMW": 6.5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 3,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 4,
      "energyMWh": 16,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "backup",
        "grid-forming"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 10,
      "transformerTotalMVA": 20,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Remote access: logistics and O&M need a site study.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "lebanon",
      "r04",
      "levant-mesopotamia",
      "mountain",
      "remote-settlement",
      "generation",
      "islandable",
      "hv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 95,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "mountain",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 94,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 6
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "G-SYR-G13-001",
    "name": "Solar industrial self-generation — agriculture — agricultural interior · Syria",
    "family": "G",
    "familyName": "GENERATION",
    "archetype": "G13",
    "archetypeTitle": "Solar industrial self-generation",
    "country": "SYR",
    "countryName": "Syria",
    "region": "Levant / Mesopotamia",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual solar industrial self-generation for a agriculture load in a agricultural interior setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.35,
      "averageLoadMW": 2.85,
      "peakLoadMW": 7.5,
      "loadFactor": 0.38,
      "criticalLoadMW": 0.6,
      "cyclicLoadMW": 2.625,
      "motorLoadMW": 3,
      "thermalLoadMW": 0.375,
      "interruptibleLoadMW": 1.875,
      "standbyLoadMW": 0.225,
      "seasonalVariationPercent": 55,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 3,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 8.625,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 5.25,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 15,
        "acMW": 12,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 20,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "collector-A",
        "voltageKV": 20,
        "role": "array collector",
        "lengthKM": 4,
        "estimatedLoadMW": 6,
        "lossesPercent": 1.5
      },
      {
        "name": "collector-B",
        "voltageKV": 20,
        "role": "array collector",
        "lengthKM": 5,
        "estimatedLoadMW": 6,
        "lossesPercent": 1.6
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "syria",
      "r04",
      "levant-mesopotamia",
      "agricultural",
      "agriculture",
      "generation",
      "weak-grid",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 94,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high-value agricultural soils"
      ],
      "investigate": [
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 89,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 6
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-YEM-S01-001",
    "name": "11/0.4 kV local transformer station — remote settlement — remote settlement · Yemen",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S01",
    "archetypeTitle": "11/0.4 kV local transformer station",
    "country": "YEM",
    "countryName": "Yemen",
    "region": "Arabian Peninsula",
    "subregion": "remote settlement",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 11/0.4 kv local transformer station for a remote settlement load in a remote infrastructure corridor setting. Grid context is the scenario (grid-connected, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E14",
      "climate": "remote infrastructure corridor",
      "terrain": "sparse corridor",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "extreme",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "long logistics chain",
      "security of remote assets",
      "limited water"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.098,
      "averageLoadMW": 0.147,
      "peakLoadMW": 0.35,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.063,
      "cyclicLoadMW": 0.063,
      "motorLoadMW": 0.042,
      "thermalLoadMW": 0.077,
      "interruptibleLoadMW": 0.028,
      "standbyLoadMW": 0.021,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "kW-scale",
      "transientEvents": []
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 0.4,
      "transformerTotalMVA": 0.8,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 0.175,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 0.175,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak grid without BESS or diesel",
      "weak-grid context",
      "Extreme heat and dust require equipment derating studies.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "yemen",
      "r05",
      "arabian-peninsula",
      "remote-corridor",
      "remote-settlement",
      "substation",
      "grid-connected",
      "mv",
      "no-bess",
      "small"
    ],
    "qualityScore": 90,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-AFG-S01-001",
    "name": "11/0.4 kV local transformer station — remote settlement — mountain region · Afghanistan",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S01",
    "archetypeTitle": "11/0.4 kV local transformer station",
    "country": "AFG",
    "countryName": "Afghanistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "mountain region",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 11/0.4 kv local transformer station for a remote settlement load in a mountain / highland setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "low",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "low",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E05",
      "climate": "mountain / highland",
      "terrain": "highland",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "high",
      "envelope": "mountain"
    },
    "territorialRules": [
      "access and snow/ice on access roads",
      "altitude derating",
      "avoid steep unstable slopes"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.078,
      "averageLoadMW": 0.118,
      "peakLoadMW": 0.28,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.05,
      "cyclicLoadMW": 0.05,
      "motorLoadMW": 0.034,
      "thermalLoadMW": 0.062,
      "interruptibleLoadMW": 0.022,
      "standbyLoadMW": 0.017,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "kW-scale",
      "transientEvents": []
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 20,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 1,
      "transformerMVA": 0.4,
      "transformerTotalMVA": 0.4,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 0.14,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 0.14,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "peak exceeds planned utilization",
      "weak-grid context",
      "Access and altitude may govern constructability more than resource.",
      "Remote access: logistics and O&M need a site study.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "afghanistan",
      "r06",
      "iranian-plateau-central-corridor",
      "mountain",
      "remote-settlement",
      "substation",
      "weak-grid",
      "mv",
      "no-bess",
      "small"
    ],
    "qualityScore": 90,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "mountain",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-TUN-S02-001",
    "name": "33/11 kV radial distribution substation — urban distribution — urban perimeter · Tunisia",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S02",
    "archetypeTitle": "33/11 kV radial distribution substation",
    "country": "TUN",
    "countryName": "Tunisia",
    "region": "Maghreb",
    "subregion": "urban perimeter",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 33/11 kv radial distribution substation for a urban distribution load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 4.8,
      "averageLoadMW": 6.96,
      "peakLoadMW": 12,
      "loadFactor": 0.58,
      "criticalLoadMW": 2.4,
      "cyclicLoadMW": 1.44,
      "motorLoadMW": 1.2,
      "thermalLoadMW": 2.64,
      "interruptibleLoadMW": 0.72,
      "standbyLoadMW": 0.6,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 2.4,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "hotSeason": {
        "peakLoadMW": 13.44,
        "note": "cooling peak"
      },
      "mildSeason": {
        "peakLoadMW": 9.84,
        "note": "base urban"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 1,
      "transformerMVA": 20,
      "transformerTotalMVA": 20,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 6,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 6,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [],
    "tags": [
      "tunisia",
      "r02",
      "maghreb",
      "urban-industrial",
      "urban-distribution",
      "substation",
      "grid-connected",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 100,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 0,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-JOR-S03-001",
    "name": "33/11 kV dual-transformer substation — urban distribution — urban perimeter · Jordan",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S03",
    "archetypeTitle": "33/11 kV dual-transformer substation",
    "country": "JOR",
    "countryName": "Jordan",
    "region": "Levant / Mesopotamia",
    "subregion": "urban perimeter",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 33/11 kv dual-transformer substation for a urban distribution load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 8.8,
      "averageLoadMW": 12.76,
      "peakLoadMW": 22,
      "loadFactor": 0.58,
      "criticalLoadMW": 4.4,
      "cyclicLoadMW": 2.64,
      "motorLoadMW": 2.2,
      "thermalLoadMW": 4.84,
      "interruptibleLoadMW": 1.32,
      "standbyLoadMW": 1.1,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 4.4,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "hotSeason": {
        "peakLoadMW": 24.64,
        "note": "cooling peak"
      },
      "mildSeason": {
        "peakLoadMW": 18.04,
        "note": "base urban"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 20,
      "transformerTotalMVA": 40,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 11,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 11,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [],
    "tags": [
      "jordan",
      "r04",
      "levant-mesopotamia",
      "urban-industrial",
      "urban-distribution",
      "substation",
      "grid-connected",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 100,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 0,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-BGD-S02-001",
    "name": "33/11 kV radial distribution substation — urban distribution — agricultural interior · Bangladesh",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S02",
    "archetypeTitle": "33/11 kV radial distribution substation",
    "country": "BGD",
    "countryName": "Bangladesh",
    "region": "South Asia",
    "subregion": "agricultural interior",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 33/11 kv radial distribution substation for a urban distribution load in a monsoon setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "high",
      "floodRisk": "extreme",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E11",
      "climate": "monsoon",
      "terrain": "seasonal floodplain",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "high",
      "envelope": "monsoon"
    },
    "territorialRules": [
      "monsoon flood and lightning",
      "seasonal soiling after dry spells",
      "access during floods"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 7.2,
      "averageLoadMW": 10.44,
      "peakLoadMW": 18,
      "loadFactor": 0.58,
      "criticalLoadMW": 3.6,
      "cyclicLoadMW": 2.16,
      "motorLoadMW": 1.8,
      "thermalLoadMW": 3.96,
      "interruptibleLoadMW": 1.08,
      "standbyLoadMW": 0.9,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 3.6,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "monsoonSeason": {
        "peakLoadMW": 15.3,
        "note": "cloud / flood access"
      },
      "drySeason": {
        "peakLoadMW": 19.08,
        "note": "clearer resource, dust after dry spell"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 9,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 9,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "bangladesh",
      "r07",
      "south-asia",
      "monsoon",
      "urban-distribution",
      "substation",
      "grid-connected",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 100,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "monsoon",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-AFG-S04-001",
    "name": "66/11 kV substation — urban distribution — mountain region · Afghanistan",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S04",
    "archetypeTitle": "66/11 kV substation",
    "country": "AFG",
    "countryName": "Afghanistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "mountain region",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 66/11 kv substation for a urban distribution load in a mountain / highland setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "low",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "low",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E05",
      "climate": "mountain / highland",
      "terrain": "highland",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "high",
      "envelope": "mountain"
    },
    "territorialRules": [
      "access and snow/ice on access roads",
      "altitude derating",
      "avoid steep unstable slopes"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 5.6,
      "averageLoadMW": 8.12,
      "peakLoadMW": 14,
      "loadFactor": 0.58,
      "criticalLoadMW": 2.8,
      "cyclicLoadMW": 1.68,
      "motorLoadMW": 1.4,
      "thermalLoadMW": 3.08,
      "interruptibleLoadMW": 0.84,
      "standbyLoadMW": 0.7,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 2.8,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 7,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 7,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Access and altitude may govern constructability more than resource.",
      "Remote access: logistics and O&M need a site study.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "afghanistan",
      "r06",
      "iranian-plateau-central-corridor",
      "mountain",
      "urban-distribution",
      "substation",
      "weak-grid",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "mountain",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-LBN-S04-001",
    "name": "66/11 kV substation — urban distribution — mountain region · Lebanon",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S04",
    "archetypeTitle": "66/11 kV substation",
    "country": "LBN",
    "countryName": "Lebanon",
    "region": "Levant / Mesopotamia",
    "subregion": "mountain region",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 66/11 kv substation for a urban distribution load in a mountain / highland setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "low",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "low",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E05",
      "climate": "mountain / highland",
      "terrain": "highland",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "high",
      "envelope": "mountain"
    },
    "territorialRules": [
      "access and snow/ice on access roads",
      "altitude derating",
      "avoid steep unstable slopes"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 6.4,
      "averageLoadMW": 9.28,
      "peakLoadMW": 16,
      "loadFactor": 0.58,
      "criticalLoadMW": 3.2,
      "cyclicLoadMW": 1.92,
      "motorLoadMW": 1.6,
      "thermalLoadMW": 3.52,
      "interruptibleLoadMW": 0.96,
      "standbyLoadMW": 0.8,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 3.2,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 20,
      "transformerTotalMVA": 40,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "ring",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 8,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 8,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Remote access: logistics and O&M need a site study."
    ],
    "tags": [
      "lebanon",
      "r04",
      "levant-mesopotamia",
      "mountain",
      "urban-distribution",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "mountain",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-MAR-S05-001",
    "name": "66/33 kV collector station — renewable collector — high plateau · Algeria",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S05",
    "archetypeTitle": "66/33 kV collector station",
    "country": "DZA",
    "countryName": "Algeria",
    "region": "Maghreb",
    "subregion": "high plateau",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 66/33 kv collector station for a renewable collector load in a semi-arid plateau setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E04",
      "climate": "semi-arid plateau",
      "terrain": "plateau",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "high-plateau"
    },
    "territorialRules": [
      "setback from seasonal wadis",
      "dust and heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 9.6,
      "averageLoadMW": 14.4,
      "peakLoadMW": 48,
      "loadFactor": 0.3,
      "criticalLoadMW": 4.8,
      "cyclicLoadMW": 2.4,
      "motorLoadMW": 9.6,
      "thermalLoadMW": 1.92,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 2.4,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 9.6,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 24,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 24,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [],
    "tags": [
      "algeria",
      "r02",
      "maghreb",
      "high-plateau",
      "renewable-collector",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "high-plateau",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 0,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-EGY-S06-001",
    "name": "110/33 kV — urban distribution — urban perimeter · Tunisia",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S06",
    "archetypeTitle": "110/33 kV",
    "country": "TUN",
    "countryName": "Tunisia",
    "region": "Maghreb",
    "subregion": "urban perimeter",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 110/33 kv for a urban distribution load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 22,
      "averageLoadMW": 31.9,
      "peakLoadMW": 55,
      "loadFactor": 0.58,
      "criticalLoadMW": 11,
      "cyclicLoadMW": 6.6,
      "motorLoadMW": 5.5,
      "thermalLoadMW": 12.1,
      "interruptibleLoadMW": 3.3,
      "standbyLoadMW": 2.75,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 11,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "hotSeason": {
        "peakLoadMW": 61.6,
        "note": "cooling peak"
      },
      "mildSeason": {
        "peakLoadMW": 45.1,
        "note": "base urban"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 110,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 50,
      "transformerTotalMVA": 100,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 27.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 27.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [],
    "tags": [
      "tunisia",
      "r02",
      "maghreb",
      "urban-industrial",
      "urban-distribution",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 100,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 0,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-PAK-S07-001",
    "name": "132/33 kV — industrial — urban perimeter · Pakistan",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S07",
    "archetypeTitle": "132/33 kV",
    "country": "PAK",
    "countryName": "Pakistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 132/33 kv for a industrial load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 33.6,
      "averageLoadMW": 49,
      "peakLoadMW": 70,
      "loadFactor": 0.7,
      "criticalLoadMW": 15.4,
      "cyclicLoadMW": 9.8,
      "motorLoadMW": 19.6,
      "thermalLoadMW": 8.4,
      "interruptibleLoadMW": 7,
      "standbyLoadMW": 2.8,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 19.6,
          "startingMultiple": 6,
          "durationSeconds": 4
        },
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 14,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 63,
      "transformerTotalMVA": 126,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 35,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 35,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Access and altitude may govern constructability more than resource."
    ],
    "tags": [
      "pakistan",
      "r06",
      "iranian-plateau-central-corridor",
      "urban-industrial",
      "industrial",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-IND-S08-001",
    "name": "132/11 kV industrial — industrial — urban perimeter · India",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S08",
    "archetypeTitle": "132/11 kV industrial",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 132/11 kv industrial for a industrial load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 23.04,
      "averageLoadMW": 33.6,
      "peakLoadMW": 48,
      "loadFactor": 0.7,
      "criticalLoadMW": 10.56,
      "cyclicLoadMW": 6.72,
      "motorLoadMW": 13.44,
      "thermalLoadMW": 5.76,
      "interruptibleLoadMW": 4.8,
      "standbyLoadMW": 1.92,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 13.44,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 132,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 24,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 24,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "urban-industrial",
      "industrial",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 92
  },
  {
    "id": "S-SAU-S09-001",
    "name": "220/132 kV — bulk power — interior desert · Saudi Arabia",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S09",
    "archetypeTitle": "220/132 kV",
    "country": "SAU",
    "countryName": "Saudi Arabia",
    "region": "Arabian Peninsula",
    "subregion": "interior desert",
    "application": "bulk-power",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 220/132 kv for a bulk power load in a hot-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 126,
      "averageLoadMW": 154,
      "peakLoadMW": 280,
      "loadFactor": 0.55,
      "criticalLoadMW": 84,
      "cyclicLoadMW": 14,
      "motorLoadMW": 22.4,
      "thermalLoadMW": 11.2,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 5.6,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "base",
      "scaleBand": "200–500 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 56,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 132,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 200,
      "transformerTotalMVA": 400,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "meshed",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 132,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 140,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 132,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 140,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "peak exceeds planned utilization",
      "Extreme heat and dust require equipment derating studies.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "saudi-arabia",
      "r05",
      "arabian-peninsula",
      "hot-arid",
      "bulk-power",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_BULK",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 79,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 6,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-IRN-S10-001",
    "name": "220/66 kV — bulk power — high plateau · Iran",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S10",
    "archetypeTitle": "220/66 kV",
    "country": "IRN",
    "countryName": "Iran",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "high plateau",
    "application": "bulk-power",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 220/66 kv for a bulk power load in a semi-arid plateau setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E04",
      "climate": "semi-arid plateau",
      "terrain": "plateau",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "high-plateau"
    },
    "territorialRules": [
      "setback from seasonal wadis",
      "dust and heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 94.5,
      "averageLoadMW": 115.5,
      "peakLoadMW": 210,
      "loadFactor": 0.55,
      "criticalLoadMW": 63,
      "cyclicLoadMW": 10.5,
      "motorLoadMW": 16.8,
      "thermalLoadMW": 8.4,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 4.2,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "base",
      "scaleBand": "200–500 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 42,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 66,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 160,
      "transformerTotalMVA": 320,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "meshed",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 66,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 105,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 66,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 105,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Access and altitude may govern constructability more than resource."
    ],
    "tags": [
      "iran",
      "r06",
      "iranian-plateau-central-corridor",
      "high-plateau",
      "bulk-power",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 98,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "high-plateau",
    "loadArchetype": "LOAD_BULK",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-MRT-S11-001",
    "name": "220/33 kV renewable collector — renewable collector — interior desert · Mauritania",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S11",
    "archetypeTitle": "220/33 kV renewable collector",
    "country": "MRT",
    "countryName": "Mauritania",
    "region": "Atlantic Sahara",
    "subregion": "interior desert",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 220/33 kv renewable collector for a renewable collector load in a hyper-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "extreme",
      "duneRisk": "high",
      "waterAvailability": "low",
      "code": "E01",
      "climate": "hyper-arid desert",
      "terrain": "reg / hamada",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "hyper-arid"
    },
    "territorialRules": [
      "avoid mobile dunes",
      "prefer hamada over erg",
      "dry cleaning for soiling",
      "extreme heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 2.4,
      "averageLoadMW": 3.6,
      "peakLoadMW": 12,
      "loadFactor": 0.3,
      "criticalLoadMW": 1.2,
      "cyclicLoadMW": 0.6,
      "motorLoadMW": 2.4,
      "thermalLoadMW": 0.48,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.6,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 2.4,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 180,
        "acMW": 150,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 125,
      "transformerTotalMVA": 250,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 6,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 6,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "mobile dune risk — siting constraint",
      "High soiling may increase O&M requirements.",
      "PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.",
      "Remote access: logistics and O&M need a site study."
    ],
    "tags": [
      "mauritania",
      "r01",
      "atlantic-sahara",
      "hyper-arid",
      "renewable-collector",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 92,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hyper-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau / hamada",
        "existing grid or road corridor",
        "stable desert plateau"
      ],
      "avoid": [
        "mobile dunes"
      ],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "S-IND-S12-001",
    "name": "400/220 kV bulk transmission interface — bulk power — urban perimeter · India",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S12",
    "archetypeTitle": "400/220 kV bulk transmission interface",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "urban perimeter",
    "application": "bulk-power",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 400/220 kv bulk transmission interface for a bulk power load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 234,
      "averageLoadMW": 286,
      "peakLoadMW": 520,
      "loadFactor": 0.55,
      "criticalLoadMW": 156,
      "cyclicLoadMW": 26,
      "motorLoadMW": 41.6,
      "thermalLoadMW": 20.8,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 10.4,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "base",
      "scaleBand": "500+ MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 104,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 400,
      "secondaryKV": 220,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 400,
      "transformerTotalMVA": 800,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "meshed",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 220,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 260,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 220,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 260,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "urban-industrial",
      "bulk-power",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 100,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_BULK",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "S-SAU-S13-001",
    "name": "400/132 kV — bulk power — interior desert · Saudi Arabia",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S13",
    "archetypeTitle": "400/132 kV",
    "country": "SAU",
    "countryName": "Saudi Arabia",
    "region": "Arabian Peninsula",
    "subregion": "interior desert",
    "application": "bulk-power",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 400/132 kv for a bulk power load in a hot-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 189,
      "averageLoadMW": 231,
      "peakLoadMW": 420,
      "loadFactor": 0.55,
      "criticalLoadMW": 126,
      "cyclicLoadMW": 21,
      "motorLoadMW": 33.6,
      "thermalLoadMW": 16.8,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 8.4,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "base",
      "scaleBand": "200–500 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 84,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 380,
      "secondaryKV": 132,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 300,
      "transformerTotalMVA": 600,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "meshed",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 132,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 210,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 132,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 210,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "peak exceeds planned utilization",
      "Extreme heat and dust require equipment derating studies.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "saudi-arabia",
      "r05",
      "arabian-peninsula",
      "hot-arid",
      "bulk-power",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_BULK",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 79,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 6,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-KWT-S14-001",
    "name": "GIS urban substation concept — urban distribution — urban perimeter · Kuwait",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S14",
    "archetypeTitle": "GIS urban substation concept",
    "country": "KWT",
    "countryName": "Kuwait",
    "region": "Arabian Peninsula",
    "subregion": "urban perimeter",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual gis urban substation concept for a urban distribution load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 34,
      "averageLoadMW": 49.3,
      "peakLoadMW": 85,
      "loadFactor": 0.58,
      "criticalLoadMW": 17,
      "cyclicLoadMW": 10.2,
      "motorLoadMW": 8.5,
      "thermalLoadMW": 18.7,
      "interruptibleLoadMW": 5.1,
      "standbyLoadMW": 4.25,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 17,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "hotSeason": {
        "peakLoadMW": 95.2,
        "note": "cooling peak"
      },
      "mildSeason": {
        "peakLoadMW": 69.7,
        "note": "base urban"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 132,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 3,
      "transformerMVA": 40,
      "transformerTotalMVA": 120,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "ring",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 42.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 42.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "peak exceeds planned utilization",
      "Extreme heat and dust require equipment derating studies."
    ],
    "tags": [
      "kuwait",
      "r05",
      "arabian-peninsula",
      "urban-industrial",
      "urban-distribution",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 100,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-QAT-S14-001",
    "name": "GIS urban substation concept — urban distribution — urban perimeter · Qatar",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S14",
    "archetypeTitle": "GIS urban substation concept",
    "country": "QAT",
    "countryName": "Qatar",
    "region": "Arabian Peninsula",
    "subregion": "urban perimeter",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual gis urban substation concept for a urban distribution load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 28,
      "averageLoadMW": 40.6,
      "peakLoadMW": 70,
      "loadFactor": 0.58,
      "criticalLoadMW": 14,
      "cyclicLoadMW": 8.4,
      "motorLoadMW": 7,
      "thermalLoadMW": 15.4,
      "interruptibleLoadMW": 4.2,
      "standbyLoadMW": 3.5,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 14,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "hotSeason": {
        "peakLoadMW": 78.4,
        "note": "cooling peak"
      },
      "mildSeason": {
        "peakLoadMW": 57.4,
        "note": "base urban"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 50,
      "transformerTotalMVA": 100,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "ring",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 35,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 35,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "peak exceeds planned utilization",
      "Extreme heat and dust require equipment derating studies."
    ],
    "tags": [
      "qatar",
      "r05",
      "arabian-peninsula",
      "urban-industrial",
      "urban-distribution",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-DZA-S15-001",
    "name": "AIS desert substation concept — renewable collector — interior desert · Algeria",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S15",
    "archetypeTitle": "AIS desert substation concept",
    "country": "DZA",
    "countryName": "Algeria",
    "region": "Maghreb",
    "subregion": "interior desert",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual ais desert substation concept for a renewable collector load in a hyper-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "extreme",
      "duneRisk": "high",
      "waterAvailability": "low",
      "code": "E01",
      "climate": "hyper-arid desert",
      "terrain": "reg / hamada",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "hyper-arid"
    },
    "territorialRules": [
      "avoid mobile dunes",
      "prefer hamada over erg",
      "dry cleaning for soiling",
      "extreme heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 3,
      "averageLoadMW": 4.5,
      "peakLoadMW": 15,
      "loadFactor": 0.3,
      "criticalLoadMW": 1.5,
      "cyclicLoadMW": 0.75,
      "motorLoadMW": 3,
      "thermalLoadMW": 0.6,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.75,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 3,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 200,
        "acMW": 165,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.212,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 125,
      "transformerTotalMVA": 250,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 7.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 7.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "mobile dune risk — siting constraint",
      "PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "algeria",
      "r02",
      "maghreb",
      "hyper-arid",
      "renewable-collector",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 95,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hyper-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau / hamada",
        "existing grid or road corridor",
        "stable desert plateau"
      ],
      "avoid": [
        "mobile dunes"
      ],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-LBY-S15-001",
    "name": "AIS desert substation concept — urban distribution — interior desert · Libya",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S15",
    "archetypeTitle": "AIS desert substation concept",
    "country": "LBY",
    "countryName": "Libya",
    "region": "Maghreb",
    "subregion": "interior desert",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual ais desert substation concept for a urban distribution load in a hot-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 11.2,
      "averageLoadMW": 16.24,
      "peakLoadMW": 28,
      "loadFactor": 0.58,
      "criticalLoadMW": 5.6,
      "cyclicLoadMW": 3.36,
      "motorLoadMW": 2.8,
      "thermalLoadMW": 6.16,
      "interruptibleLoadMW": 1.68,
      "standbyLoadMW": 1.4,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 5.6,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "hotSeason": {
        "peakLoadMW": 31.36,
        "note": "cooling peak"
      },
      "mildSeason": {
        "peakLoadMW": 22.96,
        "note": "base urban"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 25,
      "transformerTotalMVA": 50,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 14,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 14,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "libya",
      "r02",
      "maghreb",
      "hot-arid",
      "urban-distribution",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-OMN-S16-001",
    "name": "renewable collector substation with BESS — renewable collector — interior desert · Oman",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S16",
    "archetypeTitle": "renewable collector substation with BESS",
    "country": "OMN",
    "countryName": "Oman",
    "region": "Arabian Peninsula",
    "subregion": "interior desert",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual renewable collector substation with bess for a renewable collector load in a hot-arid desert setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 4,
      "averageLoadMW": 6,
      "peakLoadMW": 20,
      "loadFactor": 0.3,
      "criticalLoadMW": 2,
      "cyclicLoadMW": 1,
      "motorLoadMW": 4,
      "thermalLoadMW": 0.8,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 1,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 4,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 90,
        "acMW": 72,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 40,
      "energyMWh": 80,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "renewable-integration",
        "frequency-support"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 63,
      "transformerTotalMVA": 126,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 10,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 10,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "oman",
      "r05",
      "arabian-peninsula",
      "hot-arid",
      "renewable-collector",
      "substation",
      "grid-connected",
      "hv",
      "bess-2h",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-THA-S07-001",
    "name": "132/33 kV — urban distribution — agricultural interior · Thailand",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S07",
    "archetypeTitle": "132/33 kV",
    "country": "THA",
    "countryName": "Thailand",
    "region": "Southeast Transition",
    "subregion": "agricultural interior",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 132/33 kv for a urban distribution load in a tropical humid setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E12",
      "climate": "tropical humid",
      "terrain": "humid lowland",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "tropical-humid"
    },
    "territorialRules": [
      "humidity and vegetation clearance",
      "flood and lightning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 24,
      "averageLoadMW": 34.8,
      "peakLoadMW": 60,
      "loadFactor": 0.58,
      "criticalLoadMW": 12,
      "cyclicLoadMW": 7.2,
      "motorLoadMW": 6,
      "thermalLoadMW": 13.2,
      "interruptibleLoadMW": 3.6,
      "standbyLoadMW": 3,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 12,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "monsoonSeason": {
        "peakLoadMW": 51,
        "note": "cloud / flood access"
      },
      "drySeason": {
        "peakLoadMW": 63.6,
        "note": "clearer resource, dust after dry spell"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 115,
      "secondaryKV": 22,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 50,
      "transformerTotalMVA": 100,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "ring",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 22,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 30,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 22,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 30,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Humid/monsoon conditions dominate siting over desert heuristics."
    ],
    "tags": [
      "thailand",
      "r08",
      "southeast-transition",
      "tropical-humid",
      "urban-distribution",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 100,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "tropical-humid",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "S-MMR-S03-001",
    "name": "33/11 kV dual-transformer substation — urban distribution — agricultural interior · Myanmar",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S03",
    "archetypeTitle": "33/11 kV dual-transformer substation",
    "country": "MMR",
    "countryName": "Myanmar",
    "region": "Southeast Transition",
    "subregion": "agricultural interior",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 33/11 kv dual-transformer substation for a urban distribution load in a monsoon setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "high",
      "floodRisk": "extreme",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E11",
      "climate": "monsoon",
      "terrain": "seasonal floodplain",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "high",
      "envelope": "monsoon"
    },
    "territorialRules": [
      "monsoon flood and lightning",
      "seasonal soiling after dry spells",
      "access during floods"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 8,
      "averageLoadMW": 11.6,
      "peakLoadMW": 20,
      "loadFactor": 0.58,
      "criticalLoadMW": 4,
      "cyclicLoadMW": 2.4,
      "motorLoadMW": 2,
      "thermalLoadMW": 4.4,
      "interruptibleLoadMW": 1.2,
      "standbyLoadMW": 1,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 4,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "monsoonSeason": {
        "peakLoadMW": 17,
        "note": "cloud / flood access"
      },
      "drySeason": {
        "peakLoadMW": 21.2,
        "note": "clearer resource, dust after dry spell"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 10,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 10,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Humid/monsoon conditions dominate siting over desert heuristics.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements.",
      "Drainage and flood elevation require site assessment.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "myanmar",
      "r08",
      "southeast-transition",
      "monsoon",
      "urban-distribution",
      "substation",
      "weak-grid",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 97,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "monsoon",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-BHR-S08-001",
    "name": "132/11 kV industrial — industrial — urban perimeter · Bahrain",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S08",
    "archetypeTitle": "132/11 kV industrial",
    "country": "BHR",
    "countryName": "Bahrain",
    "region": "Arabian Peninsula",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 132/11 kv industrial for a industrial load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 11.52,
      "averageLoadMW": 16.8,
      "peakLoadMW": 24,
      "loadFactor": 0.7,
      "criticalLoadMW": 5.28,
      "cyclicLoadMW": 3.36,
      "motorLoadMW": 6.72,
      "thermalLoadMW": 2.88,
      "interruptibleLoadMW": 2.4,
      "standbyLoadMW": 0.96,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 6.72,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 20,
      "transformerTotalMVA": 40,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 12,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 12,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies."
    ],
    "tags": [
      "bahrain",
      "r05",
      "arabian-peninsula",
      "urban-industrial",
      "industrial",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-SDN-S02-001",
    "name": "33/11 kV radial distribution substation — agriculture — agricultural interior · Sudan",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S02",
    "archetypeTitle": "33/11 kV radial distribution substation",
    "country": "SDN",
    "countryName": "Sudan",
    "region": "Nile / Northeast Africa",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 33/11 kv radial distribution substation for a agriculture load in a agricultural interior setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.62,
      "averageLoadMW": 3.42,
      "peakLoadMW": 9,
      "loadFactor": 0.38,
      "criticalLoadMW": 0.72,
      "cyclicLoadMW": 3.15,
      "motorLoadMW": 3.6,
      "thermalLoadMW": 0.45,
      "interruptibleLoadMW": 2.25,
      "standbyLoadMW": 0.27,
      "seasonalVariationPercent": 55,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 3.6,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 10.35,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 6.3,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 10,
      "transformerTotalMVA": 20,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 4.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 4.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "sudan",
      "r03",
      "nile-northeast-africa",
      "agricultural",
      "agriculture",
      "substation",
      "weak-grid",
      "mv",
      "no-bess",
      "medium"
    ],
    "qualityScore": 97,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "S-IRQ-S07-001",
    "name": "132/33 kV — urban distribution — river valley · Iraq",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S07",
    "archetypeTitle": "132/33 kV",
    "country": "IRQ",
    "countryName": "Iraq",
    "region": "Levant / Mesopotamia",
    "subregion": "river valley",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 132/33 kv for a urban distribution load in a river valley setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "high",
      "corrosionRisk": "medium",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E10",
      "climate": "river valley",
      "terrain": "alluvial valley",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "river-valley"
    },
    "territorialRules": [
      "floodplain setback",
      "alluvial grounding conditions"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 25.6,
      "averageLoadMW": 37.12,
      "peakLoadMW": 64,
      "loadFactor": 0.58,
      "criticalLoadMW": 12.8,
      "cyclicLoadMW": 7.68,
      "motorLoadMW": 6.4,
      "thermalLoadMW": 14.08,
      "interruptibleLoadMW": 3.84,
      "standbyLoadMW": 3.2,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 12.8,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 50,
      "transformerTotalMVA": 100,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 32,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 32,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [],
    "tags": [
      "iraq",
      "r04",
      "levant-mesopotamia",
      "river-valley",
      "urban-distribution",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "river-valley",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 0,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-EGY-S05-001",
    "name": "66/33 kV collector station — renewable collector — interior desert · Egypt",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S05",
    "archetypeTitle": "66/33 kV collector station",
    "country": "EGY",
    "countryName": "Egypt",
    "region": "Nile / Northeast Africa",
    "subregion": "interior desert",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 66/33 kv collector station for a renewable collector load in a hot-arid desert setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 7,
      "averageLoadMW": 10.5,
      "peakLoadMW": 35,
      "loadFactor": 0.3,
      "criticalLoadMW": 3.5,
      "cyclicLoadMW": 1.75,
      "motorLoadMW": 7,
      "thermalLoadMW": 1.4,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 1.75,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 7,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 80,
        "acMW": 65,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 17.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 17.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "egypt",
      "r03",
      "nile-northeast-africa",
      "hot-arid",
      "renewable-collector",
      "substation",
      "grid-connected",
      "hv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-PAK-S09-001",
    "name": "220/132 kV — bulk power — high plateau · Pakistan",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S09",
    "archetypeTitle": "220/132 kV",
    "country": "PAK",
    "countryName": "Pakistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "high plateau",
    "application": "bulk-power",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 220/132 kv for a bulk power load in a semi-arid plateau setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E04",
      "climate": "semi-arid plateau",
      "terrain": "plateau",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "high-plateau"
    },
    "territorialRules": [
      "setback from seasonal wadis",
      "dust and heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 108,
      "averageLoadMW": 132,
      "peakLoadMW": 240,
      "loadFactor": 0.55,
      "criticalLoadMW": 72,
      "cyclicLoadMW": 12,
      "motorLoadMW": 19.2,
      "thermalLoadMW": 9.6,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 4.8,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "base",
      "scaleBand": "200–500 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 48,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 132,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 180,
      "transformerTotalMVA": 360,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "meshed",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 132,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 120,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 132,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 120,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Access and altitude may govern constructability more than resource."
    ],
    "tags": [
      "pakistan",
      "r06",
      "iranian-plateau-central-corridor",
      "high-plateau",
      "bulk-power",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 98,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "high-plateau",
    "loadArchetype": "LOAD_BULK",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-IND-S11-001",
    "name": "220/33 kV renewable collector — renewable collector — agricultural interior · India",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S11",
    "archetypeTitle": "220/33 kV renewable collector",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "agricultural interior",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 220/33 kv renewable collector for a renewable collector load in a agricultural interior setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 3.2,
      "averageLoadMW": 4.8,
      "peakLoadMW": 16,
      "loadFactor": 0.3,
      "criticalLoadMW": 1.6,
      "cyclicLoadMW": 0.8,
      "motorLoadMW": 3.2,
      "thermalLoadMW": 0.64,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.8,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 3.2,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 220,
        "acMW": 180,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.222,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 150,
      "transformerTotalMVA": 300,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 8,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 8,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "agricultural",
      "renewable-collector",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 95,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high-value agricultural soils"
      ],
      "investigate": [
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "S-LKA-S01-001",
    "name": "11/0.4 kV local transformer station — remote settlement — agricultural interior · Sri Lanka",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S01",
    "archetypeTitle": "11/0.4 kV local transformer station",
    "country": "LKA",
    "countryName": "Sri Lanka",
    "region": "South Asia",
    "subregion": "agricultural interior",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 11/0.4 kv local transformer station for a remote settlement load in a tropical humid setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E12",
      "climate": "tropical humid",
      "terrain": "humid lowland",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "tropical-humid"
    },
    "territorialRules": [
      "humidity and vegetation clearance",
      "flood and lightning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.126,
      "averageLoadMW": 0.189,
      "peakLoadMW": 0.45,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.081,
      "cyclicLoadMW": 0.081,
      "motorLoadMW": 0.054,
      "thermalLoadMW": 0.099,
      "interruptibleLoadMW": 0.036,
      "standbyLoadMW": 0.027,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "kW-scale",
      "transientEvents": []
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 0.63,
      "transformerTotalMVA": 1.26,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 0.225,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 0.225,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment."
    ],
    "tags": [
      "sri-lanka",
      "r07",
      "south-asia",
      "tropical-humid",
      "remote-settlement",
      "substation",
      "grid-connected",
      "mv",
      "no-bess",
      "small"
    ],
    "qualityScore": 96,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "tropical-humid",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 75,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-SYR-S06-001",
    "name": "110/33 kV — urban distribution — urban perimeter · Syria",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S06",
    "archetypeTitle": "110/33 kV",
    "country": "SYR",
    "countryName": "Syria",
    "region": "Levant / Mesopotamia",
    "subregion": "urban perimeter",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 110/33 kv for a urban distribution load in a urban industrial setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 16,
      "averageLoadMW": 23.2,
      "peakLoadMW": 40,
      "loadFactor": 0.58,
      "criticalLoadMW": 8,
      "cyclicLoadMW": 4.8,
      "motorLoadMW": 4,
      "thermalLoadMW": 8.8,
      "interruptibleLoadMW": 2.4,
      "standbyLoadMW": 2,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 8,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "hotSeason": {
        "peakLoadMW": 44.8,
        "note": "cooling peak"
      },
      "mildSeason": {
        "peakLoadMW": 32.8,
        "note": "base urban"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 66,
      "secondaryKV": 20,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 31.5,
      "transformerTotalMVA": 63,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 20,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 20,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 20,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 20,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "syria",
      "r04",
      "levant-mesopotamia",
      "urban-industrial",
      "urban-distribution",
      "substation",
      "weak-grid",
      "hv",
      "no-bess",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-OMN-S04-001",
    "name": "66/11 kV substation — water pumping — oasis · Oman",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S04",
    "archetypeTitle": "66/11 kV substation",
    "country": "OMN",
    "countryName": "Oman",
    "region": "Arabian Peninsula",
    "subregion": "oasis",
    "application": "water-pumping",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 66/11 kv substation for a water pumping load in a oasis / hamada setting. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "medium",
      "corrosionRisk": "high",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "medium",
      "code": "E03",
      "climate": "oasis / hamada",
      "terrain": "escarpment and oasis floor",
      "salinityRisk": "high",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "oasis"
    },
    "territorialRules": [
      "avoid sabkha and oasis floor",
      "avoid heritage cores and palm groves",
      "prefer plateau/hamada above the oasis",
      "saline dew: dry cleaning"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 3.3,
      "averageLoadMW": 4.95,
      "peakLoadMW": 11,
      "loadFactor": 0.45,
      "criticalLoadMW": 2.2,
      "cyclicLoadMW": 2.2,
      "motorLoadMW": 2.42,
      "thermalLoadMW": 1.54,
      "interruptibleLoadMW": 1.1,
      "standbyLoadMW": 0.55,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 2.42,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 12.65,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 7.7,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 12.5,
      "transformerTotalMVA": 25,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 5.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 5.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Extreme heat and dust require equipment derating studies.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "oman",
      "r05",
      "arabian-peninsula",
      "oasis",
      "water-pumping",
      "substation",
      "weak-grid",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "oasis",
    "loadArchetype": "LOAD_WATER_PUMPING",
    "siteSuitability": {
      "preferred": [
        "hamada above the oasis floor"
      ],
      "avoid": [
        "heritage cores",
        "sabkha"
      ],
      "investigate": [
        "heritage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "S-IRN-S12-001",
    "name": "400/220 kV bulk transmission interface — bulk power — high plateau · Iran",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S12",
    "archetypeTitle": "400/220 kV bulk transmission interface",
    "country": "IRN",
    "countryName": "Iran",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "high plateau",
    "application": "bulk-power",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 400/220 kv bulk transmission interface for a bulk power load in a semi-arid plateau setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E04",
      "climate": "semi-arid plateau",
      "terrain": "plateau",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "high-plateau"
    },
    "territorialRules": [
      "setback from seasonal wadis",
      "dust and heat derating"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 216,
      "averageLoadMW": 264,
      "peakLoadMW": 480,
      "loadFactor": 0.55,
      "criticalLoadMW": 144,
      "cyclicLoadMW": 24,
      "motorLoadMW": 38.4,
      "thermalLoadMW": 19.2,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 9.6,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "base",
      "scaleBand": "200–500 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 96,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 400,
      "secondaryKV": 230,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 350,
      "transformerTotalMVA": 700,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "meshed",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 230,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 240,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 230,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 240,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Access and altitude may govern constructability more than resource."
    ],
    "tags": [
      "iran",
      "r06",
      "iranian-plateau-central-corridor",
      "high-plateau",
      "bulk-power",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "bulk-power"
    ],
    "qualityScore": 98,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "high-plateau",
    "loadArchetype": "LOAD_BULK",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 91,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-ARE-S03-001",
    "name": "33/11 kV dual-transformer substation — urban distribution — urban perimeter · United Arab Emirates",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S03",
    "archetypeTitle": "33/11 kV dual-transformer substation",
    "country": "ARE",
    "countryName": "United Arab Emirates",
    "region": "Arabian Peninsula",
    "subregion": "urban perimeter",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 33/11 kv dual-transformer substation for a urban distribution load in a urban industrial setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 10.4,
      "averageLoadMW": 15.08,
      "peakLoadMW": 26,
      "loadFactor": 0.58,
      "criticalLoadMW": 5.2,
      "cyclicLoadMW": 3.12,
      "motorLoadMW": 2.6,
      "thermalLoadMW": 5.72,
      "interruptibleLoadMW": 1.56,
      "standbyLoadMW": 1.3,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 5.2,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": {
      "hotSeason": {
        "peakLoadMW": 29.12,
        "note": "cooling peak"
      },
      "mildSeason": {
        "peakLoadMW": 21.32,
        "note": "base urban"
      }
    },
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 20,
      "transformerTotalMVA": 40,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "ring",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 13,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 13,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies."
    ],
    "tags": [
      "united-arab-emirates",
      "r05",
      "arabian-peninsula",
      "urban-industrial",
      "urban-distribution",
      "substation",
      "grid-connected",
      "mv",
      "no-bess",
      "large"
    ],
    "qualityScore": 100,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 87,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 6,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "S-THA-S10-001",
    "name": "220/66 kV — bulk power — agricultural interior · Thailand",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S10",
    "archetypeTitle": "220/66 kV",
    "country": "THA",
    "countryName": "Thailand",
    "region": "Southeast Transition",
    "subregion": "agricultural interior",
    "application": "bulk-power",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual 220/66 kv for a bulk power load in a tropical humid setting. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E12",
      "climate": "tropical humid",
      "terrain": "humid lowland",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "tropical-humid"
    },
    "territorialRules": [
      "humidity and vegetation clearance",
      "flood and lightning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": false,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 85.5,
      "averageLoadMW": 104.5,
      "peakLoadMW": 190,
      "loadFactor": 0.55,
      "criticalLoadMW": 57,
      "cyclicLoadMW": 9.5,
      "motorLoadMW": 15.2,
      "thermalLoadMW": 7.6,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 3.8,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "base",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 38,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": false,
      "technologies": [],
      "energyCalculationMethod": null,
      "pv": null,
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": false
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 230,
      "secondaryKV": 69,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 150,
      "transformerTotalMVA": 300,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "meshed",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 69,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 95,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 69,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 95,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Humid/monsoon conditions dominate siting over desert heuristics."
    ],
    "tags": [
      "thailand",
      "r08",
      "southeast-transition",
      "tropical-humid",
      "bulk-power",
      "substation",
      "grid-connected",
      "ehv",
      "no-bess",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "tropical-humid",
    "loadArchetype": "LOAD_BULK",
    "siteSuitability": {
      "preferred": [],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 75,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 3,
        "generation": 4
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "S-IND-S16-001",
    "name": "renewable collector substation with BESS — renewable collector — interior desert · Morocco",
    "family": "S",
    "familyName": "SUBSTATION",
    "archetype": "S16",
    "archetypeTitle": "renewable collector substation with BESS",
    "country": "MAR",
    "countryName": "Morocco",
    "region": "Atlantic Sahara",
    "subregion": "interior desert",
    "application": "renewable-collector",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual renewable collector substation with bess for a renewable collector load in a hot-arid desert setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 2.8,
      "averageLoadMW": 4.2,
      "peakLoadMW": 14,
      "loadFactor": 0.3,
      "criticalLoadMW": 1.4,
      "cyclicLoadMW": 0.7,
      "motorLoadMW": 2.8,
      "thermalLoadMW": 0.56,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.7,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "auxiliary",
      "scaleBand": "50–200 MW",
      "transientEvents": [
        {
          "name": "transformer energization",
          "type": "transformer-energization",
          "runningMW": 2.8,
          "startingMultiple": 8,
          "durationSeconds": 0.2
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 160,
        "acMW": 130,
        "mounting": "single-axis",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 60,
      "energyMWh": 120,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "renewable-integration",
        "solar-firming"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 220,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 125,
      "transformerTotalMVA": 250,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "collector",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 12,
        "estimatedLoadMW": 7,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 15,
        "estimatedLoadMW": 7,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "morocco",
      "r01",
      "atlantic-sahara",
      "hot-arid",
      "renewable-collector",
      "substation",
      "grid-connected",
      "ehv",
      "bess-2h",
      "utility"
    ],
    "qualityScore": 98,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_UTILITY_AUX",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-EGY-H13-001",
    "name": "Oasis microgrid — water pumping — oasis · Egypt",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H13",
    "archetypeTitle": "Oasis microgrid",
    "country": "EGY",
    "countryName": "Egypt",
    "region": "Nile / Northeast Africa",
    "subregion": "oasis",
    "application": "water-pumping",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual oasis microgrid for a water pumping load in a oasis / hamada setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "medium",
      "corrosionRisk": "high",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "medium",
      "code": "E03",
      "climate": "oasis / hamada",
      "terrain": "escarpment and oasis floor",
      "salinityRisk": "high",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "oasis"
    },
    "territorialRules": [
      "avoid sabkha and oasis floor",
      "avoid heritage cores and palm groves",
      "prefer plateau/hamada above the oasis",
      "saline dew: dry cleaning"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 2.55,
      "averageLoadMW": 3.825,
      "peakLoadMW": 8.5,
      "loadFactor": 0.45,
      "criticalLoadMW": 1.7,
      "cyclicLoadMW": 1.7,
      "motorLoadMW": 1.87,
      "thermalLoadMW": 1.19,
      "interruptibleLoadMW": 0.85,
      "standbyLoadMW": 0.425,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 1.87,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 9.775,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 5.95,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 18,
        "acMW": 14,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.286,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 5,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 10,
      "energyMWh": 40,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "grid-forming",
        "backup",
        "solar-firming"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 12.5,
      "transformerTotalMVA": 25,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 4.25,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 4.25,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Oasis-hamada siting principles (prefer hamada; avoid sabkha, dunes, heritage, palm groves) are conceptual, not a named-project copy."
    ],
    "warnings": [
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "egypt",
      "r03",
      "nile-northeast-africa",
      "oasis",
      "water-pumping",
      "hybrid-/-microgrid",
      "islandable",
      "mv",
      "bess-4h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "oasis",
    "loadArchetype": "LOAD_WATER_PUMPING",
    "siteSuitability": {
      "preferred": [
        "hamada above the oasis floor"
      ],
      "avoid": [
        "high-value agricultural soils",
        "heritage cores",
        "sabkha"
      ],
      "investigate": [
        "agricultural impact",
        "heritage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "H-OMN-H13-001",
    "name": "Oasis microgrid — water pumping — oasis · Oman",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H13",
    "archetypeTitle": "Oasis microgrid",
    "country": "OMN",
    "countryName": "Oman",
    "region": "Arabian Peninsula",
    "subregion": "oasis",
    "application": "water-pumping",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual oasis microgrid for a water pumping load in a oasis / hamada setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "medium",
      "corrosionRisk": "high",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "medium",
      "code": "E03",
      "climate": "oasis / hamada",
      "terrain": "escarpment and oasis floor",
      "salinityRisk": "high",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "oasis"
    },
    "territorialRules": [
      "avoid sabkha and oasis floor",
      "avoid heritage cores and palm groves",
      "prefer plateau/hamada above the oasis",
      "saline dew: dry cleaning"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 1.86,
      "averageLoadMW": 2.79,
      "peakLoadMW": 6.2,
      "loadFactor": 0.45,
      "criticalLoadMW": 1.24,
      "cyclicLoadMW": 1.24,
      "motorLoadMW": 1.364,
      "thermalLoadMW": 0.868,
      "interruptibleLoadMW": 0.62,
      "standbyLoadMW": 0.31,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 1.364,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 7.13,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 4.34,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 14,
        "acMW": 11,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.273,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 4,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 8,
      "energyMWh": 32,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "grid-forming",
        "backup"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 10,
      "transformerTotalMVA": 20,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 3.1,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 3.1,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "oman",
      "r05",
      "arabian-peninsula",
      "oasis",
      "water-pumping",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-4h",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "oasis",
    "loadArchetype": "LOAD_WATER_PUMPING",
    "siteSuitability": {
      "preferred": [
        "hamada above the oasis floor"
      ],
      "avoid": [
        "high-value agricultural soils",
        "heritage cores",
        "sabkha"
      ],
      "investigate": [
        "agricultural impact",
        "heritage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "H-MRT-H01-001",
    "name": "Isolated PV+BESS microgrid — remote settlement — remote settlement · Mauritania",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H01",
    "archetypeTitle": "Isolated PV+BESS microgrid",
    "country": "MRT",
    "countryName": "Mauritania",
    "region": "Atlantic Sahara",
    "subregion": "remote settlement",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual isolated pv+bess microgrid for a remote settlement load in a remote infrastructure corridor setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E14",
      "climate": "remote infrastructure corridor",
      "terrain": "sparse corridor",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "extreme",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "long logistics chain",
      "security of remote assets",
      "limited water"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.118,
      "averageLoadMW": 0.176,
      "peakLoadMW": 0.42,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.076,
      "cyclicLoadMW": 0.076,
      "motorLoadMW": 0.05,
      "thermalLoadMW": 0.092,
      "interruptibleLoadMW": 0.034,
      "standbyLoadMW": 0.025,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "sub-MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.063,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 1.1,
        "acMW": 0.9,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.222,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 0.35,
      "energyMWh": 2.1,
      "durationHours": 6,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "grid-forming",
        "backup"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 1,
      "transformerMVA": 0.63,
      "transformerTotalMVA": 0.63,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.21,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.21,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "High soiling may increase O&M requirements.",
      "Remote access: logistics and O&M need a site study."
    ],
    "tags": [
      "mauritania",
      "r01",
      "atlantic-sahara",
      "remote-corridor",
      "remote-settlement",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-6h+",
      "small"
    ],
    "qualityScore": 98,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 100,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-SDN-H02-001",
    "name": "PV+BESS+diesel microgrid — remote settlement — remote settlement · Sudan",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H02",
    "archetypeTitle": "PV+BESS+diesel microgrid",
    "country": "SDN",
    "countryName": "Sudan",
    "region": "Nile / Northeast Africa",
    "subregion": "remote settlement",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv+bess+diesel microgrid for a remote settlement load in a remote infrastructure corridor setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E14",
      "climate": "remote infrastructure corridor",
      "terrain": "sparse corridor",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "extreme",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "long logistics chain",
      "security of remote assets",
      "limited water"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.448,
      "averageLoadMW": 0.672,
      "peakLoadMW": 1.6,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.288,
      "cyclicLoadMW": 0.288,
      "motorLoadMW": 0.192,
      "thermalLoadMW": 0.352,
      "interruptibleLoadMW": 0.128,
      "standbyLoadMW": 0.096,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.24,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 3.2,
        "acMW": 2.6,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 1.5,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 1.2,
      "energyMWh": 4.8,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "grid-forming",
        "backup"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 1.6,
      "transformerTotalMVA": 3.2,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.8,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.8,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "sudan",
      "r03",
      "nile-northeast-africa",
      "remote-corridor",
      "remote-settlement",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 98,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-PAK-H03-001",
    "name": "Weak-grid PV+BESS system — industrial — urban perimeter · Pakistan",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H03",
    "archetypeTitle": "Weak-grid PV+BESS system",
    "country": "PAK",
    "countryName": "Pakistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual weak-grid pv+bess system for a industrial load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 11.52,
      "averageLoadMW": 16.8,
      "peakLoadMW": 24,
      "loadFactor": 0.7,
      "criticalLoadMW": 5.28,
      "cyclicLoadMW": 3.36,
      "motorLoadMW": 6.72,
      "thermalLoadMW": 2.88,
      "interruptibleLoadMW": 2.4,
      "standbyLoadMW": 0.96,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 6.72,
          "startingMultiple": 6,
          "durationSeconds": 4
        },
        {
          "name": "process start",
          "type": "process-start",
          "runningMW": 4.8,
          "startingMultiple": 4,
          "durationSeconds": 8
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 20,
        "acMW": 16,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 12,
      "energyMWh": 24,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "peak-shaving",
        "frequency-support"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 132,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 25,
      "transformerTotalMVA": 50,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 12,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 12,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Access and altitude may govern constructability more than resource.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "pakistan",
      "r06",
      "iranian-plateau-central-corridor",
      "urban-industrial",
      "industrial",
      "hybrid-/-microgrid",
      "weak-grid",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-IRQ-H04-001",
    "name": "Islanded industrial microgrid — industrial — urban perimeter · Iraq",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H04",
    "archetypeTitle": "Islanded industrial microgrid",
    "country": "IRQ",
    "countryName": "Iraq",
    "region": "Levant / Mesopotamia",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual islanded industrial microgrid for a industrial load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 8.64,
      "averageLoadMW": 12.6,
      "peakLoadMW": 18,
      "loadFactor": 0.7,
      "criticalLoadMW": 3.96,
      "cyclicLoadMW": 2.52,
      "motorLoadMW": 5.04,
      "thermalLoadMW": 2.16,
      "interruptibleLoadMW": 1.8,
      "standbyLoadMW": 0.72,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "process start",
          "type": "process-start",
          "runningMW": 3.6,
          "startingMultiple": 4,
          "durationSeconds": 8
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 12,
        "acMW": 10,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 16,
        "role": "island baseload / backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 10,
      "energyMWh": 30,
      "durationHours": 3,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "grid-forming",
        "peak-shaving"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 20,
      "transformerTotalMVA": 40,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 9,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 9,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [],
    "tags": [
      "iraq",
      "r04",
      "levant-mesopotamia",
      "urban-industrial",
      "industrial",
      "hybrid-/-microgrid",
      "islandable",
      "mv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 94,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 0,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 6
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-SDN-H05-001",
    "name": "Remote agricultural microgrid — agriculture — agricultural interior · Sudan",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H05",
    "archetypeTitle": "Remote agricultural microgrid",
    "country": "SDN",
    "countryName": "Sudan",
    "region": "Nile / Northeast Africa",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual remote agricultural microgrid for a agriculture load in a agricultural interior setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.825,
      "averageLoadMW": 1.925,
      "peakLoadMW": 5.5,
      "loadFactor": 0.35,
      "criticalLoadMW": 0.33,
      "cyclicLoadMW": 2.475,
      "motorLoadMW": 2.75,
      "thermalLoadMW": 0.22,
      "interruptibleLoadMW": 1.65,
      "standbyLoadMW": 0.11,
      "seasonalVariationPercent": 65,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 2.75,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 6.325,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 3.85,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 9,
        "acMW": 7.2,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 2,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 3,
      "energyMWh": 12,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "energy-shifting",
        "backup"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 8,
      "transformerTotalMVA": 16,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 2.75,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 2.75,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "high seasonal variation",
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "sudan",
      "r03",
      "nile-northeast-africa",
      "agricultural",
      "agriculture",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 100,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high-value agricultural soils"
      ],
      "investigate": [
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "H-IND-H06-001",
    "name": "Water pumping microgrid — water pumping — river valley · India",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H06",
    "archetypeTitle": "Water pumping microgrid",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "river valley",
    "application": "water-pumping",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual water pumping microgrid for a water pumping load in a river valley setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "high",
      "corrosionRisk": "medium",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E10",
      "climate": "river valley",
      "terrain": "alluvial valley",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "river-valley"
    },
    "territorialRules": [
      "floodplain setback",
      "alluvial grounding conditions"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 0.96,
      "averageLoadMW": 2.016,
      "peakLoadMW": 4.8,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.72,
      "cyclicLoadMW": 1.92,
      "motorLoadMW": 2.64,
      "thermalLoadMW": 0.096,
      "interruptibleLoadMW": 0.96,
      "standbyLoadMW": 0.144,
      "seasonalVariationPercent": 40,
      "dominantLoadType": "motor",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 2.64,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 5.52,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 3.36,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 8,
        "acMW": 6.5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 2.5,
      "energyMWh": 12.5,
      "durationHours": 5,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 8,
      "transformerTotalMVA": 16,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 2.4,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 2.4,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Drainage and flood elevation require site assessment.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "river-valley",
      "water-pumping",
      "hybrid-/-microgrid",
      "weak-grid",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 97,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "river-valley",
    "loadArchetype": "LOAD_WATER_PUMPING",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 9,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-ARE-H07-001",
    "name": "Desalination microgrid — desalination — coastal zone · United Arab Emirates",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H07",
    "archetypeTitle": "Desalination microgrid",
    "country": "ARE",
    "countryName": "United Arab Emirates",
    "region": "Arabian Peninsula",
    "subregion": "coastal zone",
    "application": "desalination",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual desalination microgrid for a desalination load in a coastal saline setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength medium), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "extreme",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E06",
      "climate": "coastal saline",
      "terrain": "coastal sabkha fringe",
      "salinityRisk": "extreme",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "coastal-saline"
    },
    "territorialRules": [
      "avoid sabkha",
      "high corrosion class for hardware",
      "saline aerosol on insulators"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 19.6,
      "averageLoadMW": 22.96,
      "peakLoadMW": 28,
      "loadFactor": 0.82,
      "criticalLoadMW": 11.2,
      "cyclicLoadMW": 2.24,
      "motorLoadMW": 15.4,
      "thermalLoadMW": 1.4,
      "interruptibleLoadMW": 1.4,
      "standbyLoadMW": 1.12,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "continuous-industrial",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 15.4,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        },
        {
          "name": "compressor start",
          "type": "compressor-start",
          "runningMW": 5.6,
          "startingMultiple": 6.5,
          "durationSeconds": 0.4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 40,
        "acMW": 32,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 12,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 15,
      "energyMWh": 45,
      "durationHours": 3,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 14,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 14,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme salinity / corrosion",
      "Extreme heat and dust require equipment derating studies.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "united-arab-emirates",
      "r05",
      "arabian-peninsula",
      "coastal-saline",
      "desalination",
      "hybrid-/-microgrid",
      "islandable",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "coastal-saline",
    "loadArchetype": "LOAD_DESALINATION",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "sabkha"
      ],
      "investigate": [
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-KWT-H07-001",
    "name": "Desalination microgrid — desalination — coastal zone · Kuwait",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H07",
    "archetypeTitle": "Desalination microgrid",
    "country": "KWT",
    "countryName": "Kuwait",
    "region": "Arabian Peninsula",
    "subregion": "coastal zone",
    "application": "desalination",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual desalination microgrid for a desalination load in a coastal saline setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "extreme",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E06",
      "climate": "coastal saline",
      "terrain": "coastal sabkha fringe",
      "salinityRisk": "extreme",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "coastal-saline"
    },
    "territorialRules": [
      "avoid sabkha",
      "high corrosion class for hardware",
      "saline aerosol on insulators"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 15.4,
      "averageLoadMW": 18.04,
      "peakLoadMW": 22,
      "loadFactor": 0.82,
      "criticalLoadMW": 8.8,
      "cyclicLoadMW": 1.76,
      "motorLoadMW": 12.1,
      "thermalLoadMW": 1.1,
      "interruptibleLoadMW": 1.1,
      "standbyLoadMW": 0.88,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "continuous-industrial",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 12.1,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 30,
        "acMW": 24,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 10,
      "energyMWh": 20,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 132,
      "secondaryKV": 33,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 31.5,
      "transformerTotalMVA": 63,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 11,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 33,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 11,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme salinity / corrosion",
      "Extreme heat and dust require equipment derating studies.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "kuwait",
      "r05",
      "arabian-peninsula",
      "coastal-saline",
      "desalination",
      "hybrid-/-microgrid",
      "grid-connected",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "coastal-saline",
    "loadArchetype": "LOAD_DESALINATION",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "sabkha"
      ],
      "investigate": [
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-MRT-H08-001",
    "name": "Mining microgrid — mining — industrial corridor · Mauritania",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H08",
    "archetypeTitle": "Mining microgrid",
    "country": "MRT",
    "countryName": "Mauritania",
    "region": "Atlantic Sahara",
    "subregion": "industrial corridor",
    "application": "mining",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual mining microgrid for a mining load in a mining / extraction zone setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E13",
      "climate": "mining / extraction zone",
      "terrain": "extractive plateau",
      "salinityRisk": "medium",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "dust from extraction",
      "heavy-vehicle access",
      "avoid unconsolidated spoil"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 11,
      "averageLoadMW": 15.84,
      "peakLoadMW": 22,
      "loadFactor": 0.72,
      "criticalLoadMW": 5.5,
      "cyclicLoadMW": 2.2,
      "motorLoadMW": 8.8,
      "thermalLoadMW": 1.32,
      "interruptibleLoadMW": 1.76,
      "standbyLoadMW": 0.66,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor-industrial",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "conveyor start",
          "type": "conveyor-start",
          "runningMW": 8.8,
          "startingMultiple": 5,
          "durationSeconds": 5
        },
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 8.8,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 18,
        "acMW": 15,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 18,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 8,
      "energyMWh": 16,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 25,
      "transformerTotalMVA": 50,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 11,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 11,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "High soiling may increase O&M requirements.",
      "Remote access: logistics and O&M need a site study."
    ],
    "tags": [
      "mauritania",
      "r01",
      "atlantic-sahara",
      "remote-corridor",
      "mining",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_MINING",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-IRN-H08-001",
    "name": "Mining microgrid — mining — industrial corridor · Iran",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H08",
    "archetypeTitle": "Mining microgrid",
    "country": "IRN",
    "countryName": "Iran",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "industrial corridor",
    "application": "mining",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual mining microgrid for a mining load in a mining / extraction zone setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E13",
      "climate": "mining / extraction zone",
      "terrain": "extractive plateau",
      "salinityRisk": "medium",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "dust from extraction",
      "heavy-vehicle access",
      "avoid unconsolidated spoil"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 17.5,
      "averageLoadMW": 25.2,
      "peakLoadMW": 35,
      "loadFactor": 0.72,
      "criticalLoadMW": 8.75,
      "cyclicLoadMW": 3.5,
      "motorLoadMW": 14,
      "thermalLoadMW": 2.1,
      "interruptibleLoadMW": 2.8,
      "standbyLoadMW": 1.05,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor-industrial",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "conveyor start",
          "type": "conveyor-start",
          "runningMW": 14,
          "startingMultiple": 5,
          "durationSeconds": 5
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 25,
        "acMW": 20,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 24,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 12,
      "energyMWh": 24,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 31.5,
      "transformerTotalMVA": 63,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 17.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 17.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "Access and altitude may govern constructability more than resource.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "iran",
      "r06",
      "iranian-plateau-central-corridor",
      "remote-corridor",
      "mining",
      "hybrid-/-microgrid",
      "off-grid",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_MINING",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-ARE-H09-001",
    "name": "Airport / logistics microgrid — airport — coastal zone · United Arab Emirates",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H09",
    "archetypeTitle": "Airport / logistics microgrid",
    "country": "ARE",
    "countryName": "United Arab Emirates",
    "region": "Arabian Peninsula",
    "subregion": "coastal zone",
    "application": "airport",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual airport / logistics microgrid for a airport load in a coastal saline setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength medium), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "extreme",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E06",
      "climate": "coastal saline",
      "terrain": "coastal sabkha fringe",
      "salinityRisk": "extreme",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "coastal-saline"
    },
    "territorialRules": [
      "avoid sabkha",
      "high corrosion class for hardware",
      "saline aerosol on insulators"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 4.48,
      "averageLoadMW": 6.72,
      "peakLoadMW": 14,
      "loadFactor": 0.48,
      "criticalLoadMW": 6.3,
      "cyclicLoadMW": 2.1,
      "motorLoadMW": 2.52,
      "thermalLoadMW": 2.24,
      "interruptibleLoadMW": 1.12,
      "standbyLoadMW": 0.7,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 2.52,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 10,
        "acMW": 8,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 10,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 8,
      "energyMWh": 16,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 7,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 7,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme salinity / corrosion",
      "Extreme heat and dust require equipment derating studies.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "united-arab-emirates",
      "r05",
      "arabian-peninsula",
      "coastal-saline",
      "airport",
      "hybrid-/-microgrid",
      "islandable",
      "mv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "coastal-saline",
    "loadArchetype": "LOAD_PORT_LOGISTICS",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "sabkha"
      ],
      "investigate": [
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-THA-H09-001",
    "name": "Airport / logistics microgrid — logistics — coastal zone · Thailand",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H09",
    "archetypeTitle": "Airport / logistics microgrid",
    "country": "THA",
    "countryName": "Thailand",
    "region": "Southeast Transition",
    "subregion": "coastal zone",
    "application": "logistics",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual airport / logistics microgrid for a logistics load in a hot-humid coastal setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E07",
      "climate": "hot-humid coastal",
      "terrain": "coastal plain",
      "salinityRisk": "high",
      "vegetationConstraint": "medium",
      "accessDifficulty": "low",
      "envelope": "hot-humid-coastal"
    },
    "territorialRules": [
      "flood elevation",
      "humidity/corrosion",
      "storm surge setback"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 2.7,
      "averageLoadMW": 4.5,
      "peakLoadMW": 9,
      "loadFactor": 0.5,
      "criticalLoadMW": 1.62,
      "cyclicLoadMW": 1.8,
      "motorLoadMW": 2.52,
      "thermalLoadMW": 0.9,
      "interruptibleLoadMW": 0.9,
      "standbyLoadMW": 0.36,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "conveyor start",
          "type": "conveyor-start",
          "runningMW": 2.52,
          "startingMultiple": 5,
          "durationSeconds": 5
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 8,
        "acMW": 6.5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 4,
      "energyMWh": 8,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 22,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 12.5,
      "transformerTotalMVA": 25,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 4.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 4.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Humid/monsoon conditions dominate siting over desert heuristics.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "Corrosion protection requires detailed material selection."
    ],
    "tags": [
      "thailand",
      "r08",
      "southeast-transition",
      "hot-humid-coastal",
      "logistics",
      "hybrid-/-microgrid",
      "grid-connected",
      "mv",
      "bess-2h",
      "medium"
    ],
    "qualityScore": 98,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-humid-coastal",
    "loadArchetype": "LOAD_PORT_LOGISTICS",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland"
      ],
      "investigate": [
        "drainage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 81,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-JOR-H10-001",
    "name": "Hospital / critical infrastructure microgrid — critical infrastructure — urban perimeter · Jordan",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H10",
    "archetypeTitle": "Hospital / critical infrastructure microgrid",
    "country": "JOR",
    "countryName": "Jordan",
    "region": "Levant / Mesopotamia",
    "subregion": "urban perimeter",
    "application": "critical-infrastructure",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual hospital / critical infrastructure microgrid for a critical infrastructure load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength medium), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 1.98,
      "averageLoadMW": 2.592,
      "peakLoadMW": 3.6,
      "loadFactor": 0.72,
      "criticalLoadMW": 2.52,
      "cyclicLoadMW": 0.288,
      "motorLoadMW": 0.432,
      "thermalLoadMW": 0.648,
      "interruptibleLoadMW": 0.072,
      "standbyLoadMW": 0.216,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "critical continuous load",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "compressor start",
          "type": "compressor-start",
          "runningMW": 0.72,
          "startingMultiple": 6.5,
          "durationSeconds": 0.4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 4,
        "acMW": 3.2,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 3.5,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 2.5,
      "energyMWh": 10,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "backup",
        "grid-forming"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 2.5,
      "transformerTotalMVA": 5,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 1.8,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 1.8,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "peak exceeds planned utilization"
    ],
    "tags": [
      "jordan",
      "r04",
      "levant-mesopotamia",
      "urban-industrial",
      "critical-infrastructure",
      "hybrid-/-microgrid",
      "islandable",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 98,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_CRITICAL_INFRASTRUCTURE",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 94,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 6
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-LBN-H10-001",
    "name": "Hospital / critical infrastructure microgrid — critical infrastructure — urban perimeter · Lebanon",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H10",
    "archetypeTitle": "Hospital / critical infrastructure microgrid",
    "country": "LBN",
    "countryName": "Lebanon",
    "region": "Levant / Mesopotamia",
    "subregion": "urban perimeter",
    "application": "critical-infrastructure",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual hospital / critical infrastructure microgrid for a critical infrastructure load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 1.54,
      "averageLoadMW": 2.016,
      "peakLoadMW": 2.8,
      "loadFactor": 0.72,
      "criticalLoadMW": 1.96,
      "cyclicLoadMW": 0.224,
      "motorLoadMW": 0.336,
      "thermalLoadMW": 0.504,
      "interruptibleLoadMW": 0.056,
      "standbyLoadMW": 0.168,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "critical continuous load",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "compressor start",
          "type": "compressor-start",
          "runningMW": 0.56,
          "startingMultiple": 6.5,
          "durationSeconds": 0.4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 3,
        "acMW": 2.4,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 2.5,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 2,
      "energyMWh": 8,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 20,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 2,
      "transformerTotalMVA": 4,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 1.4,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 1.4,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "peak exceeds planned utilization",
      "weak-grid context",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "lebanon",
      "r04",
      "levant-mesopotamia",
      "urban-industrial",
      "critical-infrastructure",
      "hybrid-/-microgrid",
      "islandable",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 92,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_CRITICAL_INFRASTRUCTURE",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 94,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 6
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-YEM-H11-001",
    "name": "Telecommunications / repeater energy hub — telecommunications — remote settlement · Yemen",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H11",
    "archetypeTitle": "Telecommunications / repeater energy hub",
    "country": "YEM",
    "countryName": "Yemen",
    "region": "Arabian Peninsula",
    "subregion": "remote settlement",
    "application": "telecommunications",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual telecommunications / repeater energy hub for a telecommunications load in a remote infrastructure corridor setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E14",
      "climate": "remote infrastructure corridor",
      "terrain": "sparse corridor",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "extreme",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "long logistics chain",
      "security of remote assets",
      "limited water"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.064,
      "averageLoadMW": 0.07,
      "peakLoadMW": 0.08,
      "loadFactor": 0.88,
      "criticalLoadMW": 0.072,
      "cyclicLoadMW": 0.003,
      "motorLoadMW": 0.006,
      "thermalLoadMW": 0.01,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.004,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "electronic",
      "scaleBand": "kW-scale",
      "transientEvents": []
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 0.18,
        "acMW": 0.14,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.286,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 0.06,
      "energyMWh": 0.48,
      "durationHours": 8,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "backup",
        "grid-forming"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 0.4,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 1,
      "transformerMVA": 0.16,
      "transformerTotalMVA": 0.16,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "NONE",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.04,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.04,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "yemen",
      "r05",
      "arabian-peninsula",
      "remote-corridor",
      "telecommunications",
      "hybrid-/-microgrid",
      "off-grid",
      "lv",
      "bess-6h+",
      "small"
    ],
    "qualityScore": 96,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_TELECOM",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 84,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 7,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-AFG-H11-001",
    "name": "Telecommunications / repeater energy hub — telecommunications — mountain region · Afghanistan",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H11",
    "archetypeTitle": "Telecommunications / repeater energy hub",
    "country": "AFG",
    "countryName": "Afghanistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "mountain region",
    "application": "telecommunications",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual telecommunications / repeater energy hub for a telecommunications load in a mountain / highland setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "low",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "low",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E05",
      "climate": "mountain / highland",
      "terrain": "highland",
      "salinityRisk": "low",
      "vegetationConstraint": "medium",
      "accessDifficulty": "high",
      "envelope": "mountain"
    },
    "territorialRules": [
      "access and snow/ice on access roads",
      "altitude derating",
      "avoid steep unstable slopes"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.048,
      "averageLoadMW": 0.053,
      "peakLoadMW": 0.06,
      "loadFactor": 0.88,
      "criticalLoadMW": 0.054,
      "cyclicLoadMW": 0.002,
      "motorLoadMW": 0.005,
      "thermalLoadMW": 0.007,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.003,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "electronic",
      "scaleBand": "kW-scale",
      "transientEvents": []
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 0.15,
        "acMW": 0.12,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 0.05,
      "energyMWh": 0.4,
      "durationHours": 8,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "backup"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 0.4,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 1,
      "transformerMVA": 0.1,
      "transformerTotalMVA": 0.1,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "NONE",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.03,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.03,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Access and altitude may govern constructability more than resource.",
      "Remote access: logistics and O&M need a site study."
    ],
    "tags": [
      "afghanistan",
      "r06",
      "iranian-plateau-central-corridor",
      "mountain",
      "telecommunications",
      "hybrid-/-microgrid",
      "off-grid",
      "lv",
      "bess-6h+",
      "small"
    ],
    "qualityScore": 96,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "mountain",
    "loadArchetype": "LOAD_TELECOM",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 88,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-LBY-H12-001",
    "name": "Remote settlement microgrid — remote settlement — interior desert · Morocco",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H12",
    "archetypeTitle": "Remote settlement microgrid",
    "country": "MAR",
    "countryName": "Morocco",
    "region": "Atlantic Sahara",
    "subregion": "interior desert",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual remote settlement microgrid for a remote settlement load in a hot-arid desert setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E02",
      "climate": "hot-arid desert",
      "terrain": "desert plain",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "medium",
      "envelope": "hot-arid"
    },
    "territorialRules": [
      "prefer compact hamada parcels",
      "dust sealing for outdoor gear",
      "limit water use for cleaning"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.588,
      "averageLoadMW": 0.882,
      "peakLoadMW": 2.1,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.378,
      "cyclicLoadMW": 0.378,
      "motorLoadMW": 0.252,
      "thermalLoadMW": 0.462,
      "interruptibleLoadMW": 0.168,
      "standbyLoadMW": 0.126,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.315,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 4.5,
        "acMW": 3.6,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 1.8,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 1.6,
      "energyMWh": 8,
      "durationHours": 5,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 2,
      "transformerTotalMVA": 4,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 1.05,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 1.05,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "morocco",
      "r01",
      "atlantic-sahara",
      "hot-arid",
      "remote-settlement",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 98,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-arid",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-MMR-H12-001",
    "name": "Remote settlement microgrid — remote settlement — agricultural interior · Myanmar",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H12",
    "archetypeTitle": "Remote settlement microgrid",
    "country": "MMR",
    "countryName": "Myanmar",
    "region": "Southeast Transition",
    "subregion": "agricultural interior",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual remote settlement microgrid for a remote settlement load in a tropical humid setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E12",
      "climate": "tropical humid",
      "terrain": "humid lowland",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "tropical-humid"
    },
    "territorialRules": [
      "humidity and vegetation clearance",
      "flood and lightning"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.336,
      "averageLoadMW": 0.504,
      "peakLoadMW": 1.2,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.216,
      "cyclicLoadMW": 0.216,
      "motorLoadMW": 0.144,
      "thermalLoadMW": 0.264,
      "interruptibleLoadMW": 0.096,
      "standbyLoadMW": 0.072,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.18,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 2.2,
        "acMW": 1.8,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.222,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 0.9,
      "energyMWh": 5.4,
      "durationHours": 6,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 1.25,
      "transformerTotalMVA": 2.5,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.6,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.6,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Humid/monsoon conditions dominate siting over desert heuristics.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "myanmar",
      "r08",
      "southeast-transition",
      "tropical-humid",
      "remote-settlement",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-6h+",
      "medium"
    ],
    "qualityScore": 98,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "tropical-humid",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-JOR-H14-001",
    "name": "Border / remote infrastructure microgrid — logistics — remote settlement · Jordan",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H14",
    "archetypeTitle": "Border / remote infrastructure microgrid",
    "country": "JOR",
    "countryName": "Jordan",
    "region": "Levant / Mesopotamia",
    "subregion": "remote settlement",
    "application": "logistics",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual border / remote infrastructure microgrid for a logistics load in a remote infrastructure corridor setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E14",
      "climate": "remote infrastructure corridor",
      "terrain": "sparse corridor",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "extreme",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "long logistics chain",
      "security of remote assets",
      "limited water"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.42,
      "averageLoadMW": 0.7,
      "peakLoadMW": 1.4,
      "loadFactor": 0.5,
      "criticalLoadMW": 0.252,
      "cyclicLoadMW": 0.28,
      "motorLoadMW": 0.392,
      "thermalLoadMW": 0.14,
      "interruptibleLoadMW": 0.14,
      "standbyLoadMW": 0.056,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.392,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 2.5,
        "acMW": 2,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 1.2,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 1,
      "energyMWh": 4,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 1.6,
      "transformerTotalMVA": 3.2,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.7,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.7,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "jordan",
      "r04",
      "levant-mesopotamia",
      "remote-corridor",
      "logistics",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 98,
    "regionId": "R04",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_PORT_LOGISTICS",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R04",
      "regionalFitScore": 88,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 6,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 6
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-PAK-H14-001",
    "name": "Border / remote infrastructure microgrid — telecommunications — remote settlement · Pakistan",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H14",
    "archetypeTitle": "Border / remote infrastructure microgrid",
    "country": "PAK",
    "countryName": "Pakistan",
    "region": "Iranian Plateau / Central Corridor",
    "subregion": "remote settlement",
    "application": "telecommunications",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual border / remote infrastructure microgrid for a telecommunications load in a remote infrastructure corridor setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "low",
      "corrosionRisk": "medium",
      "floodRisk": "low",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "low",
      "code": "E14",
      "climate": "remote infrastructure corridor",
      "terrain": "sparse corridor",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "extreme",
      "envelope": "remote-corridor"
    },
    "territorialRules": [
      "long logistics chain",
      "security of remote assets",
      "limited water"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.2,
      "averageLoadMW": 0.22,
      "peakLoadMW": 0.25,
      "loadFactor": 0.88,
      "criticalLoadMW": 0.225,
      "cyclicLoadMW": 0.01,
      "motorLoadMW": 0.02,
      "thermalLoadMW": 0.03,
      "interruptibleLoadMW": 0,
      "standbyLoadMW": 0.013,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "electronic",
      "scaleBand": "kW-scale",
      "transientEvents": []
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 0.6,
        "acMW": 0.48,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 0.15,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 0.2,
      "energyMWh": 1.6,
      "durationHours": 8,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 1,
      "transformerMVA": 0.4,
      "transformerTotalMVA": 0.4,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.125,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.125,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Access and altitude may govern constructability more than resource.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "pakistan",
      "r06",
      "iranian-plateau-central-corridor",
      "remote-corridor",
      "telecommunications",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-6h+",
      "small"
    ],
    "qualityScore": 96,
    "regionId": "R06",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "remote-corridor",
    "loadArchetype": "LOAD_TELECOM",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R06",
      "regionalFitScore": 88,
      "environmentFitScore": 22,
      "applicationFitScore": 8,
      "assumptionsCount": 7,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 8,
        "grid": 12,
        "scale": 12,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-IND-H15-001",
    "name": "Industrial park microgrid — industrial — urban perimeter · India",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H15",
    "archetypeTitle": "Industrial park microgrid",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual industrial park microgrid for a industrial load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength medium), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 14.4,
      "averageLoadMW": 21,
      "peakLoadMW": 30,
      "loadFactor": 0.7,
      "criticalLoadMW": 6.6,
      "cyclicLoadMW": 4.2,
      "motorLoadMW": 8.4,
      "thermalLoadMW": 3.6,
      "interruptibleLoadMW": 3,
      "standbyLoadMW": 1.2,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "process start",
          "type": "process-start",
          "runningMW": 6,
          "startingMultiple": 4,
          "durationSeconds": 8
        },
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 8.4,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 22,
        "acMW": 18,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.222,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 10,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 12,
      "energyMWh": 24,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 132,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 31.5,
      "transformerTotalMVA": 63,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 15,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 15,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "urban-industrial",
      "industrial",
      "hybrid-/-microgrid",
      "islandable",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 92
  },
  {
    "id": "H-THA-H15-001",
    "name": "Industrial park microgrid — industrial — urban perimeter · Thailand",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H15",
    "archetypeTitle": "Industrial park microgrid",
    "country": "THA",
    "countryName": "Thailand",
    "region": "Southeast Transition",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual industrial park microgrid for a industrial load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 8.64,
      "averageLoadMW": 12.6,
      "peakLoadMW": 18,
      "loadFactor": 0.7,
      "criticalLoadMW": 3.96,
      "cyclicLoadMW": 2.52,
      "motorLoadMW": 5.04,
      "thermalLoadMW": 2.16,
      "interruptibleLoadMW": 1.8,
      "standbyLoadMW": 0.72,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 5.04,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 14,
        "acMW": 11,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.273,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 8,
      "energyMWh": 16,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 115,
      "secondaryKV": 22,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 20,
      "transformerTotalMVA": 40,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 22,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 9,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 22,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 9,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Humid/monsoon conditions dominate siting over desert heuristics."
    ],
    "tags": [
      "thailand",
      "r08",
      "southeast-transition",
      "urban-industrial",
      "industrial",
      "hybrid-/-microgrid",
      "grid-connected",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-ARE-H16-001",
    "name": "Port / coastal energy microgrid — port — coastal zone · United Arab Emirates",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H16",
    "archetypeTitle": "Port / coastal energy microgrid",
    "country": "ARE",
    "countryName": "United Arab Emirates",
    "region": "Arabian Peninsula",
    "subregion": "coastal zone",
    "application": "port",
    "conceptual": true,
    "featured": true,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual port / coastal energy microgrid for a port load in a hot-humid coastal setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength medium), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E07",
      "climate": "hot-humid coastal",
      "terrain": "coastal plain",
      "salinityRisk": "high",
      "vegetationConstraint": "medium",
      "accessDifficulty": "low",
      "envelope": "hot-humid-coastal"
    },
    "territorialRules": [
      "flood elevation",
      "humidity/corrosion",
      "storm surge setback"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 6,
      "averageLoadMW": 10.4,
      "peakLoadMW": 20,
      "loadFactor": 0.52,
      "criticalLoadMW": 4,
      "cyclicLoadMW": 4.4,
      "motorLoadMW": 7,
      "thermalLoadMW": 1.6,
      "interruptibleLoadMW": 2.4,
      "standbyLoadMW": 0.8,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "conveyor start",
          "type": "conveyor-start",
          "runningMW": 7,
          "startingMultiple": 5,
          "durationSeconds": 5
        },
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 7,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 16,
        "acMW": 13,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 8,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 10,
      "energyMWh": 20,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 25,
      "transformerTotalMVA": 50,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 10,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 10,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "Corrosion protection requires detailed material selection."
    ],
    "tags": [
      "united-arab-emirates",
      "r05",
      "arabian-peninsula",
      "hot-humid-coastal",
      "port",
      "hybrid-/-microgrid",
      "islandable",
      "mv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 100,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-humid-coastal",
    "loadArchetype": "LOAD_PORT_LOGISTICS",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland"
      ],
      "investigate": [
        "drainage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-OMN-H16-001",
    "name": "Port / coastal energy microgrid — port — coastal zone · Oman",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H16",
    "archetypeTitle": "Port / coastal energy microgrid",
    "country": "OMN",
    "countryName": "Oman",
    "region": "Arabian Peninsula",
    "subregion": "coastal zone",
    "application": "port",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual port / coastal energy microgrid for a port load in a coastal saline setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "extreme",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E06",
      "climate": "coastal saline",
      "terrain": "coastal sabkha fringe",
      "salinityRisk": "extreme",
      "vegetationConstraint": "medium",
      "accessDifficulty": "medium",
      "envelope": "coastal-saline"
    },
    "territorialRules": [
      "avoid sabkha",
      "high corrosion class for hardware",
      "saline aerosol on insulators"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 3.6,
      "averageLoadMW": 6.24,
      "peakLoadMW": 12,
      "loadFactor": 0.52,
      "criticalLoadMW": 2.4,
      "cyclicLoadMW": 2.64,
      "motorLoadMW": 4.2,
      "thermalLoadMW": 0.96,
      "interruptibleLoadMW": 1.44,
      "standbyLoadMW": 0.48,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "conveyor start",
          "type": "conveyor-start",
          "runningMW": 4.2,
          "startingMultiple": 5,
          "durationSeconds": 5
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 10,
        "acMW": 8,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 6,
      "energyMWh": 18,
      "durationHours": 3,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 6,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 6,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "extreme salinity / corrosion",
      "weak-grid context",
      "Extreme heat and dust require equipment derating studies.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "oman",
      "r05",
      "arabian-peninsula",
      "coastal-saline",
      "port",
      "hybrid-/-microgrid",
      "weak-grid",
      "mv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 92,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "coastal-saline",
    "loadArchetype": "LOAD_PORT_LOGISTICS",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "sabkha"
      ],
      "investigate": [
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-LKA-H16-001",
    "name": "Port / coastal energy microgrid — port — coastal zone · Sri Lanka",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H16",
    "archetypeTitle": "Port / coastal energy microgrid",
    "country": "LKA",
    "countryName": "Sri Lanka",
    "region": "South Asia",
    "subregion": "coastal zone",
    "application": "port",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual port / coastal energy microgrid for a port load in a hot-humid coastal setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E07",
      "climate": "hot-humid coastal",
      "terrain": "coastal plain",
      "salinityRisk": "high",
      "vegetationConstraint": "medium",
      "accessDifficulty": "low",
      "envelope": "hot-humid-coastal"
    },
    "territorialRules": [
      "flood elevation",
      "humidity/corrosion",
      "storm surge setback"
    ],
    "grid": {
      "mode": "grid-connected",
      "strength": "medium",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 2.4,
      "averageLoadMW": 4.16,
      "peakLoadMW": 8,
      "loadFactor": 0.52,
      "criticalLoadMW": 1.6,
      "cyclicLoadMW": 1.76,
      "motorLoadMW": 2.8,
      "thermalLoadMW": 0.64,
      "interruptibleLoadMW": 0.96,
      "standbyLoadMW": 0.32,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 2.8,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 6,
        "acMW": 5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 3,
      "energyMWh": 6,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 10,
      "transformerTotalMVA": 20,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "grid-connected"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 4,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 4,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Drainage and flood elevation require site assessment.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "Corrosion protection requires detailed material selection."
    ],
    "tags": [
      "sri-lanka",
      "r07",
      "south-asia",
      "hot-humid-coastal",
      "port",
      "hybrid-/-microgrid",
      "grid-connected",
      "mv",
      "bess-2h",
      "medium"
    ],
    "qualityScore": 98,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hot-humid-coastal",
    "loadArchetype": "LOAD_PORT_LOGISTICS",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland"
      ],
      "investigate": [
        "drainage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 93,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 5,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-EGY-H03-001",
    "name": "Weak-grid PV+BESS system — industrial — urban perimeter · Libya",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H03",
    "archetypeTitle": "Weak-grid PV+BESS system",
    "country": "LBY",
    "countryName": "Libya",
    "region": "Maghreb",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual weak-grid pv+bess system for a industrial load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 7.2,
      "averageLoadMW": 10.5,
      "peakLoadMW": 15,
      "loadFactor": 0.7,
      "criticalLoadMW": 3.3,
      "cyclicLoadMW": 2.1,
      "motorLoadMW": 4.2,
      "thermalLoadMW": 1.8,
      "interruptibleLoadMW": 1.5,
      "standbyLoadMW": 0.6,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 4.2,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 12,
        "acMW": 10,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 8,
      "energyMWh": 16,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 7.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 7.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "libya",
      "r02",
      "maghreb",
      "urban-industrial",
      "industrial",
      "hybrid-/-microgrid",
      "weak-grid",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 95,
    "regionId": "R02",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R02",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 2,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-IND-H05-001",
    "name": "Remote agricultural microgrid — agriculture — agricultural interior · India",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H05",
    "archetypeTitle": "Remote agricultural microgrid",
    "country": "IND",
    "countryName": "India",
    "region": "South Asia",
    "subregion": "agricultural interior",
    "application": "agriculture",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual remote agricultural microgrid for a agriculture load in a agricultural interior setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "medium",
      "code": "E09",
      "climate": "agricultural interior",
      "terrain": "cultivated plain",
      "salinityRisk": "medium",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "agricultural"
    },
    "territorialRules": [
      "avoid high-value agricultural soils",
      "irrigation electrical diversity",
      "seasonal feeder loading"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 1.08,
      "averageLoadMW": 2.28,
      "peakLoadMW": 6,
      "loadFactor": 0.38,
      "criticalLoadMW": 0.48,
      "cyclicLoadMW": 2.1,
      "motorLoadMW": 2.4,
      "thermalLoadMW": 0.3,
      "interruptibleLoadMW": 1.5,
      "standbyLoadMW": 0.18,
      "seasonalVariationPercent": 55,
      "dominantLoadType": "seasonal motor load",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 2.4,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 6.9,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 4.2,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 10,
        "acMW": 8,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 3,
      "energyMWh": 12,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 8,
      "transformerTotalMVA": 16,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 3,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 3,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Drainage and flood elevation require site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "india",
      "r07",
      "south-asia",
      "agricultural",
      "agriculture",
      "hybrid-/-microgrid",
      "weak-grid",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 97,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "agricultural",
    "loadArchetype": "LOAD_AGRICULTURE",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high-value agricultural soils"
      ],
      "investigate": [
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 9,
      "warningsCount": 4,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "H-THA-H12-001",
    "name": "Remote settlement microgrid — remote settlement — agricultural interior · Thailand",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H12",
    "archetypeTitle": "Remote settlement microgrid",
    "country": "THA",
    "countryName": "Thailand",
    "region": "Southeast Transition",
    "subregion": "agricultural interior",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual remote settlement microgrid for a remote settlement load in a monsoon setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "high",
      "floodRisk": "extreme",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E11",
      "climate": "monsoon",
      "terrain": "seasonal floodplain",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "high",
      "envelope": "monsoon"
    },
    "territorialRules": [
      "monsoon flood and lightning",
      "seasonal soiling after dry spells",
      "access during floods"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.252,
      "averageLoadMW": 0.378,
      "peakLoadMW": 0.9,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.162,
      "cyclicLoadMW": 0.162,
      "motorLoadMW": 0.108,
      "thermalLoadMW": 0.198,
      "interruptibleLoadMW": 0.072,
      "standbyLoadMW": 0.054,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.135,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": {
      "monsoonSeason": {
        "peakLoadMW": 0.765,
        "note": "cloud / flood access"
      },
      "drySeason": {
        "peakLoadMW": 0.954,
        "note": "clearer resource, dust after dry spell"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 1.6,
        "acMW": 1.3,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 0.7,
      "energyMWh": 4.2,
      "durationHours": 6,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 22,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 1,
      "transformerTotalMVA": 2,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.45,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.45,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Humid/monsoon conditions dominate siting over desert heuristics.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements.",
      "Drainage and flood elevation require site assessment."
    ],
    "tags": [
      "thailand",
      "r08",
      "southeast-transition",
      "monsoon",
      "remote-settlement",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-6h+",
      "medium"
    ],
    "qualityScore": 100,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "monsoon",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact",
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-SAU-H01-001",
    "name": "Isolated PV+BESS microgrid — remote settlement — interior desert · Saudi Arabia",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H01",
    "archetypeTitle": "Isolated PV+BESS microgrid",
    "country": "SAU",
    "countryName": "Saudi Arabia",
    "region": "Arabian Peninsula",
    "subregion": "interior desert",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual isolated pv+bess microgrid for a remote settlement load in a hyper-arid desert setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "extreme",
      "duneRisk": "high",
      "waterAvailability": "low",
      "code": "E01",
      "climate": "hyper-arid desert",
      "terrain": "reg / hamada",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "hyper-arid"
    },
    "territorialRules": [
      "avoid mobile dunes",
      "prefer hamada over erg",
      "dry cleaning for soiling",
      "extreme heat derating"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.154,
      "averageLoadMW": 0.231,
      "peakLoadMW": 0.55,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.099,
      "cyclicLoadMW": 0.099,
      "motorLoadMW": 0.066,
      "thermalLoadMW": 0.121,
      "interruptibleLoadMW": 0.044,
      "standbyLoadMW": 0.033,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": []
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 1.4,
        "acMW": 1.1,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.273,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 0.5,
      "energyMWh": 4,
      "durationHours": 8,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "grid-forming",
        "backup"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 1,
      "transformerMVA": 0.8,
      "transformerTotalMVA": 0.8,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 0.275,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 0.275,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "mobile dune risk — siting constraint",
      "Extreme heat and dust require equipment derating studies.",
      "PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements."
    ],
    "tags": [
      "saudi-arabia",
      "r05",
      "arabian-peninsula",
      "hyper-arid",
      "remote-settlement",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-6h+",
      "medium"
    ],
    "qualityScore": 90,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hyper-arid",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau / hamada",
        "existing grid or road corridor",
        "stable desert plateau"
      ],
      "avoid": [
        "mobile dunes"
      ],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-DZA-H02-001",
    "name": "PV+BESS+diesel microgrid — remote settlement — interior desert · Mauritania",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H02",
    "archetypeTitle": "PV+BESS+diesel microgrid",
    "country": "MRT",
    "countryName": "Mauritania",
    "region": "Atlantic Sahara",
    "subregion": "interior desert",
    "application": "remote-settlement",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual pv+bess+diesel microgrid for a remote settlement load in a hyper-arid desert setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (off-grid, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "extreme",
      "soilingRisk": "extreme",
      "humidityRisk": "low",
      "corrosionRisk": "low",
      "floodRisk": "low",
      "extremeHeatRisk": "extreme",
      "duneRisk": "high",
      "waterAvailability": "low",
      "code": "E01",
      "climate": "hyper-arid desert",
      "terrain": "reg / hamada",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "high",
      "envelope": "hyper-arid"
    },
    "territorialRules": [
      "avoid mobile dunes",
      "prefer hamada over erg",
      "dry cleaning for soiling",
      "extreme heat derating"
    ],
    "grid": {
      "mode": "off-grid",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": false,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.952,
      "averageLoadMW": 1.428,
      "peakLoadMW": 3.4,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.612,
      "cyclicLoadMW": 0.612,
      "motorLoadMW": 0.408,
      "thermalLoadMW": 0.748,
      "interruptibleLoadMW": 0.272,
      "standbyLoadMW": 0.204,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "mixed residential/service",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 0.51,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 7,
        "acMW": 5.6,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 3,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 2.5,
      "energyMWh": 10,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 5,
      "transformerTotalMVA": 10,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "off-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 1.7,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 1.7,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "extreme dust / soiling",
      "mobile dune risk — siting constraint",
      "High soiling may increase O&M requirements.",
      "PV + mobile-dune exposure: prefer hamada/plateau; dunes remain a siting constraint.",
      "Remote access: logistics and O&M need a site study."
    ],
    "tags": [
      "mauritania",
      "r01",
      "atlantic-sahara",
      "hyper-arid",
      "remote-settlement",
      "hybrid-/-microgrid",
      "off-grid",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 92,
    "regionId": "R01",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "hyper-arid",
    "loadArchetype": "LOAD_REMOTE_SETTLEMENT",
    "siteSuitability": {
      "preferred": [
        "stable desert plateau / hamada",
        "existing grid or road corridor",
        "stable desert plateau"
      ],
      "avoid": [
        "mobile dunes"
      ],
      "investigate": [
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R01",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 5,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "H-EGY-H06-001",
    "name": "Water pumping microgrid — water pumping — oasis · Egypt",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H06",
    "archetypeTitle": "Water pumping microgrid",
    "country": "EGY",
    "countryName": "Egypt",
    "region": "Nile / Northeast Africa",
    "subregion": "oasis",
    "application": "water-pumping",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual water pumping microgrid for a water pumping load in a oasis / hamada setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "high",
      "soilingRisk": "high",
      "humidityRisk": "medium",
      "corrosionRisk": "high",
      "floodRisk": "medium",
      "extremeHeatRisk": "high",
      "duneRisk": "medium",
      "waterAvailability": "medium",
      "code": "E03",
      "climate": "oasis / hamada",
      "terrain": "escarpment and oasis floor",
      "salinityRisk": "high",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "oasis"
    },
    "territorialRules": [
      "avoid sabkha and oasis floor",
      "avoid heritage cores and palm groves",
      "prefer plateau/hamada above the oasis",
      "saline dew: dry cleaning"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 0.76,
      "averageLoadMW": 1.596,
      "peakLoadMW": 3.8,
      "loadFactor": 0.42,
      "criticalLoadMW": 0.57,
      "cyclicLoadMW": 1.52,
      "motorLoadMW": 2.09,
      "thermalLoadMW": 0.076,
      "interruptibleLoadMW": 0.76,
      "standbyLoadMW": 0.114,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "motor",
      "scaleBand": "1–10 MW",
      "transientEvents": [
        {
          "name": "pump start",
          "type": "pump-start",
          "runningMW": 2.09,
          "startingMultiple": 5.5,
          "durationSeconds": 3
        }
      ]
    },
    "seasonalProfiles": {
      "irrigationSeason": {
        "peakLoadMW": 4.37,
        "note": "irrigation / pumping"
      },
      "mildSeason": {
        "peakLoadMW": 2.66,
        "note": "reduced pumping"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 7,
        "acMW": 5.5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.273,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 2,
      "energyMWh": 8,
      "durationHours": 4,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 11,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 4,
      "transformerTotalMVA": 8,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 1.9,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 1.9,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Oasis-hamada siting principles (prefer hamada; avoid sabkha, dunes, heritage, palm groves) are conceptual, not a named-project copy.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Oasis siting: prefer stable hamada; investigate salinity and heritage.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Corrosion protection requires detailed material selection.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "egypt",
      "r03",
      "nile-northeast-africa",
      "oasis",
      "water-pumping",
      "hybrid-/-microgrid",
      "islandable",
      "mv",
      "bess-4h",
      "medium"
    ],
    "qualityScore": 95,
    "regionId": "R03",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "oasis",
    "loadArchetype": "LOAD_WATER_PUMPING",
    "siteSuitability": {
      "preferred": [
        "hamada above the oasis floor"
      ],
      "avoid": [
        "high-value agricultural soils",
        "heritage cores",
        "sabkha"
      ],
      "investigate": [
        "agricultural impact",
        "heritage",
        "salinity"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R03",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 9,
      "warningsCount": 6,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  },
  {
    "id": "H-QAT-H09-001",
    "name": "Airport / logistics microgrid — airport — urban perimeter · Qatar",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H09",
    "archetypeTitle": "Airport / logistics microgrid",
    "country": "QAT",
    "countryName": "Qatar",
    "region": "Arabian Peninsula",
    "subregion": "urban perimeter",
    "application": "airport",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual airport / logistics microgrid for a airport load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength strong), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "strong",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 3.52,
      "averageLoadMW": 5.28,
      "peakLoadMW": 11,
      "loadFactor": 0.48,
      "criticalLoadMW": 4.95,
      "cyclicLoadMW": 1.65,
      "motorLoadMW": 1.98,
      "thermalLoadMW": 1.76,
      "interruptibleLoadMW": 0.88,
      "standbyLoadMW": 0.55,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "motor start",
          "type": "motor-start",
          "runningMW": 1.98,
          "startingMultiple": 6,
          "durationSeconds": 4
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 8,
        "acMW": 6.5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 8,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 6,
      "energyMWh": 12,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 66,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 16,
      "transformerTotalMVA": 32,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "sectionalized-single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 5.5,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 5.5,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies."
    ],
    "tags": [
      "qatar",
      "r05",
      "arabian-peninsula",
      "urban-industrial",
      "airport",
      "hybrid-/-microgrid",
      "islandable",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_PORT_LOGISTICS",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-SAU-H15-001",
    "name": "Industrial park microgrid — industrial — urban perimeter · Saudi Arabia",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H15",
    "archetypeTitle": "Industrial park microgrid",
    "country": "SAU",
    "countryName": "Saudi Arabia",
    "region": "Arabian Peninsula",
    "subregion": "urban perimeter",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual industrial park microgrid for a industrial load in a urban industrial setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength strong), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "medium",
      "humidityRisk": "medium",
      "corrosionRisk": "medium",
      "floodRisk": "medium",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E08",
      "climate": "urban industrial",
      "terrain": "urban / industrial",
      "salinityRisk": "low",
      "vegetationConstraint": "low",
      "accessDifficulty": "low",
      "envelope": "urban-industrial"
    },
    "territorialRules": [
      "urban land constraints",
      "noise and GIS preference",
      "existing infrastructure reuse"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "strong",
      "exportAllowed": true,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 20.16,
      "averageLoadMW": 29.4,
      "peakLoadMW": 42,
      "loadFactor": 0.7,
      "criticalLoadMW": 9.24,
      "cyclicLoadMW": 5.88,
      "motorLoadMW": 11.76,
      "thermalLoadMW": 5.04,
      "interruptibleLoadMW": 4.2,
      "standbyLoadMW": 1.68,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "process start",
          "type": "process-start",
          "runningMW": 8.4,
          "startingMultiple": 4,
          "durationSeconds": 8
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 30,
        "acMW": 24,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.25,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 15,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 18,
      "energyMWh": 36,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "GIS",
      "primaryKV": 132,
      "secondaryKV": 13.8,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 40,
      "transformerTotalMVA": 80,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N-1",
      "busConfiguration": "double-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 13.8,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 21,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 13.8,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 21,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility."
    ],
    "warnings": [
      "Extreme heat and dust require equipment derating studies."
    ],
    "tags": [
      "saudi-arabia",
      "r05",
      "arabian-peninsula",
      "urban-industrial",
      "industrial",
      "hybrid-/-microgrid",
      "islandable",
      "hv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R05",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "urban-industrial",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [
        "industrial brownfield",
        "existing grid corridor"
      ],
      "avoid": [],
      "investigate": []
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R05",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 7,
      "warningsCount": 1,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-BGD-H03-001",
    "name": "Weak-grid PV+BESS system — urban distribution — agricultural interior · Bangladesh",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H03",
    "archetypeTitle": "Weak-grid PV+BESS system",
    "country": "BGD",
    "countryName": "Bangladesh",
    "region": "South Asia",
    "subregion": "agricultural interior",
    "application": "urban-distribution",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual weak-grid pv+bess system for a urban distribution load in a monsoon setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (weak-grid, strength weak), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "medium",
      "soilingRisk": "high",
      "humidityRisk": "high",
      "corrosionRisk": "high",
      "floodRisk": "extreme",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E11",
      "climate": "monsoon",
      "terrain": "seasonal floodplain",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "high",
      "envelope": "monsoon"
    },
    "territorialRules": [
      "monsoon flood and lightning",
      "seasonal soiling after dry spells",
      "access during floods"
    ],
    "grid": {
      "mode": "weak-grid",
      "strength": "weak",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": false
    },
    "loadProfile": {
      "baseLoadMW": 3,
      "averageLoadMW": 4.35,
      "peakLoadMW": 7.5,
      "loadFactor": 0.58,
      "criticalLoadMW": 1.5,
      "cyclicLoadMW": 0.9,
      "motorLoadMW": 0.75,
      "thermalLoadMW": 1.65,
      "interruptibleLoadMW": 0.45,
      "standbyLoadMW": 0.375,
      "seasonalVariationPercent": 28,
      "dominantLoadType": "mixed",
      "scaleBand": "1–10 MW",
      "transientEvents": []
    },
    "seasonalProfiles": {
      "monsoonSeason": {
        "peakLoadMW": 6.375,
        "note": "cloud / flood access"
      },
      "drySeason": {
        "peakLoadMW": 7.95,
        "note": "clearer resource, dust after dry spell"
      }
    },
    "generation": {
      "enabled": true,
      "technologies": [
        "pv"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 6,
        "acMW": 5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.2,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": null
    },
    "bess": {
      "enabled": true,
      "powerMW": 4,
      "energyMWh": 8,
      "durationHours": 2,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 33,
      "secondaryKV": 11,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 10,
      "transformerTotalMVA": 20,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "radial",
      "redundancyMode": "N",
      "busConfiguration": "single-bus",
      "gridConnection": "weak-grid"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 3.75,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 11,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 3.75,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting.",
      "Protection and grid-forming requirements need detailed study for this weak-grid scenario."
    ],
    "warnings": [
      "weak-grid context",
      "Drainage and flood elevation require site assessment.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use.",
      "Remote access: logistics and O&M need a site study.",
      "High soiling may increase O&M requirements.",
      "Protection and grid-forming requirements need detailed study."
    ],
    "tags": [
      "bangladesh",
      "r07",
      "south-asia",
      "monsoon",
      "urban-distribution",
      "hybrid-/-microgrid",
      "weak-grid",
      "mv",
      "bess-2h",
      "medium"
    ],
    "qualityScore": 97,
    "regionId": "R07",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "monsoon",
    "loadArchetype": "LOAD_URBAN",
    "siteSuitability": {
      "preferred": [
        "existing grid or road corridor"
      ],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact",
        "access"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R07",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 9,
      "warningsCount": 7,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 100
  },
  {
    "id": "H-THA-H04-001",
    "name": "Islanded industrial microgrid — industrial — agricultural interior · Thailand",
    "family": "H",
    "familyName": "HYBRID / MICROGRID",
    "archetype": "H04",
    "archetypeTitle": "Islanded industrial microgrid",
    "country": "THA",
    "countryName": "Thailand",
    "region": "Southeast Transition",
    "subregion": "agricultural interior",
    "application": "industrial",
    "conceptual": true,
    "featured": false,
    "disclaimer": "Conceptual engineering template. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "description": "Conceptual islanded industrial microgrid for a industrial load in a tropical humid setting. Storage is included for the scenario (firming, backup or peak shaving), not as a national mandate. Grid context is the scenario (islandable, strength isolated), not a national grid assessment. Parameters must be verified for local grid codes, site conditions and detailed engineering.",
    "environment": {
      "dustLevel": "low",
      "soilingRisk": "medium",
      "humidityRisk": "extreme",
      "corrosionRisk": "high",
      "floodRisk": "high",
      "extremeHeatRisk": "medium",
      "duneRisk": "low",
      "waterAvailability": "high",
      "code": "E12",
      "climate": "tropical humid",
      "terrain": "humid lowland",
      "salinityRisk": "low",
      "vegetationConstraint": "high",
      "accessDifficulty": "medium",
      "envelope": "tropical-humid"
    },
    "territorialRules": [
      "humidity and vegetation clearance",
      "flood and lightning"
    ],
    "grid": {
      "mode": "islandable",
      "strength": "isolated",
      "exportAllowed": false,
      "importAllowed": true,
      "backupAvailable": true,
      "blackStartRequired": true
    },
    "loadProfile": {
      "baseLoadMW": 5.76,
      "averageLoadMW": 8.4,
      "peakLoadMW": 12,
      "loadFactor": 0.7,
      "criticalLoadMW": 2.64,
      "cyclicLoadMW": 1.68,
      "motorLoadMW": 3.36,
      "thermalLoadMW": 1.44,
      "interruptibleLoadMW": 1.2,
      "standbyLoadMW": 0.48,
      "seasonalVariationPercent": 8,
      "dominantLoadType": "motor",
      "scaleBand": "10–50 MW",
      "transientEvents": [
        {
          "name": "process start",
          "type": "process-start",
          "runningMW": 2.4,
          "startingMultiple": 4,
          "durationSeconds": 8
        }
      ]
    },
    "seasonalProfiles": null,
    "generation": {
      "enabled": true,
      "technologies": [
        "pv",
        "diesel"
      ],
      "energyCalculationMethod": "specific-yield",
      "pv": {
        "dcMWp": 8,
        "acMW": 6.5,
        "mounting": "fixed",
        "bifacial": false,
        "dcAcRatio": 1.231,
        "specificYieldKWhPerKWpYear": null,
        "capacityFactor": null,
        "lossesPercent": null,
        "resourceProvenance": "future-site-study"
      },
      "wind": null,
      "diesel": {
        "ratedMW": 10,
        "role": "backup"
      }
    },
    "bess": {
      "enabled": true,
      "powerMW": 6,
      "energyMWh": 18,
      "durationHours": 3,
      "roundTripEfficiency": 0.88,
      "usableDoD": 0.9,
      "purpose": [
        "solar-firming",
        "energy-shifting"
      ]
    },
    "substation": {
      "enabled": true,
      "type": "AIS",
      "primaryKV": 22,
      "secondaryKV": 0.4,
      "tertiaryKV": null,
      "transformerCount": 2,
      "transformerMVA": 12.5,
      "transformerTotalMVA": 25,
      "powerFactor": 0.92,
      "utilizationFactor": 0.75,
      "topology": "isolated",
      "redundancyMode": "N-1",
      "busConfiguration": "single-bus",
      "gridConnection": "islandable"
    },
    "feeders": [
      {
        "name": "feeder-north",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 8,
        "estimatedLoadMW": 6,
        "lossesPercent": 2.5
      },
      {
        "name": "feeder-south",
        "voltageKV": 0.4,
        "role": "distribution",
        "lengthKM": 6,
        "estimatedLoadMW": 6,
        "lossesPercent": 2.8
      }
    ],
    "economics": {
      "btcPerKWh": null
    },
    "assumptions": [
      "Conceptual regional scenario in the Mauritania–Thailand corridor.",
      "Country is geographic context, not a claim that this voltage or topology is the national standard.",
      "Load profile is an aggregated engineering archetype, not measured demand.",
      "Solar resource and specific yield require a site study.",
      "Tariff is user-supplied (BTC/kWh).",
      "Solar resource requires site-specific study; template yield is not a measured GHI.",
      "Grid voltage class is an archetype level and must be verified against the local utility.",
      "Humid/monsoon heuristics replace desert-default siting."
    ],
    "warnings": [
      "Humid/monsoon conditions dominate siting over desert heuristics.",
      "PV + flood exposure: drainage and elevation need site assessment.",
      "PV + vegetation/agriculture constraint: investigate land use."
    ],
    "tags": [
      "thailand",
      "r08",
      "southeast-transition",
      "tropical-humid",
      "industrial",
      "hybrid-/-microgrid",
      "islandable",
      "mv",
      "bess-2h",
      "large"
    ],
    "qualityScore": 98,
    "regionId": "R08",
    "atlas": {
      "title": "Regional Electrical Architecture Atlas",
      "corridor": "Corridor Mauritania–Thailand",
      "band": "North Africa · Middle East · South Asia"
    },
    "frequencyHz": null,
    "frequencyProvenance": "conceptual-template",
    "coordinates": null,
    "climateEnvelope": "tropical-humid",
    "loadArchetype": "LOAD_INDUSTRIAL",
    "siteSuitability": {
      "preferred": [],
      "avoid": [
        "high flood zone",
        "sensitive wetland",
        "high-value agricultural soils"
      ],
      "investigate": [
        "drainage",
        "agricultural impact"
      ]
    },
    "informationLayers": {
      "electrical": "source-derived-from-prompt-4-dataset",
      "territorial": "conceptual-assumption",
      "assumptions": "conceptual-assumption",
      "verified": null
    },
    "regionalization": {
      "profileId": "R08",
      "regionalFitScore": 96,
      "environmentFitScore": 22,
      "applicationFitScore": 20,
      "assumptionsCount": 8,
      "warningsCount": 3,
      "fitBreakdown": {
        "environment": 22,
        "application": 20,
        "grid": 12,
        "scale": 8,
        "load": 10,
        "terrain": 8,
        "storage": 8,
        "generation": 8
      }
    },
    "diversityContribution": 96
  }
]);

export const TEMPLATE_COUNT = architectureTemplates.length;
