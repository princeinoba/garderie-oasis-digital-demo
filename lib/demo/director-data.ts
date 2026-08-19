import type { TourState } from "@/domain/tours";

export type DemoInquiry = {
  id: string;
  reference: string;
  guardian: string;
  email: string;
  phone: string;
  ageGroup: "infant" | "toddler" | "preschool";
  requested: string;
  desiredStart: string;
  status: TourState;
  source: "Website" | "Referral";
  language: "English" | "French";
  careSchedule: string;
  preferredDate: string;
  preferredTime: string;
  assignedTo: string;
  question: string;
};

export const demoInquiries: DemoInquiry[] = [
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a001",
    reference: "GO-2026-A41D093E",
    guardian: "Sophie Martin",
    email: "sophie.martin@synthetic.invalid",
    phone: "613-555-0134",
    ageGroup: "toddler",
    requested: "Aug 18, 2026",
    desiredStart: "October 2026",
    status: "new",
    source: "Website",
    language: "French",
    careSchedule: "Full-time interest",
    preferredDate: "Aug 25, 2026",
    preferredTime: "9:30 AM",
    assignedTo: "Amélie Roy",
    question: "Looking for a nurturing, bilingual demonstration environment.",
  },
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a002",
    reference: "GO-2026-77BC214A",
    guardian: "Amélie & Marc Dupont",
    email: "amelie.dupont@synthetic.invalid",
    phone: "613-555-0188",
    ageGroup: "infant",
    requested: "Aug 17, 2026",
    desiredStart: "January 2027",
    status: "confirmed",
    source: "Website",
    language: "French",
    careSchedule: "Full-time interest",
    preferredDate: "Aug 26, 2026",
    preferredTime: "10:00 AM",
    assignedTo: "Nadia Benali",
    question: "Would like to understand the fictional infant rhythm.",
  },
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a003",
    reference: "GO-2026-0B5FF110",
    guardian: "Lila Tremblay",
    email: "lila.tremblay@synthetic.invalid",
    phone: "613-555-0171",
    ageGroup: "preschool",
    requested: "Aug 16, 2026",
    desiredStart: "September 2026",
    status: "follow_up",
    source: "Referral",
    language: "English",
    careSchedule: "Part-time interest",
    preferredDate: "Aug 27, 2026",
    preferredTime: "1:30 PM",
    assignedTo: "Sofia Almeida",
    question: "Interested in the play-based preschool demonstration.",
  },
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a004",
    reference: "GO-2026-C58E020F",
    guardian: "Noah Bernard",
    email: "noah.bernard@synthetic.invalid",
    phone: "613-555-0109",
    ageGroup: "toddler",
    requested: "Aug 15, 2026",
    desiredStart: "November 2026",
    status: "tour_offered",
    source: "Website",
    language: "English",
    careSchedule: "Unsure",
    preferredDate: "Aug 28, 2026",
    preferredTime: "2:00 PM",
    assignedTo: "Amélie Roy",
    question: "Asks about outdoor play and language choice.",
  },
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a005",
    reference: "GO-2026-91DA5CB4",
    guardian: "Fatima Alami",
    email: "fatima.alami@synthetic.invalid",
    phone: "613-555-0142",
    ageGroup: "infant",
    requested: "Aug 14, 2026",
    desiredStart: "December 2026",
    status: "reviewing",
    source: "Referral",
    language: "French",
    careSchedule: "Full-time interest",
    preferredDate: "Aug 29, 2026",
    preferredTime: "11:30 AM",
    assignedTo: "Nadia Benali",
    question: "Requests step-free access for the demonstration visit.",
  },
];

export const demoStaff = [
  {
    name: "Isabelle Girard",
    role: "Director",
    email: "isabelle.girard@synthetic.invalid",
    initials: "IG",
  },
  {
    name: "Marc-André Leblanc",
    role: "Assistant Director",
    email: "marc.leblanc@synthetic.invalid",
    initials: "ML",
  },
  {
    name: "Sofia Almeida",
    role: "Early Childhood Educator",
    email: "sofia.almeida@synthetic.invalid",
    initials: "SA",
  },
  {
    name: "Julien Moreau",
    role: "Early Childhood Educator",
    email: "julien.moreau@synthetic.invalid",
    initials: "JM",
  },
  {
    name: "Amélie Roy",
    role: "Tour Coordinator",
    email: "amelie.roy@synthetic.invalid",
    initials: "AR",
  },
  {
    name: "Nadia Benali",
    role: "Support Staff",
    email: "nadia.benali@synthetic.invalid",
    initials: "NB",
  },
];

export const demoFaqArticles = [
  ["What are your hours of operation?", "EN", "Approved", "Aug 18, 2026"],
  ["Quelles sont vos heures d'ouverture?", "FR", "Approved", "Aug 18, 2026"],
  ["What is included in the daily program?", "EN", "Approved", "Aug 15, 2026"],
  ["Qu'est-ce qui est inclus dans le programme quotidien?", "FR", "Approved", "Aug 15, 2026"],
  ["What are the enrolment requirements?", "EN", "Draft", "Aug 12, 2026"],
  ["Comment soutenez-vous les transitions?", "FR", "Approved", "Aug 10, 2026"],
] as const;
