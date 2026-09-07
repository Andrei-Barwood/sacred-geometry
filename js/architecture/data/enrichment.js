/**
 * Project enrichment. Never mutates the original. Never auto-accepts all.
 */

import { cloneValue } from "../ui/clone.js";
import { FRESHNESS, PROVENANCE_VERIFIED } from "./constants.js";
import { evaluateFreshness } from "./freshness.js";
import { parameterMeta, setByPath } from "./parameter-map.js";
import { recordAcceptance, recordRejection, currentFieldProvenance } from "./field-provenance.js";
import { PROVENANCE } from "../ui/constants.js";

export function enrichProject(project, evidenceSelection) {
  const src = cloneValue(project);
  if (!evidenceSelection) return src;
  const action = evidenceSelection.action || "accept";
  const evidence = evidenceSelection.evidence;
  if (!evidence) return src;

  if (action === "reject" || action === "keep") {
    return recordRejection(src, evidence);
  }

  const meta = parameterMeta(evidence.parameter);
  if (meta?.writePolicy && meta.writePolicy !== "project-value") {
    const next = recordAcceptance(src, evidence, {
      acceptedStaleEvidence: evidenceSelection.acceptedStaleEvidence === true,
    });
    next.acceptedEvidence[evidence.parameter].appliedToProjectValue = false;
    next.acceptedEvidence[evidence.parameter].writePolicy = meta.writePolicy;
    return next;
  }

  const current = currentFieldProvenance(src, evidence.parameter);
  if ((current.provenance === PROVENANCE.USER || current.provenance === "user-input") && evidenceSelection.overrideUser !== true) {
    const next = cloneValue(src);
    next.evidenceHistory = [
      ...(next.evidenceHistory || []),
      {
        at: new Date().toISOString(),
        action: "blocked-user-priority",
        parameter: evidence.parameter,
        evidenceId: evidence.evidenceId,
        previousValue: current.value,
        newValue: evidence.normalizedValue,
      },
    ];
    return next;
  }

  const fresh = evaluateFreshness(evidence);
  if (fresh.status === FRESHNESS.STALE && evidenceSelection.acceptedStaleEvidence !== true) {
    const next = cloneValue(src);
    next.evidenceHistory = [
      ...(next.evidenceHistory || []),
      {
        at: new Date().toISOString(),
        action: "blocked-stale",
        parameter: evidence.parameter,
        evidenceId: evidence.evidenceId,
      },
    ];
    return next;
  }

  let next = recordAcceptance(src, evidence, {
    acceptedStaleEvidence: evidenceSelection.acceptedStaleEvidence === true,
  });
  if (meta?.path && evidence.normalizedValue != null && !Array.isArray(evidence.normalizedValue)) {
    next = setByPath(next, meta.path, evidence.normalizedValue);
    next.provenance = { ...(next.provenance || {}), [meta.path]: PROVENANCE_VERIFIED };
  }
  if (evidence.parameter === "specificYield" && next.generation?.pv) {
    next.generation.pv.resourceProvenance = PROVENANCE_VERIFIED;
  }
  if (evidence.parameter === "fiatPerBTC" || evidence.parameter === "btcPrice") {
    if (!next.economics) next.economics = {};
    next.economics.fiatPerBTC = evidence.normalizedValue;
    next.economics.btcPriceRetrievedAt = evidence.retrievedAt;
    next.economics.btcPriceSourceId = evidence.sourceId;
    if (evidence.unit && /\/BTC/.test(evidence.unit)) {
      next.economics.currency = String(evidence.unit).split("/")[0];
    }
  }
  if (evidence.parameter === "energyCharge" || evidence.parameter === "fiatPerKWh") {
    if (!next.economics) next.economics = {};
    next.economics.fiatPerKWh = evidence.normalizedValue;
    next.economics.tariffMode = next.economics.tariffMode || "fiat-converted";
  }
  return next;
}

export function checkForEvidenceUpdates(project, latestEvidence) {
  const accepted = project?.acceptedEvidence || {};
  const results = [];
  const latest = latestEvidence || [];
  for (const [parameter, rec] of Object.entries(accepted)) {
    const newer = latest.filter((e) => e.parameter === parameter);
    if (!newer.length) {
      results.push({ parameter, result: "UNCHANGED", evidenceId: rec.evidenceId });
      continue;
    }
    const match = newer.find((e) => e.evidenceId === rec.evidenceId);
    if (!match) {
      const sameSource = newer.find((e) => e.sourceId === rec.sourceId);
      if (sameSource && JSON.stringify(sameSource.normalizedValue) !== JSON.stringify(rec.value)) {
        results.push({ parameter, result: "NEWER_DATA_AVAILABLE", evidenceId: sameSource.evidenceId, previous: rec.value, next: sameSource.normalizedValue });
      } else if (!sameSource && newer.length) {
        results.push({ parameter, result: "CONFLICT", evidenceId: newer[0].evidenceId });
      } else {
        results.push({ parameter, result: "UNCHANGED", evidenceId: rec.evidenceId });
      }
      continue;
    }
    if (JSON.stringify(match.normalizedValue) !== JSON.stringify(rec.value)) {
      results.push({ parameter, result: "NEWER_DATA_AVAILABLE", evidenceId: match.evidenceId, previous: rec.value, next: match.normalizedValue });
    } else {
      results.push({ parameter, result: "UNCHANGED", evidenceId: rec.evidenceId });
    }
  }
  return results;
}
