"use client";

import { useState } from "react";

import { ChevronDown, CircleHelp, Leaf } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { OasisGuide } from "@/components/public/oasis-guide";

const faqs = {
  en: [
    [
      "Enrollment & Registration",
      "This demo does not enroll a child. It separates a fictional tour request from Ottawa's official application process.",
    ],
    [
      "Daily Routine & Programs",
      "The program and daily-rhythm pages show fictional, age-aware examples only.",
    ],
    [
      "Meals & Nutrition",
      "The menu demonstrates balanced, allergy-aware planning but is not a real menu or certification.",
    ],
    [
      "Health & Safety",
      "Do not submit medical, developmental, allergy, diagnosis, or child-record information to this demonstration.",
    ],
    [
      "Fees & Financial Assistance",
      "All displayed amounts are illustrative. Use official Ottawa sources for verified information.",
    ],
  ],
  fr: [
    [
      "Inscription",
      "Cette démo n'inscrit aucun enfant. Elle sépare une visite fictive du processus officiel d'Ottawa.",
    ],
    [
      "Routine et programmes",
      "Les pages présentent uniquement des exemples fictifs adaptés à l'âge.",
    ],
    [
      "Repas et nutrition",
      "Le menu illustre une planification équilibrée, mais ne constitue ni un vrai menu ni une certification.",
    ],
    [
      "Santé et sécurité",
      "Ne soumettez aucun renseignement médical, développemental, allergique, diagnostique ou dossier d'enfant.",
    ],
    [
      "Tarifs et aide financière",
      "Tous les montants sont fictifs. Consultez les sources officielles d'Ottawa.",
    ],
  ],
} as const;

export function FaqPageContent() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">
          {locale === "en" ? "Approved answers only" : "Réponses approuvées seulement"}
        </p>
        <h1>{locale === "en" ? "Frequently Asked Questions" : "Foire aux questions"}</h1>
        <p>
          {locale === "en"
            ? "Quick answers to common demonstration questions."
            : "Des réponses rapides aux questions fréquentes sur la démonstration."}
        </p>
      </section>
      <section className="faq-layout page-width">
        <div className="faq-list">
          {faqs[locale].map(([question, answer], index) => (
            <article className={open === index ? "faq-item is-open" : "faq-item"} key={question}>
              <h2>
                <button
                  type="button"
                  aria-expanded={open === index}
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <CircleHelp aria-hidden="true" />
                  <span>{question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </h2>
              {open === index && <p>{answer}</p>}
            </article>
          ))}
          <div className="notice notice-sage">
            <Leaf aria-hidden="true" />
            <span>
              {locale === "en"
                ? "Don't see your question? Ask Oasis Guide or use the Contact page."
                : "Votre question n'est pas ici? Demandez au Guide Oasis ou utilisez la page Contact."}
            </span>
          </div>
        </div>
        <OasisGuide />
      </section>
    </main>
  );
}
