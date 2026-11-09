import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminMutation } from "@/lib/auth";
import { serverError } from "@/lib/api-error";
import { supabaseAdmin } from "@/lib/supabase";

const updateSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  type: z.enum(["sedan", "suv", "muv", "tempo", "hatchback"]).optional(),
  seats: z.number().int().min(1).max(60).optional(),
  luggage: z.number().int().min(0).max(60).optional(),
  ac: z.boolean().optional(),
  ratePerKm: z.number().int().min(0).max(10000).optional(),
  minKm: z.number().int().min(0).max(10000).optional(),
  badge: z.string().trim().max(60).optional().nullable(),
  badgeColor: z.string().trim().max(30).optional().nullable(),
  image: z.string().trim().max(500).optional(),
  features: z.string().trim().max(2000).optional(),
  extraFeatures: z.string().trim().max(4000).optional(),
  packageRate: z.number().int().min(0).max(10000000).optional().nullable(),
  available: z.boolean().optional(),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("vehicles").select("*").eq("id", id).maybeSingle();
  if (error) return serverError("Failed to load vehicle");
  if (!data) return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
  return NextResponse.json({ ok: true, vehicle: data });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  try {
    const { id } = await params;
    const payload = await request.json().catch(() => null);
    const parsed = updateSchema.safeParse(payload);
    if (!parsed.success) return NextResponse.json({ error: "Invalid update payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    const p = parsed.data;
    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (p.name !== undefined) { update.name = p.name; update.slug = p.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
    if (p.type !== undefined) update.type = p.type;
    if (p.seats !== undefined) update.seats = p.seats;
    if (p.luggage !== undefined) update.luggage = p.luggage;
    if (p.ac !== undefined) update.ac = p.ac;
    if (p.ratePerKm !== undefined) update.rate_per_km = p.ratePerKm;
    if (p.minKm !== undefined) update.min_km = p.minKm;
    if (p.badge !== undefined) update.badge = p.badge;
    if (p.badgeColor !== undefined) update.badge_color = p.badgeColor;
    if (p.image !== undefined) update.image = p.image;
    if (p.features !== undefined) update.features = p.features;
    if (p.extraFeatures !== undefined) update.extra_features = p.extraFeatures;
    if (p.packageRate !== undefined) update.package_rate = p.packageRate;
    if (p.available !== undefined) update.available = p.available;
    const { data, error } = await supabaseAdmin.from("vehicles").update(update).eq("id", id).select("*").maybeSingle();
    if (error) return serverError("Failed to update vehicle");
    if (!data) return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    return NextResponse.json({ ok: true, vehicle: data });
  } catch {
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
  }
}
