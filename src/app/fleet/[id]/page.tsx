import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Users, Briefcase, Snowflake, Route } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FLEET as FALLBACK_FLEET, type Vehicle } from "@/constants/fleet";
import { SITE, whatsappUrl } from "@/constants/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { getVehicles } from "@/lib/data";
import type { Metadata } from "next";
import { buildMetadata, vehicleSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

async function findVehicle(id: string): Promise<Vehicle | null> {
  const vehicles = (await getVehicles()) as Vehicle[];
  return vehicles.find((v) => v.id === id) ?? FALLBACK_FLEET.find((v) => v.id === id) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await findVehicle(id);
  if (!vehicle) return {};
  const image = vehicle.image.startsWith("http")
    ? { url: vehicle.image, width: 1200, height: 630, alt: vehicle.name }
    : { url: `${SITE.url}${vehicle.image}`, width: 1200, height: 630, alt: vehicle.name };
  return buildMetadata({
    title: `${vehicle.name} on Rent in Pune — Morya Travels`,
    description: `Book ${vehicle.name} for outstation trips from Pune. ${vehicle.seats + 1} seats, ${vehicle.ac ? "AC" : "Non-AC"}, ${vehicle.type === "tempo" ? `package from ₹${vehicle.packageRate}` : `₹${vehicle.ratePerKm}/km`}. Verified driver, clean vehicle.`,
    canonical: `/fleet/${vehicle.id}`,
    ogImage: image,
  });
}

export default async function FleetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicles = (await getVehicles()) as Vehicle[];
  const vehicle = vehicles.find((v) => v.id === id) ?? FALLBACK_FLEET.find((v) => v.id === id);
  if (!vehicle) notFound();
  const vehicleJsonLd = vehicleSchema(vehicle);

  const otherVehicles = vehicles.filter((v) => v.id !== vehicle.id).slice(0, 3);
  const rateDisplay = vehicle.type === "tempo" ? `₹${vehicle.packageRate}` : `₹${vehicle.ratePerKm}`;
  const rateUnit = vehicle.type === "tempo" ? "package" : "per km";

return (
    <div className="flex flex-1 flex-col">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Fleet", href: "/fleet" },
        { label: vehicle.name, href: `/fleet/${vehicle.id}` },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
      <section className="pb-16 pt-4">
        <div className="container-page">
          <Link href="/fleet" className="mb-8 inline-flex items-center gap-2 text-sm text-[#64748B] transition-colors hover:text-[#0F172A]">
            <ArrowLeft className="h-4 w-4" /> Back to Fleet
          </Link>
<div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
<div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F1F5F9] shadow-sm">
              <SafeImage src={vehicle.image} alt={`${vehicle.name} - Morya Travels`} priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-6" />
              <div className="absolute left-4 top-4"><span className="rounded-full px-3 py-1 font-mono text-xs font-bold text-white" style={{ backgroundColor: vehicle.badgeColor }}>{vehicle.badge}</span></div>
            </div>
            <div className="flex flex-col">
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-[#64748B]">{vehicle.type}</p>
              <h1 className="mb-4 font-display text-4xl font-bold text-[#0F172A] md:text-5xl">{vehicle.name}</h1>
              <div className="mb-6 flex items-baseline gap-2"><span className="font-mono text-4xl font-bold text-accent-gold">{rateDisplay}</span><span className="text-sm text-[#64748B]">{rateUnit}</span>{vehicle.type !== "tempo" && <span className="ml-2 rounded bg-[#F1F5F9] px-2 py-0.5 font-mono text-xs text-[#64748B]">Min {vehicle.minKm} km</span>}</div>
              <div className="mb-8 grid grid-cols-3 gap-3">
                <GlassCard className="rounded-xl p-4 text-center"><Users className="mx-auto mb-1 h-5 w-5 text-brand-blue" /><div className="font-mono text-lg font-bold text-[#0F172A]">{vehicle.seats}</div><div className="text-xs text-[#64748B]">Seats</div></GlassCard>
                <GlassCard className="rounded-xl p-4 text-center"><Briefcase className="mx-auto mb-1 h-5 w-5 text-brand-blue" /><div className="font-mono text-lg font-bold text-[#0F172A]">{vehicle.luggage}</div><div className="text-xs text-[#64748B]">Bags</div></GlassCard>
                <GlassCard className="rounded-xl p-4 text-center"><Snowflake className="mx-auto mb-1 h-5 w-5 text-brand-blue" /><div className="font-mono text-lg font-bold text-[#0F172A]">{vehicle.ac ? "Yes" : "No"}</div><div className="text-xs text-[#64748B]">AC</div></GlassCard>
              </div>
              <div className="mb-8"><h2 className="mb-3 font-display text-lg font-bold text-[#0F172A]">Features</h2><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{[...vehicle.features, ...vehicle.extraFeatures].slice(0, 10).map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-[#64748B]"><Check className="h-4 w-4 shrink-0 text-accent-gold" />{f}</div>))}</div></div>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row"><AnimatedButton variant="gold" size="lg" className="flex-1" href={`/book?vehicle=${vehicle.id}`}>Book This Vehicle</AnimatedButton><AnimatedButton variant="ghost" size="lg" className="flex-1" href={whatsappUrl(`Hi Morya Travels, I would like to enquire about booking a ${vehicle.name}. Please share availability and fare details.`)}><Route className="h-4 w-4" />Enquire on WhatsApp</AnimatedButton></div>
              <p className="mt-4 text-center text-xs text-[#64748B]">Or call us directly: <a href={`tel:${SITE.phone}`} className="font-medium text-brand-blue hover:underline">{SITE.phoneDisplay}</a></p>
            </div>
          </div>
        </div>
      </section>

      {otherVehicles.length > 0 && (
        <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-16">
          <div className="container-page">
            <h2 className="mb-8 font-display text-2xl font-bold text-[#0F172A]">Other Vehicles</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {otherVehicles.map((v) => (
                <GlassCard key={v.id} padded={false} className="group overflow-hidden rounded-xl border border-[#E2E8F0] transition-all hover:border-brand-blue">
                  <Link href={`/fleet/${v.id}`} className="block">
                    <div className="relative aspect-[4/3] bg-[#F1F5F9]"><SafeImage src={v.image} alt={v.name} sizes="33vw" className="object-contain p-3" /></div>
                    <div className="p-4"><h3 className="font-display font-bold text-[#0F172A] transition-colors group-hover:text-brand-blue">{v.name}</h3><p className="mt-1 text-xs text-[#64748B]">{v.seats} seats · {v.ac ? "AC" : "Non-AC"} · {v.type === "tempo" ? `₹${v.packageRate} pkg` : `₹${v.ratePerKm}/km`}</p></div>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
