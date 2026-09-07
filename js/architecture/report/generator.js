/**
 * Pure report generator. Consumes engines; does not calculate in the renderer.
 */

import { cloneValue } from "../ui/clone.js";
import { recompute } from "../ui/derive.js";
import {
  getEconomicResults,
  getEnergyResults,
  getLoadEditorRows,
  getScale,
  getSiteView,
  getSubstationDerived,
  getSummary,
  getValidationResults,
} from "../ui/selectors.js";
import { pickRangeValue, pickNominalPowerW } from "../models.js";
import {
  formatCurrent,
  formatEnergy,
  formatNumber,
  formatPower,
  formatSatsDisplay,
  formatVoltageKV,
  isDisplayableNumber,
  provenanceLabel,
} from "../ui/format.js";
import { buildArchitectureGraph, semanticEdgeSet, semanticNodeSet, textualArchitectureSummary } from "../graph/index.js";
import {
  ENGINE_VERSION,
  SCHEMA_VERSION,
  compareSnapshots,
  newId,
  nowIso,
  resolveScenario,
} from "../storage/index.js";
import { MODE_LABELS } from "../ui/constants.js";
import { REPORT_GENERATOR_VERSION, reportStatusLabel, t } from "./i18n.js";
import { buildDiagrams } from "./diagrams.js";
import { sanitizeReportModel } from "./sanitizer.js";
import { buildVerifiedReportModel, cite } from "../data/report-citations.js";

export const DEFAULT_REPORT_OPTIONS = Object.freeze({
  reportMode: "standard",
  includeEconomics: true,
  includeSite: true,
  includeSacredView: false,
  includeSystemView: true,
  includeValidation: true,
  includeAssumptions: true,
  includeProvenance: false,
  includeVerifiedSources: true,
  includeDetailedLoads: true,
  includeScenarios: false,
  language: "en",
  units: "si",
  createSnapshotBefore: false,
});

function abbreviateId(id) {
  if (!id) return "—";
  const s = String(id);
  return s.length > 10 ? s.slice(0, 8) : s;
}

function display(value, formatted) {
  if (value == null || formatted == null || formatted === "—") return { text: "—", raw: null };
  return { text: formatted, raw: value };
}

function normalizeOptions(options = {}) {
  const mode = String(options.reportMode || "standard").toLowerCase();
  const detailed = mode === "detailed";
  return {
    ...DEFAULT_REPORT_OPTIONS,
    ...options,
    reportMode: mode,
    includeSacredView: options.includeSacredView ?? detailed,
    includeProvenance: options.includeProvenance ?? detailed,
    includeScenarios: options.includeScenarios ?? detailed,
    includeValidation: options.includeValidation !== false,
    includeAssumptions: options.includeAssumptions !== false,
    includeSystemView: options.includeSystemView !== false,
    includeEconomics: options.includeEconomics !== false,
    includeSite: options.includeSite !== false,
  };
}

function isDocument(source) {
  return !!(source && source.architecture && Array.isArray(source.scenarios));
}

function mapStatus(meta) {
  const s = meta?.status;
  if (s === "review") return "review";
  if (s === "concept" || s === "conceptual") return "concept";
  return "draft";
}

function provenanceOf(project, path, fallback) {
  const code = project?.provenance?.[path] || fallback || null;
  return code ? { code, label: provenanceLabel(code) || code } : null;
}

function usedFormulas(ctx) {
  const list = [];
  const { workbench, derived } = ctx;
  if ((workbench.loads?.items || []).length) {
    list.push({ id: "connected", text: "P_connected = Σ (n × P)" });
    list.push({ id: "energy-duty", text: "E = P × t × dutyCycle  (when duty-cycle method applies)" });
    list.push({ id: "energy-hours", text: "E = P × t  (continuous hours method)" });
    list.push({ id: "energy-cycle", text: "E_cycle = cycles × energyPerCycle" });
  }
  const method = workbench.generation?.energyCalculationMethod;
  const pv = workbench.generation?.pv;
  if (workbench.generation?.enabled && pv) {
    if (method === "specific-yield" && pv.specificYieldKWhPerKWpYear != null) {
      list.push({ id: "pv-yield", text: "E_year = PV_kWp × specificYield" });
    } else if (method === "capacity-factor" && pv.capacityFactor != null) {
      list.push({ id: "pv-cf", text: "E_year = P_AC × 8760 × capacityFactor" });
    }
  }
  if (workbench.bess?.enabled) {
    list.push({ id: "bess-duration", text: "duration = energy / power" });
  }
  if (workbench.substation?.enabled && workbench.substation.powerFactor != null) {
    list.push({
      id: "xfmr",
      text: "P ≈ S × PF  (conceptual conversion of apparent to active capacity at the stated PF)",
    });
  }
  if (derived.economics?.ok) {
    list.push({ id: "btc", text: "CostBTC = Energy_kWh × BTC_per_kWh" });
    list.push({ id: "sats", text: "1 BTC = 100,000,000 sats" });
  }
  return list;
}

function buildExecutiveSummary(ctx) {
  const { workbench, derived, lang, validation } = ctx;
  const mode = MODE_LABELS[workbench.mode] || workbench.mode || "hybrid";
  const app = workbench.metadata?.application || workbench.architecture?.application;
  const scale = getScale(workbench, derived);
  const grid = workbench.grid?.mode;
  const pv = workbench.generation?.enabled && workbench.generation.pv;
  const bess = workbench.bess?.enabled;
  const sub = workbench.substation?.enabled;
  const peak = workbench.loads?.profile?.peakLoadMW;
  const parts = [];
  parts.push(`This ${reportStatusLabel(mapStatus(workbench.metadata), lang).toLowerCase()} conceptual architecture is modeled as ${mode}.`);
  if (app) parts.push(`Application: ${app}.`);
  if (scale) parts.push(`Scale class: ${scale}.`);
  if (grid) parts.push(`Grid scenario: ${grid}.`);
  const bits = [];
  if (pv && isDisplayableNumber(pv.dcMWp)) bits.push(`${formatNumber(pv.dcMWp, 1)} MWp of PV generation`);
  if (bess && isDisplayableNumber(workbench.bess.powerMW) && isDisplayableNumber(workbench.bess.energyMWh)) {
    bits.push(`a ${formatNumber(workbench.bess.powerMW, 1)} MW / ${formatNumber(workbench.bess.energyMWh, 1)} MWh BESS`);
  }
  if (sub && isDisplayableNumber(workbench.substation.primaryKV) && isDisplayableNumber(workbench.substation.secondaryKV)) {
    bits.push(`a ${formatVoltageKV(workbench.substation.primaryKV).replace(" kV", "")}/${formatVoltageKV(workbench.substation.secondaryKV)} transformation stage`);
  }
  if (bits.length) parts.push(`The conceptual architecture contains ${bits.join(", ")}.`);
  if (isDisplayableNumber(peak)) parts.push(`Peak load (profile): ${formatPower(peak, "MW")}.`);
  const high = (validation.warnings || []).filter((w) => w.warningLevel === "HIGH");
  if (validation.errors?.length) parts.push(`${validation.errors.length} validation error(s) are recorded.`);
  if (high.length) parts.push(`High warnings: ${high.map((w) => w.message).slice(0, 3).join("; ")}.`);
  return parts.join(" ");
}

function kvList(workbench) {
  const vals = [
    workbench.substation?.primaryKV,
    workbench.substation?.secondaryKV,
    workbench.substation?.tertiaryKV,
  ].filter((v) => isDisplayableNumber(v));
  return vals.map((v) => formatVoltageKV(v)).join(" / ") || null;
}

function electricalRows(ctx) {
  const { workbench, derived } = ctx;
  const cards = getSummary(workbench, derived);
  const rows = cards.map((c) => ({ label: c.label, value: c.value, note: c.note || null }));
  const voltages = kvList(workbench);
  if (voltages) rows.push({ label: "Main voltage levels", value: voltages, note: null });
  return rows;
}

function loadSection(ctx, opts) {
  const { workbench, derived, lang } = ctx;
  const items = (workbench.loads?.items || []).filter((l) => l.enabled !== false);
  const profile = workbench.loads?.profile || {};
  const energy = getEnergyResults(workbench, derived);
  const inst = derived.installation?.ok ? derived.installation.value : null;
  const detailed = opts.includeDetailedLoads && items.length > 0 && items.length <= 40;
  const tables = [];
  if (detailed) {
    const energyById = Object.fromEntries((energy.rows || []).map((r) => [r.id, r]));
    tables.push({
      id: "detailed-loads",
      caption: "Detailed loads",
      columns: ["Name", "Type", "Qty", "Nominal", "Voltage", "Run", "Standby", "Duty", "Energy/month", "Reference", "Status"],
      rows: items.map((load) => {
        const w = pickNominalPowerW(load);
        const run = pickRangeValue(load.runCurrentA);
        const stby = pickRangeValue(load.standbyCurrentA);
        const duty = pickRangeValue(load.dutyCycle);
        const er = energyById[load.id];
        const ref = er?.reference;
        const refText = ref && isDisplayableNumber(ref.reference)
          ? formatEnergy(ref.reference, "kWh")
          : ref && isDisplayableNumber(ref.min)
            ? `${formatNumber(ref.min, 1)}–${formatNumber(ref.max, 1)} kWh`
            : "—";
        return [
          load.name || load.id,
          load.category || "—",
          String(load.quantity ?? 1),
          isDisplayableNumber(w) ? formatPower(w, "W") : "—",
          isDisplayableNumber(load.voltageV) ? `${formatNumber(load.voltageV, 0)} V` : "—",
          isDisplayableNumber(run) ? formatCurrent(run) : "—",
          isDisplayableNumber(stby) ? formatCurrent(stby) : "—",
          isDisplayableNumber(duty) ? formatNumber(duty, 2) : "—",
          er?.monthKWh != null ? formatEnergy(er.monthKWh, "kWh") : "—",
          refText,
          er?.status || "—",
        ];
      }),
    });
  }
  const hasAgg = ["baseLoadMW", "averageLoadMW", "peakLoadMW", "criticalLoadMW", "motorLoadMW", "cyclicLoadMW", "thermalLoadMW", "interruptibleLoadMW", "standbyLoadMW", "loadFactor"].some(
    (k) => profile[k] != null
  );
  if (hasAgg) {
    tables.push({
      id: "load-profile",
      caption: "Aggregated load profile",
      columns: ["Quantity", "Value"],
      rows: [
        ["Base load", isDisplayableNumber(profile.baseLoadMW) ? formatPower(profile.baseLoadMW, "MW") : "—"],
        ["Average load", isDisplayableNumber(profile.averageLoadMW) ? formatPower(profile.averageLoadMW, "MW") : "—"],
        ["Peak load", isDisplayableNumber(profile.peakLoadMW) ? formatPower(profile.peakLoadMW, "MW") : "—"],
        ["Critical load", isDisplayableNumber(profile.criticalLoadMW) ? formatPower(profile.criticalLoadMW, "MW") : "—"],
        ["Motor load", isDisplayableNumber(profile.motorLoadMW) ? formatPower(profile.motorLoadMW, "MW") : "—"],
        ["Cyclic load", isDisplayableNumber(profile.cyclicLoadMW) ? formatPower(profile.cyclicLoadMW, "MW") : "—"],
        ["Thermal load", isDisplayableNumber(profile.thermalLoadMW) ? formatPower(profile.thermalLoadMW, "MW") : "—"],
        ["Interruptible load", isDisplayableNumber(profile.interruptibleLoadMW) ? formatPower(profile.interruptibleLoadMW, "MW") : "—"],
        ["Standby load", isDisplayableNumber(profile.standbyLoadMW) ? formatPower(profile.standbyLoadMW, "MW") : "—"],
        ["Load factor", isDisplayableNumber(profile.loadFactor) ? formatNumber(profile.loadFactor, 2) : "—"],
      ],
      note: t(lang, "overlap"),
    });
  }
  const transients = workbench.transients || [];
  if (transients.length) {
    tables.push({
      id: "transients",
      caption: t(lang, "transients"),
      columns: ["Event", "Type", "Running", "Starting", "Multiple", "Duration s"],
      rows: transients.map((ev) => [
        ev.name || "—",
        ev.type || "—",
        isDisplayableNumber(ev.runningCurrentA) ? formatCurrent(ev.runningCurrentA) : isDisplayableNumber(ev.runningMW) ? formatPower(ev.runningMW, "MW") : "—",
        isDisplayableNumber(ev.startingCurrentA) ? formatCurrent(ev.startingCurrentA) : "—",
        isDisplayableNumber(ev.startingMultiple) ? formatNumber(ev.startingMultiple, 1) : "—",
        isDisplayableNumber(ev.durationSeconds) ? formatNumber(ev.durationSeconds, 2) : "—",
      ]),
      note: t(lang, "transientNote"),
    });
  }
  const seasonal = workbench.seasonalProfiles;
  if (seasonal && typeof seasonal === "object") {
    const rows = Object.entries(seasonal)
      .filter(([, v]) => v && typeof v === "object")
      .map(([k, v]) => [k, isDisplayableNumber(v.peakLoadMW) ? formatPower(v.peakLoadMW, "MW") : "—", v.note || "—"]);
    if (rows.length) {
      tables.push({
        id: "seasonal",
        caption: "Seasonal load",
        columns: ["Season", "Peak", "Note"],
        rows,
      });
    }
  }
  const notes = [];
  if (inst) {
    if (isDisplayableNumber(inst.connectedPowerKW)) notes.push(`Connected power: ${formatPower(inst.connectedPowerKW, "kW")}.`);
    if (isDisplayableNumber(inst.runningPowerKW)) notes.push(`Steady demand: ${formatPower(inst.runningPowerKW, "kW")}.`);
    if (isDisplayableNumber(inst.serviceMarginKW)) notes.push(`Service margin: ${formatPower(inst.serviceMarginKW, "kW")}.`);
    if (isDisplayableNumber(inst.monthlyEnergyKWh?.calculated)) {
      notes.push(`Calculated monthly energy: ${formatEnergy(inst.monthlyEnergyKWh.calculated, "kWh")}.`);
    }
    notes.push("Installed power is not monthly consumption.");
  }
  const included = tables.length > 0;
  return { id: "loads", titleKey: "loads", included, tables, notes };
}

function generationSection(ctx) {
  const { workbench, derived, lang } = ctx;
  const gen = workbench.generation;
  if (!gen?.enabled) return { id: "generation", included: false };
  const d = derived.validation?.derivedValues || {};
  const tables = [];
  const pv = gen.pv;
  if (pv && (gen.technologies || []).includes("pv")) {
    const yieldPending = pv.specificYieldKWhPerKWpYear == null && (pv.resourceProvenance === "future-site-study" || provenanceOf(workbench, "generation.pv.specificYieldKWhPerKWpYear")?.code === "future-site-study");
    tables.push({
      id: "pv",
      caption: "PV",
      columns: ["Parameter", "Value", "Provenance"],
      rows: [
        ["DC installed capacity", isDisplayableNumber(pv.dcMWp) ? `${formatNumber(pv.dcMWp, 2)} MWp` : "—", ""],
        ["AC capacity", isDisplayableNumber(pv.acMW) ? `${formatNumber(pv.acMW, 2)} MW` : "—", ""],
        ["DC/AC ratio", isDisplayableNumber(d.dcAcRatio) ? formatNumber(d.dcAcRatio, 3) : "—", "CALCULATED"],
        ["Mounting", pv.mounting || "—", ""],
        ["Bifacial", pv.bifacial ? "yes" : "no", ""],
        ["Energy calculation method", gen.energyCalculationMethod || "—", ""],
        ["Specific yield", cite(ctx.verified?.byParam, "specificYield", yieldPending ? t(lang, "pendingYield") : isDisplayableNumber(pv.specificYieldKWhPerKWpYear) ? `${formatNumber(pv.specificYieldKWhPerKWpYear, 0)} kWh/kWp·y` : "—"), provenanceOf(workbench, "generation.pv.specificYieldKWhPerKWpYear", pv.resourceProvenance)?.label || ""],
        ["Capacity factor", isDisplayableNumber(pv.capacityFactor) ? formatNumber(pv.capacityFactor, 3) : (gen.energyCalculationMethod === "specific-yield" ? "informational" : "—"), ""],
        ["Losses", isDisplayableNumber(pv.lossesPercent) ? `${formatNumber(pv.lossesPercent, 1)} %` : "—", ""],
        ["Annual energy", isDisplayableNumber(d.annualEnergyMWh) ? formatEnergy(d.annualEnergyMWh, "MWh") : "—", "CALCULATED"],
      ],
    });
  }
  if (gen.wind && isDisplayableNumber(gen.wind.ratedMW)) {
    tables.push({
      id: "wind",
      caption: "Wind",
      columns: ["Parameter", "Value"],
      rows: [["Rated power", formatPower(gen.wind.ratedMW, "MW")]],
    });
  }
  if (gen.diesel && isDisplayableNumber(gen.diesel.ratedMW)) {
    tables.push({
      id: "diesel",
      caption: "Diesel / backup",
      columns: ["Parameter", "Value"],
      rows: [
        ["Rated power", formatPower(gen.diesel.ratedMW, "MW")],
        ["Role", gen.diesel.role || "—"],
      ],
    });
  }
  return { id: "generation", titleKey: "generation", included: tables.length > 0, tables, notes: [] };
}

function bessSection(ctx) {
  const { workbench, derived, lang, validation } = ctx;
  const bess = workbench.bess;
  if (!bess?.enabled) return { id: "storage", included: false };
  const d = derived.validation?.derivedValues || {};
  const calcDur = isDisplayableNumber(d.bessDurationHours) ? d.bessDurationHours : null;
  const storedDur = isDisplayableNumber(bess.durationHours) ? bess.durationHours : null;
  const err = (validation.errors || []).some((e) => e.code === "BESS_DURATION");
  const rows = [
    ["Power", isDisplayableNumber(bess.powerMW) ? `${formatNumber(bess.powerMW, 2)} MW` : "—"],
    ["Energy", isDisplayableNumber(bess.energyMWh) ? `${formatNumber(bess.energyMWh, 2)} MWh` : "—"],
    ["Stored duration", storedDur != null ? `${formatNumber(storedDur, 2)} h` : "—"],
    ["Calculated duration", calcDur != null ? `${formatNumber(calcDur, 2)} h` : "—"],
    ["Round-trip efficiency", isDisplayableNumber(bess.roundTripEfficiency) ? formatNumber(bess.roundTripEfficiency, 2) : "—"],
    ["Usable DoD", isDisplayableNumber(bess.usableDoD) ? formatNumber(bess.usableDoD, 2) : "—"],
    ["Usable energy", isDisplayableNumber(d.usableEnergyMWh) ? formatEnergy(d.usableEnergyMWh, "MWh") : "—"],
    ["Delivered energy", isDisplayableNumber(d.deliveredEnergyMWh) ? formatEnergy(d.deliveredEnergyMWh, "MWh") : "—"],
    ["Purpose", Array.isArray(bess.purpose) ? bess.purpose.join(", ") : "—"],
    ["Operating state", bess.state || "ACTIVE"],
    ["Validation", err ? "ERROR" : "—"],
  ];
  return {
    id: "storage",
    titleKey: "storage",
    included: true,
    tables: [{ id: "bess", caption: "BESS", columns: ["Parameter", "Value"], rows }],
    notes: err ? [`${t(lang, "stored")}: ${storedDur} h. ${t(lang, "calculated")}: ${calcDur} h. Status: ERROR.`] : [`Duration from energy/power is ${t(lang, "calculated")}.`],
  };
}

function substationSection(ctx) {
  const { workbench, derived, lang } = ctx;
  const sub = workbench.substation;
  if (!sub?.enabled) return { id: "substation", included: false };
  const d = getSubstationDerived(workbench, derived);
  const peak = workbench.loads?.profile?.peakLoadMW;
  const tables = [
    {
      id: "sub",
      caption: "Transformation",
      columns: ["Parameter", "Value"],
      rows: [
        ["Primary voltage", isDisplayableNumber(sub.primaryKV) ? formatVoltageKV(sub.primaryKV) : "—"],
        ["Secondary voltage", isDisplayableNumber(sub.secondaryKV) ? formatVoltageKV(sub.secondaryKV) : "—"],
        ["Tertiary voltage", isDisplayableNumber(sub.tertiaryKV) ? formatVoltageKV(sub.tertiaryKV) : "—"],
        ["Transformer count", isDisplayableNumber(sub.transformerCount) ? String(sub.transformerCount) : "—"],
        ["Unit rating", isDisplayableNumber(sub.transformerMVA) ? `${formatNumber(sub.transformerMVA, 1)} MVA` : "—"],
        ["Total MVA", isDisplayableNumber(d.transformerTotalMVA) ? `${formatNumber(d.transformerTotalMVA, 1)} MVA` : "—"],
        ["PF", isDisplayableNumber(sub.powerFactor) ? formatNumber(sub.powerFactor, 3) : "—"],
        ["Approx active capacity", isDisplayableNumber(d.activeCapacityMW) ? `${formatNumber(d.activeCapacityMW, 1)} MW` : "—"],
        ["Utilization", isDisplayableNumber(d.utilizationPercent) ? `${formatNumber(d.utilizationPercent, 0)} %` : "—"],
        ["Operational capacity", isDisplayableNumber(d.operationalCapacityMW) ? `${formatNumber(d.operationalCapacityMW, 1)} MW` : "—"],
        ["Topology", sub.topology || "—"],
        ["Bus configuration", sub.busConfiguration || "—"],
        ["Redundancy", sub.redundancyMode || "—"],
      ],
    },
  ];
  const notes = [t(lang, "conceptualCapacity")];
  if (sub.redundancyMode === "N-1") {
    const n = sub.transformerCount;
    const avail = isDisplayableNumber(n) ? n - 1 : null;
    const n1mw = d.nMinusOneCapacityMW;
    const within = isDisplayableNumber(peak) && isDisplayableNumber(n1mw) && peak <= n1mw + 1e-9;
    tables.push({
      id: "n1",
      caption: "NORMAL OPERATION vs N-1 CONDITION",
      columns: ["Quantity", "Normal operation", "N-1 condition"],
      rows: [
        ["Installed transformers", isDisplayableNumber(n) ? String(n) : "—", isDisplayableNumber(avail) ? String(avail) : "—"],
        ["Available MVA", isDisplayableNumber(d.transformerTotalMVA) ? `${formatNumber(d.transformerTotalMVA, 1)} MVA` : "—", isDisplayableNumber(d.nMinusOneCapacityMVA) ? `${formatNumber(d.nMinusOneCapacityMVA, 1)} MVA` : "—"],
        ["Approx MW capacity", isDisplayableNumber(d.activeCapacityMW) ? `${formatNumber(d.activeCapacityMW, 1)} MW` : "—", isDisplayableNumber(n1mw) ? `${formatNumber(n1mw, 1)} MW` : "—"],
        ["Peak load", isDisplayableNumber(peak) ? formatPower(peak, "MW") : "—", isDisplayableNumber(peak) ? formatPower(peak, "MW") : "—"],
      ],
    });
    notes.push(within ? t(lang, "n1Within") : t(lang, "n1Outside"));
  }
  return { id: "substation", titleKey: "substation", included: true, tables, notes };
}

function gridSection(ctx) {
  const { workbench, lang } = ctx;
  const g = workbench.grid;
  if (!g) return { id: "grid", included: false };
  const notes = [];
  if (g.mode === "weak-grid" || g.strength === "weak") notes.push(t(lang, "weakGrid"));
  return {
    id: "grid",
    titleKey: "grid",
    included: true,
    tables: [
      {
        id: "grid",
        caption: "Grid interface",
        columns: ["Parameter", "Value"],
        rows: [
          ["Grid mode", g.mode || "—"],
          ["Nominal frequency", cite(ctx.verified?.byParam, "frequencyHz", isDisplayableNumber(g.frequencyHz) ? `${formatNumber(g.frequencyHz, 0)} Hz` : "—")],
          ["Grid operator", g.operator || "—"],
          ["Grid strength", g.strength || "—"],
          ["Import allowed", g.importAllowed ? "yes" : "no"],
          ["Export allowed", g.exportAllowed ? "yes" : "no"],
          ["Islandable", g.islandable || g.mode === "islandable" ? "yes" : "no"],
          ["Backup available", g.backupAvailable ? "yes" : "no"],
          ["Black-start required", g.blackStartRequired ? "yes" : "no"],
        ],
      },
    ],
    notes,
  };
}

function feederSection(ctx) {
  const { workbench, lang } = ctx;
  const feeders = workbench.feeders || [];
  if (!feeders.length) return { id: "feeders", included: false };
  return {
    id: "feeders",
    titleKey: "feeders",
    included: true,
    tables: [
      {
        id: "feeders",
        caption: "Feeders",
        columns: ["Feeder", "Voltage", "Role", "Length km", "Estimated load", "Losses %"],
        rows: feeders.map((f) => [
          f.name || "—",
          isDisplayableNumber(f.voltageKV) ? formatVoltageKV(f.voltageKV) : "—",
          f.role || "—",
          isDisplayableNumber(f.lengthKM) ? formatNumber(f.lengthKM, 1) : "—",
          isDisplayableNumber(f.estimatedLoadMW) ? formatPower(f.estimatedLoadMW, "MW") : "—",
          isDisplayableNumber(f.lossesPercent) ? formatNumber(f.lossesPercent, 1) : "—",
        ]),
        note: t(lang, "voltageDrop"),
      },
    ],
    notes: [t(lang, "voltageDrop")],
  };
}

function energySection(ctx) {
  const { workbench, derived, lang } = ctx;
  const energy = getEnergyResults(workbench, derived);
  const inst = derived.installation?.ok ? derived.installation.value : null;
  const d = derived.validation?.derivedValues || {};
  const has = energy.monthKWh != null || energy.annualMWh != null || energy.annualKWh != null || (energy.rows || []).length;
  if (!has) return { id: "energy", included: false };
  const rows = [];
  if (inst?.monthlyEnergyKWh?.calculated != null) {
    const m = inst.monthlyEnergyKWh.calculated;
    rows.push(["Daily (avg)", formatEnergy(m / (inst.daysPerMonth || 30), "kWh")]);
    rows.push(["Monthly", formatEnergy(m, "kWh")]);
    rows.push(["Annual", formatEnergy(inst.annualEnergyKWh, "kWh")]);
  } else if (energy.annualMWh != null) {
    rows.push(["Annual generation", formatEnergy(energy.annualMWh, "MWh")]);
  }
  const ref = energy.reference;
  if (ref && (ref.min != null || ref.reference != null)) {
    rows.push(["Reference min", isDisplayableNumber(ref.min) ? formatEnergy(ref.min, "kWh") : "—"]);
    rows.push(["Reference", isDisplayableNumber(ref.reference) ? formatEnergy(ref.reference, "kWh") : "—"]);
    rows.push(["Reference max", isDisplayableNumber(ref.max) ? formatEnergy(ref.max, "kWh") : "—"]);
  }
  const notes = [];
  const genMWh = d.annualEnergyMWh;
  const loadMWh = isDisplayableNumber(workbench.loads?.profile?.averageLoadMW)
    ? workbench.loads.profile.averageLoadMW * 8760
    : null;
  if (isDisplayableNumber(genMWh) && isDisplayableNumber(loadMWh) && loadMWh > 0) {
    rows.push(["Energy coverage ratio", formatNumber(genMWh / loadMWh, 2)]);
    notes.push(t(lang, "coverageNote"));
  }
  notes.push(t(lang, "noDispatch"));
  return {
    id: "energy",
    titleKey: "energy",
    included: rows.length > 0,
    tables: [{ id: "energy", caption: "Energy", columns: ["Period", "Value"], rows }],
    notes,
  };
}

function economicsSection(ctx, opts) {
  const { workbench, derived, lang } = ctx;
  if (!opts.includeEconomics) return { id: "economics", included: false };
  const eco = getEconomicResults(workbench, derived);
  if (!eco.ok) {
    if (eco.reason === "no-tariff") return { id: "economics", included: false, omitted: t(lang, "noTariff") };
    return { id: "economics", included: false, omitted: eco.message };
  }
  const v = eco.value;
  const tables = [
    {
      id: "btc",
      caption: "Energy cost — Bitcoin",
      columns: ["Period", "Energy", "BTC", "sats"],
      rows: [
        ["Daily", formatEnergy(v.energyDay, "kWh"), v.displayMonthBTC ? String(v.btcDay) : String(v.btcDay), formatSatsDisplay(v.satsDay) || "—"],
        ["Monthly", formatEnergy(v.energyMonth, "kWh"), v.displayMonthBTC || "—", v.displayMonthSats || "—"],
        ["Annual", formatEnergy(v.energyYear, "kWh"), v.btcYear != null ? String(v.btcYear) : "—", formatSatsDisplay(v.satsYear) || "—"],
      ],
    },
  ];
  const tariffRows = [
    ["Mode", eco.tariff?.mode || workbench.economics?.tariffMode || "—"],
    ["BTC/kWh", isDisplayableNumber(eco.tariff?.btcPerKWh) ? String(eco.tariff.btcPerKWh) : "—"],
    ["sats/kWh", isDisplayableNumber(eco.tariff?.satsPerKWh) ? String(eco.tariff.satsPerKWh) : "—"],
    ["Provenance", "USER INPUT"],
  ];
  if (workbench.economics?.tariffMode === "fiat-converted") {
    tariffRows.push(["Method", "BTC/kWh = fiat_per_kWh / fiat_per_BTC"]);
  }
  tables.push({ id: "tariff", caption: "Tariff", columns: ["Parameter", "Value"], rows: tariffRows });
  if (eco.breakdown?.length) {
    tables.push({
      id: "dominant",
      caption: "Load cost share",
      columns: ["Load", "kWh/month", "Share %", "BTC/month", "sats/month"],
      rows: eco.breakdown.map((b) => [
        b.name || b.id,
        formatNumber(b.energyKWh, 1),
        formatNumber(b.shareOfTotalEnergyPercent, 1),
        formatSatsDisplay ? String(b.monthBTC) : String(b.monthBTC),
        formatSatsDisplay(b.monthSats) || "—",
      ]),
    });
  }
  return { id: "economics", titleKey: "economics", included: true, tables, notes: [] };
}

function scenarioSection(ctx, opts, document) {
  if (!opts.includeScenarios || !document?.scenarios) return { id: "scenarios", included: false };
  const rows = document.scenarios.map((sc) => [
    sc.name,
    sc.id === document.activeScenarioId ? "ACTIVE" : "",
    sc.gridState?.connected === false ? "islanded" : sc.operatingState || "—",
    sc.bessState || "—",
    Object.keys(sc.generationStates || {}).join(",") || "—",
  ]);
  return {
    id: "scenarios",
    titleKey: "scenarios",
    included: true,
    tables: [{ id: "scenarios", caption: "Scenarios", columns: ["Scenario", "Flag", "Grid/operating", "BESS", "Generation"], rows }],
    notes: ["Only operating overrides are listed. Physical topology is unchanged."],
  };
}

function siteSection(ctx, opts) {
  const { workbench, derived, lang } = ctx;
  if (!opts.includeSite) return { id: "site", included: false };
  const site = getSiteView(workbench, derived);
  if (site.empty && !site.country) return { id: "site", included: false };
  const rows = [
    ["Country", site.country || "—"],
    ["Region", site.region || "—"],
    ["Subregion", site.subregion || "—"],
    ["Climate", site.climate || "—"],
    ["Terrain", site.terrain || "—"],
    ["Dust", site.dust || "—"],
    ["Soiling", site.soiling || "—"],
    ["Salinity", site.salinity || "—"],
    ["Humidity", site.humidity || "—"],
    ["Corrosion", site.corrosion || "—"],
    ["Flood", site.floodRisk || "—"],
    ["Heat", site.heatRisk || "—"],
    ["Dunes", site.duneRisk || "—"],
    ["Access", site.accessDifficulty || "—"],
    ["Water", site.waterAvailability || "—"],
  ];
  return {
    id: "site",
    titleKey: "site",
    included: true,
    tables: [{ id: "site", caption: "Regional context", columns: ["Parameter", "Value"], rows }],
    notes: [t(lang, "siteNote")],
    suitability: { preferred: site.preferred || [], avoid: site.avoid || [], investigate: site.investigate || [] },
  };
}

function validationSection(ctx, opts) {
  if (!opts.includeValidation) return { id: "validation", included: false };
  const { validation, lang } = ctx;
  const rows = [];
  const push = (list) => {
    for (const i of list || []) {
      rows.push([i.severity || "", i.category || "", i.code || "", i.message || "", i.section || ""]);
    }
  };
  push(validation.errors);
  push(validation.warnings);
  push(validation.notices);
  return {
    id: "validation",
    titleKey: "validation",
    included: true,
    score: validation.qualityScore,
    tables: [
      {
        id: "issues",
        caption: "Validation issues",
        columns: ["Severity", "Category", "Code", "Message", "Review"],
        rows,
      },
    ],
    notes: [t(lang, "scoreNote")],
  };
}

function assumptionsSection(ctx, opts) {
  if (!opts.includeAssumptions) return { id: "assumptions", included: false };
  const list = ctx.workbench.assumptions || [];
  const counts = {};
  for (const a of list) counts[a] = (counts[a] || 0) + 1;
  const common = Object.entries(counts)
    .filter(([, n]) => n > 1)
    .map(([t]) => t);
  const specific = list.filter((a) => (counts[a] || 0) === 1);
  return {
    id: "assumptions",
    titleKey: "assumptions",
    included: list.length > 0 || true,
    common,
    specific,
    notes: [],
    always: true,
  };
}

function provenanceSection(ctx, opts) {
  if (!opts.includeProvenance) return { id: "provenance", included: false };
  const rows = Object.entries(ctx.workbench.provenance || {}).map(([param, code]) => [
    param,
    "",
    provenanceLabel(code) || code,
    /SRC_/.test(String(code)) ? String(code) : "",
    "",
  ]);
  if (ctx.workbench.generation?.pv?.resourceProvenance) {
    rows.push([
      "generation.pv.specificYieldKWhPerKWpYear",
      ctx.workbench.generation.pv.specificYieldKWhPerKWpYear == null ? "null" : String(ctx.workbench.generation.pv.specificYieldKWhPerKWpYear),
      provenanceLabel(ctx.workbench.generation.pv.resourceProvenance) || "SITE STUDY",
      "",
      ctx.workbench.generation.pv.specificYieldKWhPerKWpYear == null ? "Pending site study" : "",
    ]);
  }
  return {
    id: "provenance",
    titleKey: "provenance",
    included: rows.length > 0,
    tables: [
      {
        id: "prov",
        caption: "Provenance",
        columns: ["Parameter", "Value", "Source type", "Source reference", "Status"],
        rows,
      },
    ],
  };
}

function verifiedSourcesSection(ctx, opts, verified) {
  const include = opts.includeVerifiedSources !== false;
  const refs = verified?.references || [];
  if (!include || !refs.length) return { id: "verifiedSources", included: false };
  return {
    id: "verifiedSources",
    titleKey: "verifiedSources",
    included: true,
    tables: [
      {
        id: "verified-refs",
        caption: "References actually used in this project",
        columns: ["Id", "Organization", "Title", "Published", "Retrieved", "Scope", "URL", "Freshness"],
        rows: refs.map((r) => [
          r.key,
          r.organization,
          r.title,
          r.publishedAt || "—",
          r.retrievedAt || "—",
          r.scope || "—",
          r.url || "—",
          r.stale ? `STALE (${r.freshness})` : r.freshness,
        ]),
      },
    ],
    notes: refs.filter((r) => r.attributionRequired).map((r) => `Attribution: ${r.organization} — ${r.name}.`),
  };
}

function evidenceCoverageSection(ctx, opts, verified) {
  if (opts.reportMode === "summary") return { id: "evidenceCoverage", included: false };
  const cov = verified?.coverage;
  if (!cov) return { id: "evidenceCoverage", included: false };
  return {
    id: "evidenceCoverage",
    titleKey: "evidenceCoverage",
    included: true,
    score: cov.evidenceCoverageScore,
    tables: [
      {
        id: "ev-cov",
        caption: "Evidence coverage (not a quality or regional-fit score)",
        columns: ["Parameter", "Status", "Note"],
        rows: (cov.rows || []).map((r) => [r.label, r.status, r.note || ""]),
      },
    ],
    notes: [cov.disclaimer],
  };
}

function dataReviewSection(ctx, opts, verified) {
  const notes = verified?.reviewNotes || [];
  if (!notes.length) return { id: "dataReview", included: false };
  return {
    id: "dataReview",
    titleKey: "dataReview",
    included: true,
    notes,
  };
}

function limitationsSection(ctx, opts) {
  if (opts.reportMode !== "detailed") return { id: "limits", included: false };
  const { workbench, derived } = ctx;
  const rows = [
    ["Load calculation", (workbench.loads?.items || []).length || workbench.loads?.profile?.peakLoadMW != null ? "Performed" : "Not performed"],
    ["Energy estimate", derived.monthEnergyKWh != null || derived.validation?.derivedValues?.annualEnergyMWh != null ? "Performed" : "Not performed"],
    ["BESS sizing relation", workbench.bess?.enabled ? "Performed" : "Not performed"],
    ["Short-circuit", "Not performed"],
    ["Protection coordination", "Not performed"],
    ["Grounding study", "Not performed"],
    ["Voltage-drop", "Not performed / insufficient conductor data"],
    ["Hourly dispatch", "Not performed"],
    ["Grid stability", "Not performed"],
    ["Site survey", workbench.generation?.pv?.specificYieldKWhPerKWpYear == null ? "Pending" : "Not performed"],
  ];
  return {
    id: "limits",
    titleKey: "appendixLimits",
    included: true,
    appendix: true,
    tables: [{ id: "limits", caption: "Studies", columns: ["Study", "Status"], rows }],
  };
}

function numberSections(sections, mode) {
  const summaryKeep = new Set(["exec", "architecture", "electrical", "validation", "assumptions", "review", "verifiedSources"]);
  const visible = [];
  let n = 0;
  for (const s of sections) {
    if (!s || s.included === false) continue;
    if (mode === "summary" && s.id !== "header" && !summaryKeep.has(s.id) && !s.always && s.id !== "exec") {
      if (!["exec", "architecture", "electrical", "validation", "assumptions", "disclaimer", "review"].includes(s.id)) continue;
    }
    if (s.id === "header" || s.id === "toc" || s.id === "exec" || s.id === "disclaimer" || s.id === "banner") {
      visible.push({ ...s, number: null });
      continue;
    }
    n += 1;
    visible.push({ ...s, number: n });
  }
  return visible;
}

export function generateEngineeringReport(source, options = {}) {
  const original = source;
  const frozen = cloneValue(source);
  const opts = normalizeOptions(options);
  const lang = opts.language || "en";
  let document = null;
  let workbench;
  const snapshotMeta = options.snapshotMeta || null;

  if (isDocument(frozen)) {
    document = frozen;
    workbench = resolveScenario(document, opts.scenarioId || document.activeScenarioId);
  } else {
    workbench = frozen;
  }

  if (document) {
    workbench.acceptedEvidence = workbench.acceptedEvidence || document.acceptedEvidence || {};
    workbench.evidenceHistory = workbench.evidenceHistory || document.evidenceHistory || [];
    workbench.dismissedEvidence = workbench.dismissedEvidence || document.dismissedEvidence || {};
  }
  const verified = buildVerifiedReportModel(workbench);

  const derived = recompute(workbench);
  const graph = buildArchitectureGraph(workbench, derived);
  const validation = getValidationResults(derived);
  const topology = textualArchitectureSummary(graph);
  const ctx = { workbench, derived, graph, validation, lang, document, verified };

  const diagrams = buildDiagrams(graph, opts, topology);
  const highWarnings = (validation.warnings || []).filter((w) => w.warningLevel === "HIGH");

  const architecture = {
    id: "architecture",
    titleKey: "architecture",
    included: true,
    facts: {
      mode: MODE_LABELS[workbench.mode] || workbench.mode,
      application: workbench.metadata?.application || null,
      gridMode: workbench.grid?.mode || null,
      scale: getScale(workbench, derived),
      technologies: workbench.generation?.technologies || [],
      storage: workbench.bess?.enabled === true,
      transformers: workbench.substation?.enabled === true,
      voltages: kvList(workbench),
      feeders: (workbench.feeders || []).length,
      dominantLoad: workbench.loads?.profile?.dominantLoadType || null,
    },
    topology,
    notes: [],
  };

  const rawSections = [
    { id: "exec", titleKey: "exec", included: true, text: buildExecutiveSummary(ctx), highWarnings },
    architecture,
    { id: "electrical", titleKey: "electrical", included: true, tables: [{ id: "el", caption: "Electrical summary", columns: ["Quantity", "Value"], rows: electricalRows(ctx).map((r) => [r.label, r.value]) }] },
    loadSection(ctx, opts),
    generationSection(ctx),
    bessSection(ctx),
    substationSection(ctx),
    gridSection(ctx),
    feederSection(ctx),
    energySection(ctx),
    economicsSection(ctx, opts),
    scenarioSection(ctx, opts, document),
    siteSection(ctx, opts),
    validationSection(ctx, opts),
    assumptionsSection(ctx, opts),
    verifiedSourcesSection(ctx, opts, verified),
    evidenceCoverageSection(ctx, opts, verified),
    dataReviewSection(ctx, opts, verified),
    provenanceSection(ctx, opts),
    {
      id: "formulas",
      titleKey: "appendixFormulas",
      included: opts.reportMode === "detailed",
      appendix: true,
      formulas: usedFormulas(ctx),
    },
    limitationsSection(ctx, opts),
    {
      id: "review",
      titleKey: "review",
      included: true,
      errors: validation.errors?.length || 0,
      warnings: validation.warnings?.length || 0,
      siteStudyPending: workbench.generation?.pv?.specificYieldKWhPerKWpYear == null && workbench.generation?.enabled,
      detailedEngineeringPending: true,
    },
    { id: "disclaimer", titleKey: "disclaimer", included: true, text: t(lang, "disclaimer") },
  ];

  const sections = numberSections(rawSections, opts.reportMode);
  const toc = opts.reportMode === "detailed"
    ? sections.filter((s) => s.number).map((s) => ({ id: s.id, number: s.number, titleKey: s.titleKey }))
    : [];

  const metaStatus = mapStatus(document?.metadata || workbench.metadata);
  const model = {
    reportMetadata: {
      format: "sacred-architecture-report",
      reportId: newId(),
      generatedAt: nowIso(),
      reportGeneratorVersion: REPORT_GENERATOR_VERSION,
      schemaVersion: document?.schemaVersion || SCHEMA_VERSION,
      engineVersion: ENGINE_VERSION,
      scenarioId: opts.scenarioId || document?.activeScenarioId || workbench.scenario?.id || null,
      projectUpdatedAt: document?.updatedAt || null,
      unsaved: options.unsaved === true,
      language: lang,
      reportMode: opts.reportMode,
      status: metaStatus,
      statusLabel: reportStatusLabel(metaStatus, lang),
      snapshot: snapshotMeta,
      sourceRevision: options.sourceRevision || document?.updatedAt || null,
    },
    projectMetadata: {
      name: workbench.metadata?.name || document?.metadata?.name || "Untitled project",
      projectId: document?.projectId || workbench.metadata?.id || null,
      projectIdShort: abbreviateId(document?.projectId || workbench.metadata?.id),
      authorAlias: workbench.metadata?.authorAlias || document?.metadata?.authorAlias || null,
      conceptual: true,
    },
    executiveSummary: buildExecutiveSummary(ctx),
    architectureSummary: architecture,
    electricalSummary: electricalRows(ctx),
    sections,
    toc,
    diagrams: {
      systemSvg: diagrams.systemSvg,
      sacredSvg: diagrams.sacredSvg,
      systemCaption: t(lang, "systemCaption"),
      sacredCaption: t(lang, "sacredCaption"),
      sacredNote: t(lang, "sacredNote"),
      topology,
      notices: diagrams.notices,
      semanticNodes: semanticNodeSet(graph),
      semanticEdges: semanticEdgeSet(graph),
    },
    validationSummary: {
      valid: validation.valid,
      qualityScore: validation.qualityScore,
      errors: validation.errors || [],
      warnings: validation.warnings || [],
      highWarnings,
      notices: validation.notices || [],
    },
    citations: verified.references || [],
    verifiedSources: verified.references || [],
    evidenceCoverage: verified.coverage || null,
    hasErrors: (validation.errors || []).length > 0,
  };

  void original;
  void display;
  void getLoadEditorRows;
  return sanitizeReportModel(model);
}

export function generateRevisionComparisonReport(snapshotA, snapshotB, options = {}) {
  const lang = options.language || "en";
  const diff = compareSnapshots(snapshotA, snapshotB);
  const tables = Object.entries(diff.groups || {}).map(([cat, rows]) => ({
    id: `rev-${cat}`,
    caption: cat,
    columns: ["Parameter", "Revision A", "Revision B", "Unit"],
    rows: rows.map((r) => [r.label, r.from, r.to, r.unit || ""]),
  }));
  return sanitizeReportModel({
    reportMetadata: {
      format: "sacred-architecture-revision-report",
      reportId: newId(),
      generatedAt: nowIso(),
      reportGeneratorVersion: REPORT_GENERATOR_VERSION,
      engineVersion: ENGINE_VERSION,
      language: lang,
      reportMode: "comparison",
    },
    projectMetadata: {
      name: options.projectName || "Revision comparison",
      projectIdShort: "",
    },
    executiveSummary: `Comparison of two snapshots. ${diff.count} input difference(s).`,
    sections: [
      { id: "comparison", titleKey: "architecture", included: true, number: 1, tables },
      { id: "disclaimer", included: true, text: t(lang, "disclaimer") },
    ],
    toc: [],
    diagrams: { systemSvg: null, sacredSvg: null, notices: [] },
    validationSummary: { errors: [], warnings: [], highWarnings: [], notices: [] },
    hasErrors: false,
    comparison: diff,
  });
}
