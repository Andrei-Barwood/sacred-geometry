import { VALIDATION_CONFIG } from "./validation-config.js";

export function validateProvenance(template, issues) {
  const allowed = VALIDATION_CONFIG.provenances;
  const walk = (obj, path) => {
    if (!obj || typeof obj !== "object") return;
    if (obj.provenance) {
      if (!allowed.includes(obj.provenance)) {
        issues.error("BAD_PROVENANCE", `${path}: unknown provenance ${obj.provenance}`, {
          category: "provenance",
          provenance: true,
        });
      }
      if ((obj.provenance === "verified" || obj.provenance === "verified-external") && !obj.sourceId && !obj.evidenceId) {
        issues.error("VERIFIED_NO_SOURCE", `${path}: verified without sourceId`, {
          category: "provenance",
          provenance: true,
        });
      }
      if (obj.provenance === "source-derived" && !obj.sourceId) {
        issues.warning("SOURCE_NO_ID", `${path}: source-derived without sourceId`, {
          category: "provenance",
          warningLevel: "LOW",
          provenance: true,
        });
      }
      if (obj.provenance === "calculated" && !obj.formula && !obj.fn) {
        issues.notice("CALC_NO_FORMULA", `${path}: calculated without formula label`, {
          category: "provenance",
          provenance: true,
        });
      }
      if (obj.provenance === "future-site-study" && obj.value == null) {
        issues.notice("SITE_STUDY", `${path} pending site study (null is valid)`, {
          category: "provenance",
          provenance: true,
        });
      }
    }
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === "object") walk(v, `${path}.${k}`);
    }
  };
  walk(template, "template");

  const pv = template.generation && template.generation.pv;
  if (pv && pv.resourceProvenance === "future-site-study" && pv.specificYieldKWhPerKWpYear == null) {
    issues.notice("YIELD_SITE_STUDY", "Specific yield is intentionally pending site study.", {
      category: "provenance",
      provenance: true,
    });
  }
  if ((template.assumptions || []).length) {
    issues.assumption("ARCHETYPE_LOAD", "Load profile is an engineering archetype rather than measured demand.", {
      category: "provenance",
    });
  }
}
