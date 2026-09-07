/**
 * Print view-model → native PDF. No electrical / BTC / regional-fit math.
 */

import { ENGINE_VERSION } from "../storage/schema.js";
import { reportExportAllowed } from "./sanitizer.js";
import { REPORT_PDF_RENDERER_VERSION } from "./i18n.js";
import { buildPrintModel, stablePdfFilename, DATO_NO_DISPONIBLE } from "./print-model.js";
import { A4, PdfBuilder, approxWidth, wrapText } from "./pdf-writer.js";

const INNER = A4.w - 96;

function layout(printModel) {
  const header = `${printModel.projectName || "Arquitectura Sagrada"} · ${(printModel.snapshotId || "").slice(0, 8)}`;
  const footer = `engine ${printModel.engineVersion || ENGINE_VERSION} · renderer ${printModel.rendererVersion || REPORT_PDF_RENDERER_VERSION} · snapshot ${printModel.snapshotId || "—"}`;
  const doc = new PdfBuilder({ headerText: header.slice(0, 90), footerLeft: footer.slice(0, 90) });
  doc.addPage();
  const topMin = 48;
  const topMax = A4.h - 48;
  let top = topMin;

  const ensure = (h) => {
    if (top + h > topMax) {
      doc.addPage();
      top = topMin;
    }
  };

  const addLine = (text, size, bold, gap) => {
    const lines = wrapText(text, INNER, size);
    const lh = size * 1.35;
    for (const line of lines) {
      ensure(lh);
      doc.textAtTop(top + size, line, size, bold);
      top += lh;
    }
    top += gap || 2;
  };

  addLine("ARQUITECTURA SAGRADA", 16, true, 4);
  addLine(printModel.docTitle || "Informe técnico de arquitectura", 11, false, 10);
  addLine(`Proyecto: ${printModel.projectName}`, 10, false, 2);
  addLine(`Sitio: ${printModel.site || DATO_NO_DISPONIBLE}`, 10, false, 2);
  addLine(`Arquitectura / plantilla: ${printModel.sourceTemplateId || DATO_NO_DISPONIBLE}`, 10, false, 2);
  addLine(`Fecha de generación (modelo): ${printModel.generatedAt || DATO_NO_DISPONIBLE}`, 10, false, 2);
  addLine(`Snapshot: ${printModel.snapshotId || DATO_NO_DISPONIBLE}`, 10, false, 2);
  addLine(`Hash de contenido: ${printModel.contentHash}`, 10, false, 2);
  addLine(`Estado: ${printModel.status || DATO_NO_DISPONIBLE}`, 10, false, 2);
  if (printModel.printedAt) addLine(`Impreso: ${printModel.printedAt}`, 8, false, 8);
  if (printModel.hasErrors) addLine("EL PROYECTO CONTIENE ERRORES DE VALIDACIÓN", 10, true, 8);

  if (printModel.electricalSummary?.length) {
    addLine("Resumen ejecutivo numérico", 12, true, 6);
    drawTable(doc, {
      caption: "Resumen eléctrico",
      columns: ["Magnitud", "Valor"],
      rows: printModel.electricalSummary.map((r) => [r.label, r.value]),
    }, () => top, (v) => { top = v; }, ensure);
  }

  if (printModel.warnings?.length) {
    addLine("Avisos", 12, true, 4);
    for (const w of printModel.warnings) addLine(`AVISO: ${w}`, 9, false, 2);
    top += 6;
  }

  for (const sec of printModel.sections || []) {
    addLine(sec.title || sec.id, 12, true, 6);
    for (const p of sec.paragraphs || []) addLine(p, 9, false, 4);
    for (const w of sec.warnings || []) addLine(`AVISO: ${w}`, 9, true, 3);
    for (const tbl of sec.tables || []) {
      drawTable(doc, tbl, () => top, (v) => { top = v; }, ensure);
    }
    for (const n of sec.notes || []) addLine(n, 8, false, 3);
    top += 6;
  }

  return doc;
}

function drawTable(doc, table, getTop, setTop, ensure) {
  const cols = table.columns || [];
  const rows = table.rows || [];
  if (!cols.length || !rows.length) return;
  const n = cols.length;
  const usable = INNER;
  const widths = cols.map((_, i) => (i === 0 ? usable * 0.34 : usable / ((n - 1) || 1) * 0.66 / Math.max(1, n - 1) * (n === 2 ? 1.94 : 1)));
  if (n === 2) {
    widths[0] = usable * 0.42;
    widths[1] = usable * 0.58;
  } else {
    const w = usable / n;
    for (let i = 0; i < n; i++) widths[i] = w;
  }
  const size = 8;
  const pad = 3;

  const paintRow = (cells, bold, header) => {
    const wrapped = cells.map((c, i) => wrapText(c, widths[i] - pad * 2, size));
    const linesN = Math.max(...wrapped.map((w) => w.length), 1);
    const h = linesN * size * 1.3 + pad * 2;
    let top = getTop();
    if (top + h > A4.h - 48) {
      doc.addPage();
      setTop(48);
      top = 48;
      if (!header) paintRow(cols, true, true);
      top = getTop();
    }
    const yTopPdf = A4.h - top;
    const yBotPdf = yTopPdf - h;
    let x = 48;
    for (let i = 0; i < n; i++) {
      doc._rect(x, yBotPdf, widths[i], h, 0.4);
      let ly = top + pad + size;
      for (const line of wrapped[i]) {
        doc.textAtTop(ly, line, size, bold);
        ly += size * 1.3;
      }
      x += widths[i];
    }
    setTop(top + h);
  };

  let top = getTop();
  ensure(14);
  if (table.caption) {
    doc.textAtTop(top + 9, table.caption, 9, true);
    setTop(top + 12);
  }
  paintRow(cols, true, true);
  for (const row of rows) paintRow(row, false, false);
  if (table.note) {
    const t = getTop();
    const lines = wrapText(table.note, INNER, 8);
    ensure(lines.length * 11);
    let y = getTop() + 10;
    for (const line of lines) {
      doc.textAtTop(y, line, 8, false);
      y += 11;
    }
    setTop(y);
  }
  setTop(getTop() + 6);
}

export function renderPrintModelPdf(printModel, options = {}) {
  const doc = layout(printModel);
  const bytes = doc.build();
  return {
    ok: true,
    bytes,
    filename: options.filename || stablePdfFilename(printModel, options),
    printModel,
    text: doc.textLog.join("\n"),
    error: null,
  };
}

export function renderEngineeringReportPdf(reportModel, options = {}) {
  const allow = reportExportAllowed(reportModel);
  if (!allow.ok) return { ok: false, error: allow.message, bytes: null, filename: null, printModel: null };
  const printModel = options.printModel || buildPrintModel(reportModel, { printedAt: options.printedAt || null });
  return renderPrintModelPdf(printModel, options);
}

export { REPORT_PDF_RENDERER_VERSION };
