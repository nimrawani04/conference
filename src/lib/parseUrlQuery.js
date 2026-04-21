/**
 * Parse a URL query string without application/x-www-form-urlencoded "+" → space rules.
 * URLSearchParams treats "+" as space, which corrupts Base64 (e.g. ICICI return params).
 * Uses decodeURIComponent on each raw name/value segment.
 *
 * @param {string} search - `location.search` (with "?") or query only
 * @returns {Record<string, string>}
 */
export function parseUrlQuery(search) {
  const raw = typeof search === "string" ? search : "";
  const q = raw.startsWith("?") ? raw.slice(1) : raw;
  const out = {};
  if (!q) return out;

  for (const part of q.split("&")) {
    if (!part) continue;
    const eq = part.indexOf("=");
    const rawName = eq >= 0 ? part.slice(0, eq) : part;
    const rawVal = eq >= 0 ? part.slice(eq + 1) : "";
    try {
      const k = decodeURIComponent(rawName);
      out[k] = decodeURIComponent(rawVal);
    } catch {
      out[rawName] = rawVal;
    }
  }
  return out;
}
