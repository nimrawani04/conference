import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import { invokeEdge } from "../lib/supabaseFunctions";
import { setAdminToken } from "../lib/adminSession";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";

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
      setMsg(result?.msg || result?.error || "Invalid credentials");
    } catch (err) {
      const errorMsg = err?.message || "Login failed";
      if (errorMsg.includes("ADMIN_SESSION_SECRET")) {
        setMsg("Server error: ADMIN_SESSION_SECRET not configured.");
      } else {
        setMsg(errorMsg);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageLayout title="Admin Access" subtitle="Secure organizer dashboard login">
      <div className="max-w-md mx-auto pt-8">
        <form
          onSubmit={handleSubmit}
          className="linear-card p-8 space-y-6 animate-zoomFadeIn"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 ml-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="Enter admin username"
                  className="w-full linear-input px-4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full linear-input px-4 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {msg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-xl text-sm text-red-600 dark:text-red-400 text-center animate-shake">
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full linear-primary py-3.5 flex items-center justify-center gap-2 group"
          >
            {busy ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>

          <div className="pt-2 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200 transition-colors">
              <ArrowLeft size={16} /> Back to Homepage
            </Link>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
