Perform an OWASP Top 10 (2021) security audit on the selected file or feature.

For each of the ten categories, assess whether the code is affected and assign a status:
✅ Not applicable or mitigated | ⚠️ Partial risk | ❌ Vulnerable

**Categories to check**
1. A01 Broken Access Control — are operations gated on correct conditions?
2. A02 Cryptographic Failures — is sensitive data (if any) encrypted at rest/transit?
3. A03 Injection — are inputs sanitised before use in dynamic contexts?
4. A04 Insecure Design — are security requirements considered in the design itself?
5. A05 Security Misconfiguration — are defaults safe? Are dev tools/logs disabled in prod?
6. A06 Vulnerable Components — are dependencies up to date with no known CVEs?
7. A07 Auth Failures — are sessions/tokens (if any) handled correctly?
8. A08 Software & Data Integrity — is imported/external data validated before use?
9. A09 Logging & Monitoring — are errors logged without leaking sensitive info?
10. A10 SSRF — are there any outbound requests that could be redirected by user input?

For each ⚠️ or ❌ finding:
- Quote the relevant code
- Explain the attack vector in one sentence
- Provide a concrete remediation with a code example

End with a summary risk rating: Low / Medium / High / Critical.
