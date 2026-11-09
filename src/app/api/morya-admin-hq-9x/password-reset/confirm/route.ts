import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(12),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid reset request" }, { status: 400 });

  const { token, password } = parsed.data;
  const now = new Date().toISOString();

  const { data: admin, error } = await supabaseAdmin
    .from("admins")
    .select("id, reset_token, reset_token_expires")
    .eq("reset_token", token)
    .maybeSingle();
  if (error || !admin) return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });

  const expires = admin.reset_token_expires as string | undefined;
  if (!expires || new Date(expires) < new Date(now)) {
    return NextResponse.json({ error: "Reset token has expired" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 12);

  const { error: updateError } = await supabaseAdmin
    .from("admins")
    .update({ password_hash: hash, reset_token: null, reset_token_expires: null })
    .eq("id", admin.id);

  if (updateError) return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });

  return NextResponse.json({ ok: true, message: "Password reset successfully" });
}
