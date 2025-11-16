# Agentic Workflow Usage

This repo includes Windsurf Workflows under `.windsurf/workflows/`.

## Invoke
- Start with `/pm-orchestrated` in Cascade.
- To parallelize: open additional Cascade instances/panels and run lane workflows:
  - `/lane-server`
  - `/lane-ui`
  - `/lane-config`
  - `/lane-docs`

## Principles
- PM-first planning with a dependency graph (DAG).
- Domain agents own specific directories; small, buildable patches.
- File-level locks by default; escalate cautiously.
- CI gates: lint, typecheck; build before merge.

## Notes
- Workflows execute sequentially; parallelism comes from running lanes concurrently in separate Cascade instances.
- Keep cross-file changes atomic and minimize blast radius.
