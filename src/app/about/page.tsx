import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Phone, Mail } from "lucide-react";
import type { Metadata } from "next";
import { buildMetadata, contactSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Morya Travels — Trusted Pune Travel Partner Since 2011",
  description:
    "Morya Travels is a Pune-based travel partner offering outstation cabs, airport transfers, pilgrimage trips and group travel since 2011. Clean cabs, verified drivers, transparent pricing.",
  canonical: "/about",
});

const aboutJsonLd = [contactSchema()];

const ABOUT_HERO = "/images/brand/about-story.png";
const STORY_IMAGE = "/images/brand/about-journey.png";

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-white pointer-events-none" />
        <div className="container-page relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-[#0F172A] mb-4">
            About Morya Travels
          </h1>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Your trusted travel partner in Pune and across Maharashtra — offering
            clean cabs, professional drivers, and transparent pricing since day one.
          </p>
          <div className="relative mt-8 h-56 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#F1F5F9]">
            <SafeImage
              src={ABOUT_HERO}
              alt="Morya Travels cab on a scenic Maharashtra highway"
              priority
              sizes="(max-width: 900px) 100vw, 80rem"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <SectionTitle
            title="Our Story"
            subtitle="Driven by trust, powered by comfort."
            className="mx-auto max-w-2xl text-center mb-6"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <GlassCard className="p-12">
<p className="text-[#64748B] leading-relaxed mb-6">
                  We offer affordable tour packages for everyone to enjoy a bagful of
                  cheerful moments &amp; unforgettable experiences. Our priority is
                  customer satisfaction.
                </p>
                <p className="text-[#64748B] leading-relaxed">
                  Vehicles are equipped with GPS for easy navigation and safety. We
                  provide free home pick-up and drop, economical and reliable
                  service, comfortable and safe journeys, well-trained drivers, and
                  efficient timely services.
                </p>
            </GlassCard>
            <div className="relative h-72 lg:h-[420px] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#F1F5F9]">
              <SafeImage
                src={STORY_IMAGE}
                alt="Passengers travelling with Morya Travels"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[
              "Economical Transfers",
              "Car Hire Company in Pune",
              "Well Trained Drivers",
              "Online Booking",
            ].map((label) => (
              <GlassCard key={label} className="p-6 rounded-xl border border-[#E2E8F0] shadow-sm text-center">
                <h3 className="font-display font-bold text-[#0F172A]">{label}</h3>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 border-t border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="container-page text-center">
          <SectionTitle title="Meet Our Team" subtitle="The people behind Morya Travels" className="mb-4" />
<div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <GlassCard className="overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="relative h-[330px] w-full overflow-hidden bg-[#F1F5F9]">
                <SafeImage
                  src="/images/brand/profile-ritesh-rathod.jpg"
                  alt="Ritesh Rathod"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="p-8 text-left">
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">Ritesh Rathod</h3>
                <p className="mt-1 text-sm font-medium text-brand-blue">Owner</p>
                <div className="mt-5 space-y-3 text-sm text-[#475569]">
                  <a href="tel:8390466948" className="flex items-center gap-3 hover:text-brand-blue">
                    <Phone className="h-4 w-4 text-brand-blue" />
                    +91 83904 66948
                  </a>
                  <a href="mailto:info@moryatravel.in" className="flex items-center gap-3 hover:text-brand-blue">
                    <Mail className="h-4 w-4 text-brand-blue" />
                    info@moryatravel.in
                  </a>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="relative h-[330px] w-full overflow-hidden bg-[#F1F5F9]">
                <SafeImage
                  src="/images/brand/profile-ashvin-rathod.png"
                  alt="Ashvin Rathod"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="p-8 text-left">
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">Ashvin Rathod</h3>
                <p className="mt-1 text-sm font-medium text-brand-blue">Founder & Owner</p>
                <div className="mt-5 space-y-3 text-sm text-[#475569]">
                  <a href="tel:8999514635" className="flex items-center gap-3 hover:text-brand-blue">
                    <Phone className="h-4 w-4 text-brand-blue" />
                    +91 89995 14635
                  </a>
                  <a href="mailto:ashwinavinashrathod@gmail.com" className="flex items-center gap-3 hover:text-brand-blue">
                    <Mail className="h-4 w-4 text-brand-blue" />
                    ashwinavinashrathod@gmail.com
                  </a>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="relative h-[330px] w-full overflow-hidden bg-[#F1F5F9]">
                <SafeImage
                  src="/images/brand/profile-rohit-rathod.jpg"
                  alt="Rohit Rathod"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="p-8 text-left">
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">Rohit Rathod</h3>
                <p className="mt-1 text-sm font-medium text-brand-blue">Director</p>
                <div className="mt-5 space-y-3 text-sm text-[#475569]">
                  <a href="tel:7350329801" className="flex items-center gap-3 hover:text-brand-blue">
                    <Phone className="h-4 w-4 text-brand-blue" />
                    +91 73503 29801
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-8 text-center">
        <AnimatedButton variant="gold" size="lg" href="/book">
          Book Your Ride
        </AnimatedButton>
      </section>
    </div>
  );
}
