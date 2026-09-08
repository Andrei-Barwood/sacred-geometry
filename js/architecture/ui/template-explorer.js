/**
 * Efficient template atlas explorer. Filters AND across categories.
 * Does not mutate architectureTemplates.
 */

import { architectureTemplates } from "../templates.js";
import { COUNTRIES, FAMILY_NAMES } from "../template-constants.js";
import { validateTemplate } from "../validation/validate-template.js";
import { PAGE_SIZE } from "./constants.js";
import { enrichmentBadge, matchesEnrichmentFilters } from "../enrichment/store.js";

const validationCache = new Map();

export function getCatalog() {
  return architectureTemplates;
}

export function validateCached(template) {
  if (!template) return null;
  if (validationCache.has(template.id)) return validationCache.get(template.id);
  const result = validateTemplate(template, { mode: "audit" });
  validationCache.set(template.id, result);
  return result;
}

export function uniqueValues(keyFn) {
  const set = new Set();
  for (const t of architectureTemplates) {
    const v = keyFn(t);
    if (v == null || v === "") continue;
    if (Array.isArray(v)) v.forEach((x) => set.add(x));
    else set.add(v);
  }
  return [...set].sort((a, b) => String(a).localeCompare(String(b)));
}

export function explorerFacets() {
  return {
    countries: uniqueValues((t) => t.country).map((code) => ({
      code,
      name: COUNTRIES[code]?.name || architectureTemplates.find((t) => t.country === code)?.countryName || code,
    })),
    regions: uniqueValues((t) => t.region),
    families: uniqueValues((t) => t.family).map((f) => ({ code: f, name: FAMILY_NAMES[f] || f })),
    applications: uniqueValues((t) => t.application),
    environments: uniqueValues((t) => t.environment?.code),
    gridModes: uniqueValues((t) => t.grid?.mode),
    scales: uniqueValues((t) => t.loadProfile?.scaleBand),
    voltageClasses: uniqueValues((t) => {
      const kv = t.substation?.primaryKV;
      if (kv == null) return null;
      if (kv >= 220) return "HV ≥ 220 kV";
      if (kv >= 66) return "HV 66–220 kV";
      if (kv >= 1) return "MV";
      return "LV";
    }),
    generationTypes: uniqueValues((t) => t.generation?.technologies || []),
  };
}

function haystack(t) {
  return [
    t.name,
    t.id,
    t.country,
    t.countryName,
    t.region,
    t.subregion,
    t.application,
    t.description,
    t.archetypeTitle,
    t.familyName,
    ...(Array.isArray(t.tags) ? t.tags : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function voltageClassOf(t) {
  const kv = t.substation?.primaryKV;
  if (kv == null) return null;
  if (kv >= 220) return "HV ≥ 220 kV";
  if (kv >= 66) return "HV 66–220 kV";
  if (kv >= 1) return "MV";
  return "LV";
}

export function emptyFilters() {
  return {
    search: "",
    country: "",
    region: "",
    family: "",
    application: "",
    environment: "",
    gridMode: "",
    scale: "",
    voltageClass: "",
    generationType: "",
    bess: "",
    offGrid: "",
    weakGrid: "",
    featured: false,
    commonCase: false,
    batch_id: "",
    coverage: "",
    conflicts: "",
    stale: "",
  };
}

export function filterTemplates(filters = emptyFilters(), options = {}) {
  const list = options.templates || architectureTemplates;
  const q = String(filters.search || "").trim().toLowerCase();
  const out = [];
  for (const t of list) {
    if (q && !haystack(t).includes(q)) continue;
    if (filters.country && t.country !== filters.country) continue;
    if (filters.region && t.region !== filters.region) continue;
    if (filters.family && t.family !== filters.family) continue;
    if (filters.application && t.application !== filters.application) continue;
    if (filters.environment && t.environment?.code !== filters.environment) continue;
    if (filters.gridMode && t.grid?.mode !== filters.gridMode) continue;
    if (filters.scale && t.loadProfile?.scaleBand !== filters.scale) continue;
    if (filters.voltageClass && voltageClassOf(t) !== filters.voltageClass) continue;
    if (filters.generationType) {
      const techs = t.generation?.technologies || [];
      if (!techs.includes(filters.generationType)) continue;
    }
    if (filters.bess === "yes" && t.bess?.enabled !== true) continue;
    if (filters.bess === "no" && t.bess?.enabled === true) continue;
    if (filters.offGrid === true && t.grid?.mode !== "off-grid") continue;
    if (filters.weakGrid === true && t.grid?.mode !== "weak-grid" && t.grid?.strength !== "weak") {
      continue;
    }
    if (filters.featured) {
      if (t.featured !== true) continue;
    }
    if (filters.commonCase) {
      if (t.commonCase !== true) continue;
    }
    if (filters.batch_id || filters.coverage || filters.conflicts || filters.stale) {
      if (!matchesEnrichmentFilters(t.id, {
        batch_id: filters.batch_id,
        coverage: filters.coverage,
        conflicts: filters.conflicts,
        stale: filters.stale,
      })) continue;
    }
    out.push(t);
  }
  return out;
}

export function templateCardModel(template) {
  const v = validateCached(template);
  const gen = template.generation || {};
  const pv = gen.pv;
  const genLabel = pv
    ? [pv.dcMWp != null ? `${pv.dcMWp} MWp` : null, pv.acMW != null ? `${pv.acMW} MWac` : null]
        .filter(Boolean)
        .join(" / ")
    : gen.enabled
      ? (gen.technologies || []).join(", ")
      : "—";
  return {
    id: template.id,
    name: template.name,
    country: template.countryName || template.country,
    region: template.region,
    family: template.familyName || template.family,
    application: template.application,
    gridMode: template.grid?.mode || "—",
    peakLoad: template.loadProfile?.peakLoadMW,
    generation: genLabel,
    bess: template.bess?.enabled
      ? `${template.bess.powerMW} MW / ${template.bess.energyMWh} MWh`
      : "—",
    voltage: template.substation?.enabled
      ? [template.substation.primaryKV, template.substation.secondaryKV]
          .filter((x) => x != null)
          .join("/") + " kV"
      : "—",
    qualityScore: v?.qualityScore ?? null,
    warningsCount: v?.counts?.warnings ?? 0,
    errorsCount: v?.counts?.errors ?? 0,
    valid: v?.valid ?? null,
    highWarnings: v?.counts?.highWarnings ?? 0,
    featured: template.featured === true,
    conceptual: template.conceptual === true,
    enrichment: enrichmentBadge(template.id),
  };
}

export function paginate(list, page = 1, pageSize = PAGE_SIZE) {
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const p = Math.min(Math.max(1, page), pages);
  const start = (p - 1) * pageSize;
  return {
    items: list.slice(start, start + pageSize),
    page: p,
    pages,
    total,
    pageSize,
  };
}

/**
 * Featured for the start screen: featured === true, valid, no HIGH warning.
 */
export function featuredArchitectures(limit = 8) {
  const out = [];
  for (const t of architectureTemplates) {
    if (t.featured !== true) continue;
    const v = validateCached(t);
    if (!v || v.valid === false) continue;
    if ((v.counts?.highWarnings || 0) > 0) continue;
    out.push(t);
    if (out.length >= limit) break;
  }
  if (out.length < 6) {
    for (const t of architectureTemplates) {
      if (out.some((x) => x.id === t.id)) continue;
      const v = validateCached(t);
      if (!v || v.valid === false) continue;
      if ((v.counts?.highWarnings || 0) > 0) continue;
      out.push(t);
      if (out.length >= limit) break;
    }
  }
  return out;
}

export function commonCaseArchitectures() {
  return architectureTemplates.filter((t) => t.commonCase === true);
}

export function largeScaleSampleId() {
  const featured = featuredArchitectures(12);
  const withBess = featured.find((t) => t.bess?.enabled && t.substation?.enabled);
  if (withBess) return withBess.id;
  const any = architectureTemplates.find(
    (t) => t.bess?.enabled && t.substation?.enabled && t.generation?.enabled
  );
  return any?.id || architectureTemplates[0]?.id || null;
}

export function templateDetail(template) {
  if (!template) return null;
  const v = validateCached(template);
  return {
    template,
    card: templateCardModel(template),
    validation: v,
    overview: {
      name: template.name,
      country: template.countryName,
      region: template.region,
      subregion: template.subregion,
      family: template.familyName,
      application: template.application,
      environment: template.environment?.climate,
      grid: template.grid?.mode,
      conceptual: template.conceptual,
    },
  };
}
