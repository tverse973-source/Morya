import { supabase } from "@/lib/supabase";

export async function createNotification({
  type,
  title,
  message,
  bookingId,
  adminId,
}: {
  type: string;
  title: string;
  message: string;
  bookingId?: string;
  adminId?: string;
}) {
  try {
    return await supabase.from("notifications").insert({
      type,
      title,
      message,
      booking_id: bookingId ?? null,
      admin_id: adminId ?? null,
      unread: true,
    });
  } catch {
    return null;
  }
}

export async function getRecentNotifications(limit = 10) {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*, bookings(*), admins(*)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
