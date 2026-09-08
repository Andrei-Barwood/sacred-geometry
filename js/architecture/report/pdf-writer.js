/**
 * Minimal PDF 1.4 writer. Built-in Helvetica (WinAnsi). No electrical math.
 */

export const A4 = Object.freeze({ w: 595.28, h: 841.89 });

const WINANSI = {
  Á: 0xc1, É: 0xc9, Í: 0xcd, Ó: 0xd3, Ú: 0xda, Ñ: 0xd1, Ü: 0xdc,
  á: 0xe1, é: 0xe9, í: 0xed, ó: 0xf3, ú: 0xfa, ñ: 0xf1, ü: 0xfc,
  "¿": 0xbf, "¡": 0xa1, "°": 0xb0, "·": 0xb7,
  "—": 0x97, "–": 0x96, "“": 0x93, "”": 0x94, "‘": 0x91, "’": 0x92,
  "«": 0xab, "»": 0xbb, "×": 0xd7, "€": 0x80,
};

export function latin1Bytes(str) {
  const a = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) a[i] = str.charCodeAt(i) & 0xff;
  return a;
}

export function decodeLatin1(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return s;
}

export function pdfString(text) {
  let out = "(";
  const s = String(text ?? "");
  for (const ch of s) {
    if (ch === "\\" || ch === "(" || ch === ")") out += `\\${ch}`;
    else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch.charCodeAt(0) < 128) out += ch;
    else if (WINANSI[ch] != null) {
      const oct = WINANSI[ch].toString(8).padStart(3, "0");
      out += `\\${oct}`;
    } else out += "?";
  }
  return `${out})`;
}

export function approxWidth(text, size) {
  return String(text ?? "").length * size * 0.5;
}

export function wrapText(text, maxWidth, size) {
  const raw = String(text ?? "").replace(/\s+/g, " ").trim();
  if (!raw) return [""];
  const words = raw.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (approxWidth(next, size) <= maxWidth) cur = next;
    else {
      if (cur) lines.push(cur);
      if (approxWidth(w, size) > maxWidth) {
        let chunk = "";
        for (const ch of w) {
          const t = chunk + ch;
          if (approxWidth(t, size) > maxWidth && chunk) {
            lines.push(chunk);
            chunk = ch;
          } else chunk = t;
        }
        cur = chunk;
      } else cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

function concat(parts) {
  let n = 0;
  for (const p of parts) n += p.length;
  const out = new Uint8Array(n);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

export class PdfBuilder {
  constructor(options = {}) {
    this.pageW = options.pageW || A4.w;
    this.pageH = options.pageH || A4.h;
    this.margin = options.margin || 48;
    this.headerText = options.headerText || "";
    this.footerLeft = options.footerLeft || "";
    this.pages = [];
    this._page = null;
    this.textLog = [];
  }

  addPage() {
    this._page = { cmds: [] };
    this.pages.push(this._page);
    this._chrome();
    return this.pages.length;
  }

  _chrome() {
    const yTop = this.pageH - 28;
    const yBot = 24;
    if (this.headerText) {
      this._rawText(this.margin, yTop, this.headerText, 8, false);
    }
    this._stroke(this.margin, yTop - 6, this.pageW - this.margin, yTop - 6, 0.4);
    this._stroke(this.margin, 36, this.pageW - this.margin, 36, 0.4);
    const pageNo = `p. ${this.pages.length}`;
    this._rawText(this.margin, yBot, this.footerLeft, 8, false);
    const w = approxWidth(pageNo, 8);
    this._rawText(this.pageW - this.margin - w, yBot, pageNo, 8, false);
  }

  _rawText(x, y, text, size, bold) {
    const font = bold ? "F2" : "F1";
    const s = String(text ?? "");
    if (!s) return;
    this.textLog.push(s);
    this._page.cmds.push(
      `BT /${font} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td ${pdfString(s)} Tj ET`
    );
  }

  _stroke(x1, y1, x2, y2, w) {
    this._page.cmds.push(
      `${w} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`
    );
  }

  _rect(x, y, w, h, strokeW) {
    this._page.cmds.push(`${strokeW} w ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re S`);
  }

  textAtTop(topY, text, size, bold) {
    const y = this.pageH - topY;
    this._rawText(this.margin, y, text, size, bold);
  }

  build() {
    if (!this.pages.length) this.addPage();
    const objs = [];
    const add = (body) => {
      objs.push(body);
      return objs.length;
    };
    add("<< /Type /Catalog /Pages 2 0 R >>\n");
    add("PAGES_PLACEHOLDER");
    add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\n");
    add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\n");
    const pageIds = [];
    const contentIds = [];
    for (const page of this.pages) {
      const stream = page.cmds.join("\n");
      const bytes = latin1Bytes(stream);
      const cid = add(
        `<< /Length ${bytes.length} >>\nstream\n${stream}\nendstream\n`
      );
      contentIds.push(cid);
      const pid = add("PAGE_PLACEHOLDER");
      pageIds.push(pid);
    }
    const kids = pageIds.map((id) => `${id} 0 R`).join(" ");
    objs[1] = `<< /Type /Pages /Kids [ ${kids} ] /Count ${pageIds.length} >>\n`;
    for (let i = 0; i < pageIds.length; i++) {
      const pid = pageIds[i];
      const cid = contentIds[i];
      objs[pid - 1] =
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.pageW} ${this.pageH}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${cid} 0 R >>\n`;
    }
    const chunks = [latin1Bytes("%PDF-1.4\n")];
    const offsets = [0];
    let pos = chunks[0].length;
    for (let i = 0; i < objs.length; i++) {
      offsets.push(pos);
      const block = latin1Bytes(`${i + 1} 0 obj\n${objs[i]}endobj\n`);
      chunks.push(block);
      pos += block.length;
    }
    const xrefPos = pos;
    let xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= objs.length; i++) {
      xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
    }
    xref += `trailer << /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
    chunks.push(latin1Bytes(xref));
    return concat(chunks);
  }
}

export function extractPdfText(bytes) {
  const src = typeof bytes === "string" ? bytes : decodeLatin1(bytes);
  const out = [];
  const re = /\(((?:\\.|[^\\)])*)\)\s*Tj/g;
  let m;
  while ((m = re.exec(src))) {
    let t = m[1];
    t = t.replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\\([()\\])/g, "$1");
    t = t.replace(/\\([0-7]{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));
    out.push(t);
  }
  return out.join("\n");
}
