/**
 * Bounded HTTP helper for optional live providers.
 * No CORS proxies. No secrets. Data only.
 */

import { MAX_PAYLOAD_BYTES, PROVIDER_TIMEOUT_MS, PROVIDER_STATUS } from "./constants.js";
import { parseJsonSafe, sanitizeSourceUrl } from "./evidence-sanitizer.js";

const inflight = new Map();

export function queryKey(url, init = {}) {
  return `${init.method || "GET"} ${url}`;
}

export async function fetchJson(url, options = {}) {
  const safe = sanitizeSourceUrl(url);
  if (!safe.ok) {
    return { ok: false, status: PROVIDER_STATUS.ERROR, error: "invalid URL", value: null };
  }
  const timeoutMs = options.timeoutMs ?? PROVIDER_TIMEOUT_MS;
  const maxBytes = options.maxBytes ?? MAX_PAYLOAD_BYTES;
  const key = options.dedupeKey || queryKey(safe.url, options);
  if (options.dedupe !== false && inflight.has(key)) return inflight.get(key);

  const run = (async () => {
    const ctrl = options.signal ? null : new AbortController();
    const signal = options.signal || ctrl.signal;
    const timer = setTimeout(() => ctrl && ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(safe.url, {
        method: options.method || "GET",
        headers: { Accept: "application/json", ...(options.headers || {}) },
        redirect: "error",
        signal,
      });
      if (res.status === 429) {
        return { ok: false, status: PROVIDER_STATUS.RATE_LIMITED, error: "rate-limited", value: null };
      }
      if (!res.ok) {
        return { ok: false, status: PROVIDER_STATUS.ERROR, error: `http-${res.status}`, value: null };
      }
      const buf = await res.arrayBuffer();
      if (buf.byteLength > maxBytes) {
        return { ok: false, status: PROVIDER_STATUS.ERROR, error: "huge-payload", value: null };
      }
      const text = new TextDecoder("utf-8").decode(buf);
      const parsed = parseJsonSafe(text);
      if (!parsed.ok) {
        return { ok: false, status: PROVIDER_STATUS.ERROR, error: parsed.error, value: null };
      }
      return { ok: true, status: PROVIDER_STATUS.AVAILABLE, error: null, value: parsed.value };
    } catch (err) {
      const name = err?.name || "";
      const msg = String(err?.message || err);
      if (name === "AbortError") {
        return { ok: false, status: PROVIDER_STATUS.ERROR, error: "timeout", value: null };
      }
      if (/failed to fetch|network|offline/i.test(msg)) {
        return { ok: false, status: PROVIDER_STATUS.OFFLINE, error: "offline", value: null };
      }
      return { ok: false, status: PROVIDER_STATUS.ERROR, error: msg.slice(0, 120), value: null };
    } finally {
      clearTimeout(timer);
      inflight.delete(key);
    }
  })();

  inflight.set(key, run);
  return run;
}

export function abortable() {
  const ctrl = new AbortController();
  return { signal: ctrl.signal, abort: () => ctrl.abort() };
}
