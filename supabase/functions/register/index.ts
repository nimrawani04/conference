import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import QRCode from "https://esm.sh/qrcode@1.5.4";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";
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

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const commaIdx = dataUrl.indexOf(",");
  if (commaIdx < 0) throw new Error("Invalid data URL");
  const base64 = dataUrl.slice(commaIdx + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function safeText(value: unknown): string {
  return String(value ?? "").trim() || "NA";
}

type TicketPdfInput = {
  registrationId: string;
  fullName: string;
  email: string;
  paperId: string | null | undefined;
  transactionId: string | null | undefined;
  participantType: string | null | undefined;
  attendanceMode: string | null | undefined;
  feeUsd: number | null;
  feeInr: number | null;
  qrCodeDataUrl: string;
};

async function buildTicketPdfBase64(input: TicketPdfInput): Promise<string> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]); // A4
  const width = page.getWidth();
  const height = page.getHeight();

  page.drawRectangle({
    x: 28,
    y: 28,
    width: width - 56,
    height: height - 56,
    borderWidth: 1,
    borderColor: rgb(0.83, 0.85, 0.89),
    color: rgb(1, 1, 1),
  });

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawText("2AI Conference 2026 - Entry Ticket", {
    x: 48,
    y: height - 70,
    size: 18,
    font: bold,
    color: rgb(0.07, 0.1, 0.17),
  });

  page.drawText("Keep this ticket and present the QR code at registration desk.", {
    x: 48,
    y: height - 95,
    size: 10,
    font,
    color: rgb(0.35, 0.39, 0.45),
  });

  const feeLine = `$${input.feeUsd ?? ""}${input.feeInr && input.feeInr > 0 ? ` / INR ${input.feeInr}` : ""}`;
  const lines = [
    `Registration ID: ${safeText(input.registrationId)}`,
    `Name: ${safeText(input.fullName)}`,
    `Email: ${safeText(input.email)}`,
    `Participant Type: ${safeText(input.participantType)}`,
    `Attendance Mode: ${safeText(input.attendanceMode)}`,
    `Paper ID: ${safeText(input.paperId)}`,
    `Transaction ID: ${safeText(input.transactionId)}`,
    `Fee Paid: ${safeText(feeLine)}`,
  ];

  let y = height - 145;
  for (const line of lines) {
    page.drawText(line, {
      x: 48,
      y,
      size: 12,
      font,
      color: rgb(0.1, 0.12, 0.16),
    });
    y -= 24;
  }

  const qrBytes = dataUrlToBytes(input.qrCodeDataUrl);
  const qrImage = await pdf.embedPng(qrBytes);
  const qrSize = 180;
  page.drawImage(qrImage, {
    x: width - 48 - qrSize,
    y: 90,
    width: qrSize,
    height: qrSize,
  });

  page.drawText("Ticket QR", {
    x: width - 48 - qrSize + 62,
    y: 280,
    size: 10,
    font: bold,
    color: rgb(0.28, 0.31, 0.36),
  });

  const pdfBytes = await pdf.save();
  return bytesToBase64(pdfBytes);
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
      attendanceMode,
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
      attendance_mode: attendanceMode ?? null,
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
        const ticketQr = qrCodeData || "";
        const safePaperId = paperId || "NA";
        const safeTxn = transactionId || "NA";
        let ticketPdfBase64: string | null = null;
        try {
          ticketPdfBase64 = await buildTicketPdfBase64({
            registrationId,
            fullName,
            email,
            paperId,
            transactionId,
            participantType: participantType ?? null,
            attendanceMode: attendanceMode ?? null,
            feeUsd,
            feeInr,
            qrCodeDataUrl: ticketQr,
          });
        } catch (pdfErr) {
          console.error("Ticket PDF generation failed:", pdfErr);
        }
        const html = `
          <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; line-height: 1.55;">
            <p>Dear ${fullName},</p>
            <p>Your payment is successful and your registration for <strong>2AI Conference 2026</strong> is confirmed.</p>

            <div style="margin: 16px 0; padding: 16px; border: 1px solid #d1d5db; border-radius: 10px; background: #f9fafb;">
              <h3 style="margin: 0 0 10px; color: #0f172a;">Conference Ticket</h3>
              <p style="margin: 4px 0;"><strong>Registration ID:</strong> ${registrationId}</p>
              <p style="margin: 4px 0;"><strong>Name:</strong> ${fullName}</p>
              <p style="margin: 4px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 4px 0;"><strong>Paper ID:</strong> ${safePaperId}</p>
              <p style="margin: 4px 0;"><strong>Transaction ID:</strong> ${safeTxn}</p>
              <p style="margin: 4px 0;"><strong>Fee Paid:</strong> ${feeLine}</p>
            </div>

            <p style="margin: 14px 0 8px;"><strong>Your QR Ticket</strong></p>
            <img
              src="${ticketQr}"
              alt="2AI 2026 Ticket QR Code"
              style="width: 220px; height: 220px; border: 1px solid #d1d5db; border-radius: 8px; padding: 6px; background: #ffffff;"
            />

            <p style="margin-top: 14px;">
              Please keep this email and show the QR code at the registration desk.
            </p>
          </div>
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
              attachments: ticketPdfBase64
                ? [
                    {
                      filename: `2AI-2026-Ticket-${registrationId}.pdf`,
                      content: ticketPdfBase64,
                      type: "application/pdf",
                    },
                  ]
                : undefined,
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
