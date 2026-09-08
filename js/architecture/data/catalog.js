/**
 * Curated, offline-first evidence catalog.
 * Country-level facts only. Templates are not modified.
 * GHI is never stored as specific yield. Voltage lists never set project.primaryKV.
 */

import { CHANGE_CLASS, GRANULARITY } from "./constants.js";
import { createEvidence } from "./evidence-model.js";

const RETRIEVED = "2026-09-03T00:00:00.000Z";

function ev(partial) {
  return createEvidence({
    retrievedAt: RETRIEVED,
    publishedAt: partial.publishedAt || "2024-01-01",
    status: "CACHED",
    providerId: "catalog",
    ...partial,
  });
}

function freq(country, hz, sourceId, sourceUrl, notes) {
  return ev({
    evidenceId: `EVD_${country}_FREQ_${hz}`,
    parameter: "frequencyHz",
    rawValue: `${hz} Hz`,
    normalizedValue: hz,
    unit: "Hz",
    sourceId,
    sourceUrl,
    sourceTitle: `${country} nominal system frequency`,
    geography: { country },
    granularity: GRANULARITY.COUNTRY,
    methodology: "Nominal interconnected-system frequency published by the national operator or grid code.",
    qualifiers: ["nominal", "interconnected-system"],
    changeClass: CHANGE_CLASS.STATIC,
    notes,
  });
}

function voltages(country, levels, sourceId, sourceUrl, notes) {
  return ev({
    evidenceId: `EVD_${country}_KV_LEVELS`,
    parameter: "nominalVoltageLevelsKV",
    rawValue: levels.map((v) => `${v} kV`).join(", "),
    normalizedValue: levels.slice(),
    unit: "kV",
    sourceId,
    sourceUrl,
    sourceTitle: `${country} voltage levels present on the operator network`,
    geography: { country },
    granularity: GRANULARITY.OPERATOR,
    methodology: "Voltage levels reported as used on the national transmission/distribution network. Existence is not a project connection voltage.",
    qualifiers: ["exists-on-network", "not-project-connection"],
    changeClass: CHANGE_CLASS.SLOW_CHANGING,
    notes,
  });
}

function operator(country, name, sourceId, sourceUrl) {
  return ev({
    evidenceId: `EVD_${country}_OPERATOR`,
    parameter: "gridOperator",
    rawValue: name,
    normalizedValue: name,
    unit: "name",
    sourceId,
    sourceUrl,
    geography: { country },
    granularity: GRANULARITY.COUNTRY,
    methodology: "National transmission or principal electricity operator.",
    changeClass: CHANGE_CLASS.SLOW_CHANGING,
  });
}

function ghi(country, kWhM2Year, sourceUrl) {
  return ev({
    evidenceId: `EVD_${country}_GHI_COUNTRY`,
    parameter: "ghiAnnual",
    rawValue: `${kWhM2Year} kWh/m²/year`,
    normalizedValue: kWhM2Year,
    unit: "kWh/m2/year",
    sourceId: "SRC_WORLD_BANK_GSA",
    sourceUrl: sourceUrl || "https://globalsolaratlas.info/",
    sourceTitle: "Global Solar Atlas country-level long-term GHI",
    geography: { country },
    granularity: GRANULARITY.COUNTRY,
    methodology: "Long-term average global horizontal irradiation from Global Solar Atlas (World Bank / ESMAP / Solargis), country-level summary. Not a site measurement. Not specific yield (kWh/kWp).",
    qualifiers: ["country-level", "long-term-average", "not-site", "not-specific-yield"],
    changeClass: CHANGE_CLASS.SLOW_CHANGING,
    notes: "Do not copy this value onto generation.pv.specificYieldKWhPerKWpYear.",
  });
}

function pvoutRef(country, kWhKwpYear, sourceUrl) {
  return ev({
    evidenceId: `EVD_${country}_PVOUT_REF`,
    parameter: "referencePvout",
    rawValue: `${kWhKwpYear} kWh/kWp/year`,
    normalizedValue: kWhKwpYear,
    unit: "kWh/kWp/year",
    sourceId: "SRC_WORLD_BANK_GSA",
    sourceUrl: sourceUrl || "https://globalsolaratlas.info/",
    sourceTitle: "Global Solar Atlas reference PVOUT",
    geography: { country },
    granularity: GRANULARITY.COUNTRY,
    methodology: "GSA practical photovoltaic potential (PVOUT) for a reference c-Si system at optimum fixed tilt with GSA default losses. Not a tracker/bifacial/project yield. Mounting belongs to the project.",
    qualifiers: ["reference-system", "fixed-tilt", "country-level", "not-project-yield"],
    changeClass: CHANGE_CLASS.SLOW_CHANGING,
    notes: "A verified solar resource does not imply fixed tilt, single-axis tracking, or bifacial modules.",
  });
}

function tariffRef(country, sourceId, sourceUrl, title) {
  return ev({
    evidenceId: `EVD_${country}_TARIFF_REF`,
    parameter: "tariffReference",
    rawValue: title,
    normalizedValue: title,
    unit: "reference",
    sourceId,
    sourceUrl,
    sourceTitle: title,
    geography: { country },
    granularity: GRANULARITY.COUNTRY,
    methodology: "Official regulator or operator tariff publication landing page. No numeric energy charge is claimed.",
    qualifiers: ["reference-only", "applicability-unknown"],
    changeClass: CHANGE_CLASS.PERIODIC,
    notes: "Tariff reference found, but applicability to this project is unknown.",
  });
}

const GSA = (cc) => `https://globalsolaratlas.info/download/${cc}`;

/**
 * Country GHI / PVOUT figures are rounded country-level long-term averages
 * from the public Global Solar Atlas dataset (retrieved 2026-09-03).
 * They are indicators, not site studies.
 */
export const CATALOG_EVIDENCE = Object.freeze([
  freq("MRT", 50, "SRC_SOMELEC_MRT", "https://www.somelec.mr/", "Nominal 50 Hz West African interconnection practice."),
  freq("DZA", 50, "SRC_SONELGAZ_DZA", "https://www.sonelgaz.dz/", "Nominal 50 Hz."),
  freq("EGY", 50, "SRC_EETC_EGY", "https://www.eetc.net.eg/", "Nominal 50 Hz."),
  freq("JOR", 50, "SRC_NEPCO_JOR", "https://www.nepco.com.jo/", "Nominal 50 Hz."),
  freq("SAU", 60, "SRC_NATIONAL_GRID_SA", "https://www.se.com.sa/", "Saudi interconnected system is 60 Hz. Do not apply 50 Hz corridor heuristics."),
  freq("OMN", 50, "SRC_NAMA_OMN", "https://www.nama.om/", "Nominal 50 Hz."),
  freq("AFG", 50, "SRC_DABS_AFG", "https://www.dabs.af/", "Nominal 50 Hz."),
  freq("PAK", 50, "SRC_NTDC_PAK", "https://www.ntdc.gov.pk/", "Nominal 50 Hz."),
  freq("IND", 50, "SRC_CEA_IND", "https://cea.nic.in/", "Indian Electricity Grid Code: nominal 50 Hz."),
  freq("BGD", 50, "SRC_BPDB_BGD", "https://www.bpdb.gov.bd/", "Nominal 50 Hz."),
  freq("THA", 50, "SRC_EGAT_THA", "https://www.egat.co.th/", "Nominal 50 Hz."),
  freq("KWT", 50, "SRC_MEW_KWT", "https://www.mew.gov.kw/", "Nominal 50 Hz."),
  freq("SDN", 50, "SRC_IEC_60038", "https://webstore.iec.ch/publication/181", "National 50 Hz operation; cited via IEC standard-voltage practice pending a denser operator extract."),

  voltages("MRT", [225, 90, 33, 15], "SRC_SOMELEC_MRT", "https://www.somelec.mr/", "Levels exist on the Mauritanian network. Not a project voltage."),
  voltages("DZA", [400, 220, 90, 60, 30], "SRC_SONELGAZ_DZA", "https://www.sonelgaz.dz/", "Levels exist on the Algerian network."),
  voltages("EGY", [500, 220, 132, 66, 33, 11], "SRC_EETC_EGY", "https://www.eetc.net.eg/", "Levels exist on the Egyptian transmission/distribution network. Siwa 33/11 kV is site-specific and is not stored here."),
  voltages("JOR", [400, 132, 33, 11], "SRC_NEPCO_JOR", "https://www.nepco.com.jo/", "Levels exist on the Jordanian network."),
  voltages("SAU", [380, 230, 132, 33, 13.8], "SRC_NATIONAL_GRID_SA", "https://www.se.com.sa/", "Levels exist on the Saudi network. 13.8 kV is typical of 60 Hz systems."),
  voltages("OMN", [400, 220, 132, 33, 11], "SRC_NAMA_OMN", "https://www.nama.om/", "Levels exist on the Omani network."),
  voltages("AFG", [220, 110, 20], "SRC_DABS_AFG", "https://www.dabs.af/", "Levels reported on the Afghan network. Incomplete."),
  voltages("PAK", [500, 220, 132, 11], "SRC_NTDC_PAK", "https://www.ntdc.gov.pk/", "Levels exist on the Pakistani network."),
  voltages("IND", [765, 400, 220, 132, 66, 33, 11], "SRC_CEA_IND", "https://cea.nic.in/", "Multiple levels exist. National list does not set project.primaryKV."),
  voltages("BGD", [400, 230, 132, 33, 11], "SRC_BPDB_BGD", "https://www.bpdb.gov.bd/", "33/11 kV is common in distribution. Still not a site connection voltage."),
  voltages("THA", [500, 230, 115, 69, 22], "SRC_EGAT_THA", "https://www.egat.co.th/", "Thai MV distribution commonly uses 22 kV, not 11 kV."),
  voltages("KWT", [400, 300, 132, 33, 11], "SRC_MEW_KWT", "https://www.mew.gov.kw/", "Levels exist on the Kuwaiti network."),

  operator("MRT", "SOMELEC", "SRC_SOMELEC_MRT", "https://www.somelec.mr/"),
  operator("DZA", "Sonelgaz", "SRC_SONELGAZ_DZA", "https://www.sonelgaz.dz/"),
  operator("EGY", "EETC", "SRC_EETC_EGY", "https://www.eetc.net.eg/"),
  operator("JOR", "NEPCO", "SRC_NEPCO_JOR", "https://www.nepco.com.jo/"),
  operator("SAU", "National Grid SA", "SRC_NATIONAL_GRID_SA", "https://www.se.com.sa/"),
  operator("OMN", "Nama / OETC", "SRC_NAMA_OMN", "https://www.nama.om/"),
  operator("AFG", "DABS", "SRC_DABS_AFG", "https://www.dabs.af/"),
  operator("PAK", "NTDC", "SRC_NTDC_PAK", "https://www.ntdc.gov.pk/"),
  operator("IND", "POWERGRID / STUs (CEA framework)", "SRC_CEA_IND", "https://cea.nic.in/"),
  operator("BGD", "BPDB / PGCB", "SRC_BPDB_BGD", "https://www.bpdb.gov.bd/"),
  operator("THA", "EGAT", "SRC_EGAT_THA", "https://www.egat.co.th/"),
  operator("KWT", "MEW", "SRC_MEW_KWT", "https://www.mew.gov.kw/"),

  ghi("MRT", 2300, GSA("mauritania")),
  ghi("DZA", 2050, GSA("algeria")),
  ghi("EGY", 2200, GSA("egypt")),
  ghi("JOR", 2100, GSA("jordan")),
  ghi("SAU", 2200, GSA("saudi-arabia")),
  ghi("OMN", 2250, GSA("oman")),
  ghi("AFG", 1900, GSA("afghanistan")),
  ghi("PAK", 1900, GSA("pakistan")),
  ghi("IND", 1850, GSA("india")),
  ghi("BGD", 1600, GSA("bangladesh")),
  ghi("THA", 1700, GSA("thailand")),
  ghi("KWT", 2100, GSA("kuwait")),
  ghi("SDN", 2150, GSA("sudan")),

  pvoutRef("MRT", 2000, GSA("mauritania")),
  pvoutRef("DZA", 1750, GSA("algeria")),
  pvoutRef("EGY", 1900, GSA("egypt")),
  pvoutRef("JOR", 1850, GSA("jordan")),
  pvoutRef("SAU", 1900, GSA("saudi-arabia")),
  pvoutRef("OMN", 1950, GSA("oman")),
  pvoutRef("AFG", 1650, GSA("afghanistan")),
  pvoutRef("PAK", 1600, GSA("pakistan")),
  pvoutRef("IND", 1550, GSA("india")),
  pvoutRef("BGD", 1400, GSA("bangladesh")),
  pvoutRef("THA", 1450, GSA("thailand")),
  pvoutRef("KWT", 1800, GSA("kuwait")),
  pvoutRef("SDN", 1850, GSA("sudan")),

  tariffRef("EGY", "SRC_EGYPTERA", "https://egyptera.org/", "EgyptERA tariff publications"),
  tariffRef("SAU", "SRC_ECRA_SAU", "https://www.wera.gov.sa/", "WERA electricity tariff publications"),
  tariffRef("OMN", "SRC_AER_OMN", "https://www.apsr.om/", "APSR electricity tariff publications"),
  tariffRef("IND", "SRC_CERC_IND", "https://cercind.gov.in/", "CERC / SERC tariff framework — no single national retail rate"),
  tariffRef("DZA", "SRC_CREG_DZA", "https://www.creg.dz/", "CREG tariff publications"),
]);

const BY_ID = new Map(CATALOG_EVIDENCE.map((e) => [e.evidenceId, e]));

export function getCatalogEvidence(id) {
  return BY_ID.get(id) || null;
}

export function queryCatalog(query = {}) {
  return CATALOG_EVIDENCE.filter((e) => {
    if (query.parameter && e.parameter !== query.parameter) {
      if (!(query.parameter === "fiatPerKWh" && e.parameter === "energyCharge")) return false;
    }
    if (query.country && e.geography?.country && e.geography.country !== query.country) return false;
    if (query.parameters && !query.parameters.includes(e.parameter)) return false;
    return true;
  }).map((e) => ({ ...e, geography: { ...e.geography }, qualifiers: [...(e.qualifiers || [])] }));
}

/** Site-scoped fixture. Must never match another Egyptian template. */
export function siwaFixtureEvidence() {
  return createEvidence({
    evidenceId: "EVD_SIWA_33_11",
    parameter: "primaryKV",
    rawValue: "33 kV",
    normalizedValue: 33,
    unit: "kV",
    sourceId: "SRC_SIWA_ARCHETYPE",
    sourceTitle: "Siwa oasis study fixture",
    retrievedAt: RETRIEVED,
    geography: { country: "EGY", site: "Siwa", coordinates: { lat: 29.2, lon: 25.52 } },
    granularity: GRANULARITY.SITE,
    methodology: "Internal site fixture. Not a national default.",
    notes: "Must not become EGYPT_DEFAULT.",
    providerId: "fixture",
  });
}

/** Bound to the 6 kW sample project context. Must not become a country default. */
export function loadStudy6kWTariffFixture() {
  return createEvidence({
    evidenceId: "EVD_6KW_TARIFF_FIXTURE",
    parameter: "energyCharge",
    rawValue: "fixture energy charge",
    normalizedValue: null,
    unit: "currency/kWh",
    sourceId: "SRC_LOAD_MODEL_6KW",
    sourceTitle: "6 kW load-study fixture",
    retrievedAt: RETRIEVED,
    geography: { site: "SAMPLE-6KW-LOAD-STUDY" },
    granularity: GRANULARITY.SITE,
    methodology: "Internal project-context fixture. Numeric tariff from the private study is not published.",
    qualifiers: ["project-context", "not-country-default"],
    notes: "Must not become CHILE_DEFAULT or GLOBAL_DEFAULT.",
    providerId: "fixture",
  });
}
