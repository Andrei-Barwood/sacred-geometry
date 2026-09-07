/**
 * Evidence persistence. IndexedDB stores sit beside projects (schema v2 upgrade).
 * Cache expiry never deletes accepted project evidence.
 */

import { cloneValue } from "../ui/clone.js";
import {
  CACHE_DB_STORE_EVIDENCE,
  CACHE_DB_STORE_PROVIDER,
  CACHE_DB_STORE_RESEARCH,
} from "./constants.js";
import {
  IDB_NAME,
  IDB_STORE_ENRICHMENT_BATCHES,
  IDB_STORE_ENRICHMENT_JOBS,
  IDB_STORE_ENRICHMENTS,
  IDB_STORE_PROJECTS,
  IDB_VERSION,
} from "../storage/schema.js";
import { createMemoryCache } from "./cache.js";

export const EVIDENCE_IDB_VERSION = IDB_VERSION;

function idbAvailable() {
  return typeof indexedDB !== "undefined";
}

export function upgradeArchitectureDb(db) {
  if (!db.objectStoreNames.contains(IDB_STORE_PROJECTS)) {
    const store = db.createObjectStore(IDB_STORE_PROJECTS, { keyPath: "projectId" });
    store.createIndex("updatedAt", "updatedAt");
  }
  if (!db.objectStoreNames.contains(CACHE_DB_STORE_EVIDENCE)) {
    db.createObjectStore(CACHE_DB_STORE_EVIDENCE, { keyPath: "evidenceId" });
  }
  if (!db.objectStoreNames.contains(CACHE_DB_STORE_PROVIDER)) {
    db.createObjectStore(CACHE_DB_STORE_PROVIDER, { keyPath: "key" });
  }
  if (!db.objectStoreNames.contains(CACHE_DB_STORE_RESEARCH)) {
    db.createObjectStore(CACHE_DB_STORE_RESEARCH, { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains(IDB_STORE_ENRICHMENTS)) {
    db.createObjectStore(IDB_STORE_ENRICHMENTS, { keyPath: "architecture_id" });
  }
  if (!db.objectStoreNames.contains(IDB_STORE_ENRICHMENT_BATCHES)) {
    db.createObjectStore(IDB_STORE_ENRICHMENT_BATCHES, { keyPath: "batch_id" });
  }
  if (!db.objectStoreNames.contains(IDB_STORE_ENRICHMENT_JOBS)) {
    db.createObjectStore(IDB_STORE_ENRICHMENT_JOBS, { keyPath: "id" });
  }
}

function openIdb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onerror = () => reject(req.error || new Error("IndexedDB open failed"));
    req.onupgradeneeded = (ev) => {
      upgradeArchitectureDb(ev.target.result);
    };
    req.onsuccess = () => resolve(req.result);
  });
}

function txDone(tx, req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    tx.onerror = () => reject(tx.error);
  });
}

export function createIndexedDBEvidenceBackend() {
  return {
    kind: "indexeddb",
    async putEvidence(item) {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_EVIDENCE, "readwrite");
      await txDone(tx, tx.objectStore(CACHE_DB_STORE_EVIDENCE).put(cloneValue(item)));
    },
    async getEvidence(id) {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_EVIDENCE, "readonly");
      const row = await txDone(tx, tx.objectStore(CACHE_DB_STORE_EVIDENCE).get(id));
      return row ? cloneValue(row) : null;
    },
    async listEvidence() {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_EVIDENCE, "readonly");
      const rows = await txDone(tx, tx.objectStore(CACHE_DB_STORE_EVIDENCE).getAll());
      return (rows || []).map(cloneValue);
    },
    async clearEvidence() {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_EVIDENCE, "readwrite");
      await txDone(tx, tx.objectStore(CACHE_DB_STORE_EVIDENCE).clear());
    },
    async putProvider(key, payload) {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_PROVIDER, "readwrite");
      await txDone(tx, tx.objectStore(CACHE_DB_STORE_PROVIDER).put({ key, storedAt: new Date().toISOString(), payload: cloneValue(payload) }));
    },
    async getProvider(key) {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_PROVIDER, "readonly");
      const row = await txDone(tx, tx.objectStore(CACHE_DB_STORE_PROVIDER).get(key));
      return row ? cloneValue(row) : null;
    },
    async clearProvider() {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_PROVIDER, "readwrite");
      await txDone(tx, tx.objectStore(CACHE_DB_STORE_PROVIDER).clear());
    },
    async putResearch(record) {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_RESEARCH, "readwrite");
      await txDone(tx, tx.objectStore(CACHE_DB_STORE_RESEARCH).put(cloneValue(record)));
    },
    async getResearch(id) {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_RESEARCH, "readonly");
      const row = await txDone(tx, tx.objectStore(CACHE_DB_STORE_RESEARCH).get(id));
      return row ? cloneValue(row) : null;
    },
    async listResearch() {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_RESEARCH, "readonly");
      const rows = await txDone(tx, tx.objectStore(CACHE_DB_STORE_RESEARCH).getAll());
      return (rows || []).map(cloneValue);
    },
    async clearResearch() {
      const db = await openIdb();
      const tx = db.transaction(CACHE_DB_STORE_RESEARCH, "readwrite");
      await txDone(tx, tx.objectStore(CACHE_DB_STORE_RESEARCH).clear());
    },
    async clearAllCache() {
      await this.clearEvidence();
      await this.clearProvider();
      await this.clearResearch();
    },
  };
}

export async function createEvidenceStore(options = {}) {
  if (options.backend) return options.backend;
  if (idbAvailable() && options.memory !== true) {
    try {
      const backend = createIndexedDBEvidenceBackend();
      await backend.listEvidence();
      return backend;
    } catch {
      return createMemoryCache();
    }
  }
  return createMemoryCache();
}
