import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminMutation } from "@/lib/auth";
import { serverError } from "@/lib/api-error";
import { supabaseAdmin } from "@/lib/supabase";

const packageSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional().default(""),
  columns: z.string().trim().min(2).max(4000),
  rows: z.string().trim().min(2).max(20000),
  note: z.string().trim().max(1000).optional().default(""),
  active: z.boolean().optional().default(true),
});

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET() {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  const { data, error } = await supabaseAdmin.from("packages").select("*").order("created_at", { ascending: true });
  if (error) return serverError("Failed to load packages");
  return NextResponse.json({ ok: true, packages: data ?? [] });
}

export async function POST(request: Request) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  try {
    const payload = await request.json().catch(() => null);
    const parsed = packageSchema.safeParse(payload);
    if (!parsed.success) return NextResponse.json({ error: "Invalid package payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    JSON.parse(parsed.data.columns);
    JSON.parse(parsed.data.rows);
    const row = {
      slug: slugify(parsed.data.title),
      title: parsed.data.title,
      description: parsed.data.description || "",
      columns: JSON.parse(parsed.data.columns),
      rows: JSON.parse(parsed.data.rows),
      note: parsed.data.note || "",
      active: parsed.data.active ?? true,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabaseAdmin.from("packages").insert(row).select("*").single();
    if (error) return serverError("Failed to create package");
    return NextResponse.json({ ok: true, package: data });
  } catch {
    return serverError("Failed to create package. Ensure columns/rows are valid JSON.");
  }
}
