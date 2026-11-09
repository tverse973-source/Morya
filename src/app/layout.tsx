import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SITE } from "@/constants/site";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/DynamicScrollProgress";
import { organizationSchema, webSiteSchema } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit-src",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-src",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-src",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Morya Travels | Outstation Cabs, Airport Transfers, Tempo Traveller",
    template: "%s | Morya Travels",
  },
  description: "Book reliable cabs, airport transfers, pilgrimage trips, and group travel in Pune & Maharashtra. 24/7 service, clean vehicles, professional drivers.",
  alternates: { canonical: SITE.url },
  icons: {
    icon: SITE.logo,
    apple: SITE.logo,
  },
  openGraph: {
    title: "Morya Travels",
    description: "Your trusted travel partner in Pune — outstation cabs, airport transfers, pilgrimage and group travel.",
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    images: [{ url: SITE.logo, width: 1254, height: 1254, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morya Travels",
    description: "Your trusted travel partner in Pune — outstation cabs, airport transfers, pilgrimage and group travel.",
    images: [SITE.logo],
  },
  robots: { index: true, follow: true },
  ...(Object.fromEntries(
    [
      ["google-site-verification", process.env.NEXT_PUBLIC_GSC_VERIFICATION],
      ["msvalidate.01", process.env.NEXT_PUBLIC_BING_VERIFICATION],
    ].filter(([, value]) => Boolean(value)),
  ).length
    ? {
        other: Object.fromEntries(
          [
            ["google-site-verification", process.env.NEXT_PUBLIC_GSC_VERIFICATION],
            ["msvalidate.01", process.env.NEXT_PUBLIC_BING_VERIFICATION],
          ].filter(([, value]) => Boolean(value)),
        ),
      }
    : {}),
};

const businessJsonLd = [...organizationSchema(), webSiteSchema()];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased theme-light`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-text-primary selection:bg-brand-blue/30 transition-colors duration-300"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <ScrollProgress />
        <header className="sticky top-0 z-50 w-full">
          <TopBar />
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
