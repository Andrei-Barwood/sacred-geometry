const PATTERNS = [
  [/\/users\//i, "PATH"],
  [/andreibarwood/i, "PERSON"],
  [/snocomm/i, "PRIVATE_NAME"],
  [/autocad/i, "CAD"],
  [/\.dwg\b/i, "DWG"],
  [/saesa/i, "UTILITY"],
  [/calama/i, "GEO"],
  [/parinacota/i, "GEO"],
  [/\+?\d[\d\s-]{8,}\d/, "PHONE"],
  [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i, "EMAIL"],
];

export function validatePrivacy(template, issues) {
  const blob = JSON.stringify(template);
  for (const [re, code] of PATTERNS) {
    if (re.test(blob)) {
      issues.error(`PRIVACY_${code}`, `forbidden token in template (${code})`, { category: "privacy" });
    }
  }
}

export function scanTextForPrivacy(text) {
  const hits = [];
  for (const [re, code] of PATTERNS) {
    if (re.test(text)) hits.push(code);
  }
  return hits;
}
