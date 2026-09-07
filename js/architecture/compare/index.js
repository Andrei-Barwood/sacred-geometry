export {
  COMPARISON_FIELDS,
  COMPARISON_GROUPS,
  COMPARISON_THRESHOLD_DEFAULT,
  ENGINE_SENSITIVE,
  ENTITY_KINDS,
  NA,
  NOT_COMPARABLE,
  fieldById,
} from "./fields.js";
export { projectEntity, emptySlot, formatViewValue } from "./project.js";
export {
  buildComparison,
  numericDelta,
  highlightDelta,
  formatDeltaCell,
  comparisonToCsv,
  comparisonPrintModel,
} from "./table.js";
export {
  emptyComparison,
  normalizeSlot,
  listComparisons,
  saveComparison,
  deleteComparison,
  getComparison,
} from "./store.js";
