"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, IndianRupee } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { POPULAR_ROUTES } from "@/constants/routes";
import type { Vehicle } from "@/constants/fleet";

const CUSTOM = "custom";

function parseKm(value: string) {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

const inputClass =
  "w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#0F172A] outline-none transition-colors focus:border-brand-blue";

export function FareEstimator({ vehicles = [] }: { vehicles?: Vehicle[] }) {
  const router = useRouter();
  const vehicleList = vehicles;
  const defaultRoute = POPULAR_ROUTES[0];
  const fallbackVehicle: Vehicle = {
    id: "swift-dzire",
    name: "Swift Dzire",
    type: "sedan",
    seats: 4,
    luggage: 2,
    ac: true,
    ratePerKm: 12,
    minKm: 300,
    features: ["AC"],
    extraFeatures: ["Comfort"],
badge: "Budget Friendly",
    badgeColor: "var(--color-brand-blue)",
    image: "/images/fleet/maruti-swift-dzire.png",
  };

  const [routeId, setRouteId] = useState(defaultRoute?.id ?? CUSTOM);
  const [customKm, setCustomKm] = useState("");
  const [vehicleId, setVehicleId] = useState(vehicleList[0]?.id ?? fallbackVehicle.id);

  const route = POPULAR_ROUTES.find((r) => r.id === routeId);
  const vehicle = vehicleList.find((v) => v.id === vehicleId) ?? vehicleList[0] ?? fallbackVehicle;
  const distance = routeId === CUSTOM ? Number(customKm) || 0 : parseKm(route?.distance ?? "");

  const { total, breakdown } = useMemo(() => {
    if (vehicle.type === "tempo") {
      return { total: vehicle.packageRate ?? 0, breakdown: "Flat package rate" };
    }
    const chargeableKm = Math.max(distance, vehicle.minKm || 0);
    return { total: chargeableKm * vehicle.ratePerKm, breakdown: `${chargeableKm} km × ₹${vehicle.ratePerKm}/km` };
  }, [distance, vehicle]);

  const canEstimate = vehicle.type === "tempo" || distance > 0;

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue"><Calculator className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-xl font-bold text-[#0F172A]">Estimate your fare</h2>
          <p className="text-sm text-[#64748B]">Pick a route and vehicle for an instant estimate.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fare-route" className="text-xs font-medium text-[#64748B]">Route</label>
          <select id="fare-route" value={routeId} onChange={(e) => setRouteId(e.target.value)} className={inputClass}>
            {POPULAR_ROUTES.map((r) => <option key={r.id} value={r.id}>Pune → {r.name} ({r.distance})</option>)}
            <option value={CUSTOM}>Other (enter distance)</option>
          </select>
        </div>

        {routeId === CUSTOM && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fare-km" className="text-xs font-medium text-[#64748B]">Distance (km)</label>
            <input id="fare-km" type="number" min={0} value={customKm} onChange={(e) => setCustomKm(e.target.value)} placeholder="e.g. 250" className={inputClass} />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="fare-vehicle" className="text-xs font-medium text-[#64748B]">Vehicle</label>
          <select id="fare-vehicle" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className={inputClass}>
            {(vehicleList.length ? vehicleList : [fallbackVehicle]).map((v) => <option key={v.id} value={v.id}>{v.name} · {v.seats} seats</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#64748B]">Estimated fare</p>
          {canEstimate ? (
            <>
              <p className="flex items-center font-display text-3xl font-bold text-[#0F172A]"><IndianRupee className="h-6 w-6" />{total.toLocaleString("en-IN")}</p>
              <p className="text-xs text-[#64748B]">{breakdown} · toll & parking extra</p>
            </>
          ) : <p className="text-sm text-[#64748B]">Enter a distance to see the estimate.</p>}
        </div>
        <AnimatedButton variant="gold" size="md" className="w-full sm:w-auto" disabled={!canEstimate} onClick={() => {
          const params = new URLSearchParams({ pickup: "Pune", destination: route ? route.name : "", vehicle: vehicle.id });
          router.push(`/book?${params.toString()}`);
        }}>Book this trip</AnimatedButton>
      </div>
    </div>
  );
}
