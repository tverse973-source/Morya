import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { PackagesTable } from "@/components/ui/PackagesTable";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Metadata } from "next";
import { getPackages } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Travel Packages — Fixed Price Tours from Pune",
  description:
    "Curated travel packages from Pune with fixed, transparent pricing — Shirdi, Mahabaleshwar, Lonavala, Goa and more. Toll and parking extra.",
  canonical: "/packages",
});

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="flex flex-col flex-1">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Packages", href: "/packages" },
      ]} />
      <section className="py-8">
        <div className="container-page text-center">
          <SectionTitle title="Travel Packages" subtitle="Curated trips with fixed pricing. Toll and parking charges extra." />
        </div>
      </section>

      <PackagesTable packages={packages} />

      <section className="py-10 border-t border-[#E2E8F0] bg-[#F8FAFC] text-center">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-4">Need something custom?</h2>
            <p className="text-[#64748B] mb-6">Tell us your route and we&rsquo;ll build a package just for you.</p>
            <AnimatedButton variant="gold" size="lg" href="/contact">
              Get a Custom Quote
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
