import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import ForgotForm from "./_forgot-form";

export default async function ForgotPasswordPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/morya-admin-hq-9x");
  return <ForgotForm />;
}
