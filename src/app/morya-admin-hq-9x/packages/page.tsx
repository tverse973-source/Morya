import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export default async function PackagesAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/morya-admin-hq-9x/login");

  let packages: Record<string, unknown>[] = [];
  let loadError = "";
  try {
    const { data, error } = await supabaseAdmin.from("packages").select("*").order("created_at", { ascending: true });
    if (error) loadError = `Failed to load packages: ${error.message || "database error"}. Check Supabase tables/RLS.`;
    packages = (data ?? []) as Record<string, unknown>[];
  } catch {
    loadError = "Failed to load packages. Check database configuration.";
  }

  function safeCount(json: unknown) {
    if (typeof json !== "string" || !json) return 0;
    try { const v = JSON.parse(json); return Array.isArray(v) ? v.length : 0; } catch { return 0; }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Package management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Travel packages</h1>
          </div>
          <Link href="/morya-admin-hq-9x/packages/new" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-light">Add package</Link>
        </div>
        {loadError ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{loadError}</div> : null}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600"><tr><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Columns</th><th className="px-4 py-3 font-medium">Rows</th><th className="px-4 py-3 font-medium">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {packages.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-6 text-slate-500">No packages available.</td></tr>
              ) : packages.map((pkg) => (
                <tr key={String(pkg.id)} className="align-top hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{String(pkg.title ?? "")}</td>
                  <td className="px-4 py-3 text-slate-600">{safeCount(pkg.columns)} columns</td>
                  <td className="px-4 py-3 text-slate-600">{safeCount(pkg.rows)} rows</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${pkg.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>{pkg.active ? "Active" : "Inactive"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
