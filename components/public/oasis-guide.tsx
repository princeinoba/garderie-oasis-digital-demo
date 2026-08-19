"use client";

import { useState } from "react";

import { ArrowUp, ExternalLink, ShieldCheck } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { answerOasisGuide, type GuideAnswer } from "@/lib/oasis-guide";

export function OasisGuideMark() {
  return (
    <svg className="oasis-guide-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 41V15" />
      <path d="M24 27c-7-1-12-5-14-11 8-1 13 2 14 11Z" />
      <path d="M24 22c6-1 11-5 13-12-7 0-12 4-13 12Z" />
      <path d="M24 35c-5 0-9-3-11-7 6-1 10 1 11 7Z" />
      <path d="M24 32c5 0 9-3 11-8-6 0-10 3-11 8Z" />
      <circle cx="24" cy="9" r="3" />
    </svg>
  );
}

export function OasisGuide() {
  const { locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<GuideAnswer | null>(null);
  const suggestions =
    locale === "en"
      ? [
          "What programs are shown?",
          "How does the tour demo work?",
          "Is this Ottawa’s waitlist?",
          "Do you have spaces available?",
        ]
      : [
          "Quels programmes sont présentés?",
          "Comment fonctionne la visite de démo?",
          "Est-ce la liste d’attente d’Ottawa?",
          "Avez-vous des places disponibles?",
        ];

  const ask = (value: string) => {
    if (!value.trim()) return;
    setQuery(value);
    setAnswer(answerOasisGuide(value, locale));
  };

  return (
    <section className="guide-card guide-reference-card" aria-labelledby="oasis-guide-title">
      <header className="guide-heading">
        <span className="guide-mark">
          <OasisGuideMark />
        </span>
        <div>
          <h2 id="oasis-guide-title">Oasis Guide</h2>
          <p>
            <span className="online-dot" /> {locale === "en" ? "Online" : "En ligne"}
          </p>
        </div>
      </header>

      <div className="guide-conversation" aria-live="polite">
        <div className="guide-message guide-message-bot">
          {locale === "en"
            ? "Hello! I’m Oasis Guide. I can explain this demonstration, its programs, tour flow, meals, fees, and official Ottawa separation."
            : "Bonjour! Je suis le Guide Oasis. Je peux expliquer cette démonstration, ses programmes, les visites, les repas, les tarifs et la séparation avec Ottawa."}
        </div>
        <div className="guide-message guide-message-user">
          {locale === "en" ? "What can you help with?" : "Comment pouvez-vous m’aider?"}
        </div>
        <div className="guide-message guide-message-bot">
          {locale === "en"
            ? "Choose an approved question below or ask a general, non-sensitive question."
            : "Choisissez une question approuvée ci-dessous ou posez une question générale non sensible."}
        </div>

        {answer && (
          <>
            <div className="guide-message guide-message-user">{query}</div>
            <div
              className={
                answer.refused
                  ? "guide-message guide-message-bot guide-refusal"
                  : "guide-message guide-message-bot"
              }
            >
              <p>{answer.answer}</p>
              <div className="guide-source">
                <ShieldCheck aria-hidden="true" size={16} />
                <div>
                  <strong>{answer.sourceTitle}</strong>
                  <span>{answer.confidence}</span>
                  <span>{answer.escalation}</span>
                  {answer.sourceReference.startsWith("http") ? (
                    <a href={answer.sourceReference} target="_blank" rel="noreferrer">
                      {locale === "en" ? "Open official source" : "Ouvrir la source officielle"}{" "}
                      <ExternalLink aria-hidden="true" size={14} />
                    </a>
                  ) : (
                    <a href={answer.sourceReference}>
                      {locale === "en" ? "Open source page" : "Ouvrir la page source"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="guide-suggestions" aria-label="Approved questions">
        {suggestions.map((suggestion) => (
          <button key={suggestion} type="button" onClick={() => ask(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>

      <form
        className="guide-input"
        onSubmit={(event) => {
          event.preventDefault();
          ask(query);
        }}
      >
        <label className="sr-only" htmlFor="guide-question">
          {locale === "en" ? "Ask Oasis Guide" : "Questionner le Guide Oasis"}
        </label>
        <input
          id="guide-question"
          value={query}
          maxLength={240}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === "en" ? "Ask a general question…" : "Posez une question générale…"}
        />
        <button
          type="submit"
          aria-label={locale === "en" ? "Send question" : "Envoyer la question"}
        >
          <ArrowUp aria-hidden="true" />
        </button>
      </form>

      <div className="guide-boundary-note">
        <OasisGuideMark />
        <span>
          {locale === "en"
            ? "Oasis Guide provides general information and is not a substitute for official policies."
            : "Le Guide Oasis fournit des renseignements généraux et ne remplace pas les politiques officielles."}
        </span>
      </div>

      <div className="guide-reference-sources">
        <strong>{locale === "en" ? "Approved sources" : "Sources approuvées"}</strong>
        <a
          href={
            locale === "en"
              ? "https://ottawa.ca/en/family-and-social-services/childrens-services/apply-child-care"
              : "https://ottawa.ca/fr/famille-et-services-sociaux/services-pour-enfants/demander-une-place-en-service-de-garde"
          }
          target="_blank"
          rel="noreferrer"
        >
          {locale === "en"
            ? "City of Ottawa — Child Care Services"
            : "Ville d’Ottawa — Services de garde"}
          <ExternalLink aria-hidden="true" size={12} />
        </a>
        <span>
          {locale === "en" ? "Approved demonstration pages" : "Pages de démonstration approuvées"}
        </span>
      </div>

      <p className="guide-footnote">
        {locale === "en"
          ? "Deterministic approved-content retrieval. No remote AI, personal data, or real messages."
          : "Recherche déterministe de contenu approuvé. Aucune IA distante, donnée personnelle ou vraie messagerie."}
      </p>
    </section>
  );
}
