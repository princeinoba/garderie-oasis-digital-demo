export type Locale = "en" | "fr";

export const uiCopy = {
  en: {
    demoLabel: "Independent portfolio demonstration",
    fictionalOnly: "Fictional information only",
    skip: "Skip to main content",
    programs: "Programs",
    daily: "Daily Experience",
    meals: "Meals",
    fees: "Fees",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Privacy",
    accessibility: "Accessibility",
    director: "Director demo",
    tour: "Request a Tour",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    language: "Passer au français",
    footerNotice:
      "Independent portfolio demonstration using fictional information. This website is not operated, sponsored, endorsed or authorized by Garderie Oasis. It does not submit a real childcare application, waitlist entry or tour request.",
  },
  fr: {
    demoLabel: "Démonstration de portfolio indépendante",
    fictionalOnly: "Renseignements fictifs seulement",
    skip: "Aller au contenu principal",
    programs: "Programmes",
    daily: "Journée vécue",
    meals: "Repas",
    fees: "Tarifs",
    about: "à propos",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Confidentialité",
    accessibility: "Accessibilité",
    director: "Démo direction",
    tour: "Demander une visite",
    menuOpen: "Ouvrir la navigation",
    menuClose: "Fermer la navigation",
    language: "Switch to English",
    footerNotice:
      "Démonstration de portfolio indépendante utilisant des renseignements fictifs. Ce site n'est ni exploité, ni commandité, ni approuvé, ni autorisé par Garderie Oasis. Il ne soumet aucune demande réelle de garde, d'inscription à une liste d'attente ou de visite.",
  },
} as const;

export type UiKey = keyof (typeof uiCopy)["en"];
