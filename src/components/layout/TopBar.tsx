"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappUrl } from "@/constants/site";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function TopBar() {
  return (
    <div className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="container-page flex items-center justify-between gap-3 py-1.5">
        {/* Left: contact info cluster */}
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
          <a
            href={`tel:${SITE.phone}`}
            aria-label={`Call ${SITE.phoneDisplay}`}
            className="group inline-flex min-h-9 min-w-0 items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-white"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Phone className="h-3 w-3" />
            </span>
            <span className="truncate text-[11px] font-medium text-[#475569] sm:text-xs">
              {SITE.phoneDisplay}
            </span>
          </a>

          <a
            href={`tel:${SITE.phone2}`}
            aria-label={`Call ${SITE.phone2Display}`}
            className="group hidden min-h-9 min-w-0 items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-white sm:inline-flex"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Phone className="h-3 w-3" />
            </span>
            <span className="truncate text-[11px] font-medium text-[#475569] sm:text-xs">
              {SITE.phone2Display}
            </span>
          </a>

          <span className="hidden h-4 w-px shrink-0 bg-[#E2E8F0] md:block" />

          <a
            href={`mailto:${SITE.email}`}
            aria-label={`Email ${SITE.email}`}
            className="group hidden min-h-9 min-w-0 items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-white md:inline-flex"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Mail className="h-3 w-3" />
            </span>
            <span className="truncate text-[11px] font-medium text-[#475569] sm:text-xs">
              {SITE.email}
            </span>
          </a>
        </div>

        {/* Right: availability + social */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full px-2 py-1 sm:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue/50 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
            </span>
            <span className="whitespace-nowrap text-[11px] font-medium text-[#475569] sm:text-xs">
              Open 24/7
            </span>
          </span>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white shadow-sm transition-all hover:-translate-y-px hover:bg-brand-blue-light hover:shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram @${SITE.instagramHandle}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white shadow-sm transition-all hover:-translate-y-px hover:opacity-95 hover:shadow-md"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
