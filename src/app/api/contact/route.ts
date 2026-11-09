import { NextResponse } from "next/server";
import { z } from "zod";

import { sendExternalNotification } from "@/lib/notify";
import { serverError } from "@/lib/api-error";
import { supabaseAdmin } from "@/lib/supabase";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().min(10).max(20).regex(/^[+\d\s()-]{10,20}$/, "Invalid phone number"),
  message: z.string().trim().min(10).max(4000),
  source: z.string().trim().max(80).optional().default("website"),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid contact payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      return NextResponse.json({ error: "Contact service is not configured." }, { status: 503 });
    }

    const row = {
      name: parsed.data.name,
      email: parsed.data.email || null,
      phone: parsed.data.phone,
      message: parsed.data.message,
      source: parsed.data.source || "website",
      status: "new",
    };

    const { data, error } = await supabaseAdmin.from("leads").insert(row).select("*").single();
    if (error) {
      console.error("Contact insert error:", error);
      return serverError("Failed to submit message");
    }

    await supabaseAdmin.from("notifications").insert({
      type: "lead",
      title: "New enquiry received",
      message: `${data.name} sent an enquiry from ${data.phone}.`,
      unread: true,
    });

    try {
      await sendExternalNotification({
        type: "lead",
        title: "New enquiry",
        message: `${data.name} (${data.phone})${data.email ? `\n${data.email}` : ""}\n${(data.message || "").slice(0, 500)}`,
        details: { leadId: data.id },
      });
    } catch (e) {
      console.error("Lead external notification failed:", e);
    }

    return NextResponse.json({ ok: true, lead: { id: data.id } });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
