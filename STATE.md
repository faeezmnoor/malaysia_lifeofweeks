# STATE — malaysia_lifeofweeks
<!-- layer: state · status: living · budget: 80 lines -->
verified: 2026-11-11 at 8eddb77 by npm run build exit 0 and the 1.6.0 lint at 0 FAIL, 0 WARN; CI run list and PR list read (PRs #1, #2 merged, none open)

## Now
- A browser-only React + Vite life-in-weeks app; deployment is not recorded in the repo.
- Adopted the house standard at Minimal tier (PR #1, merged 2026-10-06): AGENTS.md, CLAUDE.md, STATE.md, CI with build and standard-check required on main.
- 2026-11-11: re-applied standard 1.6.0 (lint bundle, declared version, harness-audit line in the AGENTS.md header); local audit in docs/records/audit-2026-11.md; lint 0 FAIL. Pending the pull request.
## Next
- Nothing planned; the project is complete. Future work opens a slice under docs/slices/.
## Blocked
- reported defect: `npm run lint` fails with 13 react-hooks errors in src/App.jsx; out of scope for the documentation migration; the owner decides whether to fix

## Direction in force
- Public portfolio repo, README under the portfolio standard.

## Owner items
- Decide whether to fix the 13 react-hooks lint errors in src/App.jsx (`npm run lint`); a code change, not part of a documentation pass.

## Measurements
| Slice | Builder tokens | Reviewer tokens | Fix rounds |
| --- | --- | --- | --- |
| 001-adopt-standard | ~73k + ~58k (2 attempts) | ~61k + ~63k (2 rounds) | 1 |
Owner minutes this week: 0. Last cold-start test: 2026-10-06, pass (not re-run in the 1.6.0 re-apply).
