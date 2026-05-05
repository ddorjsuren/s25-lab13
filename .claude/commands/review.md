Review the selected code or file for security vulnerabilities and robustness issues.

Follow this checklist:

**Security (OWASP-aligned)**
- Injection risks: are any user inputs passed unsanitised into queries, eval, or dynamic HTML?
- Broken access control: are there any missing permission checks?
- Sensitive data exposure: are secrets, tokens, or PII logged or stored in plaintext?
- XSS: is user-supplied content rendered as raw HTML anywhere?
- Insecure dependencies: flag any imports from packages with known CVEs if visible.

**Robustness**
- Are all async operations wrapped in try/catch with meaningful error messages?
- Are edge cases handled: empty input, null/undefined, empty arrays, network failure?
- Are TypeScript types strict — no implicit `any`, no non-null assertions without justification?
- Are there any unhandled promise rejections?
- Does the code fail loudly and early rather than silently swallowing errors?

For each issue found, output:
1. Severity: Critical / High / Medium / Low
2. Location: file + line range if known
3. Description of the issue
4. Concrete fix with a code snippet

If no issues are found, say so explicitly.