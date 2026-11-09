import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

type VehicleRow = Record<string, unknown>;

export default async function FleetAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/morya-admin-hq-9x/login");

  let vehicles: VehicleRow[] = [];
  let loadError = "";
  try {
    const { data, error } = await supabaseAdmin.from("vehicles").select("*").order("created_at", { ascending: true });
    if (error) loadError = `Failed to load vehicles: ${error.message || "database error"}. Check Supabase tables/RLS and restart dev server.`;
    vehicles = (data ?? []) as VehicleRow[];
  } catch {
    loadError = "Failed to load vehicles. Check database configuration.";
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Fleet management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Vehicles</h1>
          </div>
          <Link href="/morya-admin-hq-9x/fleet/new" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-light">Add vehicle</Link>
        </div>
        {loadError ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{loadError}</div> : null}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="px-4 py-3 font-medium">Name</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Seats</th><th className="px-4 py-3 font-medium">Rate</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-6 text-slate-500">No vehicles available.</td></tr>
              ) : vehicles.map((v) => {
                const id = String(v.id ?? "");
                const available = Boolean(v.available ?? true);
                const pkg = v.packageRate ?? v.package_rate;
                const perKm = v.ratePerKm ?? v.rate_per_km;
                return (
                  <tr key={id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{String(v.name ?? "")}</td>
                    <td className="px-4 py-3 text-slate-600">{String(v.type ?? "")}</td>
                    <td className="px-4 py-3 text-slate-600">{String(v.seats ?? "")}</td>
                    <td className="px-4 py-3 text-slate-600">{pkg ? `₹${String(pkg)}` : `₹${String(perKm ?? 0)}/km`}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{available ? "Available" : "Unavailable"}</span></td>
                    <td className="px-4 py-3"><Link href={`/morya-admin-hq-9x/fleet/${id}`} className="text-brand-blue hover:underline">Edit</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
