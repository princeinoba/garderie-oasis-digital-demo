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

export type DemoStaffMember = {
  name: string;
  role: string;
  email: string;
  initials: string;
};

export type DemoFaqArticle = {
  article: string;
  language: "EN" | "FR";
  status: "Approved" | "Draft";
  updated: string;
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
    guardian: "Léa Tremblay",
    email: "lea.tremblay@synthetic.invalid",
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
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a006",
    reference: "GO-2026-3F21A6D2",
    guardian: "Julien Rousseau",
    email: "julien.rousseau@synthetic.invalid",
    phone: "613-555-0126",
    ageGroup: "preschool",
    requested: "Aug 13, 2026",
    desiredStart: "January 2027",
    status: "completed",
    source: "Referral",
    language: "French",
    careSchedule: "Part-time interest",
    preferredDate: "Aug 25, 2026",
    preferredTime: "10:30 AM",
    assignedTo: "Sofia Almeida",
    question: "Interested in the fictional preschool daily rhythm.",
  },
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a007",
    reference: "GO-2026-4A0E9C31",
    guardian: "Chloé Gagnon",
    email: "chloe.gagnon@synthetic.invalid",
    phone: "613-555-0163",
    ageGroup: "infant",
    requested: "Aug 12, 2026",
    desiredStart: "February 2027",
    status: "new",
    source: "Website",
    language: "French",
    careSchedule: "Full-time interest",
    preferredDate: "Aug 26, 2026",
    preferredTime: "9:00 AM",
    assignedTo: "Nadia Benali",
    question: "Would like a tour of the synthetic infant environment.",
  },
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a008",
    reference: "GO-2026-E6C4D991",
    guardian: "Carlos Mendes",
    email: "carlos.mendes@synthetic.invalid",
    phone: "613-555-0155",
    ageGroup: "toddler",
    requested: "Aug 11, 2026",
    desiredStart: "October 2026",
    status: "reviewing",
    source: "Website",
    language: "English",
    careSchedule: "Full-time interest",
    preferredDate: "Aug 27, 2026",
    preferredTime: "11:00 AM",
    assignedTo: "Amélie Roy",
    question: "Asks about the illustrative toddler learning centres.",
  },
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a009",
    reference: "GO-2026-19A74BD0",
    guardian: "Mina Patel",
    email: "mina.patel@synthetic.invalid",
    phone: "613-555-0197",
    ageGroup: "preschool",
    requested: "Aug 10, 2026",
    desiredStart: "September 2026",
    status: "follow_up",
    source: "Referral",
    language: "English",
    careSchedule: "Part-time interest",
    preferredDate: "Aug 28, 2026",
    preferredTime: "1:00 PM",
    assignedTo: "Sofia Almeida",
    question: "Interested in bilingual preschool demonstration content.",
  },
  {
    id: "5ec1f519-078c-4bb4-b7a2-2a62a1b0a010",
    reference: "GO-2026-8C5B027E",
    guardian: "Élodie Caron",
    email: "elodie.caron@synthetic.invalid",
    phone: "613-555-0114",
    ageGroup: "toddler",
    requested: "Aug 9, 2026",
    desiredStart: "March 2027",
    status: "closed",
    source: "Website",
    language: "French",
    careSchedule: "Unsure",
    preferredDate: "Aug 29, 2026",
    preferredTime: "2:30 PM",
    assignedTo: "Amélie Roy",
    question: "Requested general information and no further follow-up.",
  },
];

export const demoStaff: DemoStaffMember[] = [
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
    name: "Camille Dubois",
    role: "Toddler Educator",
    email: "camille.dubois@synthetic.invalid",
    initials: "CD",
  },
  {
    name: "Thomas Nguyen",
    role: "Support Staff",
    email: "thomas.nguyen@synthetic.invalid",
    initials: "TN",
  },
  {
    name: "Nadia Benali",
    role: "Cook",
    email: "nadia.benali@synthetic.invalid",
    initials: "NB",
  },
  {
    name: "Élise Lambert",
    role: "Administrative Assistant",
    email: "elise.lambert@synthetic.invalid",
    initials: "EL",
  },
];

export const demoFaqArticles: DemoFaqArticle[] = [
  {
    article: "What are your hours of operation?",
    language: "EN",
    status: "Approved",
    updated: "Aug 18, 2026",
  },
  {
    article: "Quelles sont vos heures d'ouverture?",
    language: "FR",
    status: "Approved",
    updated: "Aug 18, 2026",
  },
  {
    article: "What is included in the daily program?",
    language: "EN",
    status: "Approved",
    updated: "Aug 15, 2026",
  },
  {
    article: "Qu'est-ce qui est inclus dans le programme quotidien?",
    language: "FR",
    status: "Approved",
    updated: "Aug 15, 2026",
  },
  {
    article: "What are the enrolment requirements?",
    language: "EN",
    status: "Draft",
    updated: "Aug 12, 2026",
  },
  {
    article: "Quels sont les critères d'inscription?",
    language: "FR",
    status: "Draft",
    updated: "Aug 12, 2026",
  },
  {
    article: "How do you support transitions?",
    language: "EN",
    status: "Approved",
    updated: "Aug 10, 2026",
  },
  {
    article: "Comment soutenez-vous les transitions?",
    language: "FR",
    status: "Approved",
    updated: "Aug 10, 2026",
  },
];
