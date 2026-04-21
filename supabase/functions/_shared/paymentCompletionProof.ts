/** TTL for server-issued proof that register() may trust for ICICI-paid rows. */
const PROOF_TTL_SEC = 900;

function base64UrlEncodeUtf8(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecodeUtf8(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

/**
 * Issue a proof that only register() can validate (same PAYMENT_COMPLETION_SECRET).
 * Binds order reference and email so a captured proof cannot be replayed for another identity.
 */
export async function createPaymentCompletionProof(
  secret: string,
  orderRef: string,
  email: string,
): Promise<{ proof: string; expiresAt: number }> {
  const exp = Math.floor(Date.now() / 1000) + PROOF_TTL_SEC;
  const em = email.trim().toLowerCase();
  const ref = orderRef.trim();
  const message = `${ref}\n${exp}\n${em}`;
  const sig = await hmacSha256Hex(secret, message);
  const proof = `${exp}.${base64UrlEncodeUtf8(ref)}.${base64UrlEncodeUtf8(em)}.${sig}`;
  return { proof, expiresAt: exp };
}

export async function verifyPaymentCompletionProof(
  secret: string,
  proof: string,
  expectedOrderRef: string,
  expectedEmail: string,
): Promise<boolean> {
  const parts = proof.split(".");
  if (parts.length !== 4) return false;
  const [expStr, refB64, emB64, sigHex] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;

  let orderRef: string;
  let email: string;
  try {
    orderRef = base64UrlDecodeUtf8(refB64).trim();
    email = base64UrlDecodeUtf8(emB64).trim().toLowerCase();
  } catch {
    return false;
  }

  if (orderRef !== expectedOrderRef.trim()) return false;
  if (email !== expectedEmail.trim().toLowerCase()) return false;

  const message = `${orderRef}\n${exp}\n${email}`;
  const expectedSig = await hmacSha256Hex(secret, message);
  return timingSafeEqualHex(expectedSig.toLowerCase(), sigHex.toLowerCase());
}
