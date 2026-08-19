# Garderie Oasis Digital Experience

Independent, bilingual childcare portfolio demonstration for exploring public program information, a privacy-minimized three-step tour preview, bounded Oasis Guide answers, and a protected synthetic director workflow.

> This is not a real childcare operator, application, waitlist, booking system, or Garderie Oasis service. All people, inquiries, fees, schedules, and operational records are fictional. Use the City of Ottawa's official Child Care Registry and Waitlist for a real childcare application.

## Start locally

Requirements: Node 24 and pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. Director demo credentials are displayed on `/sign-in`: `director@synthetic.invalid` / `oasis-demo`.

## Verification

```bash
pnpm verify
pnpm test:e2e
pnpm test:a11y
```

The initial release is deterministic and safe without Supabase or an AI-provider credential. Tour submission returns a reference and confirmation preview but does not persist or deliver anything. The Supabase migration documents a future bounded model with forced RLS; it is not required for local or production demo mode.

## Architecture

- Next.js 16 App Router, React 19, TypeScript 6
- bilingual client language context with semantic server-rendered routes
- Zod-validated, rate-limited, same-origin tour API
- strict demo cookie protecting director routes
- deterministic approved-content Oasis Guide and human-reviewed proposal previews
- installable public PWA shell; APIs, auth, director routes, and user data are excluded from caching
- optional Supabase boundary with explicit grants and forced tenant-scoped RLS

See [architecture](docs/architecture.md), [development](docs/development.md), [testing](docs/testing.md), and [deployment](docs/deployment.md).
