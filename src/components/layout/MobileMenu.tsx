"use client";

import { X, Phone, Mail, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE, NAV_LINKS, whatsappUrl } from "@/constants/site";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {!open ? null : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Image
                  src={SITE.logo}
                  alt={`${SITE.name} logo`}
                  width={352}
                  height={352}
                  className="h-28 w-28 shrink-0 rounded-lg object-contain sm:h-32 sm:w-32"
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] transition-colors hover:bg-[#E2E8F0]"
              >
                <X className="h-5 w-5 text-[#0F172A]" />
              </button>
            </div>

            <nav className="mb-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 font-body font-medium text-[#0F172A] transition-colors hover:bg-[#F1F5F9] hover:text-brand-blue",
                      active && "bg-[#F1F5F9] font-semibold text-brand-blue",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-4 border-t border-[#E2E8F0] pt-6">
              <div className="flex items-start gap-3 px-2">
                <Phone className="h-5 w-5 shrink-0 text-brand-blue mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#64748B]">Call / WhatsApp</p>
                  <a href={`tel:${SITE.phone}`} className="block truncate text-sm font-medium text-[#0F172A] hover:text-brand-blue">
                    {SITE.phoneDisplay}
                  </a>
                  <a href={`tel:${SITE.phone2}`} className="block truncate text-sm font-medium text-[#0F172A] hover:text-brand-blue">
                    {SITE.phone2Display}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 px-2">
                <Mail className="h-5 w-5 shrink-0 text-brand-blue mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#64748B]">Email &amp; Instagram</p>
                  <a href={`mailto:${SITE.email}`} className="block break-all text-sm font-medium text-[#0F172A] hover:text-brand-blue">
                    {SITE.email}
                  </a>
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-[#0F172A] hover:text-brand-blue">
                    @{SITE.instagramHandle}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2">
                <Clock className="h-5 w-5 shrink-0 text-brand-blue" />
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#64748B]">Service Hours</p>
                  <p className="text-sm font-medium text-[#0F172A]">24/7 Available</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <Link
                href="/book"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-light"
              >
                Book Now
              </Link>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-light"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
