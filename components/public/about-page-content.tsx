"use client";

import Image from "next/image";

import { Heart, Leaf, Sun, type LucideIcon } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";

export function AboutPageContent() {
  const { locale } = useLanguage();
  const items: ReadonlyArray<readonly [string, string, LucideIcon, string]> =
    locale === "en"
      ? [
          [
            "Our Mission",
            "To nurture each child's potential through warm relationships, curiosity, and play in a safe, inclusive environment.",
            Leaf,
            "sage",
          ],
          ["Our Values", "Kindness · Respect · Curiosity · Inclusion · Integrity", Heart, "coral"],
          [
            "Our Approach",
            "We follow a play-based, emergent curriculum that supports social-emotional growth, language, and independence. Children learn best when they feel safe, seen, and inspired.",
            Sun,
            "gold",
          ],
        ]
      : [
          [
            "Notre mission",
            "Nourrir le potentiel de chaque enfant grâce à des relations chaleureuses, à la curiosité et au jeu dans un milieu sécuritaire et inclusif.",
            Leaf,
            "sage",
          ],
          [
            "Nos valeurs",
            "Gentillesse · Respect · Curiosité · Inclusion · Intégrité",
            Heart,
            "coral",
          ],
          [
            "Notre approche",
            "Nous suivons un programme émergent axé sur le jeu qui favorise la croissance socio-émotionnelle, le langage et l'autonomie.",
            Sun,
            "gold",
          ],
        ];

  return (
    <main className="reference-public reference-about" id="main-content">
      <section className="reference-about-grid page-width">
        <div className="reference-about-copy">
          <header>
            <h1>{locale === "en" ? "About Garderie Oasis" : "À propos de Garderie Oasis"}</h1>
            <p>
              {locale === "en"
                ? "A place to grow, belong, and shine."
                : "Un lieu pour grandir, s'épanouir et rayonner."}
            </p>
          </header>
          <div className="reference-about-values">
            {items.map(([title, description, Icon, tone]) => (
              <article key={title as string}>
                <span className={`reference-about-icon ${tone}`}>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h2>{title as string}</h2>
                  <p>{description as string}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="reference-about-photo">
          <Image
            src="/images/about-classroom.png"
            alt="Warm synthetic Garderie Oasis classroom interior"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 42vw"
          />
        </div>
      </section>
      <section className="reference-about-note page-width">
        <Leaf aria-hidden="true" />
        <p>
          {locale === "en"
            ? "We proudly celebrate diversity and welcome families from all backgrounds."
            : "Nous célébrons fièrement la diversité et accueillons les familles de tous les horizons."}
        </p>
      </section>
    </main>
  );
}
