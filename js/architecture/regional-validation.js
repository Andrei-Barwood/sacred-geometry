import { COUNTRY_TO_REGION, REGIONAL_PROFILES } from "./regional-profiles.js";

const FORBIDDEN = [
  /snocomm/i,
  /autocad/i,
  /\.dwg\b/i,
  /\/users\//i,
  /andreibarwood/i,
  /saesa/i,
  /calama/i,
  /parinacota/i,
];

const REGULATORY = [
  /national standard/i,
  /requires \d+\/\d+ kV/i,
  /\bis certified\b/i,
  /\bis approved\b/i,
  /\bis compliant with\b/i,
];

export function validateRegionalization(template) {
  const errors = [];
  const warnings = [];
  if (!template) {
    return { ok: false, errors: [{ code: "EMPTY", message: "missing" }], warnings };
  }
  if (template.conceptual !== true) errors.push({ code: "CONCEPTUAL", message: "must be conceptual" });
  if (!template.country) errors.push({ code: "COUNTRY", message: "country missing" });
  if (!template.regionId && !template.region) errors.push({ code: "REGION", message: "region missing" });
  const rid = template.regionId || COUNTRY_TO_REGION[template.country];
  if (rid && COUNTRY_TO_REGION[template.country] !== rid) {
    errors.push({ code: "COUNTRY_REGION", message: `${template.country} is not in ${rid}` });
  }
  if (rid && REGIONAL_PROFILES[rid] && !REGIONAL_PROFILES[rid].countries.includes(template.country)) {
    errors.push({ code: "COUNTRY_REGION", message: "country not listed in regional profile" });
  }
  if (!template.application) errors.push({ code: "APPLICATION", message: "application missing" });
  const sub = `${template.subregion || ""}`;
  if (/\d+\.\d{3,}/.test(sub) || /latitude|longitude/i.test(sub)) {
    errors.push({ code: "COORDS", message: "subregion looks like coordinates" });
  }
  if (template.coordinates) {
    errors.push({ code: "COORDS", message: "unsourced coordinates" });
  }
  const score = template.regionalization && template.regionalization.regionalFitScore;
  if (score == null || score < 0 || score > 100) {
    errors.push({ code: "FIT", message: "regionalFitScore out of 0–100" });
  }
  if (template.economics && template.economics.btcPerKWh != null) {
    errors.push({ code: "TARIFF", message: "btcPerKWh must be null" });
  }
  const blob = JSON.stringify(template);
  for (const re of FORBIDDEN) {
    if (re.test(blob)) errors.push({ code: "PRIVACY", message: String(re) });
  }
  if (/\/users\//i.test(blob)) errors.push({ code: "PATH", message: "private path" });
  for (const re of REGULATORY) {
    if (re.test(template.description || "") || re.test(template.name || "")) {
      errors.push({ code: "REGULATORY", message: "sounds like a national-standard claim" });
    }
  }
  if (template.frequencyHz != null && template.frequencyProvenance === "nationalStandard") {
    errors.push({ code: "FREQUENCY", message: "frequency marked as national standard" });
  }
  return { ok: errors.length === 0, errors, warnings };
}
