const requiredInProduction = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_SESSION_SECRET",
] as const;

export function getMissingProductionEnv() {
  if (process.env.NODE_ENV !== "production") return [] as string[];
  return requiredInProduction.filter(
    (key) => !process.env[key] || (key === "ADMIN_SESSION_SECRET" && String(process.env[key]).length < 32),
  );
}
