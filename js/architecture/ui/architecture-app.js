/**
 * Workbench application store. Alpine-compatible. Engines stay independent.
 */

import { architectureTemplates } from "../templates.js";
import { COUNTRIES } from "../template-constants.js";
import { REGION_IDS } from "../regional-profiles.js";
import {
  ARCHITECTURE_MODES,
  BTC_DISPLAY,
  CONFIG_LABELS,
  CONFIG_SECTIONS,
  DISCLAIMER,
  GRID_MODE_DEFS,
  LOAD_OVERLAP_NOTE,
  MODE_LABELS,
  MODE_SECTIONS,
  SAMPLE_6KW_NAME,
  SCENARIO_PRESETS,
  TRANSIENT_TYPES,
  VIEW_MODES,
  VOLTAGE_DROP_NOTE,
  WORKBENCH_LEAD,
  WORKBENCH_NAME,
  WORKBENCH_SUBTITLE,
} from "./constants.js";
import {
  addFeeder,
  addLoad,
  addLoadPreset,
  addTransient,
  applyScenario,
  deleteFeeder,
  deleteLoad,
  deleteTransient,
  duplicateLoad,
  duplicateProject,
  loadSample6kW,
  loadTemplateById,
  patchFeeder,
  patchLoad,
  patchTransient,
  resetProject,
  setEnergyMethod,
  setField,
  setLoadState,
  setMode,
  setNumericField,
  startFromZero,
  toggleCompare,
  toggleTechnology,
} from "./actions.js";
import { recompute } from "./derive.js";
import {
  getArchitectureGraph,
  getBessDerived,
  getEconomicResults,
  getEnergyResults,
  getLoadEditorRows,
  getLoadOverlapNote,
  getProjectTitle,
  getScale,
  getSiteView,
  getSubstationDerived,
  getSummary,
  getValidationResults,
  getProvenance,
} from "./selectors.js";
import {
  emptyFilters,
  explorerFacets,
  featuredArchitectures,
  filterTemplates,
  largeScaleSampleId,
  paginate,
  templateCardModel,
  templateDetail,
} from "./template-explorer.js";
import { listLoadPresets } from "./load-presets.js";
import { displayInputValue, formatBTCDisplay, formatNumber, formatSatsDisplay, parseNumericInput, provenanceLabel } from "./format.js";
import { renderSystemView } from "./svg-system-view.js";
import { renderSacredView } from "./svg-sacred-view.js";
import { LOAD_STATES } from "../models.js";
import {
  architectureTree,
  getTopologySignature,
  nodeDetailsModel,
  textualArchitectureSummary,
  traceElectricalPath,
  validateArchitectureGraph,
} from "../graph/index.js";
import { bindGraphInteractions } from "../svg/renderer.js";
import {
  SAVE_STATUS,
  addScenario,
  addSnapshot,
  compareSnapshots,
  createMemoryBackend,
  createProjectDocument,
  createProjectStore,
  deleteScenario,
  duplicateScenario,
  exportProjectJSON,
  importProjectJSON,
  loadPreferences,
  newId,
  nowIso,
  patchPreferences,
  projectFromSnapshot,
  renameScenario,
  resolveScenario,
  restoreSnapshotInto,
  setActiveScenario,
  updateDocumentFromWorkbench,
} from "../storage/index.js";
import {
  exportEngineeringReportHTML,
  generateEngineeringReport,
  generateRevisionComparisonReport,
  renderEngineeringReportHTML,
  renderEngineeringReportPdf,
} from "../report/index.js";
import {
  findVerifiedData,
  enrichProject,
  listSources,
  createBitcoinProvider,
  calculateEvidenceCoverage,
  checkForEvidenceUpdates,
  evaluateFreshness,
  enginesAffectedBy,
  createEvidenceStore,
  createDefaultProviders,
} from "../data/index.js";
import {
  SITE_STATUSES,
  RESTRICTION_TYPES,
  addSite,
  updateSite,
  removeSite,
  setActiveSite,
  setSiteStatus,
  importIntoGeospatial,
  addSiteEvidence,
  evaluateGeospatial,
  popupMetricsFromReport,
  sitesToGeoJSON,
  sitesToCSV,
  createMapView,
  EMPTY_WARNINGS,
  linkVerifiedToSite,
  emptyGeospatial,
} from "../geo/index.js";
import {
  runPilotEnrichmentBatch,
  runLote9to24EnrichmentBatch,
  runLote25to48EnrichmentBatch,
  runLote49toEndEnrichmentBatch,
  reenrichRegion,
  exportEnrichmentBatchJSON,
  atlasCoverageDashboard,
  exportEnrichedAtlasJSON,
  exportEnrichedAtlasCSV,
  getLastBatch,
  getLastJob,
  enrichmentBadge,
  listEnrichments,
  listBatchIds,
  atlasEnrichmentProgress,
  JOB_STATUS,
  persistEnrichmentBatch,
  hydrateEnrichments,
} from "../enrichment/index.js";

function emptyDerived() {
  return {
    template: null,
    validation: null,
    installation: null,
    economics: { ok: false, reason: "no-project", value: null },
    siteSuitability: null,
    transients: { events: [], scenario: null },
    monthEnergyKWh: null,
  };
}

function emptyGeoDraft() {
  return {
    name: "",
    lat: "",
    lng: "",
    region: "",
    comuna: "",
    country: "",
    altitudeM: "",
    landUse: "",
    owner: "",
    notes: "",
    status: "candidato",
  };
}

function emptyEvidenceState() {
  return {
    loading: false,
    error: null,
    candidates: {},
    conflicts: [],
    unresolved: [],
    coverage: null,
    intelligence: null,
    research: null,
    providers: [],
    updates: [],
    btcLoading: false,
    debug: false,
    sources: listSources(),
  };
}

export function createWorkbench() {
  const wb = {
    name: WORKBENCH_NAME,
    subtitle: WORKBENCH_SUBTITLE,
    lead: WORKBENCH_LEAD,
    disclaimer: DISCLAIMER,
    sample6kWName: SAMPLE_6KW_NAME,
    overlapNote: LOAD_OVERLAP_NOTE,
    voltageDropNote: VOLTAGE_DROP_NOTE,
    modes: MODE_LABELS,
    modeKeys: ARCHITECTURE_MODES,
    gridDefs: GRID_MODE_DEFS,
    scenarios: SCENARIO_PRESETS,
    transientTypes: TRANSIENT_TYPES,
    loadStates: Object.values(LOAD_STATES),
    presets: listLoadPresets(),
    countries: Object.entries(COUNTRIES).map(([code, v]) => ({ code, name: v.name })),
    regionIds: REGION_IDS,
    configLabels: CONFIG_LABELS,

    started: false,
    project: null,
    baseline: null,
    derived: emptyDerived(),
    graph: { nodes: [], edges: [], groups: [], connections: [], metadata: {}, flow: null },
    graphError: null,
    graphSummary: "",
    graphTree: { Generation: [], Storage: [], Transformation: [], Distribution: [], Loads: [], Grid: [] },
    featured: [],
    largeScaleId: null,
    document: null,
    store: null,
    persistenceAvailable: false,
    saveStatus: SAVE_STATUS.IDLE,
    saveError: null,
    projectIndex: [],
    prefs: loadPreferences(),
    snapshotDiff: null,
    reportModel: null,
    reportHtml: "",
    reportStale: false,
    reportSourceRevision: null,
    evidenceStore: null,
    evidence: emptyEvidenceState(),
    geoEval: { evaluations: {}, warnings: [] },
    geoDraft: emptyGeoDraft(),
    enrichment: {
      loading: false,
      batch: null,
      error: null,
      revision: 0,
      job: null,
      filters: { batch_id: "", coverage: "", conflicts: "", stale: "" },
      regionId: "R01",
    },
    siteStatuses: SITE_STATUSES,
    restrictionTypes: RESTRICTION_TYPES,

    ui: {
      view: VIEW_MODES.SYSTEM,
      btcDisplay: BTC_DISPLAY.BOTH,
      configSection: "overview",
      resultsSection: "summary",
      bottomTab: "templates",
      configDrawer: false,
      templateOpen: false,
      templateDetailId: null,
      startOpen: true,
      expandedLoadId: null,
      lastFocus: null,
      compareIds: [],
      explorerPage: 1,
      filters: emptyFilters(),
      facets: explorerFacets(),
      announce: "",
      selectedNodeId: null,
      selectedEdgeId: null,
      graphDecoration: "GEOMETRIC",
      sacredMode: "CONCENTRIC",
      graphFocus: false,
      legendOpen: false,
      graphDebug: false,
      projectsOpen: false,
      snapshotsOpen: false,
      importPreview: null,
      importCollision: false,
      dialog: null,
      resumeProjectId: null,
      projectSort: "updated",
      projectSearch: "",
      confirmRestoreId: null,
      sourcesOpen: false,
      evidenceDetailId: null,
      geoSelectedId: null,
      geoLayers: { sitios: true, red: true, restricciones: true, evidencia: true, cobertura: true },
      reportOpen: false,
      reportOptions: {
        reportMode: "standard",
        includeEconomics: true,
        includeSacredView: false,
        includeValidation: true,
        includeProvenance: false,
        includeVerifiedSources: true,
        includeScenarios: false,
        includeSite: true,
        language: "en",
        scenarioId: null,
      },
    },

    _timer: null,
    _autosaveTimer: null,
    _dirty: false,
    _hydrating: false,
    _svg: { system: null, sacred: null },
    _geoMap: null,
    _topoSig: null,
    _unbind: [],
    _ro: null,

    init() {
      this.ui.facets = explorerFacets();
      this.featured = featuredArchitectures(8).map(templateCardModel);
      this.largeScaleId = largeScaleSampleId();
      this.applyThemeFromApp();
      this.prefs = loadPreferences();
      if (this.prefs.view) this.ui.view = this.prefs.view;
      if (this.prefs.btcDisplay) this.ui.btcDisplay = this.prefs.btcDisplay;
      if (this.prefs.decoration) this.ui.graphDecoration = this.prefs.decoration;
      if (this.prefs.lastProjectId && !this.prefs.lastOpenFailed) {
        this.ui.resumeProjectId = this.prefs.lastProjectId;
      }
      this.evidence.debug = typeof window !== "undefined" && window.__SACRED_EVIDENCE_DEBUG__ === true;
      this.enrichment.batch = getLastBatch();
      this.enrichment.job = getLastJob();
      this._persistReady = this._initPersistence();
    },

    applyThemeFromApp() {
      /* dark mode owned by Alpine.store('app') */
    },

    get sections() {
      if (!this.project) return CONFIG_SECTIONS;
      return MODE_SECTIONS[this.project.mode] || CONFIG_SECTIONS;
    },

    get title() {
      return getProjectTitle(this.project);
    },

    get summary() {
      return getSummary(this.project, this.derived);
    },

    get energy() {
      return getEnergyResults(this.project, this.derived);
    },

    get economics() {
      return getEconomicResults(this.project, this.derived);
    },

    get validation() {
      return getValidationResults(this.derived);
    },

    get bessDerived() {
      return getBessDerived(this.project, this.derived);
    },

    get substationDerived() {
      return getSubstationDerived(this.project, this.derived);
    },

    get site() {
      return getSiteView(this.project, this.derived);
    },

    get loadRows() {
      return getLoadEditorRows(this.project);
    },

    get selectedNode() {
      if (!this.ui.selectedNodeId || !this.graph?.nodes) return null;
      return this.graph.nodes.find((n) => n.id === this.ui.selectedNodeId) || null;
    },

    get selectedDetails() {
      return nodeDetailsModel(this.selectedNode, this.graph);
    },

    get graphValid() {
      return this.graphError ? false : true;
    },

    get saveLabel() {
      if (!this.persistenceAvailable) return "Local persistence unavailable";
      if (this.saveStatus === SAVE_STATUS.SAVING) return "Saving…";
      if (this.saveStatus === SAVE_STATUS.SAVED) return "Saved";
      if (this.saveStatus === SAVE_STATUS.ERROR) return "Save failed";
      if (this._dirty || this.saveStatus === SAVE_STATUS.UNSAVED) return "Unsaved changes";
      return "Saved";
    },

    get listedProjects() {
      const q = String(this.ui.projectSearch || "").trim().toLowerCase();
      let rows = this.projectIndex.filter((p) => !p.archived);
      if (q) {
        rows = rows.filter((p) =>
          [p.name, p.description, p.country, p.region, p.application, ...(p.tags || [])]
            .join(" ")
            .toLowerCase()
            .includes(q)
        );
      }
      const sort = this.ui.projectSort;
      rows.sort((a, b) => {
        if (sort === "name") return String(a.name).localeCompare(String(b.name));
        if (sort === "created") return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
        if (sort === "mode") return String(a.mode || "").localeCompare(String(b.mode || ""));
        return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
      });
      return rows;
    },

    get documentScenarios() {
      return this.document?.scenarios || [];
    },

    get filteredTemplates() {
      return filterTemplates(this.ui.filters);
    },

    get pagedTemplates() {
      return paginate(this.filteredTemplates, this.ui.explorerPage);
    },

    get templateCards() {
      void this.enrichment.revision;
      return this.pagedTemplates.items.map(templateCardModel);
    },

    get enrichmentRows() {
      void this.enrichment.revision;
      const f = this.enrichment.filters || {};
      const records = listEnrichments().filter((r) => {
        if (f.batch_id && r.batch_id !== f.batch_id) return false;
        if (f.coverage === "high" && (r.evidence_coverage || 0) < 0.5) return false;
        if (f.coverage === "low" && (r.evidence_coverage || 0) >= 0.5) return false;
        if (f.conflicts === "yes" && !(r.conflicts || []).some((c) => c.resolution === "unresolved")) return false;
        if (f.conflicts === "no" && (r.conflicts || []).some((c) => c.resolution === "unresolved")) return false;
        const staleN = (r.fields || []).filter((field) => {
          const days = field.freshness_days;
          return Number.isFinite(days) && (r.warnings || []).some((w) => /freshness/i.test(w));
        }).length;
        if (f.stale === "yes" && staleN === 0) return false;
        if (f.stale === "no" && staleN > 0) return false;
        return true;
      });
      return records.map((r) => {
        const badge = enrichmentBadge(r.architecture_id);
        return {
          ...r,
          badge,
          coveragePct: Math.round((r.evidence_coverage || 0) * 100),
          conflictN: badge.conflicts,
          staleN: badge.stale,
          blocked: badge.blocked,
        };
      });
    },

    get atlasProgress() {
      void this.enrichment.revision;
      return atlasEnrichmentProgress();
    },

    get enrichmentBatchIds() {
      void this.enrichment.revision;
      return listBatchIds();
    },

    get enrichmentJobLabel() {
      void this.enrichment.revision;
      const job = this.enrichment.job;
      if (!job || job.status === JOB_STATUS.IDLE) return "No job";
      if (job.status === JOB_STATUS.RUNNING) {
        const p = job.progress || {};
        return `running ${p.done || 0}/${p.total || 0}`;
      }
      if (job.status === JOB_STATUS.FAILED) return "failed";
      if (job.status === JOB_STATUS.DONE) return "done";
      return job.status;
    },

    get regionCoverageIndex() {
      void this.enrichment.revision;
      return this.enrichment.batch?.region_coverage_index || [];
    },

    get catalogCrossFlags() {
      void this.enrichment.revision;
      return this.enrichment.batch?.cross_region_catalog_flags || [];
    },

    get blockedEnrichmentIds() {
      void this.enrichment.revision;
      return this.enrichment.batch?.blocked_ids || [];
    },

    get atlasDashboard() {
      void this.enrichment.revision;
      return atlasCoverageDashboard();
    },

    get detailTemplate() {
      if (!this.ui.templateDetailId) return null;
      const t = architectureTemplates.find((x) => x.id === this.ui.templateDetailId);
      return t ? templateDetail(t) : null;
    },

    get scale() {
      return getScale(this.project, this.derived);
    },

    get showStart() {
      return !this.started;
    },

    get generationTechs() {
      return new Set(this.project?.generation?.technologies || []);
    },

    provenance(path) {
      return getProvenance(this.project, path);
    },

    provenanceLabel,

    get evidenceRows() {
      const out = [];
      const cand = this.evidence?.candidates || {};
      for (const [parameter, list] of Object.entries(cand)) {
        for (const row of list) out.push({ parameter, ...row });
      }
      return out;
    },

    get evidenceCoverageLabel() {
      const s = this.evidence?.coverage?.evidenceCoverageScore;
      return s == null ? "—" : `${s} / 100 coverage`;
    },

    displayValue(value) {
      return displayInputValue(value);
    },

    formatN: formatNumber,
    formatBTC: formatBTCDisplay,
    formatSats: formatSatsDisplay,

    startZero() {
      const r = startFromZero();
      this._setProject(r.project, r.baseline);
    },

    startSample6() {
      const r = loadSample6kW();
      this._setProject(r.project, r.baseline);
    },

    startLargeScale() {
      if (!this.largeScaleId) return;
      this.loadTemplate(this.largeScaleId);
    },

    browseTemplates() {
      this.started = true;
      if (!this.project) {
        const r = startFromZero();
        this.project = r.project;
        this.baseline = r.baseline;
        this._refresh(false);
      }
      this.ui.bottomTab = "templates";
      this.ui.startOpen = false;
      this.scrollTo("wb-templates");
    },

    loadTemplate(id) {
      if (this.project && this.document) {
        this.ui.dialog = { kind: "template", templateId: id };
        return;
      }
      this._applyTemplate(id, "new");
    },

    openTemplate(id) {
      this.ui.templateDetailId = id;
      this.ui.templateOpen = true;
      this.ui.lastFocus = document.activeElement;
      queueMicrotask(() => {
        const el = document.getElementById("wb-template-detail");
        el?.querySelector("button, [href], input, select")?.focus();
      });
    },

    closeTemplate() {
      this.ui.templateOpen = false;
      this.ui.templateDetailId = null;
      const prev = this.ui.lastFocus;
      if (prev && typeof prev.focus === "function") prev.focus();
    },

    newProject() {
      if (this._dirty) {
        this.ui.dialog = { kind: "switch", next: "new" };
        return;
      }
      this.startZero();
    },

    duplicate() {
      if (!this.project || !this.document) return;
      this.saveNow().then(() => this.store?.duplicateProject(this.document.projectId)).then(async (r) => {
        if (r?.ok) await this.openProject(r.document.projectId);
      });
    },

    reset() {
      const r = resetProject(this.baseline);
      this._setProject(r.project, r.baseline);
    },

    validateNow() {
      this._silent = true;
      this._refresh(false);
      this._silent = false;
      this.ui.resultsSection = "validation";
      this.ui.announce = this.validation.valid
        ? `Validation score ${Math.round(this.validation.qualityScore || 0)}`
        : `${this.validation.errors.length} validation errors`;
    },

    goToIssue(issue) {
      const section = issue?.section || "overview";
      this.ui.configSection = section;
      this.ui.configDrawer = true;
      this.ui.resultsSection = "validation";
      const map = { bess: "bess", generation: "pv", substation: "transformer", grid: "grid", load: "load", feeders: "feeder-1" };
      const nid = issue?.nodeId || map[issue?.category];
      if (nid && this.graph.nodes?.some((n) => n.id === nid)) this.selectNode(nid);
      queueMicrotask(() => {
        const root = document.getElementById(`wb-section-${section}`);
        const input = root?.querySelector("input, select, textarea, button");
        input?.focus();
      });
    },

    setMode(mode) {
      if (!this.project) return;
      this.project = setMode(this.project, mode);
      if (!this.sections.includes(this.ui.configSection)) {
        this.ui.configSection = this.sections[0];
      }
      this._refresh();
    },

    patch(path, value) {
      if (!this.project) return;
      this.project = setField(this.project, path, value);
      this._refresh();
    },

    patchNumber(path, raw) {
      if (!this.project) return;
      const r = setNumericField(this.project, path, raw);
      if (r.invalid) return;
      this.project = r.project;
      this._refresh();
    },

    patchBool(path, checked) {
      this.patch(path, !!checked);
    },

    setEnergyMethod(method) {
      if (!this.project) return;
      this.project = setEnergyMethod(this.project, method);
      this._refresh();
    },

    toggleTech(tech, on) {
      if (!this.project) return;
      this.project = toggleTechnology(this.project, tech, on);
      this._refresh();
    },

    addPreset(id) {
      this.project = addLoadPreset(this.project, id);
      this._refresh();
    },

    addBlankLoad() {
      this.project = addLoad(this.project);
      this._refresh();
    },

    dupLoad(id) {
      this.project = duplicateLoad(this.project, id);
      this._refresh();
    },

    removeLoad(id) {
      this.project = deleteLoad(this.project, id);
      this._refresh();
    },

    setLoadState(id, state) {
      this.project = setLoadState(this.project, id, state);
      this._refresh();
    },

    patchLoad(id, key, value) {
      this.project = patchLoad(this.project, id, { [key]: value });
      this._refresh();
    },

    patchLoadNumber(id, key, raw) {
      const p = parseNumericInput(raw);
      if (!p.ok) return;
      if (key === "hoursPerDay" || key === "cyclesPerMonth" || key === "energyPerCycleKWh") {
        const load = this.project.loads.items.find((l) => l.id === id);
        const usage = { ...(load?.usage || {}), [key]: p.value };
        this.project = patchLoad(this.project, id, { usage });
      } else if (key === "dutyCycle") {
        this.project = patchLoad(this.project, id, { dutyCycle: p.value });
      } else {
        this.project = patchLoad(this.project, id, { [key]: p.value });
      }
      this._refresh();
    },

    applyScenario(id) {
      this.project = applyScenario(this.project, id);
      this._refresh();
    },

    addTransient() {
      this.project = addTransient(this.project, { type: "motor-start", name: "Motor start" });
      this._refresh();
    },

    patchTransient(id, key, value) {
      this.project = patchTransient(this.project, id, { [key]: value });
      this._refresh();
    },

    removeTransient(id) {
      this.project = deleteTransient(this.project, id);
      this._refresh();
    },

    addFeeder() {
      this.project = addFeeder(this.project);
      this._refresh();
    },

    patchFeeder(index, key, value) {
      this.project = patchFeeder(this.project, index, { [key]: value });
      this._refresh();
    },

    patchFeederNumber(index, key, raw) {
      const p = parseNumericInput(raw);
      if (!p.ok) return;
      this.project = patchFeeder(this.project, index, { [key]: p.value });
      this._refresh();
    },

    removeFeeder(index) {
      this.project = deleteFeeder(this.project, index);
      this._refresh();
    },

    setView(view) {
      this.ui.view = view;
      this.prefs = patchPreferences({ view });
      this._renderSvg();
      if (view === VIEW_MODES.MAP) queueMicrotask(() => this._refreshGeoMap());
    },

    setDecoration(level) {
      this.ui.graphDecoration = level;
      this._renderSvg();
    },

    setSacredMode(mode) {
      this.ui.sacredMode = mode;
      this._renderSvg();
    },

    selectNode(id) {
      this.ui.selectedNodeId = id;
      this.ui.selectedEdgeId = null;
      this._renderSvg();
    },

    selectEdge(id) {
      this.ui.selectedEdgeId = id;
    },

    toggleGraphFocus() {
      this.ui.graphFocus = !this.ui.graphFocus;
      this._renderSvg();
    },

    clearGraphSelection() {
      this.ui.selectedNodeId = null;
      this.ui.selectedEdgeId = null;
      this.ui.graphFocus = false;
      this._renderSvg();
    },

    setBtcDisplay(mode) {
      this.ui.btcDisplay = mode;
      this.prefs = patchPreferences({ btcDisplay: mode });
    },

    toggleCompare(id) {
      this.ui.compareIds = toggleCompare(this.ui.compareIds, id, 3);
    },

    onSearch(value) {
      this.ui.filters.search = value;
      this.ui.explorerPage = 1;
    },

    onFilter(key, value) {
      this.ui.filters[key] = value;
      if (key === "batch_id" || key === "coverage" || key === "conflicts" || key === "stale") {
        this.enrichment.filters[key] = value;
        this.enrichment.revision += 1;
      }
      this.ui.explorerPage = 1;
    },

    clearFilters() {
      this.ui.filters = emptyFilters();
      this.enrichment.filters = { batch_id: "", coverage: "", conflicts: "", stale: "" };
      this.ui.explorerPage = 1;
      this.enrichment.revision += 1;
    },

    setPage(p) {
      this.ui.explorerPage = p;
    },

    bindSvg(systemEl, sacredEl) {
      this._svg.system = systemEl;
      this._svg.sacred = sacredEl;
      this._bindInteractions();
      this._observeResize(systemEl || sacredEl);
      this._renderSvg();
    },

    bindGeoMap(el) {
      if (!el) return;
      if (this._geoMap) this._geoMap.destroy();
      this._geoMap = createMapView(el, {
        onSelect: (id) => {
          this.ui.geoSelectedId = id;
          this._refreshGeoMap();
        },
        project: this.project,
      });
      this._refreshGeoMap();
    },

    onKeydown(ev) {
      if (ev.key === "Escape") {
        if (this.ui.templateOpen) {
          this.closeTemplate();
          ev.preventDefault();
        } else if (this.ui.selectedNodeId || this.ui.graphFocus) {
          this.clearGraphSelection();
          ev.preventDefault();
        } else if (this.ui.configDrawer) {
          this.ui.configDrawer = false;
        }
      }
    },

    scrollTo(id) {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
    },

    techOn(tech) {
      return (this.project?.generation?.technologies || []).includes(tech);
    },

    energyMethodIs(method) {
      return this.project?.generation?.energyCalculationMethod === method;
    },

    async _initPersistence() {
      try {
        this.store = await createProjectStore();
        this.persistenceAvailable = this.store.available;
        if (!this.store.available) this.saveStatus = SAVE_STATUS.UNAVAILABLE;
        this.projectIndex = await this.store.listProjects();
        try {
          this.evidenceStore = await createEvidenceStore();
        } catch {
          this.evidenceStore = null;
        }
        try {
          await hydrateEnrichments();
          this.enrichment.batch = getLastBatch();
          this.enrichment.job = getLastJob();
          this.enrichment.revision += 1;
          this.featured = featuredArchitectures(8).map(templateCardModel);
        } catch {
          /* memory store stays empty */
        }
      } catch (_err) {
        this.store = await createProjectStore({ backend: createMemoryBackend() });
        this.persistenceAvailable = false;
        this.saveStatus = SAVE_STATUS.UNAVAILABLE;
      }
    },

    _markDirty() {
      if (this._hydrating || this._silent) return;
      this._dirty = true;
      this.saveStatus = SAVE_STATUS.UNSAVED;
      if (this.reportModel) this.reportStale = true;
      if (this.document) {
        this.document = updateDocumentFromWorkbench(this.document, this.project, {
          lastValidationStatus: this.derived?.validation
            ? {
                valid: this.derived.validation.valid,
                errors: this.derived.validation.counts?.errors ?? 0,
                warnings: this.derived.validation.counts?.warnings ?? 0,
              }
            : null,
        });
      }
      this._scheduleAutosave();
    },

    _scheduleAutosave() {
      if (!this.prefs?.autosave || !this.persistenceAvailable || !this.document) return;
      if (this._autosaveTimer) clearTimeout(this._autosaveTimer);
      this._autosaveTimer = setTimeout(() => this.saveNow(), 1500);
    },

    async saveNow() {
      if (!this.document || !this.store) {
        this.saveError = "Project could not be saved locally.";
        this.saveStatus = SAVE_STATUS.ERROR;
        return { ok: false };
      }
      this.saveStatus = SAVE_STATUS.SAVING;
      this.saveError = null;
      const doc = updateDocumentFromWorkbench(this.document, this.project, {
        lastValidationStatus: this.derived?.validation
          ? {
              valid: this.derived.validation.valid,
              errors: this.derived.validation.counts?.errors ?? 0,
              warnings: this.derived.validation.counts?.warnings ?? 0,
            }
          : null,
      });
      const result = await this.store.saveProject(doc);
      if (!result.ok) {
        this.saveStatus = SAVE_STATUS.ERROR;
        this.saveError = result.error || "Project could not be saved locally.";
        this.ui.announce = this.saveError;
        return result;
      }
      this.document = result.document;
      this._dirty = false;
      this.saveStatus = SAVE_STATUS.SAVED;
      this.projectIndex = await this.store.listProjects();
      this.prefs = patchPreferences({ lastProjectId: result.document.projectId, lastOpenFailed: false });
      return result;
    },

    async openProject(projectId) {
      if (!this.store) await this._persistReady;
      const loaded = await this.store.loadProject(projectId);
      if (!loaded.ok) {
        this.prefs = patchPreferences({ lastOpenFailed: true });
        this.ui.announce = loaded.error;
        return;
      }
      this._hydrating = true;
      this.document = loaded.document;
      const wb = resolveScenario(loaded.document, loaded.document.activeScenarioId);
      this.project = wb;
      this.baseline = wb;
      this.started = true;
      this.ui.startOpen = false;
      this._refresh(false);
      this._hydrating = false;
      this._dirty = false;
      this.saveStatus = SAVE_STATUS.SAVED;
      this.prefs = patchPreferences({ lastProjectId: projectId, lastOpenFailed: false });
      this.ui.projectsOpen = false;
      this.ui.resumeProjectId = null;
    },

    resumeLast() {
      if (this.ui.resumeProjectId) this.openProject(this.ui.resumeProjectId);
    },

    async deleteListedProject(projectId) {
      this.ui.dialog = { kind: "delete", projectId };
    },

    async confirmDialog(action) {
      const d = this.ui.dialog;
      this.ui.dialog = null;
      if (!d) return;
      if (d.kind === "delete" && action === "confirm") {
        await this.store.deleteProject(d.projectId);
        this.projectIndex = await this.store.listProjects();
        if (this.document?.projectId === d.projectId) this.startZero();
        return;
      }
      if (d.kind === "switch") {
        if (action === "save") {
          await this.saveNow();
          if (d.next === "new") this.startZero();
          else if (d.nextId) await this.openProject(d.nextId);
        } else if (action === "discard") {
          this._dirty = false;
          if (d.next === "new") this.startZero();
          else if (d.nextId) await this.openProject(d.nextId);
        }
        return;
      }
      if (d.kind === "template") {
        if (action === "new") this._applyTemplate(d.templateId, "new");
        if (action === "replace") this._applyTemplate(d.templateId, "replace");
        return;
      }
      if (d.kind === "restore" && action === "confirm") {
        await this._restoreSnapshot(d.snapshotId, true);
      }
      if (d.kind === "import-collision") {
        if (action === "copy") await this._commitImport(d.previewDoc, { asCopy: true });
        if (action === "replace") await this._commitImport(d.previewDoc, { replace: true });
      }
      if (d.kind === "stale-evidence" && action === "confirm") {
        this.acceptCandidate(d.parameter, d.evidenceId, { acceptedStaleEvidence: true });
      }
    },

    _applyTemplate(id, mode) {
      const r = loadTemplateById(id);
      if (!r.ok) return;
      this.ui.templateOpen = false;
      this.ui.templateDetailId = null;
      if (mode === "replace" && this.document) {
        const snap = addSnapshot(this.document, { name: "Before template replace", note: "automatic", automatic: true });
        this.document = snap.document;
        this._setProject(r.project, r.baseline, { keepId: true });
      } else {
        this._setProject(r.project, r.baseline);
      }
      this.ui.announce = `Loaded template ${id}`;
    },

    openProjects() {
      this.ui.projectsOpen = true;
      this.store?.listProjects().then((rows) => {
        this.projectIndex = rows;
      });
    },

    requestOpenProject(projectId) {
      if (this._dirty) {
        this.ui.dialog = { kind: "switch", nextId: projectId };
        return;
      }
      this.openProject(projectId);
    },

    exportNow() {
      if (!this.document) return;
      const doc = updateDocumentFromWorkbench(this.document, this.project);
      const exp = exportProjectJSON(doc);
      if (!exp.ok) {
        this.ui.announce = exp.error;
        this.saveError = exp.error;
        return;
      }
      this._download(exp.filename, exp.json);
    },

    _download(filename, data, mime) {
      if (typeof document === "undefined") return;
      const type =
        mime ||
        (data instanceof Uint8Array ? "application/pdf" : "application/json");
      const blob = new Blob([data], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    },

    onImportFile(ev) {
      const file = ev.target?.files?.[0];
      ev.target.value = "";
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        this.ui.announce = "File exceeds the import size limit.";
        return;
      }
      const reader = new FileReader();
      reader.onload = () => this._previewImport(String(reader.result || ""));
      reader.readAsText(file);
    },

    _previewImport(text) {
      const imp = importProjectJSON(text);
      if (!imp.ok) {
        this.ui.importPreview = { error: imp.error };
        return;
      }
      this.store.exists(imp.document.projectId).then((exists) => {
        this.ui.importPreview = { ...imp.preview, error: null };
        this.ui.importCollision = exists;
        this._importDoc = imp.document;
      });
    },

    async confirmImport(mode) {
      const doc = this._importDoc;
      this.ui.importPreview = null;
      if (!doc) return;
      if (this.ui.importCollision && !mode) {
        this.ui.dialog = { kind: "import-collision", previewDoc: doc };
        return;
      }
      await this._commitImport(doc, { asCopy: mode === "copy", replace: mode === "replace" });
    },

    async _commitImport(doc, { asCopy, replace } = {}) {
      let next = doc;
      if (asCopy) {
        next = { ...doc, projectId: newId(), metadata: { ...doc.metadata, name: `${doc.metadata?.name || "Project"} imported` } };
        next.createdAt = next.updatedAt;
      }
      if (replace && this.store) {
        const existing = await this.store.loadProject(doc.projectId);
        if (existing.ok) {
          const guarded = addSnapshot(existing.document, { name: "Before import replace", note: "automatic", automatic: true });
          await this.store.saveProject(guarded.document);
        }
      }
      await this.store.saveProject(next);
      await this.openProject(next.projectId);
    },

    takeSnapshot() {
      if (!this.document) return;
      this.document = updateDocumentFromWorkbench(this.document, this.project);
      const r = addSnapshot(this.document, { name: null });
      this.document = r.document;
      this._markDirty();
      this.ui.announce = `Snapshot created: ${r.snapshot.name}`;
      this.saveNow();
    },

    async _restoreSnapshot(snapshotId, confirmed) {
      if (!confirmed) {
        this.ui.dialog = { kind: "restore", snapshotId };
        return;
      }
      const auto = addSnapshot(this.document, { name: "Before restore", note: "automatic", automatic: true });
      const restored = restoreSnapshotInto(auto.document, snapshotId);
      if (!restored.ok) return;
      this.document = restored.document;
      this.project = resolveScenario(this.document, this.document.activeScenarioId);
      this._refresh(false);
      this._markDirty();
      await this.saveNow();
    },

    restoreSnapshot(id) {
      this._restoreSnapshot(id, false);
    },

    newFromSnapshot(id) {
      const fresh = projectFromSnapshot(this.document, id);
      if (!fresh) return;
      this.store.saveProject(fresh).then(() => this.openProject(fresh.projectId));
    },

    diffSnapshots(a, b) {
      const sa = this.document?.snapshots?.find((s) => s.snapshotId === a);
      const sb = this.document?.snapshots?.find((s) => s.snapshotId === b);
      this.snapshotDiff = sa && sb ? compareSnapshots(sa, sb) : null;
    },

    setWorkbenchScenario(scenarioId) {
      if (!this.document) return;
      this.document = setActiveScenario(this.document, scenarioId);
      this.project = resolveScenario(this.document, scenarioId);
      this._refresh(false);
      this._markDirty();
    },

    addWorkbenchScenario() {
      if (!this.document) return;
      const r = addScenario(this.document, { name: "Custom scenario", operatingState: "custom" });
      this.document = r.document;
      this._markDirty();
    },

    duplicateWorkbenchScenario(id) {
      const r = duplicateScenario(this.document, id);
      this.document = r.document;
      this._markDirty();
    },

    deleteWorkbenchScenario(id) {
      const r = deleteScenario(this.document, id);
      if (!r.ok) {
        this.ui.announce = r.error;
        return;
      }
      this.document = r.document;
      this.project = resolveScenario(this.document, r.activeScenarioId);
      this._refresh(false);
      this._markDirty();
    },

    renameWorkbenchScenario(id, name) {
      this.document = renameScenario(this.document, id, name);
      this._markDirty();
    },

    openReport() {
      this.ui.reportOpen = true;
      this.ui.reportOptions.scenarioId = this.document?.activeScenarioId || this.project?.scenario?.id || null;
    },

    generateReport() {
      if (!this.project) return;
      const opts = { ...this.ui.reportOptions, unsaved: this._dirty === true };
      opts.sourceRevision = this.document?.updatedAt || null;
      const source = this.document || this.project;
      this.reportModel = generateEngineeringReport(source, {
        ...opts,
        scenarioId: opts.scenarioId,
      });
      this.reportHtml = renderEngineeringReportHTML(this.reportModel, { fragment: true });
      this.reportStale = false;
      this.reportSourceRevision = this.document?.updatedAt || "unsaved";
    },

    regenerateReport() {
      this.generateReport();
    },

    printReport() {
      if (!this.reportModel) this.generateReport();
      const html = renderEngineeringReportHTML(this.reportModel);
      const w = window.open("", "_blank", "noopener,noreferrer");
      if (!w) return;
      w.document.write(html);
      w.document.close();
      w.focus();
      w.print();
    },

    exportReportHtml() {
      if (!this.reportModel) this.generateReport();
      const exp = exportEngineeringReportHTML(this.reportModel);
      if (!exp.ok) {
        this.ui.announce = exp.error;
        return;
      }
      this._download(exp.filename, exp.html, "text/html");
    },

    downloadPdf() {
      if (!this.project) {
        this.ui.announce = "Abra un proyecto para descargar el PDF.";
        return;
      }
      if (!this.document) this.document = createProjectDocument(this.project);
      this.document = updateDocumentFromWorkbench(this.document, this.project);
      const r = addSnapshot(this.document, { name: "PDF", note: "pdf-render" });
      this.document = r.document;
      this.document.lastPdfSnapshotId = r.snapshot.snapshotId;
      this._markDirty();
      const pdf = this._pdfFromDocument(this.document, r.snapshot.snapshotId);
      if (!pdf.ok) {
        this.ui.announce = pdf.error || "No se pudo generar el PDF.";
        return;
      }
      this._download(pdf.filename, pdf.bytes, "application/pdf");
      this.ui.announce = `PDF ${pdf.filename}`;
      this.saveNow();
    },

    downloadPdfFromSnapshot(snapshotId) {
      if (!this.document) return;
      const pdf = this._pdfFromDocument(this.document, snapshotId);
      if (!pdf.ok) {
        this.ui.announce = pdf.error || "No se pudo generar el PDF.";
        return;
      }
      this._download(pdf.filename, pdf.bytes, "application/pdf");
      this.ui.announce = `PDF ${pdf.filename}`;
    },

    async downloadListedProjectPdf(projectId) {
      if (!this.store) return;
      const loaded = await this.store.loadProject(projectId);
      if (!loaded?.ok || !loaded.document) {
        this.ui.announce = "No se pudo abrir el proyecto.";
        return;
      }
      const doc = loaded.document;
      let working = doc;
      if (!working.lastPdfSnapshotId || !(working.snapshots || []).some((s) => s.snapshotId === working.lastPdfSnapshotId)) {
        const r = addSnapshot(working, { name: "PDF", note: "pdf-render" });
        working = r.document;
        working.lastPdfSnapshotId = r.snapshot.snapshotId;
        if (this.store.saveProject) await this.store.saveProject(working);
      }
      const pdf = this._pdfFromDocument(working, working.lastPdfSnapshotId);
      if (!pdf.ok) {
        this.ui.announce = pdf.error || "No se pudo generar el PDF.";
        return;
      }
      this._download(pdf.filename, pdf.bytes, "application/pdf");
      this.ui.announce = `PDF ${pdf.filename}`;
    },

    _pdfFromDocument(doc, snapshotId) {
      const snap = (doc.snapshots || []).find((s) => s.snapshotId === snapshotId);
      const source = snap
        ? {
            ...doc,
            architecture: snap.payload.architecture,
            scenarios: snap.payload.scenarios,
            activeScenarioId: snap.payload.activeScenarioId,
            provenance: snap.payload.provenance || {},
            acceptedEvidence: snap.payload.acceptedEvidence || {},
            evidenceHistory: snap.payload.evidenceHistory || [],
            dismissedEvidence: snap.payload.dismissedEvidence || {},
            geospatial: snap.payload.geospatial,
            lastPdfSnapshotId: snapshotId,
          }
        : doc;
      const model = generateEngineeringReport(source, {
        reportMode: "detailed",
        includeEconomics: true,
        includeSacredView: true,
        includeValidation: true,
        includeProvenance: true,
        includeVerifiedSources: true,
        includeSite: true,
        language: "es",
        snapshotId,
        snapshotMeta: { snapshotId },
      });
      this.reportModel = model;
      return renderEngineeringReportPdf(model, { printedAt: nowIso() });
    },

    compareSnapshotReport() {
      const snaps = this.document?.snapshots || [];
      if (snaps.length < 2) {
        this.ui.announce = "Need two snapshots to compare.";
        return;
      }
      this.reportModel = generateRevisionComparisonReport(snaps[snaps.length - 2], snaps[snaps.length - 1], {
        projectName: this.title,
      });
      this.reportHtml = renderEngineeringReportHTML(this.reportModel, { fragment: true });
      this.ui.reportOpen = true;
    },

    async findVerified() {
      if (!this.project) return;
      if (this._evidenceAbort) this._evidenceAbort();
      const gen = (this._evidenceGen = (this._evidenceGen || 0) + 1);
      this.evidence.loading = true;
      this.evidence.error = null;
      this.ui.bottomTab = "evidence";
      this.ui.announce = "Looking up verified data…";
      const providers = createDefaultProviders({ bitcoin: { live: false } });
      try {
        const result = await findVerifiedData(this.project, { providers });
        if (gen !== this._evidenceGen) return;
        this._evidenceAbort = result.abort;
        this.evidence.candidates = result.candidates;
        this.evidence.conflicts = result.conflicts;
        this.evidence.unresolved = result.unresolved;
        this.evidence.coverage = result.coverage;
        this.evidence.intelligence = result.intelligence;
        this.evidence.research = result.research;
        this.evidence.providers = result.providers;
        if (this.evidenceStore && result.research) {
          this.evidenceStore.putResearch(result.research).catch(() => {});
        }
        this.ui.announce = `Verified data: ${result.evidence.length} candidate(s). Nothing was applied automatically.`;
      } catch (err) {
        this.evidence.error = "Verified data lookup failed. Existing project values are unchanged.";
        this.ui.announce = this.evidence.error;
      } finally {
        this.evidence.loading = false;
      }
    },

    acceptCandidate(parameter, evidenceId, options = {}) {
      if (!this.project) return;
      const list = this.evidence.candidates?.[parameter] || [];
      const row = list.find((c) => c.evidence?.evidenceId === evidenceId);
      if (!row?.evidence) return;
      const fresh = evaluateFreshness(row.evidence);
      if (fresh.status === "STALE" && options.acceptedStaleEvidence !== true) {
        this.ui.dialog = { kind: "stale-evidence", parameter, evidenceId };
        return;
      }
      if (this.document) {
        const snap = addSnapshot(this.document, { name: "Before accepting evidence", note: "automatic", automatic: true });
        this.document = snap.document;
      }
      this.project = enrichProject(this.project, {
        action: "accept",
        evidence: row.evidence,
        overrideUser: true,
        acceptedStaleEvidence: options.acceptedStaleEvidence === true,
      });
      const engines = enginesAffectedBy(parameter);
      this.evidence.coverage = calculateEvidenceCoverage(this.project, { conflicts: this.evidence.conflicts });
      this._refresh(false);
      this.ui.announce = `Accepted ${parameter}. Recalculated: ${engines.join(", ") || "none"}.`;
    },

    keepCandidate(parameter, evidenceId) {
      if (!this.project) return;
      const list = this.evidence.candidates?.[parameter] || [];
      const row = list.find((c) => c.evidence?.evidenceId === evidenceId);
      if (!row?.evidence) return;
      this.project = enrichProject(this.project, { action: "reject", evidence: row.evidence });
      this._markDirty();
      this.ui.announce = `Kept current ${parameter}. Evidence remains in cache.`;
    },

    async refreshBtc() {
      if (!this.project) return;
      this.evidence.btcLoading = true;
      try {
        const provider = createBitcoinProvider({ live: true });
        const currency = this.project.economics?.currency || "USD";
        const result = await provider.fetchEvidence({ parameter: "fiatPerBTC", currency });
        if (!result.ok || !result.evidence?.length) {
          this.ui.announce = result.error === "currency-mismatch" || /currency/i.test(result.error || "")
            ? "Currency conversion required."
            : "Bitcoin price unavailable. Manual price still works.";
          return;
        }
        this.evidence.candidates.fiatPerBTC = result.evidence.map((ev) => ({
          parameter: "fiatPerBTC",
          currentValue: this.project.economics?.fiatPerBTC ?? null,
          currentProvenance: this.project.provenance?.["economics.fiatPerBTC"] || "user-input",
          candidateValue: ev.normalizedValue,
          candidateUnit: ev.unit,
          evidence: ev,
          recommended: true,
          recommendationReason: "Manual Bitcoin refresh. Fast-changing. Not persisted as timeless current price.",
        }));
        this.ui.bottomTab = "evidence";
        this.ui.announce = `Bitcoin candidate ${result.evidence[0].normalizedValue} ${result.evidence[0].unit} at ${result.evidence[0].retrievedAt}. Accept to apply.`;
      } catch {
        this.ui.announce = "Bitcoin price unavailable. Manual price still works.";
      } finally {
        this.evidence.btcLoading = false;
      }
    },

    async checkEvidenceUpdates() {
      if (!this.project) return;
      const providers = createDefaultProviders({ bitcoin: { live: false } });
      const result = await findVerifiedData(this.project, { providers });
      this.evidence.updates = checkForEvidenceUpdates(this.project, result.evidence);
      this.ui.announce = "Update check complete. Values were not changed.";
    },

    openSources() {
      this.evidence.sources = listSources();
      this.ui.sourcesOpen = true;
    },

    evidenceFreshness(ev) {
      return evaluateFreshness(ev).status;
    },

    onEnrichmentFilter(key, value) {
      this.enrichment.filters[key] = value;
      this.ui.filters[key] = value;
      this.ui.explorerPage = 1;
      this.enrichment.revision += 1;
    },

    reenrichPilot() {
      if (this.enrichment.job?.status === JOB_STATUS.RUNNING) return;
      this.enrichment.loading = true;
      this.enrichment.error = null;
      this.ui.bottomTab = "enrichment";
      this.ui.announce = "Re-enriching the 8-architecture pilot…";
      try {
        const batch = runPilotEnrichmentBatch();
        this.enrichment.batch = batch;
        this.enrichment.job = getLastJob();
        this.enrichment.revision += 1;
        this.featured = featuredArchitectures(8).map(templateCardModel);
        const blocked = batch.records.filter((r) => r.enrichment_status === "blocked").length;
        const progress = atlasEnrichmentProgress();
        this.ui.announce = batch.gates.ok
          ? `Pilot batch ${batch.batch_id.slice(0, 8)}: ${batch.count} records. Atlas ${progress.label}. Templates unchanged.`
          : `Pilot batch completed with ${blocked} blocked record(s).`;
        persistEnrichmentBatch(batch, this.enrichment.job).catch(() => {});
      } catch (err) {
        this.enrichment.error = String(err?.message || err);
        this.ui.announce = this.enrichment.error;
      } finally {
        this.enrichment.loading = false;
      }
    },

    async runLote9to24() {
      if (this.enrichment.job?.status === JOB_STATUS.RUNNING) return;
      this.enrichment.loading = true;
      this.enrichment.error = null;
      this.ui.bottomTab = "enrichment";
      this.ui.announce = "Enriching lote 9–24…";
      this.enrichment.job = {
        status: JOB_STATUS.RUNNING,
        scope: "lote-9-24",
        progress: { done: 0, total: 16, chunk: 0 },
      };
      this.enrichment.revision += 1;
      try {
        const batch = await runLote9to24EnrichmentBatch({
          onProgress: (progress, job) => {
            this.enrichment.job = { ...job, progress };
            this.enrichment.revision += 1;
          },
        });
        this.enrichment.batch = batch;
        this.enrichment.job = batch.job || getLastJob();
        this.enrichment.revision += 1;
        this.featured = featuredArchitectures(8).map(templateCardModel);
        const progress = atlasEnrichmentProgress();
        if (batch.job?.status === JOB_STATUS.FAILED || !batch.gates.ok) {
          const missing = (batch.gates.missing_fields || [])
            .slice(0, 8)
            .map((m) => `${m.architecture_id}:${m.field}`)
            .join(", ");
          this.enrichment.error = batch.job?.error || batch.gates.failures.join(" | ");
          this.ui.announce = `Lote 9–24 failed. Coverage ${Math.round((batch.gates.coverage || 0) * 100)}%. Missing: ${missing || "see job"}. No half-writes.`;
        } else {
          this.ui.announce = `Lote 9–24 done. Atlas ${progress.label}. Gate ${Math.round((batch.gates.coverage || 0) * 100)}%. Next lote 25–48.`;
          persistEnrichmentBatch(batch, this.enrichment.job).catch(() => {});
        }
      } catch (err) {
        this.enrichment.job = getLastJob() || { status: JOB_STATUS.FAILED, error: String(err?.message || err) };
        this.enrichment.error = String(err?.message || err);
        this.ui.announce = this.enrichment.error;
        this.enrichment.revision += 1;
      } finally {
        this.enrichment.loading = false;
      }
    },

    async runLote25to48() {
      if (this.enrichment.job?.status === JOB_STATUS.RUNNING) return;
      this.enrichment.loading = true;
      this.enrichment.error = null;
      this.ui.bottomTab = "enrichment";
      this.ui.announce = "Enriching lote 25–48…";
      this.enrichment.job = {
        status: JOB_STATUS.RUNNING,
        scope: "lote-25-48",
        progress: { done: 0, total: 24, chunk: 0 },
      };
      this.enrichment.revision += 1;
      try {
        const batch = await runLote25to48EnrichmentBatch({
          onProgress: (progress, job) => {
            this.enrichment.job = { ...job, progress };
            this.enrichment.revision += 1;
          },
        });
        this.enrichment.batch = batch;
        this.enrichment.job = batch.job || getLastJob();
        this.enrichment.revision += 1;
        this.featured = featuredArchitectures(8).map(templateCardModel);
        const progress = atlasEnrichmentProgress();
        const blockedN = (batch.blocked_ids || []).length;
        const gatePct = Math.round((batch.gates.coverage || 0) * 100);
        if (batch.job?.status === JOB_STATUS.FAILED) {
          this.enrichment.error = batch.job?.error || (batch.gates.failures || []).join(" | ");
          this.ui.announce = `Lote 25–48 gate ${gatePct}%. Blocked ${blockedN} (lote continued). Atlas ${progress.label}.`;
        } else {
          this.ui.announce = `Lote 25–48 done. Atlas ${progress.label}. Gate ${gatePct}%. Blocked ${blockedN}. Next lote 49–end.`;
        }
        persistEnrichmentBatch(batch, this.enrichment.job).catch(() => {});
      } catch (err) {
        this.enrichment.job = getLastJob() || { status: JOB_STATUS.FAILED, error: String(err?.message || err) };
        this.enrichment.error = String(err?.message || err);
        this.ui.announce = this.enrichment.error;
        this.enrichment.revision += 1;
      } finally {
        this.enrichment.loading = false;
      }
    },

    async runLote49toEnd() {
      if (this.enrichment.job?.status === JOB_STATUS.RUNNING) return;
      this.enrichment.loading = true;
      this.enrichment.error = null;
      this.ui.bottomTab = "enrichment";
      this.ui.announce = "Enriching lote 49–end…";
      this.enrichment.job = {
        status: JOB_STATUS.RUNNING,
        scope: "lote-49-end",
        progress: { done: 0, total: 62, chunk: 0, sublote: 0, sublotes: 4 },
      };
      this.enrichment.revision += 1;
      try {
        const batch = await runLote49toEndEnrichmentBatch({
          onProgress: (progress, job) => {
            this.enrichment.job = { ...job, progress };
            this.enrichment.revision += 1;
          },
        });
        this.enrichment.batch = batch;
        this.enrichment.job = batch.job || getLastJob();
        this.enrichment.revision += 1;
        this.featured = featuredArchitectures(8).map(templateCardModel);
        const dash = atlasCoverageDashboard();
        const blockedN = (batch.blocked_ids || []).length;
        this.ui.announce = `Lote 49–end ${batch.job?.status}. Atlas ${dash.enriched}/${dash.total}. complete ${dash.complete} · partial ${dash.partial} · blocked ${blockedN}. Schema v1 frozen.`;
        persistEnrichmentBatch(batch, this.enrichment.job).catch(() => {});
      } catch (err) {
        this.enrichment.job = getLastJob() || { status: JOB_STATUS.FAILED, error: String(err?.message || err) };
        this.enrichment.error = String(err?.message || err);
        this.ui.announce = this.enrichment.error;
        this.enrichment.revision += 1;
      } finally {
        this.enrichment.loading = false;
      }
    },

    async runReenrichRegion(regionId) {
      if (this.enrichment.job?.status === JOB_STATUS.RUNNING) return;
      const rid = regionId || this.enrichment.regionId || "";
      if (!rid) {
        this.ui.announce = "Pick a region_id to re-enrich.";
        return;
      }
      this.enrichment.loading = true;
      this.ui.bottomTab = "enrichment";
      this.ui.announce = `Re-enriching region ${rid}…`;
      try {
        const batch = await reenrichRegion(rid, {
          onProgress: (progress, job) => {
            this.enrichment.job = { ...job, progress };
            this.enrichment.revision += 1;
          },
        });
        this.enrichment.batch = batch;
        this.enrichment.job = batch.job;
        this.enrichment.revision += 1;
        this.ui.announce = `Region ${rid} re-enriched (${batch.count}). Stale uses retrieved_at vs kind thresholds.`;
        persistEnrichmentBatch(batch, this.enrichment.job).catch(() => {});
      } catch (err) {
        this.enrichment.error = String(err?.message || err);
        this.ui.announce = this.enrichment.error;
      } finally {
        this.enrichment.loading = false;
      }
    },

    exportEnrichmentJSON() {
      const batch = this.enrichment.batch || getLastBatch();
      if (!batch) {
        this.ui.announce = "Run a batch first.";
        return;
      }
      const name =
        batch.scope === "lote-49-end"
          ? "sacred-architecture-enrichment-lote-49-end.json"
          : batch.scope === "lote-25-48"
            ? "sacred-architecture-enrichment-lote-25-48.json"
            : batch.scope === "lote-9-24"
              ? "sacred-architecture-enrichment-lote-9-24.json"
              : "sacred-architecture-enrichment-pilot.json";
      this._download(name, exportEnrichmentBatchJSON(batch));
    },

    exportAtlasJSON() {
      const exp = exportEnrichedAtlasJSON();
      if (!exp.ok) {
        this.ui.announce = `Atlas JSON blocked: privacy token (${exp.privacy_hits.join(", ")}).`;
        return;
      }
      this._download("sacred-architecture-enrichment-atlas.json", exp.json);
      this.ui.announce = `Exported ${exp.payload.records.length} enrichment records (JSON).`;
    },

    exportAtlasCSV() {
      const exp = exportEnrichedAtlasCSV();
      if (!exp.ok) {
        this.ui.announce = `Atlas CSV blocked: privacy token (${exp.privacy_hits.join(", ")}).`;
        return;
      }
      this._download("sacred-architecture-enrichment-atlas.csv", exp.csv);
      this.ui.announce = "Exported enrichment atlas CSV.";
    },

    get geoSites() {
      return this.project?.geospatial?.sites || [];
    },

    _geoState() {
      return this.project?.geospatial || emptyGeospatial();
    },

    get geoSelected() {
      const id = this.ui.geoSelectedId;
      return this.geoSites.find((s) => s.id === id) || null;
    },

    get geoSelectedEval() {
      const id = this.ui.geoSelectedId;
      return (id && this.geoEval.evaluations[id]) || null;
    },

    get geoWarnings() {
      return this.geoEval.warnings || [];
    },

    _geoMutate(result) {
      if (!result?.ok && !result?.geospatial) {
        this.ui.announce = result?.error || "Geospatial update failed.";
        return;
      }
      if (!result.ok) this.ui.announce = result.error || "Geospatial update failed.";
      this.project = { ...this.project, geospatial: result.geospatial };
      const ev = evaluateGeospatial(this.project.geospatial, this.project);
      this.geoEval = { evaluations: ev.evaluations, warnings: ev.warnings };
      this._markDirty();
      this._refreshGeoMap();
    },

    addGeoSiteFromDraft() {
      if (!this.project) return;
      const d = this.geoDraft;
      const r = addSite(this._geoState(), {
        name: d.name,
        lat: d.lat,
        lng: d.lng,
        region: d.region,
        comuna: d.comuna,
        country: d.country || this.project.country,
        altitudeM: d.altitudeM,
        landUse: d.landUse,
        owner: d.owner,
        notes: d.notes,
        status: d.status,
      });
      this._geoMutate(r);
      if (r.ok) {
        this.ui.geoSelectedId = r.site.id;
        this.geoDraft = emptyGeoDraft();
        this.ui.announce = `Site ${r.site.name} added.`;
      }
    },

    patchGeoSite(id, field, value) {
      const r = updateSite(this._geoState(), id, { [field]: value });
      this._geoMutate(r);
    },

    deleteGeoSite(id) {
      const r = removeSite(this._geoState(), id);
      r.ok = true;
      if (this.ui.geoSelectedId === id) this.ui.geoSelectedId = null;
      this._geoMutate(r);
    },

    activateGeoSite(id) {
      const r = setActiveSite(this._geoState(), id);
      r.ok = true;
      this.ui.geoSelectedId = id;
      this._geoMutate(r);
      this._refresh(false);
      this.ui.announce = "Active site set. Regional context uses this site. Electrical values unchanged.";
    },

    setGeoStatus(id, status) {
      const r = setSiteStatus(this._geoState(), id, status);
      this._geoMutate(r);
    },

    evaluateArchitectureAtSite(id) {
      if (!this.project) return;
      const r = setActiveSite(this._geoState(), id);
      const site = r.geospatial.sites.find((s) => s.id === id);
      const geo = {
        ...r.geospatial,
        evaluatedTemplateId: this.project.sourceTemplateId || null,
      };
      const next = { ...this.project, geospatial: geo };
      if (site?.country) next.country = site.country;
      if (site?.region) next.region = site.region;
      if (site?.comuna) next.subregion = site.comuna;
      if (site) {
        geo.sites = geo.sites.map((s) =>
          s.id === id ? { ...s, anchoredArchitectureId: next.sourceTemplateId || s.anchoredArchitectureId } : s
        );
      }
      this.project = next;
      this.ui.geoSelectedId = id;
      const ev = evaluateGeospatial(geo, this.project);
      this.geoEval = { evaluations: ev.evaluations, warnings: ev.warnings };
      this._refresh(false);
      this.ui.announce = "Architecture evaluated at this site (geographic context only).";
    },

    onGeoFile(ev) {
      const file = ev.target?.files?.[0];
      if (!file) return;
      const kind = /\.csv$/i.test(file.name) ? "csv" : "geojson";
      const reader = new FileReader();
      reader.onload = () => {
        const r = importIntoGeospatial(this._geoState(), String(reader.result || ""), kind);
        this._geoMutate(r);
        this.ui.announce = r.ok
          ? `Imported ${r.added?.length || 0} site(s). ${r.skipped?.length || 0} skipped.`
          : r.error || "Import failed.";
        if (this._geoMap) this._geoMap.fitSites(this.geoSites);
      };
      reader.readAsText(file);
      ev.target.value = "";
    },

    exportGeoJSON() {
      const json = JSON.stringify(sitesToGeoJSON(this.project.geospatial, this.project, this.geoEval.evaluations), null, 2);
      this._download("sacred-architecture-sites.geojson", json);
    },

    exportGeoCSV() {
      this._download("sacred-architecture-sites.csv", sitesToCSV(this.geoSites));
    },

    setGeoLayer(name, on) {
      this.ui.geoLayers = { ...this.ui.geoLayers, [name]: !!on };
      this._geoMap?.setLayers(this.ui.geoLayers);
    },

    addGeoNote(id, text) {
      const r = addSiteEvidence(this._geoState(), id, { kind: "note", note: text, title: "Note" });
      this._geoMutate(r);
    },

    linkAcceptedEvidenceToSite(id) {
      let geo = this._geoState();
      for (const rec of Object.values(this.project.acceptedEvidence || {})) {
        const site = geo.sites.find((s) => s.id === id);
        if (!site) break;
        const evidence = linkVerifiedToSite(site.evidence, rec);
        const u = updateSite(geo, id, { evidence });
        if (u.ok) geo = u.geospatial;
      }
      this._geoMutate({ ok: true, geospatial: geo });
    },

    _refreshGeoMap() {
      if (!this.project) return;
      const ev = evaluateGeospatial(this.project.geospatial || { sites: [] }, this.project);
      this.geoEval = { evaluations: ev.evaluations, warnings: ev.warnings };
      if (!this._geoMap) return;
      const popups = {};
      let report = this.reportModel;
      if (!report && this.project) {
        try {
          report = generateEngineeringReport(this.project, { reportMode: "summary", includeEconomics: false });
        } catch {
          report = null;
        }
      }
      const metrics = popupMetricsFromReport(report, this.project);
      for (const s of this.geoSites) {
        const e = ev.evaluations[s.id];
        popups[s.id] = [
          ...metrics.slice(0, 5),
          { label: "Site", value: s.name },
          { label: "Status", value: s.status },
          { label: "Evidence", value: `${e?.coverage?.percent ?? 0} %` },
          { label: "Grid", value: e?.proximity?.clase || EMPTY_WARNINGS.INCOMPLETE_GRID },
          { label: "Restrictions", value: e?.restrictions?.length ? e.restrictions.map((r) => r.name).join(", ") : EMPTY_WARNINGS.NO_RESTRICTIONS },
        ];
      }
      this._geoMap.setLayers(this.ui.geoLayers);
      this._geoMap.setData(this.project.geospatial, ev.evaluations, popups);
      if (this.ui.geoSelectedId) this._geoMap.setSelected(this.ui.geoSelectedId);
    },

    _setProject(project, baseline, options = {}) {
      this._hydrating = true;
      this.project = project;
      this.baseline = baseline;
      this.started = true;
      this.ui.startOpen = false;
      const keepEvidence = options.keepEvidence === true;
      if (!keepEvidence) {
        const debug = this.evidence?.debug === true;
        this.evidence = emptyEvidenceState();
        this.evidence.debug = debug;
      }
      if (options.keepId && this.document) {
        this.document = updateDocumentFromWorkbench(this.document, project);
      } else {
        this.document = createProjectDocument(project);
      }
      this._refresh(false);
      this._hydrating = false;
      this._dirty = true;
      this.saveStatus = this.persistenceAvailable ? SAVE_STATUS.UNSAVED : SAVE_STATUS.UNAVAILABLE;
    },

    _refresh(debounce = true) {
      const run = () => {
        this.derived = recompute(this.project);
        try {
          const next = getArchitectureGraph(this.project, this.derived);
          const sig = getTopologySignature(next);
          this.graph = next;
          this.graphError = null;
          this.graphSummary = textualArchitectureSummary(next);
          this.graphTree = architectureTree(next);
          this._topoSig = sig;
          const report = validateArchitectureGraph(next);
          if (!report.valid) {
            this.graphError = report.errors[0]?.message || "Architecture visualization unavailable.";
          }
        } catch (err) {
          this.graphError = "Architecture visualization unavailable.";
          this.graph = { nodes: [], edges: [], metadata: { notices: [{ message: String(err?.message || err) }] } };
        }
        this._renderSvg();
        if (this.ui.view === VIEW_MODES.MAP) this._refreshGeoMap();
        if (!this._hydrating && !this._silent && this.document) this._markDirty();
      };
      if (!debounce) {
        run();
        return;
      }
      if (this._timer) clearTimeout(this._timer);
      this._timer = setTimeout(run, 120);
    },

    _bindInteractions() {
      this._unbind.forEach((fn) => fn && fn());
      this._unbind = [];
      const handlers = {
        onNodeSelect: (id) => this.selectNode(id),
        onEdgeSelect: (id) => this.selectEdge(id),
        onBackground: () => {},
        onEscape: () => this.clearGraphSelection(),
      };
      if (this._svg.system) this._unbind.push(bindGraphInteractions(this._svg.system, handlers));
      if (this._svg.sacred) this._unbind.push(bindGraphInteractions(this._svg.sacred, handlers));
    },

    _observeResize(el) {
      if (typeof ResizeObserver === "undefined" || !el || !el.parentElement) return;
      if (this._ro) this._ro.disconnect();
      let frame = null;
      this._ro = new ResizeObserver(() => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => this._renderSvg());
      });
      this._ro.observe(el.parentElement);
    },

    _renderSvg() {
      if (typeof document === "undefined") return;
      const g = this.graph;
      const neighbors = this.ui.graphFocus && this.ui.selectedNodeId
        ? traceElectricalPath(g, this.ui.selectedNodeId).connected
        : null;
      const opts = {
        selectedId: this.ui.selectedNodeId,
        focusId: this.ui.graphFocus ? this.ui.selectedNodeId : null,
        focusNeighbors: neighbors,
        summary: this.graphSummary,
        decoration: this.ui.graphDecoration,
        sacredMode: this.ui.sacredMode,
        debug: this.ui.graphDebug,
      };
      try {
        if (this._svg.system) {
          const box = this._svg.system.getBoundingClientRect?.() || {};
          renderSystemView(this._svg.system, g, {
            ...opts,
            viewport: { width: box.width || 1000, height: box.height || 640 },
          });
        }
        if (this._svg.sacred) {
          const box = this._svg.sacred.getBoundingClientRect?.() || {};
          renderSacredView(this._svg.sacred, g, {
            ...opts,
            viewport: {
              width: box.width || 1000,
              height: box.height || 640,
              sacredMode: this.ui.sacredMode,
              decoration: this.ui.graphDecoration,
            },
          });
        }
      } catch (_err) {
        this.graphError = "Architecture visualization unavailable.";
      }
    },
  };

  return wb;
}

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function registerWorkbenchStore() {
  if (typeof window === "undefined" || !window.Alpine || typeof window.Alpine.store !== "function") {
    return false;
  }
  const existing = window.Alpine.store("workbench");
  if (existing && existing.__workbench) return true;
  const wb = createWorkbench();
  wb.__workbench = true;
  window.Alpine.store("workbench", wb);
  return true;
}

if (typeof document !== "undefined") {
  document.addEventListener("alpine:init", () => {
    registerWorkbenchStore();
  });
}

if (typeof window !== "undefined" && window.Alpine) registerWorkbenchStore();
