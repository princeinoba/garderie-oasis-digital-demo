# Testing

## Commands

| Gate          | Command                 | Scope                                                         |
| ------------- | ----------------------- | ------------------------------------------------------------- |
| Formatting    | `pnpm format:check`     | all tracked text                                              |
| Lint          | `pnpm lint`             | Next/React/TypeScript rules, zero warnings                    |
| Types         | `pnpm typecheck`        | strict TypeScript                                             |
| Unit          | `pnpm test`             | schemas, state, references, Guide, i18n, URL/index policy     |
| Integration   | `pnpm test:integration` | live route handlers, origin, validation, honeypot, rate limit |
| RLS           | `pnpm test:rls`         | forced RLS, grants, tenant policy and append-only contracts   |
| PWA           | `pnpm test:pwa`         | offline fallback and private-route cache exclusions           |
| Browser       | `pnpm test:e2e`         | public, bilingual, tour, auth/director, responsive journeys   |
| Accessibility | `pnpm test:a11y`        | Axe serious/critical gate                                     |
| Security      | `pnpm security:scan`    | secret/real-data marker scan                                  |
| Production    | `pnpm build`            | optimized Next build                                          |

E2E runs Desktop Chrome and iPhone 13 projects serially for deterministic Windows/CI behavior. The responsive test additionally checks 320x720, 390x844, 768x1024, and 1440x900 for page overflow. Automated accessibility checks supplement, but do not replace, manual keyboard and assistive-technology testing.
