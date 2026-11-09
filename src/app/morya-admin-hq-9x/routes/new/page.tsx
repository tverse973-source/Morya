"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function getCsrf() { if (typeof document === "undefined") return ""; const m = document.cookie.match(/(?:^|; )vgh_admin_csrf=([^;]+)/); return m ? decodeURIComponent(m[1]) : ""; }

const emptyForm = { slug: "", name: "", distance: "", duration: "", startingFrom: "", image: "/images/services/pune-to-shirdi.jpeg", description: "", popular: true };

export default function NewRoutePage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/morya-admin-hq-9x/routes", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "x-csrf-token": getCsrf() },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Failed to save route");
      router.push("/morya-admin-hq-9x/routes");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save route");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Add Route</h1>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600"><span>Slug (optional)</span><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" /></label>
            <label className="space-y-2 text-sm text-slate-600"><span>Route name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" required /></label>
            <label className="space-y-2 text-sm text-slate-600"><span>Distance</span><input value={form.distance} onChange={(e) => setForm({ ...form, distance: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" /></label>
            <label className="space-y-2 text-sm text-slate-600"><span>Duration</span><input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" /></label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2"><span>Starting from</span><input value={form.startingFrom} onChange={(e) => setForm({ ...form, startingFrom: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" /></label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2"><span>Image path</span><input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" /></label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2"><span>Description</span><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" /></label>
          </div>
          <label className="flex items-center gap-3 text-sm text-slate-700"><input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />Feature on homepage</label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex items-center justify-end gap-3"><Link href="/morya-admin-hq-9x/routes" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Cancel</Link><button type="submit" disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">{saving ? "Saving..." : "Save route"}</button></div>
        </form>
      </div>
    </main>
  );
}
