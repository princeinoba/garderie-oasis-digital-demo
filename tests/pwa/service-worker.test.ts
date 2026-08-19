import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const sw = readFileSync(join(process.cwd(), "public", "sw.js"), "utf8");
describe("PWA safety contract", () => {
  it("provides an offline navigation fallback", () => {
    expect(sw).toContain("/offline.html");
    expect(sw).toContain('request.mode === "navigate"');
  });
  it("never caches APIs, director pages, or sign-in", () => {
    expect(sw).toContain('url.pathname.startsWith("/api/")');
    expect(sw).toContain('url.pathname.startsWith("/director")');
    expect(sw).toContain('url.pathname.startsWith("/sign-in")');
  });
});
