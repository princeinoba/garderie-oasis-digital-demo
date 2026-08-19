# Architecture

## Runtime

Next.js App Router separates public, auth, API, and protected director surfaces. Static copy and synthetic records are module-level data. Interactive components are client boundaries only where state, forms, or language switching require them.

## Request path

1. Public routes render authoritative demo content.
2. The tour form validates each step locally with the shared Zod schema.
3. `/api/tours` enforces same-origin checks, a honeypot, an in-memory rate limit, and full schema validation.
4. A deterministic reference and not-sent preview are returned; no database or delivery provider is called.
5. `/proxy.ts` gates all `/director/**` requests using a strict, HTTP-only, two-hour demo cookie.

## Optional services

Supabase clients are isolated by browser/server/admin boundary. The schema is future-facing and deny-by-default. AI SDK is pinned but no remote model is called in initial mode; Oasis Guide retrieves only approved local answers.

## PWA and caching

The service worker caches only the offline document and generated icon. Navigation can fall back offline, while API, sign-in, and director paths bypass the worker. Security headers are configured centrally in `next.config.ts`.
