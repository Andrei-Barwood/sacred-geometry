# Persistence test report

Command: `node js/architecture/storage/project-system.test.js`

**23 passed, 0 failed** (Node  memory backend).

| Area | Result |
|---|---|
| IndexedDB | Native API in browser (`sacredArchitecture` v1). Node tests use memory backend. Upgrade path does not wipe stores. `sw.js` does not touch IndexedDB. |
| Save/load | 6 kW loads, duty, 6 kW service limit preserved. Utility 25 MWp / 25 MW / 100 MWh / kV / connections preserved. |
| Autosave | Debounced 1.5 s in the workbench; not unit-timed. Dirty flag is action-based. |
| Snapshots | A 25/100 vs B 30/120 diffs power and energy. Restore keeps `projectId`. New-from-snapshot new id. |
| Scenarios | Islanded changes operating state only; PV DC and BESS enabled unchanged. Cannot delete last scenario. |
| Import/export | Delete then import reconstructs. Pretty JSON. Engineering BESS duration error still imports. |
| Migrations | Isolated mock `v1 → v2` is copy-in; production schema remains **1**. Newer schema (`current+10`) rejected. |
| Privacy | `/Users/example/private.pdf` blocks export. Scanner ignores ISO timestamps / UUIDs (no PHONE false positive). |
| Security | `__proto__` rejected. `<img onerror>` stored as text. Oversize JSON rejected. `JSON.parse` only. |
| Round-trip | `null` stays `null`. `0.00000012` BTC/kWh, 29.7 MW, 11.5 kV, 0.925 PF survive. |
| Storage failure | Failed `put` returns error; document remains; export still works. |
| Preferences | View/BTC in localStorage; absent from project JSON. |

Browser IndexedDB was not driven in this Node session. Workbench UI dialogs (confirm delete / collision) are present in `arquitectura-sagrada.html`.
