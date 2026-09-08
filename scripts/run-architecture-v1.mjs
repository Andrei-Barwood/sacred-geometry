#!/usr/bin/env node
/**
 * Arquitectura Sagrada v1 — regression suite (prompts 1–16).
 *   node scripts/run-architecture-v1.mjs
 */

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const TESTS = [
  ["1 Source / electrical / BTC", "js/architecture/calculator.test.js"],
  ["2–3 BTC economics", "js/architecture/economics.test.js"],
  ["4 Atlas", "js/architecture/templates.test.js"],
  ["5 Regionalization", "js/architecture/regionalization.test.js"],
  ["6 Validation", "js/architecture/validation/validation-engine.test.js"],
  ["6b Source benchmarks", "js/architecture/validation/source-benchmarks.test.js"],
  ["7 Workbench", "js/architecture/ui/workbench.test.js"],
  ["8 Graph", "js/architecture/graph/graph-engine.test.js"],
  ["9 Persistence", "js/architecture/storage/project-system.test.js"],
  ["10 Reports", "js/architecture/report/report-engine.test.js"],
  ["11 Verified data", "js/architecture/data/data.test.js"],
  ["12 Geo", "js/architecture/geo/geo.test.js"],
  ["13 Enrichment", "js/architecture/enrichment/enrichment.test.js"],
  ["14 PDF", "js/architecture/report/pdf.test.js"],
  ["15 Comparison", "js/architecture/compare/compare.test.js"],
  ["16 BTC ticker (display)", "js/architecture/ui/btc-ticker.test.js"],
  ["16 Contracts", "js/architecture/v1/contracts.test.js"],
  ["16 Perf", "js/architecture/v1/perf.test.js"],
];

function runOne(file) {
  return new Promise((resolveRun) => {
    const child = spawn(process.execPath, [file], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    child.stdout.on("data", (d) => {
      out += d;
    });
    child.stderr.on("data", (d) => {
      out += d;
    });
    child.on("close", (code) => resolveRun({ code, out }));
  });
}

let failed = 0;
for (const [label, file] of TESTS) {
  const r = await runOne(file);
  const tail = r.out.trim().split("\n").slice(-4).join(" | ");
  if (r.code !== 0) {
    failed += 1;
    console.error(`FAIL  ${label}  (${file})\n${r.out}`);
  } else {
    console.log(`PASS  ${label}  — ${tail}`);
  }
}

if (failed) {
  console.error(`\nArchitecture v1 suite: ${failed} file(s) failed`);
  process.exit(1);
}
console.log(`\nArchitecture v1 suite: ${TESTS.length} files passed`);
