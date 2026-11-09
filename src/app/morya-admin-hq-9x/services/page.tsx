import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export default async function ServicesAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/morya-admin-hq-9x/login");
  let services: Record<string, unknown>[] = [];
  let loadError = "";
  try {
    const { data, error } = await supabaseAdmin.from("services").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
    if (error) loadError = `Failed to load services: ${error.message}. Run the services table SQL in Supabase and reload schema cache.`;
    services = (data ?? []) as Record<string, unknown>[];
  } catch { loadError = "Failed to load services."; }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Service management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Services</h1>
            <p className="mt-1 text-sm text-slate-500">DB services render on the website. If DB is empty, the site uses built-in fallback services.</p>
          </div>
          <Link href="/morya-admin-hq-9x/services/new" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-light">Add service</Link>
        </div>
        {loadError ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{loadError}</div> : null}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600"><tr><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Category</th><th className="px-4 py-3 font-medium">Fare</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {services.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-slate-500">No DB services yet. Website is using built-in fallback services until you add rows here.</td></tr>
              ) : services.map((s) => (
                <tr key={String(s.id)} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{String(s.title ?? "")}<div className="font-mono text-xs text-slate-400">{String(s.slug ?? "")}</div></td>
                  <td className="px-4 py-3 text-slate-600">{String(s.category ?? "")}</td>
                  <td className="px-4 py-3 text-slate-600">{String(s.fare ?? "")} {String(s.fare_unit ?? "")}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.active !== false ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>{s.active !== false ? "Active" : "Inactive"}</span></td>
                  <td className="px-4 py-3"><Link href={`/morya-admin-hq-9x/services/${String(s.id)}`} className="text-brand-blue hover:underline">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
