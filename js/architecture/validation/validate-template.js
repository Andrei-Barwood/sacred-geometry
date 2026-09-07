import { createIssueBag } from "./issues.js";
import { validateTemplateSchema } from "./validate-schema.js";
import { deriveScale, validateLoadProfile } from "./validate-load.js";
import { validateGeneration } from "./validate-generation.js";
import { validateBESS } from "./validate-bess.js";
import { validateSubstation } from "./validate-substation.js";
import { validateGrid } from "./validate-grid.js";
import { validateLoadState, validateTransientEvents } from "./validate-transients.js";
import { validateEnergy, validateSeasonalProfiles } from "./validate-energy.js";
import { validateEconomics } from "./validate-economics.js";
import { validateRegion } from "./validate-region.js";
import { validateProvenance } from "./validate-provenance.js";
import { validatePrivacy } from "./validate-privacy.js";
import { validateFeeders } from "./validate-feeders.js";
import { validateApplicationCompatibility } from "./validate-application.js";
import { calculateTemplateQualityScore } from "./score-template.js";

function deepFreezeCheck(before, after) {
  return before === after;
}

/**
 * Pure. Does not mutate template.
 * @param {object} template
 * @param {{ mode?: "fast"|"audit", validationProfile?: string }} [options]
 */
export function validateTemplate(template, options = {}) {
  const mode = options.mode || "audit";
  const issues = createIssueBag();
  const derived = {};
  const before = JSON.stringify(template);

  validateTemplateSchema(template, issues);
  if (mode === "fast" && issues.hasBlocking) {
    return finalize(template, issues, derived, before, options);
  }

  validateLoadProfile(template, issues, derived);
  derived.scaleClass = deriveScale(
    template.loadProfile && template.loadProfile.peakLoadMW,
    template.generation && template.generation.pv && template.generation.pv.acMW
  );
  validateGeneration(template, issues, derived);
  validateBESS(template, issues, derived);
  validateSubstation(template, issues, derived);
  validateGrid(template, issues, derived);
  validateTransientEvents(template, issues, derived);
  if (options.loadState) validateLoadState(options.loadState, issues);
  validateEnergy(template, issues, derived, options);
  validateSeasonalProfiles(template, issues);
  validateEconomics(template, issues, derived);
  validateRegion(template, issues);
  validateProvenance(template, issues);
  validatePrivacy(template, issues);
  validateFeeders(template, issues);
  validateApplicationCompatibility(template, issues);

  return finalize(template, issues, derived, before, options);
}

function finalize(template, issues, derived, before, options) {
  const snap = issues.snapshot();
  const scored = calculateTemplateQualityScore({
    errors: snap.errors,
    warnings: snap.warnings,
    notices: snap.notices,
    derived,
    template,
  });
  const after = JSON.stringify(template);
  if (!deepFreezeCheck(before, after)) {
    snap.errors.push({
      severity: "ERROR",
      code: "MUTATION",
      message: "validator mutated the template",
      category: "integrity",
      warningLevel: null,
    });
  }
  const high = snap.warnings.filter((w) => w.warningLevel === "HIGH").length;
  return {
    templateId: template && template.id,
    valid: snap.errors.length === 0,
    qualityScore: scored.score,
    scoreParts: scored.parts,
    scoreDisclaimer: scored.disclaimer,
    counts: {
      errors: snap.errors.length,
      warnings: snap.warnings.length,
      notices: snap.notices.length,
      assumptions: snap.assumptions.length,
      highWarnings: high,
    },
    errors: snap.errors,
    warnings: snap.warnings,
    notices: snap.notices,
    assumptions: snap.assumptions,
    derivedValues: derived,
    provenanceIssues: snap.provenanceIssues,
    mutated: before !== after,
    mode: options.mode || "audit",
  };
}
