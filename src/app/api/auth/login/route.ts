import { NextResponse, type NextRequest } from "next/server";
import {
  verifyCredentials,
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Sets an HMAC-signed, httpOnly session cookie on success.
 *
 * TODO: replace with Supabase Auth signInWithPassword + setting the supabase
 *       session cookie.
 */
export async function POST(request: NextRequest) {
  let username = "";
  let password = "";

  try {
    const body = await request.json();
    username = String(body.username ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!verifyCredentials(username, password)) {
    return NextResponse.json(
      { error: "Incorrect username or password." },
      { status: 401 },
    );
  }

  const token = await createSessionToken(username);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
