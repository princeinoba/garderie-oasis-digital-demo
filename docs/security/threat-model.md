# Threat model

## Assets

Demo integrity, visitor contact data if persistence is later enabled, staff sessions, tenant separation, approved FAQ provenance, and repository/deployment credentials.

## Main threats and controls

- Cross-site form abuse: Origin and `Sec-Fetch-Site` validation.
- Automated spam: honeypot, bounded payloads, five-request/minute process limit.
- Overcollection: explicit allowlisted schema; prohibited child/medical/identity fields do not exist.
- Session theft: HTTP-only, SameSite=Strict, Secure-in-HTTPS, short-lived demo cookie.
- Cross-tenant access: forced RLS, membership subqueries using `(select auth.uid())`, explicit grants.
- Event tampering: append-only table, no update/delete grants, rejecting trigger.
- AI overreach: local approved corpus, explicit refusals, provenance, confidence, warnings, human approval, no tools or delivery.
- Cache leakage: private routes and APIs excluded from the service worker and marked no-store.
- Supply-chain drift: pinned direct dependencies and frozen-lockfile deployment.

## Residual risk

The demo cookie is intentionally a showcase credential, not production identity. The in-memory rate limiter is per runtime instance. Legal/privacy copy requires professional review before real activation.
