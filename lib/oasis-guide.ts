import type { Locale } from "@/lib/i18n/content";

export type GuideAnswer = {
  answer: string;
  sourceTitle: string;
  sourceReference: string;
  confidence: string;
  escalation: string;
  refused: boolean;
};

const approvedAnswers = {
  en: [
    {
      keywords: ["program", "infant", "toddler", "preschool", "age"],
      answer:
        "This demonstration presents three age-aware pathways: infants (3–18 months), toddlers (18–36 months), and preschool (3–5 years). The descriptions are illustrative and do not claim real availability.",
      sourceTitle: "Programs for Every Stage",
      sourceReference: "/programs",
    },
    {
      keywords: ["tour", "visit", "registration"],
      answer:
        "Use the three-step demonstration form to share fictional contact and program-interest details, review them, and acknowledge that no real tour or waitlist request is created.",
      sourceTitle: "Tours & Registration",
      sourceReference: "/tours-and-registration",
    },
    {
      keywords: ["ottawa", "registry", "waitlist", "ccraw", "apply"],
      answer:
        "A local demonstration tour request is completely separate from Ottawa's official Child Care Registry and Waitlist. Families seeking licensed child care must use the City's official application process.",
      sourceTitle: "City of Ottawa childcare application information",
      sourceReference:
        "https://ottawa.ca/en/family-and-social-services/childrens-services/apply-child-care",
    },
    {
      keywords: ["meal", "food", "allergy", "snack"],
      answer:
        "The weekly menu is synthetic. It demonstrates balanced, allergy-aware planning, but it is not a real menu or certification. Do not submit medical or allergy records to this demo.",
      sourceTitle: "Demonstration Meals",
      sourceReference: "/meals",
    },
    {
      keywords: ["fee", "cost", "price", "subsidy"],
      answer:
        "All displayed fees are illustrative only. Official fee support and subsidy information must come from the City of Ottawa or another verified authority.",
      sourceTitle: "Illustrative Fees & Financial Information",
      sourceReference: "/fees",
    },
  ],
  fr: [
    {
      keywords: ["programme", "nourrisson", "tout-petit", "préscolaire", "âge"],
      answer:
        "Cette démonstration présente trois parcours : nourrissons (3–18 mois), tout-petits (18–36 mois) et préscolaire (3–5 ans). Les descriptions sont fictives et ne représentent aucune place réelle.",
      sourceTitle: "Des programmes pour chaque étape",
      sourceReference: "/programs",
    },
    {
      keywords: ["visite", "inscription", "tour"],
      answer:
        "Utilisez le formulaire de démonstration en trois étapes avec des coordonnées fictives, révisez le tout, puis confirmez qu'aucune vraie visite ni demande d'inscription n'est créée.",
      sourceTitle: "Visites et inscription",
      sourceReference: "/tours-and-registration",
    },
    {
      keywords: ["ottawa", "registre", "liste", "attente", "demande"],
      answer:
        "Une demande locale de visite de démonstration est entièrement distincte du Registre et de la Liste d'attente des services de garde d'enfants d'Ottawa. Les familles doivent utiliser le processus officiel de la Ville.",
      sourceTitle: "Renseignements de la Ville d'Ottawa sur les demandes de garde",
      sourceReference:
        "https://ottawa.ca/fr/famille-et-services-sociaux/services-pour-enfants/demander-une-place-en-service-de-garde",
    },
    {
      keywords: ["repas", "aliment", "allergie", "collation"],
      answer:
        "Le menu hebdomadaire est fictif. Il illustre une planification équilibrée et sensible aux allergies, mais ne constitue ni un vrai menu ni une certification. Ne soumettez aucun dossier médical.",
      sourceTitle: "Repas de démonstration",
      sourceReference: "/meals",
    },
    {
      keywords: ["tarif", "coût", "prix", "subvention"],
      answer:
        "Tous les tarifs affichés sont fictifs. Les renseignements officiels sur l'aide financière doivent provenir de la Ville d'Ottawa ou d'une autre source vérifiée.",
      sourceTitle: "Tarifs et renseignements financiers fictifs",
      sourceReference: "/fees",
    },
  ],
} as const;

const prohibited = [
  "space available",
  "spaces available",
  "availability",
  "waitlist position",
  "eligible",
  "diagnosis",
  "medical advice",
  "photo",
  "health record",
  "admission decision",
  "rank families",
  "guarantee",
  "place disponible",
  "rang",
  "admissible",
  "diagnostic",
  "avis médical",
  "photo",
  "dossier médical",
  "garantie",
];

export function answerOasisGuide(query: string, locale: Locale): GuideAnswer {
  const normalized = query.trim().toLocaleLowerCase(locale === "fr" ? "fr-CA" : "en-CA");
  if (prohibited.some((term) => normalized.includes(term))) {
    return {
      answer:
        locale === "en"
          ? "I can't assess availability, eligibility, waitlist position, admissions, health information, diagnoses, or children's images. I can explain this demonstration or direct you to an official source."
          : "Je ne peux pas évaluer les places, l'admissibilité, le rang sur une liste, l'admission, les renseignements médicaux, les diagnostics ou les images d'enfants. Je peux expliquer cette démonstration ou vous diriger vers une source officielle.",
      sourceTitle:
        locale === "en" ? "Oasis Guide safety boundary" : "Limites de sécurité du Guide Oasis",
      sourceReference: "/privacy",
      confidence:
        locale === "en"
          ? "High confidence: this request is outside the approved scope."
          : "Confiance élevée : cette demande est hors du champ approuvé.",
      escalation:
        locale === "en"
          ? "Use the Contact page for a general, non-sensitive question."
          : "Utilisez la page Contact pour une question générale non sensible.",
      refused: true,
    };
  }

  const match = approvedAnswers[locale].find((item) =>
    item.keywords.some((term) => normalized.includes(term)),
  );
  if (match) {
    return {
      answer: match.answer,
      sourceTitle: match.sourceTitle,
      sourceReference: match.sourceReference,
      confidence:
        locale === "en"
          ? "Approved demonstration content; no live operational data."
          : "Contenu de démonstration approuvé; aucune donnée opérationnelle en direct.",
      escalation:
        locale === "en"
          ? "If this does not answer your question, use the Contact page."
          : "Si cette réponse ne suffit pas, utilisez la page Contact.",
      refused: false,
    };
  }

  return {
    answer:
      locale === "en"
        ? "I don't have an approved answer for that question. I won't guess or invent a policy, fee, schedule, or availability claim."
        : "Je n'ai aucune réponse approuvée à cette question. Je ne vais pas inventer une politique, un tarif, un horaire ou une disponibilité.",
    sourceTitle: locale === "en" ? "Approved FAQ boundary" : "Limites de la FAQ approuvée",
    sourceReference: "/faq",
    confidence:
      locale === "en"
        ? "Information unavailable in approved content."
        : "Renseignement absent du contenu approuvé.",
    escalation:
      locale === "en"
        ? "Use the Contact page for a general, non-sensitive question."
        : "Utilisez la page Contact pour une question générale non sensible.",
    refused: true,
  };
}
