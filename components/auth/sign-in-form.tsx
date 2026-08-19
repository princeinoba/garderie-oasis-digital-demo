"use client";

import { useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowRight, GraduationCap, HeartHandshake, ShieldCheck } from "lucide-react";

export function SignInForm({ nextPath = "/director" }: { nextPath?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const openDirectorWorkspace = async () => {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience: "director" }),
      });
      const body = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok) throw new Error(body.error ?? "Unable to open the Director workspace.");
      router.push(nextPath as Route);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to open the Director workspace.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="auth-form auth-access-card" aria-labelledby="shared-access-title">
      <div className="auth-form-heading">
        <p className="eyebrow">Shared authentication design</p>
        <h1 id="shared-access-title">Choose a demo experience</h1>
        <p>
          One safe entry point opens fictional, role-scoped views. Public signup and real account
          creation are disabled.
        </p>
      </div>

      <div className="auth-safety-callout">
        <ShieldCheck aria-hidden="true" />
        <div>
          <strong>No credentials needed</strong>
          <span>Never enter real email addresses, passwords, child information, or secrets.</span>
        </div>
      </div>

      {error && (
        <p className="error-summary" role="alert">
          {error}
        </p>
      )}

      <div className="auth-workspace-links">
        <button type="button" onClick={openDirectorWorkspace} disabled={pending}>
          <ShieldCheck aria-hidden="true" />
          <span>{pending ? "Opening Director workspace…" : "Director workspace"}</span>
          <ArrowRight aria-hidden="true" />
        </button>
        <Link href="/onboarding">
          <GraduationCap aria-hidden="true" />
          <span>Educator workspace</span>
        </Link>
        <Link href="/tours-and-registration">
          <HeartHandshake aria-hidden="true" />
          <span>Guardian portal</span>
        </Link>
      </div>

      <nav className="auth-route-links" aria-label="Account demonstrations">
        <Link href="/forgot-password">Forgot password</Link>
        <Link href="/accept-invite">Accept invitation</Link>
        <Link href="/">Return to public site</Link>
      </nav>
    </section>
  );
}
