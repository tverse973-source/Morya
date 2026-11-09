"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Booking = Record<string, unknown> & { id: string };
const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed", "closed"] as const;
const emptyForm = { name: "", phone: "", email: "", pickup: "", dropoff: "", date: new Date().toISOString().slice(0, 10), tripType: "One way", passengers: "", vehicleName: "", status: "pending", source: "admin", amount: "", notes: "" };
function asText(v: unknown) { return v == null ? "" : String(v); }
function fmtDate(v: unknown) { if (!v) return "—"; const d = new Date(String(v)); return Number.isNaN(d.getTime()) ? String(v) : d.toLocaleString("en-IN"); }

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
const [filter, setFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const load = useCallback(async () => {
    const res = await fetch("/api/bookings", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Failed to load bookings");
    return (data.bookings ?? []) as Booking[];
  }, []);

  useEffect(() => {
    let active = true;
    load().then((rows) => { if (active) { setBookings(rows); setError(""); } })
      .catch((e) => { if (active) setError(e instanceof Error ? e.message : "Failed to load bookings"); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [load, reloadKey]);

const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (filter !== "all" && asText(b.status).toLowerCase() !== filter) return false;
      if (sourceFilter !== "all" && asText(b.source).toLowerCase() !== sourceFilter) return false;
      if (!q) return true;
      return [b.name, b.phone, b.email, b.pickup, b.dropoff, b.booking_number, b.vehicle_name, b.notes, b.source].map(asText).join(" ").toLowerCase().includes(q);
    });
  }, [bookings, filter, sourceFilter, query]);

  async function createBooking(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, amount: form.amount ? Number(form.amount) : null }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to create booking");
      setForm(emptyForm); setLoading(true); setReloadKey((k) => k + 1);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to create booking"); } finally { setSaving(false); }
  }
  async function setStatus(id: string, status: string) {
    setError("");
    const res = await fetch(`/api/bookings/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setError(data.error || "Failed to update booking"); return; }
    setLoading(true); setReloadKey((k) => k + 1);
  }
  async function remove(id: string) {
    if (!confirm("Delete this booking permanently?")) return;
    setError("");
    const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setError(data.error || "Failed to delete booking"); return; }
    setLoading(true); setReloadKey((k) => k + 1);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Bookings</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Manage bookings</h1>
          <p className="mt-1 text-sm text-slate-500">View, create, update status, close/cancel, and delete bookings.</p>
        </div>
        {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Create booking</h2>
          <form onSubmit={createBooking} className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <input required placeholder="Customer name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input required placeholder="Pickup" value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input required placeholder="Dropoff" value={form.dropoff} onChange={(e) => setForm({ ...form, dropoff: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input placeholder="Trip type" value={form.tripType} onChange={(e) => setForm({ ...form, tripType: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input placeholder="Passengers" value={form.passengers} onChange={(e) => setForm({ ...form, passengers: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input placeholder="Vehicle" value={form.vehicleName} onChange={(e) => setForm({ ...form, vehicleName: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select>
            <input placeholder="Amount (optional)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <input placeholder="Source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
            <textarea placeholder="Notes / details" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm md:col-span-2 xl:col-span-4" />
            <div className="md:col-span-2 xl:col-span-4 flex gap-3"><button disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">{saving ? "Creating..." : "Create booking"}</button><button type="button" onClick={() => { setLoading(true); setReloadKey((k) => k + 1); }} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700">Refresh</button></div>
          </form>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
<div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">{["all", ...STATUS_OPTIONS].map((s) => <button key={s} type="button" onClick={() => setFilter(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium ${filter === s ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>{s}</button>)}</div>
            <div className="flex flex-wrap gap-2">{["all", "website-package-booking", "website-booking", "admin"].map((s) => <button key={s} type="button" onClick={() => setSourceFilter(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium ${sourceFilter === s ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-700"}`}>{s === "website-package-booking" ? "Package" : s === "website-booking" ? "Regular" : s}</button>)}</div>
            <input placeholder="Search name, phone, route, ref..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm md:max-w-sm" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600"><tr><th className="px-3 py-3 font-medium">Ref / Customer</th><th className="px-3 py-3 font-medium">Route</th><th className="px-3 py-3 font-medium">Travel</th><th className="px-3 py-3 font-medium">Details</th><th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 font-medium">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? <tr><td colSpan={6} className="px-3 py-6 text-slate-500">Loading bookings...</td></tr> : filtered.length === 0 ? <tr><td colSpan={6} className="px-3 py-6 text-slate-500">No bookings found.</td></tr> : filtered.map((b) => {
                  const id = asText(b.id); const status = asText(b.status) || "pending";
                  return (
                    <tr key={id} className="align-top hover:bg-slate-50">
                      <td className="px-3 py-3"><p className="font-mono text-xs text-slate-500">{asText(b.booking_number) || id}</p><p className="font-medium text-slate-800">{asText(b.name)}</p><p className="text-slate-500">{asText(b.phone)}</p>{b.email ? <p className="text-slate-500">{asText(b.email)}</p> : null}</td>
                      <td className="px-3 py-3 text-slate-600">{asText(b.pickup)} → {asText(b.dropoff)}</td>
                      <td className="px-3 py-3 text-slate-600"><div>{fmtDate(b.travel_date)}</div>{b.trip_type ? <div className="text-xs text-slate-500">{asText(b.trip_type)}</div> : null}{b.passengers ? <div className="text-xs text-slate-500">{asText(b.passengers)} pax</div> : null}</td>
                      <td className="px-3 py-3 text-slate-600">{b.vehicle_name ? <div>{asText(b.vehicle_name)}</div> : null}{b.amount != null ? <div className="text-xs">Amount: ₹{asText(b.amount)}</div> : null}{b.source ? <div className="text-xs text-slate-500">Source: {asText(b.source)}</div> : null}{b.notes ? <div className="mt-1 max-w-xs line-clamp-3 text-xs text-slate-500" title={asText(b.notes)}>{asText(b.notes)}</div> : null}</td>
                      <td className="px-3 py-3"><select value={status} onChange={(e) => void setStatus(id, e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs">{STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></td>
                      <td className="px-3 py-3"><div className="flex flex-wrap gap-2"><Link href={`/morya-admin-hq-9x/bookings/${id}`} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">View</Link><button type="button" onClick={() => void setStatus(id, "closed")} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">Close</button><button type="button" onClick={() => void remove(id)} className="rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">Delete</button></div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
