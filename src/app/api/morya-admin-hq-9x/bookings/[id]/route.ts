import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminMutation } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const updateSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
  notes: z.string().max(2000).optional().nullable(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Booking id is required" }, { status: 400 });

    const payload = await request.json().catch(() => null);
    const parsed = updateSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid update payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (parsed.data.status !== undefined) update.status = parsed.data.status;
    if (parsed.data.notes !== undefined) update.notes = parsed.data.notes;

    const { data, error } = await supabase.from("bookings").update(update).eq("id", id).select("*").maybeSingle();
    if (error) return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    return NextResponse.json({ ok: true, booking: data });
  } catch {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
