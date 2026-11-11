"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  if (pathname?.startsWith("/morya-admin-hq-9x")) return null;

  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="container-page py-10 md:py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="mb-3 flex items-center gap-3">
              <Image
                src={SITE.logo}
                alt={`${SITE.name} logo`}
                width={352}
                height={352}
                className="h-20 w-20 shrink-0 rounded-xl object-contain sm:h-24 sm:w-24"
              />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#64748B]">
              Trusted cab partner for outstation tours, airport transfers, and group travel across Pune &amp; Maharashtra.
            </p>
            <div className="mt-4 space-y-2 text-sm text-[#0F172A]">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-brand-blue">
                <Phone className="h-4 w-4 text-brand-blue" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <a href={`tel:${SITE.phone2}`} className="flex items-center gap-2 hover:text-brand-blue">
                <Phone className="h-4 w-4 text-brand-blue" />
                <span>{SITE.phone2Display}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-brand-blue">
                <Mail className="h-4 w-4 text-brand-blue" />
                <span>{SITE.email}</span>
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8FAFC] text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8FAFC] text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                aria-label={`Instagram @${SITE.instagramHandle}`}
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Company</h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li><Link href="/about" className="transition-colors hover:text-brand-blue">About Us</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-brand-blue">Contact</Link></li>
              <li><Link href="/faqs" className="transition-colors hover:text-brand-blue">FAQs</Link></li>
              <li><Link href="/corporate" className="transition-colors hover:text-brand-blue">Corporate</Link></li>
              <li><Link href="/packages" className="transition-colors hover:text-brand-blue">Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Services</h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">All Services</Link></li>
              <li><Link href="/services/pune-darshan-local-cab-service" className="transition-colors hover:text-brand-blue">Pune Darshan</Link></li>
              <li><Link href="/services/airport-taxi-pune" className="transition-colors hover:text-brand-blue">Airport Transfers</Link></li>
              <li><Link href="/services/outstation-car-rental" className="transition-colors hover:text-brand-blue">Outstation Cabs</Link></li>
              <li><Link href="/services/pune-to-shirdi-cab" className="transition-colors hover:text-brand-blue">Pilgrimage Tours</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Fleet</h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">All Vehicles</Link></li>
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">Sedans</Link></li>
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">SUVs</Link></li>
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">Tempo Travellers</Link></li>
              <li><Link href="/services/innova-crysta-on-rent-pune" className="transition-colors hover:text-brand-blue">Innova Crysta</Link></li>
            </ul>
          </div>

          <div className="col-span-1"><h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Popular Routes</h4><ul className="space-y-2.5 text-sm text-[#64748B]">
              <li><Link href="/services/pune-to-mumbai-cab" className="transition-colors hover:text-brand-blue">Pune to Mumbai</Link></li>
              <li><Link href="/services/pune-to-shirdi-cab" className="transition-colors hover:text-brand-blue">Pune to Shirdi</Link></li>
              <li><Link href="/services/pune-to-lonavla-cab" className="transition-colors hover:text-brand-blue">Pune to Lonavala</Link></li>
              <li><Link href="/services/pune-to-mahabaleshwar-cab" className="transition-colors hover:text-brand-blue">Pune to Mahabaleshwar</Link></li>
              <li><Link href="/services/pune-to-nashik-cab" className="transition-colors hover:text-brand-blue">Pune to Nashik</Link></li>
            </ul>
          </div>
          <div className="col-span-2 text-center sm:col-span-3 lg:col-span-5">
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-[#64748B]">{SITE.address}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#E2E8F0] pt-6 md:flex-row">
          <p className="text-xs text-[#64748B]">© 2026 Morya Travels. All rights reserved.</p>
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




