import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const email = parsed.data.email.trim().toLowerCase();
  const { data: admin, error: findError } = await supabaseAdmin
    .from("admins")
    .select("id, email")
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

  // In production, email this token to the admin. For local/dev it is returned so the flow can be tested.
  return NextResponse.json({
    ok: true,
    message: "Reset token generated.",
    ...(process.env.NODE_ENV === "development" ? { resetToken: token, resetTo: admin.id } : {}),
  });
}
