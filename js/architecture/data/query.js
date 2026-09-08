/**
 * Minimal provider queries. No project notes, names, paths, or coordinates
 * unless the caller explicitly includes them for a provider that needs them.
 */

import { inferCustomerClass } from "./tariff-model.js";

export function buildProviderQuery(project, parameter, extras = {}) {
  const country = project?.country || project?.architecture?.country || null;
  const region = project?.region || project?.architecture?.region || null;
  const subregion = project?.subregion || project?.architecture?.subregion || null;
  const application = project?.metadata?.application || project?.application || null;
  const query = {
    parameter,
    country,
    region,
    subregion,
    date: extras.date || null,
  };
  if (parameter === "energyCharge" || parameter === "fiatPerKWh" || parameter === "tariffReference") {
    query.customerClass = extras.customerClass || inferCustomerClass(application);
    query.application = application;
    query.voltageClass = extras.voltageClass || null;
  }
  if (parameter === "btcPrice" || parameter === "fiatPerBTC") {
    query.currency = extras.currency || project?.economics?.currency || "USD";
  }
  if (extras.includeCoordinates === true && extras.coordinates) {
    query.coordinates = extras.coordinates;
  }
  if (extras.signal) query.signal = extras.signal;
  return query;
}

export function queryTouchesCoordinates(query) {
  return !!(query && query.coordinates);
}
