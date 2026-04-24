import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { verifyAdminSessionToken } from "../_shared/adminToken.ts";
import { corsJson, handleOptions } from "../_shared/cors.ts";

function trimOrNull(v: unknown): string | null {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

Deno.serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return corsJson({ error: "Method not allowed" }, 405);

  const secret = Deno.env.get("ADMIN_SESSION_SECRET") ?? "";
  if (!secret) {
    return corsJson({ success: false, msg: "Server misconfigured" }, 500);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!supabaseUrl || !serviceKey) {
    return corsJson({ success: false, msg: "Server configuration error" }, 500);
  }

  try {
    const b = await req.json();
    const { token, registration_id } = b;
    const v = await verifyAdminSessionToken(String(token ?? ""), secret);
    if (!v.valid) {
      return corsJson({ success: false, msg: "Unauthorized" });
    }

    const rid = String(registration_id ?? "").trim();
    if (!rid) {
      return corsJson({ success: false, msg: "Missing registration_id" }, 400);
    }

    const fullName = String(b.full_name ?? "").trim();
    const affiliation = String(b.affiliation ?? "").trim();
    if (!fullName) {
      return corsJson({ success: false, msg: "Full name is required" }, 400);
    }
    if (!affiliation) {
      return corsJson({ success: false, msg: "Affiliation is required" }, 400);
    }

    let numAuthors: number | null = null;
    if (b.num_authors !== undefined && b.num_authors !== null && String(b.num_authors).trim() !== "") {
      const n = parseInt(String(b.num_authors), 10);
      if (!Number.isFinite(n)) {
        return corsJson({ success: false, msg: "Invalid num_authors" }, 400);
      }
      numAuthors = n;
    }

    let totalFeeUsd: number | null = null;
    if (b.total_fee_usd !== undefined && b.total_fee_usd !== null && String(b.total_fee_usd).trim() !== "") {
      const n = Number(b.total_fee_usd);
      if (!Number.isFinite(n)) {
        return corsJson({ success: false, msg: "Invalid total_fee_usd" }, 400);
      }
      totalFeeUsd = n;
    }

    let totalFeeInr: number | null = null;
    if (b.total_fee_inr !== undefined && b.total_fee_inr !== null && String(b.total_fee_inr).trim() !== "") {
      const n = Number(b.total_fee_inr);
      if (!Number.isFinite(n)) {
        return corsJson({ success: false, msg: "Invalid total_fee_inr" }, 400);
      }
      totalFeeInr = n;
    }

    let dateOfPayment: string | null = null;
    const dp = trimOrNull(b.date_of_payment);
    if (dp) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dp)) {
        return corsJson({ success: false, msg: "Invalid date_of_payment (use YYYY-MM-DD)" }, 400);
      }
      dateOfPayment = dp;
    }

    const paymentVerified =
      b.payment_verified === true ||
      b.payment_verified === "true" ||
      b.payment_verified === 1 ||
      b.payment_verified === "1";

    const updateRow = {
      full_name: fullName,
      affiliation,
      email: trimOrNull(b.email),
      designation: trimOrNull(b.designation),
      country: trimOrNull(b.country),
      contact_number: trimOrNull(b.contact_number),
      participant_type: trimOrNull(b.participant_type),
      paper_id: trimOrNull(b.paper_id),
      paper_title: trimOrNull(b.paper_title),
      num_authors: numAuthors,
      sub_category: trimOrNull(b.sub_category),
      region: trimOrNull(b.region),
      attendance_mode: trimOrNull(b.attendance_mode),
      attend_workshop: trimOrNull(b.attend_workshop),
      total_fee_usd: totalFeeUsd,
      total_fee_inr: totalFeeInr,
      mode_of_payment: trimOrNull(b.mode_of_payment),
      transaction_id: trimOrNull(b.transaction_id),
      date_of_payment: dateOfPayment,
      payment_verified: paymentVerified,
    };

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data, error } = await supabase
      .from("registrations")
      .update(updateRow)
      .eq("registration_id", rid)
      .select(
        [
          "registration_id",
          "full_name",
          "email",
          "affiliation",
          "designation",
          "country",
          "contact_number",
          "participant_type",
          "paper_id",
          "paper_title",
          "num_authors",
          "sub_category",
          "region",
          "attendance_mode",
          "total_fee_usd",
          "total_fee_inr",
          "payment_verified",
          "transaction_id",
          "mode_of_payment",
          "attend_workshop",
          "created_at",
          "date_of_payment",
        ].join(","),
      );

    if (error) {
      console.error(error);
      return corsJson({ success: false, msg: error.message }, 500);
    }

    if (!data?.length) {
      return corsJson({ success: false, msg: "Registration not found" }, 404);
    }

    return corsJson({ success: true, registration: data[0] });
  } catch (e) {
    console.error(e);
    return corsJson({ success: false, msg: "Failed to update registration" }, 500);
  }
});
