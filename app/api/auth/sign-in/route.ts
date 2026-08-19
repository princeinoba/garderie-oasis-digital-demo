const attempts = new Map<string, { count: number; resetsAt: number }>();

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request) || request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ error: "Cross-site sign-in is not accepted." }, { status: 403 });
  }

  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local-demo";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetsAt <= now) attempts.set(key, { count: 1, resetsAt: now + 60_000 });
  else {
    current.count += 1;
    if (current.count > 8)
      return Response.json({ error: "Please wait before trying again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null)
    return Response.json({ error: "Invalid request." }, { status: 400 });
  const { email, password } = body as { email?: string; password?: string };
  if (email?.toLowerCase() !== "director@synthetic.invalid" || password !== "oasis-demo") {
    return Response.json(
      { error: "Use the displayed synthetic demo credentials." },
      { status: 401 },
    );
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `oasis_demo_session=director-demo-v1; Path=/; HttpOnly; SameSite=Strict; Max-Age=7200${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`,
  );
  return response;
}
