/**
 * Project store. IndexedDB in the browser, memory backend in tests / fallback.
 * Not coupled to the DOM.
 */

import { cloneValue } from "../ui/clone.js";
import { IDB_NAME, IDB_STORE_PROJECTS, IDB_VERSION, newId, nowIso } from "./schema.js";
import { upgradeArchitectureDb } from "../data/evidence-store.js";
import { normalizeProjectDocument, structuralValidate } from "./serializer.js";
import { stripDangerousKeys } from "./sanitizer.js";
import { addSnapshot } from "./snapshots.js";

export function createMemoryBackend(seed = []) {
  const map = new Map(seed.map((p) => [p.projectId, cloneValue(p)]));
  return {
    kind: "memory",
    async get(id) {
      return map.has(id) ? cloneValue(map.get(id)) : null;
    },
    async put(doc) {
      map.set(doc.projectId, cloneValue(doc));
    },
    async delete(id) {
      map.delete(id);
    },
    async getAll() {
      return [...map.values()].map(cloneValue);
    },
    async clear() {
      map.clear();
    },
  };
}

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

export function createIndexedDBBackend() {
  return {
    kind: "indexeddb",
    async get(id) {
      const db = await openIdb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE_PROJECTS, "readonly");
        const req = tx.objectStore(IDB_STORE_PROJECTS).get(id);
        req.onsuccess = () => resolve(req.result ? cloneValue(req.result) : null);
        req.onerror = () => reject(req.error);
      });
    },
    async put(doc) {
      const db = await openIdb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE_PROJECTS, "readwrite");
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.objectStore(IDB_STORE_PROJECTS).put(cloneValue(doc));
      });
    },
    async delete(id) {
      const db = await openIdb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE_PROJECTS, "readwrite");
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.objectStore(IDB_STORE_PROJECTS).delete(id);
      });
    },
    async getAll() {
      const db = await openIdb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE_PROJECTS, "readonly");
        const req = tx.objectStore(IDB_STORE_PROJECTS).getAll();
        req.onsuccess = () => resolve((req.result || []).map(cloneValue));
        req.onerror = () => reject(req.error);
      });
    },
  };
}

export async function createProjectStore(options = {}) {
  let backend = options.backend;
  let available = true;
  let unavailableReason = null;
  if (!backend) {
    if (idbAvailable()) {
      try {
        backend = createIndexedDBBackend();
        await backend.getAll();
      } catch (err) {
        available = false;
        unavailableReason = "Local project persistence unavailable.";
        backend = createMemoryBackend();
      }
    } else {
      available = options.allowMemoryFallback !== false;
      unavailableReason = available ? null : "Local project persistence unavailable.";
      backend = createMemoryBackend();
      if (!idbAvailable() && options.requireIndexedDB) {
        available = false;
        unavailableReason = "Local project persistence unavailable.";
      }
    }
  }
  if (!idbAvailable() && !options.backend) {
    available = false;
    unavailableReason = "Local project persistence unavailable.";
  }

  return {
    available,
    unavailableReason,
    backendKind: backend.kind,

    async saveProject(document) {
      const doc = stripDangerousKeys(normalizeProjectDocument(cloneValue(document)));
      const struct = structuralValidate(doc);
      if (!struct.ok) {
        return { ok: false, error: struct.errors[0] || "Invalid project schema.", document: doc };
      }
      doc.updatedAt = nowIso();
      doc.metadata = { ...doc.metadata, updatedAt: doc.updatedAt };
      if (!this.available && backend.kind !== "memory") {
        return { ok: false, error: "Project could not be saved locally.", document: doc };
      }
      try {
        await backend.put(doc);
        return { ok: true, document: doc, error: null };
      } catch (err) {
        const quota = /quota/i.test(String(err?.name || err?.message || ""));
        return {
          ok: false,
          error: quota ? "Project could not be saved locally." : "Project could not be saved locally.",
          document: doc,
        };
      }
    },

    async loadProject(projectId) {
      const doc = await backend.get(projectId);
      if (!doc) return { ok: false, error: "Project not found.", document: null };
      return { ok: true, document: normalizeProjectDocument(doc), error: null };
    },

    async deleteProject(projectId) {
      await backend.delete(projectId);
      return { ok: true };
    },

    async listProjects() {
      const all = await backend.getAll();
      return all.map((d) => ({
        projectId: d.projectId,
        name: d.metadata?.name || "Untitled project",
        updatedAt: d.updatedAt,
        createdAt: d.createdAt,
        mode: d.architecture?.mode || null,
        country: d.architecture?.countryName || d.architecture?.country || null,
        region: d.architecture?.region || null,
        application: d.architecture?.application || null,
        sourceTemplateId: d.metadata?.sourceTemplateId || null,
        status: d.metadata?.status || "draft",
        tags: d.metadata?.tags || [],
        description: d.metadata?.description || "",
        lastValidationStatus: d.lastValidationStatus || null,
        archived: d.metadata?.status === "archived",
      }));
    },

    async duplicateProject(projectId) {
      const loaded = await this.loadProject(projectId);
      if (!loaded.ok) return loaded;
      const t = nowIso();
      const copy = cloneValue(loaded.document);
      copy.projectId = newId();
      copy.createdAt = t;
      copy.updatedAt = t;
      copy.snapshots = [];
      copy.metadata = {
        ...copy.metadata,
        name: `${copy.metadata?.name || "Project"} copy`,
        createdAt: t,
        updatedAt: t,
      };
      return this.saveProject(copy);
    },

    async renameProject(projectId, name) {
      const loaded = await this.loadProject(projectId);
      if (!loaded.ok) return loaded;
      const doc = loaded.document;
      doc.metadata = { ...doc.metadata, name: String(name || doc.metadata.name) };
      return this.saveProject(doc);
    },

    async archiveProject(projectId, archived = true) {
      const loaded = await this.loadProject(projectId);
      if (!loaded.ok) return loaded;
      const doc = loaded.document;
      doc.metadata = { ...doc.metadata, status: archived ? "archived" : "draft" };
      return this.saveProject(doc);
    },

    async exists(projectId) {
      const doc = await backend.get(projectId);
      return !!doc;
    },
  };
}

export { addSnapshot };
