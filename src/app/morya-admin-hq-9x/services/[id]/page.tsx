"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getCsrf() { if (typeof document === "undefined") return ""; const m = document.cookie.match(/(?:^|; )vgh_admin_csrf=([^;]+)/); return m ? decodeURIComponent(m[1]) : ""; }
const CATS = ["local","outstation","airport","pilgrimage","rental","corporate"];
const ICONS = ["Car","Bus","Plane","Landmark","MapPin","Truck","Globe"];
type Svc = Record<string, unknown>;
function s(v: unknown) { return v == null ? "" : String(v); }
function arr(v: unknown) { return Array.isArray(v) ? v.join("\n") : typeof v === "string" ? v : ""; }

async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/morya-admin-hq-9x/upload", { method: "POST", credentials: "same-origin", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return String(data.url);
}

export default function EditServicePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<Svc | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const res = await fetch(`/api/morya-admin-hq-9x/services/${params.id}`, { credentials: "same-origin", cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Failed to load service");
        const svc = data.service as Svc;
        if (cancelled) return;
        setForm({
          title: s(svc.title), description: s(svc.description), shortDescription: s(svc.short_description), category: s(svc.category) || "local", fare: s(svc.fare), fareUnit: s(svc.fare_unit), image: s(svc.image), icon: s(svc.icon) || "Car",
          includes: arr(svc.includes), idealFor: arr(svc.ideal_for), relatedIds: Array.isArray(svc.related_ids) ? svc.related_ids.join(", ") : s(svc.related_ids), places: arr(svc.places),
          badge: s(svc.badge), badgeColor: s(svc.badge_color), active: svc.active !== false, sortOrder: Number(svc.sort_order ?? 0),
        });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      }
    }
    void run();
    return () => { cancelled = true; };
  }, [params.id]);
  async function save(e: React.FormEvent) {
    e.preventDefault(); if (!form) return; setSaving(true); setError("");
    const res = await fetch(`/api/morya-admin-hq-9x/services/${params.id}`, { method:"PATCH", credentials:"same-origin", headers:{ "Content-Type":"application/json", "x-csrf-token": getCsrf() }, body: JSON.stringify(form) });
    const data = await res.json().catch(()=>({}));
    setSaving(false);
    if (!res.ok) { setError(data.error || "Failed to save"); return; }
    router.push("/morya-admin-hq-9x/services"); router.refresh();
  }
  async function remove() {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/morya-admin-hq-9x/services/${params.id}`, { method:"DELETE", credentials:"same-origin", headers:{ "x-csrf-token": getCsrf() } });
    const data = await res.json().catch(()=>({}));
    if (!res.ok) { setError(data.error || "Failed to delete"); return; }
    router.push("/morya-admin-hq-9x/services"); router.refresh();
  }
  if (!form) return <main className="min-h-screen bg-slate-100 px-6 py-10">{error ? <div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-white p-6 text-red-700">{error}</div> : <div className="text-slate-600">Loading...</div>}</main>;
  const set = (k: string, v: unknown) => setForm((p)=>({ ...(p||{}), [k]: v }));
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10"><div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between gap-3"><h1 className="text-3xl font-bold text-slate-900">Edit Service</h1><button type="button" onClick={()=>void remove()} className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700">Delete</button></div>
      <form className="mt-6 space-y-4" onSubmit={save}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-600 md:col-span-2">Title<input required value={s(form.title)} onChange={(e)=>set("title",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Short description<input value={s(form.shortDescription)} onChange={(e)=>set("shortDescription",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Description<textarea rows={4} value={s(form.description)} onChange={(e)=>set("description",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Category<select value={s(form.category)||"local"} onChange={(e)=>set("category",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5">{CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
          <label className="text-sm text-slate-600">Icon<select value={s(form.icon)||"Car"} onChange={(e)=>set("icon",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5">{ICONS.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
          <label className="text-sm text-slate-600">Fare<input value={s(form.fare)} onChange={(e)=>set("fare",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Fare unit<input value={s(form.fareUnit)} onChange={(e)=>set("fareUnit",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Image path<div className="flex items-center gap-2 mt-1"><input required value={s(form.image)} onChange={(e)=>set("image",e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 flex-1 text-sm" /><button type="button" onChange={undefined} onClick={async (e)=>{ e.preventDefault(); const input=document.getElementById("svc-img-upload") as HTMLInputElement; input.value=""; input.click(); }} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-brand-blue hover:bg-brand-blue/5">Upload</button><input id="svc-img-upload" type="file" accept="image/*" className="hidden" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f)return; try{const url=await uploadImage(f); set("image",url);}catch(err){setError(err instanceof Error?err.message:"Upload failed");} }} /></div></label>
          <label className="text-sm text-slate-600 md:col-span-2">Includes (one per line)<textarea rows={4} value={s(form.includes)} onChange={(e)=>set("includes",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Ideal for (one per line)<textarea rows={3} value={s(form.idealFor)} onChange={(e)=>set("idealFor",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Related service slugs (comma separated)<input value={s(form.relatedIds)} onChange={(e)=>set("relatedIds",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Places (one per line)<textarea rows={4} value={s(form.places)} onChange={(e)=>set("places",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Badge<input value={s(form.badge)} onChange={(e)=>set("badge",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Badge color<input value={s(form.badgeColor)} onChange={(e)=>set("badgeColor",e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Sort order<input type="number" value={Number(form.sortOrder ?? 0)} onChange={(e)=>set("sortOrder",Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="flex items-center gap-2 pt-6 text-sm text-slate-700"><input type="checkbox" checked={form.active !== false} onChange={(e)=>set("active",e.target.checked)} />Active on website</label>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex justify-end gap-3"><Link href="/morya-admin-hq-9x/services" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Cancel</Link><button disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">{saving?"Saving...":"Save changes"}</button></div>
      </form>
    </div></main>
  );
}
