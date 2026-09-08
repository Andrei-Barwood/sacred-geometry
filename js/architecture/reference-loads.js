/**
 * Arquitectura Sagrada — capa de consumo (presets de referencia).
 *
 * Datos empíricos del estudio de diagnóstico a ~6 kW / 220–230 V monofásico.
 * Inrush no entra en kWh. La tarifa es entrada, no constante.
 * Schema estable a cualquier serviceLimitKW (6 kW … 100 MVA).
 *
 * No es una calculadora visual.
 */

/** @typedef {{ reference?: number, min?: number, max?: number }} Range */

export const LOAD_CATEGORIES = Object.freeze([
  "resistive",
  "compressor",
  "motor",
  "electronic",
  "lighting",
  "thermalCycle",
  "mixedCycle",
  "standby",
  "other",
]);

export const SEASONS = Object.freeze(["summer", "winter", "allYear", "custom"]);

/**
 * Perfil del caso fuente. serviceLimitKW es un campo, no una constante de arquitectura.
 * energyTariffPerKWh queda null: el analog económico no se publica.
 */
export const installationProfile = Object.freeze({
  id: "dwelling-6kw-single-phase",
  voltageNominalV: 230,
  voltageMinV: 220,
  voltageMaxV: 230,
  tableVoltageV: 230,
  phases: 1,
  installedPowerKW: 6,
  serviceLimitKW: 6,
  occupancy: 2,
  energyTariffPerKWh: null,
  daysPerMonth: 30,
  meter: {
    type: "true-rms-clamp",
    point: "phase",
    steadyReadAfterSeconds: { min: 30, max: 60 },
    inrushSeparate: true,
  },
  seasonalEnergyKWh: Object.freeze({
    winter: Object.freeze({ min: 270, reference: 346, max: 420 }),
    summer: Object.freeze({ min: 170, reference: 236, max: 260 }),
  }),
  notes: Object.freeze([
    "Verano = sin calefactor; el resto de cargas no se reescala.",
    "daysPerMonth = 30 reproduce 346 kWh → 11,53 kWh/día.",
    "Rangos empíricos tienen prioridad sobre P·t·duty.",
  ]),
});

const V = 230;
const ALL = "allYear";

function load(partial) {
  return Object.freeze({
    quantity: 1,
    voltageV: V,
    phases: 1,
    season: ALL,
    contributesToEnergy: true,
    contributesToSteadyDemand: true,
    contributesToTransientDemand: false,
    diagnostics: Object.freeze([]),
    assumptions: Object.freeze([]),
    modes: undefined,
    ...partial,
    runCurrentA: freezeRange(partial.runCurrentA),
    offCurrentA: freezeRange(partial.offCurrentA),
    standbyCurrentA: freezeRange(partial.standbyCurrentA),
    inrushCurrentA: freezeRange(partial.inrushCurrentA),
    inrushDurationSeconds: freezeRange(partial.inrushDurationSeconds),
    dutyCycle: freezeRange(partial.dutyCycle),
    usage: partial.usage ? Object.freeze({ ...partial.usage }) : undefined,
    monthlyEnergyKWh: freezeRange(partial.monthlyEnergyKWh),
    seasonalEnergyKWh: partial.seasonalEnergyKWh
      ? Object.freeze({
          winter: freezeRange(partial.seasonalEnergyKWh.winter),
          summer: freezeRange(partial.seasonalEnergyKWh.summer),
        })
      : undefined,
    nominalPowerW: freezeMaybeRange(partial.nominalPowerW),
    diagnostics: Object.freeze(partial.diagnostics || []),
    assumptions: Object.freeze(partial.assumptions || []),
  });
}

function freezeRange(range) {
  return range ? Object.freeze({ ...range }) : undefined;
}

function freezeMaybeRange(value) {
  if (value == null) return undefined;
  if (typeof value === "object") return freezeRange(value);
  return value;
}

export const referenceLoads = Object.freeze([
  load({
    id: "fridge-domestic",
    name: "Nevera doméstica",
    category: "compressor",
    nominalPowerW: 150,
    runCurrentA: { reference: 0.65, min: 0.45, max: 0.8 },
    offCurrentA: { reference: 0.02, min: 0, max: 0.05 },
    inrushCurrentA: { reference: 5.5, min: 4, max: 7 },
    inrushDurationSeconds: { min: 0, max: 0.3 },
    dutyCycle: { reference: 0.35, min: 0.25, max: 0.45 },
    monthlyEnergyKWh: { min: 28, reference: 32, max: 38 },
    contributesToTransientDemand: true,
    diagnostics: [
      "run-within-10",
      "compressor-must-cycle",
      "fridge-no-cut",
      "fridge-duty-high",
      "read-after-30s",
    ],
    assumptions: [
      "I promedio mensual publicada 0,20–0,30 A no sustituye el rango de kWh.",
      "Duty de control 35 % reconstruye ~37,8 kWh; el valor publicado de control es 32 kWh.",
    ],
  }),

  load({
    id: "freezer-storage",
    name: "Freezer de bodega",
    category: "compressor",
    nominalPowerW: { reference: 400, min: 350, max: 450 },
    runCurrentA: { reference: 1.8, min: 1.3, max: 2.2 },
    offCurrentA: { reference: 0, min: 0, max: 0 },
    inrushCurrentA: { reference: 11, min: 8, max: 14 },
    inrushDurationSeconds: { min: 0.1, max: 0.4 },
    dutyCycle: { reference: 0.4, min: 0.3, max: 0.5 },
    monthlyEnergyKWh: { min: 90, reference: 120, max: 140 },
    contributesToTransientDemand: true,
    diagnostics: [
      "run-within-10",
      "compressor-must-cycle",
      "freezer-no-cut",
      "freezer-run-high",
      "freezer-energy-high",
      "freezer-duty-high",
      "read-after-30s",
      "sim-heater-oven-freezer",
    ],
    assumptions: [
      "Volumen de referencia ≈ 1,12 m³.",
      "I de placa 1,7–2,0 A; I de protocolo ON 1,8 A (óptimo 1,3–2,2 A).",
      "Promedio 60 min sano 0,75 A (0,50–1,00 A) a duty ~40 %.",
      "Principal sospechoso: ~30–45 % del total mensual.",
    ],
  }),

  load({
    id: "heater-400",
    name: "Calefactor 400 W",
    category: "resistive",
    mutuallyExclusiveGroup: "space-heater",
    nominalPowerW: 400,
    runCurrentA: { reference: 1.74, min: 1.65, max: 1.85 },
    season: "winter",
    usage: { hoursPerDay: { reference: 5, min: 4, max: 6 } },
    seasonalEnergyKWh: { winter: { min: 90, max: 130 }, summer: { reference: 0 } },
    diagnostics: [
      "run-within-10",
      "run-over-15",
      "heater-band-5",
      "heater-open-element",
      "resistive-unstable",
      "read-after-30s",
    ],
    assumptions: [
      "Una de tres posiciones del mismo aparato; no sumar con heater-800 ni heater-1200.",
      "El rango 90–130 kWh/mes es del calefactor en posición media, no de 400 W aislado.",
    ],
  }),

  load({
    id: "heater-800",
    name: "Calefactor 800 W",
    category: "resistive",
    mutuallyExclusiveGroup: "space-heater",
    nominalPowerW: 800,
    runCurrentA: { reference: 3.48, min: 3.3, max: 3.65 },
    season: "winter",
    usage: { hoursPerDay: { reference: 5, min: 4, max: 6 } },
    monthlyEnergyKWh: { min: 90, reference: 110, max: 130 },
    seasonalEnergyKWh: { winter: { min: 90, reference: 110, max: 130 }, summer: { reference: 0 } },
    diagnostics: [
      "run-within-10",
      "run-over-15",
      "heater-band-5",
      "heater-open-element",
      "resistive-unstable",
      "read-after-30s",
    ],
    assumptions: [
      "Posición media: control 110 kWh. 800 W × 5 h × 30 d = 120 kWh (holgura respecto del control).",
    ],
  }),

  load({
    id: "heater-1200",
    name: "Calefactor 1 200 W",
    category: "resistive",
    mutuallyExclusiveGroup: "space-heater",
    nominalPowerW: 1200,
    runCurrentA: { reference: 5.22, min: 5.0, max: 5.5 },
    season: "winter",
    usage: { hoursPerDay: { reference: 5, min: 4, max: 6 } },
    seasonalEnergyKWh: { winter: { min: 90, max: 130 }, summer: { reference: 0 } },
    diagnostics: [
      "run-within-10",
      "run-over-15",
      "heater-band-5",
      "heater-open-element",
      "resistive-unstable",
      "sim-heater-oven-freezer",
      "read-after-30s",
    ],
    assumptions: [
      "Cuidar simultaneidad con el límite de servicio.",
      "90–130 kWh/mes no es 1 200 W × 5 h × 30 d (eso sería 180 kWh, no publicado como control).",
    ],
  }),

  load({
    id: "oven-electric",
    name: "Horno eléctrico",
    category: "thermalCycle",
    nominalPowerW: 2200,
    runCurrentA: { reference: 9.6, min: 8.7, max: 10.5 },
    offCurrentA: { min: 0, max: 0.1 },
    inrushCurrentA: { max: 9.6 * 1.1 },
    usage: {
      cyclesPerMonth: { min: 8, max: 12 },
      cycleDurationSeconds: { reference: 3600 },
    },
    monthlyEnergyKWh: { min: 18, reference: 24, max: 30 },
    contributesToTransientDemand: false,
    diagnostics: [
      "run-within-10",
      "run-over-15",
      "resistive-unstable",
      "oven-overcurrent",
      "oven-no-cut",
      "sim-heater-oven-freezer",
      "read-after-30s",
    ],
    assumptions: [
      "Inrush resistivo: pico < 1,1 × In; no se trata como LRA.",
      "Duty interno del termostato durante la hora de uso no está publicado.",
    ],
  }),

  load({
    id: "dishwasher",
    name: "Lavavajillas",
    category: "mixedCycle",
    nominalPowerW: { reference: 2000, min: 120, max: 2000 },
    runCurrentA: { reference: 8.7, min: 0.5, max: 10 },
    inrushCurrentA: { min: 2, max: 4 },
    usage: {
      cyclesPerMonth: { min: 10, max: 15 },
      energyPerCycleKWh: { reference: 1.0 },
    },
    monthlyEnergyKWh: { min: 10, reference: 14, max: 18 },
    contributesToTransientDemand: true,
    modes: Object.freeze([
      Object.freeze({
        id: "heat",
        name: "Calentamiento",
        nominalPowerW: 2000,
        runCurrentA: Object.freeze({ reference: 8.7, min: 8.0, max: 9.6 }),
      }),
      Object.freeze({
        id: "wash",
        name: "Lavado",
        nominalPowerW: { min: 120, max: 180 },
        runCurrentA: Object.freeze({ reference: 0.8, min: 0.5, max: 1.2 }),
      }),
    ]),
    diagnostics: ["dishwasher-heat-stuck", "read-after-30s"],
    assumptions: [
      "I alta solo en calentamiento. Eco ~1,0 kWh/ciclo.",
    ],
  }),

  load({
    id: "washer",
    name: "Lavadora",
    category: "mixedCycle",
    nominalPowerW: { reference: 450, min: 450, max: 2000 },
    runCurrentA: { reference: 2.0, min: 1.6, max: 3.5 },
    inrushCurrentA: { min: 6, max: 10 },
    usage: { cyclesPerMonth: { min: 8, max: 12 } },
    monthlyEnergyKWh: { min: 6, max: 15 },
    contributesToTransientDemand: true,
    modes: Object.freeze([
      Object.freeze({
        id: "wash",
        name: "Lavado",
        nominalPowerW: 450,
        runCurrentA: Object.freeze({ reference: 2.0, min: 1.6, max: 2.4 }),
      }),
      Object.freeze({
        id: "spin",
        name: "Centrifugado",
        runCurrentA: Object.freeze({ min: 2.5, max: 3.5 }),
      }),
      Object.freeze({
        id: "heat",
        name: "Calentamiento (si tiene resistencia)",
        nominalPowerW: 2000,
        runCurrentA: Object.freeze({ reference: 8.7 }),
      }),
    ]),
    diagnostics: ["washer-mech", "dol-inrush-ratio", "read-after-30s"],
    assumptions: [
      "Resistencia de agua opcional. Rango 6–15 kWh cubre frío / con calor.",
    ],
  }),

  load({
    id: "tv-led",
    name: "Televisor LED",
    category: "electronic",
    nominalPowerW: 80,
    runCurrentA: { reference: 0.35, min: 0.25, max: 0.45 },
    standbyCurrentA: { max: 0.01 },
    monthlyEnergyKWh: { min: 8, max: 15 },
    diagnostics: ["tv-on-high", "tv-standby-high", "read-after-30s"],
    assumptions: ["Stand-by < 1 W y < 0,8 kWh/mes."],
  }),

  load({
    id: "notebook-charger",
    name: "Notebook / cargador",
    category: "electronic",
    nominalPowerW: { min: 10, reference: 12, max: 30 },
    runCurrentA: { reference: 0.05, min: 0.04, max: 0.22 },
    monthlyEnergyKWh: { min: 3, max: 7 },
    modes: Object.freeze([
      Object.freeze({
        id: "use",
        name: "Uso (sin carga)",
        nominalPowerW: { min: 10, max: 15 },
        runCurrentA: Object.freeze({ min: 0.04, max: 0.07 }),
      }),
      Object.freeze({
        id: "charge",
        name: "Carga (brick 30 W)",
        nominalPowerW: 30,
        runCurrentA: Object.freeze({ reference: 0.18, min: 0.1, max: 0.22 }),
      }),
    ]),
    diagnostics: ["notebook-charge-high", "read-after-30s"],
    assumptions: [
      "Protocolo resume 0,05 A uso / 0,18 A carga.",
      "TV + notebook simultáneos: 0,50 A (0,30–0,70 A); no es un preset extra.",
    ],
  }),

  load({
    id: "storage-lighting",
    name: "Iluminación de bodega",
    category: "lighting",
    nominalPowerW: { reference: 80, min: 60, max: 100 },
    runCurrentA: { reference: 0.35, min: 0.25, max: 0.45 },
    usage: { hoursPerDay: { min: 3, max: 4 } },
    monthlyEnergyKWh: { min: 10, reference: 15, max: 25 },
    diagnostics: ["read-after-30s"],
    assumptions: [
      "El rango 10–25 kWh/mes del tablero incluye residual de enchufes en el estudio fuente.",
    ],
  }),

  load({
    id: "storage-outlets-residual",
    name: "Enchufes / residual de bodega",
    category: "standby",
    nominalPowerW: { max: 10 },
    standbyCurrentA: { max: 0.05 },
    runCurrentA: { reference: 0.05, min: 0, max: 0.1 },
    diagnostics: ["hidden-night-load", "read-after-30s"],
    assumptions: [
      "I de noche (luces OFF) 0,00–0,10 A. kWh suelto no publicado.",
      "Herramientas puntuales no forman parte de la base.",
    ],
  }),

  load({
    id: "gate-motor",
    name: "Motor de portón",
    category: "motor",
    nominalPowerW: { reference: 500, min: 400, max: 550 },
    runCurrentA: { reference: 2.4, min: 2.0, max: 3.2 },
    inrushCurrentA: { reference: 15, min: 12, max: 20 },
    inrushDurationSeconds: { min: 0.2, max: 0.8 },
    usage: { cycleDurationSeconds: { min: 10, max: 20 } },
    monthlyEnergyKWh: { min: 2, reference: 4, max: 6 },
    contributesToTransientDemand: true,
    diagnostics: [
      "gate-run-high",
      "dol-inrush-ratio",
      "dol-inrush-time",
      "read-after-30s",
    ],
    assumptions: [
      "DOL sin soft-starter. Inrush no suma kWh.",
    ],
  }),

  load({
    id: "gate-standby",
    name: "Stand-by del control del portón",
    category: "standby",
    nominalPowerW: { min: 2, max: 8 },
    standbyCurrentA: { reference: 0.02, min: 0.01, max: 0.04 },
    contributesToSteadyDemand: true,
    contributesToTransientDemand: false,
    diagnostics: ["read-after-30s"],
    assumptions: [
      "Fotoceldas / control. kWh suelto no publicado.",
    ],
  }),

  load({
    id: "unlisted-reserve",
    name: "Reserva de cargas no listadas",
    category: "other",
    monthlyEnergyKWh: { min: 15, max: 40 },
    contributesToSteadyDemand: false,
    contributesToTransientDemand: false,
    contributesToEnergy: true,
    diagnostics: [],
    assumptions: ["Cubo de energía, no un equipo medible."],
  }),
]);

export const diagnosticRules = Object.freeze([
  {
    id: "run-within-10",
    metric: "runCurrentA",
    operator: "absRelLte",
    threshold: 0.1,
    against: "nominalCurrentA",
    severity: "info",
    message: "Corriente de régimen dentro de ±10 % de In.",
  },
  {
    id: "run-over-15",
    metric: "runCurrentA",
    operator: "absRelGt",
    threshold: 0.15,
    against: "nominalCurrentA",
    appliesToCategories: ["resistive", "thermalCycle"],
    severity: "warning",
    message: "Desviación >15 % en carga resistiva: revisar elemento.",
  },
  {
    id: "resistive-unstable",
    metric: "runCurrentA",
    operator: "notStable",
    appliesToCategories: ["resistive"],
    severity: "warning",
    message: "La corriente resistiva debe ser estable.",
  },
  {
    id: "heater-band-5",
    metric: "runCurrentA",
    operator: "absRelGt",
    threshold: 0.05,
    appliesToIds: ["heater-400", "heater-800", "heater-1200"],
    severity: "warning",
    message: "Calefactor fuera de la banda resistiva ±5 % de la posición.",
  },
  {
    id: "heater-open-element",
    metric: "runCurrentA",
    operator: "lt",
    against: "runCurrentA.min",
    appliesToIds: ["heater-400", "heater-800", "heater-1200"],
    severity: "warning",
    message: "I baja respecto de la posición: posible elemento abierto.",
  },
  {
    id: "compressor-must-cycle",
    metric: "dutyCycle",
    operator: "eq",
    threshold: 1,
    appliesToCategories: ["compressor"],
    severity: "alert",
    message: "Compresor 100 % ON: falla. Debe ciclar.",
  },
  {
    id: "fridge-no-cut",
    metric: "runCurrentA",
    operator: "gt",
    threshold: 1.0,
    qualifier: "continuousWithoutCut",
    appliesToIds: ["fridge-domestic"],
    severity: "warning",
    message: "Nevera: I > 1,0 A continua o no corta.",
  },
  {
    id: "fridge-duty-high",
    metric: "dutyCycle",
    operator: "gt",
    threshold: 0.6,
    windowMinutes: { min: 30, max: 60 },
    appliesToIds: ["fridge-domestic"],
    severity: "warning",
    message: "Nevera: duty > 60 % en 30–60 min.",
  },
  {
    id: "freezer-no-cut",
    metric: "offCurrentA",
    operator: "nePeriodicZero",
    appliesToIds: ["freezer-storage"],
    severity: "alert",
    message: "Freezer no corta (0 A OFF periódico ausente).",
  },
  {
    id: "freezer-run-high",
    metric: "runCurrentA",
    operator: "gt",
    threshold: 2.4,
    qualifier: "continuous",
    appliesToIds: ["freezer-storage"],
    severity: "alert",
    message: "Freezer: I > 2,4 A continua.",
  },
  {
    id: "freezer-energy-high",
    metric: "monthlyEnergyKWh",
    operator: "gt",
    threshold: 180,
    appliesToIds: ["freezer-storage"],
    severity: "alert",
    message: "Freezer: más de 180 kWh/mes o no cicla.",
  },
  {
    id: "freezer-duty-high",
    metric: "dutyCycle",
    operator: "gt",
    threshold: 0.7,
    appliesToIds: ["freezer-storage"],
    severity: "warning",
    message: "Freezer: duty > 70 %.",
  },
  {
    id: "oven-overcurrent",
    metric: "runCurrentA",
    operator: "gt",
    threshold: 11,
    appliesToIds: ["oven-electric"],
    severity: "warning",
    message: "Horno: I > 11 A.",
  },
  {
    id: "oven-no-cut",
    metric: "offCurrentA",
    operator: "noCut",
    appliesToIds: ["oven-electric"],
    severity: "warning",
    message: "Horno: el termostato no corta.",
  },
  {
    id: "dishwasher-heat-stuck",
    metric: "runCurrentA",
    operator: "approx",
    threshold: 9,
    qualifier: "entireCycle",
    appliesToIds: ["dishwasher"],
    severity: "warning",
    message: "Lavavajillas: ~9 A durante todo el ciclo (calor pegado).",
  },
  {
    id: "washer-mech",
    metric: "runCurrentA",
    operator: "gt",
    threshold: 3.5,
    qualifier: "washMode",
    appliesToIds: ["washer"],
    severity: "warning",
    message: "Lavadora: I > 3,5 A en lavado o bloqueo.",
  },
  {
    id: "tv-on-high",
    metric: "runCurrentA",
    operator: "gt",
    threshold: 0.6,
    appliesToIds: ["tv-led"],
    severity: "warning",
    message: "Televisor: I > 0,60 A en ON.",
  },
  {
    id: "tv-standby-high",
    metric: "standbyCurrentA",
    operator: "gt",
    threshold: 0.05,
    appliesToIds: ["tv-led"],
    severity: "warning",
    message: "Televisor: stand-by > 0,05 A.",
  },
  {
    id: "notebook-charge-high",
    metric: "runCurrentA",
    operator: "gt",
    threshold: 0.35,
    qualifier: "chargeMode",
    appliesToIds: ["notebook-charger"],
    severity: "warning",
    message: "Carga de notebook: I > 0,35 A.",
  },
  {
    id: "hidden-night-load",
    metric: "runCurrentA",
    operator: "gt",
    threshold: 0.8,
    qualifier: "night",
    appliesToIds: ["storage-outlets-residual", "storage-lighting"],
    severity: "alert",
    message: "Bodega de noche: I > 0,8 A continua (carga oculta).",
  },
  {
    id: "gate-run-high",
    metric: "runCurrentA",
    operator: "gt",
    threshold: 4,
    appliesToIds: ["gate-motor"],
    severity: "warning",
    message: "Portón: I régimen > 4 A (fricción, condensador o fin de carrera).",
  },
  {
    id: "dol-inrush-ratio",
    metric: "inrushCurrentA",
    operator: "ratioGt",
    against: "runCurrentA.reference",
    threshold: 10,
    appliesToCategories: ["motor"],
    severity: "warning",
    message: "Inrush DOL > 10 × In.",
  },
  {
    id: "dol-inrush-time",
    metric: "inrushDurationSeconds",
    operator: "gt",
    threshold: 1,
    appliesToCategories: ["motor"],
    severity: "warning",
    message: "Arranque DOL > 1 s.",
  },
  {
    id: "sim-heater-oven-freezer",
    metric: "coincidence",
    operator: "active",
    constraintId: "heater-1200-oven-freezer-inrush",
    severity: "alert",
    message: "Simultaneidad: calefactor 1 200 W + horno + arranque de freezer.",
  },
  {
    id: "read-after-30s",
    metric: "protocol",
    operator: "info",
    severity: "info",
    message: "Leer régimen a los 30–60 s; el pico de arranque se mide aparte.",
  },
]);

export const simultaneityConstraints = Object.freeze([
  {
    id: "heater-1200-oven-freezer-inrush",
    kind: "forbidden",
    serviceLimitField: "serviceLimitKW",
    appliesWhenSeason: "winter",
    members: Object.freeze([
      Object.freeze({ loadId: "heater-1200", layer: "steady" }),
      Object.freeze({ loadId: "oven-electric", layer: "steady" }),
      Object.freeze({ loadId: "freezer-storage", layer: "transient" }),
    ]),
    notes: "Capa steady ≈ 3,4 kW; transient suma LRA del freezer y puede superar 6 kW.",
  },
  {
    id: "tv-notebook-steady",
    kind: "observed",
    members: Object.freeze([
      Object.freeze({ loadId: "tv-led", layer: "steady" }),
      Object.freeze({ loadId: "notebook-charger", layer: "steady" }),
    ]),
    combinedRunCurrentA: Object.freeze({ reference: 0.5, min: 0.3, max: 0.7 }),
    notes: "Coincidencia publicada; no es prohibición.",
  },
]);

/**
 * Metadatos de ecuación. Evaluación posterior; no hay motor visual aquí.
 * Empírico publicado > ecuación reconstruida.
 */
export const energyEquations = Object.freeze({
  resistiveCurrent: {
    id: "I=P/V",
    source: "document",
    expression: "I = P / V",
  },
  voltageScaleFromTable: {
    id: "I(V)=I230*230/V",
    source: "document",
    expression: "I(V) = I_230 * 230 / V",
    note: "A 220 V el documento pide +4,5 %.",
  },
  compressorEnergy: {
    id: "E=P*24*Nd*d",
    source: "reconstruction",
    expression: "E_month = P_kW * 24 * daysPerMonth * dutyCycle",
  },
  hoursEnergy: {
    id: "E=P*h*Nd",
    source: "document-implied",
    expression: "E_month = P_kW * hoursPerDay * daysPerMonth",
  },
  cycleEnergy: {
    id: "E=e*n",
    source: "document",
    expression: "E_month = energyPerCycleKWh * cyclesPerMonth",
  },
  cost: {
    id: "C=E*c",
    source: "document",
    expression: "C_month = E_month * energyTariffPerKWh",
    note: "c es entrada. No hay tarifa embebida.",
  },
  steadyDemand: {
    id: "Pss",
    source: "software",
    expression: "P_ss = sum(S_i * V * I_run_i)",
  },
  transientDemand: {
    id: "Ptr",
    source: "software",
    expression: "P_tr = P_ss + sum(V * I_inrush_j) for loads starting now",
    note: "Inrush excluded from monthly kWh.",
  },
});

export function getLoadById(id) {
  return referenceLoads.find((item) => item.id === id) || null;
}

export function loadsInExclusiveGroup(groupId) {
  return referenceLoads.filter((item) => item.mutuallyExclusiveGroup === groupId);
}
