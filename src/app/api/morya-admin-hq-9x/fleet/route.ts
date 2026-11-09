import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminMutation } from "@/lib/auth";
import { serverError } from "@/lib/api-error";
import { supabaseAdmin } from "@/lib/supabase";

const vehicleSchema = z.object({
  name: z.string().trim().min(2).max(120),
  type: z.enum(["sedan", "suv", "muv", "tempo", "hatchback"]).default("sedan"),
  seats: z.number().int().min(1).max(60),
  luggage: z.number().int().min(0).max(60).default(2),
  ac: z.boolean().default(true),
  ratePerKm: z.number().int().min(0).max(10000).default(0),
  minKm: z.number().int().min(0).max(10000).default(0),
  badge: z.string().trim().max(60).optional(),
  badgeColor: z.string().trim().max(30).optional(),
  image: z.string().trim().max(500).default("/images/fleet/toyota-innova.png"),
  features: z.string().trim().max(2000).optional().default(""),
  extraFeatures: z.string().trim().max(4000).optional().default(""),
  packageRate: z.number().int().min(0).max(10000000).optional().nullable(),
  available: z.boolean().optional().default(true),
});

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET() {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  const { data, error } = await supabaseAdmin.from("vehicles").select("*").order("created_at", { ascending: true });
  if (error) return serverError("Failed to load vehicles");
  return NextResponse.json({ ok: true, vehicles: data ?? [] });
}

export async function POST(request: Request) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  try {
    const payload = await request.json().catch(() => null);
    const parsed = vehicleSchema.safeParse(payload);
    if (!parsed.success) return NextResponse.json({ error: "Invalid vehicle payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    const p = parsed.data;
    const row = {
      slug: slugify(p.name),
      name: p.name,
      type: p.type,
      seats: p.seats,
      luggage: p.luggage,
      ac: p.ac,
      rate_per_km: p.ratePerKm,
      min_km: p.minKm,
      badge: p.badge || null,
      badge_color: p.badgeColor || null,
      image: p.image,
      features: p.features || "",
      extra_features: p.extraFeatures || "",
      package_rate: p.packageRate ?? null,
      available: p.available ?? true,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabaseAdmin.from("vehicles").insert(row).select("*").single();
    if (error) return serverError("Failed to create vehicle");
    return NextResponse.json({ ok: true, vehicle: data });
  } catch {
    return serverError("Failed to create vehicle");
  }
}
