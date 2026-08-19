"use client";

import { useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Info,
  Pencil,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { stepOneSchema, stepTwoSchema, tourSubmissionSchema } from "@/domain/tours";

type TourDraft = {
  guardianFirstName: string;
  guardianLastName: string;
  email: string;
  phone: string;
  preferredLanguage: "en" | "fr";
  preferredContactMethod: "email" | "phone";
  childAgeGroup: "" | "infant" | "toddler" | "preschool";
  programInterest: "" | "infant" | "toddler" | "preschool" | "unsure";
  desiredStartMonth: string;
  careSchedule: "" | "full_time" | "part_time" | "unsure";
  preferredTourDate: string;
  preferredTourTime: "" | "morning" | "midday" | "afternoon";
  adultAttendeeCount: string;
  accessibilityRequest: string;
  generalQuestion: string;
  privacyAcknowledgement: boolean;
  communicationConsent: boolean;
  registryAcknowledgement: boolean;
  website: string;
};

const initialDraft: TourDraft = {
  guardianFirstName: "",
  guardianLastName: "",
  email: "",
  phone: "",
  preferredLanguage: "en",
  preferredContactMethod: "email",
  childAgeGroup: "",
  programInterest: "",
  desiredStartMonth: "",
  careSchedule: "",
  preferredTourDate: "",
  preferredTourTime: "",
  adultAttendeeCount: "1",
  accessibilityRequest: "",
  generalQuestion: "",
  privacyAcknowledgement: false,
  communicationConsent: false,
  registryAcknowledgement: false,
  website: "",
};

type Confirmation = { reference: string; submittedAt: string };

export function TourForm() {
  const { locale } = useLanguage();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<TourDraft>(initialDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const formCard = useRef<HTMLElement>(null);
  const confirmationHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (confirmation) confirmationHeading.current?.focus();
  }, [confirmation]);

  useEffect(() => {
    formCard.current?.setAttribute("data-hydrated", "true");
  }, []);

  const labels =
    locale === "en"
      ? {
          title: "Request a Demonstration Tour",
          subtitle: "A clear, three-step preview using fictional information only.",
          steps: ["Parent Details", "Childcare Needs", "Review"],
          continue: "Continue",
          back: "Back",
          submit: "Create Demonstration Preview",
          first: "Parent / guardian first name",
          last: "Parent / guardian last name",
          email: "Email address",
          phone: "Telephone number",
          language: "Preferred language",
          contact: "Preferred contact method",
          age: "Child age group",
          program: "Program of interest",
          month: "Desired start month",
          schedule: "Care schedule",
          date: "Preferred tour date",
          time: "Preferred tour time",
          adults: "Adults attending",
          access: "Accessibility accommodation (optional)",
          question: "General question (optional)",
        }
      : {
          title: "Demander une visite de démonstration",
          subtitle: "Un aperçu clair en trois étapes avec des renseignements fictifs seulement.",
          steps: ["Coordonnées", "Besoins de garde", "Révision"],
          continue: "Continuer",
          back: "Retour",
          submit: "Créer l'aperçu de démonstration",
          first: "Prénom du parent ou tuteur",
          last: "Nom du parent ou tuteur",
          email: "Adresse courriel",
          phone: "Numéro de téléphone",
          language: "Langue préférée",
          contact: "Méthode de contact préférée",
          age: "Groupe d'âge de l'enfant",
          program: "Programme d'intérêt",
          month: "Mois de début souhaité",
          schedule: "Horaire de garde",
          date: "Date de visite préférée",
          time: "Heure de visite préférée",
          adults: "Adultes présents",
          access: "Mesure d'accessibilité (facultatif)",
          question: "Question générale (facultatif)",
        };

  const update = <K extends keyof TourDraft>(key: K, value: TourDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const mapErrors = (fieldErrors: Record<string, string[] | undefined>) => {
    const next: Record<string, string> = {};
    Object.entries(fieldErrors).forEach(([key, messages]) => {
      if (messages?.[0]) next[key] = messages[0];
    });
    setErrors(next);
  };

  const nextStep = () => {
    const result = step === 1 ? stepOneSchema.safeParse(draft) : stepTwoSchema.safeParse(draft);
    if (!result.success) {
      mapErrors(result.error.flatten().fieldErrors);
      document.getElementById("tour-error-summary")?.focus();
      return;
    }
    setErrors({});
    setStep((value) => Math.min(3, value + 1));
    document.getElementById("tour-form-heading")?.focus();
  };

  const submit = async () => {
    setServerError("");
    const payload = { ...draft, adultAttendeeCount: Number(draft.adultAttendeeCount) };
    const result = tourSubmissionSchema.safeParse(payload);
    if (!result.success) {
      mapErrors(result.error.flatten().fieldErrors);
      document.getElementById("tour-error-summary")?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = (await response.json()) as {
        reference?: string;
        submittedAt?: string;
        error?: string;
        fields?: Record<string, string[]>;
      };
      if (!response.ok || !body.reference || !body.submittedAt) {
        if (body.fields) mapErrors(body.fields);
        throw new Error(body.error ?? "Unable to create the demonstration preview.");
      }
      setConfirmation({ reference: body.reference, submittedAt: body.submittedAt });
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Unable to create the demonstration preview.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const downloadCalendar = () => {
    const start = draft.preferredTourDate.replaceAll("-", "") + "T140000Z";
    const content = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Garderie Oasis Demo//EN",
      "BEGIN:VEVENT",
      `UID:${confirmation?.reference}@synthetic.invalid`,
      `DTSTART:${start}`,
      `DTEND:${start}`,
      "SUMMARY:Demonstration Tour Preview",
      "DESCRIPTION:Fictional calendar preview only. No real tour is booked.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: "text/calendar" }));
    link.download = "garderie-oasis-demo-tour.ics";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (confirmation) {
    return (
      <section className="tour-confirmation card">
        <span className="confirmation-icon">
          <Check aria-hidden="true" />
        </span>
        <p className="eyebrow">
          {locale === "en" ? "Demonstration preview created" : "Aperçu de démonstration créé"}
        </p>
        <h2 ref={confirmationHeading} tabIndex={-1}>
          {locale === "en"
            ? "Thank you for exploring the experience."
            : "Merci d'avoir exploré l'expérience."}
        </h2>
        <p>
          {locale === "en"
            ? "No real tour request was saved or delivered."
            : "Aucune vraie demande de visite n'a été sauvegardée ni transmise."}
        </p>
        <dl className="confirmation-details">
          <div>
            <dt>{locale === "en" ? "Synthetic reference" : "Référence fictive"}</dt>
            <dd>{confirmation.reference}</dd>
          </div>
          <div>
            <dt>{locale === "en" ? "Delivery" : "Livraison"}</dt>
            <dd>{locale === "en" ? "Disabled — preview only" : "Désactivée — aperçu seulement"}</dd>
          </div>
        </dl>
        <div className="notice notice-gold">
          <Info aria-hidden="true" />
          <span>
            {locale === "en"
              ? "A deterministic preview email was prepared but not sent. No inquiry was persisted."
              : "Un aperçu déterministe de courriel a été préparé, mais non envoyé. Aucune demande n'a été conservée."}
          </span>
        </div>
        <h3>{locale === "en" ? "What happens next?" : "Quelle est la suite?"}</h3>
        <ol>
          <li>
            {locale === "en"
              ? "Review the synthetic reference above."
              : "Révisez la référence fictive ci-dessus."}
          </li>
          <li>
            {locale === "en"
              ? "Explore the director demo to see a fictional review workflow."
              : "Explorez la démo direction pour voir un flux de révision fictif."}
          </li>
          <li>
            {locale === "en"
              ? "Use Ottawa's official process for a real childcare application."
              : "Utilisez le processus officiel d'Ottawa pour une vraie demande de garde."}
          </li>
        </ol>
        <div className="confirmation-actions">
          <button className="button button-secondary" type="button" onClick={downloadCalendar}>
            <CalendarDays aria-hidden="true" />
            {locale === "en" ? "Add demo to calendar" : "Ajouter la démo au calendrier"}
          </button>
          <a className="button button-primary" href="/faq">
            {locale === "en" ? "Ask Oasis Guide" : "Questionner le Guide Oasis"}
          </a>
        </div>
      </section>
    );
  }

  const errorEntries = Object.values(errors);

  return (
    <section
      className="tour-form-card card"
      aria-labelledby="tour-form-heading"
      data-hydrated="false"
      ref={formCard}
    >
      <div className="tour-form-title">
        <div>
          <p className="eyebrow">
            {locale === "en" ? "Demonstration only" : "Démonstration seulement"}
          </p>
          <h2 id="tour-form-heading" tabIndex={-1}>
            {labels.title}
          </h2>
          <p>{labels.subtitle}</p>
        </div>
        <ShieldCheck aria-hidden="true" />
      </div>
      <ol
        className="stepper"
        aria-label={locale === "en" ? "Form progress" : "Progression du formulaire"}
      >
        {labels.steps.map((label, index) => (
          <li
            className={step === index + 1 ? "is-current" : step > index + 1 ? "is-complete" : ""}
            key={label}
            aria-current={step === index + 1 ? "step" : undefined}
          >
            <span>{step > index + 1 ? <Check aria-hidden="true" /> : index + 1}</span>
            <strong>{label}</strong>
          </li>
        ))}
      </ol>

      {errorEntries.length > 0 && (
        <div className="error-summary" id="tour-error-summary" role="alert" tabIndex={-1}>
          <strong>{locale === "en" ? "Review these fields:" : "Révisez ces champs :"}</strong>
          <ul>
            {errorEntries.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {serverError && (
        <p className="error-summary" role="alert">
          {serverError}
        </p>
      )}

      {step === 1 && (
        <div className="form-grid">
          <Field label={labels.first} error={errors.guardianFirstName}>
            <input
              name="guardianFirstName"
              autoComplete="given-name"
              value={draft.guardianFirstName}
              onChange={(e) => update("guardianFirstName", e.target.value)}
              aria-invalid={Boolean(errors.guardianFirstName)}
              required
            />
          </Field>
          <Field label={labels.last} error={errors.guardianLastName}>
            <input
              name="guardianLastName"
              autoComplete="family-name"
              value={draft.guardianLastName}
              onChange={(e) => update("guardianLastName", e.target.value)}
              aria-invalid={Boolean(errors.guardianLastName)}
              required
            />
          </Field>
          <Field
            label={labels.email}
            hint={
              locale === "en"
                ? "Use a fictional @synthetic.invalid address."
                : "Utilisez une adresse fictive @synthetic.invalid."
            }
            error={errors.email}
          >
            <input
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="alex.johnson@synthetic.invalid"
              value={draft.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              required
            />
          </Field>
          <Field
            label={labels.phone}
            hint={
              locale === "en"
                ? "Use a fictional number containing 555."
                : "Utilisez un numéro fictif contenant 555."
            }
            error={errors.phone}
          >
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="613-555-0123"
              value={draft.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              required
            />
          </Field>
          <Field label={labels.language}>
            <select
              name="preferredLanguage"
              value={draft.preferredLanguage}
              onChange={(e) => update("preferredLanguage", e.target.value as "en" | "fr")}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </Field>
          <Field label={labels.contact}>
            <select
              name="preferredContactMethod"
              value={draft.preferredContactMethod}
              onChange={(e) =>
                update("preferredContactMethod", e.target.value as "email" | "phone")
              }
            >
              <option value="email">{locale === "en" ? "Email preview" : "Aperçu courriel"}</option>
              <option value="phone">
                {locale === "en" ? "Phone preview" : "Aperçu téléphonique"}
              </option>
            </select>
          </Field>
          <label className="honeypot" aria-hidden="true">
            Website
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={draft.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="form-grid">
          <Field label={labels.age} error={errors.childAgeGroup}>
            <select
              value={draft.childAgeGroup}
              onChange={(e) =>
                update("childAgeGroup", e.target.value as TourDraft["childAgeGroup"])
              }
              required
            >
              <option value="">
                {locale === "en" ? "Select an age group" : "Choisir un groupe d'âge"}
              </option>
              <option value="infant">
                {locale === "en" ? "Infant — 3–18 months" : "Nourrisson — 3–18 mois"}
              </option>
              <option value="toddler">
                {locale === "en" ? "Toddler — 18–36 months" : "Tout-petit — 18–36 mois"}
              </option>
              <option value="preschool">
                {locale === "en" ? "Preschool — 3–5 years" : "Préscolaire — 3–5 ans"}
              </option>
            </select>
          </Field>
          <Field label={labels.program} error={errors.programInterest}>
            <select
              value={draft.programInterest}
              onChange={(e) =>
                update("programInterest", e.target.value as TourDraft["programInterest"])
              }
              required
            >
              <option value="">
                {locale === "en" ? "Select a program" : "Choisir un programme"}
              </option>
              <option value="infant">{locale === "en" ? "Infant" : "Nourrisson"}</option>
              <option value="toddler">{locale === "en" ? "Toddler" : "Tout-petit"}</option>
              <option value="preschool">{locale === "en" ? "Preschool" : "Préscolaire"}</option>
              <option value="unsure">
                {locale === "en" ? "Not sure yet" : "Je ne sais pas encore"}
              </option>
            </select>
          </Field>
          <Field label={labels.month} error={errors.desiredStartMonth}>
            <input
              type="month"
              value={draft.desiredStartMonth}
              onChange={(e) => update("desiredStartMonth", e.target.value)}
              required
            />
          </Field>
          <Field label={labels.schedule} error={errors.careSchedule}>
            <select
              value={draft.careSchedule}
              onChange={(e) => update("careSchedule", e.target.value as TourDraft["careSchedule"])}
              required
            >
              <option value="">
                {locale === "en" ? "Select a schedule" : "Choisir un horaire"}
              </option>
              <option value="full_time">
                {locale === "en" ? "Full-time interest" : "Intérêt temps plein"}
              </option>
              <option value="part_time">
                {locale === "en" ? "Part-time interest" : "Intérêt temps partiel"}
              </option>
              <option value="unsure">
                {locale === "en" ? "Not sure yet" : "Je ne sais pas encore"}
              </option>
            </select>
          </Field>
          <Field label={labels.date} error={errors.preferredTourDate}>
            <input
              type="date"
              value={draft.preferredTourDate}
              onChange={(e) => update("preferredTourDate", e.target.value)}
              required
            />
          </Field>
          <Field label={labels.time} error={errors.preferredTourTime}>
            <select
              value={draft.preferredTourTime}
              onChange={(e) =>
                update("preferredTourTime", e.target.value as TourDraft["preferredTourTime"])
              }
              required
            >
              <option value="">{locale === "en" ? "Select a time" : "Choisir une heure"}</option>
              <option value="morning">
                {locale === "en" ? "Morning — 9:30" : "Matin — 9 h 30"}
              </option>
              <option value="midday">
                {locale === "en" ? "Midday — 11:30" : "Midi — 11 h 30"}
              </option>
              <option value="afternoon">
                {locale === "en" ? "Afternoon — 2:00" : "Après-midi — 14 h"}
              </option>
            </select>
          </Field>
          <Field label={labels.adults} error={errors.adultAttendeeCount}>
            <select
              value={draft.adultAttendeeCount}
              onChange={(e) => update("adultAttendeeCount", e.target.value)}
            >
              {["1", "2", "3", "4"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </Field>
          <Field label={labels.access} error={errors.accessibilityRequest} full>
            <textarea
              maxLength={500}
              value={draft.accessibilityRequest}
              onChange={(e) => update("accessibilityRequest", e.target.value)}
              placeholder={
                locale === "en"
                  ? "Share only the accommodation needed for the visit—no diagnosis or health record."
                  : "Indiquez seulement la mesure requise pour la visite — aucun diagnostic ni dossier de santé."
              }
            />
          </Field>
          <Field label={labels.question} error={errors.generalQuestion} full>
            <textarea
              maxLength={800}
              value={draft.generalQuestion}
              onChange={(e) => update("generalQuestion", e.target.value)}
            />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="review-panel">
          <div className="review-heading">
            <h3>{locale === "en" ? "Review your details" : "Réviser vos renseignements"}</h3>
            <button className="text-link" type="button" onClick={() => setStep(1)}>
              <Pencil aria-hidden="true" size={16} />
              {locale === "en" ? "Edit" : "Modifier"}
            </button>
          </div>
          <dl>
            {[
              [labels.first, `${draft.guardianFirstName} ${draft.guardianLastName}`],
              [labels.email, draft.email],
              [labels.phone, draft.phone],
              [labels.age, draft.childAgeGroup],
              [labels.program, draft.programInterest],
              [labels.date, `${draft.preferredTourDate} -> ${draft.preferredTourTime}`],
            ].map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="consent-list">
            <Checkbox
              checked={draft.privacyAcknowledgement}
              error={errors.privacyAcknowledgement}
              onChange={(value) => update("privacyAcknowledgement", value)}
            >
              {locale === "en"
                ? "I have read the demonstration privacy summary (version 2026-08-18)."
                : "J'ai lu le résumé de confidentialité de la démonstration (version 2026-08-18)."}
            </Checkbox>
            <Checkbox
              checked={draft.communicationConsent}
              error={errors.communicationConsent}
              onChange={(value) => update("communicationConsent", value)}
            >
              {locale === "en"
                ? "I consent to creating a deterministic communication preview. I understand it will not be sent."
                : "Je consens à créer un aperçu déterministe de communication. Je comprends qu'il ne sera pas envoyé."}
            </Checkbox>
            <Checkbox
              checked={draft.registryAcknowledgement}
              error={errors.registryAcknowledgement}
              onChange={(value) => update("registryAcknowledgement", value)}
            >
              {locale === "en"
                ? "I confirm this is not the City of Ottawa Child Care Registry and Waitlist."
                : "Je confirme qu'il ne s'agit pas du Registre et de la Liste d'attente des services de garde d'enfants d'Ottawa."}
            </Checkbox>
          </div>
        </div>
      )}

      <div className="form-actions">
        {step > 1 ? (
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setStep((value) => value - 1)}
          >
            <ArrowLeft aria-hidden="true" />
            {labels.back}
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button className="button button-primary" type="button" onClick={nextStep}>
            {labels.continue}
            <ArrowRight aria-hidden="true" />
          </button>
        ) : (
          <button
            className="button button-primary"
            type="button"
            disabled={submitting}
            onClick={submit}
          >
            {submitting
              ? locale === "en"
                ? "Creating preview…"
                : "Création de l'aperçu…"
              : labels.submit}
            <ArrowRight aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="form-footnote">
        <Info aria-hidden="true" />
        {locale === "en"
          ? "This form does not add a child to the City of Ottawa Child Care Registry and Waitlist."
          : "Ce formulaire n'ajoute aucun enfant au Registre et à la Liste d'attente des services de garde d'enfants d'Ottawa."}
      </p>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  full = false,
  children,
}: {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  full?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className={full ? "field field-full" : "field"}>
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  error,
  children,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="checkbox-field">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{children}</span>
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
