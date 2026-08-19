# Rollback

1. Identify the last verified Production deployment and exact commit SHA in `docs/release-evidence.md` or Vercel deployment history.
2. In Vercel, promote that known-good deployment (or use `vercel rollback <deployment-url>` after confirming the target project).
3. Verify `/`, `/tours-and-registration`, `/sign-in`, protected `/director`, `/api/health`, security headers, manifest, and no-index.
4. Leave the failing commit and deployment intact for investigation; do not delete unrelated deployments or rewrite Git history.
5. If source rollback is required, create a new `revert` commit on a dedicated branch and open a PR. Never reset `main`.

No database rollback is needed in initial deterministic mode. If the optional migration is ever applied, use a reviewed forward migration; do not destructively reset a shared project.
