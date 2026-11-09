import { NextResponse } from "next/server";
import { z } from "zod";
import { signInAdmin } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

  const admin = await signInAdmin(parsed.data.email, parsed.data.password);
  if (!admin) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

  return NextResponse.json({ ok: true, admin });
}
