"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/morya-admin-hq-9x/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h1 className="mb-6 text-2xl font-bold text-slate-900">Reset instructions sent</h1>
          <p className="mb-6 text-sm text-slate-600">A reset token has been generated. Check your email (or the dev console in development) for the token.</p>
          <button
            onClick={() => router.push("/morya-admin-hq-9x/login")}
            className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue/90"
          >
            Back to sign in
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 text-center">Forgot Password</h1>
        {error ? <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
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
          <button
            disabled={sending}
            className="w-full rounded-full bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70 hover:bg-brand-blue/90"
          >
            {sending ? "Sending..." : "Generate reset token"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => router.push("/morya-admin-hq-9x/login")}
            className="text-brand-blue underline hover:text-brand-blue/90"
          >
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
}
