import { VALIDATION_CONFIG } from "./validation-config.js";

/**
 * Consistency/completeness only. Not engineering approval.
 */
export function calculateTemplateQualityScore({ errors, warnings, notices, derived, template }) {
  const w = VALIDATION_CONFIG.scoring;
  let schema = w.schema;
  let mathematics = w.mathematics;
  let electrical = w.electrical;
  let regional = w.regional;
  let provenance = w.provenance;
  let diversity = template.diversityContribution != null
    ? (w.diversity * template.diversityContribution) / 100
    : w.diversity * 0.7;

  const byCat = (list, cat) => list.filter((i) => i.category === cat).length;
  schema -= Math.min(schema, byCat(errors, "schema") * 8);
  mathematics -= Math.min(mathematics, (byCat(errors, "load") + byCat(errors, "energy") + byCat(errors, "bess")) * 8);
  electrical -= Math.min(electrical, (byCat(errors, "substation") + byCat(errors, "generation") + byCat(errors, "grid")) * 7);
  regional -= Math.min(regional, byCat(errors, "region") * 7);
  provenance -= Math.min(provenance, byCat(errors, "provenance") * 5);

  const high = warnings.filter((x) => x.warningLevel === "HIGH").length;
  const med = warnings.filter((x) => x.warningLevel === "MEDIUM").length;
  const low = warnings.filter((x) => x.warningLevel === "LOW").length;

  let total = schema + mathematics + electrical + regional + provenance + diversity;
  total -= errors.length * w.errorPenalty;
  total -= high * w.highPenalty;
  total -= med * w.mediumPenalty;
  total -= low * w.lowPenalty;
  if (notices.some((n) => n.code === "YIELD_PENDING" || n.code === "YIELD_SITE_STUDY")) {
    total += 1;
  }
  total = Math.max(0, Math.min(100, Math.round(total)));
  return {
    score: total,
    parts: { schema, mathematics, electrical, regional, provenance, diversity },
    disclaimer: "Quality score is dataset consistency, not certification or code compliance.",
  };
}
