import { describe, expect, it } from "vitest";
import {
  assertTourTransition,
  canTransitionTour,
  createInquiryReference,
  tourSubmissionSchema,
} from "@/domain/tours";

const valid = {
  guardianFirstName: "Alex",
  guardianLastName: "Johnson",
  email: "alex.johnson@synthetic.invalid",
  phone: "613-555-0123",
  preferredLanguage: "en",
  preferredContactMethod: "email",
  childAgeGroup: "toddler",
  programInterest: "toddler",
  desiredStartMonth: "2026-10",
  careSchedule: "full_time",
  preferredTourDate: "2026-08-28",
  preferredTourTime: "morning",
  adultAttendeeCount: 2,
  accessibilityRequest: "",
  generalQuestion: "",
  privacyAcknowledgement: true,
  communicationConsent: true,
  registryAcknowledgement: true,
  website: "",
};

describe("tour domain", () => {
  it("accepts only bounded synthetic submissions", () => {
    expect(tourSubmissionSchema.safeParse(valid).success).toBe(true);
    expect(tourSubmissionSchema.safeParse({ ...valid, email: "real@example.com" }).success).toBe(
      false,
    );
    expect(tourSubmissionSchema.safeParse({ ...valid, phone: "613-123-4567" }).success).toBe(false);
  });
  it("requires each independent acknowledgement", () => {
    expect(
      tourSubmissionSchema.safeParse({ ...valid, registryAcknowledgement: false }).success,
    ).toBe(false);
  });
  it("creates deterministic non-sequential references", () => {
    const date = new Date("2026-08-18T12:00:00Z");
    expect(createInquiryReference("same-seed", date)).toBe(
      createInquiryReference("same-seed", date),
    );
    expect(createInquiryReference("same-seed", date)).toMatch(/^GO-2026-[A-F0-9]{8}$/);
  });
  it("enforces the explicit state machine", () => {
    expect(canTransitionTour("new", "reviewing")).toBe(true);
    expect(canTransitionTour("new", "confirmed")).toBe(false);
    expect(() => assertTourTransition("closed", "new")).toThrow("Invalid tour transition");
  });
});
