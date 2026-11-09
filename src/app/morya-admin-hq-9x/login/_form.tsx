"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/morya-admin-hq-9x/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Invalid email or password");
      router.push("/morya-admin-hq-9x");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid email or password");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 text-center">Admin Sign In</h1>
        {error ? (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
        ) : null}
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <button
            disabled={saving}
            className="w-full rounded-full bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70 hover:bg-brand-blue/90"
          >
            {saving ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Forgot your password?{" "}
          <button
            type="button"
            onClick={() => router.push("/morya-admin-hq-9x/forgot-password")}
            className="text-brand-blue underline hover:text-brand-blue/90"
          >
            Reset it
          </button>
        </p>
      </div>
    </main>
  );
}
