# Source inventory and disposition

Audit date: 2026-08-18
Authorization: `GARDERIE-OASIS-DIGITAL-DEMO-REBUILD-2026-08-18-001`

This repository is an independent, clean-room Garderie Oasis portfolio demonstration. It does not inherit Git history, remotes, deployment identifiers, secrets, or production URLs from either supplied archive.

## Archive inventory

| Archive                | Exact path                                   |              Size | SHA-256                                                            | Entries | Top level        | Nested Git |                  Environment / credential-like files | Generated output |
| ---------------------- | -------------------------------------------- | ----------------: | ------------------------------------------------------------------ | ------: | ---------------- | ---------: | ---------------------------------------------------: | ---------------: |
| NurtureOps AI          | `C:\Users\royce\Downloads\nurtureops-ai.zip` |     563,603 bytes | `F1A86311D73140E2AC2EE21610F33A573D0153DAFA210467C36C6960108C0ADD` |     285 | `nurtureops-ai/` | 44 entries |               One `.env.example`; no values imported |             None |
| Vercel AI SDK snapshot | `C:\Users\royce\OneDrive\Documents\ai.zip`   | 355,515,862 bytes | `FFAA74D14F617CC5311BD57F2D0D9FE06673F74FE6E127F2DE78134553B4E34D` |   8,580 | `ai/`            | 44 entries | 21 example environment templates; no values imported |             None |

Both archives passed an archive-path traversal check. The NurtureOps archive was extracted only to a unique operating-system temporary inspection directory. The AI SDK archive was inventoried in place and remains reference-only.

## NurtureOps source disposition

| Source area                                                                | Disposition           | Decision                                                                                                                                      |
| -------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| App Router, TypeScript, lint, Vitest and Playwright configuration          | REUSE_WITH_ADAPTATION | Preserve the pinned Next.js 16 / React 19 / TypeScript 6 foundation and verification shape; replace product routes and metadata.              |
| Accessible UI primitives and design tokens                                 | REUSE_WITH_ADAPTATION | Preserve semantic patterns, reduced-motion and forced-colours support; rebuild visual design to match the supplied Garderie Oasis references. |
| PWA shell, manifest, offline fallback and service-worker registration      | REUSE_WITH_ADAPTATION | Retain only public-shell caching and explicitly exclude APIs, authenticated pages, AI requests and private data.                              |
| Supabase client boundaries and forced-RLS conventions                      | REUSE_WITH_ADAPTATION | Preserve server/browser separation and deny-by-default conventions; replace the 62-table schema with the bounded tour/FAQ/proposal model.     |
| Typed AI proposal architecture                                             | REUSE_WITH_ADAPTATION | Keep typed, evidenced, non-mutating proposals and deterministic fallback; rename and narrow to Oasis Guide and tour workflows.                |
| Security headers and secret-scanning script                                | REUSE_WITH_ADAPTATION | Retain the defensive baseline and adapt allowed routes/sources.                                                                               |
| Documentation structure                                                    | REUSE_WITH_ADAPTATION | Preserve the documentation taxonomy; rewrite all content for this product.                                                                    |
| NurtureOps marketing identity, copy, routes and logo                       | EXCLUDE               | Product-specific and out of scope.                                                                                                            |
| Attendance, billing, care logs, incidents, reports and guardian operations | EXCLUDE               | Irrelevant to the tour-conversion and director-inquiry scope.                                                                                 |
| Existing 62-table database migration and seed                              | REFERENCE_ONLY        | Useful for RLS and audit conventions only; not imported.                                                                                      |
| NurtureOps `.git`, remote, Vercel identifiers and release evidence         | EXCLUDE               | Separate history and deployment are mandatory.                                                                                                |
| NurtureOps `.env.example` values                                           | EXCLUDE               | A new minimal template is written without importing values.                                                                                   |

No major source area is blocked pending review. No high-confidence real secret, private key, credential, database dump, or real personal dataset was identified during the archive-name and source-pattern audit.

## AI SDK archive disposition

The Vercel AI SDK snapshot is REFERENCE_ONLY. No repository files, `.git` metadata, monorepo configuration, workflows, examples, or workspace packages are imported. The application uses the already pinned published `ai` package only where the provider-neutral boundary is useful; deterministic approved-content retrieval remains the default without a credential.

## Visual references

The seven supplied image boards are authoritative design references for composition, hierarchy, colour, typography, navigation, public pages, the three-step tour form, authentication/onboarding, and director surfaces. They are not shipped as site content and are not treated as proof of real operations, availability, fees, staff, or affiliation.
