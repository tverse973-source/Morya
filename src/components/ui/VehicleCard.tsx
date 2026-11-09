"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Vehicle } from "@/constants/fleet";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Users, Briefcase, Snowflake, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VehicleCardProps {
  vehicle: Vehicle;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function VehicleCard({ vehicle, selected = false, onSelect }: VehicleCardProps) {
  const extraFeatures = (vehicle.extraFeatures ?? []).map((f) => String(f)).filter(Boolean);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCarClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const carVariants: Variants = {
    idle: { x: 0, opacity: 1, scale: 1, filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.1))" },
    driving: {
      x: [0, -5, 5, -5, 5, 0, 800, -800, 0],
      opacity: [1, 1, 1, 1, 1, 1, 0, 0, 1],
      scale: [1, 1.05, 1.05, 1.05, 1.05, 1, 0.9, 0.9, 1],
      transition: {
        duration: 2,
        times: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.6, 0.61, 1],
        ease: "easeInOut"
      }
    }
  };

  const price = vehicle.type === 'tempo'
    ? (vehicle.packageRate ? Math.floor(vehicle.packageRate/300) : vehicle.ratePerKm)
    : vehicle.ratePerKm;
  const capacityFeature = extraFeatures.find((f) => f.toLowerCase().includes("passenger capacity"));
  const capacityText = capacityFeature
    ? capacityFeature.replace(/ passenger capacity.*/i, "")
    : `${Math.max(0, vehicle.seats - 1)} + 1`;

  return (
    <GlassCard
      padded={false}
      className={cn(
        "group relative flex flex-col h-full rounded-3xl border border-[#E2E8F0] bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden",
        selected && "ring-2 ring-brand-blue border-transparent shadow-[0_20px_50px_rgba(30,79,216,0.15)]"
      )}
      onClick={() => onSelect?.(vehicle.id)}
    >
      {/* Car Image Area */}
      <div 
        className="relative aspect-[4/3] w-full flex items-center justify-center p-6 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleCarClick();
        }}
      >
        <motion.div
          variants={carVariants}
          animate={isAnimating ? "driving" : "idle"}
          className="relative w-full h-full z-10"
        >
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Badge - Toned down */}
        <div 
          className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm bg-brand-blue"
        >
          {vehicle.badge}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-8 pb-8 pt-2 flex-1 flex flex-col">
        {/* Header: Name & Price */}
        <div className="flex items-start justify-between mb-6">
          <div className="text-left">
            <Link
              href={`/fleet/${vehicle.id}`}
              className="text-2xl font-display font-bold text-[#0F172A] mb-1 block transition-colors hover:text-brand-blue"
            >
              {vehicle.name}
            </Link>
            <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider">
              {vehicle.type} Class
            </span>
          </div>
          <div className="text-right">
            <div className="text-brand-blue font-display font-black text-2xl">
              ₹{price}
            </div>
            <div className="text-[10px] font-mono text-[#64748B] uppercase">
              Per KM
            </div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase">
              {vehicle.minKm} km/day · Toll/Parking extra
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-[#F1F5F9]">
          <div className="flex flex-col items-center gap-1.5">
            <Users className="w-4 h-4 text-brand-blue" />
            <span className="text-[11px] font-medium text-[#475569] text-center">{capacityText} Seats</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 border-x border-[#F1F5F9]">
            <Briefcase className="w-4 h-4 text-brand-blue" />
            <span className="text-[11px] font-medium text-[#475569]">{vehicle.luggage} Bags</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Snowflake className="w-4 h-4 text-brand-blue" />
            <span className="text-[11px] font-medium text-[#475569]">{vehicle.ac ? "AC / Non-AC" : "Standard"}</span>
          </div>
        </div>

        {/* Feature */}
        <div className="mb-8 flex min-h-12 items-center justify-center rounded-xl bg-bg-card border border-border-light px-4 py-3">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] text-center">
            {extraFeatures[0] ?? vehicle.name}
          </span>
        </div>

        {/* Action Row */}
        <div className="mt-auto flex items-center gap-3">
          <AnimatedButton
            variant="blue"
            size="md"
            href="/book"
            className="flex-1 shadow-md hover:shadow-lg text-[10px] font-black uppercase tracking-[0.2em]"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(vehicle.id);
            }}
          >
            {selected ? "Selected" : "Book Now"}
          </AnimatedButton>
          
          <button 
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-card text-text-muted border border-border-light transition-colors hover:bg-brand-blue hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleCarClick();
            }}
            title="Drive car"
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 h-1 bg-brand-blue w-0 transition-all duration-500 group-hover:w-full" />
    </GlassCard>
  );
}
