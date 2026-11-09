import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export default async function RoutesAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/morya-admin-hq-9x/login");

  let routes: Record<string, unknown>[] = [];
  let loadError = "";
  try {
    const { data, error } = await supabaseAdmin.from("routes").select("*").order("created_at", { ascending: true });
    if (error) loadError = `Failed to load routes: ${error.message || "database error"}. Check Supabase tables/RLS.`;
    routes = (data ?? []) as Record<string, unknown>[];
  } catch {
    loadError = "Failed to load routes. Check database configuration.";
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Route management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Popular routes</h1>
          </div>
          <Link href="/morya-admin-hq-9x/routes/new" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-light">Add route</Link>
        </div>
        {loadError ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{loadError}</div> : null}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600"><tr><th className="px-4 py-3 font-medium">Route</th><th className="px-4 py-3 font-medium">Distance</th><th className="px-4 py-3 font-medium">Duration</th><th className="px-4 py-3 font-medium">Starts from</th><th className="px-4 py-3 font-medium">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {routes.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-slate-500">No routes available.</td></tr>
              ) : routes.map((route) => (
                <tr key={String(route.id)} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{String(route.name ?? "")}</td>
                  <td className="px-4 py-3 text-slate-600">{String(route.distance ?? "")}</td>
                  <td className="px-4 py-3 text-slate-600">{String(route.duration ?? "")}</td>
                  <td className="px-4 py-3 text-slate-600">{String(route.startingFrom ?? route.starting_from ?? "")}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${route.popular ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>{route.popular ? "Featured" : "Standard"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
