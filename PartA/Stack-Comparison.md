# Stack Comparison

Three viable stacks were offered.

---

## Option A — React + Vite + Dexie + FlexSearch

| Dimension | Assessment |
|---|---|
| **Build tooling** | Vite — sub-second HMR, native ESM, minimal config |
| **State** | Zustand — tiny (~1 kB), no boilerplate, easy persistence middleware |
| **Persistence** | Dexie.js — clean promise API over IndexedDB, schema migrations built-in |
| **Search** | FlexSearch — fastest JS full-text library, runs entirely in-memory |
| **Editor** | CodeMirror 6 — extensible, accessible, active ecosystem |
| **PDF** | `@react-pdf/renderer` — React component model, no headless browser needed |
| **Bundle size** | ~180 kB gzipped (estimated) |
| **Learning curve** | Low–Medium |

---

## Option B — Next.js + SQLite (via sql.js) + Fuse.js

| Dimension | Assessment |
|---|---|
| **Build tooling** | Next.js App Router — powerful but heavy for a pure-client app |
| **State** | React Context + useReducer — verbose, re-render prone at scale |
| **Persistence** | sql.js (WASM SQLite) — full SQL but ~1 MB WASM binary, complex persistence |
| **Search** | Fuse.js — fuzzy search, but significantly slower than FlexSearch at scale |
| **PDF** | `jspdf` + `html2canvas` — screenshot-based, inconsistent fidelity |
| **Bundle size** | ~420 kB gzipped (estimated) |
| **Learning curve** | Medium–High |

---

## Option C — Vue 3 + Tauri (desktop) + PouchDB

| Dimension | Assessment |
|---|---|
| **Build tooling** | Vite (same) — good |
| **State** | Pinia — excellent, but team is more React-fluent |
| **Persistence** | PouchDB — CouchDB-compatible, offline-first, overkill for v1 |
| **Search** | PouchDB-find — limited full-text, requires plugin |
| **PDF** | Native OS print dialog via Tauri — simple but not programmable |
| **Bundle size** | Rust binary + webview — fast runtime, but Tauri adds build complexity |
| **Learning curve** | High (Rust toolchain, Tauri APIs) |

---

## Сонголт 
Option A — React + Vite + Dexie + FlexSearch
1. React болон Vite арай илүү танил
2. Dexie.js нь нөгөө хоёр сонголтоосоо ойлгоход хялбар, түүнээс гадна хурдан байсан.
3. Bundle Size нь option C-д тэмдэглэгдээгүй байгаа боловч A нь хамгийн бага. Хурдан бөгөөд хэрэглэхэд "авсаархан" байх нь offline app-д чухал гэж үзсэн. 

## Сонгоогүй шалтгаан
Option B- Next.js нь offline app-ыг хэтэрхий хүнд болгоно, сервер биш тул хэрэгцээгүй.
Option C- Rust-ын талаархи мэдлэг маш сул тул бичигдсэн кодыг ойлгохгүй байх боломжтой. PouchDB нь offline нөхцөлд зориулагдсан боловч хайлтын функц нь plugin шаардлагатай.
