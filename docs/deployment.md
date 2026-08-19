# Deployment

Target: Vercel, linked only to `princeinoba/garderie-oasis-digital-demo`. Build with `pnpm install --frozen-lockfile && pnpm verify`. Supabase and AI variables remain unset for initial deterministic production mode.

Canonical URLs use `NEXT_PUBLIC_APP_URL` when explicitly configured, otherwise the exact `VERCEL_URL`, then the project Production host. The repository does not assume a custom domain.

Indexing is an explicit environment decision: local and Vercel Preview builds emit `noindex` and disallow crawling; only `VERCEL_ENV=production` emits `index, follow`, allows crawling and advertises the exact sitemap. The site remains prominently labelled as an independent, non-affiliated portfolio demonstration.

Workflow: verify locally -> commit/push feature branch -> create draft PR -> deploy/inspect Preview -> record URL/ID -> deploy the exact verified commit to Production -> verify routes, canonical/robots, headers, mobile, accessibility, health, manifest and offline page -> record Production URL/ID/SHA in the PR and handoff.

Do not attach or modify a custom domain. Do not import `.vercel`, archive Git metadata or old deployment IDs. HTTPS/HSTS are Production-only; APIs and protected routes must remain no-store.
