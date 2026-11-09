"use client";

import Link from "next/link";
import { Route } from "@/constants/routes";
import { GlassCard } from "@/components/ui/GlassCard";
import { ZoomableImage } from "@/components/ui/ZoomableImage";

interface RouteCardProps {
  route: Route;
}

export function RouteCard({ route }: RouteCardProps) {
  return (
    <GlassCard padded={false} className="w-[260px] sm:w-[300px] shrink-0 rounded-xl overflow-hidden group relative flex flex-col h-full border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#F1F5F9]">
        <ZoomableImage
          src={route.image}
          alt={`${route.name} travel destination`}
          priority={route.id === "shirdi"}
          sizes="300px"
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/30 to-transparent" />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="px-3 py-1.5 rounded-full bg-accent-gold text-white font-mono font-bold text-xs shadow-sm">
            {route.startingFrom}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-display font-bold text-white mb-1">{route.name}</h3>
          <p className="text-sm text-white/90">{route.distance} &nbsp;•&nbsp; {route.duration}</p>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-sm text-[#64748B] mb-4 flex-1">
          {route.name} is one of the most requested routes from Pune, offering comfortable and reliable travel.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center justify-center w-full min-h-11 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-sm font-body font-semibold hover:bg-brand-blue-light transition-colors"
        >
          Book Now
        </Link>
      </div>
    </GlassCard>
  );
}
