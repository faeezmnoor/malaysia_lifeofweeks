<!-- layer: records · status: record · verified: 2026-10-06 -->
# Review: 001 adopt-standard (correctness and public hygiene)

Range: main...HEAD at 3e906fc. Tier B.

## Findings
- BLOCKER: AGENTS.md section 2, the "Full verification" line is corrupted. It contains the text "Full verification" three times, an unclosed backtick, and a pasted `npm run lint && npm run build` that fails by the repo's own account. notes.md says the intended command is `npm run build && bun .standard/standard-check.mjs .`. The "done" gate is therefore unreadable and wrong. The lint does not catch it (exit 0).
- MINOR: AGENTS.md line 3 comment says "Nine sections"; the file has eight. Template text, harmless.
- MINOR: STATE.md verified line names 34cad17, which exists on the branch but is not head (3e906fc); two later commits touched STATE.md and notes only. Evidence is stated.
- MINOR: ci.yml triggers on every push (not only main) plus pull_request; works, runs twice on PR branches.
- MINOR: CI `eslint` job passing even if `continue-on-error` is removed is not caught by the lint (see planted defects).

## Verified clean
- Hygiene: no person name, absolute path or queue/decision link in the diff. README.md, LICENSE, src/, index.html and other configs untouched.
- Stack and repo map match package.json and src/. Build exits 0. `npm run lint` fails with 13 errors, as STATE.md says.
- STATE.md: 26 lines; deployment "not recorded" is true (README has no live URL); Blocked names no one; Owner items none.
- ci.yml: three jobs as briefed, job-level continue-on-error on eslint, standard-check runs `bun .standard/standard-check.mjs .`, no secrets, majors pinned (v4, v2).
- standard-check exit 0; gates G3 and G4 exit 0.

## Cold-start (Goal 1), from AGENTS.md and STATE.md only
- Live: a browser-only React life-in-weeks app; deployment is not recorded.
- Next: nothing planned; slice 001 is open and unmerged.
- Owner: nothing, apart from deciding whether to fix 13 lint errors (Blocked).
Result: enough for state, but AGENTS.md's done-command is unusable until the blocker is fixed.

## Planted defects
- Name in STATE.md: lint survived (exit 0); grep gate G4 caught it.
- Absolute path in AGENTS.md: lint H1 caught it; G3 caught it.
- continue-on-error removed: survived both lint and gates.


## Round 2
Re-run at c4343d5. Results:
- standard-check: 0 FAIL, 0 WARN, exit 0. `npm run build`: exit 0.
- Gate G4: exit 0. Gate G3: failed on this review file (it quoted a home-path pattern in round 1); the quote is removed and G3 now exits 0.
- AGENTS.md line 14 is the single command `npm run build && bun .standard/standard-check.mjs .`; header comment says eight sections plus the header.
- STATE.md verified line names cea9b72 (on the branch) with its evidence.
- ci.yml triggers: pull_request and push to main only.
- Still open: the eslint job's continue-on-error is not guarded by any lint or gate (accepted, noted in round 1).

VERDICT: APPROVE
