# Release evidence

Release date: 2026-08-18

## Local gates

| Gate             | Result                                            | Evidence                                                                                                          |
| ---------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Format/lint/type | Passed                                            | `pnpm verify`                                                                                                     |
| Unit             | 12 passing                                        | Vitest schemas, state machine, Oasis Guide, i18n, deployment URL/index policy                                     |
| Integration      | 5 passing                                         | Tour route origin, validation, honeypot and rate-limit contracts                                                  |
| RLS              | 4 passing                                         | Forced RLS, grants, tenant isolation and append-only contract                                                     |
| PWA              | 2 passing                                         | Offline fallback and private-route cache exclusions                                                               |
| E2E/responsive   | 16 passing, 2 intentional duplicate-project skips | Desktop Chromium, iPhone 13 and 320/390/768/1440 overflow checks                                                  |
| Accessibility    | Passed                                            | Axe: zero serious/critical findings on home, tour, privacy, accessibility and director; keyboard traversal passed |
| Security scan    | Passed                                            | Repository secret, real-data and unsafe-storage marker scan                                                       |
| Production build | Passed                                            | Next.js optimized build; 33 generated route entries                                                               |

## Lighthouse 13.4.1

Optimized localhost production audit with the Vercel Production indexing branch enabled:

| Performance | Accessibility | Best Practices | SEO |
| ----------: | ------------: | -------------: | --: |
|          97 |           100 |            100 | 100 |

FCP 0.8 s; LCP 2.5 s; TBT 80 ms; CLS 0; Speed Index 0.8 s. The full raw report is ignored under `.evidence/`; the committed score/metric summary is `docs/release-assets/lighthouse-summary.json`. Lighthouse wrote the complete report before Chrome Launcher reported a Windows temporary-profile cleanup EPERM.

## Route and security checks

All 14 required public routes, sign-in, forgot-password, invitation, onboarding, manifest, robots, sitemap, health and offline fallback returned 200 from the optimized server. Unauthenticated `/director` returned 307 to `/sign-in?next=%2Fdirector`. Root responses included CSP, HSTS, `DENY` framing, nosniff, strict referrer, permissions, COOP and CORP headers. `/api/health` returned `Cache-Control: no-store`.

Local and Vercel Preview builds are no-index. Only `VERCEL_ENV=production` enables `index, follow`, an allow rule, and the exact deployment sitemap. Every public route emits a route-specific canonical composed with the configured or assigned Vercel URL.

## Responsive artifacts

- `docs/release-assets/home-1440.png`
- `docs/release-assets/home-390.png`
- `docs/release-assets/tour-390.png`
- `docs/release-assets/director-1440.png`

## Deployment identifiers

Preview URL/ID, Production URL/ID and exact commit SHA are recorded in the draft pull request and final handoff after external deployment. Keeping those identifiers outside this commit avoids changing the commit after Production is verified. No custom domain is changed.
