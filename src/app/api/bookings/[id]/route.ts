import { NextResponse } from "next/server";
import { z } from "zod";

import { serverError } from "@/lib/api-error";
import { supabaseAdmin } from "@/lib/supabase";

const updateSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().min(5).max(30).optional(),
  email: z.string().trim().email().optional().nullable().or(z.literal("")),
  pickup: z.string().trim().min(2).max(300).optional(),
  dropoff: z.string().trim().min(2).max(300).optional(),
  travel_date: z.string().optional(),
  trip_type: z.string().trim().max(80).optional().nullable(),
  passengers: z.string().trim().max(120).optional().nullable(),
  vehicle_id: z.string().trim().max(120).optional().nullable(),
  vehicle_name: z.string().trim().max(120).optional().nullable(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed", "closed"]).optional(),
  notes: z.string().max(4000).optional().nullable(),
  source: z.string().trim().max(80).optional().nullable(),
  amount: z.coerce.number().finite().optional().nullable(),
});

function safeDate(value: string | undefined) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Booking id is required" }, { status: 400 });
    const { data, error } = await supabaseAdmin.from("bookings").select("*").eq("id", id).maybeSingle();
    if (error) return serverError("Failed to load booking");
    if (!data) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    return NextResponse.json({ ok: true, booking: data });
  } catch {
    return NextResponse.json({ error: "Failed to load booking" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Booking id is required" }, { status: 400 });
    const payload = await request.json().catch(() => null);
    const parsed = updateSchema.safeParse(payload);
    if (!parsed.success) return NextResponse.json({ error: "Invalid update payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });

    const travelDate = safeDate(parsed.data.travel_date);
    if (travelDate === null) return NextResponse.json({ error: "Invalid travel date" }, { status: 400 });

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    for (const [k, v] of Object.entries(parsed.data)) {
      if (v === undefined) continue;
      if (k === "travel_date") update.travel_date = travelDate;
      else if (k === "email" && v === "") update.email = null;
      else update[k] = v;
    }

    const { data, error } = await supabaseAdmin.from("bookings").update(update).eq("id", id).select("*").maybeSingle();
    if (error) return serverError("Failed to update booking");
    if (!data) {
      return NextResponse.json({ error: "Booking not found or no changes applied." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, booking: data });
  } catch {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Booking id is required" }, { status: 400 });
    const { error, count } = await supabaseAdmin.from("bookings").delete({ count: "exact" }).eq("id", id);
    if (error) return serverError("Failed to delete booking");
    if (!count) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
