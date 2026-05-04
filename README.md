# MarkVault

> Local-first markdown notes with full-text search, tags, and PDF export.

⚠️ *This README is a draft outline. Sections marked `[TODO]` are placeholders.*

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Architecture](#architecture)
6. [Contributing](#contributing)
7. [License](#license)

---

## Overview

MarkVault is a zero-backend note-taking app that runs entirely in the browser.
Notes are stored in IndexedDB — they persist across sessions without any server,
account, or network connection.

---

## Features

- **CRUD** — Create, edit, delete (trash), and restore notes
- **Markdown editor** — Split-pane live preview, CodeMirror 6
- **Full-text search** — Instant search across all note titles and bodies
- **Tags** — Colour-coded tags, filter sidebar by tag
- **PDF export** — Export single note or tagged collection to PDF
- **Offline-first** — No internet required after initial page load

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9 (or pnpm / yarn)

### Installation

```bash
git clone https://github.com/your-org/markvault.git
cd markvault
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
# Output: dist/
```

---

## Usage

[TODO: Screenshots and short GIF walkthrough]

### Creating a Note
Click **+ New Note** in the sidebar or press `Ctrl+N`.

### Searching
Type in the search bar at the top of the sidebar. Results are highlighted in real time.

### Tagging
Click the **tag icon** in the toolbar while a note is open. Type a tag name and press Enter.

### Exporting to PDF
Click **Export → PDF** in the toolbar. Choose single note or all notes with a given tag.

---

## Architecture

See [`partA/ARCHITECTURE.md`](partA/ARCHITECTURE.md) for the full Mermaid diagram and
module descriptions.

---

## Contributing

[TODO: Contributing guidelines, PR template, code style]

---

## License

MIT — see [LICENSE](LICENSE).
