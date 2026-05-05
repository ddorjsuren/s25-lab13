Generate a thorough test suite for the selected code following the testing pyramid.

**Unit tests** (most numerous)
- Test each function/hook in isolation with all inputs mocked
- Cover: happy path, empty input, null/undefined, maximum boundary, minimum boundary
- For async functions: test resolved and rejected promise paths
- For Zustand store actions: test state transitions directly

**Integration tests** (moderate)
- Test component + store together using React Testing Library
- Test Dexie interactions using the `fake-indexeddb` in-memory adapter — never real IndexedDB
- Test the FlexSearch index update cycle: save note → index updated → search returns result

**Edge cases to always consider**
- Notes with empty body or empty title
- Tags array with zero items, one item, duplicate items
- Search query with special regex characters (e.g. `(`, `[`, `*`)
- PDF export triggered with zero notes selected
- Dexie write failure (simulate with a mock rejection)
- Concurrent rapid saves (debounce boundary)

**Format**
- Use Vitest + React Testing Library
- One `describe` block per function or component
- Test names follow: `it('should <behaviour> when <condition>')`
- No `any` in test files
- No real network calls or real IndexedDB