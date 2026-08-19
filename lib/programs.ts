import { BookOpen, Heart, Leaf, Moon, Music2, Sparkles, Sun, Trees } from "lucide-react";

export type ProgramSlug = "infant" | "toddler" | "preschool";

export const programSlugs: ProgramSlug[] = ["infant", "toddler", "preschool"];

export const programContent = {
  infant: {
    tone: "sage",
    icon: Heart,
    name: { en: "Infant Program", fr: "Programme des nourrissons" },
    age: { en: "3–18 months", fr: "3–18 mois" },
    intro: {
      en: "A soothing start filled with warmth, connection, and gentle discovery.",
      fr: "Un départ apaisant rempli de chaleur, de liens et de découvertes en douceur.",
    },
    highlights: {
      en: [
        "Responsive care tailored to each baby's needs",
        "Sensory-rich experiences that support development",
        "Cozy, safe spaces designed for exploration",
        "Strong attachment and consistent routines",
        "Open communication with families",
      ],
      fr: [
        "Des soins attentifs adaptés aux besoins de chaque bébé",
        "Des expériences sensorielles favorisant le développement",
        "Des espaces douillets et sécuritaires pour explorer",
        "Des routines constantes qui favorisent l'attachement",
        "Une communication ouverte avec les familles",
      ],
    },
  },
  toddler: {
    tone: "gold",
    icon: Leaf,
    name: { en: "Toddler Program", fr: "Programme des tout-petits" },
    age: { en: "18–36 months", fr: "18–36 mois" },
    intro: {
      en: "Encouraging independence, movement, and big discoveries every day.",
      fr: "Encourager l'autonomie, le mouvement et les grandes découvertes au quotidien.",
    },
    highlights: {
      en: [
        "Hands-on learning through play and exploration",
        "Opportunities to build language and social skills",
        "Routines that support growing independence",
        "Safe spaces for active movement",
        "Ongoing updates and family partnership",
      ],
      fr: [
        "Apprendre par le jeu et l'exploration",
        "Développer le langage et les habiletés sociales",
        "Des routines qui soutiennent l'autonomie",
        "Des espaces sûrs pour bouger activement",
        "Des nouvelles régulières et un partenariat familial",
      ],
    },
  },
  preschool: {
    tone: "coral",
    icon: Sun,
    name: { en: "Preschool Program", fr: "Programme préscolaire" },
    age: { en: "3–5 years", fr: "3–5 ans" },
    intro: {
      en: "Inspiring curiosity, creativity, and confidence through meaningful learning.",
      fr: "Nourrir la curiosité, la créativité et la confiance par des apprentissages signifiants.",
    },
    highlights: {
      en: [
        "Play-based learning that sparks curiosity",
        "Early literacy and numeracy experiences",
        "Social skills and emotional growth",
        "Creative arts, music, and movement",
        "School readiness through daily routines",
      ],
      fr: [
        "Apprendre par le jeu et éveiller la curiosité",
        "Des expériences précoces de littératie et de numératie",
        "Le développement social et émotionnel",
        "Arts créatifs, musique et mouvement",
        "Se préparer à l'école grâce aux routines",
      ],
    },
  },
} as const;

export const dailyTimeline = [
  { time: "7:00–9:00", icon: Heart, en: "Arrival & Connection", fr: "Accueil et connexion" },
  { time: "9:00–9:45", icon: Sparkles, en: "Sensory Discovery", fr: "Découverte sensorielle" },
  { time: "9:45–10:30", icon: BookOpen, en: "Learning Centres", fr: "Centres d'apprentissage" },
  { time: "10:30–11:30", icon: Trees, en: "Outdoor Play", fr: "Jeu à l'extérieur" },
  { time: "11:30–1:30", icon: Moon, en: "Lunch & Rest", fr: "Dîner et repos" },
  { time: "1:30–4:30", icon: Music2, en: "Connection & Play", fr: "Connexion et jeu" },
  { time: "4:30–6:00", icon: Sun, en: "Goodbyes & Hugs", fr: "Au revoir et câlins" },
] as const;
