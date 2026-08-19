<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Garderie Oasis project rules

- This repository is an independent synthetic portfolio demonstration, not a real operator, registry, waitlist, booking, or admission system.
- Preserve explicit City of Ottawa registry separation and the non-affiliation disclaimer.
- Never add real personal data, real staff identities, real children, secrets, imported `.git`, or copied operator assets.
- Initial Production mode must remain deterministic: no public persistence, email/SMS delivery, remote AI, analytics, or unattended mutations.
- Keep tour fields privacy-minimized and use the shared Zod contract on client and server.
- Keep director routes protected/no-store and service-worker caching restricted to public static shell assets.
- Database changes require forced RLS, explicit grants, tenant-scoped policies, indexed foreign keys, and updated RLS tests.
- AI output must show provenance/warnings, refuse sensitive/operational claims, and require explicit human review.
- Run `pnpm verify`, `pnpm test:e2e`, and `pnpm test:a11y` before release; never claim an unrun gate.
