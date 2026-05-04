# AI Session Log — MarkVault

Condensed record of planning conversations used to produce the initial project documents.

---

## Session 1 — Stack Research & Comparison
**Date:** 2026-05-02
**Tool:** Claude Sonnet 4

**Summary:**
- Generated and compared three stack options (React/Vite, Next.js/sql.js, Vue/Tauri).
- FlexSearch was identified as superior to Fuse.js for this use case after reviewing
  benchmark data.
- Dexie.js selected over raw IndexedDB API and sql.js (WASM) for its migration system.
- `@react-pdf/renderer` chosen over `jspdf` for vector output quality.

**Key decisions made:**
- Stack A (React + Vite + Dexie + FlexSearch) selected
- No WASM dependencies in v1
- Static site deployment target confirmed

---

## Session 2 — Architecture Design
**Date:** 2026-05-02
**Tool:** Claude Sonnet 4

**Summary:**
- Designed component hierarchy: App Shell → Sidebar + Editor + Preview + Toolbar.
- Defined Zustand store shape and Dexie schema (`notes`, `tags` tables).
- Mapped data flow: Editor emits → Store updates → Dexie persists → FlexSearch indexes.
- Identified FlexSearch index rebuild strategy: full rebuild on app hydration,
  incremental update on each save.

**Key decisions made:**
- Zustand persist middleware backed by Dexie (not localStorage)
- CodeMirror 6 for editor (rejected Monaco as too heavy for this use case)
- Synced scroll between editor and preview panes is in scope for v1

---

## Session 4 — Documentation Generation
**Date:** 2026-05-02
**Tool:** Claude Sonnet 4

**Summary:**
- Generated `STACK-COMPARISON.md`, `README.md` (draft), `CLAUDE.md`, and this session log.
- CLAUDE.md no-go rules were derived from common failure modes observed in AI-assisted codebases (schema mutation, localStorage misuse, `any` casting).
- README left as outline pending screenshots and GIF walkthrough.
