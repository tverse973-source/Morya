import { NextResponse } from "next/server";
import { z } from "zod";

import { sendExternalNotification } from "@/lib/notify";
import { serverError } from "@/lib/api-error";
import { supabaseAdmin } from "@/lib/supabase";

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().optional().or(z.literal("")),
  pickup: z.string().trim().min(2).max(300),
  dropoff: z.string().trim().min(2).max(300),
  date: z.string().min(1),
  tripType: z.string().trim().min(1).max(80).default("One way"),
  passengers: z.string().trim().max(120).optional().default(""),
  vehicleId: z.string().trim().max(120).optional().default(""),
  vehicleName: z.string().trim().max(120).optional().default(""),
  details: z.string().trim().max(4000).optional().default(""),
  notes: z.string().trim().max(4000).optional().default(""),
  source: z.string().trim().max(80).optional().default("admin"),
  status: z.enum(["pending", "confirmed", "cancelled", "completed", "closed"]).optional().default("pending"),
  amount: z.coerce.number().finite().optional().nullable(),
});

function safeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from("bookings").select("*").order("created_at", { ascending: false });
    if (error) return serverError("Failed to load bookings");
    return NextResponse.json({ ok: true, bookings: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const parsed = bookingSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking payload", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const travelDate = safeDate(parsed.data.date);
    if (!travelDate) return NextResponse.json({ error: "Invalid travel date" }, { status: 400 });

    const bookingNumber = `MRY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const noteParts = [parsed.data.details, parsed.data.notes].filter(Boolean);

    const row = {
      booking_number: bookingNumber,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      pickup: parsed.data.pickup,
      dropoff: parsed.data.dropoff,
      travel_date: travelDate,
      trip_type: parsed.data.tripType,
      passengers: parsed.data.passengers || null,
      vehicle_id: parsed.data.vehicleId || null,
      vehicle_name: parsed.data.vehicleName || null,
      notes: noteParts.join(" | ") || null,
      source: parsed.data.source || "website",
      status: parsed.data.status || "pending",
      amount: parsed.data.amount ?? null,
    };

    const { data: booking, error: bookingError } = await supabaseAdmin.from("bookings").insert(row).select("*").single();

    if (bookingError || !booking) {
      return serverError("Failed to create booking");
    }

    await supabaseAdmin.from("notifications").insert({
      type: "booking",
      title: "Booking created",
      message: `${booking.name} — ${booking.pickup} to ${booking.dropoff}.`,
      booking_id: booking.id,
      unread: true,
    });

    try {
      const travelDate = booking.travel_date
        ? new Date(String(booking.travel_date)).toISOString().slice(0, 10)
        : "-";
      const lines = [
        "Hi Morya Travels, a new booking request was received.",
        "",
        `Booking ref: ${booking.booking_number || booking.id || "-"}`,
        `Pickup: ${booking.pickup || "-"}`,
        `Drop-off: ${booking.dropoff || "-"}`,
        `Date: ${travelDate}`,
        `Trip type: ${booking.trip_type || "-"}`,
        `Passengers: ${booking.passengers || "-"}`,
        `Vehicle: ${booking.vehicle_name || "-"}`,
        `Name: ${booking.name || "-"}`,
        `Phone: ${booking.phone || "-"}`,
      ];
      if (booking.email) lines.push(`Email: ${booking.email}`);
      if (booking.amount != null && booking.amount !== "") lines.push(`Amount: ₹${booking.amount}`);
      if (booking.source) lines.push(`Source: ${booking.source}`);
      if (booking.notes) lines.push(`Notes: ${String(booking.notes).slice(0, 500)}`);
      lines.push("", "Please confirm availability and fare.");
      await sendExternalNotification({
        type: "booking",
        title: `New booking${booking.booking_number ? ` ${booking.booking_number}` : ""}`,
        message: lines.join("\n"),
        details: { bookingId: booking.id, bookingNumber: booking.booking_number },
      });
    } catch (e) {
      console.error("Booking external notification failed:", e);
    }

    return NextResponse.json({ ok: true, booking });
  } catch (error) {
    console.error("Booking route error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
