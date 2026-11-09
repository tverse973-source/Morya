import { ChevronDown } from "lucide-react";
import { FAQS } from "@/constants/faqs";

export function FAQAccordion({ limit }: { limit?: number }) {
  const faqs = limit ? FAQS.slice(0, limit) : FAQS;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {faqs.map((faq) => (
        <details
          key={faq.id}
          className="group rounded-xl border border-[#E2E8F0] bg-white transition-colors open:border-brand-blue/40 hover:border-brand-blue/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-body text-sm font-semibold text-[#0F172A] marker:content-none sm:text-base">
            {faq.question}
            <ChevronDown className="h-4 w-4 shrink-0 text-[#64748B] transition-transform duration-300 group-open:rotate-180 group-open:text-brand-blue" />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-[#64748B]">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
