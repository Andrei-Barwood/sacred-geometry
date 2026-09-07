/**
 * Arquitectura Sagrada — motor matemático de consumo.
 * Funciones puras. Sin DOM. Sin dependencias.
 *
 * API pública:
 *   calculateResistiveCurrent, calculateSinglePhaseCurrent
 *   calculateDutyCycleEnergy, calculateContinuousEnergy, calculateCycleEnergy
 *   compareEnergyToReference, compareCurrentToReference
 *   evaluateScenario, evaluateTransientEvent, serviceMarginKW
 *   calculateInrushRatio, evaluateInrush, calculateDutyCycle, evaluateCycling
 *   summarizeInstallation, connectedPower
 *   calculateEnergyCost, resolveTariff, costsByEquipment
 */

export {
  calculateResistiveCurrent,
  calculateSinglePhaseCurrent,
  scaleCurrentForVoltage,
  compareCurrentsAtVoltages,
  resolveRunCurrentA,
  resolveStandbyCurrentA,
  resolveInrushCurrentA,
} from "./current.js";

export {
  calculateContinuousEnergy,
  calculateDutyCycleEnergy,
  calculateCycleEnergy,
  calculateCycleEnergyFromPower,
  calculateStandbyEnergy,
  calculateLoadEnergy,
  compareEnergyToReference,
  calculateSeason,
} from "./energy.js";

export {
  connectedPower,
  serviceMarginKW,
  evaluateScenario,
  evaluateTransientEvent,
} from "./demand.js";

export {
  calculateDutyCycle,
  evaluateDutyCycle,
  evaluateCycling,
  calculateInrushRatio,
  evaluateInrush,
  compareCurrentToReference,
  currentDeviationPercent,
  evaluateStandby,
} from "./diagnostics.js";

export {
  LOAD_STATES,
  ENERGY_METHODS,
  ENERGY_COMPARE,
  CURRENT_BAND,
  SERVICE_STATUS,
  DEFAULT_THRESHOLDS,
  pickRangeValue,
  pickNominalPowerW,
  selectLoads,
  energyMethodFor,
} from "./models.js";

export { wattsToKilowatts, kilowattsToWatts, roundTo, TABLE_VOLTAGE_V } from "./units.js";

export {
  resolveTariff,
  multiplyEnergyByTariff,
  calculateEnergyCostBTC,
  calculateEnergyCostSats,
  calculateEnergyCost,
  calculateEnergyCostRange,
  costRangeFromEnergy,
  annualizeEnergy,
  calculateSeasonalCost,
  shareOfTotalPercent,
  costsByEquipment,
  formatBTC,
  formatSats,
  btcToSats,
  satsToBtc,
  SATS_PER_BTC,
  setBitcoinPriceProvider,
  getBitcoinPriceProvider,
  TARIFF_MODES,
  COST_DAY_LABEL,
  ANNUALIZED_ESTIMATE,
  SEASONAL_ANNUAL,
} from "./economics.js";

import { DEFAULT_DAYS_PER_MONTH, DEFAULT_MONTHS_PER_YEAR } from "./units.js";
import { fail, ok, requirePositive } from "./validation.js";
import {
  ENERGY_COMPARE,
  LOAD_STATES,
  SERVICE_STATUS,
  loadAppliesToSeason,
  selectLoads,
} from "./models.js";
import { calculateLoadEnergy, calculateSeason } from "./energy.js";
import { connectedPower, evaluateScenario, serviceMarginKW } from "./demand.js";
import { calculateInrushRatio, evaluateInrush } from "./diagnostics.js";
import { pickRangeValue } from "./models.js";

const DEFAULT_HEATER = { "space-heater": "heater-800" };

function defaultExclusive(season, exclusiveSelection) {
  if (exclusiveSelection) return exclusiveSelection;
  if (season === "summer") return { "space-heater": "heater-800" };
  return DEFAULT_HEATER;
}

/**
 * Resumen de instalación para un escenario de estación elegido por el usuario.
 */
export function summarizeInstallation({
  loads,
  installation,
  season = "winter",
  states = {},
  voltageV,
  daysPerMonth,
  exclusiveSelection,
  energyTariffPerKWh,
  allowCyclePowerApproximation = false,
  seasonMix = null,
} = {}) {
  const seasonResult = calculateSeason(season, seasonMix || {});
  if (!seasonResult.ok) return seasonResult;

  const inst = installation || {};
  const voltage = voltageV ?? inst.voltageNominalV ?? 230;
  const v = requirePositive(voltage, "voltageV");
  if (!v.ok) return v;

  const days = daysPerMonth ?? inst.daysPerMonth ?? DEFAULT_DAYS_PER_MONTH;
  const selection = defaultExclusive(season, exclusiveSelection);
  const selected = selectLoads(loads, selection);
  const connected = connectedPower(loads, {
    collapseExclusive: true,
    exclusiveSelection: selection,
  });
  if (!connected.ok) return connected;

  const energyRows = [];
  let calculatedMonth = 0;
  let calculatedCount = 0;
  let standbyMonth = 0;
  const warnings = [];

  for (const load of selected) {
    const row = calculateLoadEnergy(load, {
      season,
      daysPerMonth: days,
      voltageV: v.value,
      allowCyclePowerApproximation,
    });
    if (!row.ok) {
      warnings.push({ loadId: load.id, code: row.error.code, message: row.error.message });
      continue;
    }
    energyRows.push(row.value);
    if (row.value.calculated && Number.isFinite(row.value.calculated.energyMonthKWh)) {
      calculatedMonth += row.value.calculated.energyMonthKWh;
      calculatedCount += 1;
      if (load.category === "standby") {
        standbyMonth += row.value.calculated.energyMonthKWh;
      }
    }
    const cmp = row.value.comparison;
    if (cmp && (cmp.status === ENERGY_COMPARE.ABOVE || cmp.status === ENERGY_COMPARE.BELOW)) {
      warnings.push({
        loadId: load.id,
        code: "ENERGY_VS_REFERENCE",
        status: cmp.status,
        message: `calculated energy is ${cmp.status} the empirical range`,
      });
    }
  }

  if (!Number.isFinite(calculatedMonth)) {
    return fail("NOT_FINITE", "monthly energy sum is not finite");
  }

  const seasonalRef =
    (inst.seasonalEnergyKWh && inst.seasonalEnergyKWh[season]) || null;

  const demand = evaluateScenario({
    loads: selected,
    states,
    voltageV: v.value,
    serviceLimitKW: inst.serviceLimitKW,
    exclusiveSelection: selection,
  });
  if (!demand.ok) return demand;

  const serviceLimitKW = inst.serviceLimitKW ?? null;
  const runningPowerKW = demand.value.steadyStatePowerKW;
  const margin =
    serviceLimitKW != null
      ? serviceMarginKW(serviceLimitKW, runningPowerKW)
      : null;

  if (margin && margin.ok && margin.value.status === SERVICE_STATUS.OVERLOAD) {
    warnings.push({
      code: "OVERLOAD",
      message: "steady demand exceeds serviceLimitKW (no protection-trip claim)",
      protectionTripClaimed: false,
    });
  }

  let annualEnergyKWh = calculatedMonth * DEFAULT_MONTHS_PER_YEAR;
  let annualMethod = "monthly×12 of selected season";
  if (
    seasonMix &&
    Number.isFinite(seasonMix.winterMonths) &&
    Number.isFinite(seasonMix.summerMonths)
  ) {
    const winter = summarizeInstallation({
      loads,
      installation,
      season: "winter",
      states,
      voltageV: v.value,
      daysPerMonth: days,
      exclusiveSelection: selection,
      allowCyclePowerApproximation,
    });
    const summer = summarizeInstallation({
      loads,
      installation,
      season: "summer",
      states,
      voltageV: v.value,
      daysPerMonth: days,
      exclusiveSelection: selection,
      allowCyclePowerApproximation,
    });
    if (winter.ok && summer.ok) {
      annualEnergyKWh =
        winter.value.monthlyEnergyKWh.calculated * seasonMix.winterMonths +
        summer.value.monthlyEnergyKWh.calculated * seasonMix.summerMonths;
      annualMethod = "user seasonMix";
    }
  }

  const cost =
    energyTariffPerKWh != null && Number.isFinite(energyTariffPerKWh)
      ? calculatedMonth * energyTariffPerKWh
      : null;

  const inrushNotes = [];
  for (const load of selected) {
    const run = pickRangeValue(load.runCurrentA);
    const inrush = pickRangeValue(load.inrushCurrentA);
    if (run && inrush) {
      const ratio = calculateInrushRatio(inrush, run);
      if (ratio.ok) {
        const ev = evaluateInrush(ratio.value, {
          durationSeconds: pickRangeValue(load.inrushDurationSeconds),
        });
        if (ev.ok) inrushNotes.push({ loadId: load.id, ...ev.value });
      }
    }
  }

  return ok({
    season: seasonResult.value,
    voltageV: v.value,
    daysPerMonth: days,
    connectedPowerKW: connected.value.connectedPowerKW,
    connectedPowerW: connected.value.connectedPowerW,
    runningPowerKW,
    serviceLimitKW,
    serviceMarginKW: margin && margin.ok ? margin.value.serviceMarginKW : null,
    serviceUsagePercent: margin && margin.ok ? margin.value.serviceUsagePercent : null,
    serviceStatus: margin && margin.ok ? margin.value.status : null,
    monthlyEnergyKWh: {
      calculated: calculatedMonth,
      calculatedLoadCount: calculatedCount,
      reference: seasonalRef,
    },
    annualEnergyKWh,
    annualMethod,
    monthlyCost: cost,
    steadyCurrentA: demand.value.steadyStateCurrentA,
    peakTransientCurrentA: demand.value.peakTransientCurrentA,
    standbyEnergyKWh: standbyMonth,
    energyRows,
    demand: demand.value,
    inrushNotes,
    diagnosticWarnings: warnings,
    loadsConsidered: selected.map((l) => l.id),
    seasonApplies: selected.filter((l) => loadAppliesToSeason(l, season)).map((l) => l.id),
  });
}

