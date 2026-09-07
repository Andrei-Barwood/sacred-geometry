/**
 * Parallel field-level provenance. Does not rewrite the template schema.
 */

import { EVIDENCE_PROVENANCE, FIELD_DATA_STATUS, PROVENANCE_VERIFIED } from "./constants.js";
import { evidenceSnapshotForProject } from "./evidence-model.js";
import { getByPath, parameterMeta } from "./parameter-map.js";
import { cloneValue } from "../ui/clone.js";
import { PROVENANCE } from "../ui/constants.js";

export function fieldProvenanceRecord(partial = {}) {
  return {
    value: partial.value ?? null,
    provenance: partial.provenance || EVIDENCE_PROVENANCE.CONCEPTUAL_ASSUMPTION,
    evidenceId: partial.evidenceId || null,
    acceptedAt: partial.acceptedAt || null,
    acceptedStaleEvidence: partial.acceptedStaleEvidence === true,
    previousValue: partial.previousValue,
    sourceId: partial.sourceId || null,
    unit: partial.unit || null,
    granularity: partial.granularity || null,
  };
}

export function currentFieldProvenance(project, parameter) {
  const meta = parameterMeta(parameter);
  const path = meta?.path;
  const accepted = project?.acceptedEvidence?.[parameter] || (path ? project?.acceptedEvidence?.[path] : null);
  if (accepted) {
    return {
      value: accepted.value,
      provenance: accepted.provenance || PROVENANCE_VERIFIED,
      evidenceId: accepted.evidenceId,
      acceptedAt: accepted.acceptedAt,
      path,
    };
  }
  const code = (path && project?.provenance?.[path]) || project?.provenance?.[parameter] || null;
  const value = path ? getByPath(project, path) : undefined;
  return { value, provenance: code || inferProvenance(project, parameter, value), evidenceId: null, acceptedAt: null, path };
}

export function inferProvenance(project, parameter, value) {
  const code = project?.provenance?.[parameterMeta(parameter)?.path];
  if (code) return code;
  if (parameter === "specificYield" && project?.generation?.pv?.resourceProvenance) {
    return project.generation.pv.resourceProvenance;
  }
  if (value == null) return EVIDENCE_PROVENANCE.FUTURE_SITE_STUDY;
  return EVIDENCE_PROVENANCE.CONCEPTUAL_ASSUMPTION;
}

export function dataStatusOf(project, parameter, extras = {}) {
  const cur = currentFieldProvenance(project, parameter);
  if (extras.conflicting) return FIELD_DATA_STATUS.CONFLICTING;
  if (cur.provenance === PROVENANCE.USER || cur.provenance === EVIDENCE_PROVENANCE.USER_INPUT) return FIELD_DATA_STATUS.USER;
  if (cur.provenance === EVIDENCE_PROVENANCE.CALCULATED || cur.provenance === PROVENANCE.CALCULATED) return FIELD_DATA_STATUS.CALCULATED;
  if (cur.provenance === PROVENANCE_VERIFIED || cur.provenance === EVIDENCE_PROVENANCE.SOURCE_DERIVED) {
    return extras.stale ? FIELD_DATA_STATUS.STALE : FIELD_DATA_STATUS.VERIFIED;
  }
  if (cur.provenance === EVIDENCE_PROVENANCE.FUTURE_SITE_STUDY || cur.provenance === PROVENANCE.SITE_STUDY) {
    return FIELD_DATA_STATUS.SITE_STUDY;
  }
  if (cur.value == null) return FIELD_DATA_STATUS.PENDING;
  if (cur.provenance === EVIDENCE_PROVENANCE.CONCEPTUAL_ASSUMPTION) return FIELD_DATA_STATUS.ASSUMED;
  return FIELD_DATA_STATUS.UNVERIFIED;
}

export function recordAcceptance(project, evidence, options = {}) {
  const next = cloneValue(project);
  const parameter = evidence.parameter;
  const meta = parameterMeta(parameter);
  const path = meta?.path;
  const previousValue = path ? getByPath(next, path) : currentFieldProvenance(next, parameter).value;
  const acceptedAt = options.acceptedAt || new Date().toISOString();
  const snap = evidenceSnapshotForProject(evidence);
  const record = {
    ...snap,
    provenance: PROVENANCE_VERIFIED,
    acceptedAt,
    previousValue,
    acceptedStaleEvidence: options.acceptedStaleEvidence === true,
    parameter,
    path: path || null,
  };
  next.acceptedEvidence = { ...(next.acceptedEvidence || {}), [parameter]: record };
  next.evidenceHistory = [
    ...(next.evidenceHistory || []),
    {
      at: acceptedAt,
      action: "accept",
      parameter,
      previousValue,
      newValue: evidence.normalizedValue,
      evidenceId: evidence.evidenceId,
      sourceId: evidence.sourceId,
    },
  ];
  next.provenance = { ...(next.provenance || {}) };
  if (path) next.provenance[path] = PROVENANCE_VERIFIED;
  next.provenance[parameter] = PROVENANCE_VERIFIED;
  return next;
}

export function recordRejection(project, evidence, options = {}) {
  const next = cloneValue(project);
  next.dismissedEvidence = {
    ...(next.dismissedEvidence || {}),
    [evidence.evidenceId]: {
      evidenceId: evidence.evidenceId,
      parameter: evidence.parameter,
      dismissedAt: options.dismissedAt || new Date().toISOString(),
    },
  };
  next.evidenceHistory = [
    ...(next.evidenceHistory || []),
    {
      at: options.dismissedAt || new Date().toISOString(),
      action: "reject",
      parameter: evidence.parameter,
      previousValue: currentFieldProvenance(next, evidence.parameter).value,
      newValue: evidence.normalizedValue,
      evidenceId: evidence.evidenceId,
      sourceId: evidence.sourceId,
    },
  ];
  return next;
}

export function acceptedEvidenceCitations(project) {
  const map = project?.acceptedEvidence || {};
  return Object.values(map).filter(Boolean);
}
