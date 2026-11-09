import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminMutation } from "@/lib/auth";
import { serverError } from "@/lib/api-error";
import { supabaseAdmin } from "@/lib/supabase";

const schema = z.object({
  slug: z.string().trim().max(160).optional().default(""),
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(8000).optional().default(""),
  shortDescription: z.string().trim().max(300).optional().default(""),
  category: z.enum(["local", "outstation", "airport", "pilgrimage", "rental", "corporate"]).default("local"),
  fare: z.string().trim().max(80).optional().default(""),
  fareUnit: z.string().trim().max(120).optional().default(""),
  image: z.string().trim().max(500).optional().default(""),
  icon: z.string().trim().max(40).optional().default("Car"),
  includes: z.string().trim().max(8000).optional().default(""),
  idealFor: z.string().trim().max(8000).optional().default(""),
  relatedIds: z.string().trim().max(4000).optional().default(""),
  places: z.string().trim().max(12000).optional().default(""),
  badge: z.string().trim().max(80).optional().default(""),
  badgeColor: z.string().trim().max(30).optional().default(""),
  active: z.boolean().optional().default(true),
  sortOrder: z.number().int().min(-9999).max(9999).optional().default(0),
});

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function lines(v: string) { return v.split("\n").map((s) => s.trim()).filter(Boolean); }

export async function GET() {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  const { data, error } = await supabaseAdmin.from("services").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
  if (error) return serverError("Failed to load services");
  return NextResponse.json({ ok: true, services: data ?? [] });
}

export async function POST(request: Request) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  try {
    const parsed = schema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Invalid service payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    const p = parsed.data;
    const row = {
      slug: slugify(p.slug || p.title),
      title: p.title,
      description: p.description,
      short_description: p.shortDescription || p.description.slice(0, 160),
      category: p.category,
      fare: p.fare,
      fare_unit: p.fareUnit,
      image: p.image || "/images/services/outstation.jpeg",
      icon: p.icon || "Car",
      includes: lines(p.includes),
      ideal_for: lines(p.idealFor),
      related_ids: p.relatedIds.split(",").map((s) => s.trim()).filter(Boolean),
      places: lines(p.places),
      badge: p.badge || null,
      badge_color: p.badgeColor || null,
      active: p.active ?? true,
      sort_order: p.sortOrder ?? 0,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabaseAdmin.from("services").insert(row).select("*").single();
    if (error) return serverError("Failed to create service");
    return NextResponse.json({ ok: true, service: data });
  } catch {
    return serverError("Failed to create service");
  }
}
