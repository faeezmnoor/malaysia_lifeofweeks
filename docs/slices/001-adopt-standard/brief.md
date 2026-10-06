<!-- layer: knowledge · status: living (while open) · verified: 2026-10-06 · budget: 200 lines -->
# 001 · adopt-standard — brief (context pack)
Source: /Users/faeez/dev/standard/STANDARD.md §3 (file map), §4 (Minimal tier), §6 (AGENTS.md), §7 (STATE.md), §12 (lint), §13 (runbook, Minimal steps 2, 3, 4, 9, 10, 12, 13). Templates: /Users/faeez/dev/standard/templates/.

Goal: make this repository conform to the house standard at Minimal tier, UI: yes, DB: no, so that `bun run /Users/faeez/dev/standard/scripts/standard-check.ts .` exits 0 and a fresh agent can resume it cold from AGENTS.md and STATE.md.
In scope: AGENTS.md (nine sections, ≤ 150 lines, header `standard: 1.0.0 · tier: minimal · ui: yes · db: no · verified: <date>`), CLAUDE.md (`@AGENTS.md` + at most 20 lines), STATE.md (≤ 80 lines; Minimal keeps owner items inside it), a GitHub Actions workflow .github/workflows/ci.yml that runs `npm ci`, `npm run lint`, `npm run build` and the standard-check lint, this slice's gates.md and notes.md, the cold-start test record. The README.md stays as it is (portfolio standard; never agent instructions). LICENSE exists (MIT).
Out of scope: any change to src/, index.html, styles, the README's prose or screenshots; DESIGN.md (a 40-line DESIGN.md is allowed only if the lint requires it at Minimal with UI: yes; check the lint's output first and do the minimum that passes); docs/README.md (not required at Minimal); Linear (none for this repo).
Stop if: the lint requires a file the brief forbids; anything would put a person's name into the repo (public repository: no owner names anywhere, the owner is "the owner").

## Rules that apply (copied in, with source)
- Public repository: no owner names, no internal queues, no decision-page links (STANDARD.md §1 constraints; §12 Hygiene).
- AGENTS.md: concrete commands and paths, no aspirations, no Claude-only terms (slash commands, hooks, model names) (§6).
- STATE.md verified line: date, commit, evidence (§7). Write it from the live repo: what is deployed is unknown to you; say "deployment: not recorded; Vercel per README if stated, else none" only if the README says so.
- Every docs/ file opens with the one-line header comment (§12).
- Merge only through a pull request with CI green on the exact head (§6 rule 7). Work on branch `slice/001-adopt-standard`.
- CI lint access: the standard repo is private. The workflow's lint step checks out faeezmnoor/standard with `token: ${{ secrets.STANDARD_TOKEN }}` and runs the lint; until the owner adds that secret the step will fail, so make that step a separate job named `standard-check` and leave the build job independent. Record "add STANDARD_TOKEN secret" as an owner item in STATE.md in generic wording ("the owner adds the STANDARD_TOKEN secret"). (Lesson for LEARN: the lint needs a public distribution path.)

## Files to read (only these)
- /Users/faeez/dev/standard/STANDARD.md:1-140 (goals, layers, map, tiers, entry file), and §12–§13 by heading
- /Users/faeez/dev/standard/templates/AGENTS.md, CLAUDE.md, STATE.md
- package.json, README.md (first 40 lines), eslint.config.js, vite.config.js, .gitignore in this repo

## Carry-overs
- From the standard's own adoption: the lint requires every docs/ file to carry the header; decision records need it after frontmatter.

## Decisions already made (do not reopen)
- Tier Minimal, UI yes, DB no (decision 0001). Repo file is the truth for state (0003). Public and private are different surfaces (0000).

## Report
Fixed format, under 300 words: Verdict · Commits · Gates met/total · Findings · Decisions I made (verified/inferred) · Needs the owner.
