import { VALIDATION_CONFIG } from "./validation-config.js";

const REQUIRED = [
  "id", "name", "family", "archetype", "country", "conceptual",
  "description", "environment", "grid", "loadProfile", "generation",
  "bess", "substation", "economics",
];

export function validateTemplateSchema(template, issues) {
  if (!template || typeof template !== "object") {
    issues.error("SCHEMA", "template is not an object", { category: "schema" });
    return;
  }
  for (const key of REQUIRED) {
    if (template[key] === undefined) {
      issues.error("MISSING_FIELD", `missing ${key}`, { category: "schema" });
    }
  }
  if (template.conceptual !== true) {
    issues.error("NOT_CONCEPTUAL", "conceptual must be true", { category: "schema" });
  }
  if (template.id && (/\s/.test(template.id) || !/^[\x21-\x7E]+$/.test(template.id))) {
    issues.error("ID_FORMAT", "id must be ASCII without spaces", { category: "schema" });
  }
  if (template.family && !VALIDATION_CONFIG.families.includes(template.family)) {
    issues.error("FAMILY", "unknown family", { category: "schema" });
  }
  if (!template.region && !template.regionId) {
    issues.error("REGION", "region or regionId required", { category: "schema" });
  }
  if (template.family === "H") {
    const load = template.loadProfile && template.loadProfile.peakLoadMW;
    const gen = template.generation && template.generation.enabled;
    const imp = template.grid && template.grid.importAllowed;
    if (!(load > 0)) {
      issues.error("MICROGRID_LOAD", "microgrid needs a load profile peak", { category: "schema" });
    }
    if (!gen && !imp && template.grid && template.grid.mode === "off-grid") {
      issues.error("MICROGRID_SOURCE", "microgrid needs generation or import strategy", { category: "schema" });
    }
  }
  if (!template.description || String(template.description).length < 20) {
    issues.warning("SHORT_DESC", "description is thin", { category: "schema", warningLevel: "LOW" });
  }
}
