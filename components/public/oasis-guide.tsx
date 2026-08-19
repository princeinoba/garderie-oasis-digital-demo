"use client";

import { useState } from "react";

import { ArrowUp, Bot, ExternalLink, ShieldCheck } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { answerOasisGuide, type GuideAnswer } from "@/lib/oasis-guide";

export function OasisGuide() {
  const { locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<GuideAnswer | null>(null);
  const suggestions =
    locale === "en"
      ? [
          "What programs are shown?",
          "How does the tour demo work?",
          "Is this Ottawa's waitlist?",
          "Do you have spaces available?",
        ]
      : [
          "Quels programmes sont présentés?",
          "Comment fonctionne la visite de démo?",
          "Est-ce la liste d'attente d'Ottawa?",
          "Avez-vous des places disponibles?",
        ];

  const ask = (value: string) => {
    if (!value.trim()) return;
    setQuery(value);
    setAnswer(answerOasisGuide(value, locale));
  };

  return (
    <section className="guide-card" aria-labelledby="oasis-guide-title">
      <div className="guide-heading">
        <span className="guide-mark">
          <Bot aria-hidden="true" />
        </span>
        <div>
          <h2 id="oasis-guide-title">Oasis Guide</h2>
          <p>
            <span className="online-dot" />{" "}
            {locale === "en" ? "Approved content mode" : "Mode de contenu approuvé"}
          </p>
        </div>
      </div>
      <div className="guide-conversation" aria-live="polite">
        <div className="guide-message guide-message-bot">
          {locale === "en"
            ? "Hello! I can explain this demonstration, its programs, tour flow, meals, fees, and official Ottawa separation."
            : "Bonjour! Je peux expliquer cette démonstration, ses programmes, les visites, les repas, les tarifs et la séparation avec Ottawa."}
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
      <div className="guide-suggestions">
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
      <p className="guide-footnote">
        {locale === "en"
          ? "Deterministic approved-content retrieval. No remote AI, personal data, or real messages."
          : "Recherche déterministe de contenu approuvé. Aucune IA distante, donnée personnelle ou vraie messagerie."}
      </p>
    </section>
  );
}
