import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Clock, Sparkles, Bus, Car, Globe, Landmark, Plane, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getServiceBySlug, getServices, SERVICE_CATEGORIES } from "@/lib/services";
import { getVehicles } from "@/lib/data";
import { SITE, whatsappUrl } from "@/constants/site";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { FLEET as FALLBACK_FLEET } from "@/constants/fleet";
import { buildMetadata, serviceSchema } from "@/lib/seo";

const SERVICE_ICON_MAP = { Bus, Car, Globe, Landmark, MapPin, Plane, Truck } as const;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } };
  const image = service.image
    ? service.image.startsWith("http")
      ? { url: service.image, width: 1200, height: 630, alt: service.title }
      : { url: `${SITE.url}${service.image}`, width: 1200, height: 630, alt: service.title }
    : undefined;
  return buildMetadata({
    title: `${service.title} — Book Online in Pune`,
    description: `${service.shortDescription} Transparent pricing, verified drivers, and clean cabs. Book your ${service.title.toLowerCase()} today.`,
    canonical: `/services/${slug}`,
    ogImage: image,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, services, vehicles] = await Promise.all([getServiceBySlug(slug), getServices(), getVehicles().catch(() => FALLBACK_FLEET)]);
  if (!service) notFound();
  const serviceJsonLd = serviceSchema(service);
  const categoryLabel = SERVICE_CATEGORIES.find((c) => c.key === service.category)?.label;
  const related = services.filter((s) => s.id !== service.id && service.relatedIds.includes(s.id)).slice(0, 3);
  const fleetOptions = (vehicles as typeof FALLBACK_FLEET).slice(0, 4);
  const ServiceIcon = SERVICE_ICON_MAP[service.iconName as keyof typeof SERVICE_ICON_MAP] ?? Car;

  return (
    <div className="flex flex-col flex-1">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: service.title, href: `/services/${service.id}` },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* Service category chip */}
      <div className="container-page py-6">
        <span className="inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 text-xs font-semibold text-brand-blue uppercase tracking-wider">
          {categoryLabel}
        </span>
      </div>

      {/* Hero: image + title + fare + CTAs */}
      <section className="py-10 md:py-14 bg-[#F8FAFC]">
        <div className="container-page">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white sm:aspect-[16/9]">
              {service.image.startsWith("/") ? (
                <SafeImage
                  src={service.image}
                  alt={service.title}
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="block w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-blue/5 via-white to-accent-gold/10">
                  <ServiceIcon className="h-20 w-20 text-brand-blue/25" aria-hidden="true" />
                </div>
              )}
              {service.badge && (
                <span
                  className="absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  style={{ backgroundColor: service.badgeColor }}
                >
                  {service.badge}
                </span>
              )}
              <div className={`absolute inset-0 ${service.image.startsWith("/") ? "bg-gradient-to-t from-[#0F172A]/65 to-transparent" : "bg-gradient-to-t from-[#0F172A]/10 to-transparent"}`} />
              <div className="absolute left-4 bottom-4 z-10">
                <h1 className={`font-display text-2xl font-bold leading-tight sm:text-3xl ${service.image.startsWith("/") ? "text-white" : "text-[#0F172A]"}`}>
                  {service.title}
                </h1>
                <p className={`mt-1 text-sm ${service.image.startsWith("/") ? "text-white/90" : "text-[#475569]"}`}>{service.shortDescription}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 md:p-8 shadow-sm">
                <p className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                  Service details
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Share your travel details for availability and trip information. Toll, parking, and permits are applicable as per route.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <AnimatedButton
                    variant="gold"
                    size="md"
                    href={`/book?service=${service.id}`}
                    className="w-full"
                  >
                    Book this service
                  </AnimatedButton>
                  <AnimatedButton
                    variant="ghost"
                    size="md"
                    href={whatsappUrl(`Hi Morya Travels, I would like to enquire about "${service.title}". Please share availability and booking details.`)}
                    className="w-full"
                  >
                    Enquire on WhatsApp
                  </AnimatedButton>
                </div>

                <div className="mt-6 border-t border-[#E2E8F0] pt-6 text-xs text-[#64748B]">
                  <p>
                    Prefer to talk? Call{" "}
                    <a
                      href={`tel:${SITE.phone}`}
                      className="font-medium text-brand-blue hover:underline"
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 flex flex-col">
                  <MapPin className="mb-2 h-5 w-5 text-brand-blue shrink-0" />
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                    Service area
                  </p>
                  <p className="text-sm font-medium text-[#0F172A]">Pune &amp; Maharashtra</p>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 flex flex-col">
                  <Clock className="mb-2 h-5 w-5 text-brand-blue shrink-0" />
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                    Availability
                  </p>
                  <p className="text-sm font-medium text-[#0F172A]">24 × 7 booking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / intro */}
      <section className="py-14">
        <div className="container-page">
          <div className="max-w-3xl mx-auto">
            <p className="lead text-lg leading-relaxed text-[#475569]">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Vehicle options */}
      <section className="py-14 border-y border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-[#0F172A]">
                Wide Range of Cars on Rent
              </h2>
              <Link
                href="/fleet"
                className="text-xs font-bold uppercase tracking-widest text-brand-blue transition-colors hover:underline"
              >
                View all vehicles
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {fleetOptions.map((vehicle) => {
                const isTempo = vehicle.type === "tempo";
                return (
                  <Link
                    key={vehicle.id}
                    href={`/fleet/${vehicle.id}`}
                    className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:border-brand-blue hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F5F9]">
                      <SafeImage
                        src={vehicle.image}
                        alt={vehicle.name}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="block w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        className="absolute left-2 top-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm"
                        style={{ backgroundColor: vehicle.badgeColor }}
                      >
                        {vehicle.badge}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-base font-bold text-[#0F172A] group-hover:text-brand-blue">
                        {vehicle.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#64748B]">
                        {vehicle.seats} + 1 seats · {vehicle.ac ? "AC" : "Non-AC"}
                      </p>
                      <p className="mt-2 text-xs font-medium text-[#475569]">
                        {vehicle.ac ? "AC available" : "Non-AC"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / what's included */}
      <section className="py-14">
        <div className="container-page">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-[#0F172A] text-center mb-10">
              Benefits of Booking with Us
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.includes.map((item, i) => (
                <li key={i} className="rounded-xl border border-[#E2E8F0] bg-white p-6 flex flex-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent-gold" />
                  <p className="text-sm text-[#475569] leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sightseeing places */}
      {service.places && service.places.length > 0 && (
        <section className="py-14 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="container-page">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-10">
                Sightseeing Places to Visit
              </h2>
              <p className="mb-8 text-[#64748B] leading-relaxed text-center">
                Explore the best attractions with a dedicated cab and an experienced local driver who
                knows every route.
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {service.places.map((place) => (
                  <div
                    key={place}
                    className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all hover:shadow-md"
                  >
<div className="relative aspect-[4/3] overflow-hidden bg-[#F1F5F9]">
                      <SafeImage
src={`https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(place.replace(/ /g, "_"))}`}
                        alt={place}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="block w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
                      <div className="absolute left-3 bottom-3 z-10">
                        <h3 className="font-display font-bold text-white text-sm leading-tight drop-shadow-sm">
                          {place}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#64748B]">
                        Visit {place} with our dedicated Pune local cab.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ideal for */}
      {service.idealFor.length > 0 && (
        <section className="py-14">
          <div className="container-page">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-6">
                Ideal for
              </h2>
              <p className="mb-8 text-[#64748B] leading-relaxed text-center">
                Whether you are travelling alone or with family, our {service.title.toLowerCase()} is
                designed for:
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {service.idealFor.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-medium text-[#475569] shadow-sm"
                  >
                    <Sparkles className="h-3 w-3 text-accent-gold shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-14 border-t border-[#E2E8F0]">
          <div className="container-page">
            <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-10">
              Related services
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedService) => (
                <Link
                  key={relatedService.id}
                  href={`/services/${relatedService.id}`}
                  className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:border-brand-blue hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F5F9]">
                    <SafeImage
                      src={relatedService.image}
                      alt={relatedService.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="block w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-base font-bold text-[#0F172A] group-hover:text-brand-blue">
                      {relatedService.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                      {relatedService.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand-blue shrink-0" />
                      <span className="text-xs font-medium text-[#475569]">
                        View details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-[#0F172A] text-center">
        <div className="container-page">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to book {service.title}?
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-xl mx-auto">
            Clean cabs, verified drivers, and transparent pricing for your journey across Pune and
            Maharashtra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton variant="gold" size="lg" href="/book">
              Book Now
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              size="lg"
              href={whatsappUrl(`Hi Morya Travels, I would like to book "${service.title}". Please share availability and fare details.`)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              WhatsApp Us
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
