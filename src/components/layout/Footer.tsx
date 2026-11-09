import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
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

export function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="container-page py-12 md:py-16">
        <div className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={SITE.logo}
                alt={`${SITE.name} logo`}
                width={352}
                height={352}
                className="h-32 w-32 shrink-0 rounded-xl object-contain sm:h-36 sm:w-36"
              />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#64748B]">
              Your trusted travel partner for outstation tours, airport transfers,
              and group travel across Maharashtra with clean cabs and professional
              drivers.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Services</h4>
            <ul className="space-y-3 text-sm text-[#64748B]">
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">Outstation Tours</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">Airport Transfers</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">Pilgrimage Cabs</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">Corporate Travel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Fleet</h4>
            <ul className="space-y-3 text-sm text-[#64748B]">
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">Sedans</Link></li>
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">SUVs</Link></li>
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">Tempo Travellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Company</h4>
            <ul className="space-y-3 text-sm text-[#64748B]">
              <li><Link href="/about" className="transition-colors hover:text-brand-blue">About Us</Link></li>
              <li><Link href="/packages" className="transition-colors hover:text-brand-blue">Packages</Link></li>
              <li><Link href="/corporate" className="transition-colors hover:text-brand-blue">Corporate</Link></li>
              <li><Link href="/faqs" className="transition-colors hover:text-brand-blue">FAQs</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-brand-blue">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-border-light pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-3 text-sm text-text-muted md:items-start w-full md:w-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start w-full">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-[#0F172A] hover:text-brand-blue">
                <Phone className="h-4 w-4 text-brand-blue" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <a href={`tel:${SITE.phone2}`} className="flex items-center gap-2 text-[#0F172A] hover:text-brand-blue">
                <Phone className="h-4 w-4 text-brand-blue" />
                <span>{SITE.phone2Display}</span>
              </a>
            </div>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-[#0F172A] hover:text-brand-blue">
              <Mail className="h-4 w-4 text-brand-blue" />
              <span>{SITE.email}</span>
            </a>
            <p className="max-w-md text-center text-xs text-[#64748B] md:text-left">{SITE.address}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-card text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-card text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
              aria-label={`Instagram @${SITE.instagramHandle}`}
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-light pt-8 md:flex-row">
          <p className="text-xs text-[#64748B]">
            © 2026 Morya Travels. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <p>Est. 2011</p>
            <span className="mx-1 h-3 w-px bg-[#CBD5E1]" />
            <p>Pune, Maharashtra</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
