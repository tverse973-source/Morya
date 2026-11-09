"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/constants/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // keep hook order stable if scroll behavior is added later; currently not needed
  }, []);

  if (pathname?.startsWith("/morya-admin-hq-9x")) return null;

  const navStyles =
    "sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/95 py-0 shadow-sm backdrop-blur-md transition-all duration-300";

  return (
    <>
      <nav className={navStyles}>
        <div className="container-page flex h-[72px] items-center justify-between gap-3 overflow-visible sm:h-[88px]">
          <Link href="/" className="flex min-w-0 items-center gap-3 shrink-0">
            <Image
              src={SITE.logo}
              alt={`${SITE.name} logo`}
              width={416}
              height={416}
              priority
              className="h-28 w-28 shrink-0 rounded-xl object-contain sm:h-32 sm:w-32"
            />
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-5 lg:flex xl:gap-7">
            <div className="flex items-center gap-5 text-sm font-medium xl:gap-7">
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "whitespace-nowrap text-[#0F172A] transition-colors hover:text-brand-blue",
                      active && "font-semibold text-brand-blue"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/book"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-blue px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-brand-blue-light"
            >
              Book Now
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#0F172A] transition-colors hover:bg-[#F1F5F9] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
