/**
 * 8-template pilot: one architecture per atlas region.
 * Does not mass-enrich the 96+ catalog.
 */

import { architectureTemplates } from "../templates.js";
import { REGION_IDS, COUNTRY_TO_REGION } from "../regional-profiles.js";
import { featuredArchitectures } from "../ui/template-explorer.js";
import { projectFromTemplate } from "../ui/state.js";
import { findVerifiedData } from "./lookup.js";
import { createDefaultProviders } from "./providers/index.js";
import { calculateEvidenceCoverage } from "./coverage.js";
import { detectEvidenceConflicts } from "./conflicts.js";

export const PILOT_PREFERRED_IDS = Object.freeze([
  "G-MRT-G03-001",
  "S-DZA-S15-001",
  "G-EGY-G06-001",
  "G-JOR-G05-001",
  "G-OMN-G12-001",
  "H-PAK-H03-001",
  "S-IND-S12-001",
  "G-THA-G15-001",
]);

const PREFERRED_IDS = PILOT_PREFERRED_IDS;

export function selectPilotTemplates() {
  const featured = featuredArchitectures(24);
  const byRegion = new Map();
  const take = (t) => {
    const rid = t.regionId || COUNTRY_TO_REGION[t.country];
    if (!rid || byRegion.has(rid)) return;
    byRegion.set(rid, t);
  };
  for (const id of PREFERRED_IDS) {
    const t = architectureTemplates.find((x) => x.id === id);
    if (t) take(t);
  }
  for (const t of featured) take(t);
  for (const t of architectureTemplates) take(t);
  return REGION_IDS.map((rid) => byRegion.get(rid)).filter(Boolean);
}

export async function runPilot(options = {}) {
  const templates = options.templates || selectPilotTemplates();
  const providers = options.providers || createDefaultProviders({ bitcoin: { live: false } });
  const rows = [];
  for (const template of templates) {
    const project = projectFromTemplate(template);
    const result = await findVerifiedData(project, { providers });
    const coverage = calculateEvidenceCoverage(project, { conflicts: result.conflicts });
    const candidateParams = new Set(result.evidence.map((e) => e.parameter));
    const relevant = result.research.requestedParameters || [];
    const candidateCoverage = relevant.length
      ? Math.round((candidateParams.size / relevant.length) * 100)
      : 0;
    rows.push({
      templateId: template.id,
      name: template.name,
      country: template.country,
      region: template.region,
      regionId: template.regionId || COUNTRY_TO_REGION[template.country],
      application: template.application,
      requestedParameters: result.research.requestedParameters,
      sourcesChecked: result.research.sourcesChecked,
      evidenceFound: result.evidence.map((e) => ({
        evidenceId: e.evidenceId,
        parameter: e.parameter,
        value: e.normalizedValue,
        unit: e.unit,
        sourceId: e.sourceId,
        granularity: e.granularity,
      })),
      conflicts: detectEvidenceConflicts(result.evidence).filter((c) => c.comparable !== false),
      pendingSiteStudies: result.unresolved,
      coverageScore: coverage.evidenceCoverageScore,
      candidateCoverage,
      candidates: Object.fromEntries(
        Object.entries(result.candidates).map(([k, v]) => [k, v.map((c) => ({
          current: c.currentValue,
          candidate: c.candidateValue,
          unit: c.candidateUnit,
          recommended: c.recommended,
        }))])
      ),
    });
  }
  return {
    generatedAt: new Date().toISOString(),
    count: rows.length,
    templates: rows,
    note: "Pilot only. The full atlas is not declared verified.",
  };
}
