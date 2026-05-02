# ADR 0001 — Frontend Stack Selection

| Field | Value |
|---|---|
| **Date** | 2026-05-02 |
| **Status** | Accepted |
| **Deciders** | Д. Доржсүрэн |

---

## Агуулга

Тэмдэглэл хадгалах browser дээр суурилсан local орчинд ажиллах app хөгжүүлнэ. Энэ app нь:
- Сервер ашиглалгүй өгөгдлийг сейшн хооронд хадгалах.
- Бүх тэмдэглэлийн текстийн дундаас хайлт хийх.
- Markdown формат дэмжих.
- PDF-рүү export-лох

Гурван стак-ийг бодолцож үзсэн.(`partA/STACK-COMPARISON.md`).

---

## Шийдэл

**React 18 + Vite 5 + Zustand + Dexie.js + FlexSearch + CodeMirror 6 + @react-pdf/renderer** стакийг статик сайт хэлбэрээр хөгжүүлнэ.


| Concern | Chosen solution | Why |
|---|---|---|
| UI framework | React 18 | Team fluency; large ecosystem |
| Build tool | Vite 5 | Fast HMR; native ESM; minimal config |
| State management | Zustand | Minimal boilerplate; easy persist middleware |
| Persistence | Dexie.js | Clean API; versioned migrations; no WASM overhead |
| Full-text search | FlexSearch | Fastest JS full-text library; in-memory; no WASM |
| Markdown editor | CodeMirror 6 | Extensible; accessible; actively maintained |
| PDF generation | @react-pdf/renderer | React component model; vector output; no headless browser |

---

## Алтернатив шийдэл

- **Next.js + sql.js** — WASM binary (~1 MB) нь хэтэрхий том, серверий primitive хэрэгслүүд ямар нэгэн ашиггүй.
- **Vue 3 + Tauri** — Rust-ийн төвөгтэй холбоо, PouchDB нь тухайн төсөлд overkill.

---

## Үр дүн

### Эерэг
- Backend-гүй
- Статик build GitHub Pages, Netlify зэрэг ямар ч CDN-д ажиллана.
- Offline бүрэн төгс ажиллагаатай.
- FlexSearch нь 10 000+ тэмдэглэлүүдий гацалтгүйгээр хайна

### Сөрөг
- IndexedDB нь storage quota-тай (~60% of free disk); Маш том тэмдэглэлийн цуглуулгууд энэ хязгаарт тулж болзошгүй. 
- `@react-pdf/renderer` бүх CSS элементүүдийг дэмждэггүй. Нарийн төвөгтэй тэмдэглэлийн зохион байгуулалтуудыг PDF-д хувиргахад override хийх шаардлагатай.
- Sync байхгүй — browser storage-г цэвэрлэвэл тэмдэглэлүүдээ алдана.
