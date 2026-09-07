/**
 * Detect evidence conflicts. Never average disagreeing sources.
 */

import { CONFLICT_SEVERITY, CONFLICT_TYPE, INCOMPARABLE_PAIRS, TARIFF_CUSTOMER_CLASS } from "./constants.js";
import { normalizeUnit } from "./evidence-validation.js";

function pairKey(a, b) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

const INCOMPARABLE = new Set(INCOMPARABLE_PAIRS.map(([a, b]) => pairKey(a, b)));

export function areParametersComparable(a, b) {
  if (!a || !b) return false;
  if (a === b) return true;
  if (a === "ghi" && b === "ghiAnnual") return true;
  if (a === "btcPrice" && b === "fiatPerBTC") return true;
  if (a === "energyCharge" && b === "fiatPerKWh") return true;
  return !INCOMPARABLE.has(pairKey(a, b));
}

function qualifierSet(evidence) {
  const q = new Set(evidence.qualifiers || []);
  for (const c of Object.values(TARIFF_CUSTOMER_CLASS)) {
    if ((evidence.qualifiers || []).map((x) => String(x).toLowerCase()).includes(c)) q.add(c);
  }
  if (evidence.customerClass) q.add(String(evidence.customerClass).toLowerCase());
  return q;
}

function differentTariffClass(a, b) {
  const classes = new Set(Object.values(TARIFF_CUSTOMER_CLASS));
  const qa = [...qualifierSet(a)].filter((x) => classes.has(x) && x !== "unknown");
  const qb = [...qualifierSet(b)].filter((x) => classes.has(x) && x !== "unknown");
  if (!qa.length || !qb.length) return false;
  return qa.every((c) => !qb.includes(c));
}

function valuesClose(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  if (a === b) return true;
  const scale = Math.max(Math.abs(a), Math.abs(b), 1);
  return Math.abs(a - b) / scale < 0.02;
}

export function classifyPair(a, b) {
  if (!areParametersComparable(a.parameter, b.parameter)) {
    return {
      conflictType: CONFLICT_TYPE.NOT_COMPARABLE,
      severity: CONFLICT_SEVERITY.INFO,
      explanation: `${a.parameter} and ${b.parameter} are different magnitudes and must not be compared or averaged.`,
      isConflict: false,
    };
  }
  if (differentTariffClass(a, b)) {
    return {
      conflictType: CONFLICT_TYPE.TARIFF_CLASS,
      severity: CONFLICT_SEVERITY.INFO,
      explanation: "Different tariff classes. This is not a source disagreement.",
      isConflict: false,
    };
  }
  if (a.unit && b.unit && normalizeUnit(a.unit) !== normalizeUnit(b.unit)) {
    return {
      conflictType: CONFLICT_TYPE.UNIT,
      severity: CONFLICT_SEVERITY.HIGH,
      explanation: `Units differ (${a.unit} vs ${b.unit}). Values are not averaged.`,
      isConflict: true,
    };
  }
  const ga = a.geography || {};
  const gb = b.geography || {};
  if (ga.country && gb.country && ga.country !== gb.country) {
    return {
      conflictType: CONFLICT_TYPE.GEOGRAPHIC,
      severity: CONFLICT_SEVERITY.INFO,
      explanation: "Different countries. Not a conflict on the same scope.",
      isConflict: false,
    };
  }
  if ((ga.site && gb.site && ga.site !== gb.site) || (a.granularity !== b.granularity && (a.granularity === "SITE" || b.granularity === "SITE"))) {
    return {
      conflictType: CONFLICT_TYPE.GEOGRAPHIC,
      severity: CONFLICT_SEVERITY.LOW,
      explanation: "Geographic scopes differ (site vs broader). Prefer the more specific applicable record.",
      isConflict: true,
    };
  }
  const methodA = String(a.methodology || "");
  const methodB = String(b.methodology || "");
  if (methodA && methodB && methodA !== methodB && valuesClose(a.normalizedValue, b.normalizedValue) === false) {
    if (/reference|gsa|pvout/i.test(methodA + methodB) || /tracker|fixed|bifacial/i.test(methodA + methodB)) {
      return {
        conflictType: CONFLICT_TYPE.SYSTEM_BOUNDARY,
        severity: CONFLICT_SEVERITY.MEDIUM,
        explanation: "Method or system boundary differs (for example reference PV vs project configuration).",
        isConflict: true,
      };
    }
    return {
      conflictType: CONFLICT_TYPE.METHODOLOGICAL,
      severity: CONFLICT_SEVERITY.MEDIUM,
      explanation: "Sources use different methodologies.",
      isConflict: true,
    };
  }
  if (valuesClose(a.normalizedValue, b.normalizedValue)) {
    return { conflictType: null, severity: null, explanation: "Values agree within tolerance.", isConflict: false };
  }
  const ta = Date.parse(a.publishedAt || a.retrievedAt || 0);
  const tb = Date.parse(b.publishedAt || b.retrievedAt || 0);
  if (Number.isFinite(ta) && Number.isFinite(tb) && Math.abs(ta - tb) > 86400000 * 30) {
    return {
      conflictType: CONFLICT_TYPE.TEMPORAL,
      severity: CONFLICT_SEVERITY.MEDIUM,
      explanation: "Same parameter, different dates. The newer source does not automatically win if scope differs.",
      isConflict: true,
    };
  }
  if (a.sourceId !== b.sourceId) {
    return {
      conflictType: CONFLICT_TYPE.SOURCE,
      severity: CONFLICT_SEVERITY.MEDIUM,
      explanation: "Independent sources report different values. They are not averaged.",
      isConflict: true,
    };
  }
  return {
    conflictType: CONFLICT_TYPE.MAGNITUDE,
    severity: CONFLICT_SEVERITY.MEDIUM,
    explanation: "Values differ.",
    isConflict: true,
  };
}

export function detectEvidenceConflicts(list) {
  const items = (list || []).filter(Boolean);
  const conflicts = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      const classified = classifyPair(a, b);
      if (!classified.isConflict) continue;
      conflicts.push({
        parameter: a.parameter === b.parameter ? a.parameter : `${a.parameter}|${b.parameter}`,
        evidenceIds: [a.evidenceId, b.evidenceId],
        values: [a.normalizedValue, b.normalizedValue],
        conflictType: classified.conflictType,
        severity: classified.severity,
        explanation: classified.explanation,
        comparable: classified.conflictType !== CONFLICT_TYPE.NOT_COMPARABLE,
      });
    }
  }
  return conflicts;
}

export function neverAverage(values) {
  return { refused: true, values: (values || []).slice(), message: "Disagreeing evidence is not averaged." };
}
