import { corsJson, handleOptions } from "../_shared/cors.ts";
import { iciciAes128Encrypt } from "../_shared/iciciEazypayCrypto.ts";

// Match ICICI portal redirection path (eazypayLink vs EazyPG); override with ICICI_EAZYPAY_BASE_URL.
const DEFAULT_ICICI_EAZYPAY_BASE = "https://eazypay.icicibank.com/EazyPG";

function trimEndSlashes(s: string): string {
  return s.replace(/\/+$/, "");
}

/** ICICI checkout must load on *.icicibank.com — never your own domain (common secret mix-up). */
function resolveIciciEazypayBaseUrl(rawFromEnv: string, frontendUrl: string): string {
  const raw = rawFromEnv.trim();
  if (!raw) return DEFAULT_ICICI_EAZYPAY_BASE;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    console.warn(
      "[create-payment-order] ICICI_EAZYPAY_BASE_URL is not a valid URL; using default ICICI gateway.",
    );
    return DEFAULT_ICICI_EAZYPAY_BASE;
  }

  const host = parsed.hostname.toLowerCase();
  const onIcici = host === "icicibank.com" || host.endsWith(".icicibank.com");
  if (!onIcici) {
    console.warn(
      `[create-payment-order] ICICI_EAZYPAY_BASE_URL must be an ICICI host (*.icicibank.com), not "${host}"; using default gateway.`,
    );
    return DEFAULT_ICICI_EAZYPAY_BASE;
  }

  try {
    const frontHost = new URL(frontendUrl).hostname.toLowerCase();
    if (host === frontHost) {
      console.warn(
        "[create-payment-order] ICICI_EAZYPAY_BASE_URL cannot match FRONTEND_URL; using default gateway.",
      );
      return DEFAULT_ICICI_EAZYPAY_BASE;
    }
  } catch {
    /* ignore */
  }

  const baseNoTrailingSlash = `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
  return baseNoTrailingSlash || DEFAULT_ICICI_EAZYPAY_BASE;
}

function normalizeAmount(amount: number, currency: string): string {
  if (currency === "INR") {
    const n = Math.round(amount);
    return String(n);
  }
  const n = Math.round(amount * 100) / 100;
  return String(n);
}

function normalizeIciciText(value: unknown, maxLen = 98, fallback = "NA"): string {
  const raw = String(value ?? "").replace(/\|/g, " ").trim();
  if (!raw) return fallback;
  return raw.slice(0, maxLen);
}

function normalizeIciciAmount(value: string): string {
  const digitsOnly = String(value ?? "").replace(/[^\d]/g, "");
  const trimmed = digitsOnly.replace(/^0+/, "") || "0";
  return trimmed.slice(0, 9);
}

function normalizeIciciMobile(value: unknown): string {
  const digitsOnly = String(value ?? "").replace(/\D/g, "");
  if (!digitsOnly) return "0000000000";
  const last10 = digitsOnly.slice(-10);
  return last10.padStart(10, "0").slice(0, 10);
}

function buildMandatoryFieldsPipe(opts: {
  referenceNo: string;
  subMerchantId: string;
  amountStr: string;
  registrationData: Record<string, unknown>;
}): string {
  const { referenceNo, subMerchantId, amountStr, registrationData } = opts;

  const studentName = normalizeIciciText(registrationData.fullName, 98, "Student");
  const mobile = normalizeIciciMobile(registrationData.contactNumber);
  const email = normalizeIciciText(registrationData.email, 98, "no-reply@example.com");
  const formNo = normalizeIciciText(registrationData.paperId, 98, "Form No");
  const department = normalizeIciciText(registrationData.affiliation, 98, "Department");
  const category = normalizeIciciText(registrationData.subCategory || registrationData.participantType, 98, "Category");
  const post = normalizeIciciText(registrationData.designation, 98, "Post");

  // Mandatory order as per ICICI config:
  // 1 Reference No | 2 SUB Merchant Id | 3 PG Amount | 4 Student Name | 5 Mobile Number
  // 6 Email Id | 7 Form No | 8 Department | 9 Category | 10 Post
  return [
    normalizeIciciText(referenceNo, 98, "REF"),
    normalizeIciciText(subMerchantId, 98, "SUB"),
    normalizeIciciAmount(amountStr),
    studentName,
    mobile,
    email,
    formNo,
    department,
    category,
    post,
  ].join("|");
}

function buildIciciEazypayUrl(opts: {
  baseUrl: string;
  merchantId: string;
  subMerchantId: string;
  aesKey: string;
  referenceNo: string;
  amountStr: string;
  returnUrl: string;
  paymode: string;
  optionalPipe: string | null;
  registrationData: Record<string, unknown>;
}): string {
  const { aesKey, referenceNo, subMerchantId, amountStr } = opts;
  const enc = (plain: string) => iciciAes128Encrypt(plain, aesKey);
  const mandatoryPlain = buildMandatoryFieldsPipe({
    referenceNo,
    subMerchantId,
    amountStr,
    registrationData: opts.registrationData,
  });
  const optionalFields = opts.optionalPipe ? enc(opts.optionalPipe) : "";

  const pairs: [string, string][] = [
    ["merchantid", opts.merchantId],
    ["mandatory fields", enc(mandatoryPlain)],
    ["optional fields", optionalFields],
    ["returnurl", enc(opts.returnUrl)],
    ["Reference No", enc(referenceNo)],
    ["submerchantid", enc(subMerchantId)],
    ["transaction amount", enc(amountStr)],
    ["paymode", enc(opts.paymode)],
  ];

  const qs = pairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
  const base = opts.baseUrl.replace(/[?]+$/, "");
  return `${base}?${qs}`;
}

Deno.serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return corsJson({ error: "Method not allowed" }, 405);

  try {
    const FRONTEND_URL = trimEndSlashes(Deno.env.get("FRONTEND_URL") ?? "http://localhost:5173");
    const PAYMENT_CALLBACK_URL = (Deno.env.get("PAYMENT_CALLBACK_URL") ?? "").trim();

    const merchantId = (Deno.env.get("ICICI_EAZYPAY_MERCHANT_ID") ?? "").trim();
    const aesKey = (Deno.env.get("ICICI_EAZYPAY_AES_KEY") ?? "").trim();

    if (!merchantId || !aesKey) {
      const missing: string[] = [];
      if (!merchantId) missing.push("ICICI_EAZYPAY_MERCHANT_ID");
      if (!aesKey) missing.push("ICICI_EAZYPAY_AES_KEY");
      return corsJson(
        {
          error:
            `Payment gateway not configured - Edge runtime has no value for: ${missing.join(", ")}. ` +
            `Add them under Project Settings → Edge Functions → Secrets for this same project as VITE_SUPABASE_URL, then redeploy create-payment-order.`,
        },
        500,
      );
    }

    if (!(aesKey.length >= 16)) {
      return corsJson(
        {
          error:
            "ICICI_EAZYPAY_AES_KEY must be at least 16 characters (AES-128). Check the key from the bank portal.",
        },
        400,
      );
    }

    const { amount, currency, registrationData } = await req.json();
    if (!registrationData?.fullName || !registrationData?.email) {
      return corsJson({ error: "Invalid registration data" }, 400);
    }

    const cur = (currency || "INR").toUpperCase();
    if (cur !== "INR") {
      return corsJson(
        {
          error: "Online payment is only available in INR (ICICI Eazypay).",
        },
        400,
      );
    }

    const amountStr = normalizeAmount(Number(amount), cur);
    const orderId = `2AI-ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const returnUrlPlain = PAYMENT_CALLBACK_URL || `${FRONTEND_URL}/payment-callback`;

    const subMerchantId = (Deno.env.get("ICICI_EAZYPAY_SUB_MERCHANT_ID") ?? merchantId).trim();
    const paymode = (Deno.env.get("ICICI_EAZYPAY_PAYMODE") ?? "9").trim();
    const optionalPipe = (Deno.env.get("ICICI_EAZYPAY_OPTIONAL_FIELDS") ?? "").trim() || null;
    const baseUrl = resolveIciciEazypayBaseUrl(
      Deno.env.get("ICICI_EAZYPAY_BASE_URL") ?? "",
      FRONTEND_URL,
    );

    const paymentUrl = buildIciciEazypayUrl({
      baseUrl,
      merchantId,
      subMerchantId,
      aesKey,
      referenceNo: orderId,
      amountStr,
      returnUrl: returnUrlPlain,
      paymode,
      optionalPipe,
      registrationData,
    });

    return corsJson({
      success: true,
      orderId,
      gateway: "icici-eazypay",
      redirectMode: "location",
      paymentUrl,
      paymentData: null,
    });
  } catch (e) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Failed to create payment order";
    return corsJson({ error: msg }, 500);
  }
});
