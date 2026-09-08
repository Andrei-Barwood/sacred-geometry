/**
 * Immutable technical snapshots. Rename/note only on the envelope.
 */

import { cloneValue } from "../ui/clone.js";
import { ENGINE_VERSION, FORMAT_SNAPSHOT, LIMITS, SCHEMA_VERSION, newId, nowIso } from "./schema.js";
import { isFiniteNumber } from "../graph/model.js";

function architectureSlice(doc) {
  return {
    architecture: cloneValue(doc.architecture),
    scenarios: cloneValue(doc.scenarios),
    activeScenarioId: doc.activeScenarioId,
    provenance: cloneValue(doc.provenance),
    acceptedEvidence: cloneValue(doc.acceptedEvidence || {}),
    evidenceHistory: cloneValue(doc.evidenceHistory || []),
    dismissedEvidence: cloneValue(doc.dismissedEvidence || {}),
    geospatial: cloneValue(doc.geospatial || { sites: [], activeSiteId: null, restrictions: [], gridNetwork: null }),
  };
}

export function createSnapshot(doc, extras = {}) {
  const t = nowIso();
  const localLabel = extras.name || `Snapshot — ${new Date(t).toLocaleString()}`;
  return {
    snapshotId: extras.snapshotId || newId(),
    projectId: doc.projectId,
    name: localLabel,
    note: extras.note || "",
    createdAt: t,
    schemaVersion: SCHEMA_VERSION,
    engineVersion: ENGINE_VERSION,
    payload: architectureSlice(doc),
    historicalDerivedData: extras.historicalDerivedData
      ? {
          engineVersion: ENGINE_VERSION,
          validationSummary: extras.historicalDerivedData.validationSummary || null,
          calculationSummary: extras.historicalDerivedData.calculationSummary || null,
        }
      : null,
  };
}

export function addSnapshot(doc, extras = {}) {
  const snap = createSnapshot(doc, extras);
  const next = cloneValue(doc);
  let snaps = [...(next.snapshots || []), snap];
  if (extras.automatic) {
    const autos = snaps.filter((s) => s.payload && extras.automatic);
    const autoIds = snaps.filter((s) => s.note === "automatic").map((s) => s.snapshotId);
    if (autoIds.length > LIMITS.maxAutomaticSnapshots) {
      const drop = autoIds.slice(0, autoIds.length - LIMITS.maxAutomaticSnapshots);
      snaps = snaps.filter((s) => !drop.includes(s.snapshotId));
    }
    void autos;
  }
  next.snapshots = snaps;
  next.updatedAt = nowIso();
  return { document: next, snapshot: snap };
}

export function renameSnapshot(doc, snapshotId, name, note) {
  const next = cloneValue(doc);
  const s = (next.snapshots || []).find((x) => x.snapshotId === snapshotId);
  if (!s) return next;
  if (name != null) s.name = String(name);
  if (note != null) s.note = String(note);
  next.updatedAt = nowIso();
  return next;
}

export function getSnapshot(doc, snapshotId) {
  return (doc?.snapshots || []).find((s) => s.snapshotId === snapshotId) || null;
}

/**
 * Restore snapshot into the current projectId. Does not change projectId.
 * Caller must confirm / auto-snapshot current first.
 */
export function restoreSnapshotInto(doc, snapshotId) {
  const snap = getSnapshot(doc, snapshotId);
  if (!snap) return { ok: false, error: "Snapshot not found.", document: doc };
  const next = cloneValue(doc);
  const payload = cloneValue(snap.payload);
  next.architecture = payload.architecture;
  next.scenarios = payload.scenarios;
  next.activeScenarioId = payload.activeScenarioId;
  next.provenance = payload.provenance || {};
  next.acceptedEvidence = payload.acceptedEvidence || {};
  next.evidenceHistory = payload.evidenceHistory || [];
  next.dismissedEvidence = payload.dismissedEvidence || {};
  next.geospatial = payload.geospatial || { sites: [], activeSiteId: null, restrictions: [], gridNetwork: null };
  next.updatedAt = nowIso();
  next.metadata = { ...next.metadata, updatedAt: next.updatedAt };
  return { ok: true, document: next, snapshot: snap };
}

export function projectFromSnapshot(doc, snapshotId) {
  const snap = getSnapshot(doc, snapshotId);
  if (!snap) return null;
  const t = nowIso();
  return {
    ...cloneValue(doc),
    projectId: newId(),
    createdAt: t,
    updatedAt: t,
    snapshots: [],
    metadata: {
      ...cloneValue(doc.metadata),
      name: `${snap.name || doc.metadata?.name || "Project"} (from snapshot)`,
      createdAt: t,
      updatedAt: t,
    },
    architecture: cloneValue(snap.payload.architecture),
    scenarios: cloneValue(snap.payload.scenarios),
    activeScenarioId: snap.payload.activeScenarioId,
    provenance: cloneValue(snap.payload.provenance || {}),
    acceptedEvidence: cloneValue(snap.payload.acceptedEvidence || {}),
    evidenceHistory: cloneValue(snap.payload.evidenceHistory || []),
    dismissedEvidence: cloneValue(snap.payload.dismissedEvidence || {}),
    geospatial: cloneValue(snap.payload.geospatial || { sites: [], activeSiteId: null, restrictions: [], gridNetwork: null }),
  };
}

function num(v) {
  return isFiniteNumber(v) ? v : v;
}

function walkDiff(a, b, path, rows) {
  if (a === b) return;
  const bothObj = a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a) && !Array.isArray(b);
  if (bothObj) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) walkDiff(a[k], b[k], path.concat(k), rows);
    return;
  }
  if (JSON.stringify(a) === JSON.stringify(b)) return;
  rows.push({ path: path.join("."), from: a, to: b });
}

const CATEGORY_PREFIX = [
  ["loads", "Loads"],
  ["generation", "Generation"],
  ["bess", "BESS"],
  ["substation", "Substation"],
  ["grid", "Grid"],
  ["economics", "Economics"],
  ["site", "Site"],
  ["connections", "Connections"],
  ["feeders", "Connections"],
  ["installation", "Loads"],
];

function categoryOf(path) {
  const p = path.replace(/^payload\./, "").replace(/^architecture\./, "");
  if (p.startsWith("scenarios") || p === "activeScenarioId") return "Scenarios";
  for (const [pre, cat] of CATEGORY_PREFIX) {
    if (p === pre || p.startsWith(pre + ".")) return cat;
  }
  return "Other";
}

function formatValue(v) {
  if (v == null) return "null";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") return v;
  return JSON.stringify(v);
}

const INTERESTING = [
  ["architecture.bess.powerMW", "BESS power", "MW"],
  ["architecture.bess.energyMWh", "BESS energy", "MWh"],
  ["architecture.bess.durationHours", "BESS duration", "h"],
  ["architecture.substation.transformerMVA", "Transformer", "MVA"],
  ["architecture.loads.profile.peakLoadMW", "Peak load", "MW"],
  ["architecture.generation.pv.dcMWp", "PV DC", "MWp"],
  ["architecture.generation.pv.acMW", "PV AC", "MW"],
];

export function compareSnapshots(a, b) {
  const left = a?.payload || a;
  const right = b?.payload || b;
  const rows = [];
  walkDiff(left, right, [], rows);
  const filtered = rows.filter((r) => {
    if (/historicalDerivedData|validationSummary|calculationSummary|graph|layout|qualityScore|annualEnergy/.test(r.path)) {
      return false;
    }
    return true;
  });
  const grouped = {};
  for (const r of filtered) {
    const cat = categoryOf(r.path.replace(/^payload\./, ""));
    if (!grouped[cat]) grouped[cat] = [];
    const interesting = INTERESTING.find(([p]) => r.path === p || r.path.endsWith(p) || r.path.endsWith("architecture." + p.replace(/^architecture\./, "")));
    const label = interesting ? interesting[1] : r.path.replace(/^architecture\./, "");
    const unit = interesting ? interesting[2] : "";
    grouped[cat].push({
      path: r.path,
      label,
      from: formatValue(r.from),
      to: formatValue(r.to),
      unit,
      text: `${label}\n${formatValue(r.from)}${unit ? " " + unit : ""} → ${formatValue(r.to)}${unit ? " " + unit : ""}`,
    });
  }
  void num;
  return { groups: grouped, count: filtered.length };
}

export function exportSnapshotEnvelope(snapshot) {
  return {
    format: FORMAT_SNAPSHOT,
    schemaVersion: SCHEMA_VERSION,
    exportedAt: nowIso(),
    snapshot: cloneValue(snapshot),
  };
}
