Generate documentation for the selected code in two parts.

**Part 1 — JSDoc**
Add JSDoc comments to every exported function, hook, and type in the selection.
Each JSDoc block must include:
- One-line summary
- `@param` for every parameter with type and description
- `@returns` with type and description
- `@throws` if the function can throw or reject
- `@example` showing a realistic usage snippet

For React components, document props using JSDoc on the props interface, not on the component function itself.

**Part 2 — README section**
Write a markdown section suitable for pasting into `partA/README.md`.
Structure:
## <Feature Name>
Brief description (2–3 sentences, non-technical user perspective).
### Usage
Step-by-step instructions a non-developer could follow.
### Notes
Any limitations, known edge cases, or relevant configuration.

Do not repeat information already present in ARCHITECTURE.md.