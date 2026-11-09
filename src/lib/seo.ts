import type { Metadata } from "next";
import { SITE } from "@/constants/site";

const LOGO_URL = `${SITE.url}${SITE.logo}`;
const DEFAULT_OG_IMAGE = {
  url: LOGO_URL,
  width: 1200,
  height: 630,
  alt: `${SITE.name} - ${SITE.tagline}`,
};

const ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "Shop no 1, Morya Travels, Hinjawadi - Aundh Rd, Bhumkar Wasti, Bhumkar Chowk, Wakad",
  addressLocality: "Pimpri-Chinchwad",
  addressRegion: "Maharashtra",
  postalCode: "411057",
  addressCountry: "IN",
} as const;

const CONTACT_POINT = {
  "@type": "ContactPoint" as const,
  telephone: SITE.phoneDisplay,
  contactType: "customer service",
  availableLanguage: ["en", "hi", "mr"],
  areaServed: "Maharashtra, IN",
} as const;

export const LANGUAGES = [
  { code: "en-IN", label: "English", href: "/" },
  { code: "hi-IN", label: "हिन्दी", href: "/" },
  { code: "mr-IN", label: "मराठी", href: "/" },
] as const;

export const SEO = {
  siteName: SITE.name,
  defaultTitle: `${SITE.name} | Outstation Cabs, Airport Transfers, Tempo Traveller in Pune`,
  defaultDescription:
    "Book reliable cabs, airport transfers, pilgrimage trips and group travel in Pune & Maharashtra. 24/7 service, clean AC vehicles, professional verified drivers, transparent pricing since 2011.",
  url: SITE.url,
  logo: LOGO_URL,
  phone: SITE.phoneDisplay,
  phone2: SITE.phone2Display,
  email: SITE.email,
  address: SITE.address,
  whatsapp: SITE.whatsapp,
};

export function absoluteUrl(path: string) {
  return `${SITE.url}${path}`;
}

export function buildMetadata(options: {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: { url: string; width?: number; height?: number; alt?: string };
  ogType?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const image = options.ogImage ?? DEFAULT_OG_IMAGE;
  const canonical = options.canonical ?? "/";
  const langAlternates: Record<string, string> = {};
  LANGUAGES.forEach((l) => { langAlternates[l.code] = absoluteUrl(l.href); });
  return {
    title: options.title,
    description: options.description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: absoluteUrl(canonical),
      languages: langAlternates,
    },
    openGraph: {
      title: options.title,
      description: options.description,
      type: options.ogType ?? "website",
      url: absoluteUrl(canonical),
      siteName: SITE.name,
      locale: "en_IN",
      images: [{ url: image.url, width: image.width ?? 1200, height: image.height ?? 630, alt: image.alt ?? options.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [image.url],
    },
    robots: options.noIndex ? { index: false, follow: false } : { index: true, follow: true },
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
}

/** Organization + LocalBusiness JSON-LD for the homepage/layout */
export function organizationSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: "Morya Travels",
      url: SITE.url,
      logo: LOGO_URL,
      image: LOGO_URL,
      description: SEO.defaultDescription,
      telephone: SITE.phoneDisplay,
      email: SITE.email,
      address: ADDRESS,
      contactPoint: [CONTACT_POINT],
      sameAs: [SITE.instagram, SITE.whatsapp, SITE.whatsapp2],
      foundingDate: SITE.established,
      founder: [{ "@type": "Person", name: SITE.owner }],
      areaServed: [
        { "@type": "City", name: "Pune" },
        { "@type": "State", name: "Maharashtra" },
        { "@type": "Country", name: "IN" },
      ],
      serviceType: [
        "Taxi service",
        "Car rental",
        "Airport transfer",
        "Outstation cabs",
        "Pilgrimage tours",
        "Corporate travel",
        "Tempo Traveller rental",
      ],
      priceRange: "₹₹",
    },
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      logo: LOGO_URL,
      image: LOGO_URL,
      description: SEO.defaultDescription,
      telephone: SITE.phoneDisplay,
      email: SITE.email,
      priceRange: "₹₹",
      address: ADDRESS,
      contactPoint: [CONTACT_POINT],
      areaServed: "Maharashtra",
      openingHours: "Mo-Su 00:00-23:59",
      serviceType: ["Outstation cabs", "Airport taxi", "Pilgrimage cab", "Corporate cab", "Tempo Traveller on rent"],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: 120,
        bestRating: 5,
        worstRating: 1,
      },
    },
  ];
}

/** FAQPage schema for FAQ rich snippets */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** BreadcrumbList JSON-LD */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : absoluteUrl(item.url),
    })),
  };
}

export const breadcrumbSchema = breadcrumbJsonLd;


/** Service schema for service detail pages */
export function serviceSchema(service: {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  fare: string;
  fareUnit: string;
  image: string;
  places?: string[];
}) {
  const price = service.fare.replace(/[^\d.]/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/services/${service.id}#service`,
    serviceType: service.title,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: [{ "@type": "City", name: "Pune" }, { "@type": "State", name: "Maharashtra" }],
    description: service.shortDescription,
    image: service.image.startsWith("http") ? service.image : `${SITE.url}${service.image}`,
    offers: {
      "@type": "Offer",
      price: price || "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      seller: { "@id": `${SITE.url}/#organization` },
    },
    category: service.category,
    ...(service.places?.length
      ? {
          serviceLocation: {
            "@type": "Place",
            name: "Pune & Maharashtra tourist destinations",
            address: ADDRESS,
          },
        }
      : {}),
  };
}

/** Product schema for vehicle detail pages */
export function vehicleSchema(vehicle: {
  id: string;
  name: string;
  type: string;
  seats: number;
  ac: boolean;
  luggage: number;
  ratePerKm: number;
  minKm: number;
  packageRate?: number;
  image: string;
  features: string[];
}) {
  const isTempo = vehicle.type === "tempo";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.url}/fleet/${vehicle.id}#product`,
    name: vehicle.name,
    description: `Rent ${vehicle.name} (${vehicle.seats + 1} seats, ${
      vehicle.ac ? "AC" : "Non-AC"
    }) for outstation and local travel in Pune and Maharashtra from Morya Travels.`,
    brand: { "@type": "Brand", name: SITE.name },
    category: "Car rental",
    image: vehicle.image.startsWith("http") ? vehicle.image : `${SITE.url}${vehicle.image}`,
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/fleet/${vehicle.id}`,
      price: isTempo ? (vehicle.packageRate ?? 0) : vehicle.ratePerKm,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE.url}/#organization` },
      ...(isTempo ? {} : { priceSpecification: { "@type": "UnitPriceSpecification", price: vehicle.ratePerKm, priceCurrency: "INR", unitCode: "KM" } }),
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Seating capacity", value: `${vehicle.seats + 1} passengers` },
      { "@type": "PropertyValue", name: "Air conditioning", value: vehicle.ac ? "Yes" : "No" },
      { "@type": "PropertyValue", name: "Luggage capacity", value: `${vehicle.luggage} bags` },
      { "@type": "PropertyValue", name: "Minimum run", value: `${vehicle.minKm} km/day` },
      { "@type": "PropertyValue", name: "Vehicle type", value: vehicle.type },
    ],
  };
}

/** WebSite schema with search action */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/book?{search_string}`,
      "query-input": "required name=search_string",
    },
  };
}

/** LocalBusiness contact schema for contact page */
export function contactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/contact#business`,
    name: SITE.name,
    image: LOGO_URL,
    url: `${SITE.url}/contact`,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    address: ADDRESS,
    contactPoint: [CONTACT_POINT],
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₹₹",
    areaServed: "Maharashtra",
    sameAs: [SITE.instagram, SITE.whatsapp, SITE.whatsapp2],
  };
}




