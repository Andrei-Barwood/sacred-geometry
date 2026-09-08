import { createProvider } from "./interface.js";
import { queryCatalog } from "../catalog.js";
import { validateEvidence } from "../evidence-validation.js";

const SOLAR_PARAMS = ["ghiAnnual", "ghi", "dni", "dhi", "gti", "referencePvout"];

export function createSolarProvider() {
  return createProvider({
    id: "solar",
    name: "Solar catalog provider (Global Solar Atlas)",
    parameters: SOLAR_PARAMS,
    requiresCoordinates: false,
    requiresNetwork: false,
    fetchEvidence(query) {
      if (query.parameter === "specificYield") return [];
      const parameters = query.parameter ? [query.parameter] : ["ghiAnnual", "referencePvout"];
      return queryCatalog({ country: query.country, parameters });
    },
    normalize(item) {
      return { ...item, providerId: "solar" };
    },
    validate: validateEvidence,
  });
}
