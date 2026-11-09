"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Calendar, Truck, Route, Package, ConciergeBell, Home, LogOut } from "lucide-react";

const navItems = [
  { href: "/morya-admin-hq-9x", label: "Dashboard", icon: LayoutDashboard },
  { href: "/morya-admin-hq-9x/bookings", label: "Bookings", icon: Calendar },
  { href: "/morya-admin-hq-9x/fleet", label: "Fleet", icon: Truck },
  { href: "/morya-admin-hq-9x/routes", label: "Routes", icon: Route },
  { href: "/morya-admin-hq-9x/packages", label: "Packages", icon: Package },
  { href: "/morya-admin-hq-9x/services", label: "Services", icon: ConciergeBell },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLogin = pathname === "/morya-admin-hq-9x/login";

  if (isLogin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <Link href="/morya-admin-hq-9x" className="font-display text-lg font-bold text-slate-900">
          Morya Admin
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-0 z-20 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:static md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center border-b border-slate-200 px-6">
            <Link href="/morya-admin-hq-9x" className="font-display text-lg font-bold text-slate-900">
              Morya Travels
            </Link>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const active = item.href === "/morya-admin-hq-9x" ? pathname === "/morya-admin-hq-9x" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active ? "bg-brand-blue text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-slate-200 p-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Home className="h-5 w-5 shrink-0" />
              View site
            </Link>
            <form action="/api/morya-admin-hq-9x/logout" method="post" className="mt-1">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Logout
              </button>
            </form>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-10 bg-slate-900/30 md:hidden"
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}