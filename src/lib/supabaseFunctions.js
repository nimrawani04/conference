import { supabase } from "./supabase";
import { FunctionsHttpError } from "@supabase/supabase-js";

function isFunctionsHttpError(error) {
  return (
    error instanceof FunctionsHttpError ||
    (Boolean(error) && error.name === "FunctionsHttpError" && typeof error.context?.text === "function")
  );
}

async function messageFromFunctionsError(error) {
  if (isFunctionsHttpError(error)) {
    try {
      const text = await error.context.text();
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === "object" && parsed.error != null) {
        return String(parsed.error);
      }
    } catch {
      /* body not JSON or empty */
    }
  }
  return error.message || "Request failed";
}

/**
 * Invoke a Supabase Edge Function.
 */
export async function invokeEdge(name, body) {
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (error) {
    const msg = await messageFromFunctionsError(error);
    throw new Error(msg || `Function ${name} failed`);
  }
  return data;
}
