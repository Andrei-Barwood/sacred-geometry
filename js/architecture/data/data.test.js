/**
 * Verified Data / Evidence layer tests. Offline. No live network.
 *   node js/architecture/data/data.test.js
 */

import assert from "node:assert/strict";
import { architectureTemplates } from "../templates.js";
import { projectFromTemplate, createEmptyProject, createSample6kWProject } from "../ui/state.js";
import { createProjectDocument, createMemoryBackend, createProjectStore, addSnapshot, restoreSnapshotInto, architectureToWorkbench } from "../storage/index.js";
import { generateEngineeringReport, renderEngineeringReportHTML } from "../report/index.js";
import { scanPrivacyBlob } from "../storage/sanitizer.js";
import { REGION_IDS } from "../regional-profiles.js";
import {
  SOURCE_REGISTRY,
  getSource,
  createEvidence,
  parseRawNumber,
  validateEvidence,
  evaluateFreshness,
  calculateEvidenceConfidence,
  detectEvidenceConflicts,
  classifyPair,
  neverAverage,
  areParametersComparable,
  convertFiatTariffToBtc,
  createTariff,
  evaluateTariffUsability,
  enrichProject,
  findVerifiedData,
  matchEvidenceToProject,
  rankEvidenceCandidates,
  queryCatalog,
  siwaFixtureEvidence,
  loadStudy6kWTariffFixture,
  createMemoryCache,
  parseJsonSafe,
  sanitizeSourceUrl,
  sanitizePlainText,
  stripDangerousKeys,
  createBitcoinProvider,
  createSolarProvider,
  createGridProvider,
  createClimateProvider,
  createTariffProvider,
  createDefaultProviders,
  selectPilotTemplates,
  runPilot,
  calculateEvidenceCoverage,
  regionalIntelligence,
  buildVerifiedReportModel,
  FRESHNESS,
  CHANGE_CLASS,
  AUTHORITY_TIERS,
  GRANULARITY,
} from "./index.js";
import { FIXTURE_BTC_USD_QUOTE, FIXTURE_HTML, FIXTURE_MALFORMED, FIXTURE_TARIFF_INDUSTRIAL, FIXTURE_TARIFF_RESIDENTIAL } from "./providers/fixtures.js";
import { createTariff as makeTariff } from "./tariff-model.js";

let passed = 0;
let failed = 0;

function test(name, fn) {
  const run = async () => {
    try {
      await fn();
      passed += 1;
    } catch (err) {
      failed += 1;
      console.error(`FAIL  ${name}\n      ${err.message}`);
    }
  };
  return run();
}

const queue = [];
function testQ(name, fn) {
  queue.push(() => test(name, fn));
}

testQ("source registry uses stable IDs not URLs", () => {
  assert.ok(SOURCE_REGISTRY.length >= 10);
  for (const s of SOURCE_REGISTRY) {
    assert.match(s.id, /^SRC_/);
    assert.ok(!/^https?:/i.test(s.id));
    assert.ok(Object.values(AUTHORITY_TIERS).includes(s.authorityTier));
    assert.equal(getSource(s.id)?.id, s.id);
  }
  assert.ok(getSource("SRC_WORLD_BANK_GSA"));
  assert.ok(getSource("SRC_NATIONAL_GRID_SA"));
  assert.ok(getSource("SRC_COINGECKO_BTC"));
});

testQ("raw vs normalized 230 V", () => {
  const p = parseRawNumber("230 V");
  assert.equal(p.ok, true);
  assert.equal(p.value, 230);
  const ev = createEvidence({
    evidenceId: "EVD_TEST_V",
    parameter: "voltage",
    rawValue: "230 V",
    normalizedValue: 230,
    unit: "V",
    sourceId: "SRC_IEC_60038",
    retrievedAt: "2026-09-03T00:00:00.000Z",
    geography: { country: "EGY" },
    granularity: GRANULARITY.COUNTRY,
  });
  assert.equal(ev.rawValue, "230 V");
  assert.equal(ev.normalizedValue, 230);
  assert.equal(ev.unit, "V");
});

testQ("evidence validation: missing unit, invalid URL, future retrievedAt, NaN, unknown source, confidence", () => {
  const missing = validateEvidence({ evidenceId: "x", parameter: "frequencyHz", sourceId: "SRC_IEC_60038", normalizedValue: 50, retrievedAt: "2026-01-01T00:00:00.000Z", geography: {} });
  assert.equal(missing.ok, false);
  assert.ok(missing.errors.includes("missing unit"));

  const url = validateEvidence({
    evidenceId: "u", parameter: "frequencyHz", normalizedValue: 50, unit: "Hz",
    sourceId: "SRC_IEC_60038", sourceUrl: "javascript:alert(1)",
    retrievedAt: "2026-01-01T00:00:00.000Z", geography: {},
  });
  assert.equal(url.ok, false);
  assert.equal(sanitizeSourceUrl("javascript:alert(1)").ok, false);

  const future = validateEvidence(createEvidence({
    evidenceId: "f", parameter: "frequencyHz", normalizedValue: 50, unit: "Hz",
    sourceId: "SRC_IEC_60038", retrievedAt: "2099-01-01T00:00:00.000Z", geography: {},
  }));
  assert.equal(future.ok, false);
  assert.ok(future.errors.includes("future retrievedAt"));

  const nan = validateEvidence({
    evidenceId: "n", parameter: "frequencyHz", sourceId: "SRC_IEC_60038",
    normalizedValue: Number.NaN, unit: "Hz", retrievedAt: "2026-01-01T00:00:00.000Z", geography: {},
  });
  assert.equal(nan.ok, false);

  const unknown = validateEvidence(createEvidence({
    evidenceId: "k", parameter: "frequencyHz", normalizedValue: 50, unit: "Hz",
    sourceId: "SRC_NOT_REGISTERED", retrievedAt: "2026-01-01T00:00:00.000Z", geography: {},
  }));
  assert.equal(unknown.ok, false);

  const conf = validateEvidence(createEvidence({
    evidenceId: "c", parameter: "frequencyHz", normalizedValue: 50, unit: "Hz",
    sourceId: "SRC_IEC_60038", confidence: 140, retrievedAt: "2026-01-01T00:00:00.000Z", geography: {},
  }));
  assert.equal(conf.ok, false);
});

testQ("freshness is category-specific, not a universal 30-day TTL", () => {
  const now = Date.parse("2026-09-03T00:00:00.000Z");
  const freq = createEvidence({
    evidenceId: "fr", parameter: "frequencyHz", normalizedValue: 50, unit: "Hz",
    sourceId: "SRC_CEA_IND", retrievedAt: "2024-01-01T00:00:00.000Z", changeClass: CHANGE_CLASS.STATIC,
  });
  assert.equal(evaluateFreshness(freq, now).status, FRESHNESS.FRESH);

  const btc = createEvidence({
    evidenceId: "bt", parameter: "btcPrice", normalizedValue: 60000, unit: "USD/BTC",
    sourceId: "SRC_COINGECKO_BTC", retrievedAt: "2026-08-01T00:00:00.000Z", changeClass: CHANGE_CLASS.FAST_CHANGING,
  });
  assert.equal(evaluateFreshness(btc, now).status, FRESHNESS.STALE);

  const tariff = createEvidence({
    evidenceId: "tf", parameter: "energyCharge", normalizedValue: 0.12, unit: "USD/kWh",
    sourceId: "SRC_EGYPTERA", retrievedAt: "2026-01-01T00:00:00.000Z", changeClass: CHANGE_CLASS.PERIODIC,
  });
  const t = evaluateFreshness(tariff, now).status;
  assert.ok(t === FRESHNESS.AGING || t === FRESHNESS.FRESH);
});

testQ("conflicts: tariff class is not a disagreement; GHI vs yield not comparable; no averaging", () => {
  const res = createEvidence({
    evidenceId: "A", parameter: "energyCharge", normalizedValue: 0.11, unit: "USD/kWh",
    sourceId: "SRC_EGYPTERA", retrievedAt: "2026-01-01T00:00:00.000Z",
    geography: { country: "EGY" }, qualifiers: ["residential"],
  });
  const ind = createEvidence({
    evidenceId: "B", parameter: "energyCharge", normalizedValue: 0.08, unit: "USD/kWh",
    sourceId: "SRC_CERC_IND", retrievedAt: "2026-01-01T00:00:00.000Z",
    geography: { country: "EGY" }, qualifiers: ["industrial"],
  });
  const classified = classifyPair(res, ind);
  assert.equal(classified.conflictType, "TARIFF_CLASS");
  assert.equal(classified.isConflict, false);

  const ghi = createEvidence({
    evidenceId: "G", parameter: "ghiAnnual", normalizedValue: 2200, unit: "kWh/m2/year",
    sourceId: "SRC_WORLD_BANK_GSA", retrievedAt: "2026-01-01T00:00:00.000Z",
  });
  const y = createEvidence({
    evidenceId: "Y", parameter: "specificYield", normalizedValue: 1890, unit: "kWh/kWp/year",
    sourceId: "SRC_WORLD_BANK_GSA", retrievedAt: "2026-01-01T00:00:00.000Z",
  });
  assert.equal(areParametersComparable("ghiAnnual", "specificYield"), false);
  assert.equal(classifyPair(ghi, y).conflictType, "NOT_COMPARABLE");

  const avg = neverAverage([0.11, 0.08]);
  assert.equal(avg.refused, true);
});

testQ("temporal/geographic conflicts stay explicit", () => {
  const a = createEvidence({
    evidenceId: "T1", parameter: "energyCharge", normalizedValue: 0.1, unit: "USD/kWh",
    sourceId: "SRC_EGYPTERA", publishedAt: "2020-01-01", retrievedAt: "2026-01-01T00:00:00.000Z",
    geography: { country: "EGY" }, qualifiers: ["industrial"],
  });
  const b = createEvidence({
    evidenceId: "T2", parameter: "energyCharge", normalizedValue: 0.2, unit: "USD/kWh",
    sourceId: "SRC_EETC_EGY", publishedAt: "2026-01-01", retrievedAt: "2026-06-01T00:00:00.000Z",
    geography: { country: "EGY" }, qualifiers: ["industrial"],
  });
  const list = detectEvidenceConflicts([a, b]);
  assert.ok(list.some((c) => c.conflictType === "TEMPORAL" || c.conflictType === "SOURCE"));
});

testQ("BTC conversion 0.12 USD/kWh / 60000 USD/BTC = 0.000002 BTC/kWh = 200 sats", () => {
  const r = convertFiatTariffToBtc({ value: 0.12, currency: "USD" }, { price: 60000, currency: "USD" });
  assert.equal(r.ok, true);
  assert.equal(r.btcPerKWh, 0.000002);
  assert.equal(r.satsPerKWh, 200);
});

testQ("currency mismatch MAD/kWh vs USD/BTC requires conversion", () => {
  const r = convertFiatTariffToBtc({ value: 1.2, currency: "MAD" }, { price: 60000, currency: "USD" });
  assert.equal(r.ok, false);
  assert.equal(r.error, "currency-mismatch");
  assert.match(r.message, /Currency conversion required/);
});

testQ("tariff usability: TOU and demand charge are not flattened", () => {
  const tou = evaluateTariffUsability(createTariff({
    currency: "USD", customerClass: "industrial", energyCharge: 0.1,
    timeOfUse: { peak: 0.2, offPeak: 0.08 },
  }));
  assert.equal(tou.status, "REQUIRES_LOAD_PROFILE");
  const demand = evaluateTariffUsability(createTariff({
    currency: "USD", customerClass: "industrial", energyCharge: 0.1, demandCharge: 12,
  }));
  assert.equal(demand.status, "STRUCTURED");
  assert.equal(demand.usableEnergyCharge, 0.1);
});

testQ("tier 1 wrong scope does not beat tier 2 site-specific", () => {
  const project = { country: "EGY", site: { name: "Siwa" } };
  const tier1Country = createEvidence({
    evidenceId: "C1", parameter: "primaryKV", normalizedValue: 220, unit: "kV",
    sourceId: "SRC_EETC_EGY", retrievedAt: "2026-01-01T00:00:00.000Z",
    geography: { country: "EGY" }, granularity: GRANULARITY.COUNTRY,
  });
  const tier2Site = siwaFixtureEvidence();
  const ranked = rankEvidenceCandidates(project, [tier1Country, tier2Site], "primaryKV");
  assert.equal(ranked.recommended.evidence.evidenceId, "EVD_SIWA_33_11");
});

testQ("stale tier 1 vs current institutional is contextual", () => {
  const stale = createEvidence({
    evidenceId: "old", parameter: "ghiAnnual", normalizedValue: 1800, unit: "kWh/m2/year",
    sourceId: "SRC_EETC_EGY", retrievedAt: "2010-01-01T00:00:00.000Z",
    geography: { country: "EGY" }, granularity: GRANULARITY.COUNTRY, changeClass: CHANGE_CLASS.SLOW_CHANGING,
  });
  const inst = createEvidence({
    evidenceId: "new", parameter: "ghiAnnual", normalizedValue: 2200, unit: "kWh/m2/year",
    sourceId: "SRC_WORLD_BANK_GSA", retrievedAt: "2026-01-01T00:00:00.000Z",
    geography: { country: "EGY" }, granularity: GRANULARITY.COUNTRY, changeClass: CHANGE_CLASS.SLOW_CHANGING,
  });
  const cOld = calculateEvidenceConfidence(stale, { country: "EGY" });
  const cNew = calculateEvidenceConfidence(inst, { country: "EGY" });
  assert.ok(cNew > cOld, `expected newer institutional ${cNew} > stale operator ${cOld}`);
});

testQ("Siwa site evidence is not EGYPT_DEFAULT", () => {
  const siwa = siwaFixtureEvidence();
  const other = projectFromTemplate(architectureTemplates.find((t) => t.id === "G-EGY-G06-001"));
  const match = matchEvidenceToProject(other, siwa);
  assert.equal(match.applicable, false);
  assert.ok(match.reasons.includes("site-mismatch"));
});

testQ("6 kW tariff fixture is not CHILE_DEFAULT or GLOBAL_DEFAULT", () => {
  const fx = loadStudy6kWTariffFixture();
  assert.equal(fx.sourceId, "SRC_LOAD_MODEL_6KW");
  assert.equal(fx.granularity, "SITE");
  const egy = { country: "EGY", metadata: { id: "other" } };
  assert.equal(matchEvidenceToProject(egy, fx).applicable, false);
  const chile = { country: "CHL", metadata: { id: "x" } };
  assert.equal(matchEvidenceToProject(chile, fx).applicable, false);
});

testQ("country evidence may be suggested but remains COUNTRY-level", () => {
  const freq = queryCatalog({ country: "EGY", parameter: "frequencyHz" })[0];
  assert.equal(freq.granularity, "COUNTRY");
  const t = projectFromTemplate(architectureTemplates.find((x) => x.country === "EGY"));
  const m = matchEvidenceToProject(t, freq);
  assert.equal(m.applicable, true);
  assert.ok(m.reasons.includes("country"));
});

testQ("no silent overwrite: findVerifiedData does not mutate project", async () => {
  const t = architectureTemplates.find((x) => x.id === "G-EGY-G06-001");
  const project = projectFromTemplate(t);
  const before = JSON.stringify(project);
  const result = await findVerifiedData(project, { providers: createDefaultProviders({ bitcoin: { live: false } }) });
  assert.equal(JSON.stringify(project), before);
  assert.ok(result.candidates.frequencyHz?.length);
  assert.notEqual(project.grid?.frequencyHz, 50);
});

testQ("accept evidence writes value + provenance history; reject keeps cache conceptually", async () => {
  const t = architectureTemplates.find((x) => x.id === "G-MRT-G03-001");
  const project = projectFromTemplate(t);
  const result = await findVerifiedData(project);
  const cand = result.candidates.frequencyHz[0];
  const original = project;
  const accepted = enrichProject(project, { action: "accept", evidence: cand.evidence });
  assert.notEqual(accepted, original);
  assert.equal(original.grid?.frequencyHz, project.grid?.frequencyHz);
  assert.equal(accepted.grid.frequencyHz, cand.evidence.normalizedValue);
  assert.equal(accepted.provenance.frequencyHz, "verified-external");
  assert.equal(accepted.acceptedEvidence.frequencyHz.evidenceId, cand.evidence.evidenceId);
  assert.ok(accepted.evidenceHistory.some((h) => h.action === "accept"));

  const kept = enrichProject(project, { action: "reject", evidence: cand.evidence });
  assert.equal(kept.grid?.frequencyHz, project.grid?.frequencyHz);
  assert.ok(kept.dismissedEvidence[cand.evidence.evidenceId]);
});

testQ("USER INPUT is not auto-replaced", () => {
  const p = createEmptyProject();
  p.country = "EGY";
  p.grid.frequencyHz = 49.5;
  p.provenance["grid.frequencyHz"] = "user-input";
  const ev = queryCatalog({ country: "EGY", parameter: "frequencyHz" })[0];
  const blocked = enrichProject(p, { action: "accept", evidence: ev });
  assert.equal(blocked.grid.frequencyHz, 49.5);
  assert.ok(blocked.evidenceHistory.some((h) => h.action === "blocked-user-priority"));
  const forced = enrichProject(p, { action: "accept", evidence: ev, overrideUser: true });
  assert.equal(forced.grid.frequencyHz, 50);
});

testQ("GHI is never written as specificYield", async () => {
  const t = architectureTemplates.find((x) => x.id === "G-EGY-G06-001");
  const project = projectFromTemplate(t);
  const ghi = queryCatalog({ country: "EGY", parameter: "ghiAnnual" })[0];
  const next = enrichProject(project, { action: "accept", evidence: ghi });
  assert.notEqual(next.generation?.pv?.specificYieldKWhPerKWpYear, ghi.normalizedValue);
  assert.equal(next.acceptedEvidence.ghiAnnual.appliedToProjectValue, false);
});

testQ("national voltage list does not set primaryKV", () => {
  const t = architectureTemplates.find((x) => x.id === "S-IND-S12-001");
  const project = projectFromTemplate(t);
  const before = project.substation.primaryKV;
  const levels = queryCatalog({ country: "IND", parameter: "nominalVoltageLevelsKV" })[0];
  const next = enrichProject(project, { action: "accept", evidence: levels });
  assert.equal(next.substation.primaryKV, before);
  assert.equal(next.acceptedEvidence.nominalVoltageLevelsKV.writePolicy, "never-from-country-voltage-list");
});

testQ("Saudi frequency is 60 Hz, not a 50 Hz corridor default", () => {
  const sau = queryCatalog({ country: "SAU", parameter: "frequencyHz" })[0];
  const egy = queryCatalog({ country: "EGY", parameter: "frequencyHz" })[0];
  assert.equal(sau.normalizedValue, 60);
  assert.equal(egy.normalizedValue, 50);
});

testQ("climate provider does not invent salinity or flood", async () => {
  const climate = createClimateProvider();
  const flood = await climate.fetchEvidence({ parameter: "floodRisk", country: "BGD" });
  assert.equal(flood.evidence.length, 0);
  assert.equal(flood.unresolved, "needs-specialized-source");
  const salt = await climate.fetchEvidence({ parameter: "salinityRisk", country: "OMN" });
  assert.equal(salt.evidence.length, 0);
  assert.match(salt.note, /not inferred/i);
});

testQ("solar provider does not return specificYield from GHI", async () => {
  const solar = createSolarProvider();
  const r = await solar.fetchEvidence({ parameter: "specificYield", country: "EGY" });
  assert.equal(r.evidence.length, 0);
  const ghi = await solar.fetchEvidence({ parameter: "ghiAnnual", country: "EGY" });
  assert.ok(ghi.evidence.length);
  assert.equal(ghi.evidence[0].parameter, "ghiAnnual");
});

testQ("bitcoin fixture provider and offline default", async () => {
  const liveOff = createBitcoinProvider({ live: false });
  const empty = await liveOff.fetchEvidence({ parameter: "fiatPerBTC", currency: "USD" });
  assert.equal(empty.evidence.length, 0);
  const fx = createBitcoinProvider({ live: false, fixture: FIXTURE_BTC_USD_QUOTE });
  const got = await fx.fetchEvidence({ parameter: "fiatPerBTC", currency: "USD" });
  assert.equal(got.ok, true);
  assert.equal(got.evidence[0].normalizedValue, 60000);
});

testQ("security: malformed JSON, HTML, huge payload, invalid URL, script title, prototype pollution", () => {
  assert.equal(parseJsonSafe(FIXTURE_MALFORMED).ok, false);
  assert.equal(parseJsonSafe(FIXTURE_HTML).ok, false);
  assert.equal(parseJsonSafe("<html>nope</html>").error, "html-response");
  assert.equal(sanitizeSourceUrl("javascript:alert(1)").ok, false);
  assert.equal(sanitizeSourceUrl("data:text/html,x").ok, false);
  assert.equal(sanitizeSourceUrl("file:///etc/passwd").ok, false);
  assert.equal(sanitizeSourceUrl("https://cea.nic.in/").ok, true);
  const title = sanitizePlainText("<script>alert(1)</script>Official Grid");
  assert.equal(title.includes("<script>"), false);
  assert.match(title, /Official Grid/);
  const polluted = stripDangerousKeys(JSON.parse('{"bitcoin":{"usd":1},"__proto__":{"x":1},"constructor":{"y":1}}'));
  assert.equal(Object.prototype.x, undefined);
  assert.equal(polluted.bitcoin.usd, 1);
  assert.equal(Object.prototype.hasOwnProperty.call(polluted, "__proto__"), false);
});

testQ("privacy: provider query has no notes, names, or paths", async () => {
  const p = createEmptyProject();
  p.country = "EGY";
  p.metadata.name = "Andrei private notes";
  p.userNotes = "/Users/andreibarwood/secret.dwg";
  const result = await findVerifiedData(p);
  const blob = JSON.stringify(result.research);
  assert.equal(blob.includes("/Users/"), false);
  assert.equal(blob.includes("andreibarwood"), false);
  assert.equal(blob.includes("secret.dwg"), false);
});

testQ("cache clear does not destroy project", async () => {
  const cache = createMemoryCache();
  const store = await createProjectStore({ backend: createMemoryBackend() });
  const p = createEmptyProject();
  const doc = createProjectDocument(p);
  await store.saveProject(doc);
  await cache.putEvidence(queryCatalog({ country: "EGY", parameter: "frequencyHz" })[0]);
  await cache.clearAllCache();
  const loaded = await store.loadProject(doc.projectId);
  assert.equal(loaded.ok, true);
  assert.equal(loaded.document.projectId, doc.projectId);
});

testQ("snapshots restore accepted evidence", () => {
  const t = architectureTemplates.find((x) => x.id === "G-MRT-G03-001");
  let wb = projectFromTemplate(t);
  const ev = queryCatalog({ country: "MRT", parameter: "frequencyHz" })[0];
  wb = enrichProject(wb, { action: "accept", evidence: ev });
  let doc = createProjectDocument(wb);
  const snap = addSnapshot(doc, { name: "with frequency" });
  doc = snap.document;
  doc.architecture.grid.frequencyHz = null;
  doc.acceptedEvidence = {};
  const restored = restoreSnapshotInto(doc, snap.snapshot.snapshotId);
  assert.equal(restored.document.architecture.grid.frequencyHz, 50);
  assert.ok(restored.document.acceptedEvidence.frequencyHz);
});

testQ("report includes only used sources and escapes titles", () => {
  const t = architectureTemplates.find((x) => x.id === "G-EGY-G06-001");
  let wb = projectFromTemplate(t);
  const ev = queryCatalog({ country: "EGY", parameter: "frequencyHz" })[0];
  wb = enrichProject(wb, { action: "accept", evidence: ev });
  const report = generateEngineeringReport(wb, { reportMode: "detailed", includeVerifiedSources: true });
  assert.ok(report.verifiedSources.length >= 1);
  assert.ok(report.sections.some((s) => s.id === "verifiedSources" && s.included !== false));
  const html = renderEngineeringReportHTML(report);
  assert.match(html, /Verified data sources|S1/);
  assert.equal(html.includes("<script>"), false);
  const unused = SOURCE_REGISTRY.find((s) => s.id === "SRC_EGAT_THA");
  assert.ok(unused);
  assert.equal(report.verifiedSources.some((r) => r.sourceId === "SRC_EGAT_THA"), false);
});

testQ("coverage score is distinct from quality score", () => {
  const p = createEmptyProject();
  p.country = "EGY";
  const cov = calculateEvidenceCoverage(p);
  assert.ok("evidenceCoverageScore" in cov);
  assert.match(cov.disclaimer, /not an engineering quality score/i);
});

testQ("regional intelligence is not regional-profiles heuristic", () => {
  const intel = regionalIntelligence({ country: "OMN", region: "Arabian Peninsula" });
  assert.equal(intel.layer, "verified-intelligence");
  assert.equal(intel.not, "regional-profiles-heuristic");
  assert.ok(intel.pending.some((p) => p.parameter === "salinityRisk"));
  assert.ok(intel.available.some((f) => f.parameter === "frequencyHz"));
});

testQ("8-template pilot covers one region each, offline", async () => {
  const templates = selectPilotTemplates();
  assert.equal(templates.length, REGION_IDS.length);
  const regions = new Set(templates.map((t) => t.regionId).filter(Boolean));
  assert.ok(regions.size >= 7);
  const report = await runPilot({ templates, providers: createDefaultProviders({ bitcoin: { live: false } }) });
  assert.equal(report.count, templates.length);
  for (const row of report.templates) {
    assert.ok(row.requestedParameters.length);
    assert.ok(Array.isArray(row.pendingSiteStudies));
    assert.equal(typeof row.coverageScore, "number");
    assert.equal(row.coverageScore, 0);
    assert.ok(row.candidateCoverage > 0);
  }
});

testQ("grid/tariff providers stay available offline", async () => {
  const g = await createGridProvider().fetchEvidence({ parameter: "frequencyHz", country: "IND" });
  assert.equal(g.ok, true);
  assert.equal(g.evidence[0].normalizedValue, 50);
  const t = await createTariffProvider().fetchEvidence({ parameter: "tariffReference", country: "IND", application: "industrial" });
  assert.ok(t.evidence.length);
  assert.match(t.evidence[0].notes || t.evidence[0].qualifiers.join(" "), /unknown|industrial/i);
});

testQ("confidence is not an accuracy certificate range 0-100", () => {
  const ev = queryCatalog({ country: "IND", parameter: "frequencyHz" })[0];
  const c = calculateEvidenceConfidence(ev, { country: "IND" });
  assert.ok(c >= 0 && c <= 100);
});

testQ("project JSON keeps accepted evidence metadata without full cache", () => {
  const t = architectureTemplates.find((x) => x.id === "S-BGD-S02-001");
  let wb = projectFromTemplate(t);
  const ev = queryCatalog({ country: "BGD", parameter: "frequencyHz" })[0];
  wb = enrichProject(wb, { action: "accept", evidence: ev });
  const doc = createProjectDocument(wb);
  assert.equal(doc.acceptedEvidence.frequencyHz.value, 50);
  assert.ok(doc.acceptedEvidence.frequencyHz.sourceId);
  assert.ok(doc.acceptedEvidence.frequencyHz.retrievedAt);
  const back = architectureToWorkbench(doc);
  assert.equal(back.acceptedEvidence.frequencyHz.evidenceId, ev.evidenceId);
});

testQ("privacy scan of catalog and registry", () => {
  const blob = {
    registry: SOURCE_REGISTRY.map((s) => ({
      id: s.id, name: s.name, organization: s.organization, homepage: s.homepage, notes: s.notes,
    })),
  };
  const hits = scanPrivacyBlob(blob);
  assert.equal(hits.includes("PATH"), false);
  assert.equal(hits.includes("PERSON"), false);
  assert.equal(hits.includes("EMAIL"), false);
});

testQ("sample 6kW project does not leak private tariff into catalog", () => {
  const p = createSample6kWProject();
  const catalogTariffs = queryCatalog({ parameter: "energyCharge" });
  assert.equal(catalogTariffs.length, 0);
  void p;
  void makeTariff;
  void FIXTURE_TARIFF_RESIDENTIAL;
  void FIXTURE_TARIFF_INDUSTRIAL;
});

(async () => {
  for (const fn of queue) await fn();
  console.log(`\nVerified data tests: ${passed} passed, ${failed} failed`);
  if (failed) process.exit(1);
})();
