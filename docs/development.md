# Development

Use Node 24 and pnpm 11. Copy `.env.example` to `.env.local` only when testing optional services; deterministic mode requires no values.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Public content lives in `components/public` and `lib/i18n`. The shared tour contract is `domain/tours.ts`; keep client and server validation aligned. Protected demo data belongs in `lib/demo` and must use `.synthetic.invalid`, 555 numbers, and clearly fictional names.

Do not add real children/families/staff, copied operator assets, a custom domain, external message delivery, remote AI, or public database writes without a separately reviewed change. Read `AGENTS.md` and the bundled Next.js 16 docs before framework changes.
