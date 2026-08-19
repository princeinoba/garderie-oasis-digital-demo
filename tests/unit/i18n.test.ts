import { describe, expect, it } from "vitest";
import { uiCopy } from "@/lib/i18n/content";

describe("bilingual interface contract", () => {
  it("keeps English and French key sets aligned", () => {
    expect(Object.keys(uiCopy.en).sort()).toEqual(Object.keys(uiCopy.fr).sort());
  });
  it("ships meaningful French navigation", () => {
    expect(uiCopy.fr.programs).toBe("Programmes");
    expect(uiCopy.fr.tour.length).toBeGreaterThan(8);
  });
});
