/**
 * Evidence coverage of relevant project parameters.
 * Distinct from validation Quality Score and regional fit score.
 */

import { FIELD_DATA_STATUS, SITE_STUDY_REASON } from "./constants.js";
import { dataStatusOf } from "./field-provenance.js";
import { parameterMeta } from "./parameter-map.js";

const ALWAYS = ["frequencyHz"];
const WHEN_PV = ["ghiAnnual", "specificYield"];
const WHEN_GRID = ["nominalVoltageLevelsKV", "gridOperator"];
const WHEN_ECON = ["tariffReference"];
const SITE_ALWAYS = ["gridStrength", "shortCircuitLevel", "floodRisk", "salinityRisk"];

export function relevantParameters(project) {
  const list = [...ALWAYS];
  if (project?.generation?.enabled && (project.generation.technologies || []).includes("pv")) {
    list.push(...WHEN_PV);
  }
  if (project?.grid || project?.substation?.enabled) list.push(...WHEN_GRID);
  if (project?.economics?.tariffMode || project?.economics?.fiatPerKWh != null || project?.economics?.btcPerKWh != null) {
    list.push(...WHEN_ECON);
  }
  list.push(...SITE_ALWAYS);
  return [...new Set(list)];
}

export function calculateEvidenceCoverage(project, extras = {}) {
  const params = relevantParameters(project);
  const rows = params.map((parameter) => {
    const meta = parameterMeta(parameter);
    let status = dataStatusOf(project, parameter, {
      conflicting: extras.conflicts?.some((c) => c.parameter === parameter && c.comparable),
      stale: extras.staleParameters?.includes(parameter),
    });
    if (meta?.writePolicy === "site-study" && status !== FIELD_DATA_STATUS.VERIFIED) {
      status = FIELD_DATA_STATUS.SITE_STUDY;
    }
    if (parameter === "ghiAnnual" && project?.acceptedEvidence?.ghiAnnual) status = FIELD_DATA_STATUS.VERIFIED;
    if (parameter === "specificYield" && !project?.acceptedEvidence?.specificYield) {
      if (project?.generation?.pv?.specificYieldKWhPerKWpYear == null) status = FIELD_DATA_STATUS.SITE_STUDY;
    }
    return {
      parameter,
      label: meta?.label || parameter,
      status,
      note: meta?.note || null,
    };
  });
  const counted = rows.filter((r) => r.status !== FIELD_DATA_STATUS.SITE_STUDY);
  const verified = counted.filter((r) => r.status === FIELD_DATA_STATUS.VERIFIED || r.status === FIELD_DATA_STATUS.USER);
  const score = counted.length ? Math.round((verified.length / counted.length) * 100) : 0;
  return {
    rows,
    evidenceCoverageScore: score,
    disclaimer: "Evidence coverage is the share of relevant parameters with accepted verified or user data. It is not an engineering quality score and not a regional-fit score.",
    pendingSiteStudies: rows.filter((r) => r.status === FIELD_DATA_STATUS.SITE_STUDY).map((r) => r.parameter),
  };
}

export function pendingSiteStudy(parameter, reason = SITE_STUDY_REASON.FUTURE_SITE_STUDY) {
  return { parameter, reason, status: FIELD_DATA_STATUS.SITE_STUDY };
}
