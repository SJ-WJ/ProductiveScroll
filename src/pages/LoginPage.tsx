import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import Logo from "../components/Logo";
import ScrollingWall from "../components/ScrollingWall";
import { supabase } from "../lib/supabase";
import { useSession } from "../lib/useSession";

const labelClass = "text-[13px] font-medium";
const inputClass = "h-11 rounded-field border bg-white px-3.5 text-sm focus:border-indigo-600 focus:outline-none";
const linkClass = "font-medium text-indigo-600 hover:text-indigo-800";

export default function LoginPage() {
  const session = useSession();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const credentials = { email: String(form.get("email")), password: String(form.get("password"))};

    setBusy(true);
    setError("");
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword(credentials)
      : await supabase.auth.signUp(credentials)
    setBusy(false)
    
    if (error) setError(isLogin ? "Incorrect email or password" : error.message);
    else navigate("/");
  }

  function toggleMode() {
    setIsLogin(!isLogin);
    setError("");
  }

  if (session) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen flex-wrap bg-paper text-zinc-900">
      <section className="flex h-screen min-w-0 flex-[1_1_520px] flex-col overflow-hidden bg-zinc-900 text-white">
        <div className="flex flex-col gap-8 p-12 pb-8">
          <Logo inverted />
          <div className="flex max-w-[520px] flex-col gap-3">
            <h1 className="text-[40px] leading-[44px] font-semibold text-balance">Save your finds. Explore on your desktop.</h1>
            <p className="text-zinc-400">
              Everything you save from YouTube, TikTok, Instagram, X, Substack and the rest of the web lands in one
              library, ready to sort into boards.
            </p>
          </div>
        </div>
        <ScrollingWall />
      </section>

      <section className="flex min-w-0 flex-[1_1_420px] items-center justify-center p-12">
        <form onSubmit={handleSubmit} className="flex w-full max-w-[380px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{isLogin ? "Welcome back" : "Create your account"}</h2>
            <p className="text-sm text-muted">{isLogin ? "Log in to pick up where you left off." : "Let your ideas flow"}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className={labelClass}>Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={`${inputClass} border-zinc-300`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <label htmlFor="password" className={labelClass}>Password</label>
              {isLogin && <a href="#" className={`text-[13px] ${linkClass}`}>Forgot password?</a>}
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder={isLogin ? "" : "At least 8 characters"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              aria-invalid={!!error}
              className={`${inputClass} ${error ? "border-danger" : "border-zinc-300"}`}
            />
            {error && (
              <p role="alert" className="flex items-center gap-1.5 text-[13px] text-danger">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5M12 16.5v.01" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <button type="submit" disabled={busy} className="h-12 rounded-full bg-indigo-600 text-[15px] font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {busy ? "One moment please" : isLogin ? "Log In" : "Create your account"}
          </button>

          <p className="text-center text-sm text-muted">
            {isLogin ? "New here? " : "Already have an account? "}
            <button type="button" onClick={toggleMode} className={linkClass}>
              {isLogin ? "Create an account" : "Log in"}
            </button>
          </p>
        </form>
      </section>
    </div>
  );
}