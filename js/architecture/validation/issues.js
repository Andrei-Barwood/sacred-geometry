const SEVERITIES = Object.freeze(["ERROR", "WARNING", "NOTICE", "ASSUMPTION"]);

export function createIssueBag() {
  const errors = [];
  const warnings = [];
  const notices = [];
  const assumptions = [];
  const provenanceIssues = [];

  function push(severity, code, message, extra = {}) {
    const item = {
      severity,
      code,
      message,
      category: extra.category || "general",
      warningLevel: extra.warningLevel || null,
    };
    if (severity === "ERROR") errors.push(item);
    else if (severity === "WARNING") warnings.push(item);
    else if (severity === "NOTICE") notices.push(item);
    else assumptions.push(item);
    if (extra.provenance) provenanceIssues.push(item);
    return item;
  }

  return {
    error: (code, message, extra) => push("ERROR", code, message, extra),
    warning: (code, message, extra) =>
      push("WARNING", code, message, { warningLevel: extra?.warningLevel || "MEDIUM", ...extra }),
    notice: (code, message, extra) => push("NOTICE", code, message, extra),
    assumption: (code, message, extra) => push("ASSUMPTION", code, message, extra),
    snapshot() {
      return {
        errors: errors.slice(),
        warnings: warnings.slice(),
        notices: notices.slice(),
        assumptions: assumptions.slice(),
        provenanceIssues: provenanceIssues.slice(),
      };
    },
    get hasBlocking() {
      return errors.length > 0;
    },
  };
}

export { SEVERITIES };
