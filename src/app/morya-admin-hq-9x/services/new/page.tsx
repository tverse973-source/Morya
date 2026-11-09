"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function getCsrf() { if (typeof document === "undefined") return ""; const m = document.cookie.match(/(?:^|; )vgh_admin_csrf=([^;]+)/); return m ? decodeURIComponent(m[1]) : ""; }
const CATS = ["local","outstation","airport","pilgrimage","rental","corporate"];
const ICONS = ["Car","Bus","Plane","Landmark","MapPin","Truck","Globe"];
const empty = { title:"", description:"", shortDescription:"", category:"local", fare:"", fareUnit:"", image:"/images/services/outstation.jpeg", icon:"Car", includes:"", idealFor:"", relatedIds:"", places:"", badge:"", badgeColor:"", active:true, sortOrder:0 };

export default function NewServicePage() {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const res = await fetch("/api/morya-admin-hq-9x/services", { method:"POST", credentials:"same-origin", headers:{ "Content-Type":"application/json", "x-csrf-token": getCsrf() }, body: JSON.stringify(form) });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(data.error || "Failed to save service");
      router.push("/morya-admin-hq-9x/services"); router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to save service"); } finally { setSaving(false); }
  }
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10"><div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Add Service</h1>
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-600 md:col-span-2">Title<input required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Short description<input value={form.shortDescription} onChange={(e)=>setForm({...form,shortDescription:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Description<textarea rows={4} value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Category<select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5">{CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
          <label className="text-sm text-slate-600">Icon<select value={form.icon} onChange={(e)=>setForm({...form,icon:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5">{ICONS.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
          <label className="text-sm text-slate-600">Fare<input value={form.fare} onChange={(e)=>setForm({...form,fare:e.target.value})} placeholder="₹12 / On call" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Fare unit<input value={form.fareUnit} onChange={(e)=>setForm({...form,fareUnit:e.target.value})} placeholder="per km" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Image path<input value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Includes (one per line)<textarea rows={4} value={form.includes} onChange={(e)=>setForm({...form,includes:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Ideal for (one per line)<textarea rows={3} value={form.idealFor} onChange={(e)=>setForm({...form,idealFor:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Related service slugs (comma separated)<input value={form.relatedIds} onChange={(e)=>setForm({...form,relatedIds:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600 md:col-span-2">Places (one per line)<textarea rows={4} value={form.places} onChange={(e)=>setForm({...form,places:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Badge<input value={form.badge} onChange={(e)=>setForm({...form,badge:e.target.value})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Badge color<input value={form.badgeColor} onChange={(e)=>setForm({...form,badgeColor:e.target.value})} placeholder="#3B72FF" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="text-sm text-slate-600">Sort order<input type="number" value={form.sortOrder} onChange={(e)=>setForm({...form,sortOrder:Number(e.target.value)})} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
          <label className="flex items-center gap-2 pt-6 text-sm text-slate-700"><input type="checkbox" checked={form.active} onChange={(e)=>setForm({...form,active:e.target.checked})} />Active on website</label>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex justify-end gap-3"><Link href="/morya-admin-hq-9x/services" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Cancel</Link><button disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">{saving?"Saving...":"Save service"}</button></div>
      </form>
    </div></main>
  );
}
