import { corsJson, handleOptions } from "../_shared/cors.ts";
import { iciciAes128Encrypt } from "../_shared/iciciEazypayCrypto.ts";

function trimEndSlashes(s: string): string {
  return s.replace(/\/+$/, "");
}

function normalizeAmount(amount: number, currency: string): string {
  if (currency === "INR") {
    const n = Math.round(amount);
    return String(n);
  }
  const n = Math.round(amount * 100) / 100;
  return String(n);
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
}): string {
  const { aesKey, referenceNo, subMerchantId, amountStr } = opts;
  const enc = (plain: string) => iciciAes128Encrypt(plain, aesKey);
  const mandatoryPlain = `${referenceNo}|${subMerchantId}|${amountStr}`;
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
    const baseUrl =
      (Deno.env.get("ICICI_EAZYPAY_BASE_URL") ?? "").trim() ||
      "https://eazypay.icicibank.com/EazyPG";

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
