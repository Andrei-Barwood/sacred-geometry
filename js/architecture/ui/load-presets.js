/**
 * Technical load presets derived from the 6 kW source model.
 * Names are generic. No personal or commercial identifiers.
 */

import { getLoadById } from "../reference-loads.js";
import { cloneValue, newProjectId } from "./clone.js";
import { normalizeLoadItem } from "./state.js";

const PRESET_DEFS = [
  {
    id: "preset-refrigeration",
    label: "Refrigeration",
    sourceId: "fridge-domestic",
    name: "Refrigeration",
  },
  {
    id: "preset-freezer",
    label: "Storage freezer",
    sourceId: "freezer-storage",
    name: "Storage freezer",
  },
  {
    id: "preset-heater",
    label: "Heater",
    sourceId: "heater-800",
    name: "Heater",
  },
  {
    id: "preset-oven",
    label: "Oven",
    sourceId: "oven-electric",
    name: "Oven",
  },
  {
    id: "preset-washing",
    label: "Washing cycle",
    sourceId: "washer",
    name: "Washing cycle",
  },
  {
    id: "preset-lighting",
    label: "Lighting",
    sourceId: "storage-lighting",
    name: "Lighting",
  },
  {
    id: "preset-gate-motor",
    label: "Gate motor",
    sourceId: "gate-motor",
    name: "Gate motor",
  },
];

export function listLoadPresets() {
  return PRESET_DEFS.map((d) => ({ id: d.id, label: d.label, sourceId: d.sourceId }));
}

export function createLoadFromPreset(presetId) {
  const def = PRESET_DEFS.find((d) => d.id === presetId);
  if (!def) return null;
  const source = getLoadById(def.sourceId);
  if (!source) return null;
  const item = normalizeLoadItem(cloneValue(source));
  item.id = `${def.sourceId}-${newProjectId("P")}`;
  item.name = def.name;
  item.presetId = def.id;
  item.sourceId = def.sourceId;
  item.enabled = true;
  item.state = item.category === "compressor" ? "RUNNING" : "OFF";
  return item;
}

export function createBlankLoad() {
  return normalizeLoadItem({
    id: `load-${newProjectId("P")}`,
    name: "New load",
    category: "other",
    quantity: 1,
    nominalPowerW: null,
    voltageV: 230,
    powerFactor: null,
    runCurrentA: null,
    standbyCurrentA: null,
    dutyCycle: null,
    usage: {
      hoursPerDay: null,
      cyclesPerMonth: null,
      energyPerCycleKWh: null,
    },
    season: "allYear",
    enabled: true,
    state: "OFF",
  });
}
