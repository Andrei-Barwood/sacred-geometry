/**
 * Untrusted-text handling for evidence and provider payloads.
 * Data only — never execute provider content.
 */

import { BLOCKED_URL_PROTOCOLS, MAX_RAW_EXCERPT, MAX_SOURCE_TITLE, SAFE_URL_PROTOCOLS } from "./constants.js";

const DANGEROUS_KEYS = new Set(["__proto__", "prototype", "constructor"]);

export function stripDangerousKeys(value, depth = 0) {
  if (value == null || typeof value !== "object" || depth > 24) return value;
  if (Array.isArray(value)) return value.map((v) => stripDangerousKeys(v, depth + 1));
  const out = Object.create(null);
  for (const [k, v] of Object.entries(value)) {
    if (DANGEROUS_KEYS.has(k)) continue;
    if (k === "__proto__") continue;
    out[k] = stripDangerousKeys(v, depth + 1);
  }
  return out;
}

export function sanitizePlainText(value, max = MAX_SOURCE_TITLE) {
  if (value == null) return null;
  let s = String(value);
  s = s.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<[^>]+>/g, "");
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  s = s.replace(/\s+/g, " ").trim();
  if (s.length > max) s = s.slice(0, max);
  return s || null;
}

export function sanitizeExcerpt(value) {
  return sanitizePlainText(value, MAX_RAW_EXCERPT);
}

export function sanitizeSourceUrl(raw) {
  if (raw == null || raw === "") return { ok: false, url: null, reason: "missing" };
  let s = String(raw).trim();
  if (!s) return { ok: false, url: null, reason: "missing" };
  const lower = s.toLowerCase();
  for (const proto of BLOCKED_URL_PROTOCOLS) {
    if (lower.startsWith(proto)) return { ok: false, url: null, reason: "blocked-protocol" };
  }
  try {
    const u = new URL(s);
    if (!SAFE_URL_PROTOCOLS.includes(u.protocol)) {
      return { ok: false, url: null, reason: "blocked-protocol" };
    }
    if (u.username || u.password) {
      u.username = "";
      u.password = "";
    }
    return { ok: true, url: u.toString(), reason: null };
  } catch {
    return { ok: false, url: null, reason: "invalid" };
  }
}

export function isSafeHref(url) {
  return sanitizeSourceUrl(url).ok === true;
}

export function parseJsonSafe(text) {
  if (typeof text !== "string") {
    return { ok: false, value: null, error: "not-text" };
  }
  const trimmed = text.trim();
  if (!trimmed) return { ok: false, value: null, error: "empty" };
  if (trimmed[0] === "<" || /^<!doctype/i.test(trimmed) || /^<html/i.test(trimmed)) {
    return { ok: false, value: null, error: "html-response" };
  }
  try {
    const parsed = JSON.parse(trimmed);
    return { ok: true, value: stripDangerousKeys(parsed), error: null };
  } catch {
    return { ok: false, value: null, error: "malformed-json" };
  }
}

export function fingerprintStructured(value) {
  try {
    const json = JSON.stringify(value);
    let h = 2166136261;
    for (let i = 0; i < json.length; i++) {
      h ^= json.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16).padStart(8, "0");
  } catch {
    return null;
  }
}
