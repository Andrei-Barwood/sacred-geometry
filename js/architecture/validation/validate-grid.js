import { VALIDATION_CONFIG } from "./validation-config.js";
import { isPositive } from "./helpers.js";

function hasEnergySource(template) {
  const gen = template.generation || {};
  const pv = gen.pv && isPositive(gen.pv.dcMWp);
  const wind = gen.wind && isPositive(gen.wind.ratedMW);
  const diesel = gen.diesel && isPositive(gen.diesel.ratedMW);
  return !!(pv || wind || diesel);
}

export function validateGrid(template, issues, derived) {
  const grid = template.grid;
  if (!grid) {
    issues.error("NO_GRID", "grid missing", { category: "grid" });
    return;
  }
  if (grid.mode && !VALIDATION_CONFIG.gridModes.includes(grid.mode)) {
    issues.error("GRID_MODE", `unknown grid.mode ${grid.mode}`, { category: "grid" });
  }

  if (grid.mode === "off-grid") {
    if (!hasEnergySource(template)) {
      issues.error("OFFGRID_NO_SOURCE", "off-grid without PV, wind or diesel (BESS alone is not a source)", {
        category: "grid",
      });
    }
    const genMWh = derived.annualEnergyMWh;
    const peak = template.loadProfile && template.loadProfile.peakLoadMW;
    const lf = template.loadProfile && template.loadProfile.loadFactor;
    if (isPositive(genMWh) && isPositive(peak) && isPositive(lf)) {
      const loadMWh = peak * lf * 8760;
      derived.energyCoverageRatio = genMWh / loadMWh;
      if (derived.energyCoverageRatio < VALIDATION_CONFIG.warnings.coverageLow) {
        issues.warning("OFFGRID_COVERAGE", "off-grid annual generation << load (no dispatch model)", {
          category: "grid",
          warningLevel: "HIGH",
        });
      }
    }
  }

  if (grid.strength === "weak") {
    const bess = template.bess && template.bess.enabled;
    const diesel = template.generation && template.generation.diesel && isPositive(template.generation.diesel.ratedMW);
    const gfm = template.bess && Array.isArray(template.bess.purpose) && template.bess.purpose.includes("grid-forming");
    const island = grid.mode === "islandable" || grid.mode === "off-grid";
    if (!bess && !diesel && !gfm && !island) {
      issues.warning("WEAK_NO_STRATEGY", "weak-grid without BESS, diesel, islanding or grid-forming", {
        category: "grid",
        warningLevel: "HIGH",
      });
    } else if (bess && !gfm && !diesel) {
      issues.warning("WEAK_NO_GFM", "weak-grid BESS without grid-forming purpose", {
        category: "grid",
        warningLevel: "MEDIUM",
      });
    }
  }
}
