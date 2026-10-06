<!-- layer: knowledge · status: living (while open) · verified: 2026-10-06 · budget: 200 lines -->
# 001 · adopt-standard — brief (context pack)
Source: $STANDARD_DIR/STANDARD.md (the house standard checkout; set STANDARD_DIR to its path) §3 (file map), §4 (Minimal tier), §6 (AGENTS.md), §7 (STATE.md), §12 (lint), §13 (runbook, Minimal steps 2, 3, 4, 9, 10, 12, 13). Templates: $STANDARD_DIR/templates/.

Goal: make this repository conform to the house standard at Minimal tier, UI: yes, DB: no, so that `bun .standard/standard-check.mjs .` (the vendored lint bundle) exits 0 and a fresh agent can resume it cold from AGENTS.md and STATE.md.
In scope: AGENTS.md (eight numbered sections plus the header line, ≤ 150 lines, header `standard: 1.0.0 · tier: minimal · ui: yes · db: no · verified: <date>`), CLAUDE.md (`@AGENTS.md` + at most 20 lines), STATE.md (≤ 80 lines; Minimal keeps owner items inside it), a GitHub Actions workflow .github/workflows/ci.yml with three jobs: `build` (npm ci, npm run build; required), `standard-check` (setup Bun, `bun .standard/standard-check.mjs .`; required), and `eslint` (npm run lint; continue-on-error: true, because the existing src/App.jsx has 13 react-hooks errors that are out of scope and are reported, not fixed), the vendored lint bundle copied from the standard repo's dist/ into `.standard/standard-check.mjs` and `.standard/VERSION`, this slice's gates.md and notes.md, the cold-start test record. The README.md stays as it is (portfolio standard; never agent instructions). LICENSE exists (MIT).
Out of scope: any change to src/, index.html, styles, the README's prose or screenshots; DESIGN.md (not required at Minimal even with UI: yes, by the LEARN ruling after this migration's first attempt); docs/README.md (not required at Minimal); Linear (none for this repo).
Stop if: the lint requires a file the brief forbids; anything would put a person's name into the repo (public repository: no owner names anywhere, the owner is "the owner").

## Rules that apply (copied in, with source)
- Public repository: no owner names, no internal queues, no decision-page links (STANDARD.md §1 constraints; §12 Hygiene).
- AGENTS.md: concrete commands and paths, no aspirations, no Claude-only terms (slash commands, hooks, model names) (§6).
- STATE.md verified line: date, commit, evidence (§7). Write it from the live repo: what is deployed is unknown to you; say "deployment: not recorded; Vercel per README if stated, else none" only if the README says so.
- Every docs/ file opens with the one-line header comment (§12).
- Merge only through a pull request with CI green on the exact head (§6 rule 7). Work on branch `slice/001-adopt-standard`.
- CI lint: the lint runs from the vendored bundle `.standard/standard-check.mjs`; no secret and no checkout of the standard repo. The bundle's version must be within one minor of the declared standard version (lint rule S9).
- Public repository: no absolute home paths in any committed file (lint rule H1); use relative paths or `$STANDARD_DIR`.
- The 13 existing ESLint errors in src/App.jsx are recorded in STATE.md under Blocked as a reported defect for the owner; this slice does not touch code (portfolio scope rule: docs only, report defects).

## Files to read (only these)
- $STANDARD_DIR/STANDARD.md:1-140 (goals, layers, map, tiers, entry file), and §12–§13 by heading
- $STANDARD_DIR/templates/AGENTS.md, CLAUDE.md, STATE.md
- package.json, README.md (first 40 lines), eslint.config.js, vite.config.js, .gitignore in this repo

## Carry-overs
- From the standard's own adoption: every docs/ file carries the header line.
- From this slice's first attempt: the lint required design files at Minimal (fixed in the standard, slice 003); the brief carried absolute paths (fixed here); the standard repo is private so CI vendors the bundle.

## Decisions already made (do not reopen)
- Tier Minimal, UI yes, DB no (decision 0001). Repo file is the truth for state (0003). Public and private are different surfaces (0000).

## Report
Fixed format, under 300 words: Verdict · Commits · Gates met/total · Findings · Decisions I made (verified/inferred) · Needs the owner.
