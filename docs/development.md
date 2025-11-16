# Development Guide

## Scripts
- `npm run dev` — start dev server
- `npm run build` — build
- `npm start` — run production build
- `npm run lint` — lint

## TypeScript
- Strict mode enabled. Fix types rather than using `any`.

## Styling
- Tailwind 4 configured in `tailwind.config.ts`
- Fonts via `next/font` and CSS variables in `layout.tsx`

## Patterns
- Use Server Actions for server-side mutations
- Keep shared UI in `src/components`
- Keep data/model logic in `src/server`

## PR checklist
- Lint clean
- No unused code
- Update docs if behavior/config changes
