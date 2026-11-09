import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FareEstimator } from "@/components/ui/FareEstimator";
import { getVehicles } from "@/lib/data";
import type { Vehicle } from "@/constants/fleet";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Our Fleet — Sedans, SUVs & Tempo Travellers on Rent in Pune",
  description:
    "Clean, well-maintained vehicles for every need — Swift Dzire, Etios, Innova, Innova Crysta, Kia Carens and Tempo Travellers on rent in Pune with verified drivers.",
  canonical: "/fleet",
});

function rateLabel(v: Vehicle) {
  if (v.type === "tempo") return `₹${v.packageRate ?? 0} pkg`;
  return `₹${v.ratePerKm}/km`;
}

function minLabel(v: Vehicle) {
  if (v.type === "tempo") return v.ac ? "AC" : "Non-AC";
  return `${v.minKm} km`;
}

export default async function FleetPage() {
  const vehicles = (await getVehicles()) as Vehicle[];

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Fleet", href: "/fleet" },
      ]} />
<section className="py-10">
        <div className="container-page">
          <SectionTitle title="Our Fleet" subtitle="Clean, well-maintained vehicles for every need." className="mx-auto max-w-2xl text-center mb-4" />
        </div>
      </section>

      <section className="py-8">
        <div className="container-page max-w-4xl">
          <FareEstimator vehicles={vehicles} />
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <GlassCard
                key={vehicle.id}
                padded={false}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:border-brand-blue hover:shadow-md"
              >
                <div className="relative h-48 shrink-0 overflow-hidden bg-[#F1F5F9]">
<ZoomableImage
                    src={vehicle.image}
                    alt={`${vehicle.name} — ${vehicle.type}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-[#0F172A]/20" />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#E2E8F0] bg-white/95 px-2.5 py-1 font-mono text-xs text-[#0F172A] shadow-sm backdrop-blur">
                    {vehicle.seats} <span className="text-[10px]">seats</span>
                  </span>
                  <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#0F172A]/90 px-2.5 py-1 font-mono text-xs text-accent-gold shadow-sm backdrop-blur">
                    {rateLabel(vehicle)}
                  </span>
                  <div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#0F172A]/90 px-2.5 py-1 font-mono text-xs text-white shadow-sm backdrop-blur">
                    {minLabel(vehicle)}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded px-2 py-0.5 font-mono text-xs font-bold text-white" style={{ backgroundColor: vehicle.badgeColor }}>
                      {vehicle.badge}
                    </span>
                    <span className="text-xs capitalize text-[#64748B]">{vehicle.type}</span>
                  </div>
                  <Link href={`/fleet/${vehicle.id}`} className="font-display text-xl font-bold text-[#0F172A] transition-colors hover:text-brand-blue">
                    {vehicle.name}
                  </Link>
                  <p className="mt-1 text-sm text-[#64748B]">{vehicle.luggage} luggage • {vehicle.ac ? "AC" : "Non-AC"}</p>
                  <div className="mb-5 mt-4 flex flex-wrap gap-2">
                    {vehicle.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="rounded border border-[#E2E8F0] bg-[#F1F5F9] px-2 py-1 font-mono text-[10px] text-[#64748B]">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-2">
                    <AnimatedButton variant="ghost" size="sm" className="flex-1" href={`/fleet/${vehicle.id}`}>Details</AnimatedButton>
                    <AnimatedButton variant="gold" size="sm" className="flex-1" href={`/book?vehicle=${vehicle.id}`}>Book</AnimatedButton>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
