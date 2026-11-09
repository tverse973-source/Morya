import type { ComponentType, SVGProps } from "react";
import { Bus, Car, Globe, Landmark, MapPin, Plane, Truck } from "lucide-react";
import { SERVICES as FALLBACK_SERVICES, SERVICE_CATEGORIES } from "@/constants/services";

export type ServiceIcon = ComponentType<SVGProps<SVGSVGElement>>;
export type ServiceCategory = "local" | "outstation" | "airport" | "pilgrimage" | "rental" | "corporate";
export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: ServiceCategory;
  fare: string;
  fareUnit: string;
  image: string;
  iconName: string; // serializable for RSC -> client
  includes: string[];
  idealFor: string[];
  relatedIds: string[];
  places?: string[];
  badge?: string;
  badgeColor?: string;
};

export const SERVICE_ICONS: Record<string, ServiceIcon> = { Bus, Car, Globe, Landmark, MapPin, Plane, Truck };
export function getServiceIcon(name: string | undefined): ServiceIcon { return (name && SERVICE_ICONS[name]) || Car; }

function asString(v: unknown, fallback = "") { return typeof v === "string" ? v : v == null ? fallback : String(v); }
function asArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === "string") { try { const p = JSON.parse(v); return Array.isArray(p) ? p.map(String) : []; } catch { return v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : []; } }
  return [];
}
function normalizeService(row: Record<string, unknown>): ServiceItem {
  return {
    id: asString(row.slug ?? row.id),
    title: asString(row.title),
    description: asString(row.description),
    shortDescription: asString(row.short_description ?? row.shortDescription ?? row.description).slice(0, 160),
    category: (asString(row.category, "local") as ServiceCategory),
    fare: asString(row.fare, "On call"),
    fareUnit: asString(row.fare_unit ?? row.fareUnit),
    image: asString(row.image, "/images/services/outstation.jpeg"),
    iconName: asString(row.icon ?? row.iconName, "Car"),
    includes: asArray(row.includes),
    idealFor: asArray(row.ideal_for ?? row.idealFor),
    relatedIds: asArray(row.related_ids ?? row.relatedIds),
    places: asArray(row.places),
    badge: asString(row.badge) || undefined,
    badgeColor: asString(row.badge_color ?? row.badgeColor) || undefined,
  };
}

const ICON_NAMES = new Map<ServiceIcon, string>([[Bus,"Bus"],[Car,"Car"],[Globe,"Globe"],[Landmark,"Landmark"],[MapPin,"MapPin"],[Plane,"Plane"],[Truck,"Truck"]]);
function fallbackToSerializable(s: (typeof FALLBACK_SERVICES)[number]): ServiceItem {
  return {
    id: s.id, title: s.title, description: s.description, shortDescription: s.shortDescription, category: s.category,
    fare: s.fare, fareUnit: s.fareUnit, image: s.image, iconName: ICON_NAMES.get(s.icon) ?? "Car",
    includes: s.includes ?? [], idealFor: s.idealFor ?? [], relatedIds: s.relatedIds ?? [], places: s.places,
    badge: s.badge, badgeColor: s.badgeColor,
  };
}
const FALLBACK_SERIALIZED = FALLBACK_SERVICES.map(fallbackToSerializable);

export { SERVICE_CATEGORIES };
export { normalizeService };

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
    if (!url || !key) return FALLBACK_SERIALIZED;
    const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await client.from("services").select("*").eq("active", true).order("sort_order", { ascending: true }).order("created_at", { ascending: true });
    if (error || !data?.length) return FALLBACK_SERIALIZED;
    return data.map((r) => normalizeService(r as Record<string, unknown>)).filter((s) => s.title);
  } catch {
    return FALLBACK_SERIALIZED;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const services = await getServices();
  return services.find((s) => s.id === slug) ?? FALLBACK_SERIALIZED.find((s) => s.id === slug) ?? null;
}

