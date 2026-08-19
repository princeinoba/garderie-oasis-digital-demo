import { createInquiryReference, tourSubmissionSchema } from "@/domain/tours";

const requestWindow = new Map<string, { count: number; resetsAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60_000;

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function isRateLimited(key: string, now: number): boolean {
  const current = requestWindow.get(key);
  if (!current || current.resetsAt <= now) {
    requestWindow.set(key, { count: 1, resetsAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Cross-site submissions are not accepted." }, { status: 403 });
  }

  const clientKey =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local-demo";
  if (isRateLimited(clientKey, Date.now())) {
    return Response.json(
      { error: "Please wait before creating another demonstration preview." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body === "object" && body !== null && "website" in body && body.website) {
    return Response.json({ accepted: true, delivery: "disabled" }, { status: 202 });
  }

  const result = tourSubmissionSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Review the highlighted fields.", fields: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const submittedAt = new Date().toISOString();
  const reference = createInquiryReference(
    `${result.data.email}:${result.data.preferredTourDate}:${result.data.programInterest}`,
    new Date(submittedAt),
  );

  return Response.json(
    {
      accepted: true,
      reference,
      submittedAt,
      status: "new",
      persistence: "disabled",
      delivery: "disabled",
      previewEmail: {
        recipient: result.data.email,
        subject: `Demonstration tour preview -> ${reference}`,
        state: "not-sent",
      },
      events: [
        { type: "synthetic_submission_validated", at: submittedAt },
        { type: "preview_email_created_not_sent", at: submittedAt },
      ],
    },
    { status: 201, headers: { "Cache-Control": "no-store" } },
  );
}
