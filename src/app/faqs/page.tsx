import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { FAQS } from "@/constants/faqs";
import { whatsappUrl } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions — Cab Booking in Pune",
  description:
    "Answers to common questions about booking a cab with Morya Travels — outstation rates, tolls, Tempo Travellers, airport transfers and more.",
  canonical: "/faqs",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "FAQs", href: "/faqs" },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="pt-20 pb-10">
        <div className="container-page">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before you book. Still unsure? Call or WhatsApp us."
          />
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page">
          <FAQAccordion />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page max-w-3xl">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 text-center sm:p-10">
            <div>
              <h2 className="font-display text-xl font-bold text-[#0F172A] sm:text-2xl">
                Still have a question?
              </h2>
              <p className="mt-2 text-sm text-[#64748B]">
                Our team is available 24/7 to help you plan your trip.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <AnimatedButton variant="gold" size="md" href={whatsappUrl("Hi Morya Travels, I have a question before booking. Could you please assist me?")}>
                Chat on WhatsApp
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="md" href="/contact">
                Contact us
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
