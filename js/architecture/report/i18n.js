/** Report copy. Technical terms (BESS, PV, MWp, MVA, N-1) stay untranslated. */

export const REPORT_GENERATOR_VERSION = "1.0.0";

const EN = {
  title: "ARQUITECTURA SAGRADA",
  subtitle: "Technical Architecture Report",
  statusDraft: "DRAFT",
  statusConceptual: "CONCEPTUAL",
  statusReview: "REVIEW",
  unsaved: "Generated from unsaved working state",
  historical: "Historical Snapshot",
  recalculated: "Historical project state recalculated with the current engine.",
  stale: "Project changed since this report was generated.",
  errorsBanner: "PROJECT CONTAINS VALIDATION ERRORS",
  exec: "Executive summary",
  architecture: "System architecture",
  electrical: "Electrical summary",
  loads: "Load analysis",
  transients: "Transient events",
  generation: "Generation",
  storage: "Energy storage",
  substation: "Substation / transformation",
  grid: "Grid interface",
  feeders: "Feeders",
  energy: "Energy",
  economics: "Energy cost — Bitcoin",
  scenarios: "Operating scenarios",
  site: "Site / regional context",
  validation: "Validation",
  assumptions: "Assumptions & limitations",
  provenance: "Data provenance",
  verifiedSources: "Verified data sources",
  evidenceCoverage: "Data evidence coverage",
  dataReview: "Data review notes",
  appendixFormulas: "Appendix A — Calculation methods",
  appendixLimits: "Appendix B — Studies not performed",
  review: "Project validation summary",
  toc: "Table of contents",
  systemCaption: "Conceptual electrical architecture generated from project topology.",
  sacredCaption: "Geometric representation of the same electrical topology.",
  sacredNote: "Visualization, not an electrical drawing.",
  overlap: "Load categories may overlap and are not necessarily additive.",
  transientNote:
    "Transient starting values are evaluated separately from normal energy-consumption calculations.",
  voltageDrop:
    "Detailed voltage-drop calculation was not performed because conductor and impedance data are not available.",
  pendingYield: "Pending site study.",
  noTariff: "No energy tariff has been provided.",
  noDispatch: "Annual dispatch balance not available.",
  coverageNote: "Energy coverage ratio does not replace hourly dispatch simulation.",
  scoreNote:
    "Quality Score evaluates internal consistency and completeness. It is not a certification or regulatory compliance score.",
  siteNote:
    "Regional parameters describe the conceptual scenario and do not constitute verification of local regulations or site conditions.",
  n1Within: "Peak load is within the calculated N-1 capacity.",
  n1Outside: "Peak load exceeds the calculated N-1 capacity.",
  weakGrid: "This project scenario is modeled as a weak-grid connection.",
  conceptualCapacity: "Values are conceptual capacity, not guaranteed rated design capacity.",
  disclaimer:
    "This report describes a conceptual electrical architecture generated from the project data available in Sacred Architecture. It does not replace site-specific engineering, local grid-code review, protection coordination, short-circuit studies, grounding studies, structural design, environmental permitting or construction drawings.",
  preparedBy: "Prepared by",
  activeScenario: "ACTIVE SCENARIO",
  stored: "Stored",
  calculated: "Calculated",
  pending: "Pending",
  na: "—",
  notAvailable: "Not available",
  performed: "Performed",
  notPerformed: "Not performed",
  sitePending: "Pending",
};

const ES = {
  ...EN,
  subtitle: "Informe técnico de arquitectura",
  unsaved: "Generado desde el estado de trabajo no guardado",
  historical: "Instantánea histórica",
  recalculated: "Estado histórico recalculado con el motor actual.",
  stale: "El proyecto cambió desde que se generó este informe.",
  errorsBanner: "EL PROYECTO CONTIENE ERRORES DE VALIDACIÓN",
  exec: "Resumen ejecutivo",
  architecture: "Arquitectura del sistema",
  electrical: "Resumen eléctrico",
  loads: "Análisis de cargas",
  transients: "Eventos transitorios",
  generation: "Generación",
  storage: "Almacenamiento de energía",
  substation: "Subestación / transformación",
  grid: "Interfaz de red",
  feeders: "Alimentadores",
  energy: "Energía",
  economics: "Coste energético — Bitcoin",
  scenarios: "Escenarios de operación",
  site: "Sitio / contexto regional",
  validation: "Validación",
  assumptions: "Supuestos y limitaciones",
  provenance: "Procedencia de datos",
  verifiedSources: "Fuentes de datos verificados",
  evidenceCoverage: "Cobertura de evidencia",
  dataReview: "Notas de revisión de datos",
  appendixFormulas: "Apéndice A — Métodos de cálculo",
  appendixLimits: "Apéndice B — Estudios no realizados",
  review: "Resumen de validación del proyecto",
  toc: "Índice",
  systemCaption: "Arquitectura eléctrica conceptual generada desde la topología del proyecto.",
  sacredCaption: "Representación geométrica de la misma topología eléctrica.",
  sacredNote: "Visualización, no un plano eléctrico.",
  overlap: "Las categorías de carga pueden solaparse y no son necesariamente aditivas.",
  transientNote:
    "Los arranques transitorios se evalúan aparte de los cálculos de energía mensual.",
  voltageDrop:
    "No se calculó caída de tensión detallada porque no hay datos de conductor e impedancia.",
  pendingYield: "Pendiente de estudio de sitio.",
  noTariff: "No se ha indicado tarifa energética.",
  noDispatch: "Balance anual de despacho no disponible.",
  coverageNote: "El ratio de cobertura no sustituye una simulación horaria.",
  scoreNote:
    "Quality Score evalúa consistencia interna y completitud. No es certificación ni cumplimiento normativo.",
  siteNote:
    "Los parámetros regionales describen el escenario conceptual y no verifican normativa local ni condiciones de sitio.",
  n1Within: "La punta de carga está dentro de la capacidad N-1 calculada.",
  n1Outside: "La punta de carga supera la capacidad N-1 calculada.",
  weakGrid: "Este escenario de proyecto se modela como conexión weak-grid.",
  conceptualCapacity: "Las magnitudes son capacidad conceptual, no capacidad de diseño garantizada.",
  disclaimer:
    "Este informe describe una arquitectura eléctrica conceptual a partir de los datos disponibles en Arquitectura Sagrada. No sustituye ingeniería de sitio, revisión de código de red, coordinación de protecciones, estudios de cortocircuito, puesta a tierra, diseño estructural, permisos ambientales ni planos de construcción.",
  preparedBy: "Preparado por",
  stored: "Almacenado",
  calculated: "Calculado",
  pending: "Pendiente",
  notAvailable: "No disponible",
  performed: "Realizado",
  notPerformed: "No realizado",
  sitePending: "Pendiente",
};

export function t(lang, key) {
  const pack = lang === "es" ? ES : EN;
  return pack[key] || EN[key] || key;
}

export function reportStatusLabel(status, lang) {
  if (status === "review") return t(lang, "statusReview");
  if (status === "concept" || status === "conceptual") return t(lang, "statusConceptual");
  return t(lang, "statusDraft");
}
