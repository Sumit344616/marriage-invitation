import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

const SECRET = "test-secret-key-for-admin-auth";

function signPayload(payload, secret) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  return hmac.digest("hex");
}

function verifyToken(token, secret) {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return { valid: false };

  const expectedSignature = signPayload(encodedPayload, secret);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return { valid: false };
  }

  const json = Buffer.from(encodedPayload, "base64url").toString("utf8");
  const data = JSON.parse(json);

  if (Date.now() > data.expiresAt) {
    return { valid: false, expired: true };
  }

  return { valid: true, email: data.email };
}

test("adminAuth - signs and validates session token", () => {
  const email = "admin@wedding.com";
  const expiresAt = Date.now() + 3600 * 1000;
  const payload = JSON.stringify({ email, expiresAt });
  const encoded = Buffer.from(payload).toString("base64url");
  const sig = signPayload(encoded, SECRET);
  const token = `${encoded}.${sig}`;

  const verified = verifyToken(token, SECRET);
  assert.equal(verified.valid, true);
  assert.equal(verified.email, email);
});

test("adminAuth - rejects tampered token signature", () => {
  const email = "admin@wedding.com";
  const expiresAt = Date.now() + 3600 * 1000;
  const payload = JSON.stringify({ email, expiresAt });
  const encoded = Buffer.from(payload).toString("base64url");
  const sig = signPayload(encoded, SECRET);

  // Tamper with payload
  const tamperedPayload = Buffer.from(JSON.stringify({ email: "hacker@evil.com", expiresAt })).toString("base64url");
  const tamperedToken = `${tamperedPayload}.${sig}`;

  const verified = verifyToken(tamperedToken, SECRET);
  assert.equal(verified.valid, false);
});

test("adminAuth - rejects expired session", () => {
  const email = "admin@wedding.com";
  const expiresAt = Date.now() - 1000; // Expired 1 second ago
  const payload = JSON.stringify({ email, expiresAt });
  const encoded = Buffer.from(payload).toString("base64url");
  const sig = signPayload(encoded, SECRET);
  const token = `${encoded}.${sig}`;

  const verified = verifyToken(token, SECRET);
  assert.equal(verified.valid, false);
  assert.equal(verified.expired, true);
});
