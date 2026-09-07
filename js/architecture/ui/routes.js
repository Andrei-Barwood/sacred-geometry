/**
 * Deep links for Arquitectura Sagrada v1.
 * Hash only (static hosting). No electrical math.
 *
 *   #/                       start
 *   #/atlas                  template explorer
 *   #/atlas/:templateId      template detail
 *   #/map                    site map
 *   #/map/:siteId            selected site
 *   #/workbench              configuration + SYSTEM/SACRED
 *   #/compare                comparison workbench
 *   #/compare/:comparisonId  saved comparison
 *   #/reports                report / PDF
 *   #/enrichment             atlas enrichment
 *   #/project                project list
 *   #/project/:projectId     open project
 *   #/snapshot/:snapshotId   snapshots dialog
 */

export const SCREENS = Object.freeze({
  START: "start",
  ATLAS: "atlas",
  MAP: "map",
  WORKBENCH: "workbench",
  COMPARE: "compare",
  REPORTS: "reports",
  ENRICHMENT: "enrichment",
  PROJECT: "project",
  SNAPSHOT: "snapshot",
});

const KNOWN = new Set(Object.values(SCREENS));

export function parseArchHash(hash) {
  const raw = String(hash || "").replace(/^#/, "").replace(/^\//, "");
  const parts = raw.split("/").filter(Boolean).map((p) => {
    try {
      return decodeURIComponent(p);
    } catch {
      return p;
    }
  });
  const screen = KNOWN.has(parts[0]) ? parts[0] : SCREENS.START;
  return {
    screen,
    id: parts[1] || null,
    parts,
  };
}

export function archHash({ screen, id } = {}) {
  if (!screen || screen === SCREENS.START) return "#/";
  if (id) return `#/${screen}/${encodeURIComponent(id)}`;
  return `#/${screen}`;
}

export const NAV_ITEMS = Object.freeze([
  { id: SCREENS.ATLAS, label: "Atlas", hint: "Plantillas del catálogo" },
  { id: SCREENS.MAP, label: "Sitio", hint: "Mapa y emplazamientos" },
  { id: SCREENS.WORKBENCH, label: "Workbench", hint: "Arquitectura y validación" },
  { id: SCREENS.COMPARE, label: "Comparación", hint: "2–3 entidades cara a cara" },
  { id: SCREENS.REPORTS, label: "Reports", hint: "Informe HTML y PDF" },
  { id: SCREENS.ENRICHMENT, label: "Enrichment", hint: "Cobertura regional del atlas" },
  { id: SCREENS.PROJECT, label: "Proyecto", hint: "Guardar, importar, borrar" },
]);
