import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const dir = join(process.cwd(), "supabase", "migrations");
const sql = readFileSync(
  join(
    dir,
    readdirSync(dir).find((name) => name.endsWith("garderie_oasis_demo_schema.sql"))!,
  ),
  "utf8",
).toLowerCase();
describe("database security contract", () => {
  it("forces RLS on every exposed application table", () => {
    for (const table of [
      "tenants",
      "locations",
      "staff_profiles",
      "tour_inquiries",
      "tour_slots",
      "inquiry_events",
      "public_faq_articles",
      "ai_proposals",
    ]) {
      expect(sql).toContain(`alter table public.${table} enable row level security`);
      expect(sql).toContain(`alter table public.${table} force row level security`);
    }
  });
  it("does not grant anonymous inquiry writes", () => {
    expect(sql).not.toMatch(/grant insert[^;]+tour_inquiries[^;]+anon/);
    expect(sql).toContain("faq_public_approved_select");
  });
  it("uses tenant membership and indexed foreign keys", () => {
    expect(sql).toContain("auth.uid()");
    expect(sql).toContain("tour_inquiries_tenant_id_idx");
    expect(sql).toContain("ai_proposals_inquiry_id_idx");
  });
  it("keeps events append-only", () => {
    expect(sql).toContain("inquiry_events_append_only");
    expect(sql).not.toMatch(/grant update[^;]+inquiry_events/);
    expect(sql).not.toMatch(/grant delete[^;]+inquiry_events/);
  });
});
