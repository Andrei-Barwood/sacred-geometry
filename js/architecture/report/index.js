export { REPORT_GENERATOR_VERSION, REPORT_PDF_RENDERER_VERSION } from "./i18n.js";
export { generateEngineeringReport, generateRevisionComparisonReport, DEFAULT_REPORT_OPTIONS } from "./generator.js";
export { renderEngineeringReportHTML, exportEngineeringReportHTML, REPORT_CSS } from "./html.js";
export { sanitizeReportModel, reportExportAllowed } from "./sanitizer.js";
export { buildDiagrams } from "./diagrams.js";
export { buildPrintModel, contentHash, DATO_NO_DISPONIBLE, isUnknownValue, printCell, stablePdfFilename } from "./print-model.js";
export { renderEngineeringReportPdf, renderPrintModelPdf } from "./pdf.js";
export { extractPdfText } from "./pdf-writer.js";
export { asDownloadBlob, sanitizeDownloadName, triggerBrowserDownload } from "./download.js";
