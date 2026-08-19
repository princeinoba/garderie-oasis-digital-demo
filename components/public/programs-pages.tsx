"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Apple,
  ArrowRight,
  BookOpen,
  Check,
  Hand,
  Heart,
  Leaf,
  Moon,
  Music2,
  Sparkles,
  Trees,
} from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { programContent, programSlugs, type ProgramSlug } from "@/lib/programs";

const programImages: Record<ProgramSlug, string> = {
  infant: "/images/program-infant.png",
  toddler: "/images/program-toddler.png",
  preschool: "/images/program-preschool.png",
};

const programDays = {
  infant: [
    ["7:00–9:00", "Arrival & Connection", "Warm welcomes and settling in.", Heart],
    ["9:00–9:45", "Sensory Exploration", "Discovering textures, sounds, and colours.", Sparkles],
    ["9:45–10:30", "Snack & Cuddles", "Nourishing snacks and caring moments.", Apple],
    ["10:30–11:30", "Floor Play", "Guided play and movement on the mat.", Trees],
    ["11:30–1:30", "Nap Time", "Restful sleep in a calm environment.", Moon],
    ["1:30–4:30", "Connection & Play", "Songs, stories, and gentle play.", Music2],
    ["4:30–6:00", "Goodbyes & Hugs", "A warm send-off to end the day.", Hand],
  ],
  toddler: [
    [
      "7:00–9:00",
      "Arrival & Free Play",
      "Greeting friends and choosing morning activities.",
      Heart,
    ],
    ["9:00–9:30", "Circle Time", "Songs, stories, and planning our day.", Sparkles],
    ["9:30–10:30", "Learning Centres", "Play-based exploration and small groups.", BookOpen],
    ["10:30–11:00", "Snack Time", "Healthy snacks and growing conversations.", Apple],
    ["11:00–12:00", "Outdoor Play", "Fresh air, active play, and big fun.", Trees],
    ["12:00–2:00", "Rest Time", "Quiet time and naps.", Moon],
    ["2:00–4:30", "Afternoon Activities", "Creative projects, sensory play, and more.", Music2],
    ["4:30–6:00", "Goodbyes & Hugs", "Sharing our day and heading home.", Hand],
  ],
  preschool: [
    ["7:00–9:00", "Arrival & Choice Time", "Settling in and exploring learning centres.", Heart],
    ["9:00–9:30", "Circle & Calendar", "Songs, calendar, and group discussions.", Sparkles],
    ["9:30–11:00", "Learning Blocks", "Literacy, math, science, and creative play.", BookOpen],
    ["11:00–11:30", "Snack & Social Time", "Healthy snacks and friendship building.", Apple],
    ["11:30–12:30", "Outdoor Exploration", "Nature play and active games.", Trees],
    ["12:30–2:00", "Lunch & Rest", "Lunch together and quiet time.", Moon],
    ["2:00–4:00", "Projects & Play", "Hands-on projects, art, and discovery.", Music2],
    ["4:00–6:00", "Goodbye Circle", "Reflection and a warm send-off.", Hand],
  ],
} as const;

export function ProgramsIndex() {
  const { locale } = useLanguage();

  return (
    <main className="reference-public reference-programs" id="main-content">
      <section className="reference-programs-heading page-width">
        <h1>{locale === "en" ? "Programs for Every Stage" : "Des programmes pour chaque étape"}</h1>
        <p>
          {locale === "en"
            ? "Nurturing care and engaging learning tailored to your child's growth."
            : "Des soins attentionnés et des apprentissages adaptés à la croissance de votre enfant."}
        </p>
      </section>

      <section className="reference-program-grid page-width" aria-label="Programs">
        {programSlugs.map((slug) => {
          const program = programContent[slug];
          const Icon = program.icon;
          return (
            <article className={`reference-program-card tone-${program.tone}`} key={slug}>
              <div className="reference-card-image">
                <Image
                  src={programImages[slug]}
                  alt={`${program.name[locale]} classroom demonstration`}
                  fill
                  sizes="(max-width: 820px) 100vw, 33vw"
                  loading="eager"
                />
              </div>
              <span className={`reference-card-icon ${program.tone}`}>
                <Icon aria-hidden="true" />
              </span>
              <div className="reference-card-copy">
                <h2>{program.name[locale]}</h2>
                <p className="reference-card-age">{program.age[locale]}</p>
                <p>{program.intro[locale]}</p>
                <Link href={`/programs/${slug}`}>
                  {locale === "en" ? "Learn more" : "En savoir plus"}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="reference-inline-cta page-width">
        <span className="reference-cta-mark">
          <Leaf aria-hidden="true" />
        </span>
        <div>
          <strong>
            {locale === "en"
              ? "Curious which program is the right fit?"
              : "Vous hésitez entre les programmes?"}
          </strong>
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
  const toneLabel = slug === "infant" ? "sage" : slug === "toddler" ? "gold" : "coral";

  return (
    <main className={`reference-public reference-program-detail ${toneLabel}`} id="main-content">
      <section className="reference-program-detail-grid page-width">
        <div className="reference-program-copy">
          <h1>{program.name[locale]}</h1>
          <p className="reference-program-age">{program.age[locale]}</p>
          <p className="reference-program-intro">{program.intro[locale]}</p>
          <h2>{locale === "en" ? "Program Highlights" : "Points forts du programme"}</h2>
          <ul>
            {program.highlights[locale].map((highlight) => (
              <li key={highlight}>
                <span>
                  <Check aria-hidden="true" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>
          <aside className="reference-program-callout">
            <span className="reference-callout-logo">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <strong>
                {slug === "infant"
                  ? locale === "en"
                    ? "We'd love to meet your family."
                    : "Nous aimerions rencontrer votre famille."
                  : slug === "toddler"
                    ? locale === "en"
                      ? "Come see our Toddler Program in action."
                      : "Venez découvrir notre programme des tout-petits."
                    : locale === "en"
                      ? "Let's explore the possibilities together."
                      : "Explorons ensemble les possibilités."}
              </strong>
              <p>
                {locale === "en"
                  ? "Schedule a tour and see our spaces in action."
                  : "Planifiez une visite et découvrez nos espaces."}
              </p>
              <Link className="button button-primary" href="/tours-and-registration">
                {locale === "en" ? "Request a Tour" : "Demander une visite"}
              </Link>
            </div>
          </aside>
        </div>

        <aside className="reference-day-card" aria-label="Sample program day">
          <h2>
            {locale === "en"
              ? `A Day in Our ${program.name.en}`
              : `Une journée — ${program.name.fr}`}
          </h2>
          <ol>
            {programDays[slug].map(([time, title, description, TimelineIcon]) => (
              <li key={`${time}-${title}`}>
                <span className="reference-day-icon">
                  <TimelineIcon aria-hidden="true" />
                </span>
                <time>{time}</time>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </main>
  );
}

const dailyFlow = [
  ["7:00–9:00", "Arrival", "Warm welcomes and time to settle in.", Heart, "coral"],
  ["9:00–10:30", "Discovery", "Engaging activities and hands-on learning.", Leaf, "sage"],
  ["10:30–11:00", "Meals", "Healthy meals and snacks together.", Apple, "gold"],
  ["11:00–12:00", "Outdoor Play", "Fresh air, movement, and big fun.", Trees, "sage"],
  ["12:00–2:00", "Rest", "Rest time to recharge and relax.", Moon, "blue"],
  ["2:00–4:00", "Reflection", "Stories, creativity, and small group connection.", Sparkles, "gold"],
  ["4:00–6:00", "Goodbyes", "Sharing our day and heading home.", Hand, "coral"],
] as const;

export function DailyExperience() {
  const { locale } = useLanguage();

  return (
    <main className="reference-public reference-daily" id="main-content">
      <section className="reference-daily-grid page-width">
        <div className="reference-daily-photo" aria-hidden="true">
          <Image src="/images/program-preschool.png" alt="" fill sizes="260px" loading="eager" />
          <span className="reference-daily-plant">
            <Leaf />
          </span>
        </div>
        <div className="reference-daily-content">
          <header>
            <h1>
              {locale === "en"
                ? "A Day of Discovery, Care, and Connection"
                : "Une journée de découverte, de soins et de connexion"}
            </h1>
            <p>
              {locale === "en"
                ? "Thoughtful routines that help children feel safe, supported, and inspired."
                : "Des routines réfléchies qui aident les enfants à se sentir en sécurité, soutenus et inspirés."}
            </p>
          </header>
          <ol className="reference-daily-timeline">
            {dailyFlow.map(([time, title, description, Icon, tone]) => (
              <li key={title}>
                <span className={`reference-flow-icon ${tone}`}>
                  <Icon aria-hidden="true" />
                </span>
                <time>{time}</time>
                <h2>{title}</h2>
                <p>{description}</p>
              </li>
            ))}
          </ol>
          <section className="reference-inline-cta reference-daily-cta">
            <span className="reference-cta-mark">
              <Leaf aria-hidden="true" />
            </span>
            <div>
              <strong>
                {locale === "en"
                  ? "Experience the Oasis difference."
                  : "Découvrez l'expérience Oasis."}
              </strong>
              <p>
                {locale === "en"
                  ? "Book a tour and see our daily rhythm in action."
                  : "Planifiez une visite et découvrez notre rythme quotidien."}
              </p>
            </div>
            <Link className="button button-primary" href="/tours-and-registration">
              {locale === "en" ? "Request a Tour" : "Demander une visite"}
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
