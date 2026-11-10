import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getServices } from "@/lib/services";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Our Services — Outstation Cabs, Airport Transfers, Pilgrimage & Corporate Travel",
  description:
    "Outstation tours, airport transfers, pilgrimage cabs, corporate travel, local rides and group travel across Pune and Maharashtra. Transparent pricing, verified drivers.",
  canonical: "/services",
});

const hasServiceImage = (src: string) => src.startsWith("/");

export default async function ServicesPage() {
  const services = await getServices();
  const withImage = services.filter((s) => hasServiceImage(s.image));
  const withoutImage = services.filter((s) => !hasServiceImage(s.image));

  return (
    <div className="flex flex-col flex-1">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
      ]} />
      <section className="py-20">
        <div className="container-page text-center">
          <SectionTitle title="Our Services" subtitle="Everything you need for a smooth journey." />
        </div>
        <div className="container-page mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {withImage.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="block"
              >
                <GlassCard padded={false} className="flex flex-col rounded-xl border border-[#E2E8F0] shadow-sm hover:border-brand-blue transition-all duration-300 group overflow-hidden">
                    <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#F1F5F9]">
                      <ZoomableImage
                        src={service.image}
                        alt={service.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={i === 0}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 via-[#0F172A]/20 to-transparent" />
                      <span className="absolute bottom-3 left-4 z-10 text-lg font-display font-bold text-white drop-shadow-sm">
                        {service.title}
                      </span>
                      {service.badge && (
                        <span
                          className="absolute top-4 left-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                          style={{ backgroundColor: service.badgeColor }}
                        >
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                        {service.shortDescription || service.description}
                      </p>
                      <h4 className="text-sm font-body font-semibold text-brand-blue mb-3 uppercase tracking-wider">
                        What&rsquo;s included
                      </h4>
                      <ul className="space-y-3 text-sm text-[#64748B]">
                        {service.includes.slice(0, 4).map((d, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-[6px]" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {withoutImage.length > 0 && (
            <div className="mt-14">
              <h3 className="mb-6 font-display text-2xl font-bold text-[#0F172A]">More Services</h3>
              <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
                {withoutImage.map((service, i) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className={`group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-[#F8FAFC] ${
                      i !== withoutImage.length - 1 ? "border-b border-[#E2E8F0]" : ""
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-[#0F172A] group-hover:text-brand-blue">
                        {service.title}
                      </span>
                      <span className="block truncate text-sm text-[#64748B]">
                        {service.shortDescription}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 border-t border-[#E2E8F0] bg-[#F8FAFC] text-center">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-4">
              Ready to Book?
            </h2>
            <p className="text-[#64748B] mb-8">
              Choose your service and get an instant fare estimate.
            </p>
            <AnimatedButton variant="gold" size="lg" href="/book">
              Book Now
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
