/**
 * Manual evidence lookup. Default path: user presses Find Verified Data.
 * Providers never write into the project.
 */

import { createDefaultProviders, getProviderStatus } from "./providers/index.js";
import { buildProviderQuery } from "./query.js";
import { calculateEvidenceConfidence } from "./confidence.js";
import { detectEvidenceConflicts } from "./conflicts.js";
import { buildCandidates } from "./evidence-resolver.js";
import { calculateEvidenceCoverage } from "./coverage.js";
import { regionalIntelligence } from "./regional-intelligence.js";
import { createResearchRecord } from "./research-record.js";
import { abortable } from "./fetch-client.js";
import { SITE_STUDY_REASON } from "./constants.js";

const DEFAULT_PARAMETERS = [
  "frequencyHz",
  "nominalVoltageLevelsKV",
  "gridOperator",
  "ghiAnnual",
  "referencePvout",
  "tariffReference",
  "floodRisk",
  "salinityRisk",
  "gridStrength",
  "shortCircuitLevel",
  "specificYield",
];

export async function findVerifiedData(project, options = {}) {
  const providers = options.providers || createDefaultProviders({ bitcoin: { live: false } });
  const parameters = options.parameters || DEFAULT_PARAMETERS;
  const handle = abortable();
  const found = [];
  const unresolved = [];
  const sourcesChecked = [];
  const discarded = [];

  for (const parameter of parameters) {
    const query = buildProviderQuery(project, parameter, { signal: handle.signal, currency: options.currency });
    let any = false;
    for (const provider of providers) {
      if (!provider.supports(query)) continue;
      sourcesChecked.push({ providerId: provider.id, parameter });
      const result = await provider.fetchEvidence(query);
      if (!result.ok) {
        discarded.push({ parameter, providerId: provider.id, reason: result.error || result.status });
        continue;
      }
      if (result.unresolved) {
        unresolved.push({ parameter, reason: result.unresolved, note: result.note });
        any = true;
        continue;
      }
      for (const ev of result.evidence || []) {
        ev.confidence = calculateEvidenceConfidence(ev, {
          country: query.country,
          region: query.region,
          subregion: query.subregion,
        });
        found.push(ev);
        any = true;
      }
      if (!(result.evidence || []).length && result.status === "NO_DATA") {
        discarded.push({ parameter, providerId: provider.id, reason: "no-data" });
      }
    }
    if (!any && ["gridStrength", "shortCircuitLevel", "floodRisk", "salinityRisk", "specificYield"].includes(parameter)) {
      unresolved.push({
        parameter,
        reason: parameter === "floodRisk" ? SITE_STUDY_REASON.NEEDS_SPECIALIZED_SOURCE : SITE_STUDY_REASON.FUTURE_SITE_STUDY,
      });
    }
  }

  const byParameter = {};
  for (const ev of found) {
    if (!byParameter[ev.parameter]) byParameter[ev.parameter] = [];
    byParameter[ev.parameter].push(ev);
  }
  const candidates = {};
  const conflicts = detectEvidenceConflicts(found);
  for (const [parameter, list] of Object.entries(byParameter)) {
    candidates[parameter] = buildCandidates(project, list, parameter);
  }

  const research = createResearchRecord({
    templateId: project?.sourceTemplateId || project?.id || null,
    projectId: project?.metadata?.id || null,
    requestedParameters: parameters,
    sourcesChecked,
    evidenceFound: found.map((e) => e.evidenceId),
    unresolved,
    conflicts,
    discarded,
  });

  return {
    evidence: found,
    candidates,
    conflicts,
    unresolved,
    coverage: calculateEvidenceCoverage(project, { conflicts }),
    intelligence: regionalIntelligence(project),
    research,
    providers: getProviderStatus(providers),
    abort: handle.abort,
    loading: false,
  };
}
