/**
 * USER INPUT → STATE → CALCULATION ENGINE → VALIDATION ENGINE → DERIVED → UI
 * No formulas live in event listeners.
 */

import { summarizeInstallation } from "../calculator.js";
import {
  calculateEnergyCost,
  costsByEquipment,
  resolveTariff,
} from "../economics.js";
import { validateTemplate } from "../validation/validate-template.js";
import { evaluateTerrainSuitability } from "../regionalization.js";
import { evaluateScenario, evaluateTransientEvent } from "../demand.js";
import { pickRangeValue } from "../models.js";
import { projectToTemplate } from "./state.js";
import { ENERGY_REQUIRED_NOTE } from "./constants.js";

function enabledLoads(project) {
  const items = project?.loads?.items;
  if (!Array.isArray(items)) return [];
  return items.filter((l) => l && l.enabled !== false);
}

function tariffFromProject(economics) {
  if (!economics) return null;
  const mode = economics.tariffMode;
  if (mode === "btc" && economics.btcPerKWh != null) {
    return { mode: "btc", btcPerKWh: economics.btcPerKWh, currency: economics.currency };
  }
  if (mode === "sats" && economics.satsPerKWh != null) {
    return { mode: "sats", satsPerKWh: economics.satsPerKWh, currency: economics.currency };
  }
  if (
    mode === "fiat-converted" &&
    economics.fiatPerKWh != null &&
    economics.fiatPerBTC != null
  ) {
    return {
      mode: "fiat-converted",
      fiatPerKWh: economics.fiatPerKWh,
      fiatPerBTC: economics.fiatPerBTC,
      currency: economics.currency,
    };
  }
  if (economics.btcPerKWh != null) {
    return { mode: "btc", btcPerKWh: economics.btcPerKWh };
  }
  if (economics.satsPerKWh != null) {
    return { mode: "sats", satsPerKWh: economics.satsPerKWh };
  }
  return null;
}

function computeInstallation(project) {
  const loads = enabledLoads(project);
  if (!loads.length) return { ok: false, reason: "no-detailed-loads", value: null };

  const states = { ...(project.scenario?.loadStates || {}) };
  for (const load of loads) {
    if (states[load.id] == null && load.state) states[load.id] = load.state;
  }

  return summarizeInstallation({
    loads,
    installation: project.installation,
    season: project.scenario?.season || "winter",
    states,
    voltageV: project.installation?.voltageNominalV,
    daysPerMonth: project.installation?.daysPerMonth,
    exclusiveSelection: project.scenario?.exclusiveSelection,
  });
}

function monthEnergyKWh(installation, validation) {
  if (installation?.ok && Number.isFinite(installation.value?.monthlyEnergyKWh?.calculated)) {
    const n = installation.value.monthlyEnergyKWh.calculated;
    if (n > 0 || installation.value.monthlyEnergyKWh.calculatedLoadCount > 0) return n;
  }
  const annualMWh = validation?.derivedValues?.annualEnergyMWh;
  if (Number.isFinite(annualMWh)) return (annualMWh * 1000) / 12;
  const avgMW = validation?.derivedValues ? null : null;
  const profile = null;
  void profile;
  void avgMW;
  return null;
}

function computeEconomics(project, installation, validation) {
  const tariffInput = tariffFromProject(project.economics);
  if (!tariffInput) {
    return {
      ok: false,
      reason: "no-tariff",
      message: "No tariff entered.",
      value: null,
      tariff: null,
    };
  }
  const resolved = resolveTariff(tariffInput);
  if (!resolved.ok) {
    return { ok: false, reason: "invalid-tariff", message: resolved.error?.message, value: null };
  }

  let monthKWh = null;
  if (installation?.ok && Number.isFinite(installation.value?.monthlyEnergyKWh?.calculated)) {
    const count = installation.value.monthlyEnergyKWh.calculatedLoadCount;
    if (count > 0) monthKWh = installation.value.monthlyEnergyKWh.calculated;
  }
  if (monthKWh == null) {
    const annualMWh = validation?.derivedValues?.annualEnergyMWh;
    if (Number.isFinite(annualMWh) && annualMWh > 0) {
      monthKWh = (annualMWh * 1000) / 12;
    }
  }
  if (monthKWh == null) {
    const avg = project.loads?.profile?.averageLoadMW;
    if (Number.isFinite(avg) && avg > 0) {
      monthKWh = avg * 1000 * 730;
    }
  }

  if (monthKWh == null || !Number.isFinite(monthKWh)) {
    return {
      ok: false,
      reason: "no-energy",
      message: ENERGY_REQUIRED_NOTE,
      value: null,
      tariff: resolved.value,
    };
  }

  const cost = calculateEnergyCost(monthKWh, resolved.value, {
    daysPerMonth: project.installation?.daysPerMonth || 30,
  });
  if (!cost.ok) {
    return { ok: false, reason: "cost-failed", message: cost.error?.message, value: null, tariff: resolved.value };
  }

  let breakdown = null;
  if (installation?.ok && Array.isArray(installation.value.energyRows)) {
    const items = installation.value.energyRows
      .filter((row) => row.calculated && Number.isFinite(row.calculated.energyMonthKWh))
      .map((row) => ({
        id: row.loadId || row.id,
        name: row.name,
        energyKWh: row.calculated.energyMonthKWh,
      }));
    if (items.length) {
      const byEq = costsByEquipment({
        items,
        tariff: resolved.value,
        totalEnergyKWh: monthKWh,
      });
      if (byEq.ok) {
        const nameOf = Object.fromEntries(
          (project.loads?.items || []).map((l) => [l.id, l.name])
        );
        breakdown = byEq.value.rows
          .map((r) => ({
            ...r,
            name: nameOf[r.id] || r.id,
          }))
          .sort((a, b) => b.energyKWh - a.energyKWh);
      }
    }
  }

  return {
    ok: true,
    reason: null,
    message: null,
    value: cost.value,
    tariff: resolved.value,
    breakdown,
  };
}

function computeTransients(project) {
  const loads = enabledLoads(project);
  const voltageV = project.installation?.voltageNominalV;
  if (!loads.length || !Number.isFinite(voltageV)) {
    return { events: [], scenario: null };
  }
  const states = { ...(project.scenario?.loadStates || {}) };
  for (const load of loads) {
    if (states[load.id] == null && load.state) states[load.id] = load.state;
  }
  const scenario = evaluateScenario({
    loads,
    states,
    voltageV,
    serviceLimitKW: project.installation?.serviceLimitKW,
    exclusiveSelection: project.scenario?.exclusiveSelection,
  });

  const events = [];
  for (const ev of project.transients || []) {
    const associated = ev.associatedLoadId
      ? loads.find((l) => l.id === ev.associatedLoadId)
      : null;
    const running =
      ev.runningCurrentA != null
        ? ev.runningCurrentA
        : associated
          ? pickRangeValue(associated.runCurrentA)
          : null;
    const starting =
      ev.startingCurrentA != null
        ? ev.startingCurrentA
        : running != null && ev.startingMultiple != null
          ? running * ev.startingMultiple
          : associated
            ? pickRangeValue(associated.inrushCurrentA)
            : null;
    events.push({
      ...ev,
      runningCurrentA: running,
      startingCurrentA: starting,
      evaluated:
        Number.isFinite(running) && Number.isFinite(starting)
          ? evaluateTransientEvent({
              voltageV,
              serviceLimitKW: project.installation?.serviceLimitKW,
              running: loads
                .filter((l) => states[l.id] === "RUNNING")
                .map((l) => ({ load: l })),
              starting: associated ? [{ load: associated }] : [],
            })
          : null,
    });
  }

  return { events, scenario: scenario.ok ? scenario.value : scenario };
}

export function recompute(project) {
  if (!project) {
    return {
      template: null,
      validation: null,
      installation: null,
      economics: { ok: false, reason: "no-project", value: null },
      siteSuitability: null,
      transients: { events: [], scenario: null },
      monthEnergyKWh: null,
    };
  }

  const template = projectToTemplate(project);
  const options = {};
  if (project.metadata?.validationProfile) {
    options.validationProfile = project.metadata.validationProfile;
  }
  const validation = validateTemplate(template, options);
  const installation = computeInstallation(project);
  const economics = computeEconomics(project, installation, validation);
  const siteSuitability = evaluateTerrainSuitability(template);
  const transients = computeTransients(project);
  const energyMonth = monthEnergyKWh(installation, validation);

  return {
    template,
    validation,
    installation,
    economics,
    siteSuitability,
    transients,
    monthEnergyKWh: energyMonth,
  };
}

export { tariffFromProject };
