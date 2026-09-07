/**
 * Report Model → print view-model. Does not call electrical/BTC engines.
 */

import { ENGINE_VERSION } from "../storage/schema.js";
import { t } from "./i18n.js";
import { REPORT_GENERATOR_VERSION, REPORT_PDF_RENDERER_VERSION } from "./i18n.js";

export const DATO_NO_DISPONIBLE = "Dato no disponible";

const UNKNOWN_RE = /^(—|-|–|null|undefined|n\/a|na|not available|no disponible|informational)?$/i;

export function isUnknownValue(value) {
  if (value == null) return true;
  const s = String(value).trim();
  if (!s) return true;
  return UNKNOWN_RE.test(s);
}

export function printCell(value) {
  if (isUnknownValue(value)) return DATO_NO_DISPONIBLE;
  return String(value);
}

export function contentHash(obj) {
  const json = JSON.stringify(obj);
  let h = 2166136261;
  for (let i = 0; i < json.length; i++) {
    h ^= json.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

function mapRow(row, columns) {
  const cells = (row || []).map((c) => printCell(c));
  const provIdx = (columns || []).findIndex((c) => /proven|source|fuente/i.test(String(c)));
  if (provIdx >= 0) {
    const valueIdx = provIdx > 0 ? provIdx - 1 : 1;
    if (cells[valueIdx] === DATO_NO_DISPONIBLE) cells[provIdx] = "";
  }
  return cells;
}

function mapTable(table) {
  if (!table) return null;
  return {
    id: table.id || null,
    caption: table.caption || "",
    columns: (table.columns || []).map((c) => String(c)),
    rows: (table.rows || []).map((r) => mapRow(r, table.columns)),
    note: table.note ? printCell(table.note) === DATO_NO_DISPONIBLE ? "" : String(table.note) : "",
  };
}

function sectionTitle(section, lang) {
  if (section.id === "disclaimer" || section.id === "header" || section.id === "banner") {
    return section.id === "disclaimer" ? "Aviso" : "";
  }
  const name = t(lang, section.titleKey || section.id);
  return section.number ? `${section.number}. ${name}` : name;
}

function collectWarnings(model) {
  const out = [];
  for (const w of model.validationSummary?.highWarnings || []) {
    out.push(w.message || w.code || String(w));
  }
  for (const w of model.validationSummary?.warnings || []) {
    if (w.warningLevel === "HIGH") continue;
    out.push(w.message || w.code || String(w));
  }
  for (const s of model.sections || []) {
    for (const w of s.highWarnings || []) out.push(w.message || String(w));
  }
  return out;
}

/**
 * Pure mapping. No recompute.
 */
export function buildPrintModel(reportModel, options = {}) {
  const lang = "es";
  const meta = reportModel?.reportMetadata || {};
  const proj = reportModel?.projectMetadata || {};
  const snapshotId = meta.snapshotId || proj.snapshotId || meta.snapshot?.snapshotId || null;
  const siteSection = (reportModel.sections || []).find((s) => s.id === "site");
  const siteName =
    siteSection?.tables?.[0]?.rows?.find((r) => /region|sitio|country|país/i.test(String(r[0])))?.[1] ||
    null;

  const sections = [];
  const exec = (reportModel.sections || []).find((s) => s.id === "exec") || {};
  sections.push({
    id: "exec",
    title: t(lang, "exec"),
    paragraphs: [reportModel.executiveSummary || exec.text || ""].filter(Boolean),
    warnings: (exec.highWarnings || []).map((w) => w.message || String(w)),
    tables: [],
    notes: [],
  });

  const arch = reportModel.architectureSummary || (reportModel.sections || []).find((s) => s.id === "architecture");
  if (arch) {
    const facts = arch.facts || {};
    const rows = Object.entries({
      Modo: facts.mode,
      Aplicación: facts.application,
      "Modo de red": facts.gridMode,
      Escala: facts.scale,
      Generación: (facts.technologies || []).join(", "),
      BESS: facts.storage ? "sí" : "no",
      Transformación: facts.transformers ? "sí" : "no",
      Tensiones: facts.voltages,
    }).map(([k, v]) => [k, printCell(v)]);
    sections.push({
      id: "architecture",
      title: t(lang, "architecture"),
      paragraphs: [reportModel.diagrams?.systemCaption, arch.topology || reportModel.diagrams?.topology].filter(Boolean),
      tables: [{ caption: "SYSTEM", columns: ["Campo", "Valor"], rows, note: "" }],
      notes: [reportModel.diagrams?.sacredNote].filter(Boolean),
      warnings: [],
    });
    if (reportModel.diagrams?.sacredCaption) {
      sections.push({
        id: "sacred",
        title: "SACRED",
        paragraphs: [reportModel.diagrams.sacredCaption, reportModel.diagrams.sacredNote].filter(Boolean),
        tables: [],
        notes: [],
        warnings: [],
      });
    }
  }

  const skip = new Set(["exec", "architecture", "header", "toc", "banner"]);
  for (const s of reportModel.sections || []) {
    if (!s || s.included === false) continue;
    if (skip.has(s.id)) continue;
    const tables = (s.tables || []).map(mapTable).filter(Boolean);
    const notes = [];
    if (s.text) notes.push(s.text);
    if (Array.isArray(s.notes)) notes.push(...s.notes.filter(Boolean));
    if (Array.isArray(s.common)) notes.push(...s.common);
    if (Array.isArray(s.specific)) notes.push(...s.specific);
    if (Array.isArray(s.formulas)) notes.push(...s.formulas.map((f) => f.text || f.id));
    sections.push({
      id: s.id,
      title: sectionTitle(s, lang),
      paragraphs: [],
      tables,
      notes,
      warnings: (s.highWarnings || []).map((w) => w.message || String(w)),
    });
  }

  const warnings = collectWarnings(reportModel);
  const conflicts = [];
  for (const s of reportModel.sections || []) {
    if (s.id !== "provenance" && s.id !== "verifiedSources") continue;
    for (const tbl of s.tables || []) {
      for (const row of tbl.rows || []) {
        const blob = row.join(" ");
        if (/conflict|desacuerdo|STALE/i.test(blob)) conflicts.push(row.map(printCell));
      }
    }
  }

  const body = {
    rendererVersion: REPORT_PDF_RENDERER_VERSION,
    generatorVersion: meta.reportGeneratorVersion || REPORT_GENERATOR_VERSION,
    engineVersion: meta.engineVersion || ENGINE_VERSION,
    snapshotId,
    projectName: proj.name || "Proyecto",
    projectId: proj.projectId || null,
    sourceTemplateId: proj.sourceTemplateId || null,
    status: meta.statusLabel || meta.status || "",
    site: printCell(siteName) === DATO_NO_DISPONIBLE ? null : siteName,
    sections,
    warnings,
    conflicts,
    hasErrors: reportModel.hasErrors === true,
    electricalSummary: (reportModel.electricalSummary || []).map((r) => ({
      label: r.label,
      value: printCell(r.value ?? r.text),
    })),
  };
  const hash = contentHash(body);
  return {
    ...body,
    generatedAt: meta.generatedAt || null,
    reportId: meta.reportId || null,
    contentHash: hash,
    printedAt: options.printedAt || null,
  };
}

export function stablePdfFilename(printModel, options = {}) {
  const date = String(printModel.generatedAt || options.date || "fecha").slice(0, 10);
  const proj = slug(printModel.projectName || "proyecto");
  const arch = slug(printModel.sourceTemplateId || "arquitectura");
  const snap = slug(printModel.snapshotId || "sin-snapshot").slice(0, 8);
  return `${proj}-${arch}-${snap}-${date}.pdf`;
}

function slug(s) {
  return String(s || "x")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 48) || "x";
}
