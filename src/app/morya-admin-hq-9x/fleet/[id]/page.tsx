"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function getCsrf() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|; )vgh_admin_csrf=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export default function AdminFleetEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", type: "sedan", seats: "4", ratePerKm: "12", available: "true" });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/morya-admin-hq-9x/fleet/${params.id}`, { credentials: "same-origin" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.vehicle) throw new Error(data.error || "Failed to load vehicle");
        setForm({
          name: String(data.vehicle.name ?? ""),
          type: String(data.vehicle.type ?? "sedan"),
          seats: String(data.vehicle.seats ?? 4),
          ratePerKm: String(data.vehicle.ratePerKm ?? 12),
          available: String(Boolean(data.vehicle.available)),
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load vehicle");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/morya-admin-hq-9x/fleet/${params.id}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "x-csrf-token": getCsrf() },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          seats: Number(form.seats),
          ratePerKm: Number(form.ratePerKm),
          available: form.available === "true",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to update vehicle");
      router.push("/morya-admin-hq-9x/fleet");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update vehicle");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-600">Loading...</main>;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Edit vehicle</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-600">Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" required /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-600">Type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5"><option value="sedan">Sedan</option><option value="suv">SUV</option><option value="muv">MUV</option><option value="tempo">Tempo Traveller</option></select></label>
            <label className="block text-sm text-slate-600">Seats<input type="number" min="1" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" required /></label>
            <label className="block text-sm text-slate-600">Rate per km<input type="number" min="0" value={form.ratePerKm} onChange={(e) => setForm({ ...form, ratePerKm: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="block text-sm text-slate-600">Available<select value={form.available} onChange={(e) => setForm({ ...form, available: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5"><option value="true">Yes</option><option value="false">No</option></select></label>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button type="submit" disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">{saving ? "Saving..." : "Save changes"}</button>
        </form>
      </div>
    </main>
  );
}
