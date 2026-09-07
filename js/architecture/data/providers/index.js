import { createGridProvider } from "./grid-provider.js";
import { createSolarProvider } from "./solar-provider.js";
import { createClimateProvider } from "./climate-provider.js";
import { createTariffProvider } from "./tariff-provider.js";
import { createBitcoinProvider } from "./bitcoin-provider.js";

export function createDefaultProviders(options = {}) {
  return [
    createGridProvider(),
    createSolarProvider(),
    createClimateProvider(),
    createTariffProvider(),
    createBitcoinProvider(options.bitcoin || { live: false }),
  ];
}

export function getProviderStatus(providers) {
  return (providers || []).map((p) => p.getStatus());
}

export {
  createGridProvider,
  createSolarProvider,
  createClimateProvider,
  createTariffProvider,
  createBitcoinProvider,
};
