"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("director@synthetic.invalid");
  const [password, setPassword] = useState("oasis-demo");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok) throw new Error(body.error ?? "Unable to sign in.");
      router.push("/director");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to sign in.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <div className="auth-form-heading">
        <p className="eyebrow">Protected synthetic demo</p>
        <h1>Welcome back</h1>
        <p>Sign in to explore the fictional director experience.</p>
      </div>
      <div className="notice notice-gold">
        <ShieldCheck aria-hidden="true" />
        <span>Demo access only. No real children, families, staff, or operations.</span>
      </div>
      {error && (
        <p className="error-summary" role="alert">
          {error}
        </p>
      )}
      <label className="field">
        <span>Email address</span>
        <span className="input-with-icon">
          <Mail aria-hidden="true" />
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </span>
      </label>
      <label className="field">
        <span>Password</span>
        <span className="input-with-icon">
          <LockKeyhole aria-hidden="true" />
          <input
            type={show ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((value) => !value)}
          >
            {show ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        </span>
      </label>
      <button className="button button-primary" type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign In"}
      </button>
      <div className="demo-credentials">
        <strong>Use the synthetic credentials shown above.</strong>
        <span>Email ends in @synthetic.invalid - session expires after two hours.</span>
      </div>
    </form>
  );
}
