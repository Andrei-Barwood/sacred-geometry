/**
 * Semantic HTML renderer. All user text is escaped. No app JS required.
 */

import { cloneValue } from "../ui/clone.js";
import { safeFileStem } from "../storage/index.js";
import { t } from "./i18n.js";
import { reportExportAllowed } from "./sanitizer.js";

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const REPORT_CSS = `
:root { --ink:#101C2F; --muted:#2D3558; --line:#c5c3d0; --paper:#fff; --accent:#325394; }
* { box-sizing:border-box; }
html,body { margin:0; background:var(--paper); color:var(--ink); font-family:Inter, system-ui, sans-serif; line-height:1.5; }
.report { max-width:900px; margin:0 auto; padding:2rem 1.5rem 4rem; }
.report-kicker { letter-spacing:.14em; text-transform:uppercase; font-size:.75rem; color:var(--muted); }
.report h1 { font-family:"El Messiri", Georgia, serif; font-size:1.8rem; margin:.2rem 0 1rem; }
.report h2 { font-family:"El Messiri", Georgia, serif; font-size:1.25rem; margin:1.8rem 0 .6rem; break-after:avoid; }
.report h3 { font-size:1rem; margin:1rem 0 .4rem; }
.report-meta { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:.4rem .8rem; font-size:.85rem; margin-bottom:1rem; }
.report-banner { border:2px solid #b42318; padding:.6rem .8rem; font-weight:700; margin:1rem 0; }
.report-note { font-size:.85rem; color:var(--muted); border-left:3px solid var(--accent); padding:.35rem .6rem; margin:.5rem 0; }
.report-geom { height:8px; margin:1.2rem 0; background:radial-gradient(circle at 50% 50%, var(--accent) 0 2px, transparent 3px); background-size:16px 8px; opacity:.35; }
table { width:100%; border-collapse:collapse; font-size:.85rem; margin:.5rem 0 1rem; break-inside:avoid; }
th,td { border-bottom:1px solid var(--line); padding:.35rem .4rem; vertical-align:top; }
th { text-align:left; font-size:.72rem; letter-spacing:.04em; text-transform:uppercase; color:var(--muted); }
td.num { text-align:right; font-variant-numeric:tabular-nums; }
caption { text-align:left; font-weight:600; margin-bottom:.3rem; }
.report-svg { width:100%; height:auto; max-height:520px; background:#f7f7f9; border:1px solid var(--line); }
figure { margin:1rem 0; break-inside:avoid; }
figcaption { font-size:.8rem; color:var(--muted); }
.toc a { color:var(--accent); text-decoration:none; }
.suit { display:grid; grid-template-columns:repeat(3,1fr); gap:.5rem; }
.status-pill { display:inline-block; border:1px solid var(--line); padding:.1rem .5rem; font-size:.75rem; letter-spacing:.06em; }
@media print {
  body { background:#fff; color:#000; }
  .report { max-width:none; padding:0; }
  .no-print { display:none !important; }
  h2, h3, table, figure { break-inside:avoid; }
  h2 { break-after:avoid; }
  a { color:inherit; }
}
@media (max-width:640px) {
  .suit { grid-template-columns:1fr; }
  .report { padding:1rem; }
}
`;

function titleOf(section, lang) {
  if (section.titleKey === "disclaimer") return "";
  const name = t(lang, section.titleKey || section.id);
  return section.number ? `${section.number}. ${name}` : name;
}

function renderTable(table) {
  if (!table?.rows?.length) return "";
  const head = (table.columns || []).map((c) => `<th scope="col">${esc(c)}</th>`).join("");
  const body = table.rows
    .map((row) => {
      const cells = row.map((cell, i) => {
        const text = cell == null ? "—" : String(cell);
        const num = i > 0 && /MW|MWh|kWh|kV|MVA|%|A\b|h\b|sats|BTC|\d/.test(text);
        return `<td class="${num ? "num" : ""}">${esc(text)}</td>`;
      });
      return `<tr>${cells.join("")}</tr>`;
    })
    .join("");
  const note = table.note ? `<p class="report-note">${esc(table.note)}</p>` : "";
  return `<table><caption>${esc(table.caption || "")}</caption><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>${note}`;
}

function renderSection(section, lang) {
  if (!section || section.included === false) return "";
  const h = titleOf(section, lang);
  const parts = [];
  if (h) parts.push(`<h2 id="sec-${esc(section.id)}">${esc(h)}</h2>`);
  if (section.text) parts.push(`<p>${esc(section.text)}</p>`);
  if (section.highWarnings?.length) {
    parts.push(`<p><strong>WARNING</strong> ${esc(section.highWarnings.map((w) => w.message).join("; "))}</p>`);
  }
  if (section.topology) parts.push(`<p>${esc(section.topology)}</p>`);
  if (section.facts) {
    const f = section.facts;
    parts.push(
      `<ul>${[
        f.mode && `<li>Mode: ${esc(f.mode)}</li>`,
        f.application && `<li>Application: ${esc(f.application)}</li>`,
        f.gridMode && `<li>Grid mode: ${esc(f.gridMode)}</li>`,
        f.scale && `<li>Scale: ${esc(f.scale)}</li>`,
        f.technologies?.length && `<li>Generation: ${esc(f.technologies.join(", "))}</li>`,
        f.storage && `<li>Storage: BESS</li>`,
        f.transformers && `<li>Transformation: yes</li>`,
        f.voltages && `<li>Voltages: ${esc(f.voltages)}</li>`,
        f.feeders != null && `<li>Feeders: ${esc(String(f.feeders))}</li>`,
        f.dominantLoad && `<li>Dominant load: ${esc(f.dominantLoad)}</li>`,
      ]
        .filter(Boolean)
        .join("")}</ul>`
    );
  }
  for (const tb of section.tables || []) parts.push(renderTable(tb));
  for (const n of section.notes || []) parts.push(`<p class="report-note">${esc(n)}</p>`);
  if (section.suitability) {
    const g = (title, arr) =>
      `<div><h3>${esc(title)}</h3><ul>${(arr || []).map((x) => `<li>${esc(x)}</li>`).join("") || "<li>—</li>"}</ul></div>`;
    parts.push(
      `<div class="suit">${g("Preferred", section.suitability.preferred)}${g("Avoid", section.suitability.avoid)}${g("Investigate", section.suitability.investigate)}</div>`
    );
  }
  if (section.formulas?.length) {
    parts.push(`<ul>${section.formulas.map((f) => `<li><code>${esc(f.text)}</code></li>`).join("")}</ul>`);
  }
  if (section.common?.length) {
    parts.push(`<h3>Common</h3><ul>${section.common.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`);
  }
  if (section.specific?.length) {
    parts.push(`<h3>Component-specific</h3><ul>${section.specific.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`);
  }
  if (section.id === "review") {
    parts.push(
      `<ul><li>Errors: ${esc(String(section.errors || 0))}</li><li>Warnings: ${esc(String(section.warnings || 0))}</li><li>Site study pending: ${section.siteStudyPending ? "yes" : "no"}</li><li>Detailed engineering pending: yes</li></ul>`
    );
  }
  if (section.score != null && section.id === "validation") parts.push(`<p>Quality Score: <strong>${esc(String(Math.round(section.score)))}</strong></p>`);
  if (section.score != null && section.id === "evidenceCoverage") {
    parts.push(`<p>Evidence coverage: <strong>${esc(String(Math.round(section.score)))}</strong> / 100 (not a quality score)</p>`);
  }
  if (section.id === "verifiedSources") {
    for (const row of section.tables?.[0]?.rows || []) {
      const url = row[6];
      if (url && url !== "—" && /^https?:/i.test(String(url))) {
        /* URLs are already escaped in the table cells. */
      }
    }
  }
  return parts.join("\n");
}

export function renderEngineeringReportHTML(reportModel, options = {}) {
  const model = cloneValue(reportModel);
  const lang = model.reportMetadata?.language || "en";
  const rm = model.reportMetadata || {};
  const pm = model.projectMetadata || {};
  const generated = rm.generatedAt ? new Date(rm.generatedAt).toLocaleString() : "";
  const banner = model.hasErrors ? `<p class="report-banner">ERROR — ${esc(t(lang, "errorsBanner"))}</p>` : "";
  const unsaved = rm.unsaved ? `<p class="report-note">${esc(t(lang, "unsaved"))}</p>` : "";
  const hist = rm.snapshot
    ? `<p class="report-note">${esc(t(lang, "historical"))}: ${esc(rm.snapshot.name || "")} (${esc(rm.snapshot.createdAt || "")}). ${esc(t(lang, "recalculated"))}</p>`
    : "";
  const toc =
    model.toc?.length && rm.reportMode === "detailed"
      ? `<nav class="toc" aria-label="${esc(t(lang, "toc"))}"><h2>${esc(t(lang, "toc"))}</h2><ol>${model.toc
          .map((i) => `<li><a href="#sec-${esc(i.id)}">${esc(i.number)}. ${esc(t(lang, i.titleKey))}</a></li>`)
          .join("")}</ol></nav>`
      : "";
  const diagrams = [];
  if (model.diagrams?.systemSvg) {
    diagrams.push(
      `<figure><figcaption>${esc(model.diagrams.systemCaption)}</figcaption>${model.diagrams.systemSvg}<p class="report-note">${esc(model.diagrams.topology || "")}</p></figure>`
    );
  }
  if (model.diagrams?.sacredSvg) {
    diagrams.push(
      `<figure><figcaption>${esc(model.diagrams.sacredCaption)} — ${esc(model.diagrams.sacredNote)}</figcaption>${model.diagrams.sacredSvg}</figure>`
    );
  }
  const body = (model.sections || []).map((s) => {
    if (s.id === "architecture") {
      return renderSection(s, lang) + diagrams.join("");
    }
    return renderSection(s, lang);
  }).join("\n<div class=\"report-geom\" aria-hidden=\"true\"></div>\n");

  const prepared = pm.authorAlias ? `<p>${esc(t(lang, "preparedBy"))}: ${esc(pm.authorAlias)}</p>` : "";
  const inner = `
<article class="report" lang="${esc(lang)}">
  <p class="report-kicker">${esc(t(lang, "title"))}</p>
  <h1>${esc(t(lang, "subtitle"))}</h1>
  <p class="status-pill">${esc(rm.statusLabel || "DRAFT")}</p>
  ${banner}${unsaved}${hist}
  <div class="report-meta">
    <div><strong>${esc(pm.name || "")}</strong></div>
    <div>Date ${esc(generated)}</div>
    <div>Project ${esc(pm.projectIdShort || "")}</div>
    <div>Schema ${esc(String(rm.schemaVersion || ""))}</div>
    <div>Engine ${esc(rm.engineVersion || "")}</div>
    <div>Scenario ${esc(rm.scenarioId || "")}</div>
    <div>Mode ${esc(rm.reportMode || "")}</div>
  </div>
  ${prepared}
  ${toc}
  ${body}
</article>`;

  if (options.fragment) return inner;
  return `<!DOCTYPE html>
<html lang="${esc(lang)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format" content="sacred-architecture-report">
<title>${esc(pm.name || "Report")} — Arquitectura Sagrada</title>
<style>${REPORT_CSS}</style>
</head>
<body>
${inner}
</body>
</html>`;
}

export function exportEngineeringReportHTML(reportModel, options = {}) {
  const allow = reportExportAllowed(reportModel);
  if (!allow.ok) return { ok: false, error: allow.message, html: null, filename: null };
  const html = renderEngineeringReportHTML(reportModel, { fragment: false });
  const kind = reportModel.reportMetadata?.format === "sacred-architecture-revision-report" ? "revision-comparison" : "report";
  const filename = `sacred-architecture-${safeFileStem(reportModel.projectMetadata?.name)}-${kind}.html`;
  return { ok: true, html, filename, error: null };
}

export { esc };
