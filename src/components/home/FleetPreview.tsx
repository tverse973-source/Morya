"use client";

import { useState } from "react";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Vehicle } from "@/constants/fleet";

const FLEET_TYPES = [
  { key: "all", label: "All Vehicles" },
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV/MUV" },
  { key: "tempo", label: "Tempo" },
] as const;

type FleetTabKey = (typeof FLEET_TYPES)[number]["key"];

export function FleetPreview({ vehicles }: { vehicles: Vehicle[] }) {
  const [tab, setTab] = useState<FleetTabKey>("all");

  const filtered =
    tab === "all"
      ? vehicles
      : tab === "suv"
        ? vehicles.filter((v) => v.type === "suv" || v.type === "muv")
        : vehicles.filter((v) => v.type === tab);

  return (
    <section className="relative overflow-hidden border-t border-[#E2E8F0] bg-[#F8FAFC] py-12 md:py-16">
      <div className="container-page relative z-10">
        <SectionTitle title="Our Fleet" subtitle="Well-maintained vehicles for every group size and budget." />
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {FLEET_TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={`min-h-11 rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-brand-blue text-white shadow-[0_0_20px_rgba(30,79,216,0.35)]"
                  : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F1F5F9]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        {filtered.length === 0 && <div className="py-20 text-center text-[#64748B]">No vehicles available in this category.</div>}
      </div>
    </section>
  );
}
