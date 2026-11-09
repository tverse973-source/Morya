import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export function FAQSection() {
  return (
    <section className="bg-[#F8FAFC] py-12">
      <div className="container-page">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Quick answers about booking, fares and travel with us."
          className="mx-auto max-w-2xl text-center mb-12"
        />

        <FAQAccordion limit={6} />

        <div className="mt-8 flex justify-center">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-light"
          >
            View all FAQs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
