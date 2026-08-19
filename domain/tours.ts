import { z } from "zod";

const syntheticEmail = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .refine((value) => value.toLowerCase().endsWith("@synthetic.invalid"), {
    message: "Use a fictional @synthetic.invalid address for this demonstration.",
  });

const fictionalPhone = z
  .string()
  .trim()
  .min(7, "Enter a fictional telephone number.")
  .max(30)
  .refine((value) => value.includes("555"), {
    message: "Use a fictional number containing 555.",
  });

export const stepOneSchema = z.object({
  guardianFirstName: z.string().trim().min(2, "Enter a fictional first name.").max(60),
  guardianLastName: z.string().trim().min(2, "Enter a fictional last name.").max(60),
  email: syntheticEmail,
  phone: fictionalPhone,
  preferredLanguage: z.enum(["en", "fr"]),
  preferredContactMethod: z.enum(["email", "phone"]),
});

export const stepTwoSchema = z.object({
  childAgeGroup: z.enum(["infant", "toddler", "preschool"]),
  programInterest: z.enum(["infant", "toddler", "preschool", "unsure"]),
  desiredStartMonth: z.string().regex(/^\d{4}-\d{2}$/, "Select a desired start month."),
  careSchedule: z.enum(["full_time", "part_time", "unsure"]),
  preferredTourDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a preferred tour date."),
  preferredTourTime: z.enum(["morning", "midday", "afternoon"]),
  adultAttendeeCount: z.coerce.number().int().min(1).max(4),
  accessibilityRequest: z.string().trim().max(500),
  generalQuestion: z.string().trim().max(800),
});

export const tourSubmissionSchema = stepOneSchema.extend(stepTwoSchema.shape).extend({
  privacyAcknowledgement: z.literal(true, { error: "Acknowledge the privacy notice." }),
  communicationConsent: z.literal(true, { error: "Consent to a synthetic confirmation preview." }),
  registryAcknowledgement: z.literal(true, {
    error: "Confirm that this is not the official Ottawa waitlist.",
  }),
  website: z.string().max(0).optional(),
});

export type TourSubmission = z.infer<typeof tourSubmissionSchema>;

export const tourStates = [
  "new",
  "reviewing",
  "tour_offered",
  "confirmed",
  "completed",
  "follow_up",
  "cancelled",
  "closed",
] as const;

export type TourState = (typeof tourStates)[number];

export const allowedTourTransitions: Readonly<Record<TourState, readonly TourState[]>> = {
  new: ["reviewing", "closed"],
  reviewing: ["tour_offered", "closed"],
  tour_offered: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: ["follow_up", "closed"],
  follow_up: ["closed"],
  cancelled: ["reviewing"],
  closed: [],
};

export function canTransitionTour(from: TourState, to: TourState): boolean {
  return allowedTourTransitions[from].includes(to);
}

export function assertTourTransition(from: TourState, to: TourState): void {
  if (!canTransitionTour(from, to)) throw new Error(`Invalid tour transition: ${from} -> ${to}`);
}

export function createInquiryReference(seed: string, now = new Date()): string {
  let hash = 2166136261;
  for (const character of seed.trim().toLowerCase()) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  const year = now.getUTCFullYear();
  return `GO-${year}-${(hash >>> 0).toString(16).toUpperCase().padStart(8, "0").slice(0, 8)}`;
}
