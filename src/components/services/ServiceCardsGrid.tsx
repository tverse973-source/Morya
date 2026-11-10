"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ServiceItem } from "@/lib/services";

interface ServiceCardsGridProps {
  services: ServiceItem[];
}

export function ServiceCardsGrid({ services }: ServiceCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, i) => (
        <GlassCard
          key={service.id}
          padded={false}
          className="flex flex-col rounded-xl border border-[#E2E8F0] shadow-sm hover:border-brand-blue transition-all duration-300 group overflow-hidden cursor-pointer"
          onClick={() => (window.location.href = `/services/${service.id}`)}
        >
          <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#F1F5F9]">
            <SafeImage
              src={service.image}
              alt={service.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i === 0}
              className="group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 via-[#0F172A]/20 to-transparent" />
            {service.badge && (
              <span
                className="absolute top-4 left-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                style={{ backgroundColor: service.badgeColor }}
              >
                {service.badge}
              </span>
            )}
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-display font-bold text-[#0F172A] mb-3">
              {service.title}
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed mb-4 flex-1">
              {service.shortDescription || service.description}
            </p>
            <div className="mt-auto">
              <Link
                href={`/services/${service.id}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}