import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminMutation } from "@/lib/auth";
import { serverError } from "@/lib/api-error";
import { supabaseAdmin } from "@/lib/supabase";

const schema = z.object({
  title: z.string().trim().min(2).max(160).optional(),
  description: z.string().trim().max(8000).optional(),
  shortDescription: z.string().trim().max(300).optional(),
  category: z.enum(["local", "outstation", "airport", "pilgrimage", "rental", "corporate"]).optional(),
  fare: z.string().trim().max(80).optional(),
  fareUnit: z.string().trim().max(120).optional(),
  image: z.string().trim().max(500).optional(),
  icon: z.string().trim().max(40).optional(),
  includes: z.string().trim().max(8000).optional(),
  idealFor: z.string().trim().max(8000).optional(),
  relatedIds: z.string().trim().max(4000).optional(),
  places: z.string().trim().max(12000).optional(),
  badge: z.string().trim().max(80).optional().nullable(),
  badgeColor: z.string().trim().max(30).optional().nullable(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().min(-9999).max(9999).optional(),
});
function lines(v: string) { return v.split("\n").map((s) => s.trim()).filter(Boolean); }

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("services").select("*").eq("id", id).maybeSingle();
  if (error) return serverError("Failed to load service");
  if (!data) return NextResponse.json({ error: "Service not found" }, { status: 404 });
  return NextResponse.json({ ok: true, service: data });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  try {
    const { id } = await params;
    const parsed = schema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Invalid update payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    const p = parsed.data;
    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (p.title !== undefined) { update.title = p.title; update.slug = p.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
    if (p.description !== undefined) update.description = p.description;
    if (p.shortDescription !== undefined) update.short_description = p.shortDescription;
    if (p.category !== undefined) update.category = p.category;
    if (p.fare !== undefined) update.fare = p.fare;
    if (p.fareUnit !== undefined) update.fare_unit = p.fareUnit;
    if (p.image !== undefined) update.image = p.image;
    if (p.icon !== undefined) update.icon = p.icon;
    if (p.includes !== undefined) update.includes = lines(p.includes);
    if (p.idealFor !== undefined) update.ideal_for = lines(p.idealFor);
    if (p.relatedIds !== undefined) update.related_ids = p.relatedIds.split(",").map((s) => s.trim()).filter(Boolean);
    if (p.places !== undefined) update.places = lines(p.places);
    if (p.badge !== undefined) update.badge = p.badge;
    if (p.badgeColor !== undefined) update.badge_color = p.badgeColor;
    if (p.active !== undefined) update.active = p.active;
    if (p.sortOrder !== undefined) update.sort_order = p.sortOrder;
    const { data, error } = await supabaseAdmin.from("services").update(update).eq("id", id).select("*").maybeSingle();
    if (error) return serverError("Failed to update service");
    if (!data) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    return NextResponse.json({ ok: true, service: data });
  } catch {
    return serverError("Failed to update service");
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  const { id } = await params;
  const { error } = await supabaseAdmin.from("services").delete().eq("id", id);
  if (error) return serverError("Failed to delete service");
  return NextResponse.json({ ok: true });
}
