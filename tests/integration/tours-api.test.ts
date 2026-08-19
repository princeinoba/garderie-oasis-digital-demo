import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/tours/route";

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
const request = (body: unknown, ip: string, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/tours", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip, origin },
    body: JSON.stringify(body),
  });

describe("tour API boundary", () => {
  it("returns a preview without persistence or delivery", async () => {
    const response = await POST(request(valid, "198.51.100.1"));
    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body.reference).toMatch(/^GO-/);
    expect(body.persistence).toBe("disabled");
    expect(body.delivery).toBe("disabled");
    expect(body.previewEmail.state).toBe("not-sent");
  });
  it("rejects cross-site requests", async () => {
    expect((await POST(request(valid, "198.51.100.2", "https://attacker.invalid"))).status).toBe(
      403,
    );
  });
  it("validates the allowlisted schema", async () => {
    const response = await POST(
      request({ ...valid, email: "alex@example.com", childName: "Not accepted" }, "198.51.100.3"),
    );
    expect(response.status).toBe(422);
  });
  it("quietly absorbs honeypot traffic", async () => {
    const response = await POST(request({ ...valid, website: "spam" }, "198.51.100.4"));
    expect(response.status).toBe(202);
    expect((await response.json()).delivery).toBe("disabled");
  });
  it("rate limits repeated clients", async () => {
    let response: Response | undefined;
    for (let i = 0; i < 6; i++) response = await POST(request(valid, "198.51.100.5"));
    expect(response?.status).toBe(429);
    expect(response?.headers.get("retry-after")).toBe("60");
  });
});
