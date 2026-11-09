import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  const jsonLd = breadcrumbSchema(
    items.map((item) => ({ name: item.label, url: item.href })),
  );

  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b border-[#E2E8F0]">
        <div className="container-page flex items-center gap-1.5 py-3 text-xs text-[#64748B] md:py-4">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={`${item.href}-${item.label}`}>
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                {isLast ? (
                  <span className="font-medium text-[#0F172A]" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-brand-blue">
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
