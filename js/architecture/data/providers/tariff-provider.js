import { createProvider } from "./interface.js";
import { queryCatalog } from "../catalog.js";
import { validateEvidence } from "../evidence-validation.js";
import { inferCustomerClass } from "../tariff-model.js";

export function createTariffProvider() {
  return createProvider({
    id: "tariff",
    name: "Tariff reference provider",
    parameters: ["tariffReference", "energyCharge", "fiatPerKWh", "demandCharge", "fixedCharge"],
    requiresNetwork: false,
    fetchEvidence(query) {
      if (query.parameter === "demandCharge" || query.parameter === "fixedCharge") return [];
      if (query.parameter === "energyCharge" || query.parameter === "fiatPerKWh") return [];
      return queryCatalog({ country: query.country, parameter: "tariffReference" }).map((e) => {
        const wanted = inferCustomerClass(query.application);
        return {
          ...e,
          qualifiers: [...(e.qualifiers || []), wanted || "unknown"].filter(Boolean),
          notes: wanted
            ? `Official tariff reference. Applicability to ${wanted} class is not confirmed from this landing page.`
            : e.notes,
        };
      });
    },
    normalize(item) {
      return { ...item, providerId: "tariff" };
    },
    validate: validateEvidence,
  });
}
