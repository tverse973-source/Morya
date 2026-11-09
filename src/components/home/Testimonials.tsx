"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/constants/routes";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="w-10 h-10 shrink-0 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-sm font-display font-bold">
      {initials}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = TESTIMONIALS[index];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="container-page relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F172A]">What Our Customers Say</h2>
          <p className="mt-3 text-[#64748B]">Real stories from real journeys.</p>
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
              {TESTIMONIALS.map((item) => (
                <div key={item.id} className="w-full shrink-0 px-1">
                  <GlassCard className="p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
                    <Quote className="w-8 h-8 text-brand-blue/20 mb-3" />
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= item.rating ? "fill-accent-gold text-accent-gold" : "text-border-light"}`}
                        />
                      ))}
                    </div>
                    <p className="text-base sm:text-lg text-[#0F172A] leading-relaxed mb-6 italic">
                      &ldquo;{item.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar name={item.name} />
                      <div>
                        <p className="text-sm font-body font-bold text-[#0F172A]">{item.name}</p>
                        <p className="text-xs text-[#64748B]">{item.location}</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={prev}
            className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm items-center justify-center hover:bg-[#F1F5F9] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#64748B]" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm items-center justify-center hover:bg-[#F1F5F9] transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-[#64748B]" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((item, i) => (
            <button
              type="button"
              key={item.id}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${index === i ? "bg-brand-blue" : "bg-[#E2E8F0]"}`}
            />
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Testimonial {index + 1} of {TESTIMONIALS.length} by {t.name}
        </p>
      </div>
    </section>
  );
}
