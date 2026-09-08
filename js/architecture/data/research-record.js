import { newId, nowIso } from "../storage/schema.js";

export function createResearchRecord(partial = {}) {
  return {
    id: partial.id || newId(),
    templateId: partial.templateId || null,
    projectId: partial.projectId || null,
    requestedParameters: partial.requestedParameters || [],
    sourcesChecked: partial.sourcesChecked || [],
    evidenceFound: partial.evidenceFound || [],
    unresolved: partial.unresolved || [],
    conflicts: partial.conflicts || [],
    discarded: partial.discarded || [],
    completedAt: partial.completedAt || nowIso(),
    notes: partial.notes || null,
  };
}
