import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import { invokeEdge } from "../lib/supabaseFunctions";
import { setAdminToken } from "../lib/adminSession";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setBusy(true);
    try {
      const result = await invokeEdge("admin-login", { username, password });
      if (result?.success && result?.token) {
        setAdminToken(result.token);
        navigate("/admin", { replace: true });
        return;
      }
      setMsg(result?.msg || result?.error || "Login failed");
    } catch (err) {
      const errorMsg = err?.message || "Login failed";
      // Check if it's the ADMIN_SESSION_SECRET error
      if (errorMsg.includes("ADMIN_SESSION_SECRET")) {
        setMsg("Server configuration error: ADMIN_SESSION_SECRET not set in Supabase. Please contact the administrator.");
      } else {
        setMsg(errorMsg);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageLayout title="Admin login" subtitle="Organizer access only">
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="linear-card p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Username</label>
            <input
              type="text"
              autoComplete="username"
              className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#5E6AD2] dark:focus:ring-[#c9a86a] focus:border-[#5E6AD2] dark:focus:border-[#c9a86a] outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg pl-3 pr-11 py-2.5 focus:ring-2 focus:ring-[#5E6AD2] dark:focus:ring-[#c9a86a] focus:border-[#5E6AD2] dark:focus:border-[#c9a86a] outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2] dark:focus:ring-[#c9a86a]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {msg && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-lg py-2 px-3">
              {msg}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#5E6AD2] dark:bg-[#c9a86a] hover:bg-[#4a52b5] dark:hover:bg-[#b8935a] disabled:opacity-60 text-white dark:text-zinc-950 font-semibold py-3 rounded-lg transition"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <Link to="/" className="text-[#5E6AD2] dark:text-[#c9a86a] hover:underline">
              ← Back to site
            </Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
}
