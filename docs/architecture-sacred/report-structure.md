# Report structure

All modes share `EngineeringReportModel`. Sections are omitted when empty and then numbered.

## SUMMARY

Header · executive summary · architecture (incl. SYSTEM diagram) · electrical table · validation errors / HIGH warnings · assumptions · disclaimer.

## STANDARD

SUMMARY plus loads (detailed or aggregated), generation (active tech only), BESS, substation (N-1 table if declared), grid, energy, economics if tariff, site if present, full validation.

## DETAILED

STANDARD plus TOC, transients, seasonal loads, feeders, scenarios, provenance, formula appendix (used methods only), studies-not-performed matrix, optional SACRED diagram.

## Revision comparison

`generateRevisionComparisonReport(snapshotA, snapshotB)` uses `compareSnapshots()` input diffs only.
