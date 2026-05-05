Refactor the selected code applying the following patterns where appropriate.
Do not change observable behaviour — all existing tests must still pass after refactoring.

**Patterns to apply**
- **Single Responsibility** — if a function does more than one thing, split it
- **Extract Hook** — if a component contains non-trivial stateful logic, move it to a custom hook in `src/hooks/`
- **Replace Magic Values** — move hardcoded strings and numbers to named constants
- **Early Return** — replace nested if/else with guard clauses
- **Avoid Deep Nesting** — flatten callback chains with async/await
- **Pure Functions** — extract side-effect-free logic from components and store actions into `src/utils/`
- **Consistent Naming** — handlers named `handle<Event>`, booleans named `is/has/should`, async functions named with `fetch/load/save` prefix

**Constraints**
- Do not change the public API (exported function signatures, component props)
- Do not switch libraries or introduce new dependencies
- Do not reformat code that is already correct — only change what has a structural reason
- TypeScript strict mode must still pass after changes
- Add a short comment above any non-obvious refactor explaining *why*

Output the refactored code followed by a bullet list of every change made and the pattern it corresponds to.