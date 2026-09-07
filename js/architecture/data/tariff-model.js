/**
 * Electricity tariff model. Country ≠ one tariff.
 * Only energyCharge (currency/kWh) feeds the existing BTC/kWh engine.
 */

import { TARIFF_CUSTOMER_CLASS, TARIFF_STATUS } from "./constants.js";

export function createTariff(partial = {}) {
  return {
    currency: partial.currency || null,
    customerClass: partial.customerClass || TARIFF_CUSTOMER_CLASS.UNKNOWN,
    voltageClass: partial.voltageClass || null,
    energyCharge: partial.energyCharge ?? null,
    demandCharge: partial.demandCharge ?? null,
    fixedCharge: partial.fixedCharge ?? null,
    taxes: partial.taxes ?? null,
    subsidies: partial.subsidies ?? null,
    timeOfUse: partial.timeOfUse || null,
    tier: partial.tier || null,
    effectiveFrom: partial.effectiveFrom || null,
    effectiveTo: partial.effectiveTo || null,
    sourceId: partial.sourceId || null,
    sourceUrl: partial.sourceUrl || null,
    notes: partial.notes || null,
  };
}

export function evaluateTariffUsability(tariff) {
  if (!tariff) return { status: TARIFF_STATUS.INCOMPLETE, usableEnergyCharge: null, reason: "missing tariff" };
  const tou = tariff.timeOfUse && (tariff.timeOfUse.peak != null || tariff.timeOfUse.offPeak != null);
  const tiered = Array.isArray(tariff.tier) && tariff.tier.length > 1;
  if (tou) {
    return {
      status: TARIFF_STATUS.REQUIRES_LOAD_PROFILE,
      usableEnergyCharge: null,
      reason: "Time-of-use tariff requires a load time profile. It is not flattened to a single rate.",
    };
  }
  if (tiered) {
    return {
      status: TARIFF_STATUS.REQUIRES_LOAD_PROFILE,
      usableEnergyCharge: null,
      reason: "Tiered tariff requires block calculation. A single scalar is not used.",
    };
  }
  if (tariff.energyCharge == null || !Number.isFinite(Number(tariff.energyCharge))) {
    return {
      status: TARIFF_STATUS.INCOMPLETE,
      usableEnergyCharge: null,
      reason: "No energy charge (currency/kWh) is available.",
    };
  }
  if (!tariff.customerClass || tariff.customerClass === TARIFF_CUSTOMER_CLASS.UNKNOWN) {
    return {
      status: TARIFF_STATUS.INCOMPLETE,
      usableEnergyCharge: null,
      reason: "Tariff reference found, but applicability to this project is unknown.",
    };
  }
  const extras = [];
  if (tariff.demandCharge != null) extras.push("demand charge is not converted to currency/kWh");
  if (tariff.fixedCharge != null) extras.push("fixed charge is not converted to currency/kWh");
  return {
    status: extras.length ? TARIFF_STATUS.STRUCTURED : TARIFF_STATUS.DIRECTLY_USABLE,
    usableEnergyCharge: Number(tariff.energyCharge),
    currency: tariff.currency,
    customerClass: tariff.customerClass,
    reason: extras.length ? extras.join("; ") : "Energy charge may be used in BTC/kWh = fiat/kWh / fiat/BTC.",
  };
}

export function tariffMatchesProject(tariff, project) {
  if (!tariff) return { ok: false, reason: "missing" };
  const app = String(project?.metadata?.application || project?.application || "").toLowerCase();
  const wanted = inferCustomerClass(app);
  if (tariff.customerClass && tariff.customerClass !== TARIFF_CUSTOMER_CLASS.UNKNOWN && wanted && tariff.customerClass !== wanted) {
    return { ok: false, reason: "customer-class-mismatch", wanted, got: tariff.customerClass };
  }
  return { ok: true, reason: null, wanted, got: tariff.customerClass };
}

export function inferCustomerClass(application) {
  const a = String(application || "").toLowerCase();
  if (/industrial|mining|desalination|collector|bulk/.test(a)) return TARIFF_CUSTOMER_CLASS.INDUSTRIAL;
  if (/agriculture|water-pumping/.test(a)) return TARIFF_CUSTOMER_CLASS.AGRICULTURAL;
  if (/urban-distribution|residential/.test(a)) return TARIFF_CUSTOMER_CLASS.RESIDENTIAL;
  if (/airport|port|logistics|telecom/.test(a)) return TARIFF_CUSTOMER_CLASS.COMMERCIAL;
  return null;
}
