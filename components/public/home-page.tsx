"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Heart,
  Leaf,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";

const homeCopy = {
  en: {
    eyebrow: "Warm spaces — Curious minds — Bright futures",
    titleA: "Visit, discover, and",
    titleB: "take the next step",
    titleC: "with confidence.",
    lede: "Explore a thoughtfully designed early-learning experience where every family can feel informed, welcomed, and ready for what comes next.",
    tour: "Request a Tour",
    programs: "Explore Programs",
    ottawa: "Apply through the City of Ottawa",
    approach: [
      ["Caring Educators", "Connection-led care and calm, age-aware routines."],
      ["Safe & Secure", "Privacy-minded experiences with clear boundaries."],
      ["Playful Learning", "Curiosity, movement, reflection, and discovery."],
      ["Family Partnership", "Simple information and welcoming next steps."],
    ],
    programKicker: "Programs for every stage",
    programTitle: "A gentle place to grow, belong, and shine.",
    programText:
      "Three age-aware pathways balance dependable routines with sensory play, language, movement, and joyful discovery.",
    dailyKicker: "A day at Oasis",
    dailyTitle: "A rhythm children can trust.",
    dailyText:
      "Arrival, discovery, meals, outdoor play, rest, reflection, and goodbyes—each moment is designed to feel calm and connected.",
    journeyKicker: "Your family journey",
    journeyTitle: "Clear at every step.",
    privacyTitle: "Built with privacy in mind",
    privacyText:
      "The tour demo asks only for preliminary contact and program-interest details. It never asks for a child's full name, date of birth, health record, diagnosis, or financial information.",
    faqTitle: "Questions are welcome",
    faqText:
      "Oasis Guide answers only from approved demonstration content, explains what it cannot know, and always keeps Ottawa's official registry separate.",
    finalTitle: "Come see the experience in action.",
    finalText: "Take a guided look through the spaces, daily rhythm, and program approach.",
  },
  fr: {
    eyebrow: "Espaces chaleureux — Esprits curieux — Avenirs lumineux",
    titleA: "Visitez, découvrez et",
    titleB: "faites le prochain pas",
    titleC: "en toute confiance.",
    lede: "Découvrez une expérience de petite enfance soigneusement conçue où chaque famille peut se sentir informée, accueillie et prête pour la suite.",
    tour: "Demander une visite",
    programs: "Voir les programmes",
    ottawa: "Présenter une demande à la Ville d'Ottawa",
    approach: [
      ["Équipe attentionnée", "Des routines calmes et adaptées à chaque âge."],
      ["Sûr et sécuritaire", "Une expérience claire axée sur la confidentialité."],
      ["Apprentissage par le jeu", "Curiosité, mouvement, réflexion et découverte."],
      [
        "Partenariat familial",
        "Des renseignements simples et des prochaines étapes accueillantes.",
      ],
    ],
    programKicker: "Des programmes pour chaque étape",
    programTitle: "Un lieu doux pour grandir, appartenir et rayonner.",
    programText:
      "Trois parcours adaptés à l'âge équilibrent routines fiables, jeu sensoriel, langage, mouvement et découverte.",
    dailyKicker: "Une journée — Oasis",
    dailyTitle: "Un rythme rassurant.",
    dailyText:
      "Accueil, découverte, repas, plein air, repos, réflexion et départ : chaque moment se veut calme et connecté.",
    journeyKicker: "Le parcours de votre famille",
    journeyTitle: "Clair à chaque étape.",
    privacyTitle: "La confidentialité dès la conception",
    privacyText:
      "La démo de visite demande seulement des coordonnées préliminaires et vos intérêts. Elle ne demande jamais le nom complet de l'enfant, sa date de naissance, un dossier de santé, un diagnostic ou des renseignements financiers.",
    faqTitle: "Vos questions sont les bienvenues",
    faqText:
      "Le Guide Oasis répond seulement à partir du contenu de démonstration approuvé, explique ses limites et distingue toujours le registre officiel d'Ottawa.",
    finalTitle: "Venez voir l'expérience en action.",
    finalText: "Découvrez les espaces, le rythme de la journée et l'approche des programmes.",
  },
} as const;

const programs = [
  { slug: "infant", ageEn: "3–18 months", ageFr: "3–18 mois", icon: Heart, tone: "sage" },
  { slug: "toddler", ageEn: "18–36 months", ageFr: "18–36 mois", icon: Leaf, tone: "gold" },
  { slug: "preschool", ageEn: "3–5 years", ageFr: "3–5 ans", icon: Sun, tone: "coral" },
] as const;

export function HomePageContent() {
  const { locale } = useLanguage();
  const copy = homeCopy[locale];

  return (
    <main id="main-content">
      <section className="hero">
        <Image
          className="hero-image"
          src="/images/classroom-hero.png"
          alt={
            locale === "en"
              ? "A warm early-learning classroom with natural wood furniture, books, plants, and soft sunlight"
              : "Une salle d'apprentissage chaleureuse avec meubles en bois naturel, livres, plantes et lumière douce"
          }
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>
              {copy.titleA} <em>{copy.titleB}</em> {copy.titleC}
            </h1>
            <p className="hero-lede">{copy.lede}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/tours-and-registration">
                {copy.tour} <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="button button-secondary" href="/programs">
                {copy.programs}
              </Link>
            </div>
            <a
              className="ottawa-link"
              href="https://ottawa.ca/en/family-and-social-services/childrens-services/apply-child-care"
              target="_blank"
              rel="noreferrer"
            >
              {copy.ottawa}
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="trust-strip page-width" aria-label="Our approach">
        {copy.approach.map(([title, text], index) => {
          const Icon = [Heart, ShieldCheck, Sun, Leaf][index] ?? Heart;
          return (
            <article key={title}>
              <span className={`icon-disc ${["sage", "green", "gold", "coral"][index]}`}>
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section page-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.programKicker}</p>
            <h2>{copy.programTitle}</h2>
          </div>
          <p>{copy.programText}</p>
        </div>
        <div className="program-grid">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const names =
              locale === "en"
                ? ["Infant Program", "Toddler Program", "Preschool Program"]
                : [
                    "Programme des nourrissons",
                    "Programme des tout-petits",
                    "Programme préscolaire",
                  ];
            return (
              <Link
                className={`program-card tone-${program.tone}`}
                href={`/programs/${program.slug}`}
                key={program.slug}
              >
                <span className="program-number">0{index + 1}</span>
                <span className={`icon-disc ${program.tone}`}>
                  <Icon aria-hidden="true" />
                </span>
                <h3>{names[index]}</h3>
                <p>{locale === "en" ? program.ageEn : program.ageFr}</p>
                <span className="text-link">
                  {locale === "en" ? "Explore the program" : "Découvrir le programme"}{" "}
                  <ArrowRight aria-hidden="true" size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="feature-band">
        <div className="feature-band-inner page-width">
          <div>
            <p className="eyebrow">{copy.dailyKicker}</p>
            <h2>{copy.dailyTitle}</h2>
            <p>{copy.dailyText}</p>
            <Link className="button button-secondary" href="/daily-experience">
              {locale === "en" ? "See the daily experience" : "Voir la journée vécue"}
            </Link>
          </div>
          <div
            className="rhythm-row"
            aria-label={locale === "en" ? "Daily rhythm" : "Rythme quotidien"}
          >
            {[Heart, Sparkles, BookOpen, Leaf, Moon].map((Icon, index) => (
              <span key={index}>
                <Icon aria-hidden="true" />
                <small>
                  {locale === "en"
                    ? ["Arrival", "Discovery", "Stories", "Outdoors", "Rest"][index]
                    : ["Accueil", "Découverte", "Histoires", "Plein air", "Repos"][index]}
                </small>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-width journey-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">{copy.journeyKicker}</p>
            <h2>{copy.journeyTitle}</h2>
          </div>
        </div>
        <ol className="journey-steps">
          {[
            [
              locale === "en" ? "Explore" : "Explorer",
              locale === "en"
                ? "Read about programs and the daily rhythm."
                : "Découvrir les programmes et le rythme.",
            ],
            [
              locale === "en" ? "Request" : "Demander",
              locale === "en"
                ? "Share only preliminary tour details."
                : "Partager seulement des détails préliminaires.",
            ],
            [
              locale === "en" ? "Review" : "Réviser",
              locale === "en"
                ? "Check every detail and consent separately."
                : "Vérifier chaque détail et chaque consentement.",
            ],
            [
              locale === "en" ? "Visit" : "Visiter",
              locale === "en"
                ? "Receive a fictional demo confirmation."
                : "Recevoir une confirmation fictive de démo.",
            ],
          ].map(([title, text], index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section page-width split-feature">
        <article className="feature-card feature-card-green">
          <ShieldCheck aria-hidden="true" />
          <p className="eyebrow">
            {locale === "en" ? "Privacy & safety" : "Confidentialité et sécurité"}
          </p>
          <h2>{copy.privacyTitle}</h2>
          <p>{copy.privacyText}</p>
          <Link className="text-link" href="/privacy">
            {locale === "en" ? "Read the privacy summary" : "Lire le résumé de confidentialité"}{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </article>
        <article className="feature-card feature-card-cream">
          <Users aria-hidden="true" />
          <p className="eyebrow">Oasis Guide</p>
          <h2>{copy.faqTitle}</h2>
          <p>{copy.faqText}</p>
          <Link className="text-link" href="/faq">
            {locale === "en" ? "Ask Oasis Guide" : "Questionner le Guide Oasis"}{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </article>
      </section>

      <section className="final-cta page-width">
        <div>
          <p className="eyebrow">{locale === "en" ? "Your next step" : "Votre prochaine étape"}</p>
          <h2>{copy.finalTitle}</h2>
          <p>{copy.finalText}</p>
        </div>
        <Link className="button button-primary" href="/tours-and-registration">
          {copy.tour}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
