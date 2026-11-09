import type { ComponentType, SVGProps } from "react";
import { Car, Bus } from "lucide-react";

export type VehicleType = "sedan" | "suv" | "muv" | "tempo" | "hatchback";

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  seats: number;
  luggage: number;
  ac: boolean;
  ratePerKm: number;
  minKm: number;
  features: string[];
  extraFeatures: string[];
  badge?: string;
  badgeColor?: string;
  image: string;
  packageRate?: number;
}

export const FLEET: Vehicle[] = [
  {
    id: "swift-dzire",
    name: "Swift Dzire",
    type: "sedan",
    seats: 5,
    luggage: 2,
    ac: true,
    ratePerKm: 12,
    minKm: 300,
    features: ["AC / Non-AC", "Toll & parking extra", "300 km/day running", "Verified driver", "Sanitised"],
    extraFeatures: [
      "4 + 1 passenger capacity",
      "₹12/km",
      "Per day running: 300 km",
      "Music system",
      "Spacious boot for 2 bags",
    ],
    badge: "Economy",
    badgeColor: "var(--color-brand-blue)",
    image: "/images/fleet/maruti-swift-dzire.png",
  },
  {
    id: "toyota-etios",
    name: "Toyota Etios",
    type: "sedan",
    seats: 5,
    luggage: 2,
    ac: true,
    ratePerKm: 13,
    minKm: 300,
    features: ["AC / Non-AC", "Toll & parking extra", "300 km/day running", "Verified driver", "Sanitised"],
    extraFeatures: [
      "4 + 1 passenger capacity",
      "₹12/km (Non-AC) | ₹13/km (AC)",
      "Per day running: 300 km",
      "Extra legroom",
      "Smooth highway ride",
    ],
    badge: "Comfortable",
    badgeColor: "#3B82F6",
    image: "/images/fleet/toyota-etios.png",
  },
  {
    id: "suzuki-ertiga",
    name: "Suzuki Ertiga",
    type: "muv",
    seats: 7,
    luggage: 3,
    ac: true,
    ratePerKm: 15,
    minKm: 300,
    features: ["AC / Non-AC", "Toll & parking extra", "300 km/day running", "Verified driver", "Sanitised"],
    extraFeatures: [
      "6 + 1 passenger capacity",
      "₹14/km (Non-AC) | ₹15/km (AC)",
      "Per day running: 300 km",
      "Spacious 3-row seating",
      "Ideal for family trips",
    ],
    badge: "Family MUV",
    badgeColor: "#0EA5E9",
    image: "/images/fleet/maruti-suzuki-sedan.png",
  },
  {
    id: "innova",
    name: "Toyota Innova",
    type: "suv",
    seats: 8,
    luggage: 4,
    ac: true,
    ratePerKm: 20,
    minKm: 300,
    features: ["AC / Non-AC", "Toll & parking extra", "300 km/day running", "Verified driver", "Sanitised"],
    extraFeatures: [
      "6 + 1, 7 + 1 passenger capacity",
      "₹19/km (Non-AC) | ₹20/km (AC)",
      "Per day running: 300 km",
      "Spacious cabin",
      "Ideal for long trips",
    ],
    badge: "Most Popular",
    badgeColor: "#3B82F6",
    image: "/images/fleet/toyota-innova.png",
  },
  {
    id: "kia-carens",
    name: "Kia Carens",
    type: "muv",
    seats: 8,
    luggage: 4,
    ac: true,
    ratePerKm: 17,
    minKm: 300,
    features: ["AC / Non-AC", "Toll & parking extra", "300 km/day running", "Verified driver", "Sanitised"],
    extraFeatures: [
      "6 + 1, 7 + 1 passenger capacity",
      "₹16/km (Non-AC) | ₹17/km (AC)",
      "Per day running: 300 km",
      "Modern comfort",
      "Spacious 3-row seating",
    ],
    badge: "Modern MUV",
    badgeColor: "#06B6D4",
    image: "/images/fleet/kia-carens.png",
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    type: "suv",
    seats: 5,
    luggage: 4,
    ac: true,
    ratePerKm: 20,
    minKm: 300,
    features: ["AC / Non-AC", "Toll & parking extra", "300 km/day running", "Verified driver", "Sanitised"],
    extraFeatures: [
      "4 + 1 passenger capacity",
      "₹19/km (Non-AC) | ₹20/km (AC)",
      "Per day running: 300 km",
      "Premium comfort",
      "Smooth long-distance ride",
    ],
    badge: "Premium",
    badgeColor: "#8B5CF6",
    image: "/images/fleet/toyota-innova-crysta.png",
  },
  {
    id: "mini-bus",
    name: "Mini Bus",
    type: "tempo",
    seats: 7,
    luggage: 6,
    ac: true,
    ratePerKm: 28,
    minKm: 300,
    features: ["AC / Non-AC", "Toll & parking extra", "300 km/day running", "Verified driver", "Sanitised"],
    extraFeatures: [
      "6 + 1 passenger capacity",
      "₹24/km (Non-AC) | ₹28/km (AC)",
      "Per day running: 300 km",
      "Group travel",
      "Experienced driver",
    ],
    badge: "Group",
    badgeColor: "#6366F1",
    image: "/images/fleet/tempo-traveller-13-seater.png",
    packageRate: 8400,
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    type: "tempo",
    seats: 8,
    luggage: 8,
    ac: true,
    ratePerKm: 28,
    minKm: 300,
    features: ["AC / Non-AC", "Toll & parking extra", "300 km/day running", "Verified driver", "Sanitised"],
    extraFeatures: [
      "6 + 1, 7 + 1 passenger capacity",
      "₹25/km (Non-AC) | ₹28/km (AC)",
      "Per day running: 300 km",
      "Pushback seating comfort",
      "Group/outstation travel",
    ],
    badge: "Tempo",
    badgeColor: "var(--color-accent-gold)",
    image: "/images/fleet/tempo-traveller-17-seater.png",
    packageRate: 8400,
  },
];

export const VEHICLE_ICONS: Record<VehicleType, ComponentType<SVGProps<SVGSVGElement>>> = {
  sedan: Car,
  suv: Car,
  muv: Car,
  tempo: Bus,
  hatchback: Car,
};

export const SEAT_FILTERS = [
  { label: "All", min: 0, max: 99 },
  { label: "4 seats", min: 4, max: 4 },
  { label: "6–7 seats", min: 6, max: 7 },
  { label: "13+ seats", min: 13, max: 99 },
];

export const VEHICLE_TYPE_FILTERS = [
  { label: "All", value: "all" },
  { label: "Sedan", value: "sedan" },
  { label: "SUV / MUV", value: "suv" },
  { label: "Tempo Traveller", value: "tempo" },
];
