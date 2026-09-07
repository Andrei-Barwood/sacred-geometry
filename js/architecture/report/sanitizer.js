/**
 * Sanitize a report model for render/export. Does not mutate the project.
 */

import { cloneValue } from "../ui/clone.js";
import { scanPrivacyBlob } from "../storage/sanitizer.js";

const PATH_RE = /(\/Users\/|\/home\/|C:\\Users\\|file:\/\/)/i;

function redactString(s) {
  if (typeof s !== "string") return s;
  return s.replace(/\/Users\/[^\s"']+/gi, "[redacted-path]")
    .replace(/\/home\/[^\s"']+/gi, "[redacted-path]")
    .replace(/C:\\Users\\[^\s"']+/gi, "[redacted-path]")
    .replace(/file:\/\/[^\s"']+/gi, "[redacted-path]");
}

function walk(value) {
  if (typeof value === "string") return redactString(value);
  if (Array.isArray(value)) return value.map(walk);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = walk(v);
    return out;
  }
  return value;
}

export function sanitizeReportModel(model) {
  const copy = walk(cloneValue(model));
  const hits = scanPrivacyBlob(copy);
  copy.privacy = {
    hits,
    blocked: hits.length > 0 && hits.some((h) => h === "PATH" || h === "PERSON" || h === "EMAIL" || h === "PHONE"),
  };
  return copy;
}

export function reportExportAllowed(model) {
  const blob = JSON.stringify(model);
  if (PATH_RE.test(blob) && /\[redacted-path\]/.test(blob) === false && /(\/Users\/|\/home\/|C:\\Users\\|file:\/\/)/i.test(blob)) {
    const hits = scanPrivacyBlob(model);
    if (hits.includes("PATH") || hits.includes("PERSON")) {
      return { ok: false, hits, message: "Export blocked: private or local-path content detected." };
    }
  }
  const hits = scanPrivacyBlob(model);
  if (hits.includes("PATH") || hits.includes("PERSON")) {
    return { ok: false, hits, message: "Export blocked: private or local-path content detected." };
  }
  return { ok: true, hits };
}
