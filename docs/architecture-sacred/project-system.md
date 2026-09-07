# Sacred Architecture project system

Local persistence for workbench projects. Calculation, validation, templates, and the graph engine are **not** reimplemented here.

## Layers

| Layer | Stored? |
|---|---|
| Project data (inputs, scenarios, snapshots) | Yes — IndexedDB |
| Derived calculations, graph coordinates, validation authority | No — recalculated on open |
| UI transients (tabs, hover, filters) | No |
| User preferences (theme, SYSTEM/SACRED, BTC/sats) | localStorage only |
| Historical snapshot summaries | Optional `historicalDerivedData` — never current source of truth |

## Project document

`schemaVersion` is the **file** structure. `engineVersion` is the math engines. IndexedDB `IDB_VERSION` is the database. They are independent.

See `project-format.md` for the JSON envelope.

`projectId` is a UUID (`crypto.randomUUID` with fallback). Never the project name.

## Lifecycle

1. **New** — new `projectId`, empty safe architecture (`null` ≠ `0`), default NORMAL scenario, no template source.
2. **Load template** — clone into a new document (`sourceTemplateId`, `sourceTemplateVersion: 1`). Catalog objects are not referenced. If a project is already open: Create new / Replace architecture (auto-snapshot) / Cancel.
3. **Save** — schema validate, sanitize, `updatedAt`, IndexedDB put. Engineering errors are allowed. Structural errors are not.
4. **Open** — load, **revalidate**, resolve active scenario.
5. **Duplicate** — new ids/timestamps; architecture + scenarios copied; snapshots **not** copied.
6. **Delete** — explicit dialog, not `window.confirm`.

Saved projects do not update if `templates.js` later changes.

## Scenario model

Operating state, not an architecture clone. Overrides: `loadStates`, `generationStates`, `bessState`, `gridState`, `overrides.season`.

`resolveScenario(document, id)` is pure and does not mutate the document. The graph consumes the resolved workbench state. Physical `enabled` flags do not change. Motor-start does not define monthly energy.

At least one scenario is required. The last remaining scenario cannot be deleted. `activeScenarioId` is persisted (working state). SYSTEM/SACRED is a **preference**, not project data.

## Snapshot model

Immutable payload (`architecture` + `scenarios` + `activeScenarioId` + `provenance`). Rename/note only on the envelope. Restore keeps `projectId` and auto-snapshots current first. “New project from snapshot” allocates a new id.

`compareSnapshots` diffs **inputs** (Loads, Generation, BESS, Substation, Grid, Economics, Site, Scenarios, Connections), not annual energy or scores.

Automatic snapshots only before restore, replace, and template replace. Cap via `maxAutomaticSnapshots`. Manual snapshots are never auto-deleted.

Timestamps are ISO-8601. Display names may use local time.

## Storage

- Database `sacredArchitecture`, store `projects` (snapshots live on the document).
- `onupgradeneeded` creates stores; it does **not** wipe projects.
- Preferences key `sacred-architecture-preferences` in localStorage.
- If IndexedDB is missing: in-memory session + JSON export still work; UI shows “Local project persistence unavailable.”
- Autosave: debounce ~1.5s after meaningful architecture changes. Not on hover, zoom, view toggle, or node select.
- Dirty states: Unsaved / Saving… / Saved / Save failed. “Saved” only after IndexedDB confirms.
- Save failure keeps the in-memory document. Export still works.
- `lastProjectId` is offered on the start screen, never silent-loaded after `lastOpenFailed`.
- Service Worker cache is unrelated; `sw.js` does not touch IndexedDB.

## Import pipeline

READ → PARSE (`JSON.parse` only) → structure → format (`sacred-architecture-project`) → schema version → sequential migrate → sanitize → preview → user confirm → save.

Reject: non-JSON, unknown format, `schemaVersion` newer than current, missing project object, prototype-pollution keys, oversize (>5 MB), over-deep nesting. Engineering errors import as drafts.

ID collision: Import as copy / Replace (auto-snapshot existing) / Cancel. Never overwrite automatically.

## Export

Envelope `{ format, schemaVersion, exportedAt, project }`. Pretty-printed. Filename is a sanitized stem; inner `metadata.name` is unchanged. Privacy scan blocks `/Users/`, `/home/`, `file://`, `C:\Users\`, and repo-forbidden tokens. No PDF/DWG/base64 sources.

## Security / privacy

Imported strings are untrusted (`textContent` in the UI). No `eval`. No server upload. Autosave is local only. No accounts or cloud sync.

## Failure recovery

Quota / transaction failure → error banner, keep RAM, export JSON. Corrupted record → load error, `lastOpenFailed`. No silent clobber.
