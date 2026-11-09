"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Booking = Record<string, unknown>;
const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed", "closed"];
function v(b: Booking | null, key: string) { const x = b?.[key]; return x == null ? "" : String(x); }
function dateInput(v: unknown) { if (!v) return ""; const d = new Date(String(v)); return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10); }

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const load = useCallback(async () => {
    const res = await fetch(`/api/bookings/${params.id}`, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.booking) throw new Error(data.error || "Failed to load booking");
    return data.booking as Booking;
  }, [params.id]);

  useEffect(() => {
    if (!params.id) return;
    let active = true;
    load().then((row) => { if (active) { setBooking(row); setError(""); } })
      .catch((e) => { if (active) setError(e instanceof Error ? e.message : "Failed to load booking"); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [params.id, load, reloadKey]);

  function setField(key: string, value: string) { setBooking((prev) => ({ ...(prev ?? {}), [key]: value })); }

  async function save() {
    if (!booking) return;
    setSaving(true); setError("");
    try {
      const payload = {
        name: v(booking, "name"), phone: v(booking, "phone"), email: v(booking, "email") || null,
        pickup: v(booking, "pickup"), dropoff: v(booking, "dropoff"), travel_date: v(booking, "travel_date") || undefined,
        trip_type: v(booking, "trip_type") || null, passengers: v(booking, "passengers") || null,
        vehicle_name: v(booking, "vehicle_name") || null, status: v(booking, "status") || "pending",
        source: v(booking, "source") || null, notes: v(booking, "notes") || null,
        amount: v(booking, "amount") === "" ? null : Number(v(booking, "amount")),
      };
      const res = await fetch(`/api/bookings/${params.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to save booking");
      setBooking(data.booking as Booking);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to save booking"); } finally { setSaving(false); }
  }

  async function remove() {
    if (!confirm("Delete this booking permanently?")) return;
    setSaving(true); setError("");
    const res = await fetch(`/api/bookings/${params.id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setError(data.error || "Failed to delete booking"); setSaving(false); return; }
    router.push("/morya-admin-hq-9x/bookings"); router.refresh();
  }

  if (loading) return <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-600">Loading...</main>;
  if (error && !booking) return <main className="min-h-screen bg-slate-100 px-6 py-10"><div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-white p-8 text-red-700">{error} <div className="mt-4"><Link href="/morya-admin-hq-9x/bookings" className="text-brand-blue underline">Back to bookings</Link></div></div></main>;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <Link href="/morya-admin-hq-9x/bookings" className="text-sm text-brand-blue hover:underline">← Back to bookings</Link>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Booking details</h1>
            <p className="mt-1 font-mono text-sm text-slate-500">{v(booking, "booking_number") || v(booking, "id")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setField("status", "closed")} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Mark closed</button>
            <button type="button" onClick={() => void remove()} disabled={saving} className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 disabled:opacity-60">Delete</button>
          </div>
        </div>
        {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-600">Name<input value={v(booking, "name")} onChange={(e) => setField("name", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Phone<input value={v(booking, "phone")} onChange={(e) => setField("phone", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Email<input value={v(booking, "email")} onChange={(e) => setField("email", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Status<select value={v(booking, "status") || "pending"} onChange={(e) => setField("status", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5">{STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
            <label className="text-sm text-slate-600">Pickup<input value={v(booking, "pickup")} onChange={(e) => setField("pickup", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Dropoff<input value={v(booking, "dropoff")} onChange={(e) => setField("dropoff", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Travel date<input type="date" value={dateInput(booking?.travel_date)} onChange={(e) => setField("travel_date", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Trip type<input value={v(booking, "trip_type")} onChange={(e) => setField("trip_type", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Passengers<input value={v(booking, "passengers")} onChange={(e) => setField("passengers", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Vehicle<input value={v(booking, "vehicle_name")} onChange={(e) => setField("vehicle_name", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Source<input value={v(booking, "source")} onChange={(e) => setField("source", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600">Amount<input value={v(booking, "amount")} onChange={(e) => setField("amount", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
            <label className="text-sm text-slate-600 md:col-span-2">Notes<textarea value={v(booking, "notes")} onChange={(e) => setField("notes", e.target.value)} rows={5} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          </div>
          <div className="mt-6 grid gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600 md:grid-cols-2">
            <div><strong>ID:</strong> {v(booking, "id")}</div>
            <div><strong>Vehicle ID:</strong> {v(booking, "vehicle_id") || "—"}</div>
            <div><strong>Created:</strong> {v(booking, "created_at") || "—"}</div>
            <div><strong>Updated:</strong> {v(booking, "updated_at") || "—"}</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => void save()} disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">{saving ? "Saving..." : "Save changes"}</button>
            <button type="button" onClick={() => { setLoading(true); setReloadKey((k) => k + 1); }} disabled={saving} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 disabled:opacity-70">Reload</button>
          </div>
        </div>
      </div>
    </main>
  );
}
