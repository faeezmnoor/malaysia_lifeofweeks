<!-- layer: knowledge · status: living (while open) · verified: 2026-10-06 -->
# 001 · adopt-standard — notes

## Builder decisions

- verified: README.md does not state a deployment, so STATE.md says deployment is not recorded.
- verified: `npm run build` exits 0; `npm run lint` exits 1 with 13 react-hooks errors in src/App.jsx, which exist on main and are out of scope (no code changes in this slice).
- verified: standard-check exits 1 with four FAIL rows: DESIGN.md, docs/design/, docs/product/flows.md (UI: yes) and, until STATE.md was added, STATE.md. The brief forbids all but a minimal DESIGN.md, so the slice stopped there.
- verified: the AGENTS.md template has eight numbered sections plus the header comment; the lint's "nine headings" counts the header, so no section 9 was added.
- inferred: the CI checkout uses `${{ github.repository_owner }}/standard` instead of the literal owner slug, so the workflow carries no name (gate G4) and still resolves to the same private repository.
- inferred: section 6 of AGENTS.md holds one rule (no personal names in a public repo) with no lesson link, because this repo has no lessons file at Minimal tier.
- inferred: CLAUDE.md is `@AGENTS.md` plus one placeholder line.
