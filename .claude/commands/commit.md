Generate a Conventional Commits-formatted commit message for the current staged changes.

**Format**
<type>(<scope>): <short summary in imperative mood, ≤72 chars>
<body — what changed and why, not how, wrapped at 72 chars>
<footer — breaking changes or issue references if applicable>
Allowed types

feat — new feature visible to the user
fix — bug fix
refactor — code change with no behaviour change
test — adding or updating tests
docs — documentation only
chore — build, deps, config
perf — performance improvement
style — formatting, lint fixes

Allowed scopes for this repo
editor, search, tags, pdf, db, store, sidebar, toolbar, preview, auth, build, deps
Rules

Summary is imperative mood ("add", "fix", "remove" — not "added" or "fixes")
No period at end of summary line
Body explains why, not what (the diff shows what)
If the change is a breaking change, add BREAKING CHANGE: in the footer

Output only the commit message, no explanation around it.

---

