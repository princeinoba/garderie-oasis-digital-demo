"use client";

import { useState } from "react";

import {
  Banknote,
  Check,
  Clock3,
  ExternalLink,
  Heart,
  Keyboard,
  Leaf,
  LockKeyhole,
  Mail,
  MessageSquare,
  ShieldCheck,
  Speaker,
  Sun,
  Users,
  Utensils,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";

export function MealsPageContent() {
  const { locale } = useLanguage();
  const days =
    locale === "en"
      ? ["Mon 26", "Tue 27", "Wed 28", "Thu 29", "Fri 30"]
      : ["Lun 26", "Mar 27", "Mer 28", "Jeu 29", "Ven 30"];
  const meals =
    locale === "en"
      ? [
          ["Oatmeal with banana", "Turkey & veggie rice bowl", "Apple slices & cheese"],
          ["Yogurt with berries", "Lentil & veggie soup", "Hummus & carrot sticks"],
          ["Whole-grain toast", "Chicken pasta with vegetables", "Pear slices & yogurt"],
          ["Berry smoothie", "Quinoa & black bean salad", "Cucumber & mini pita"],
          ["Scrambled eggs", "Baked salmon with sweet potato", "Mixed berries & rice cake"],
        ]
      : [
          ["Gruau et banane", "Bol de riz, dinde et légumes", "Pommes et fromage"],
          ["Yogourt et petits fruits", "Soupe aux lentilles et légumes", "Houmous et carottes"],
          ["Rôtie de grains entiers", "Pâtes au poulet et légumes", "Poires et yogourt"],
          [
            "Smoothie aux petits fruits",
            "Salade de quinoa et haricots noirs",
            "Concombre et mini-pita",
          ],
          ["Œufs brouillés", "Saumon et patate douce", "Petits fruits et galette de riz"],
        ];

  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">
          {locale === "en" ? "Balanced demo menu" : "Menu de démonstration équilibré"}
        </p>
        <h1>{locale === "en" ? "Meals" : "Repas"}</h1>
        <p>
          {locale === "en"
            ? "Nourishing bodies, inspiring healthy habits."
            : "Nourrir le corps et inspirer de saines habitudes."}
        </p>
        <div className="notice notice-sage">
          <Leaf aria-hidden="true" />
          <span>
            {locale === "en"
              ? "This menu is synthetic and demonstrates an allergy-aware planning approach. Actual menus may vary."
              : "Ce menu est fictif et illustre une approche sensible aux allergies. Les menus réels peuvent varier."}
          </span>
        </div>
      </section>
      <section className="page-width">
        <h2 className="content-heading">
          {locale === "en" ? "Week of May 26–30, 2025" : "Semaine du 26 au 30 mai 2025"}
        </h2>
        <div className="meal-grid">
          {days.map((day, index) => {
            const dailyMeals = meals[index] ?? ["", "", ""];
            return (
              <article key={day}>
                <h3>{day}</h3>
                <dl>
                  <dt>{locale === "en" ? "Breakfast" : "Déjeuner"}</dt>
                  <dd>{dailyMeals[0]}</dd>
                  <dt>{locale === "en" ? "Lunch" : "Dîner"}</dt>
                  <dd>{dailyMeals[1]}</dd>
                  <dt>{locale === "en" ? "Snack" : "Collation"}</dt>
                  <dd>{dailyMeals[2]}</dd>
                </dl>
              </article>
            );
          })}
        </div>
        <div className="notice notice-coral">
          <Utensils aria-hidden="true" />
          <span>
            <strong>
              {locale === "en" ? "Allergy-aware environment:" : "Milieu sensible aux allergies :"}
            </strong>{" "}
            {locale === "en"
              ? "Please share only general accommodation needs during a demo tour. Do not submit medical records."
              : "Lors d'une visite de démo, partagez seulement les besoins généraux. Ne soumettez aucun dossier médical."}
          </span>
        </div>
      </section>
    </main>
  );
}

export function FeesPageContent() {
  const { locale } = useLanguage();
  const tiers = [
    {
      name: locale === "en" ? "Infants" : "Nourrissons",
      age: locale === "en" ? "0–18 months" : "0–18 mois",
      fee: "$64.00",
    },
    {
      name: locale === "en" ? "Toddlers" : "Tout-petits",
      age: locale === "en" ? "18 months–2.5 years" : "18 mois–2,5 ans",
      fee: "$58.00",
    },
    {
      name: locale === "en" ? "Preschool" : "Préscolaire",
      age: locale === "en" ? "2.5–4 years" : "2,5–4 ans",
      fee: "$52.00",
    },
  ];

  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">
          {locale === "en" ? "Illustrative information" : "Renseignements à titre indicatif"}
        </p>
        <h1>
          {locale === "en" ? "Fees & Financial Information" : "Tarifs et renseignements financiers"}
        </h1>
        <p>
          {locale === "en"
            ? "Transparent in structure, fictional in amount."
            : "Une structure transparente avec des montants fictifs."}
        </p>
        <div className="notice notice-gold">
          <Banknote aria-hidden="true" />
          <span>
            {locale === "en"
              ? "All fees below are illustrative and used only for this portfolio demonstration."
              : "Tous les tarifs ci-dessous sont fictifs et servent uniquement à cette démonstration."}
          </span>
        </div>
      </section>
      <section className="fees-layout page-width">
        <div className="fee-grid">
          {tiers.map((tier) => (
            <article key={tier.name}>
              <h2>{tier.name}</h2>
              <p>{tier.age}</p>
              <strong>{tier.fee}</strong>
              <small>
                {locale === "en" ? "per day — illustrative only" : "par jour — à titre indicatif"}
              </small>
              <ul>
                {[
                  locale === "en" ? "Meals & snacks" : "Repas et collations",
                  locale === "en" ? "Daily updates" : "Nouvelles quotidiennes",
                  locale === "en" ? "Indoor & outdoor play" : "Jeu intérieur et extérieur",
                ].map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <aside className="official-card">
          <Banknote aria-hidden="true" />
          <h2>{locale === "en" ? "Official Information" : "Renseignements officiels"}</h2>
          <p>
            {locale === "en"
              ? "Child care fee support, subsidy eligibility, and financial assistance are administered through official City of Ottawa channels."
              : "L'aide financière et l'admissibilité aux subventions sont administrées par les canaux officiels de la Ville d'Ottawa."}
          </p>
          <a
            className="button button-secondary"
            href="https://ottawa.ca/en/family-and-social-services/childrens-services"
            target="_blank"
            rel="noreferrer"
          >
            Ottawa.ca / Child Care <ExternalLink aria-hidden="true" size={16} />
          </a>
        </aside>
      </section>
    </main>
  );
}

export function AboutPageContent() {
  const { locale } = useLanguage();
  const items: ReadonlyArray<readonly [string, string, LucideIcon]> =
    locale === "en"
      ? [
          [
            "Our Mission",
            "To nurture each child's potential through warm relationships, curiosity, and play in a calm, inclusive demonstration environment.",
            Leaf,
          ],
          ["Our Values", "Kindness — Respect — Curiosity — Inclusion — Integrity", Heart],
          [
            "Our Approach",
            "A play-based, emergent demonstration curriculum supporting social-emotional growth, language, and independence.",
            Sun,
          ],
        ]
      : [
          [
            "Notre mission",
            "Nourrir le potentiel de chaque enfant par des relations chaleureuses, la curiosité et le jeu dans un milieu de démonstration inclusif.",
            Leaf,
          ],
          ["Nos valeurs", "Gentillesse — Respect — Curiosité — Inclusion — Intégrité", Heart],
          [
            "Notre approche",
            "Un programme de démonstration émergent et axé sur le jeu qui soutient la croissance, le langage et l'autonomie.",
            Sun,
          ],
        ];
  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">{locale === "en" ? "A place to grow" : "Un lieu pour grandir"}</p>
        <h1>
          {locale === "en"
            ? "About Garderie Oasis Digital Experience"
            : "À propos de l'expérience numérique Garderie Oasis"}
        </h1>
        <p>
          {locale === "en"
            ? "An original, independent portfolio demonstration—not a real childcare operator."
            : "Une démonstration de portfolio originale et indépendante, et non un vrai service de garde."}
        </p>
      </section>
      <section className="about-layout page-width">
        <div className="value-list">
          {items.map(([title, text, Icon]) => (
            <article key={title as string}>
              <span className="icon-disc sage">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h2>{title as string}</h2>
                <p>{text as string}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="about-visual" aria-hidden="true">
          <span className="about-sun" />
          <span className="about-leaf l1" />
          <span className="about-leaf l2" />
          <span className="about-leaf l3" />
          <span className="about-book" />
        </div>
      </section>
      <div className="notice notice-sage page-width">
        <Leaf aria-hidden="true" />
        <span>
          {locale === "en"
            ? "We proudly celebrate diversity and welcome families from all backgrounds in this fictional demonstration."
            : "Cette démonstration fictive célèbre la diversité et accueille les familles de tous les horizons."}
        </span>
      </div>
    </main>
  );
}

export function ContactPageContent() {
  const { locale } = useLanguage();
  const [sent, setSent] = useState(false);
  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">
          {locale === "en" ? "We're here to help" : "Nous sommes là pour vous aider"}
        </p>
        <h1>{locale === "en" ? "Contact Us" : "Communiquez avec nous"}</h1>
        <p>
          {locale === "en"
            ? "Use this safe demonstration form for a general question."
            : "Utilisez ce formulaire de démonstration sécuritaire pour une question générale."}
        </p>
      </section>
      <section className="contact-layout page-width">
        <div className="contact-list">
          {(
            [
              [
                Mail,
                locale === "en" ? "General Inquiries" : "Questions générales",
                locale === "en"
                  ? "A safe place for general, non-sensitive questions."
                  : "Un espace sûr pour les questions générales non sensibles.",
              ],
              [
                Users,
                locale === "en" ? "Program Information" : "Renseignements sur les programmes",
                locale === "en"
                  ? "Learn about age groups and daily life."
                  : "Découvrez les groupes d'âge et le quotidien.",
              ],
              [
                Clock3,
                locale === "en" ? "Response Expectations" : "Délai de réponse",
                locale === "en"
                  ? "This demo does not send or receive real messages."
                  : "Cette démo n'envoie et ne reçoit aucun vrai message.",
              ],
            ] as ReadonlyArray<readonly [LucideIcon, string, string]>
          ).map(([Icon, title, text]) => (
            <article key={title as string}>
              <span className="icon-disc sage">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h2>{title as string}</h2>
                <p>{text as string}</p>
              </div>
            </article>
          ))}
        </div>
        <form
          className="contact-form card"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <h2>{locale === "en" ? "Send a message" : "Envoyer un message"}</h2>
          <p>
            {locale === "en"
              ? "This is a safe demonstration. No message is delivered."
              : "Ceci est une démonstration. Aucun message n'est transmis."}
          </p>
          <label>
            {locale === "en" ? "Your name" : "Votre nom"}
            <input autoComplete="name" required />
          </label>
          <label>
            {locale === "en" ? "Email address" : "Adresse courriel"}
            <input type="email" autoComplete="email" required />
          </label>
          <label>
            {locale === "en" ? "Message" : "Message"}
            <textarea required maxLength={600} />
          </label>
          <button className="button button-primary" type="submit">
            {locale === "en" ? "Preview Message" : "Prévisualiser le message"}
          </button>
          {sent && (
            <p className="success-message" role="status">
              {locale === "en"
                ? "Preview created. Delivery is disabled in this synthetic demo."
                : "Aperçu créé. La livraison est désactivée dans cette démo fictive."}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export function PrivacyPageContent() {
  const { locale } = useLanguage();
  const sections: ReadonlyArray<readonly [string, string]> =
    locale === "en"
      ? [
          [
            "Independent demonstration",
            "This is not a live childcare service and does not submit information to Garderie Oasis or the City of Ottawa.",
          ],
          [
            "What the form accepts",
            "Preliminary guardian contact details, general program interest, preferred tour timing, and optional accessibility accommodation. It does not ask for a child's name, exact birth date, diagnosis, health record, government ID, custody record, photo, or financial information.",
          ],
          [
            "How information is used",
            "Submitted demonstration details are validated to produce a fictional reference and confirmation preview. Initial production mode does not persist them or send email or SMS.",
          ],
          [
            "AI processing",
            "Oasis Guide receives no form data. Deterministic staff proposal examples use only synthetic records and cannot mutate an inquiry or send a message.",
          ],
          [
            "Retention, correction, and deletion",
            "The initial demo keeps no durable submitted tour record. Device-only preferences can be cleared through browser settings. A real deployment would require an approved retention schedule and verified rights workflow.",
          ],
          [
            "Service providers",
            "The application may be hosted by a cloud platform. Optional Supabase and AI providers remain disabled until separately configured and reviewed.",
          ],
          [
            "Official registry separation",
            "Families seeking licensed child care must use the City of Ottawa Child Care Registry and Waitlist. This demonstration is entirely separate.",
          ],
        ]
      : [
          [
            "Démonstration indépendante",
            "Ceci n'est pas un vrai service de garde et aucun renseignement n'est soumis à Garderie Oasis ni à la Ville d'Ottawa.",
          ],
          [
            "Renseignements acceptés",
            "Coordonnées préliminaires, intérêt général, horaire de visite et mesure d'accessibilité facultative. Aucun nom d'enfant, date de naissance exacte, diagnostic, dossier médical, pièce d'identité, dossier de garde, photo ou renseignement financier.",
          ],
          [
            "Utilisation des renseignements",
            "Les détails sont validés afin de produire une référence fictive et un aperçu de confirmation. Le mode initial ne conserve rien durablement et n'envoie aucun courriel ni texto.",
          ],
          [
            "Traitement par l'IA",
            "Le Guide Oasis ne reçoit aucune donnée du formulaire. Les propositions du personnel utilisent seulement des dossiers fictifs et ne peuvent ni modifier un dossier ni envoyer un message.",
          ],
          [
            "Conservation, correction et suppression",
            "La démo initiale ne conserve aucun dossier de visite durable. Les préférences locales peuvent être supprimées dans le navigateur. Une vraie activation exigerait un calendrier de conservation et un processus vérifié.",
          ],
          [
            "Fournisseurs de services",
            "L'application peut être hébergée sur une plateforme infonuagique. Supabase et les fournisseurs d'IA facultatifs restent désactivés jusqu'à une configuration et une révision distinctes.",
          ],
          [
            "Séparation du registre officiel",
            "Les familles doivent utiliser le Registre et la Liste d'attente des services de garde d'enfants de la Ville d'Ottawa. Cette démo est entièrement distincte.",
          ],
        ];
  return (
    <PolicyPage
      title={locale === "en" ? "Privacy" : "Confidentialité"}
      intro={
        locale === "en"
          ? "Demonstration content requiring professional review before real-world use."
          : "Contenu de démonstration nécessitant une révision professionnelle avant tout usage réel."
      }
      sections={sections}
      icon={ShieldCheck}
    />
  );
}

export function AccessibilityPageContent() {
  const { locale } = useLanguage();
  const items: ReadonlyArray<readonly [string, string, LucideIcon]> =
    locale === "en"
      ? [
          [
            "Keyboard accessible",
            "Core features can be reached and operated using a keyboard.",
            Keyboard,
          ],
          [
            "Screen-reader friendly",
            "Semantic HTML, descriptive text, form labels, status messages, and landmarks support assistive technology.",
            Speaker,
          ],
          [
            "Contrast & colour",
            "Strong contrast, visible focus, reduced-motion support, and forced-colours rules support readability.",
            Sun,
          ],
          [
            "Feedback & support",
            "The contact route provides a safe demonstration path for accessibility feedback.",
            MessageSquare,
          ],
        ]
      : [
          [
            "Accessible au clavier",
            "Les fonctions principales peuvent être atteintes et utilisées au clavier.",
            Keyboard,
          ],
          [
            "Compatible avec les lecteurs d'écran",
            "HTML sémantique, textes descriptifs, étiquettes, messages d'état et repères soutiennent les technologies d'aide.",
            Speaker,
          ],
          [
            "Contraste et couleur",
            "Contraste élevé, focus visible, mouvement réduit et couleurs forcées améliorent la lisibilité.",
            Sun,
          ],
          [
            "Commentaires et soutien",
            "La page Contact offre un parcours de démonstration pour les commentaires d'accessibilité.",
            MessageSquare,
          ],
        ];
  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">WCAG 2.2 AA</p>
        <h1>{locale === "en" ? "Accessibility" : "Accessibilité"}</h1>
        <p>
          {locale === "en"
            ? "We aim to make this demonstration comfortable and usable for more people."
            : "Nous souhaitons rendre cette démonstration confortable et utilisable par davantage de personnes."}
        </p>
      </section>
      <section className="accessibility-list page-width">
        {items.map(([title, text, Icon]) => (
          <article key={title as string}>
            <span className="icon-disc sage">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <h2>{title as string}</h2>
              <p>{text as string}</p>
            </div>
          </article>
        ))}
      </section>
      <div className="notice notice-gold page-width">
        <LockKeyhole aria-hidden="true" />
        <span>
          {locale === "en"
            ? "Accessibility is an ongoing practice. Automated checks do not replace testing with people who use assistive technologies."
            : "L'accessibilité est une pratique continue. Les tests automatisés ne remplacent pas les essais avec des personnes utilisant des technologies d'aide."}
        </span>
      </div>
    </main>
  );
}

function PolicyPage({
  title,
  intro,
  sections,
  icon: Icon,
}: {
  title: string;
  intro: string;
  sections: readonly (readonly [string, string])[];
  icon: typeof ShieldCheck;
}) {
  return (
    <main className="interior-main" id="main-content">
      <section className="interior-hero page-width">
        <p className="eyebrow">Independent demonstration</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <section className="policy-layout page-width">
        <aside>
          <Icon aria-hidden="true" />
          <strong>Privacy notice</strong>
          <span>Version 2026-08-18</span>
        </aside>
        <div>
          {sections.map(([heading, text]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
