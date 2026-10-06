<!-- layer: records · status: living (while open) · verified: 2026-10-06 -->
# 001 · adopt-standard — gate ledger
| Gate | CHECK | EXPECT | EVIDENCE |
| --- | --- | --- | --- |
| G1 | `bun run /Users/faeez/dev/standard/scripts/standard-check.ts .` | exit 0 | |
| G2 | `npm run lint` | exit 0 | |
| G3 | `npm run build` | exit 0 | |
| G4 | `sh -c "! grep -rIl -i faeez AGENTS.md CLAUDE.md STATE.md docs/slices .github"` | exit 0 | |
