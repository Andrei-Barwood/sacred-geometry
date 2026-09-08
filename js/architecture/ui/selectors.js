/**
 * Centralized read model. UI should prefer these over reaching into state.
 */

import { pickRangeValue, pickNominalPowerW } from "../models.js";
import { calculateResistiveCurrent } from "../current.js";
import {
  ENERGY_REQUIRED_NOTE,
  LOAD_OVERLAP_NOTE,
  MODE_LABELS,
  PROVENANCE,
  VOLTAGE_DROP_NOTE,
  ISSUE_TO_SECTION,
} from "./constants.js";
import {
  formatBTCDisplay,
  formatCurrent,
  formatEnergy,
  formatNumber,
  formatPercent,
  formatPower,
  formatSatsDisplay,
  formatVoltageKV,
  isDisplayableNumber,
  provenanceLabel,
} from "./format.js";
import { buildArchitectureGraph } from "./architecture-graph.js";

export function getProjectTitle(project) {
  if (!project) return "Arquitectura Sagrada";
  return project.metadata?.name || "Untitled project";
}

export function getModeLabel(project) {
  return MODE_LABELS[project?.mode] || project?.mode || "—";
}

export function getProvenance(project, path) {
  const code = project?.provenance?.[path];
  if (!code) return null;
  return { code, label: provenanceLabel(code) };
}

export function getScale(project, derived) {
  const fromValidation = derived?.validation?.derivedValues?.scaleClass;
  if (fromValidation) return fromValidation;
  return project?.loads?.profile?.scaleBand || null;
}

export function getSummary(project, derived = {}) {
  const v = derived.validation;
  const d = v?.derivedValues || {};
  const inst = derived.installation?.ok ? derived.installation.value : null;
  const eco = derived.economics;
  const bessOn = project?.bess?.enabled === true;
  const subOn = project?.substation?.enabled === true;
  const genOn = project?.generation?.enabled === true;
  const hasTariff = eco?.ok === true;
  const cards = [];

  if (inst && isDisplayableNumber(inst.connectedPowerKW)) {
    cards.push({
      id: "connected",
      label: "Connected Power",
      value: formatPower(inst.connectedPowerKW, "kW"),
      provenance: "calculated",
    });
  }
  if (inst && isDisplayableNumber(inst.runningPowerKW)) {
    cards.push({
      id: "steady",
      label: "Steady Demand",
      value: formatPower(inst.runningPowerKW, "kW"),
      provenance: "calculated",
    });
  }

  const peakMW = project?.loads?.profile?.peakLoadMW;
  if (isDisplayableNumber(peakMW)) {
    cards.push({
      id: "peak",
      label: "Peak Load",
      value: formatPower(peakMW, "MW"),
      provenance: getProvenance(project, "loads.profile")?.code || "conceptual-assumption",
    });
  }

  if (inst && isDisplayableNumber(inst.serviceMarginKW)) {
    cards.push({
      id: "margin",
      label: "Service Margin",
      value: formatPower(inst.serviceMarginKW, "kW"),
      note: inst.serviceStatus || null,
      provenance: "calculated",
    });
  }

  const pv = project?.generation?.pv;
  if (genOn && pv) {
    if (isDisplayableNumber(pv.dcMWp)) {
      cards.push({ id: "pvdc", label: "Generation DC", value: `${formatNumber(pv.dcMWp, 2)} MWp` });
    }
    if (isDisplayableNumber(pv.acMW)) {
      cards.push({ id: "pvac", label: "Generation AC", value: `${formatNumber(pv.acMW, 2)} MW` });
    }
  }
  if (isDisplayableNumber(d.annualEnergyMWh)) {
    cards.push({
      id: "annual",
      label: "Annual Energy",
      value: formatEnergy(d.annualEnergyMWh, "MWh"),
      provenance: "calculated",
    });
  } else if (inst && isDisplayableNumber(inst.annualEnergyKWh)) {
    cards.push({
      id: "annual",
      label: "Annual Energy",
      value: formatEnergy(inst.annualEnergyKWh, "kWh"),
      provenance: "calculated",
    });
  }

  if (subOn && isDisplayableNumber(d.transformerTotalMVA)) {
    cards.push({
      id: "mva",
      label: "Installed MVA",
      value: `${formatNumber(d.transformerTotalMVA, 1)} MVA`,
      provenance: "calculated",
    });
  }
  if (subOn && project?.substation?.redundancyMode === "N-1" && isDisplayableNumber(d.nMinusOneCapacityMVA)) {
    cards.push({
      id: "n1",
      label: "N-1 Capacity",
      value: `${formatNumber(d.nMinusOneCapacityMW ?? d.nMinusOneCapacityMVA, 1)} ${
        d.nMinusOneCapacityMW != null ? "MW" : "MVA"
      }`,
      provenance: "calculated",
    });
  }

  if (bessOn) {
    if (isDisplayableNumber(project.bess.powerMW)) {
      cards.push({ id: "bessp", label: "BESS Power", value: `${formatNumber(project.bess.powerMW, 2)} MW` });
    }
    if (isDisplayableNumber(project.bess.energyMWh)) {
      cards.push({ id: "besse", label: "BESS Energy", value: `${formatNumber(project.bess.energyMWh, 2)} MWh` });
    }
    const dur = d.bessDurationHours;
    if (isDisplayableNumber(dur)) {
      cards.push({
        id: "bessd",
        label: "BESS Duration",
        value: `${formatNumber(dur, 2)} h`,
        provenance: "calculated",
      });
    }
  }

  if (hasTariff && eco.value?.cost) {
    cards.push({
      id: "btc-month",
      label: "BTC / month",
      value: formatBTCDisplay(eco.value.cost.monthBTC) || "—",
      extra: formatSatsDisplay(eco.value.cost.monthSats),
    });
  }

  if (v && isDisplayableNumber(v.qualityScore)) {
    cards.push({
      id: "score",
      label: "Validation Score",
      value: String(Math.round(v.qualityScore)),
      note: v.valid ? "no blocking errors" : "has errors",
    });
  }

  return cards;
}

export function getEnergyResults(project, derived = {}) {
  const inst = derived.installation?.ok ? derived.installation.value : null;
  const d = derived.validation?.derivedValues || {};
  const rows = [];

  if (inst?.energyRows) {
    for (const row of inst.energyRows) {
      const calc = row.calculated?.energyMonthKWh;
      const cmp = row.comparison;
      rows.push({
        id: row.loadId,
        name: row.name || row.loadId,
        monthKWh: isDisplayableNumber(calc) ? calc : null,
        dayKWh: isDisplayableNumber(calc) ? calc / (inst.daysPerMonth || 30) : null,
        yearKWh: isDisplayableNumber(calc) ? calc * 12 : null,
        reference: row.reference || null,
        status: cmp?.status || null,
        method: row.method || null,
      });
    }
  }

  return {
    monthKWh: derived.monthEnergyKWh,
    annualMWh: isDisplayableNumber(d.annualEnergyMWh) ? d.annualEnergyMWh : null,
    annualKWh: inst && isDisplayableNumber(inst.annualEnergyKWh) ? inst.annualEnergyKWh : null,
    dcAcRatio: isDisplayableNumber(d.dcAcRatio) ? d.dcAcRatio : null,
    rows,
    reference: inst?.monthlyEnergyKWh?.reference || null,
  };
}

export function getBessDerived(project, derived = {}) {
  const bess = project?.bess;
  if (!bess || bess.enabled !== true) {
    return { enabled: false, empty: "No BESS configured." };
  }
  const d = derived.validation?.derivedValues || {};
  const duration =
    isDisplayableNumber(d.bessDurationHours)
      ? d.bessDurationHours
      : isDisplayableNumber(bess.powerMW) && isDisplayableNumber(bess.energyMWh) && bess.powerMW > 0
        ? bess.energyMWh / bess.powerMW
        : null;
  return {
    enabled: true,
    durationHours: duration,
    storedDurationHours: bess.durationHours,
    usableEnergyMWh: d.usableEnergyMWh ?? null,
    deliveredEnergyMWh: d.deliveredEnergyMWh ?? null,
    durationIsDerived: true,
  };
}

export function getSubstationDerived(project, derived = {}) {
  const sub = project?.substation;
  if (!sub || sub.enabled !== true) {
    return { enabled: false, empty: "No substation configured." };
  }
  const d = derived.validation?.derivedValues || {};
  return {
    enabled: true,
    transformerTotalMVA: d.transformerTotalMVA ?? null,
    activeCapacityMW: d.activeCapacityMW ?? d.transformerCapacityMW ?? null,
    operationalCapacityMW: d.operationalCapacityMW ?? null,
    nMinusOneCapacityMVA: d.nMinusOneCapacityMVA ?? null,
    nMinusOneCapacityMW: d.nMinusOneCapacityMW ?? null,
    utilizationPercent:
      isDisplayableNumber(sub.utilizationFactor) ? sub.utilizationFactor * 100 : null,
    redundancyMode: sub.redundancyMode || null,
    loadingNote:
      sub.redundancyMode === "N-1"
        ? "NORMAL CAPACITY versus N-1 AVAILABLE CAPACITY"
        : null,
  };
}

export function getEconomicResults(project, derived = {}) {
  const eco = derived.economics;
  if (!eco) {
    return { ok: false, message: ENERGY_REQUIRED_NOTE, value: null, breakdown: [] };
  }
  if (!eco.ok) {
    return {
      ok: false,
      message: eco.message || (eco.reason === "no-tariff" ? "No tariff entered." : ENERGY_REQUIRED_NOTE),
      reason: eco.reason,
      value: null,
      breakdown: [],
      tariff: eco.tariff || null,
    };
  }
  const c = eco.value;
  return {
    ok: true,
    message: null,
    reason: null,
    tariff: eco.tariff,
    value: {
      energyDay: c.energy.dayKWh,
      energyMonth: c.energy.monthKWh,
      energyYear: c.energy.yearKWh,
      btcDay: c.cost.dayBTC,
      btcMonth: c.cost.monthBTC,
      btcYear: c.cost.yearBTC,
      satsDay: c.cost.daySats,
      satsMonth: c.cost.monthSats,
      satsYear: c.cost.yearSats,
      displayMonthBTC: formatBTCDisplay(c.cost.monthBTC),
      displayMonthSats: formatSatsDisplay(c.cost.monthSats),
    },
    breakdown: eco.breakdown || [],
  };
}

export function getValidationResults(derived = {}) {
  const v = derived.validation;
  if (!v) {
    return {
      valid: null,
      qualityScore: null,
      errors: [],
      warnings: [],
      notices: [],
      assumptions: [],
      counts: { errors: 0, warnings: 0, notices: 0, assumptions: 0 },
    };
  }
  const mapIssue = (issue) => ({
    ...issue,
    section: ISSUE_TO_SECTION[issue.category] || "overview",
    icon: issue.severity === "ERROR" ? "●" : issue.severity === "WARNING" ? "▲" : issue.severity === "NOTICE" ? "■" : "○",
  });
  return {
    valid: v.valid,
    qualityScore: v.qualityScore,
    scoreDisclaimer: v.scoreDisclaimer,
    errors: (v.errors || []).map(mapIssue),
    warnings: (v.warnings || []).map(mapIssue),
    notices: (v.notices || []).map(mapIssue),
    assumptions: (v.assumptions || []).map(mapIssue),
    counts: v.counts || {},
    derivedValues: v.derivedValues || {},
  };
}

export function getSiteView(project, derived = {}) {
  const env = project?.site?.environment || {};
  const suit = derived.siteSuitability?.siteSuitability || {
    preferred: [],
    avoid: [],
    investigate: [],
  };
  const active = (project?.geospatial?.sites || []).find((s) => s.id === project?.geospatial?.activeSiteId);
  return {
    country: active?.country || project?.countryName || project?.country || null,
    region: active?.region || project?.region || null,
    subregion: active?.comuna || project?.subregion || null,
    climate: env.climate || null,
    terrain: env.terrain || null,
    dust: env.dustLevel || null,
    soiling: env.soilingRisk || null,
    salinity: env.salinityRisk || null,
    humidity: env.humidityRisk || null,
    corrosion: env.corrosionRisk || null,
    floodRisk: env.floodRisk || null,
    heatRisk: env.extremeHeatRisk || null,
    duneRisk: env.duneRisk || null,
    accessDifficulty: env.accessDifficulty || null,
    waterAvailability: env.waterAvailability || null,
    preferred: suit.preferred,
    avoid: suit.avoid,
    investigate: suit.investigate,
    empty: !env || (!env.climate && !env.code) ? "No site-study data." : null,
    activeSiteId: active?.id || null,
    activeSiteName: active?.name || null,
    geoContext: active ? "active-site" : "project-region",
  };
}

export function getFeederNotes() {
  return VOLTAGE_DROP_NOTE;
}

export function getLoadOverlapNote() {
  return LOAD_OVERLAP_NOTE;
}

export function getArchitectureGraph(project, derived = {}) {
  return buildArchitectureGraph(project, derived);
}

export function getLoadEditorRows(project) {
  const items = project?.loads?.items || [];
  const voltage = project?.installation?.voltageNominalV || 230;
  return items.map((load) => {
    const nominalW = pickNominalPowerW(load);
    const runA = pickRangeValue(load.runCurrentA);
    const computedA =
      runA == null && isDisplayableNumber(nominalW)
        ? calculateResistiveCurrent(nominalW, load.voltageV || voltage)
        : null;
    return {
      id: load.id,
      name: load.name,
      quantity: load.quantity ?? 1,
      type: load.category || "other",
      nominalW,
      voltageV: load.voltageV ?? voltage,
      pf: pickRangeValue(load.powerFactor),
      runA: runA ?? (computedA && computedA.ok ? computedA.value : null),
      standbyA: pickRangeValue(load.standbyCurrentA),
      duty: pickRangeValue(load.dutyCycle),
      hoursPerDay: pickRangeValue(load.usage?.hoursPerDay),
      cyclesPerMonth: pickRangeValue(load.usage?.cyclesPerMonth),
      energyPerCycle: pickRangeValue(load.usage?.energyPerCycleKWh),
      season: load.season || "allYear",
      enabled: load.enabled !== false,
      state: load.state || "OFF",
      raw: load,
    };
  });
}

export function formatSummaryValue(card) {
  return card?.value ?? "—";
}

export {
  formatNumber,
  formatPower,
  formatEnergy,
  formatCurrent,
  formatVoltageKV,
  formatPercent,
  formatBTCDisplay,
  formatSatsDisplay,
  PROVENANCE,
};
