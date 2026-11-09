"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [resetting, setResetting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 12) {
      setError("Password must be at least 12 characters");
      return;
    }
    setResetting(true);
    try {
      const res = await fetch("/api/morya-admin-hq-9x/password-reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Reset failed");
      router.push("/morya-admin-hq-9x/login");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setResetting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 text-center">Reset Password</h1>
        {error ? <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">New password</label>
            <input
              required
              type="password"
              minLength={12}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Confirm password</label>
            <input
              required
              type="password"
              minLength={12}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <button
            disabled={resetting}
            className="w-full rounded-full bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70 hover:bg-brand-blue/90"
          >
            {resetting ? "Resetting..." : "Reset password"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already have a token? Enter it above.{" "}
          <button
            type="button"
            onClick={() => router.push("/morya-admin-hq-9x/login")}
            className="text-brand-blue underline hover:text-brand-blue/90"
          >
            Back to sign in
          </button>
        </p>
      </div>
    </main>
  );
}
