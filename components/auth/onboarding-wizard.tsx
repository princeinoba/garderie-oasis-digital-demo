"use client";

import { useState } from "react";
import Link from "next/link";

import { ArrowLeft, ArrowRight, Check, CircleCheck } from "lucide-react";

const steps = [
  { title: "Profile", description: "Tell us about yourself" },
  { title: "Role", description: "Your position and location" },
  { title: "Preferences", description: "Communication and settings" },
] as const;

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  if (complete) {
    return (
      <section className="auth-form auth-form-wide auth-reference-wide onboarding-complete">
        <CircleCheck aria-hidden="true" />
        <p className="eyebrow">Setup complete</p>
        <h1>Your synthetic educator profile is ready.</h1>
        <p>No account, personal information, or operational record was created.</p>
        <Link className="button button-primary" href="/sign-in">
          Return to shared access
        </Link>
      </section>
    );
  }

  const activeStep = steps[step] ?? steps[0];

  return (
    <section className="auth-form auth-form-wide auth-reference-wide onboarding-wizard">
      <div className="auth-form-heading">
        <p className="eyebrow">Role-aware setup</p>
        <h1>Staff Onboarding</h1>
        <p>Set up a fictional educator profile in three clear steps.</p>
      </div>

      <ol className="mini-stepper" aria-label="Onboarding progress">
        {steps.map((item, index) => (
          <li
            className={index === step ? "is-current" : index < step ? "is-complete" : undefined}
            aria-current={index === step ? "step" : undefined}
            key={item.title}
          >
            <span>{index < step ? <Check aria-hidden="true" /> : index + 1}</span>
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </li>
        ))}
      </ol>

      <form
        className="onboarding-step-card"
        onSubmit={(event) => {
          event.preventDefault();
          if (step < steps.length - 1) setStep((current) => current + 1);
          else setComplete(true);
        }}
      >
        <header>
          <strong>
            Step {step + 1} of 3: {activeStep.title}
          </strong>
          <span>{activeStep.description}</span>
        </header>

        {step === 0 && (
          <div className="form-grid onboarding-fields">
            <label className="field">
              <span>Full name</span>
              <input name="fullName" placeholder="Enter a fictional display name" required />
            </label>
            <label className="field">
              <span>Email address</span>
              <input value="educator@synthetic.invalid" readOnly />
            </label>
            <label className="field">
              <span>Phone (optional)</span>
              <input name="phone" inputMode="tel" placeholder="(555) 123-4567" />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="form-grid onboarding-fields">
            <label className="field">
              <span>Role</span>
              <select name="role" defaultValue="educator">
                <option value="educator">Early Childhood Educator</option>
                <option value="assistant">Program Assistant</option>
                <option value="support">Support Staff</option>
              </select>
            </label>
            <label className="field">
              <span>Location</span>
              <select name="location" defaultValue="oasis-demo">
                <option value="oasis-demo">Garderie Oasis — Synthetic Demo</option>
              </select>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="form-grid onboarding-fields">
            <label className="field">
              <span>Preferred language</span>
              <select name="language" defaultValue="en">
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </label>
            <label className="onboarding-check">
              <input type="checkbox" name="updates" defaultChecked />
              <span>Show synthetic daily summary reminders</span>
            </label>
          </div>
        )}

        <div className="form-actions">
          {step === 0 ? (
            <Link className="text-link" href="/sign-in">
              Save and exit
            </Link>
          ) : (
            <button
              className="text-link onboarding-back"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft aria-hidden="true" /> Back
            </button>
          )}
          <button className="button button-primary" type="submit">
            {step === 2 ? "Finish setup" : "Continue"}
            {step === 2 ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
          </button>
        </div>
      </form>
    </section>
  );
}
