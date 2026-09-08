/**
 * Report citations from accepted evidence only. No invented bibliography.
 */

import { FRESHNESS } from "./constants.js";
import { acceptedEvidenceCitations } from "./field-provenance.js";
import { evaluateFreshness } from "./freshness.js";
import { calculateEvidenceCoverage } from "./coverage.js";
import { getSource, sourcesRequiringAttribution } from "./source-registry.js";
import { isSafeHref } from "./evidence-sanitizer.js";

export function buildVerifiedReportModel(project) {
  const accepted = acceptedEvidenceCitations(project);
  const references = [];
  const byParam = {};
  const seen = new Map();
  let n = 0;
  for (const rec of accepted) {
    const source = getSource(rec.sourceId);
    if (!source) continue;
    let key = seen.get(source.id);
    if (!key) {
      n += 1;
      key = `S${n}`;
      seen.set(source.id, key);
      const fresh = evaluateFreshness({
        parameter: rec.parameter,
        retrievedAt: rec.retrievedAt,
        publishedAt: rec.publishedAt,
        validTo: rec.validTo,
        changeClass: rec.changeClass,
      });
      const url = rec.sourceUrl && isSafeHref(rec.sourceUrl) ? rec.sourceUrl : source.homepage;
      references.push({
        key,
        sourceId: source.id,
        organization: source.organization,
        name: source.name,
        title: rec.sourceTitle || source.name,
        publishedAt: rec.publishedAt || null,
        retrievedAt: rec.retrievedAt || null,
        url: url && isSafeHref(url) ? url : null,
        scope: rec.granularity || null,
        license: source.license || null,
        attributionRequired: source.attributionRequired === true,
        stale: fresh.status === FRESHNESS.STALE,
        freshness: fresh.status,
        parameter: rec.parameter,
      });
    }
    byParam[rec.parameter] = key;
    if (rec.path) byParam[rec.path] = key;
  }
  const coverage = calculateEvidenceCoverage(project);
  const attribution = sourcesRequiringAttribution(references.map((r) => r.sourceId));
  const reviewNotes = [];
  for (const rec of project?.evidenceHistory || []) {
    if (rec.action === "reject" || rec.action === "keep") {
      reviewNotes.push(`Kept current value for ${rec.parameter} despite candidate ${rec.evidenceId}.`);
    }
  }
  return { references, byParam, coverage, attribution, reviewNotes, accepted };
}

export function cite(byParam, parameter, text) {
  const key = byParam?.[parameter];
  if (!key) return text;
  return `${text} [${key}]`;
}
