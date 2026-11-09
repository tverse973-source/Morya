"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ServiceItem } from "@/lib/services";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { ArrowRight } from "lucide-react";

const hasServiceImage = (src: string) => src.startsWith("/");

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const featured = services.slice(0, 9);
  const withImage = featured.filter((s) => hasServiceImage(s.image));
  const withoutImage = featured.filter((s) => !hasServiceImage(s.image));

  return (
    <section className="relative overflow-hidden py-16 bg-white">
      <div className="container-page relative z-10">
        <SectionTitle
          title="Our Premium Services"
          subtitle="Tailored travel solutions designed for your comfort and safety."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {withImage.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/services/${service.id}`} className="block">
                <SpotlightCard className="h-full p-0 overflow-hidden bg-white border-border-light flex flex-col hover:border-brand-blue/20 transition-colors">
                  <div className="relative h-60 overflow-hidden bg-bg-card">
                    <ZoomableImage
                      src={service.image}
                      alt={service.title}
                      priority={i === 0}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-xl font-display font-bold text-[#0F172A] mb-3 group-hover:text-brand-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-[#64748B]">
                      {service.description}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue transition-all hover:gap-3">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {withoutImage.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
            {withoutImage.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={`group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-white ${
                  i !== withoutImage.length - 1 ? "border-b border-[#E2E8F0]" : ""
                }`}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#0F172A] group-hover:text-brand-blue">
                    {service.title}
                  </span>
                  <span className="block truncate text-xs text-[#64748B]">
                    {service.shortDescription}
                  </span>
                </span>
                <span className="hidden shrink-0 text-xs font-bold uppercase tracking-wider text-brand-blue sm:inline">
                  {service.fare}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:text-brand-blue" />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3B72FF]">
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
