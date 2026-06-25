import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * Protects every /admin route except the login page. If the signed session
 * cookie is missing or invalid, the visitor is bounced to /admin/login with a
 * `?from=` param so they can be returned after signing in.
 *
 * TODO: When migrating to Supabase Auth, replace the cookie check with the
 *       Supabase middleware client (getUser) and drop lib/auth.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // login page + auth API are always public
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // run on all /admin routes (the handler lets /admin/login through)
  matcher: ["/admin/:path*"],
};
