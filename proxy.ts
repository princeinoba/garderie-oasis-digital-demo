import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "oasis_demo_session";
const DIRECTOR_VALUE = "director-demo-v1";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname === "/director" || pathname.startsWith("/director/")) {
    if (request.cookies.get(SESSION_COOKIE)?.value !== DIRECTOR_VALUE) {
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = "/sign-in";
      signInUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(signInUrl);
    }
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
  }

  return response;
}

export const config = {
  matcher: ["/director/:path*"],
};
