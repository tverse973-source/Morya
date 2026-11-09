import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/morya-admin-hq-9x/login");

  let bookings: Array<Record<string, unknown>> = [];
  let notifications: Array<Record<string, unknown>> = [];
  let stats = { total: 0, pending: 0, confirmed: 0, cancelled: 0, leads: 0 };
  let loadError = "";

  try {
    const [bRes, nRes, total, pending, confirmed, cancelled, leads] = await Promise.all([
      supabaseAdmin.from("bookings").select("id,name,pickup,dropoff,status,travel_date").order("created_at", { ascending: false }).limit(8),
      supabaseAdmin.from("notifications").select("id,title,type,message,created_at").order("created_at", { ascending: false }).limit(8),
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }).eq("status", "cancelled"),
      supabaseAdmin.from("leads").select("id", { count: "exact", head: true }),
    ]);
    if (bRes.error || nRes.error) loadError = "Some dashboard data could not be loaded. Check Supabase configuration/RLS.";
    bookings = (bRes.data ?? []) as Array<Record<string, unknown>>;
    notifications = (nRes.data ?? []) as Array<Record<string, unknown>>;
    stats = {
      total: total.count ?? 0,
      pending: pending.count ?? 0,
      confirmed: confirmed.count ?? 0,
      cancelled: cancelled.count ?? 0,
      leads: leads.count ?? 0,
    };
  } catch {
    loadError = "Failed to load dashboard data. Check database configuration.";
  }

  const statCards = [
    { label: "Total bookings", value: stats.total, accent: "slate" },
    { label: "Pending", value: stats.pending, accent: "amber" },
    { label: "Confirmed", value: stats.confirmed, accent: "emerald" },
    { label: "Cancelled", value: stats.cancelled, accent: "rose" },
    { label: "Leads", value: stats.leads, accent: "blue" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Welcome back, {admin.name}</h1>
        </div>
        <Link href="/morya-admin-hq-9x/bookings" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90">
          Manage bookings
        </Link>
      </div>

      {loadError ? <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{loadError}</div> : null}

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {statCards.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Recent bookings</h2>
            <Link href="/morya-admin-hq-9x/bookings" className="text-sm font-medium text-brand-blue hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {bookings.length === 0 ? (
              <p className="text-sm text-slate-500">No bookings yet.</p>
            ) : bookings.map((booking) => (
              <Link
                key={String(booking.id)}
                href={`/morya-admin-hq-9x/bookings/${String(booking.id)}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-3 transition hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-800">{String(booking.name ?? "")}</p>
                  <p className="truncate text-sm text-slate-500">{String(booking.pickup ?? "")} → {String(booking.dropoff ?? "")}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${booking.status === "confirmed" ? "bg-emerald-100 text-emerald-700" : booking.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-sky-100 text-sky-700"}`}>
                  {String(booking.status ?? "pending")}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Notification feed</h2>
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-sm text-slate-500">No notifications yet.</p>
            ) : notifications.map((notification) => (
              <div key={String(notification.id)} className="rounded-xl border border-slate-100 px-3 py-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-slate-800">{String(notification.title ?? "")}</p>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{String(notification.type ?? "")}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{String(notification.message ?? "")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}