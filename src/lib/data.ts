import { FLEET as FALLBACK_FLEET } from "@/constants/fleet";
import { PACKAGES as FALLBACK_PACKAGES } from "@/constants/packages";
import { POPULAR_ROUTES as FALLBACK_ROUTES } from "@/constants/routes";
import { supabaseAdmin } from "@/lib/supabase";

type FleetVehicle = (typeof FALLBACK_FLEET)[number];

const ROUTE_IMAGES: Record<string, string> = {
  shirdi: "/images/services/pune-to-shirdi.jpeg",
  mahabaleshwar: "/images/services/mahabaleshwar.jpeg",
  lonavala: "/images/services/pune-to-lonavala.jpeg",
  nashik: "/images/services/nashik.jpeg",
  goa: "/images/services/goa.jpeg",
  "pune-airport": "/images/services/pune-airport-transfer.jpeg",
};

function asString(v: unknown, fallback = "") { return typeof v === "string" ? v : v == null ? fallback : String(v); }
function asNumber(v: unknown, fallback = 0) { const n = typeof v === "number" ? v : Number(v); return Number.isFinite(n) ? n : fallback; }
function asBool(v: unknown, fallback = false) { return typeof v === "boolean" ? v : fallback; }
function asStringArray(v: unknown) {
  if (Array.isArray(v)) return v.map((x) => String(x));
  if (typeof v === "string" && v.trim()) return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function normalizeAssetPath(image: string, fallback: string) {
  if (!image) return fallback;
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/images/")) return image;
  const legacy: Record<string, string> = {
    "/Swift_Dzire.png": "/images/fleet/maruti-swift-dzire.png",
    "/Toyota_Etios.png": "/images/fleet/toyota-etios.png",
    "/Suzuki.png": "/images/fleet/maruti-suzuki-sedan.png",
    "/Innova.png": "/images/fleet/toyota-innova.png",
    "/Crysta.png": "/images/fleet/toyota-innova-crysta.png",
    "/kia.png": "/images/fleet/kia-carens.png",
    "/Traveller_13_Seater.png": "/images/fleet/tempo-traveller-13-seater.png",
    "/Traveller_17-Seater.png": "/images/fleet/tempo-traveller-17-seater.png",
    "/aboutus.png": "/images/brand/about-story.png",
    "/aboutusnext.png": "/images/brand/about-journey.png",
    "/aboutcover.jpeg": "/images/brand/about-cover.jpg",
    "/payment.jpeg": "/images/payments/upi-payment-qr.jpg",
    "/logo.jpeg": "/images/brand/morya-travels-logo.png",
    "/logo.png": "/images/brand/morya-travels-logo.png",
  };
  if (legacy[image]) return legacy[image];
  if (image.startsWith("/Services/") || image.startsWith("/services/")) {
    const name = image.split("/").pop() ?? "";
    return `/images/services/${name.toLowerCase().replace(/_/g, "-")}`;
  }
  return image;
}

export async function getVehicles() {
  try {
    const { data, error } = await supabaseAdmin.from("vehicles").select("*").order("created_at", { ascending: true });
    if (error || !data?.length) return FALLBACK_FLEET;
    return data.map((v) => ({
      id: asString(v.slug ?? v.id),
      name: asString(v.name),
      type: asString(v.type, "sedan") as FleetVehicle["type"],
      seats: asNumber(v.seats, 4),
      luggage: asNumber(v.luggage, 2),
      ac: asBool(v.ac, true),
      ratePerKm: asNumber(v.ratePerKm ?? v.rate_per_km, 0),
      minKm: asNumber(v.minKm ?? v.min_km, 0),
      features: asStringArray(v.features),
      extraFeatures: asStringArray(v.extraFeatures ?? v.extra_features),
      badge: asString(v.badge),
      badgeColor: asString(v.badgeColor ?? v.badge_color, "#3B82F6"),
      image: normalizeAssetPath(asString(v.image), "/images/fleet/toyota-innova.png"),
      packageRate: v.packageRate != null || v.package_rate != null ? asNumber(v.packageRate ?? v.package_rate) : undefined,
    }));
  } catch {
    return FALLBACK_FLEET;
  }
}

export async function getRoutes() {
  try {
    const { data, error } = await supabaseAdmin.from("routes").select("*").order("created_at", { ascending: true });
    if (error || !data?.length) return FALLBACK_ROUTES;
    return data.map((r) => {
      const id = asString(r.slug ?? r.id);
      return {
        id,
        name: asString(r.name),
        distance: asString(r.distance),
        duration: asString(r.duration),
        startingFrom: asString(r.startingFrom ?? r.starting_from),
        image: ROUTE_IMAGES[id] ?? normalizeAssetPath(asString(r.image), "/images/services/outstation.jpeg"),
      };
    });
  } catch {
    return FALLBACK_ROUTES;
  }
}

export async function getPackages() {
  try {
    const { data, error } = await supabaseAdmin.from("packages").select("*").order("created_at", { ascending: true });
    if (error || !data?.length) return FALLBACK_PACKAGES;
    return data.map((p) => {
      let columns: string[] = [];
      let rows: string[][] = [];
      try { columns = typeof p.columns === "string" ? JSON.parse(p.columns) : Array.isArray(p.columns) ? p.columns : []; } catch {}
      try { rows = typeof p.rows === "string" ? JSON.parse(p.rows) : Array.isArray(p.rows) ? p.rows : []; } catch {}
      return { id: asString(p.slug ?? p.id), title: asString(p.title), columns, rows, note: asString(p.note) || undefined };
    });
  } catch {
    return FALLBACK_PACKAGES;
  }
}
