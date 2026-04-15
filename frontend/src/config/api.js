/** Backend API origin (no trailing slash). Set `VITE_API_URL` in `.env` for production. */
function normalizeBase(url) {
  return String(url).trim().replace(/\/+$/, "");
}

export function getApiBaseUrl() {
  const env = import.meta.env.VITE_API_URL;
  if (env != null && String(env).trim() !== "") {
    return normalizeBase(env);
  }
  return "http://localhost:5000";
}

export const API_BASE_URL = getApiBaseUrl();

/** @param {string} path Path starting with `/`, e.g. `/api/register` */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
}
