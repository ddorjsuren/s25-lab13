# CLAUDE.md — AI Agent Instructions for MarkVault

This file tells AI coding assistants (Claude, Copilot, Cursor, etc.) how to work
in this repository. Read it fully before making any changes.

---

## Build & Dev Commands

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server (port 5173)
npm run build        # production build → dist/
npm run preview      # serve production build locally
npm run test         # Vitest unit tests
npm run test:ui      # Vitest with browser UI
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

All CI checks must pass before merging: `lint`, `typecheck`, `test`.

---

## Conventions

### File Structure
src/
components/     # React components (PascalCase.tsx)
hooks/          # Custom hooks (useCamelCase.ts)
store/          # Zustand slices (camelCaseSlice.ts)
db/             # Dexie schema and queries
search/         # FlexSearch index management
pdf/            # PDF generation utilities
utils/          # Pure helper functions
types/          # Shared TypeScript interfaces
### Code Style
- **TypeScript strict mode** — no `any`, no `@ts-ignore` without a comment explaining why
- **Functional components only** — no class components
- **Named exports** — no default exports except for route-level pages
- **Hooks over HOCs** — prefer custom hooks for shared logic
- **No barrel files** — import directly from the source file, not `index.ts` re-exports
- **CSS Modules** — scoped styles per component; no global class names except design tokens
- Prettier config is in `.prettierrc` — run on save or before commit

### Commits
Follow [Conventional Commits](https://www.conventionalcommits.org/):
feat(search): add highlighted match display in sidebar
fix(pdf): correct page break on long code blocks
docs(readme): add usage screenshots
chore(deps): upgrade Dexie to 4.x

### Branch Naming
feat/<short-description>
fix/<short-description>
chore/<short-description>

---

## No-Go Rules

These actions are **forbidden** — do not do them under any circumstances:

1. **Do not delete or mutate `src/db/schema.ts` version history.** Removing old schema
   versions will corrupt existing users' IndexedDB data. Always add a new version block.

2. **Do not add server-side dependencies.** This is a static, local-first app. No Express,
   no Prisma, no server-only Node APIs.

3. **Do not store user data outside IndexedDB.** No `localStorage` for note content,
   no cookies, no remote endpoints.

4. **Do not bypass TypeScript.** Fix the type error; don't cast to `any` or add
   `// @ts-ignore` without a documented reason in the same line.

5. **Do not install dependencies without updating `ARCHITECTURE.md`.** Any new
   third-party library must be reflected in the module table.

6. **Do not write tests that access real IndexedDB.** Use the `fake-indexeddb`
   in-memory adapter for all unit and integration tests.

7. **Do not commit `dist/` or `.env` files.**

---

## Useful Context for AI

- Notes are soft-deleted (`deletedAt` timestamp). Hard delete is not implemented.
- FlexSearch index is rebuilt from Dexie on app startup (`src/search/buildIndex.ts`).
- PDF generation is async and may be slow for >50 notes — show a progress indicator.
- The Zustand store is persisted via `zustand/middleware/persist` backed by Dexie,
  NOT `localStorage`.
