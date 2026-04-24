import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { verifyAdminSessionToken } from "../_shared/adminToken.ts";
import { corsJson, handleOptions } from "../_shared/cors.ts";

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
    const { token } = await req.json();
    const v = await verifyAdminSessionToken(String(token ?? ""), secret);
    if (!v.valid) {
      return corsJson({ success: false, msg: "Unauthorized" });
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data, error } = await supabase
      .from("registrations")
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
          "date_of_payment",
          "created_at",
        ].join(","),
      )
      .order("created_at", { ascending: false })
      .limit(2000);

    if (error) {
      console.error(error);
      return corsJson({ success: false, msg: error.message }, 500);
    }

    return corsJson({ success: true, registrations: data ?? [] });
  } catch (e) {
    console.error(e);
    return corsJson({ success: false, msg: "Failed to load registrations" }, 500);
  }
});
