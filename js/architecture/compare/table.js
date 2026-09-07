/**
 * Build an aligned comparison table and deltas. No ranking.
 */

import { contentHash } from "../report/print-model.js";
import {
  COMPARISON_FIELDS,
  COMPARISON_THRESHOLD_DEFAULT,
  ENGINE_SENSITIVE,
  NA,
} from "./fields.js";
import { formatViewValue, projectEntity } from "./project.js";

export function numericDelta(a, b) {
  if (typeof a !== "number" || typeof b !== "number") return { abs: null, pct: null, na: true };
  if (!Number.isFinite(a) || !Number.isFinite(b)) return { abs: null, pct: null, na: true };
  const abs = b - a;
  const pct = a === 0 ? null : (abs / Math.abs(a)) * 100;
  return { abs, pct, na: false };
}

export function highlightDelta(delta, field, thresholdPct, qualitativeDiff) {
  if (qualitativeDiff) return true;
  if (!delta || delta.na) return false;
  if (field.kind !== "number") return false;
  if (delta.pct == null) return Math.abs(delta.abs) > 0;
  return Math.abs(delta.pct) >= thresholdPct;
}

function enginesDiffer(views) {
  const vers = [...new Set(views.map((v) => v.engineVersion).filter(Boolean))];
  return vers.length > 1;
}

export function buildComparison(slots, context = {}, options = {}) {
  const thresholdPct = Number.isFinite(options.thresholdPct) ? options.thresholdPct : COMPARISON_THRESHOLD_DEFAULT;
  const views = [];
  const errors = [];
  for (const spec of (slots || []).filter((s) => s && s.kind && s.id)) {
    const v = projectEntity(spec, context);
    if (!v.ok) errors.push(v.error);
    else views.push(v);
  }
  if (views.length < 2) {
    return {
      ok: false,
      error: errors[0] || "Need 2 or 3 entities.",
      views,
      rows: [],
      warnings: [],
      evidence: [],
      engineMismatch: false,
      thresholdPct,
    };
  }
  if (views.length > 3) views.length = 3;

  const mismatch = enginesDiffer(views);
  const globalWarnings = [];
  if (mismatch) {
    globalWarnings.push({
      code: "ENGINE_MISMATCH",
      message: "Motores distintos: no comparable en rigor. Deltas de campos derivados bloqueados.",
      level: "HIGH",
    });
  }

  const rows = COMPARISON_FIELDS.map((field) => {
    const cells = views.map((v) => v.values[field.id]);
    const display = cells.map(formatViewValue);
    const sensitive = ENGINE_SENSITIVE.includes(field.id);
    const blockDelta = mismatch && sensitive;
    const deltas = [];
    let anyHighlight = false;
    for (let i = 1; i < cells.length; i++) {
      const a = cells[0];
      const b = cells[i];
      if (blockDelta || a.na || b.na) {
        deltas.push({ vs: 0, abs: null, pct: null, na: true, blocked: blockDelta });
        continue;
      }
      if (field.kind === "number") {
        const d = numericDelta(Number(a.value), Number(b.value));
        const hi = highlightDelta(d, field, thresholdPct, false);
        if (hi) anyHighlight = true;
        deltas.push({ vs: 0, ...d, blocked: false, highlight: hi });
      } else {
        const qual = String(a.value) !== String(b.value);
        if (qual) anyHighlight = true;
        deltas.push({ vs: 0, abs: null, pct: null, na: false, blocked: false, highlight: qual, qualitative: qual });
      }
    }
    return {
      id: field.id,
      group: field.group,
      label: field.label,
      unit: field.unit,
      kind: field.kind,
      values: display,
      raw: cells,
      deltas,
      highlight: anyHighlight,
      engineBlocked: blockDelta,
    };
  });

  const warningMap = new Map();
  for (const v of views) {
    for (const w of v.warnings || []) {
      const key = w.code || w.message;
      if (!warningMap.has(key)) warningMap.set(key, { ...w, slots: [v.label] });
      else warningMap.get(key).slots.push(v.label);
    }
  }
  for (const w of globalWarnings) warningMap.set(w.code, { ...w, slots: views.map((x) => x.label) });

  const evidence = views.map((v) => ({
    label: v.label,
    coverage: v.values.evidenceCoverage.na ? null : v.values.evidenceCoverage.value,
    conflicts: v.values.openConflicts.na ? null : v.values.openConflicts.value,
    stale: v.values.staleFields.na ? null : v.values.staleFields.value,
    status: v.values.enrichmentStatus.na ? NA : v.values.enrichmentStatus.value,
  }));

  return {
    ok: true,
    error: null,
    views,
    rows,
    warnings: [...warningMap.values()],
    evidence,
    engineMismatch: mismatch,
    thresholdPct,
    baseline: views[0]?.label || "A",
  };
}

export function formatDeltaCell(d) {
  if (!d || d.blocked) return "no comparable";
  if (d.na) return NA;
  if (d.qualitative) return d.highlight ? "≠" : "=";
  if (d.abs == null) return NA;
  if (d.pct == null) return String(d.abs);
  return `${d.abs} (${Math.round(d.pct * 10) / 10}%)`;
}

export function comparisonToCsv(table) {
  const headers = ["field", "group", "unit"];
  const n = table.views?.length || 0;
  for (let i = 0; i < n; i++) headers.push(`slot_${i + 1}`);
  for (let i = 1; i < n; i++) headers.push(`delta_abs_1_${i + 1}`, `delta_pct_1_${i + 1}`);
  headers.push("highlight", "engine_blocked");
  const lines = [headers.join(",")];
  const esc = (v) => {
    if (v == null) return "";
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  for (const row of table.rows || []) {
    const cols = [row.id, row.group, row.unit, ...row.values];
    for (const d of row.deltas || []) {
      cols.push(d.na || d.blocked ? NA : d.abs);
      cols.push(d.na || d.blocked || d.pct == null ? NA : Math.round(d.pct * 100) / 100);
    }
    cols.push(row.highlight ? "yes" : "no", row.engineBlocked ? "yes" : "no");
    lines.push(cols.map(esc).join(","));
  }
  return `${lines.join("\n")}\n`;
}

export function comparisonPrintModel(table, options = {}) {
  const labels = (table.views || []).map((v, i) => v.label || `Slot ${i + 1}`);
  const columns = ["Campo", ...labels];
  for (let i = 1; i < labels.length; i++) columns.push(`Δ% vs ${labels[0]}`);
  const rows = (table.rows || []).map((row) => {
    const cells = [row.unit ? `${row.label} (${row.unit})` : row.label, ...row.values.map((v) => String(v))];
    for (const d of row.deltas || []) {
      if (d.blocked) cells.push("no comparable");
      else if (d.na) cells.push(NA);
      else if (d.pct != null) cells.push(`${Math.round(d.pct * 10) / 10}%`);
      else if (d.qualitative) cells.push("≠");
      else cells.push(d.abs == null ? NA : String(d.abs));
    }
    return cells;
  });
  const formula = typeof options.userFormula === "string" ? options.userFormula.trim() : "";
  const hashBody = {
    rows: (table.rows || []).map((r) => ({ id: r.id, values: r.values, deltas: r.deltas })),
    thresholdPct: table.thresholdPct,
    labels,
    engineMismatch: table.engineMismatch,
  };
  return {
    rendererVersion: "1.0.0",
    engineVersion: table.views?.[0]?.engineVersion || "",
    snapshotId: options.comparisonId || "comparison",
    projectName: options.name || "Comparación",
    sourceTemplateId: "comparison",
    generatedAt: options.generatedAt || null,
    status: "COMPARISON",
    site: null,
    docTitle: "Comparación cara a cara",
    contentHash: contentHash(hashBody),
    printedAt: options.printedAt || null,
    electricalSummary: [],
    warnings: [
      "Esta comparación no clasifica un ganador.",
      table.engineMismatch
        ? "Motores distintos: no comparable en rigor. Deltas de campos derivados bloqueados."
        : null,
    ].filter(Boolean),
    hasErrors: false,
    sections: [
      {
        id: "table",
        title: "Campos alineados",
        paragraphs: [
          `Umbral de resaltado: ${table.thresholdPct}%. No hay ranking.`,
          formula ? `Fórmula del usuario (no evaluada): ${formula}` : null,
        ].filter(Boolean),
        tables: [{ caption: "Comparison-view", columns, rows, note: "" }],
        notes: [],
        warnings: [],
      },
      {
        id: "warnings",
        title: "Warnings unidos",
        paragraphs: (table.warnings || []).map((w) => `${w.code}: ${w.message}`),
        tables: [],
        notes: [],
        warnings: [],
      },
      {
        id: "evidence",
        title: "Evidence coverage",
        paragraphs: [],
        tables: [
          {
            caption: "Cobertura lado a lado",
            columns: ["Entidad", "Coverage", "Conflictos", "Stale", "Estado"],
            rows: (table.evidence || []).map((e) => [
              e.label,
              e.coverage == null ? NA : String(e.coverage),
              e.conflicts == null ? NA : String(e.conflicts),
              e.stale == null ? NA : String(e.stale),
              e.status || NA,
            ]),
            note: "",
          },
        ],
        notes: [],
        warnings: [],
      },
    ],
  };
}
