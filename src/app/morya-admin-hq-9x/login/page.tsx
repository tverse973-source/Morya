import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import LoginForm from "./_form";

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/morya-admin-hq-9x");
  return <LoginForm />;
}
