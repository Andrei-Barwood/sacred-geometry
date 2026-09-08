/**
 * Evidence cache. Separate from projects. Clearing cache must not destroy a project.
 */

import { cloneValue } from "../ui/clone.js";
import { evaluateFreshness } from "./freshness.js";

export function createMemoryCache() {
  const evidence = new Map();
  const provider = new Map();
  const research = new Map();
  return {
    kind: "memory",
    async putEvidence(item) {
      evidence.set(item.evidenceId, cloneValue(item));
    },
    async getEvidence(id) {
      return evidence.has(id) ? cloneValue(evidence.get(id)) : null;
    },
    async listEvidence() {
      return [...evidence.values()].map(cloneValue);
    },
    async clearEvidence() {
      evidence.clear();
    },
    async putProvider(key, payload) {
      provider.set(key, { key, storedAt: new Date().toISOString(), payload: cloneValue(payload) });
    },
    async getProvider(key) {
      const row = provider.get(key);
      return row ? cloneValue(row) : null;
    },
    async clearProvider() {
      provider.clear();
    },
    async putResearch(record) {
      research.set(record.id, cloneValue(record));
    },
    async getResearch(id) {
      return research.has(id) ? cloneValue(research.get(id)) : null;
    },
    async listResearch() {
      return [...research.values()].map(cloneValue);
    },
    async clearResearch() {
      research.clear();
    },
    async clearAllCache() {
      evidence.clear();
      provider.clear();
      research.clear();
    },
  };
}

export function cacheStatus(item) {
  const fresh = evaluateFreshness(item);
  return { cached: true, freshness: fresh.status, retrievedAt: item?.retrievedAt || null };
}
