import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  "";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY ??
  process.env.SUPABASE_SERVICE_KEY ??
  "";

function missingClient(message: string): SupabaseClient {
  return new Proxy({} as SupabaseClient, {
    get() {
      throw new Error(message);
    },
  });
}

const hasPublicConfig = Boolean(supabaseUrl && supabasePublishableKey);
const missingPublicConfigMessage =
  "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in vighnaharta-travels/.env.local, then restart the dev server.";

// Public/browser-safe client (use with RLS-enabled public tables as appropriate).
export const supabase: SupabaseClient = hasPublicConfig
  ? createClient(supabaseUrl, supabasePublishableKey)
  : missingClient(missingPublicConfigMessage);

// Server-only privileged client. Falls back to publishable client if service role key is not set.
export const supabaseAdmin: SupabaseClient = supabaseServiceKey
  ? supabaseUrl
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : missingClient(missingPublicConfigMessage)
  : supabase;

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          booking_number: string;
          name: string;
          phone: string;
          email: string | null;
          pickup: string;
          dropoff: string;
          travel_date: string;
          trip_type: string;
          passengers: string | null;
          vehicle_id: string | null;
          vehicle_name: string | null;
          status: string;
          notes: string | null;
          source: string | null;
          amount: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_number: string;
          name: string;
          phone: string;
          email?: string | null;
          pickup: string;
          dropoff: string;
          travel_date: string;
          trip_type: string;
          passengers?: string | null;
          vehicle_id?: string | null;
          vehicle_name?: string | null;
          status?: string;
          notes?: string | null;
          source?: string | null;
          amount?: number | null;
        };
        Update: {
          id?: string;
          booking_number?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          pickup?: string;
          dropoff?: string;
          travel_date?: string;
          trip_type?: string;
          passengers?: string | null;
          vehicle_id?: string | null;
          vehicle_name?: string | null;
          status?: string;
          notes?: string | null;
          source?: string | null;
          amount?: number | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          type: string;
          title: string;
          message: string;
          unread: boolean;
          booking_id: string | null;
          admin_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          title: string;
          message: string;
          unread?: boolean;
          booking_id?: string | null;
          admin_id?: string | null;
        };
        Update: {
          id?: string;
          type?: string;
          title?: string;
          message?: string;
          unread?: boolean;
          booking_id?: string | null;
          admin_id?: string | null;
        };
      };
      admins: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: string;
        };
      };
    };
  };
};
