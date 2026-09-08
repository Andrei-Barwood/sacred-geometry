/**
 * Untrusted-string handling, prototype-pollution defense, privacy scan.
 * Does not alter electrical numbers.
 */

import { scanTextForPrivacy } from "../validation/validate-privacy.js";
import { LIMITS } from "./schema.js";

const DANGEROUS_KEYS = new Set(["__proto__", "prototype", "constructor"]);

const PATH_PATTERNS = [
  /\/Users\//i,
  /\/home\//i,
  /C:\\Users\\/i,
  /file:\/\//i,
];

export function hasDangerousKeys(value, depth = 0) {
  if (value == null || typeof value !== "object" || depth > LIMITS.maxDepth) return false;
  if (Object.prototype.hasOwnProperty.call(value, "__proto__")) return true;
  for (const key of Object.keys(value)) {
    if (DANGEROUS_KEYS.has(key)) return true;
    if (hasDangerousKeys(value[key], depth + 1)) return true;
  }
  return false;
}

export function maxDepthOf(value, depth = 0) {
  if (value == null || typeof value !== "object") return depth;
  let max = depth;
  for (const v of Object.values(value)) {
    max = Math.max(max, maxDepthOf(v, depth + 1));
  }
  return max;
}

export function stripDangerousKeys(value, depth = 0) {
  if (value == null || typeof value !== "object" || depth > LIMITS.maxDepth) return value;
  if (Array.isArray(value)) return value.map((v) => stripDangerousKeys(v, depth + 1));
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    if (DANGEROUS_KEYS.has(k)) continue;
    out[k] = stripDangerousKeys(v, depth + 1);
  }
  return out;
}

export function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  const seen = new Set();
  const out = [];
  for (const raw of tags) {
    const t = String(raw ?? "").trim();
    if (!t) continue;
    if (t.length > LIMITS.maxTag) {
      return { error: `Tag exceeds ${LIMITS.maxTag} characters` };
    }
    const key = t.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
    if (out.length > LIMITS.maxTags) {
      return { error: `At most ${LIMITS.maxTags} tags` };
    }
  }
  return out;
}

export function assertStringLimit(value, max, field) {
  if (value == null) return null;
  if (typeof value !== "string") return `${field} must be text`;
  if (value.length > max) return `${field} exceeds ${max} characters`;
  return null;
}

const ISO = /^\d{4}-\d{2}-\d{2}T/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function collectStrings(value, out = []) {
  if (typeof value === "string") {
    if (!ISO.test(value) && !UUID.test(value)) out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const v of value) collectStrings(v, out);
    return out;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "createdAt" || k === "updatedAt" || k === "exportedAt") continue;
      collectStrings(v, out);
    }
  }
  return out;
}

export function scanPrivacyBlob(value) {
  const strings = typeof value === "string" ? [value] : collectStrings(value);
  const hits = new Set();
  for (const text of strings) {
    for (const code of scanTextForPrivacy(text) || []) {
      if (code === "PHONE" && ISO.test(text)) continue;
      hits.add(code);
    }
    for (const re of PATH_PATTERNS) {
      if (re.test(text)) hits.add("PATH");
    }
  }
  return [...hits];
}

export function scanExportForPrivacy(project) {
  const hits = scanPrivacyBlob(project);
  return {
    ok: hits.length === 0,
    hits,
    message:
      hits.length === 0
        ? null
        : "Export blocked: private or local-path content detected. Remove it before exporting.",
  };
}

export function safeFileStem(name) {
  const raw = String(name || "project")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return raw || "project";
}
