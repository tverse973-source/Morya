import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { SITE } from "@/constants/site";
import { Star, Clock, Car, Phone, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Morya Travels is a Pune-based travel partner offering affordable outstation cabs, airport transfers, pilgrimage trips and group travel.",
  alternates: { canonical: "/about" },
};

const ABOUT_HERO = "/images/brand/about-story.png";
const STORY_IMAGE = "/images/brand/about-journey.png";

const features = [
  {
    icon: Star,
    title: "4.9★ Rated",
    text: "Trusted by thousands of happy customers across Maharashtra.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    text: "Book anytime, travel anytime. We never sleep so you can rest easy.",
  },
  {
    icon: Car,
    title: "50+ Vehicles",
    text: "From sedans and SUVs to 17-seater Tempo Travellers.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-white pointer-events-none" />
        <div className="container-page relative z-10 text-center">
          <h1 className="mb-6 text-5xl font-display font-bold text-[#0F172A] md:text-7xl">
            About {SITE.name}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#64748B]">
            Your trusted travel partner in Pune and across Maharashtra — offering
            clean cabs, professional drivers, and transparent pricing for all your
            journeys.
          </p>
          <div className="relative mt-12 h-56 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F1F5F9] shadow-sm md:h-80 lg:h-96">
            <SafeImage
              src={ABOUT_HERO}
              alt="Morya Travels cab service"
              priority
              sizes="(max-width: 900px) 100vw, 80rem"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <SectionTitle
            title="Our Story"
            subtitle="Driven by trust, powered by comfort."
          />
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <GlassCard className="p-12">
              <p className="mb-6 leading-relaxed text-[#64748B]">
                {SITE.name} was founded with a simple mission: to make intercity travel
                safe, comfortable, and affordable for everyone. Whether it&rsquo;s a
                spiritual trip to Shirdi, a weekend getaway to Lonavala, or a corporate
                transfer to Pune Airport — we&rsquo;ve got you covered.
              </p>
              <p className="leading-relaxed text-[#64748B]">
                With years of road experience and a strong focus on customer
                satisfaction, we help families, pilgrims, and professionals travel with
                ease. Our team believes in punctuality, honest pricing, and dependable
                service every time.
              </p>
            </GlassCard>
            <div className="relative h-72 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F1F5F9] shadow-sm lg:h-[420px]">
              <SafeImage
                src={STORY_IMAGE}
                alt="Passengers travelling with Morya Travels"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <GlassCard
                key={title}
                className="rounded-xl border border-[#E2E8F0] p-6 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-display text-[#0F172A] font-bold">{title}</h3>
                <p className="text-sm text-[#64748B]">{text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-20">
        <div className="container-page">
          <SectionTitle title="Meet Our Team" subtitle="The people behind Morya Travels" />
          <div className="mt-10 space-y-8">
            <div className="mx-auto max-w-sm">
              <GlassCard className="overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm">
                <div className="relative h-[240px] w-full overflow-hidden bg-[#F1F5F9] md:h-[260px]">
                  <SafeImage
                    src="/images/brand/profile-ashvin-rathod.png"
                    alt="Mr. Ashvin Rathod"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="h-full w-full object-contain object-center p-2"
                  />
                </div>
                <div className="p-8 text-left">
                  <h3 className="font-display text-2xl font-bold text-[#0F172A]">Mr. Ashvin Rathod</h3>
                  <p className="mt-1 text-sm font-medium text-brand-blue">OWNER/FOUNDER</p>
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
            </div>

            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
              <GlassCard className="overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm">
                <div className="relative h-[240px] w-full overflow-hidden bg-[#F1F5F9] md:h-[260px]">
                  <SafeImage
                    src="/images/brand/profile-ritesh-rathod.jpg"
                    alt="Ritesh Rathod"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-contain object-center p-2"
                  />
                </div>
                <div className="p-8 text-left">
                  <h3 className="font-display text-2xl font-bold text-[#0F172A]">Ritesh Rathod</h3>
                  <p className="mt-1 text-sm font-medium text-brand-blue">Co Founder</p>
                  <div className="mt-5 space-y-3 text-sm text-[#475569]">
                    <a href="tel:9322291339" className="flex items-center gap-3 hover:text-brand-blue">
                      <Phone className="h-4 w-4 text-brand-blue" />
                      +91 93222 91339
                    </a>
                    <a href="mailto:riteshrathod5614@gmail.com" className="flex items-center gap-3 hover:text-brand-blue">
                      <Mail className="h-4 w-4 text-brand-blue" />
                      riteshrathod5614@gmail.com
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm">
                <div className="relative h-[240px] w-full overflow-hidden bg-[#F1F5F9] md:h-[260px]">
                  <SafeImage
                    src="/images/brand/profile-rohit-rathod.jpg"
                    alt="Rohit Rathod"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-contain object-center p-2"
                  />
                </div>
                <div className="p-8 text-left">
                  <h3 className="font-display text-2xl font-bold text-[#0F172A]">Rohit Rathod</h3>
                  <p className="mt-1 text-sm font-medium text-brand-blue">Director</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <AnimatedButton variant="gold" size="lg" href="/book">
          Book Your Ride
        </AnimatedButton>
      </section>
    </div>
  );
}













