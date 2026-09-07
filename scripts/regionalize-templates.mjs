#!/usr/bin/env node
/**
 * Second pass: enrich stored templates. Does not regenerate electrical architecture.
 *   node scripts/regionalize-templates.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { architectureTemplates } from "../js/architecture/templates.js";
import { COUNTRIES } from "../js/architecture/template-constants.js";
import { REGIONAL_PROFILES } from "../js/architecture/regional-profiles.js";
import {
  detectNearDuplicateTemplates,
  regionalizeAll,
} from "../js/architecture/regionalization.js";
import { validateRegionalization } from "../js/architecture/regional-validation.js";
import { validateTemplateViability } from "../js/architecture/template-viability.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function names() {
  const o = {};
  for (const [iso, meta] of Object.entries(COUNTRIES)) o[iso] = meta.name;
  return o;
}

function writeTemplates(list) {
  const body = `/**
 * Arquitectura Sagrada — stored conceptual templates.
 * Electrical architecture from Prompt 4; regionalization from Prompt 5.
 * Do not randomize at runtime.
 */

export const architectureTemplates = Object.freeze(${JSON.stringify(list, null, 2)});

export const TEMPLATE_COUNT = architectureTemplates.length;
`;
  fs.writeFileSync(path.join(ROOT, "js/architecture/templates.js"), body);
}

function reports(list, clones) {
  const count = (fn) => {
    const m = {};
    for (const t of list) {
      const k = fn(t);
      m[k] = (m[k] || 0) + 1;
    }
    return m;
  };
  const byCountry = count((t) => t.countryName);
  const byRegion = count((t) => t.regionId);
  const byEnv = count((t) => t.environment.climate);
  const byApp = count((t) => t.application);
  const byGrid = count((t) => t.grid.mode);
  const byFam = count((t) => t.familyName);
  const byScale = count((t) => t.loadProfile.scaleBand);
  const fits = list.map((t) => t.regionalization.regionalFitScore);
  const avgFit = fits.reduce((a, b) => a + b, 0) / fits.length;
  const warnN = list.reduce((n, t) => n + t.warnings.length, 0);

  const report = `# Regionalization report

Corridor Mauritania–Thailand (North Africa · Middle East · South Asia).
Country is geographic context, not a grid-code claim.

- Total templates: **${list.length}**
- Countries represented: ${Object.keys(byCountry).length}
- Regions represented: ${Object.keys(byRegion).length}
- Average regionalFitScore: **${avgFit.toFixed(1)}**
- Near-duplicate groups (fingerprint): ${clones.length}
- Regional warning instances: ${warnN}

## Per country

${Object.entries(byCountry).sort((a, b) => b[1] - a[1]).map(([k, v]) => `- ${k}: ${v} (${((v / list.length) * 100).toFixed(1)}%)`).join("\n")}

## Per region

${Object.entries(byRegion).sort().map(([k, v]) => `- ${k} ${REGIONAL_PROFILES[k].name}: ${v}`).join("\n")}

## Per environment

${Object.entries(byEnv).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Per application

${Object.entries(byApp).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Per grid mode

${Object.entries(byGrid).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Per family

${Object.entries(byFam).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Per scale

${Object.entries(byScale).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Near-duplicates

${clones.length ? clones.map((c) => `- ${c.fingerprint} → ${c.ids.join(", ")}`).join("\n") : "_None above threshold._"}
`;
  fs.writeFileSync(path.join(ROOT, "docs/architecture-sacred/regionalization-report.md"), report);

  const apps = [...new Set(list.map((t) => t.application))].sort();
  const regions = Object.keys(REGIONAL_PROFILES);
  let matrix = `# Regional coverage

REGION × APPLICATION (conceptual counts). Empty cells are gaps, not errors.

| Region | ${apps.join(" | ")} | Total |
|---|${apps.map(() => "---:").join("|")}|---:|
`;
  for (const r of regions) {
    const cells = apps.map((a) => list.filter((t) => t.regionId === r && t.application === a).length);
    const tot = cells.reduce((x, y) => x + y, 0);
    matrix += `| ${r} ${REGIONAL_PROFILES[r].name} | ${cells.join(" | ")} | ${tot} |\n`;
  }
  fs.writeFileSync(path.join(ROOT, "docs/architecture-sacred/regional-coverage.md"), matrix);
}

function main() {
  const namesMap = names();
  const enriched = regionalizeAll(architectureTemplates, namesMap);

  const invalid = [];
  for (const t of enriched) {
    const r = validateRegionalization(t);
    const v = validateTemplateViability(t);
    if (!r.ok || !v.ok) invalid.push({ id: t.id, r: r.errors, v: v.errors });
  }
  if (invalid.length) {
    console.error("validation failed", JSON.stringify(invalid.slice(0, 8), null, 2));
    process.exit(1);
  }
  if (enriched.length < 96) {
    console.error("too few templates", enriched.length);
    process.exit(1);
  }

  const clones = detectNearDuplicateTemplates(enriched, { threshold: 1 });
  writeTemplates(enriched);
  reports(enriched, clones);
  console.log("regionalized", enriched.length, "near-duplicate groups", clones.length);
}

main();
