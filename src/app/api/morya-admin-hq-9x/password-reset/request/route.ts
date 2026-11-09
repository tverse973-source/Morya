import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { sendExternalNotification } from "@/lib/notify";
import { SITE } from "@/constants/site";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const email = parsed.data.email.trim().toLowerCase();
  const { data: admin, error: findError } = await supabaseAdmin
    .from("admins")
    .select("id, email, name")
    .eq("email", email)
    .maybeSingle();
  if (findError || !admin) {
    // Don't reveal whether email exists
    return NextResponse.json({ ok: true, message: "If an account exists, a reset token has been generated." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

  const { error: updateError } = await supabaseAdmin
    .from("admins")
    .update({ reset_token: token, reset_token_expires: expires })
    .eq("id", admin.id);

  if (updateError) return NextResponse.json({ error: "Failed to generate reset token" }, { status: 500 });

  const resetUrl = `${SITE.url}/morya-admin-hq-9x/reset-password/${token}`;
  try {
    await sendExternalNotification({
      type: "booking", // high priority
      title: "Admin Password Reset Requested",
      message: `Password reset requested for admin ${admin.name || admin.email}.\nReset link (valid 1 hour):\n${resetUrl}`,
      details: { adminId: admin.id, email: admin.email },
    });
  } catch (err) {
    console.error("Failed to deliver admin password reset notification:", err);
  }

  return NextResponse.json({
    ok: true,
    message: "If an account exists, a reset instruction has been sent to configured channels.",
    ...(process.env.NODE_ENV === "development" ? { resetToken: token, resetUrl } : {}),
  });
}
