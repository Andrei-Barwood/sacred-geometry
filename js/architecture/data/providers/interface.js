/**
 * Common provider contract. Providers return Evidence[] and never mutate projects.
 */

import { PROVIDER_STATUS } from "../constants.js";
import { validateEvidence } from "../evidence-validation.js";

export function createProvider(def) {
  const state = { lastStatus: PROVIDER_STATUS.AVAILABLE, lastError: null, lastRetrievedAt: null };

  return {
    id: def.id,
    name: def.name,
    parameters: def.parameters || [],
    requiresCoordinates: def.requiresCoordinates === true,
    requiresNetwork: def.requiresNetwork === true,
    isAvailable() {
      if (typeof def.isAvailable === "function") return def.isAvailable();
      return true;
    },
    supports(query) {
      if (typeof def.supports === "function") return def.supports(query);
      if (!query?.parameter) return true;
      return this.parameters.includes(query.parameter);
    },
    async fetchEvidence(query) {
      try {
        const raw = await def.fetchEvidence(query || {});
        const list = Array.isArray(raw) ? raw : raw?.evidence || [];
        const normalized = list.map((item) => def.normalize(item, query));
        const valid = [];
        for (const ev of normalized) {
          const v = this.validate(ev);
          if (v.ok) valid.push(ev);
        }
        state.lastStatus = valid.length ? PROVIDER_STATUS.AVAILABLE : PROVIDER_STATUS.NO_DATA;
        state.lastError = null;
        state.lastRetrievedAt = new Date().toISOString();
        return { ok: true, status: state.lastStatus, evidence: valid, error: null };
      } catch (err) {
        const msg = String(err?.message || err);
        let status = PROVIDER_STATUS.ERROR;
        if (/offline|network/i.test(msg)) status = PROVIDER_STATUS.OFFLINE;
        if (/rate/i.test(msg)) status = PROVIDER_STATUS.RATE_LIMITED;
        state.lastStatus = status;
        state.lastError = msg.slice(0, 160);
        return { ok: false, status, evidence: [], error: state.lastError };
      }
    },
    normalize(response, query) {
      return def.normalize(response, query);
    },
    validate(evidence) {
      return def.validate ? def.validate(evidence) : validateEvidence(evidence);
    },
    getStatus() {
      return {
        id: def.id,
        available: this.isAvailable(),
        status: this.isAvailable() ? state.lastStatus : PROVIDER_STATUS.OFFLINE,
        lastError: state.lastError,
        lastRetrievedAt: state.lastRetrievedAt,
        requiresCoordinates: this.requiresCoordinates,
        requiresNetwork: this.requiresNetwork,
      };
    },
  };
}
