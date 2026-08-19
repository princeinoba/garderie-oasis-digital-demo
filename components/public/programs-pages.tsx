"use client";

import Link from "next/link";

import { ArrowRight, Check, Heart, Leaf, Sun } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { dailyTimeline, programContent, programSlugs, type ProgramSlug } from "@/lib/programs";

export function ProgramsIndex() {
  const { locale } = useLanguage();
  const heading =
    locale === "en"
      ? [
          "Programs for Every Stage",
          "Nurturing care and engaging learning tailored to your child's growth.",
        ]
      : [
          "Des programmes pour chaque étape",
          "Des soins attentionnés et des apprentissages adaptés à la croissance de votre enfant.",
        ];

  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">
          {locale === "en" ? "Find the right fit" : "Trouver le bon programme"}
        </p>
        <h1>{heading[0]}</h1>
        <p>{heading[1]}</p>
      </section>
      <section className="page-width program-grid program-grid-large">
        {programSlugs.map((slug) => {
          const program = programContent[slug];
          const Icon = program.icon;
          return (
            <article className={`program-card program-card-detail tone-${program.tone}`} key={slug}>
              <div className="program-illustration" aria-hidden="true">
                <span className="shape-sun" />
                <span className="shape-leaf shape-leaf-one" />
                <span className="shape-leaf shape-leaf-two" />
                <span className="shape-table" />
              </div>
              <span className={`icon-disc ${program.tone}`}>
                <Icon aria-hidden="true" />
              </span>
              <h2>{program.name[locale]}</h2>
              <p className="program-age">{program.age[locale]}</p>
              <p>{program.intro[locale]}</p>
              <Link className="text-link" href={`/programs/${slug}`}>
                {locale === "en" ? "Learn more" : "En savoir plus"}{" "}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          );
        })}
      </section>
      <section className="inline-cta page-width">
        <span className="icon-disc sage">
          <Leaf aria-hidden="true" />
        </span>
        <div>
          <h2>
            {locale === "en"
              ? "Curious which program is the right fit?"
              : "Vous hésitez entre les programmes?"}
          </h2>
          <p>
            {locale === "en"
              ? "We're here to help you find the best environment for your child."
              : "Nous pouvons vous aider à choisir l'environnement qui convient à votre enfant."}
          </p>
        </div>
        <Link className="button button-primary" href="/tours-and-registration">
          {locale === "en" ? "Request a Tour" : "Demander une visite"}
        </Link>
      </section>
    </main>
  );
}

export function ProgramDetail({ slug }: { slug: ProgramSlug }) {
  const { locale } = useLanguage();
  const program = programContent[slug];
  const Icon = program.icon;

  return (
    <main className="interior-main" id="main-content">
      <section className="program-detail page-width">
        <div className="program-detail-copy">
          <span className={`icon-disc ${program.tone}`}>
            <Icon aria-hidden="true" />
          </span>
          <p className="eyebrow">{locale === "en" ? "Program overview" : "Aperçu du programme"}</p>
          <h1>{program.name[locale]}</h1>
          <p className="detail-age">{program.age[locale]}</p>
          <p className="detail-intro">{program.intro[locale]}</p>
          <h2>{locale === "en" ? "Program Highlights" : "Points forts du programme"}</h2>
          <ul className="check-list">
            {program.highlights[locale].map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className={`program-note tone-${program.tone}`}>
            <Heart aria-hidden="true" />
            <div>
              <strong>
                {locale === "en"
                  ? "We'd love to meet your family."
                  : "Nous aimerions rencontrer votre famille."}
              </strong>
              <p>
                {locale === "en"
                  ? "Schedule a tour to learn more about this program."
                  : "Planifiez une visite pour en savoir plus."}
              </p>
            </div>
            <Link className="button button-primary" href="/tours-and-registration">
              {locale === "en" ? "Request a Tour" : "Demander une visite"}
            </Link>
          </div>
        </div>
        <aside
          className={`timeline-card tone-${program.tone}`}
          aria-label={locale === "en" ? "A sample day" : "Une journée type"}
        >
          <h2>
            {locale === "en" ? `A Day in Our ${program.name.en}` : "Une journée dans le programme"}
          </h2>
          <ol>
            {dailyTimeline.map((item) => {
              const TimelineIcon = item.icon;
              return (
                <li key={item.time}>
                  <TimelineIcon aria-hidden="true" />
                  <time>{item.time}</time>
                  <strong>{item[locale]}</strong>
                </li>
              );
            })}
          </ol>
        </aside>
      </section>
    </main>
  );
}

export function DailyExperience() {
  const { locale } = useLanguage();
  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">
          {locale === "en" ? "A dependable daily rhythm" : "Un rythme quotidien rassurant"}
        </p>
        <h1>
          {locale === "en"
            ? "A Day of Discovery, Care, and Connection"
            : "Une journée de découverte, de soins et de connexion"}
        </h1>
        <p>
          {locale === "en"
            ? "Thoughtful routines help children feel safe, supported, and inspired."
            : "Des routines réfléchies aident les enfants à se sentir en sécurité, soutenus et inspirés."}
        </p>
      </section>
      <section className="daily-flow page-width">
        {dailyTimeline.map((item, index) => {
          const Icon = item.icon;
          return (
            <article key={item.time}>
              <span className={`flow-icon flow-${index + 1}`}>
                <Icon aria-hidden="true" />
              </span>
              <time>{item.time}</time>
              <h2>{item[locale]}</h2>
              <p>
                {locale === "en"
                  ? [
                      "Warm welcomes and time to settle in.",
                      "Engaging activities and hands-on learning.",
                      "Stories, language, music, and creative thinking.",
                      "Fresh air, movement, and big fun.",
                      "Healthy meals, quiet time, and calm rest.",
                      "Play, reflection, and a warm send-off.",
                      "Sharing the day and heading home.",
                    ][index]
                  : [
                      "Un accueil chaleureux et le temps de s'installer.",
                      "Des activités engageantes et concrètes.",
                      "Histoires, langage, musique et créativité.",
                      "Air frais, mouvement et plaisir.",
                      "Repas sains, calme et repos.",
                      "Jeu, réflexion et départ chaleureux.",
                      "Partager la journée avant le retour à la maison.",
                    ][index]}
              </p>
            </article>
          );
        })}
      </section>
      <section className="inline-cta page-width">
        <span className="icon-disc gold">
          <Sun aria-hidden="true" />
        </span>
        <div>
          <h2>
            {locale === "en" ? "Experience the Oasis difference." : "Découvrez l'expérience Oasis."}
          </h2>
          <p>
            {locale === "en"
              ? "Book a demonstration tour and see our daily rhythm in action."
              : "Demandez une visite de démonstration et voyez notre rythme en action."}
          </p>
        </div>
        <Link className="button button-primary" href="/tours-and-registration">
          {locale === "en" ? "Request a Tour" : "Demander une visite"}
        </Link>
      </section>
    </main>
  );
}
