import { corsJson, handleOptions } from "../_shared/cors.ts";
import { iciciAes128Decrypt } from "../_shared/iciciEazypayCrypto.ts";

function findParam(
  query: { [key: string]: string },
  candidates: string[],
): string | undefined {
  const lowered = Object.fromEntries(
    Object.entries(query).map(([k, v]) => [
      k.trim().replace(/\s+/g, "_").toLowerCase(),
      typeof v === "string" ? v : String(v),
    ]),
  );
  for (const c of candidates) {
    const key = c.trim().replace(/\s+/g, "_").toLowerCase();
    if (lowered[key] !== undefined && lowered[key] !== "") return lowered[key];
  }
  return undefined;
}

function iciciConfigured(): boolean {
  const aes = Deno.env.get("ICICI_EAZYPAY_AES_KEY") ?? "";
  return aes.trim().length > 0;
}

function tryMatchOrderFromIciciResponse(
  query: { [key: string]: string },
  aesKey: string,
  expectedOrderId: string,
): boolean {
  if (!expectedOrderId) return true;

  const merchantTxn = findParam(query, [
    "Merchant_Txn_Ref",
    "Merchant Txn Ref",
    "MerchantTxnRef",
    "Reference_No",
    "Reference No",
  ]);
  if (merchantTxn) return merchantTxn === expectedOrderId;

  const interchange = findParam(query, ["Interchange_Value", "Interchange Value", "InterchangeValue"]);
  if (interchange) {
    try {
      const plain = iciciAes128Decrypt(interchange, aesKey);
      const parts = plain.split("|");
      if (parts.some((p) => p.trim() === expectedOrderId)) return true;
      if (plain.includes(expectedOrderId)) return true;
    } catch {
      return true;
    }
  }

  return true;
}

Deno.serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return corsJson({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const query = (body.query ?? body.params ?? {}) as { [key: string]: string };
    const expectedOrderId = typeof body.expectedOrderId === "string" ? body.expectedOrderId.trim() : "";

    if (!iciciConfigured()) {
      return corsJson({ error: "ICICI_EAZYPAY_AES_KEY is not set for payment verification." }, 500);
    }

    const responseCode = findParam(query, ["Response_Code", "Response Code", "ResponseCode"]);
    const isIciciStyle = responseCode !== undefined ||
      findParam(query, ["Interchange_Value", "Interchange Value"]) !== undefined;

    if (!isIciciStyle) {
      return corsJson({
        success: false,
        verified: false,
        gateway: "icici-eazypay",
        error: "Missing ICICI payment response (expected Response_Code or Interchange_Value).",
      }, 400);
    }

    const aesKey = (Deno.env.get("ICICI_EAZYPAY_AES_KEY") ?? "").trim();
    const success = responseCode === "E000";

    if (!success) {
      return corsJson({
        success: false,
        verified: false,
        gateway: "icici-eazypay",
        error: responseCode ? `Transaction not successful (${responseCode})` : "Missing response code",
      });
    }

    const uniqueRef = findParam(query, [
      "Unique_Ref_Number",
      "Unique Ref Number",
      "Unique_Ref_No",
      "Bank_Reference_No",
      "Bank Reference No",
      "BRN",
    ]);

    const orderOk = tryMatchOrderFromIciciResponse(query, aesKey, expectedOrderId);
    if (expectedOrderId && !orderOk) {
      return corsJson({
        success: false,
        verified: false,
        gateway: "icici-eazypay",
        error: "Order reference mismatch",
      });
    }

    return corsJson({
      success: true,
      verified: true,
      gateway: "icici-eazypay",
      transactionId: uniqueRef || expectedOrderId || "",
      paymentStatus: "success",
    });
  } catch (e) {
    console.error(e);
    return corsJson({ error: "Payment verification failed" }, 500);
  }
});
