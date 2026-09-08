/**
 * Site annotations. Does not call electrical or BTC engines.
 */

import { EMPTY_WARNINGS } from "./constants.js";
import { getActiveSite, normalizeGeospatial } from "./site-model.js";
import { inheritRestrictions } from "./restriction-model.js";
import { gridProximityForSite } from "./grid-network.js";
import { siteEvidenceCoverage } from "./evidence-bundle.js";

export function verifiedGridNodes(project) {
  const nodes = [];
  const accepted = project?.acceptedEvidence || {};
  for (const rec of Object.values(accepted)) {
    const c = rec?.geography?.coordinates;
    if (c && Number.isFinite(c.lon) && Number.isFinite(c.lat)) {
      nodes.push({ lng: c.lon, lat: c.lat, name: rec.sourceTitle || rec.parameter, role: "connection" });
    }
    if (c && Number.isFinite(c.lng) && Number.isFinite(c.lat)) {
      nodes.push({ lng: c.lng, lat: c.lat, name: rec.sourceTitle || rec.parameter, role: "connection" });
    }
  }
  return nodes;
}

export function evaluateSite(site, geo, project) {
  const g = normalizeGeospatial(geo);
  const warnings = [];
  if (!g.restrictions.length) warnings.push(EMPTY_WARNINGS.NO_RESTRICTIONS);
  const restrictions =
    site?.lng != null && site?.lat != null ? inheritRestrictions(site.lng, site.lat, g.restrictions) : [];
  const proximity = gridProximityForSite(site, g.gridNetwork, { verifiedNodes: verifiedGridNodes(project) });
  if (proximity.warning) warnings.push(proximity.warning);
  const coverage = siteEvidenceCoverage(site, project);
  return {
    siteId: site?.id || null,
    restrictions,
    proximity,
    coverage,
    warnings: [...new Set(warnings)],
  };
}

export function evaluateGeospatial(geo, project) {
  const g = normalizeGeospatial(geo);
  const evaluations = {};
  const warnings = [];
  if (!g.sites.length) warnings.push(EMPTY_WARNINGS.NO_SITES);
  if (!g.restrictions.length) warnings.push(EMPTY_WARNINGS.NO_RESTRICTIONS);
  if (!g.gridNetwork) warnings.push(EMPTY_WARNINGS.INCOMPLETE_GRID);
  for (const site of g.sites) {
    evaluations[site.id] = evaluateSite(site, g, project);
  }
  return { geospatial: g, evaluations, warnings: [...new Set(warnings)] };
}

export function regionalContextFromProject(project) {
  const site = getActiveSite(project?.geospatial);
  if (site) {
    return {
      source: "active-site",
      siteId: site.id,
      country: site.country || project.country || null,
      region: site.region || project.region || null,
      subregion: site.comuna || project.subregion || null,
      comuna: site.comuna || null,
      lat: site.lat,
      lng: site.lng,
    };
  }
  return {
    source: "project-region",
    siteId: null,
    country: project?.country || null,
    region: project?.region || null,
    subregion: project?.subregion || null,
    comuna: null,
    lat: null,
    lng: null,
  };
}

export function applyActiveSiteContext(project) {
  const ctx = regionalContextFromProject(project);
  return {
    country: ctx.country,
    region: ctx.region,
    subregion: ctx.subregion,
    siteId: ctx.siteId,
    source: ctx.source,
  };
}

export function popupMetricsFromReport(reportModel, project) {
  const cards = [];
  const name = reportModel?.projectMetadata?.name || project?.metadata?.name || "Project";
  cards.push({ label: "Project", value: name });
  const mode = reportModel?.architectureSummary?.facts?.mode || project?.mode || "—";
  cards.push({ label: "Mode", value: mode });
  const rows = reportModel?.electricalSummary || [];
  for (const r of rows.slice(0, 6)) {
    cards.push({ label: r.label, value: r.value || r.text || "—" });
  }
  if (!rows.length && project) {
    const pv = project.generation?.pv;
    if (pv?.dcMWp != null) cards.push({ label: "PV DC", value: `${pv.dcMWp} MWp` });
    if (project.bess?.enabled) cards.push({ label: "BESS", value: `${project.bess.powerMW ?? "—"} MW / ${project.bess.energyMWh ?? "—"} MWh` });
    if (project.substation?.enabled) {
      cards.push({ label: "Voltage", value: `${project.substation.primaryKV ?? "—"} / ${project.substation.secondaryKV ?? "—"} kV` });
    }
  }
  cards.push({ label: "Note", value: "Report metrics only. No new electrical calculation." });
  return cards;
}
