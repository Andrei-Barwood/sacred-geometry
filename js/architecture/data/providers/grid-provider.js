import { createProvider } from "./interface.js";
import { queryCatalog } from "../catalog.js";
import { validateEvidence } from "../evidence-validation.js";

const GRID_PARAMS = ["frequencyHz", "nominalVoltageLevelsKV", "gridOperator", "gridCodeReference"];

export function createGridProvider() {
  return createProvider({
    id: "grid",
    name: "Grid catalog provider",
    parameters: GRID_PARAMS,
    requiresNetwork: false,
    fetchEvidence(query) {
      const parameters = query.parameter ? [query.parameter] : GRID_PARAMS;
      return queryCatalog({ country: query.country, parameters });
    },
    normalize(item) {
      return { ...item, providerId: "grid" };
    },
    validate: validateEvidence,
  });
}
