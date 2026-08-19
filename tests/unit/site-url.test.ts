import { afterEach, describe, expect, it, vi } from "vitest";

import { getSiteUrl, shouldIndexSite } from "@/lib/site-url";

afterEach(() => vi.unstubAllEnvs());

describe("deployment URL and indexing policy", () => {
  it("uses and normalizes an explicit application URL", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://demo.example.com/");
    expect(getSiteUrl()).toBe("https://demo.example.com");
  });

  it("falls back to the exact Vercel deployment host", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.stubEnv("VERCEL_URL", "garderie-oasis-preview.vercel.app");
    expect(getSiteUrl()).toBe("https://garderie-oasis-preview.vercel.app");
  });

  it("allows indexing only for Vercel Production", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(shouldIndexSite()).toBe(false);
    vi.stubEnv("VERCEL_ENV", "production");
    expect(shouldIndexSite()).toBe(true);
  });
});
