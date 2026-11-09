import dynamicImport from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { getRoutes, getVehicles } from "@/lib/data";
import { getServices } from "@/lib/services";
import { buildMetadata, SEO } from "@/lib/seo";

const KeyHighlights = dynamicImport(() => import("@/components/home/KeyHighlights").then((m) => m.KeyHighlights));
const ServicesGrid = dynamicImport(() => import("@/components/home/ServicesGrid").then((m) => m.ServicesGrid));
const TrustStrip = dynamicImport(() => import("@/components/home/TrustStrip").then((m) => m.TrustStrip));
const AboutSection = dynamicImport(() => import("@/components/home/AboutSection").then((m) => m.AboutSection));
const FleetPreview = dynamicImport(() => import("@/components/home/FleetPreview").then((m) => m.FleetPreview));
const PopularRoutes = dynamicImport(() => import("@/components/home/PopularRoutes").then((m) => m.PopularRoutes));
const WhyChooseUs = dynamicImport(() => import("@/components/home/WhyChooseUs").then((m) => m.WhyChooseUs));
const TravelShowcase = dynamicImport(() => import("@/components/home/TravelShowcase").then((m) => m.TravelShowcase));
const Testimonials = dynamicImport(() => import("@/components/home/Testimonials").then((m) => m.Testimonials));
const FAQSection = dynamicImport(() => import("@/components/home/FAQSection").then((m) => m.FAQSection));
const CTABanner = dynamicImport(() => import("@/components/home/CTABanner").then((m) => m.CTABanner));

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: `${SEO.siteName} — Book Outstation Cabs, Airport Transfers & Tempo Traveller in Pune`,
  description: SEO.defaultDescription,
  canonical: "/",
});

export default async function Home() {
  const [vehicles, routes, services] = await Promise.all([getVehicles(), getRoutes(), getServices()]);

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 relative">
        <HeroSection />
        <KeyHighlights />
        <TrustStrip />
        <AboutSection />
        <TravelShowcase />
        <ServicesGrid services={services} />
        <FleetPreview vehicles={vehicles} />
        <PopularRoutes routes={routes} />
        <WhyChooseUs />
        <Testimonials />
        <FAQSection />
        <CTABanner />
      </main>
    </div>
  );
}
