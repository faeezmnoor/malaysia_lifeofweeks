# AGENTS.md — malaysia_lifeofweeks
<!-- standard: 1.1.0 · tier: minimal · ui: yes · db: no · verified: 2026-10-06 -->
<!-- Budget 150 lines. Eight numbered sections plus this header line, this order. Concrete commands and paths; no aspirations; no Claude-only features (those go in CLAUDE.md or .claude/rules/). -->

## 1. What this is
- A "life in weeks" grid for Malaysians: one box per week, shaded for weeks lived.
- Uses Malaysian life expectancy (DOSM 2024 life tables) split by gender and ethnicity.
- Runs entirely in the browser; there is no server and no database.
- Deployment is not recorded in this repository.

## 2. Stack and commands
- Runtime and package manager: Node.js with npm (`package-lock.json`), React 19, Vite 7, Tailwind CSS 4, plain JavaScript (JSX).
- Install: `npm ci` · Dev: `npm run dev` · Test: none · Typecheck: none · Build: `npm run build`
- Full verification (the gate for "done"): `npm run build && bun .standard/standard-check.mjs .`

## 3. Read first, in this order (nothing else unless a brief cites it)
1. STATE.md — what is done, next, blocked
2. The current slice's docs/slices/<id>/brief.md

## 4. Boundaries
- Never: deploy · push to main · read .env* or other secrets · call paid services · force-push, reset --hard, rm -rf
- Generated, do not edit by hand: `dist/`, `package-lock.json`
- README.md follows the portfolio standard and is not agent instructions; edit it only when a brief says so.
- Stay inside the task named in the brief. Report a needed scope change; do not make it.

## 5. Where facts live
- Current state: STATE.md · Owner items: STATE.md §Owner items · Direction: STATE.md §Direction in force
- Slice records: docs/slices/ · Screenshots used by the README: docs/screenshots/
- Product description for readers: README.md

## 6. Working rules
- The repository is public: no personal names, internal queues or private links in any file. The owner is "the owner".

## 7. How work is done here
- Tier: minimal.
- Merge only through a pull request whose CI passed on that exact commit.
- Done means: the full verification command exits 0 at the final commit, and STATE.md is updated.

## 8. Repo map
- `src/App.jsx` — the whole UI and the life-expectancy calculation (about 300 lines)
- `src/main.jsx`, `src/index.css`, `src/App.css` — entry point and styles
- `index.html`, `vite.config.js`, `tailwind.config.js`, `eslint.config.js` — build and lint config
- `public/`, `src/assets/` — static assets
- `docs/screenshots/` — images used by README.md; `docs/slices/` — slice briefs, gates and notes
- `.github/workflows/ci.yml` — CI: `build` (npm ci, build), `standard-check` (vendored lint in `.standard/`) and `eslint` (reported, non-blocking)
