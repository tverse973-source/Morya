"use client";

import { ArrowRight, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { whatsappUrl } from "@/constants/site";
import { IMG } from "@/constants/routes";

const CTA_BACKGROUND = IMG(
  "white car driving on an open highway at sunrise with soft golden light, minimal travel scene",
  "landscape_16_9",
);

export function CTABanner() {
  return (
    <section className="py-10 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <SafeImage src={CTA_BACKGROUND} alt="" sizes="100vw" className="opacity-[0.12]" />
      </div>
      <div className="container-page relative z-10">
        <div className="max-w-4xl mx-auto">
        <GlassCard className="p-8 md:p-12 rounded-2xl text-center border border-[#E2E8F0] shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-mono text-brand-blue uppercase tracking-wider">
            <Clock className="w-3 h-3" />
            <span>24/7 Service Available</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F172A] mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-lg text-[#64748B] mb-8 max-w-xl mx-auto">
            Clean cabs, professional drivers, transparent pricing. 24/7 service
            across Maharashtra.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton variant="gold" size="lg" href="/book" className="w-full sm:w-auto">
              Book Now
            </AnimatedButton>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 min-h-[52px] rounded-full border border-[#E2E8F0] text-sm font-body font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </GlassCard>
        </div>
      </div>
    </section>
  );
}
