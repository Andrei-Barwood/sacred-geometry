/**
 * Verified Data / Evidence layer public API.
 * Independent of templates, projects, and calculators.
 */

export {
  AUTHORITY_TIERS,
  GRANULARITY,
  CHANGE_CLASS,
  FRESHNESS,
  EVIDENCE_STATUS,
  FIELD_DATA_STATUS,
  PROVIDER_STATUS,
  CONFLICT_TYPE,
  TARIFF_STATUS,
  PROVENANCE_VERIFIED,
  EVIDENCE_PROVENANCE,
  SITE_STUDY_REASON,
  SOLAR_PARAMETERS,
} from "./constants.js";

export { SOURCE_REGISTRY, getSource, listSources, sourcesRequiringAttribution, sourceRegistrySnapshot } from "./source-registry.js";
export { createEvidence, createCandidate, evidenceSnapshotForProject, parseRawNumber } from "./evidence-model.js";
export { validateEvidence, normalizeUnit } from "./evidence-validation.js";
export { evaluateFreshness, changeClassOf } from "./freshness.js";
export { calculateEvidenceConfidence, confidenceDisclaimer } from "./confidence.js";
export { detectEvidenceConflicts, areParametersComparable, classifyPair, neverAverage } from "./conflicts.js";
export { PARAMETER_MAP, parameterMeta, enginesAffectedBy, getByPath, setByPath } from "./parameter-map.js";
export {
  currentFieldProvenance,
  dataStatusOf,
  recordAcceptance,
  recordRejection,
  acceptedEvidenceCitations,
  fieldProvenanceRecord,
} from "./field-provenance.js";
export { createTariff, evaluateTariffUsability, tariffMatchesProject, inferCustomerClass } from "./tariff-model.js";
export { convertFiatTariffToBtc, btcQuoteRecord } from "./btc-conversion.js";
export { queryCatalog, CATALOG_EVIDENCE, siwaFixtureEvidence, loadStudy6kWTariffFixture } from "./catalog.js";
export { createEvidenceStore, createIndexedDBEvidenceBackend, upgradeArchitectureDb, EVIDENCE_IDB_VERSION } from "./evidence-store.js";
export { createMemoryCache } from "./cache.js";
export { fetchJson, abortable } from "./fetch-client.js";
export { sanitizeSourceUrl, sanitizePlainText, parseJsonSafe, stripDangerousKeys, isSafeHref } from "./evidence-sanitizer.js";
export { buildProviderQuery } from "./query.js";
export { matchEvidenceToProject, rankEvidenceCandidates, buildCandidates } from "./evidence-resolver.js";
export { enrichProject, checkForEvidenceUpdates } from "./enrichment.js";
export { calculateEvidenceCoverage, relevantParameters } from "./coverage.js";
export { regionalIntelligence, operatorIntelligence } from "./regional-intelligence.js";
export { createResearchRecord } from "./research-record.js";
export { findVerifiedData } from "./lookup.js";
export { buildVerifiedReportModel, cite } from "./report-citations.js";
export { selectPilotTemplates, runPilot, PILOT_PREFERRED_IDS } from "./pilot.js";
export { createDefaultProviders, getProviderStatus } from "./providers/index.js";
export { createGridProvider } from "./providers/grid-provider.js";
export { createSolarProvider } from "./providers/solar-provider.js";
export { createClimateProvider } from "./providers/climate-provider.js";
export { createTariffProvider } from "./providers/tariff-provider.js";
export { createBitcoinProvider } from "./providers/bitcoin-provider.js";
