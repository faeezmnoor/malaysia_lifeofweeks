<!-- layer: records · status: living (while open) · verified: 2026-10-06 -->
# 001 · adopt-standard — gate ledger
| Gate | CHECK | EXPECT | EVIDENCE |
| --- | --- | --- | --- |
| G1 | `bun .standard/standard-check.mjs .` | exit 0 | |
| G2 | `npm run build` | exit 0 | |
| G3 | `sh -c "! grep -rIl -e /Us[e]rs/ -e /ho[m]e/ AGENTS.md CLAUDE.md STATE.md docs .github"` | exit 0 | |
| G4 | `sh -c "! grep -rIl -i fa[e]ez AGENTS.md CLAUDE.md STATE.md docs .github"` | exit 0 | |
