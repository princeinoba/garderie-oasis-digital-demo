"use client";

import {
  BrainCircuit,
  Contrast,
  Clock3,
  Keyboard,
  MessageSquare,
  ShieldCheck,
  UsersRound,
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";

type InformationItem = readonly [title: string, text: string, icon: LucideIcon];

function AuthInformationPage({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: readonly InformationItem[];
}) {
  return (
    <section className="auth-form auth-form-wide auth-reference-wide auth-information-page">
      <div className="auth-form-heading">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <div className="auth-info-list">
        {items.map(([heading, text, Icon]) => (
          <article key={heading}>
            <span className="auth-info-icon">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <h2>{heading}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PrivacyAuthPageContent() {
  const { locale } = useLanguage();
  const items: readonly InformationItem[] =
    locale === "en"
      ? [
          [
            "Synthetic Information",
            "All names, emails, and information in this demonstration are synthetic and fictional. No real children, families, or staff are represented.",
            ShieldCheck,
          ],
          [
            "AI Processing",
            "AI examples generate suggestions or summaries from synthetic records only. No personal data is used to train external models.",
            BrainCircuit,
          ],
          [
            "Retention",
            "The initial demonstration does not persist submitted tour details. Device-only preferences can be cleared at any time.",
            Clock3,
          ],
          [
            "Official Waitlist Separation",
            "This portfolio demonstration is completely separate from the City of Ottawa Child Care Registry and Waitlist and from real-world services.",
            UsersRound,
          ],
        ]
      : [
          [
            "Renseignements fictifs",
            "Tous les noms, courriels et renseignements de cette démo sont fictifs. Aucun enfant, famille ou membre du personnel réel n’est représenté.",
            ShieldCheck,
          ],
          [
            "Traitement par l’IA",
            "Les exemples d’IA utilisent uniquement des dossiers fictifs. Aucune donnée personnelle ne sert à entraîner un modèle externe.",
            BrainCircuit,
          ],
          [
            "Conservation",
            "La démonstration initiale ne conserve pas les demandes de visite. Les préférences locales peuvent être supprimées en tout temps.",
            Clock3,
          ],
          [
            "Séparation de la liste officielle",
            "Cette démo est entièrement distincte du Registre et de la Liste d’attente des services de garde de la Ville d’Ottawa.",
            UsersRound,
          ],
        ];

  return (
    <AuthInformationPage
      title={locale === "en" ? "Privacy" : "Confidentialité"}
      intro={
        locale === "en"
          ? "Your privacy matters. Here’s how information is handled in this demonstration."
          : "Votre vie privée compte. Voici comment les renseignements sont traités dans cette démonstration."
      }
      items={items}
    />
  );
}

export function AccessibilityAuthPageContent() {
  const { locale } = useLanguage();
  const items: readonly InformationItem[] =
    locale === "en"
      ? [
          [
            "Keyboard Accessible",
            "All features can be accessed and operated using a keyboard. Visible focus indicators show where you are.",
            Keyboard,
          ],
          [
            "Screen Reader Friendly",
            "Semantic HTML, descriptive labels, and clear status messages support screen readers.",
            Volume2,
          ],
          [
            "Contrast & Color",
            "Thoughtful color choices and strong contrast support readability for more people.",
            Contrast,
          ],
          [
            "Feedback & Support",
            "We welcome feedback through the Contact page to improve accessibility for everyone.",
            MessageSquare,
          ],
        ]
      : [
          [
            "Accessible au clavier",
            "Toutes les fonctions sont utilisables au clavier et les indicateurs de focus restent visibles.",
            Keyboard,
          ],
          [
            "Compatible avec les lecteurs d’écran",
            "Le HTML sémantique, les étiquettes descriptives et les messages d’état soutiennent les lecteurs d’écran.",
            Volume2,
          ],
          [
            "Contraste et couleur",
            "Des couleurs réfléchies et un contraste élevé améliorent la lisibilité.",
            Contrast,
          ],
          [
            "Commentaires et soutien",
            "La page Contact permet de transmettre des commentaires sur l’accessibilité.",
            MessageSquare,
          ],
        ];

  return (
    <AuthInformationPage
      title={locale === "en" ? "Accessibility" : "Accessibilité"}
      intro={
        locale === "en"
          ? "We are committed to accessibility and follow WCAG 2.2 AA practices."
          : "Nous nous engageons envers l’accessibilité et suivons les pratiques WCAG 2.2 AA."
      }
      items={items}
    />
  );
}
