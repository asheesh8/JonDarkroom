/**
 * Tiny, dependency-free admin session helper — edge & node safe.
 *
 * For now Jon's admin login is gated by two env vars (ADMIN_USERNAME /
 * ADMIN_PASSWORD). On success we hand out an HMAC-signed cookie value (signed
 * with Web Crypto so it works in both Edge middleware and Node route handlers)
 * so the middleware can verify the session without a database.
 *
 * TODO: Replace this entire module with Supabase Auth (or Firebase Auth):
 *   - swap verifyCredentials() for supabase.auth.signInWithPassword()
 *   - swap the signed cookie for the Supabase session cookie
 *   - protect /admin via the Supabase server client in middleware.ts
 */

export const SESSION_COOKIE = "jon_admin_session";

/** Session lifetime: 7 days. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";
}

/** Constant-time string comparison (no node:crypto needed). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Validate a username/password pair against the configured env credentials. */
export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedUser || !expectedPass) return false;
  return safeEqual(username, expectedUser) && safeEqual(password, expectedPass);
}

/* ---- Web Crypto HMAC (works in Edge + Node 18+) ---- */
async function hmac(payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return bufferToHex(sig);
}

function bufferToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64Url(str: string): string {
  // btoa is available in edge + modern node
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  return atob(padded);
}

/** Create a signed session token: `<base64url(payload)>.<hmac>`. */
export async function createSessionToken(username: string): Promise<string> {
  const payload = `${username}.${Date.now()}`;
  const sig = await hmac(payload);
  return `${toBase64Url(payload)}.${sig}`;
}

/** Verify a session token produced by createSessionToken(). */
export async function verifySessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return false;
  let payload: string;
  try {
    payload = fromBase64Url(b64);
  } catch {
    return false;
  }
  // optional expiry check
  const ts = Number(payload.split(".").pop());
  if (Number.isFinite(ts) && Date.now() - ts > SESSION_MAX_AGE * 1000) {
    return false;
  }
  const expected = await hmac(payload);
  return safeEqual(sig, expected);
}
