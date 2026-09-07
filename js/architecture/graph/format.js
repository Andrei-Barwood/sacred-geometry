/**
 * Graph labels and accessible summaries. Presentation only.
 */

import { formatEnergy, formatNumber, formatPower, formatVoltageKV, isDisplayableNumber } from "../ui/format.js";
import { classifyVoltageDomain } from "./model.js";

function pendingOrOmit(value, unitLabel) {
  if (value == null) return null;
  if (!isDisplayableNumber(value)) return `${unitLabel} pending`;
  return null;
}

export function formatNodeLabel(node, options = {}) {
  const density = options.density || options.viewportMode || "desktop";
  const compact = density === "mobile" || density === "tablet";
  const type = node?.type;
  const el = node?.electrical || {};
  const main = node?.label || type || "";
  const secondary = [];
  const tertiary = [];

  if (type === "PV") {
    if (isDisplayableNumber(el.dcMWp)) secondary.push(`${formatNumber(el.dcMWp, 1)} MWp`);
    if (isDisplayableNumber(el.activePowerMW)) tertiary.push(`${formatNumber(el.activePowerMW, 1)} MWac`);
  } else if (type === "WIND") {
    if (isDisplayableNumber(el.activePowerMW)) secondary.push(`${formatNumber(el.activePowerMW, 1)} MW`);
  } else if (type === "DIESEL") {
    if (node.role === "backup") {
      if (isDisplayableNumber(el.activePowerMW)) secondary.push(`${formatNumber(el.activePowerMW, 1)} MW`);
      if (node.metadata?.sourceRole) tertiary.push(String(node.metadata.sourceRole));
    } else if (isDisplayableNumber(el.activePowerMW)) {
      secondary.push(`${formatNumber(el.activePowerMW, 1)} MW`);
    }
  } else if (type === "BESS") {
    if (isDisplayableNumber(el.activePowerMW)) secondary.push(`${formatNumber(el.activePowerMW, 1)} MW`);
    if (isDisplayableNumber(el.energyMWh)) secondary.push(`${formatNumber(el.energyMWh, 1)} MWh`);
    if (isDisplayableNumber(el.durationHours)) tertiary.push(`${formatNumber(el.durationHours, 1)} h`);
  } else if (type === "TRANSFORMER") {
    const pri = el.voltageKV;
    const sec = el.voltageSecondaryKV;
    const ter = el.voltageTertiaryKV;
    if (isDisplayableNumber(pri) && isDisplayableNumber(sec)) {
      const core = `${formatVoltageKV(pri).replace(" kV", "")} / ${formatVoltageKV(sec)}`;
      secondary.push(isDisplayableNumber(ter) ? `${core} / ${formatVoltageKV(ter)}` : core);
    } else if (isDisplayableNumber(pri)) secondary.push(formatVoltageKV(pri));
    if (isDisplayableNumber(el.apparentPowerMVA)) {
      const n = node.metadata?.transformerCount;
      const prefix = isDisplayableNumber(n) && n > 1 ? `${formatNumber(n, 0)} × ` : "";
      tertiary.push(`${prefix}${formatNumber(el.apparentPowerMVA, 1)} MVA`);
    } else if (el.apparentPowerMVA == null) {
      /* omit — never "0 MVA" for unknown */
    }
  } else if (type === "BUS") {
    if (isDisplayableNumber(el.voltageKV)) secondary.push(formatVoltageKV(el.voltageKV));
  } else if (type === "GRID") {
    if (node.metadata?.mode) secondary.push(String(node.metadata.mode));
    if (isDisplayableNumber(el.voltageKV)) tertiary.push(formatVoltageKV(el.voltageKV));
    if (node.state === "DISCONNECTED") tertiary.push("DISCONNECTED");
  } else if (type === "FEEDER") {
    if (isDisplayableNumber(el.voltageKV)) secondary.push(formatVoltageKV(el.voltageKV));
    if (!compact && isDisplayableNumber(el.activePowerMW)) tertiary.push(`${formatNumber(el.activePowerMW, 1)} MW`);
    if (!compact && isDisplayableNumber(node.metadata?.lengthKM)) tertiary.push(`${formatNumber(node.metadata.lengthKM, 1)} km`);
  } else if (type === "LOAD") {
    if (compact) {
      const peak = el.peakLoadMW ?? el.activePowerMW;
      if (isDisplayableNumber(peak)) secondary.push(formatPower(peak, "MW"));
    } else {
      if (isDisplayableNumber(el.peakLoadMW)) secondary.push(`${formatNumber(el.peakLoadMW, el.peakLoadMW >= 1 ? 1 : 3)} MW peak`);
      else if (isDisplayableNumber(el.activePowerMW)) secondary.push(formatPower(el.activePowerMW, "MW"));
      if (isDisplayableNumber(el.averageLoadMW)) tertiary.push(`${formatNumber(el.averageLoadMW, 2)} MW avg`);
    }
  } else if (type === "SUBSTATION") {
    if (isDisplayableNumber(el.voltageKV)) secondary.push(formatVoltageKV(el.voltageKV));
    if (isDisplayableNumber(el.apparentPowerMVA)) tertiary.push(`${formatNumber(el.apparentPowerMVA, 1)} MVA`);
  }

  const unknownMva = pendingOrOmit(el.apparentPowerMVA, "MVA");
  if (type === "TRANSFORMER" && el.apparentPowerMVA == null) {
    /* keep omitted */
    void unknownMva;
  }

  const lines = [main];
  if (secondary.length) lines.push(secondary.join(" · "));
  if (!compact && tertiary.length) lines.push(tertiary.slice(0, 2).join(" · "));
  return {
    main,
    secondary: secondary.join(" · ") || null,
    tertiary: compact ? null : tertiary.join(" · ") || null,
    lines,
    title: lines.join(" "),
  };
}

export function formatEdgeLabel(edge, options = {}) {
  if (!edge) return "";
  if (options.structural) return "";
  const parts = [];
  if (isDisplayableNumber(edge.voltageKV)) parts.push(formatVoltageKV(edge.voltageKV));
  if (isDisplayableNumber(edge.metadata?.loadMW)) parts.push(`${formatNumber(edge.metadata.loadMW, 1)} MW`);
  if (parts.length > 1 && options.compact) return parts[0];
  return parts.join(" · ");
}

export function textualArchitectureSummary(graph) {
  if (!graph || !graph.nodes?.length) {
    return "Empty architecture. No electrical blocks configured.";
  }
  const has = (type) => graph.nodes.some((n) => n.type === type);
  const node = (id) => graph.nodes.find((n) => n.id === id);
  const parts = [];
  const pv = node("pv");
  const tr = node("transformer");
  const bus = node("bus-mv") || node("bus-hv") || node("bus-lv");
  const feeders = graph.nodes.filter((n) => n.type === "FEEDER");
  const bess = node("bess");
  if (pv && tr && bus) {
    const v = formatNodeLabel(tr);
    parts.push(
      `PV generation connects through a ${v.secondary || "transformer"} transformer to a ${
        bus.electrical?.voltageKV != null ? formatVoltageKV(bus.electrical.voltageKV) : ""
      } bus`.replace(/\s+/g, " ").trim()
    );
    if (feeders.length) parts.push(`which supplies ${feeders.length} feeder${feeders.length === 1 ? "" : "s"}.`);
    else parts.push("which supplies the load.");
    if (bess) parts.push("A BESS is connected to the main bus.");
  } else if (has("GRID") && has("LOAD")) {
    parts.push("Grid supplies a load installation through main distribution.");
  } else {
    const names = graph.nodes.map((n) => n.label).slice(0, 8).join(", ");
    parts.push(`Conceptual architecture with ${graph.nodes.length} nodes: ${names}.`);
  }
  if (graph.metadata?.notices?.length) {
    parts.push("Connection topology may be incomplete.");
  }
  parts.push("This is a conceptual visualization, not a construction drawing.");
  return parts.join(" ");
}

export function architectureTree(graph) {
  const sections = {
    Generation: [],
    Storage: [],
    Transformation: [],
    Distribution: [],
    Loads: [],
    Grid: [],
  };
  for (const n of graph?.nodes || []) {
    const label = formatNodeLabel(n).lines.filter(Boolean).join(" — ");
    if (n.type === "PV" || n.type === "WIND" || n.type === "DIESEL" || n.type === "OTHER_GENERATION") {
      sections.Generation.push(label);
    } else if (n.type === "BESS") sections.Storage.push(label);
    else if (n.type === "TRANSFORMER" || n.type === "SUBSTATION") sections.Transformation.push(label);
    else if (n.type === "BUS" || n.type === "FEEDER") sections.Distribution.push(label);
    else if (n.type === "LOAD") sections.Loads.push(label);
    else if (n.type === "GRID") sections.Grid.push(label);
  }
  return sections;
}

export function nodeDetailsModel(node, graph) {
  if (!node) return null;
  const el = node.electrical || {};
  const rows = [];
  const add = (label, value, provenance = null) => {
    if (value == null || value === "") return;
    rows.push({ label, value: String(value), provenance });
  };
  if (node.type === "PV") {
    add("DC", isDisplayableNumber(el.dcMWp) ? `${formatNumber(el.dcMWp, 2)} MWp` : null);
    add("AC", isDisplayableNumber(el.activePowerMW) ? `${formatNumber(el.activePowerMW, 2)} MW` : null);
    add("Yield", node.metadata?.specificYieldKWhPerKWpYear, node.provenance);
    add("Losses", node.metadata?.lossesPercent != null ? `${node.metadata.lossesPercent} %` : null);
    add("DC/AC", node.metadata?.dcAcRatio != null ? formatNumber(node.metadata.dcAcRatio, 3) : null, "calculated");
  } else if (node.type === "BESS") {
    add("Power", isDisplayableNumber(el.activePowerMW) ? `${formatNumber(el.activePowerMW, 2)} MW` : null);
    add("Energy", isDisplayableNumber(el.energyMWh) ? `${formatNumber(el.energyMWh, 2)} MWh` : null);
    add("Duration (stored)", isDisplayableNumber(el.durationHours) ? `${formatNumber(el.durationHours, 2)} h` : null);
    add("Duration (calculated)", isDisplayableNumber(node.metadata?.derivedDurationHours) ? `${formatNumber(node.metadata.derivedDurationHours, 2)} h` : null, "calculated");
    add("Efficiency", node.metadata?.roundTripEfficiency);
    add("Purpose", (node.metadata?.purpose || []).join(", ") || node.role);
  } else if (node.type === "TRANSFORMER") {
    add("Primary", isDisplayableNumber(el.voltageKV) ? formatVoltageKV(el.voltageKV) : null);
    add("Secondary", isDisplayableNumber(el.voltageSecondaryKV) ? formatVoltageKV(el.voltageSecondaryKV) : null);
    add("MVA", isDisplayableNumber(el.apparentPowerMVA) ? `${formatNumber(el.apparentPowerMVA, 1)} MVA` : "MVA pending");
    add("Loading", node.metadata?.utilizationFactor != null ? `${formatNumber(node.metadata.utilizationFactor * 100, 0)} %` : null, "calculated");
    add("Redundancy", node.metadata?.redundancyMode);
  } else if (node.type === "LOAD") {
    add("Peak", isDisplayableNumber(el.peakLoadMW) ? formatPower(el.peakLoadMW, "MW") : formatPower(el.activePowerMW, "MW"));
    add("Average", isDisplayableNumber(el.averageLoadMW) ? formatPower(el.averageLoadMW, "MW") : null);
    add("Critical", isDisplayableNumber(el.criticalLoadMW) ? formatPower(el.criticalLoadMW, "MW") : null);
    add("State", node.state);
  } else if (node.type === "GRID") {
    add("Mode", node.metadata?.mode);
    add("Strength", node.metadata?.strength);
    add("Import", node.metadata?.importAllowed ? "allowed" : "no");
    add("Export", node.metadata?.exportAllowed ? "allowed" : "no");
    add("State", node.state);
  } else if (node.type === "FEEDER") {
    add("Voltage", isDisplayableNumber(el.voltageKV) ? formatVoltageKV(el.voltageKV) : null);
    add("Load", isDisplayableNumber(el.activePowerMW) ? formatPower(el.activePowerMW, "MW") : null);
    add("Length", isDisplayableNumber(node.metadata?.lengthKM) ? `${formatNumber(node.metadata.lengthKM, 1)} km` : null);
    add("Losses", isDisplayableNumber(node.metadata?.lossesPercent) ? `${formatNumber(node.metadata.lossesPercent, 1)} %` : null);
  } else if (typeWind(node)) {
    add("Rated", isDisplayableNumber(el.activePowerMW) ? formatPower(el.activePowerMW, "MW") : null);
    add("Capacity factor", node.metadata?.capacityFactor, "informational");
  }
  if (node.state === "STARTING") {
    add("Run current", isDisplayableNumber(node.metadata?.inrushA) ? null : formatNumber(el.currentA, 2) + (el.currentA != null ? " A" : ""));
    add("Start current", isDisplayableNumber(node.metadata?.inrushA) ? `${formatNumber(node.metadata.inrushA, 2)} A` : null);
    add("Duration", isDisplayableNumber(node.metadata?.inrushDuration) ? `${formatNumber(node.metadata.inrushDuration, 2)} s` : null);
  }
  const start = (graph?.metadata?.starting || []).find((s) => s.id === node.metadata?.loadId || s.id === node.id);
  if (start) {
    add("Run current", start.runningA != null ? `${formatNumber(start.runningA, 2)} A` : null);
    add("Start current", start.transientA != null ? `${formatNumber(start.transientA, 2)} A` : start.runningMW != null ? `${start.runningMW} MW` : null);
    add("Multiple", start.multiple);
    add("Duration", start.duration != null ? `${start.duration} s` : null);
  }
  return {
    id: node.id,
    type: node.type,
    role: node.role,
    state: node.state,
    provenance: node.provenance,
    validation: node.validation,
    rows,
    voltageClass: classifyVoltageDomain(el.voltageKV),
    siteId: node.metadata?.siteId || graph?.metadata?.siteId || null,
  };
}

function typeWind(node) {
  return node.type === "WIND" || node.type === "DIESEL";
}

export { formatEnergy, formatPower, formatVoltageKV, formatNumber };
