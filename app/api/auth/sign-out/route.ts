export async function POST(request: Request) {
  const response = Response.redirect(new URL("/sign-in", request.url), 303);
  response.headers.append(
    "Set-Cookie",
    `oasis_demo_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`,
  );
  return response;
}
