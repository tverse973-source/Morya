import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import ResetForm from "./_reset-form";

export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/morya-admin-hq-9x");
  const { token } = await params;
  return <ResetForm token={token} />;
}
