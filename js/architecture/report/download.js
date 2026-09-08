/**
 * Browser file download for native PDF/JSON/CSV/HTML blobs.
 * Detached <a>.click() is ignored by Safari and some Chromium builds.
 */

export function asDownloadBlob(data, mime) {
  const type =
    mime ||
    (data instanceof Uint8Array ? "application/pdf" : "application/octet-stream");
  if (typeof data === "string") {
    const withCharset = type.includes("charset") || !type.startsWith("text/")
      ? type
      : `${type};charset=utf-8`;
    return new Blob([data], { type: withCharset });
  }
  if (data instanceof Uint8Array) {
    const copy = new Uint8Array(data.byteLength);
    copy.set(data);
    return new Blob([copy], { type });
  }
  if (data instanceof ArrayBuffer) {
    return new Blob([data], { type });
  }
  return new Blob([data], { type });
}

export function sanitizeDownloadName(name, fallback = "download") {
  const raw = String(name || fallback)
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-")
    .trim();
  return raw.slice(0, 120) || fallback;
}

/**
 * @returns {{ ok: boolean, filename: string, blob: Blob, href: string|null, error?: string }}
 */
export function triggerBrowserDownload(filename, data, mime) {
  const safeName = sanitizeDownloadName(filename);
  const blob = asDownloadBlob(data, mime);
  if (!blob.size) {
    return { ok: false, filename: safeName, blob, href: null, error: "El archivo generado está vacío." };
  }
  if (typeof document === "undefined") {
    return { ok: true, filename: safeName, blob, href: null };
  }
  try {
    if (typeof navigator !== "undefined" && typeof navigator.msSaveOrOpenBlob === "function") {
      navigator.msSaveOrOpenBlob(blob, safeName);
      return { ok: true, filename: safeName, blob, href: null };
    }
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = safeName;
    a.rel = "noopener";
    a.type = blob.type;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return { ok: true, filename: safeName, blob, href };
  } catch (err) {
    return {
      ok: false,
      filename: safeName,
      blob,
      href: null,
      error: err?.message || String(err),
    };
  }
}
