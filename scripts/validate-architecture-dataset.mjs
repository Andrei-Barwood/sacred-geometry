#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { architectureTemplates as T } from "../js/architecture/templates.js";
import { validateTemplateDataset } from "../js/architecture/validation/validate-dataset.js";
import { validateTemplate } from "../js/architecture/validation/validate-template.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function main() {
  const ds = validateTemplateDataset(T, { mode: "audit" });
  const scores = ds.results.map((r) => r.qualityScore);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const high = ds.warnings.filter((w) => w.warningLevel === "HIGH").length;
  const med = ds.warnings.filter((w) => w.warningLevel === "MEDIUM").length;
  const low = ds.warnings.filter((w) => w.warningLevel === "LOW").length;
  const featured = T.filter((t) => t.featured).map((t) => validateTemplate(t));
  const featuredFail = featured.filter((r) => !r.valid || r.counts.highWarnings > 0);

  const errCat = {};
  for (const e of ds.errors) errCat[e.code] = (errCat[e.code] || 0) + 1;
  const warnCat = {};
  for (const w of ds.warnings) warnCat[w.code] = (warnCat[w.code] || 0) + 1;

  const invalidRows = ds.results.filter((r) => !r.valid);

  const md = `# Template validation

Audit mode. Validator does not mutate templates.

- TOTAL TEMPLATES: **${ds.templateCount}**
- VALID: **${ds.validCount}**
- INVALID: **${ds.invalidCount}**
- ERRORS: ${ds.errors.length}
- WARNINGS: ${ds.warningCount}
- HIGH: ${high} · MEDIUM: ${med} · LOW: ${low}
- AVERAGE QUALITY SCORE: **${avg.toFixed(1)}**
- MIN: ${Math.min(...scores)} · MAX: ${Math.max(...scores)}
- FEATURED with HIGH/invalid: ${featuredFail.length ? featuredFail.map((r) => r.templateId).join(", ") : "none"}
- DUPLICATES: ${ds.duplicateCount}
- NEAR DUPLICATES: ${ds.nearDuplicateCount}
- Elapsed: ${ds.elapsedMs} ms

## Errors by code

${Object.keys(errCat).length ? Object.entries(errCat).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "_None._"}

## Warnings by code

${Object.entries(warnCat).sort((a, b) => b[1] - a[1]).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Invalid templates

${invalidRows.length ? invalidRows.map((r) => `- ${r.templateId}: ${r.errors.map((e) => e.code).join(", ")}`).join("\n") : "_None._"}

Quality score is dataset consistency, not certification.
`;
  fs.mkdirSync(path.join(ROOT, "data"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "docs/architecture-sacred/template-validation.md"), md);

  const json = {
    templateCount: ds.templateCount,
    validCount: ds.validCount,
    invalidCount: ds.invalidCount,
    warningCount: ds.warningCount,
    highWarnings: high,
    mediumWarnings: med,
    lowWarnings: low,
    averageQualityScore: Number(avg.toFixed(2)),
    minQualityScore: Math.min(...scores),
    maxQualityScore: Math.max(...scores),
    duplicateCount: ds.duplicateCount,
    nearDuplicateCount: ds.nearDuplicateCount,
    featuredProblems: featuredFail.map((r) => r.templateId),
    errorsByCode: errCat,
    warningsByCode: warnCat,
    invalid: invalidRows.map((r) => ({
      templateId: r.templateId,
      errors: r.errors.map((e) => ({ code: e.code, message: e.message, severity: e.severity })),
    })),
    elapsedMs: ds.elapsedMs,
  };
  fs.writeFileSync(path.join(ROOT, "data/template-validation-report.json"), JSON.stringify(json, null, 2));
  console.log(JSON.stringify({
    valid: ds.valid,
    validCount: ds.validCount,
    invalidCount: ds.invalidCount,
    avg: Number(avg.toFixed(1)),
    high,
    featuredFail: featuredFail.map((r) => r.templateId),
    elapsedMs: ds.elapsedMs,
  }, null, 2));
  if (invalidRows.length) {
    console.log("\nINVALID TABLE");
    for (const r of invalidRows) {
      for (const e of r.errors) {
        console.log(`${r.templateId}\t${e.code}\t${e.severity}\t${e.message}`);
      }
    }
  }
}

main();
