import { cookies } from "next/headers";
import crypto from "node:crypto";

const SESSION_COOKIE_NAME = "wedding_admin_session";
const SESSION_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds

function getSecretKey(): string {
  return process.env.AUTH_SECRET || "wedding-super-secret-default-key-change-in-prod-2026";
}

/**
 * Creates an HMAC-SHA256 signature for the session payload.
 */
function signPayload(payload: string): string {
  const hmac = crypto.createHmac("sha256", getSecretKey());
  hmac.update(payload);
  return hmac.digest("hex");
}

/**
 * Creates a signed session token for the authenticated admin.
 */
export async function createAdminSession(email: string): Promise<void> {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = JSON.stringify({ email, expiresAt });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = signPayload(encodedPayload);
  const token = `${encodedPayload}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/**
 * Verifies if the current user has a valid active admin session.
 */
export async function verifyAdminSession(): Promise<{ authenticated: boolean; email?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return { authenticated: false };
    }

    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) {
      return { authenticated: false };
    }

    // Verify HMAC signature
    const expectedSignature = signPayload(encodedPayload);
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { authenticated: false };
    }

    const json = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const { email, expiresAt } = JSON.parse(json);

    if (Date.now() > expiresAt) {
      return { authenticated: false };
    }

    return { authenticated: true, email };
  } catch {
    return { authenticated: false };
  }
}

/**
 * Destroys the admin session cookie on logout.
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
