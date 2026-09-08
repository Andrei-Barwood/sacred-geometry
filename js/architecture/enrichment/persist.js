/**
 * Optional IndexedDB persistence for enrichment records.
 * Memory store remains the runtime source of truth.
 */

import {
  IDB_NAME,
  IDB_STORE_ENRICHMENT_BATCHES,
  IDB_STORE_ENRICHMENT_JOBS,
  IDB_STORE_ENRICHMENTS,
  IDB_VERSION,
} from "../storage/schema.js";
import { upgradeArchitectureDb } from "../data/evidence-store.js";
import { putEnrichment, setLastBatch, setLastJob } from "./store.js";

function idbAvailable() {
  return typeof indexedDB !== "undefined";
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

function runRead(storeName, fn) {
  return openIdb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction([storeName], "readonly");
        const req = fn(tx.objectStore(storeName));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        tx.onerror = () => reject(tx.error);
      })
  );
}

export async function persistEnrichmentBatch(batch, job) {
  if (!idbAvailable() || !batch) return { ok: false, skipped: true };
  try {
    const db = await openIdb();
    await new Promise((resolve, reject) => {
      const names = [IDB_STORE_ENRICHMENTS, IDB_STORE_ENRICHMENT_BATCHES, IDB_STORE_ENRICHMENT_JOBS];
      const tx = db.transaction(names, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      const recStore = tx.objectStore(IDB_STORE_ENRICHMENTS);
      for (const rec of batch.records || []) {
        if (rec?.architecture_id) recStore.put(JSON.parse(JSON.stringify(rec)));
      }
      tx.objectStore(IDB_STORE_ENRICHMENT_BATCHES).put(JSON.parse(JSON.stringify(batch)));
      if (job) tx.objectStore(IDB_STORE_ENRICHMENT_JOBS).put(JSON.parse(JSON.stringify(job)));
    });
    return { ok: true };
  } catch {
    return { ok: false, skipped: true };
  }
}

export async function hydrateEnrichments() {
  if (!idbAvailable()) return { ok: false, skipped: true, count: 0 };
  try {
    const recs = (await runRead(IDB_STORE_ENRICHMENTS, (s) => s.getAll())) || [];
    const batches = (await runRead(IDB_STORE_ENRICHMENT_BATCHES, (s) => s.getAll())) || [];
    const jobs = (await runRead(IDB_STORE_ENRICHMENT_JOBS, (s) => s.getAll())) || [];
    for (const rec of recs) putEnrichment(rec);
    if (batches.length) {
      batches.sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
      setLastBatch(batches[0]);
    }
    if (jobs.length) {
      jobs.sort((a, b) => String(b.started_at || "").localeCompare(String(a.started_at || "")));
      setLastJob(jobs[0]);
    }
    return { ok: true, count: recs.length };
  } catch {
    return { ok: false, skipped: true, count: 0 };
  }
}
