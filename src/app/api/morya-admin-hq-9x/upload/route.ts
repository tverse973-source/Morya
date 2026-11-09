import { NextResponse } from "next/server";
import { requireAdminMutation } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const guard = await requireAdminMutation(request);
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
      return NextResponse.json({ error: "Image must be under 4 MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Attempt Supabase Storage upload if available
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from("uploads")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabaseAdmin.storage.from("uploads").getPublicUrl(uploadData.path);
        if (publicUrlData?.publicUrl) {
          return NextResponse.json({
            ok: true,
            url: publicUrlData.publicUrl,
            mime: file.type,
            size: file.size,
            storage: "supabase",
          });
        }
      }
    } catch {
      // Supabase storage bucket may not be created; fall back to data URL
    }

    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({ ok: true, url: dataUrl, mime: file.type, size: file.size, storage: "inline" });
  } catch {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
