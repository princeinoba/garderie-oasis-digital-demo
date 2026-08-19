"use client";

import { useState } from "react";
import Link from "next/link";

import { CircleCheck, Info, Mail } from "lucide-react";

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="auth-form auth-recovery-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="auth-form-heading">
        <p className="eyebrow">Account recovery</p>
        <h1>Forgot your password?</h1>
        <p>Enter the synthetic staff email to preview the recovery experience.</p>
      </div>

      <label className="field">
        <span>Email address</span>
        <span className="input-with-icon">
          <Mail aria-hidden="true" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            defaultValue="director@synthetic.invalid"
            required
          />
        </span>
      </label>

      <div className="notice notice-sage">
        <Info aria-hidden="true" />
        <span>This is a simulated password reset. No real email is sent.</span>
      </div>

      <button className="button button-primary" type="submit">
        <Mail aria-hidden="true" /> Send reset instructions
      </button>

      {submitted && (
        <div className="auth-success" role="status">
          <CircleCheck aria-hidden="true" />
          <span>Recovery preview created. Delivery remains disabled in this synthetic demo.</span>
        </div>
      )}

      <Link className="text-link" href="/sign-in">
        Back to shared access
      </Link>
    </form>
  );
}
