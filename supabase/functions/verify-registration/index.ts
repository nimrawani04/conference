import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { corsJson, handleOptions } from "./_shared/cors.ts";

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
    const { registrationId } = await req.json();
    if (!registrationId) {
      return corsJson({ error: "Registration ID is required" }, 400);
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data, error } = await supabase
      .from("registrations")
      .select(
        "registration_id, full_name, email, participant_type, attendance_mode, affiliation, designation, paper_id, paper_title, created_at",
      )
      .eq("registration_id", registrationId)
      .maybeSingle();

    if (error) {
      console.error(error);
      return corsJson({ error: "Database error" }, 500);
    }
    if (!data) {
      return corsJson({ valid: false, message: "Registration not found" });
    }

    return corsJson({
      valid: true,
      message: "Registration verified successfully",
      data: {
        registrationId: data.registration_id,
        fullName: data.full_name,
        email: data.email,
        participantType: data.participant_type,
        attendanceMode: data.attendance_mode,
        affiliation: data.affiliation,
        designation: data.designation,
        paperId: data.paper_id,
        paperTitle: data.paper_title,
        registeredAt: data.created_at,
      },
    });
  } catch (e) {
    console.error(e);
    return corsJson({ error: "Verification failed" }, 500);
  }
});
