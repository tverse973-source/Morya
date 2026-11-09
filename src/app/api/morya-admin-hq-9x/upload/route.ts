import { NextResponse } from "next/server";
import { requireAdminMutation } from "@/lib/auth";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP or GIF images are allowed" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image must be under 2 MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({ ok: true, url: dataUrl, mime: file.type, size: file.size });
  } catch {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
