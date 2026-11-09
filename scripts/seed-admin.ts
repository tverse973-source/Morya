import { supabase } from "@/lib/supabase";

async function seedAdmin() {
  const email = (process.env.ADMIN_SEED_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD || "";
  const name = process.env.ADMIN_SEED_NAME || "Admin";

  if (!email || password.length < 12) {
    console.error("Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD (12+ chars) before running this script.");
    process.exit(1);
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    console.error("Supabase environment variables are required.");
    process.exit(1);
  }

  // Use API route/admin flow in production; this script assumes Supabase table allows upsert with configured key/policies.
  const bcrypt = await import("bcryptjs");
  const passwordHash = await bcrypt.hash(password, 12);
  const { error } = await supabase.from("admins").upsert({ email, name, role: "admin", password_hash: passwordHash }, { onConflict: "email" });
  if (error) {
    console.error("Admin seed failed:", error.message);
    process.exit(1);
  }
  console.log("Admin seeded successfully");
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
