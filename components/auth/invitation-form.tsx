"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export function InvitationForm({ token, verified }: { token: string; verified: boolean }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  if (!verified) {
    return (
      <section className="auth-form auth-invitation-form">
        <div className="auth-form-heading">
          <p className="eyebrow">Invitation preview</p>
          <h1>Invitation unavailable</h1>
          <p>This synthetic invitation is invalid or expired. No account details were disclosed.</p>
        </div>
        <div className="notice notice-gold">
          <ShieldCheck aria-hidden="true" />
          <span>Use the invitation preview linked from the shared access page.</span>
        </div>
        <Link className="button button-primary" href="/sign-in">
          Return to shared access
        </Link>
      </section>
    );
  }

  return (
    <form
      className="auth-form auth-invitation-form"
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/onboarding");
      }}
    >
      <div className="auth-form-heading">
        <p className="eyebrow">Verified demo invitation</p>
        <h1>Accept your invitation</h1>
        <p>Create a fictional profile to continue to staff onboarding.</p>
      </div>

      <div className="auth-token-card">
        <ShieldCheck aria-hidden="true" />
        <span>
          <strong>Invitation token</strong>
          <small>{token}</small>
        </span>
        <em>Verified</em>
      </div>

      <label className="field">
        <span>Display name</span>
        <input name="displayName" placeholder="Choose how you’d like to appear" required />
      </label>

      <label className="field">
        <span>Create password</span>
        <span className="input-with-icon auth-password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            defaultValue="oasis-demo"
            minLength={8}
            required
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        </span>
      </label>

      <div className="notice notice-gold">
        <ShieldCheck aria-hidden="true" />
        <span>Synthetic staff demonstration only. No real children or families are involved.</span>
      </div>

      <button className="button button-primary" type="submit">
        Accept invitation
      </button>
    </form>
  );
}
