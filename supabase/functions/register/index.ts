import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import QRCode from "https://esm.sh/qrcode@1.5.4";
import { corsJson, handleOptions } from "./_shared/cors.ts";
import { verifyPaymentCompletionProof } from "../_shared/paymentCompletionProof.ts";

function parseNumOrNull(val: unknown): number | null {
  if (val === "" || val === undefined || val === null) return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

function isIciciEazypayMode(mode: unknown): boolean {
  return String(mode ?? "").trim() === "ICICI Eazypay";
}

function isTestMode(mode: unknown): boolean {
  return String(mode ?? "").trim() === "Test";
}

function truthyPaymentVerified(v: unknown): boolean {
  return v === "true" || v === true || v === 1;
}

Deno.serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return corsJson({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!supabaseUrl || !serviceKey) {
    return corsJson({ error: "Server configuration error" }, 500);
  }

  try {
    const body = await req.json();

    const {
      fullName,
      affiliation,
      designation,
      country,
      email,
      contactNumber,
      participantType,
      paperId,
      paperTitle,
      numAuthors,
      subCategory,
      region,
      attendWorkshop,
      totalFeeUsd,
      totalFeeInr,
      modeOfPayment,
      transactionId,
      dateOfPayment,
      declaration,
      paymentVerified,
      paymentOrderRef,
      paymentCompletionProof,
    } = body;

    if (!fullName || !affiliation || !email || !transactionId) {
      return corsJson({ error: "Missing required fields" }, 400);
    }

    const wantsPaid = truthyPaymentVerified(paymentVerified);
    const iciciOnline = wantsPaid && isIciciEazypayMode(modeOfPayment);

    if (iciciOnline) {
      const orderRef = typeof paymentOrderRef === "string" ? paymentOrderRef.trim() : "";
      const proof = typeof paymentCompletionProof === "string" ? paymentCompletionProof.trim() : "";
      if (!orderRef || !proof) {
        return corsJson(
          {
            error:
              "Online payment registration requires a valid payment confirmation from the payment return step. Please complete checkout and return from the bank page.",
          },
          400,
        );
      }
      const secret = (Deno.env.get("PAYMENT_COMPLETION_SECRET") ?? "").trim();
      if (secret.length < 16) {
        return corsJson({ error: "Server configuration error" }, 500);
      }
      const ok = await verifyPaymentCompletionProof(secret, proof, orderRef, email);
      if (!ok) {
        return corsJson(
          { error: "Invalid or expired payment confirmation. Start again from registration if payment succeeded." },
          400,
        );
      }
    }

    const registrationId =
      `2AI-2026-${Date.now().toString(36).toUpperCase()}-${
        Math.random().toString(36).substring(2, 6).toUpperCase()
      }`;

    const qrPayload = JSON.stringify({
      registrationId,
      name: fullName,
      email,
      type: participantType,
      conference: "2AI-2026",
      timestamp: new Date().toISOString(),
    });

    const qrCodeData = await new Promise<string>((resolve, reject) => {
      QRCode.toDataURL(
        qrPayload,
        {
          width: 300,
          margin: 2,
          color: { dark: "#111111", light: "#f4efe4" },
        },
        (err: Error | null | undefined, url: string) => {
          if (err) reject(err);
          else resolve(url);
        },
      );
    });

    const decl =
      declaration === "true" || declaration === true || declaration === 1;
    const paid =
      (wantsPaid && isIciciEazypayMode(modeOfPayment)) ||
      (wantsPaid && isTestMode(modeOfPayment));

    const row = {
      registration_id: registrationId,
      full_name: fullName,
      affiliation,
      designation: designation ?? null,
      country: country ?? null,
      email,
      contact_number: contactNumber ?? null,
      participant_type: participantType ?? null,
      paper_id: paperId || null,
      paper_title: paperTitle || null,
      num_authors: parseNumOrNull(numAuthors),
      sub_category: subCategory ?? null,
      region: region ?? null,
      attend_workshop: attendWorkshop ?? null,
      total_fee_usd: parseNumOrNull(totalFeeUsd),
      total_fee_inr: parseNumOrNull(totalFeeInr),
      mode_of_payment: modeOfPayment ?? null,
      transaction_id: transactionId,
      date_of_payment: dateOfPayment || null,
      payment_proof_path: null,
      declaration: decl,
      qr_code: qrCodeData,
      payment_verified: paid,
    };

    const supabase = createClient(supabaseUrl, serviceKey);
    const { error } = await supabase.from("registrations").insert(row);

    if (error) {
      console.error(error);
      return corsJson({ error: "Database error" }, 500);
    }

    if (paid) {
      const resendKey = Deno.env.get("RESEND_API_KEY");
      const fromEmail = Deno.env.get("RESEND_FROM") ?? "2AI Conference <onboarding@resend.dev>";
      if (resendKey && email) {
        const feeUsd = parseNumOrNull(totalFeeUsd);
        const feeInr = parseNumOrNull(totalFeeInr);
        const feeLine = `$${feeUsd ?? ""}${
          feeInr && feeInr > 0 ? ` / ₹${feeInr}` : ""
        }`;
        const html = `
          <p>Dear ${fullName},</p>
          <p>Thank you for registering for 2AI Conference 2026.</p>
          <p><strong>Registration ID:</strong> ${registrationId}</p>
          <p><strong>Fee:</strong> ${feeLine}</p>
          <p>Your QR ticket is attached as data in the portal — you can also open the confirmation page after login.</p>
        `;
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendKey}`,
            },
            body: JSON.stringify({
              from: fromEmail,
              to: [email],
              subject: `Registration Confirmed - 2AI 2026 | ${registrationId}`,
              html,
            }),
          });
        } catch (mailErr) {
          console.error("Resend error:", mailErr);
        }
      }
    }

    return corsJson({
      success: true,
      message: "Registration successful!",
      registrationId,
      qrCode: qrCodeData,
    });
  } catch (e) {
    console.error(e);
    return corsJson({ error: "Registration failed" }, 500);
  }
});
