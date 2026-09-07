# Sacred Architecture project JSON

Portable envelope for a single project. Conceptual data only — not a source drawing or private file.

```json
{
  "format": "sacred-architecture-project",
  "schemaVersion": 1,
  "exportedAt": "2026-09-03T12:00:00.000Z",
  "project": {
    "schemaVersion": 1,
    "appVersion": "1.0.0",
    "engineVersion": "1.0.0",
    "projectId": "00000000-0000-4000-8000-000000000001",
    "createdAt": "2026-09-03T12:00:00.000Z",
    "updatedAt": "2026-09-03T12:00:00.000Z",
    "metadata": {
      "name": "Conceptual PV + BESS classroom study",
      "description": "Sanitized example. Not a site design.",
      "authorAlias": null,
      "tags": ["conceptual", "bess"],
      "sourceTemplateId": null,
      "sourceTemplateVersion": 1,
      "conceptual": true,
      "status": "draft",
      "createdAt": "2026-09-03T12:00:00.000Z",
      "updatedAt": "2026-09-03T12:00:00.000Z"
    },
    "architecture": {
      "mode": "hybrid-microgrid",
      "generation": {
        "enabled": true,
        "technologies": ["pv"],
        "energyCalculationMethod": "specific-yield",
        "pv": {
          "dcMWp": 25,
          "acMW": 20,
          "specificYieldKWhPerKWpYear": null,
          "capacityFactor": null
        }
      },
      "bess": {
        "enabled": true,
        "powerMW": 25,
        "energyMWh": 100,
        "durationHours": 4
      },
      "substation": {
        "enabled": true,
        "primaryKV": 33,
        "secondaryKV": 11,
        "tertiaryKV": null,
        "transformerMVA": 20,
        "powerFactor": 0.925
      },
      "grid": { "mode": "islandable" },
      "loads": { "profile": { "peakLoadMW": 8.2 } },
      "economics": { "tariffMode": "btc", "btcPerKWh": 1.2e-7 },
      "connections": [
        { "id": "c-pv-tr", "from": "pv", "to": "transformer", "type": "electrical" }
      ],
      "userNotes": ""
    },
    "scenarios": [
      {
        "id": "normal",
        "name": "Normal Operation",
        "operatingState": "normal",
        "loadStates": {},
        "generationStates": {},
        "bessState": null,
        "gridState": {},
        "overrides": { "season": "winter" }
      }
    ],
    "activeScenarioId": "normal",
    "snapshots": [],
    "provenance": {},
    "geospatial": {
      "sites": [],
      "activeSiteId": null,
      "restrictions": [],
      "gridNetwork": null
    }
  }
}
```

Snapshot files use `"format": "sacred-architecture-snapshot"` and a `snapshot` object instead of `project`.

`null` means unknown. `0` means a known zero. Do not coerce.
