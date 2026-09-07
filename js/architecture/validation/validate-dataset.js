import { VALIDATION_CONFIG } from "./validation-config.js";
import { detectNearDuplicateTemplates } from "../regionalization.js";
import { REGIONAL_PROFILES } from "../regional-profiles.js";
import { validateTemplate } from "./validate-template.js";

export function validateUniqueIDs(templates, issuesLike) {
  const seen = new Map();
  const dups = [];
  for (const t of templates) {
    if (seen.has(t.id)) dups.push(t.id);
    else seen.set(t.id, true);
  }
  return dups;
}

export function validateDatasetDiversity(templates) {
  const n = templates.length;
  const share = (fn) => {
    const m = {};
    for (const t of templates) {
      const k = fn(t);
      m[k] = (m[k] || 0) + 1;
    }
    return m;
  };
  const warnings = [];
  const errors = [];
  const byCountry = share((t) => t.country);
  const byRegion = share((t) => t.regionId);
  for (const [k, v] of Object.entries(byCountry)) {
    if (v / n > VALIDATION_CONFIG.countryShareMax + 1e-9) {
      warnings.push({ code: "COUNTRY_SHARE", message: `${k} exceeds ${VALIDATION_CONFIG.countryShareMax * 100}%` });
    }
  }
  for (const rid of Object.keys(REGIONAL_PROFILES)) {
    if (!byRegion[rid]) errors.push({ code: "REGION_EMPTY", message: `${rid} has no templates` });
  }
  return {
    byCountry,
    byRegion,
    byFamily: share((t) => t.family),
    byApplication: share((t) => t.application),
    byEnvironment: share((t) => t.environment && t.environment.climate),
    byGrid: share((t) => t.grid && t.grid.mode),
    byScale: share((t) => t.loadProfile && t.loadProfile.scaleBand),
    warnings,
    errors,
  };
}

/**
 * Full audit of a template array. Does not mutate inputs.
 * Near-duplicate grouping is O(n) via fingerprints (not O(n³)).
 */
export function validateTemplateDataset(templates, options = {}) {
  const mode = options.mode || "audit";
  const results = [];
  const t0 = Date.now();
  for (const t of templates) {
    results.push(validateTemplate(t, { mode }));
  }
  const ms = Date.now() - t0;
  const dups = validateUniqueIDs(templates);
  const near = detectNearDuplicateTemplates(templates, { threshold: 1 });
  const diversity = validateDatasetDiversity(templates);
  const validCount = results.filter((r) => r.valid).length;
  const featured = results.filter((_, i) => templates[i].featured);
  const featuredProblems = featured.filter((r) => !r.valid || r.counts.highWarnings > 0);

  return {
    valid: dups.length === 0 && diversity.errors.length === 0 && results.every((r) => r.valid),
    templateCount: templates.length,
    validCount,
    invalidCount: templates.length - validCount,
    warningCount: results.reduce((n, r) => n + r.counts.warnings, 0),
    duplicateCount: dups.length,
    nearDuplicateCount: near.length,
    regionalCoverage: diversity.byRegion,
    applicationCoverage: diversity.byApplication,
    scaleCoverage: diversity.byScale,
    errors: [
      ...dups.map((id) => ({ code: "DUP_ID", message: id })),
      ...diversity.errors,
      ...results.flatMap((r) => r.errors.map((e) => ({ templateId: r.templateId, ...e }))),
    ],
    warnings: [
      ...diversity.warnings,
      ...results.flatMap((r) => r.warnings.map((w) => ({ templateId: r.templateId, ...w }))),
    ],
    results,
    featuredProblems: featuredProblems.map((r) => r.templateId),
    elapsedMs: ms,
    nearDuplicates: near,
  };
}
