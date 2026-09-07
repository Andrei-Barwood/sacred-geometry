# Source policy

## When a value may be called VERIFIED

All of the following must exist:

1. A registered `sourceId` (not a raw URL as the identifier)
2. `retrievedAt`
3. Geographic scope and granularity
4. A unit
5. Enough context (class, methodology, or qualifiers)
6. A stored evidence object the user can inspect

“The number looks typical for the region” is an assumption, not verification.

## Preferred sources

Prefer, in order of *authority*, not automatic precedence:

1. National regulators, ministries, TSO/DSO, official met offices, multilateral owners of a dataset
2. Recognised institutional / scientific datasets (IEC, Global Solar Atlas / ESMAP)
3. Serious technical documentation for equipment parameters
4. Secondary reference material, labelled as such

Do not prefer a stale Tier 1 national figure over a current, in-class, site-specific institutional record.

## Conflicts

- Do not average disagreeing sources.
- Different tariff classes are not a conflict.
- Different solar magnitudes (GHI vs yield) are not comparable.
- Show both candidates. Recommend with a reason. The user decides.

## Stale data

Stale evidence may be displayed with its date. Accepting it requires an explicit action and is recorded as `acceptedStaleEvidence`.

## Assumptions vs evidence

Conceptual templates stay assumptions. Loading a template does not verify its numbers. User input is never overwritten automatically; the UI may only say that a different verified value is available.

## Site studies

Grid strength, short-circuit level, flood, salinity, soiling loss, and project specific yield remain `future-site-study` or `needs-specialized-source` until a fitting source exists.

## Compliance

This layer does not make a project code-compliant, certified, or construction-ready.

## Internal fixtures

`SRC_LOAD_MODEL_6KW` and `SRC_SIWA_ARCHETYPE` are project- or site-scoped fixtures. They must not become country or global defaults. The Siwa 33/11 kV study is not `EGYPT_DEFAULT`. The 6 kW study tariff is not a national default.
