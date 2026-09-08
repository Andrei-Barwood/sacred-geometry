/**
 * Project any comparable entity onto the comparison-view.
 * Mapping only. Missing → N/A (never 0).
 */

import { ENGINE_VERSION } from "../storage/schema.js";
import { architectureTemplates } from "../templates.js";
import { getEnrichment, isStaleField } from "../enrichment/index.js";
import { COMPARISON_FIELDS, ENTITY_KINDS, NA } from "./fields.js";

function getPath(obj, path) {
  if (!path || path.startsWith("_")) return undefined;
  const parts = String(path).split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function enrichmentExtras(architectureId) {
  const rec = getEnrichment(architectureId);
  if (!rec) return {};
  const byKey = {};
  for (const f of rec.fields || []) {
    if (f?.key) byKey[f.key] = f.value;
  }
  const stale = (rec.fields || []).filter((f) => isStaleField(f)).length;
  const conflicts = (rec.conflicts || []).filter((c) => c.resolution === "unresolved").length;
  return {
    ...byKey,
    _coverage: rec.evidence_coverage,
    _conflicts: conflicts,
    _stale: stale,
    _status: rec.enrichment_status,
  };
}

function warningItems(arch) {
  const list = [];
  for (const w of arch.warnings || []) {
    if (typeof w === "string") list.push({ code: w.slice(0, 64), message: w, level: "WARNING" });
    else if (w && typeof w === "object") {
      list.push({
        code: w.code || String(w.message || "").slice(0, 64),
        message: w.message || String(w.code || w),
        level: w.warningLevel || w.severity || "WARNING",
      });
    }
  }
  return list;
}

function architectureFromProject(project) {
  if (!project) return null;
  let src = project;
  if (project.payload?.architecture) {
    src = {
      ...project.payload.architecture,
      geospatial: project.payload.geospatial,
      metadata: { name: project.name },
      sourceTemplateId: project.payload.architecture.sourceTemplateId,
    };
  } else if (project.architecture && (project.projectId || Array.isArray(project.snapshots))) {
    src = {
      ...project.architecture,
      country: project.architecture.country,
      region: project.architecture.region,
      economics: project.architecture.economics,
      geospatial: project.geospatial,
      metadata: project.metadata,
      sourceTemplateId: project.metadata?.sourceTemplateId || project.architecture.sourceTemplateId,
      engineVersion: project.engineVersion,
    };
  }
  const loadProfile = src.loadProfile || src.loads?.profile || null;
  const regionalization =
    src.regionalization ||
    (src.site && typeof src.site.regionalFitScore === "number"
      ? { regionalFitScore: src.site.regionalFitScore }
      : null);
  return {
    ...src,
    loadProfile,
    regionalization,
    warnings: src.warnings || project.warnings || [],
    id: src.id || src.sourceTemplateId || project.sourceTemplateId,
    name: src.name || src.metadata?.name || project.metadata?.name,
  };
}

function readValue(field, arch, extras, site) {
  if (field.siteKey) {
    if (!site) return { value: null, na: true };
    const v = site[field.siteKey];
    if (v == null || v === "") return { value: null, na: true };
    return { value: v, na: false };
  }
  if (field.enrichKey) {
    const ev = extras[field.enrichKey];
    if (ev != null && ev !== "") return { value: ev, na: false };
    if (field.path) {
      const pv = getPath(arch, field.path);
      if (pv != null && pv !== "") return { value: pv, na: false };
    }
    return { value: null, na: true };
  }
  if (field.path === "_warningCount") {
    const n = warningItems(arch).length;
    return { value: n, na: false };
  }
  const v = getPath(arch, field.path);
  if (v == null || v === "") return { value: null, na: true };
  if (field.kind === "boolean") return { value: v === true, na: false };
  return { value: v, na: false };
}

export function emptySlot() {
  return { kind: "", id: "", snapshotId: null, siteId: null, label: "" };
}

export function projectEntity(spec, context = {}) {
  const kind = spec?.kind;
  const warnings = [];
  let arch = null;
  let label = spec?.label || spec?.id || "—";
  let engineVersion = spec?.engineVersion || ENGINE_VERSION;
  let architectureId = spec?.id || null;
  let site = null;

  if (kind === ENTITY_KINDS.TEMPLATE) {
    arch = architectureTemplates.find((t) => t.id === spec.id) || null;
    if (!arch) return { ok: false, error: `template ${spec.id} not found` };
    arch = architectureFromProject(arch);
    label = arch.name || arch.id;
    architectureId = arch.id;
    engineVersion = spec.engineVersion || ENGINE_VERSION;
  } else if (kind === ENTITY_KINDS.PROJECT) {
    const proj =
      spec.project ||
      (spec.id && context.projectsById?.[spec.id]) ||
      (context.projectDocument?.projectId === spec.id ? context.projectDocument : null) ||
      (context.project?.metadata?.id === spec.id || context.project?.projectId === spec.id ? context.project : null) ||
      (!spec.id ? context.projectDocument || context.project : null);
    if (!proj) return { ok: false, error: "project missing" };
    arch = architectureFromProject(proj);
    label = proj.metadata?.name || proj.name || spec.id;
    architectureId = proj.sourceTemplateId || proj.metadata?.sourceTemplateId || arch?.id || spec.id;
    engineVersion = proj.engineVersion || spec.engineVersion || ENGINE_VERSION;
  } else if (kind === ENTITY_KINDS.SNAPSHOT) {
    const doc = context.projectDocument;
    const snap =
      spec.snapshot ||
      (doc?.snapshots || []).find((s) => s.snapshotId === spec.snapshotId || s.snapshotId === spec.id);
    if (!snap) return { ok: false, error: `snapshot ${spec.snapshotId || spec.id} not found` };
    arch = architectureFromProject(snap);
    if (!arch) return { ok: false, error: "snapshot has no architecture" };
    label = snap.name || snap.snapshotId;
    architectureId = arch.id || arch.sourceTemplateId || spec.id;
    engineVersion = snap.engineVersion || spec.engineVersion || ENGINE_VERSION;
  } else if (kind === ENTITY_KINDS.SITE) {
    const proj =
      spec.project ||
      (spec.projectId && context.projectsById?.[spec.projectId]) ||
      context.projectDocument ||
      context.project;
    if (!proj) return { ok: false, error: "site requires an anchored project" };
    arch = architectureFromProject(proj);
    const geo = proj.geospatial || spec.geospatial || arch?.geospatial;
    const found = (geo?.sites || []).find((s) => s.id === spec.siteId || s.id === spec.id);
    if (!found) return { ok: false, error: `site ${spec.siteId || spec.id} not found` };
    label = found.name || found.id;
    architectureId = proj.sourceTemplateId || proj.metadata?.sourceTemplateId || arch?.id;
    engineVersion = proj.engineVersion || spec.engineVersion || ENGINE_VERSION;
    const prox = spec.proximity || context.siteEvaluations?.[found.id]?.proximity || {};
    const rests = spec.restrictions || context.siteEvaluations?.[found.id]?.restrictions || found.restrictions || [];
    site = {
      lat: found.lat,
      lng: found.lng,
      proximityKm: prox.distancia_km ?? null,
      proximityClass: prox.clase ?? null,
      restrictionCount: Array.isArray(rests) ? rests.length : null,
    };
  } else {
    return { ok: false, error: "unknown entity kind" };
  }

  const extras = enrichmentExtras(architectureId);
  const values = {};
  for (const field of COMPARISON_FIELDS) {
    values[field.id] = {
      ...readValue(field, arch || {}, extras, site),
      unit: field.unit,
      kind: field.kind,
    };
  }
  return {
    ok: true,
    kind,
    id: spec.id,
    snapshotId: spec.snapshotId || null,
    siteId: spec.siteId || null,
    label,
    engineVersion,
    architectureId,
    values,
    warnings: warningItems(arch || {}),
    extras,
  };
}

export function formatViewValue(cell) {
  if (!cell || cell.na) return NA;
  if (cell.kind === "boolean") return cell.value ? "yes" : "no";
  if (typeof cell.value === "number" && Number.isFinite(cell.value)) return cell.value;
  if (cell.value == null) return NA;
  return cell.value;
}
