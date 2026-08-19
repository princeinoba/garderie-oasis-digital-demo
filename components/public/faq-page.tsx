"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { OasisGuide, OasisGuideMark } from "@/components/public/oasis-guide";

type FaqKind = "enrollment" | "routine" | "meals" | "safety" | "policies" | "fees";
type FaqItem = readonly [question: string, answer: string, kind: FaqKind];

const faqs: Record<"en" | "fr", readonly FaqItem[]> = {
  en: [
    [
      "Enrollment & Registration",
      "This demonstration does not enroll a child. A fictional tour request remains separate from Ottawa’s official application process.",
      "enrollment",
    ],
    [
      "Daily Routine & Programs",
      "The program and daily-experience pages show fictional, age-aware examples designed for this portfolio only.",
      "routine",
    ],
    [
      "Meals & Nutrition",
      "The menu demonstrates balanced, allergy-aware planning but is not a current menu, dietary plan, or certification.",
      "meals",
    ],
    [
      "Health & Safety",
      "Do not submit medical, developmental, allergy, diagnosis, or child-record information to this demonstration.",
      "safety",
    ],
    [
      "Policies & Procedures",
      "Every policy shown is illustrative and requires professional, legal, regulatory, and operational review before real-world use.",
      "policies",
    ],
    [
      "Fees & Financial Assistance",
      "All displayed amounts are illustrative. Use official City of Ottawa sources for verified subsidy and fee information.",
      "fees",
    ],
  ],
  fr: [
    [
      "Inscription",
      "Cette démonstration n’inscrit aucun enfant. Une visite fictive reste distincte du processus officiel d’Ottawa.",
      "enrollment",
    ],
    [
      "Routine et programmes",
      "Les pages présentent uniquement des exemples fictifs et adaptés à l’âge pour ce portfolio.",
      "routine",
    ],
    [
      "Repas et nutrition",
      "Le menu illustre une planification équilibrée, mais ne constitue ni un menu actuel ni une certification.",
      "meals",
    ],
    [
      "Santé et sécurité",
      "Ne soumettez aucun renseignement médical, développemental, allergique, diagnostique ou dossier d’enfant.",
      "safety",
    ],
    [
      "Politiques et procédures",
      "Toutes les politiques sont fictives et exigent une révision professionnelle avant tout usage réel.",
      "policies",
    ],
    [
      "Tarifs et aide financière",
      "Tous les montants sont fictifs. Consultez les sources officielles de la Ville d’Ottawa.",
      "fees",
    ],
  ],
};

function FaqCategoryIcon({ kind }: { kind: FaqKind }) {
  return (
    <svg className="faq-category-icon" viewBox="0 0 24 24" aria-hidden="true">
      {kind === "enrollment" && (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19v-2.2c0-2.5 2.2-4.3 5.5-4.3s5.5 1.8 5.5 4.3V19" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M15.5 13.2c3.2-.3 5 1.2 5 3.6V19" />
        </>
      )}
      {kind === "routine" && (
        <>
          <circle cx="12" cy="13" r="7" />
          <path d="M12 9v4l3 2M7 3 4 2M17 3l-4 2" />
        </>
      )}
      {kind === "meals" && (
        <>
          <path d="M7 3v7M4.5 3v4.5A2.5 2.5 0 0 0 7 10M9.5 3v4.5A2.5 2.5 0 0 1 7 10v11M16 3v18M16 3c3 2 4 5 4 8h-4" />
        </>
      )}
      {kind === "safety" && (
        <>
          <path d="M12 2.5 20 6v5.6c0 4.8-3 8-8 9.9-5-1.9-8-5.1-8-9.9V6l8-3.5Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </>
      )}
      {kind === "policies" && (
        <>
          <path d="M6 2.5h8l4 4V21H6Z" />
          <path d="M14 2.5V7h4M9 11h6M9 15h6" />
        </>
      )}
      {kind === "fees" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.2 8.6c-.7-.8-1.8-1.2-3.1-1.2-1.7 0-3 .9-3 2.2 0 3.5 6.2 1.5 6.2 5 0 1.3-1.3 2.3-3.2 2.3-1.4 0-2.7-.5-3.5-1.4M12 5.4v13.2" />
        </>
      )}
    </svg>
  );
}

export function FaqPageContent() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="interior-main faq-reference-main" id="main-content">
      <section className="interior-hero page-width faq-reference-hero">
        <h1>{locale === "en" ? "Frequently Asked Questions" : "Foire aux questions"}</h1>
        <p>
          {locale === "en"
            ? "Quick answers to common questions."
            : "Des réponses rapides aux questions fréquentes."}
        </p>
      </section>

      <section className="faq-layout page-width faq-reference-layout">
        <div className="faq-list faq-reference-list">
          {faqs[locale].map(([question, answer, kind], index) => (
            <article className={open === index ? "faq-item is-open" : "faq-item"} key={question}>
              <h2>
                <button
                  type="button"
                  aria-expanded={open === index}
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <FaqCategoryIcon kind={kind} />
                  <span>{question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </h2>
              {open === index && <p>{answer}</p>}
            </article>
          ))}

          <div className="faq-help-card">
            <OasisGuideMark />
            <span>
              <strong>
                {locale === "en" ? "Don’t see your question?" : "Votre question manque?"}
              </strong>
              {locale === "en"
                ? " Ask Oasis Guide or reach out through Contact."
                : " Demandez au Guide Oasis ou utilisez la page Contact."}
            </span>
          </div>
        </div>

        <OasisGuide />
      </section>
    </main>
  );
}
