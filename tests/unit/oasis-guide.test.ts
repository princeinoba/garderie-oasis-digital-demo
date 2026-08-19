import { describe, expect, it } from "vitest";
import { answerOasisGuide } from "@/lib/oasis-guide";

describe("bounded Oasis Guide", () => {
  it("answers from approved content with provenance", () => {
    const answer = answerOasisGuide("What programs are shown?", "en");
    expect(answer.refused).toBe(false);
    expect(answer.sourceReference).toBe("/programs");
    expect(answer.confidence).toContain("Approved");
  });
  it("refuses availability and sensitive decisions", () => {
    for (const query of [
      "Do you have spaces available?",
      "What is my waitlist position?",
      "Can you review a diagnosis?",
    ]) {
      const answer = answerOasisGuide(query, "en");
      expect(answer.refused).toBe(true);
      expect(answer.sourceReference).toBe("/privacy");
    }
  });
  it("does not guess beyond approved content", () => {
    const answer = answerOasisGuide("What colour is the director car?", "en");
    expect(answer.refused).toBe(true);
    expect(answer.answer).toContain("won");
  });
});
