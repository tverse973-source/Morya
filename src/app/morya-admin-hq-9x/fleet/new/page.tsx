"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const emptyForm = {
  slug: "",
  name: "",
  type: "sedan",
  seats: 4,
  luggage: 2,
  ac: true,
  ratePerKm: 12,
  minKm: 300,
  badge: "New",
  badgeColor: "#3B82F6",
  image: "/images/fleet/maruti-swift-dzire.png",
  features: "AC,GPS Tracked,Clean Interior",
  extraFeatures: "Reliable,Comfortable,Professional Driver",
  packageRate: "",
  available: true,
};

function getCsrf() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|; )vgh_admin_csrf=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export default function NewVehiclePage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const response = await fetch("/api/morya-admin-hq-9x/fleet", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-csrf-token": getCsrf() },
      credentials: "same-origin",
      body: JSON.stringify({
        ...form,
        packageRate: form.packageRate ? Number(form.packageRate) : null,
        ratePerKm: Number(form.ratePerKm),
        minKm: Number(form.minKm),
        seats: Number(form.seats),
        luggage: Number(form.luggage),
      }),
    });

    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Failed to save vehicle");
      return;
    }

    router.push("/morya-admin-hq-9x/fleet");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Add Vehicle</h1>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span>Slug</span>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>Name</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>Type</span>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue">
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury</option>
                <option value="tempo">Tempo</option>
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>Seats</span>
              <input type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>Luggage</span>
              <input type="number" value={form.luggage} onChange={(e) => setForm({ ...form, luggage: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>Rate / km</span>
              <input type="number" value={form.ratePerKm} onChange={(e) => setForm({ ...form, ratePerKm: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>Min km</span>
              <input type="number" value={form.minKm} onChange={(e) => setForm({ ...form, minKm: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>Package rate</span>
              <input type="number" value={form.packageRate} onChange={(e) => setForm({ ...form, packageRate: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
              <span>Image path</span>
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
              <span>Features</span>
              <input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
              <span>Extra features</span>
              <input value={form.extraFeatures} onChange={(e) => setForm({ ...form, extraFeatures: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={form.ac} onChange={(e) => setForm({ ...form, ac: e.target.checked })} />
            AC enabled
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} />
            Available now
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex items-center justify-end gap-3">
            <Link href="/morya-admin-hq-9x/fleet" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Cancel</Link>
            <button disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">
              {saving ? "Saving..." : "Save vehicle"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
