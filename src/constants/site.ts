// Site-wide constants & contact info
export const SITE = {
  name: "Morya Travels",
  tagline: "Your Journey, Our Responsibility",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://moryatravel.in",
  logo: "/images/brand/morya-travels-logo.png",
  phone: "8999514635",
  phoneDisplay: "+91 89995 14635",
  phone2: "8390466948",
  phone2Display: "+91 83904 66948",
  email: "info@moryatravel.in",
  instagram: "https://instagram.com/moryatravels.in",
  instagramHandle: "moryatravels.in",
  whatsapp: "https://wa.me/918999514635",
  whatsapp2: "https://wa.me/918390466948",
  upi: "8999514635@ibl",
  upiQr: "/images/payments/upi-payment-qr.jpg",
  established: "2011",
  coFounder: "Ritesh Rathod",
  address:
    "Shop no 1, Morya Travels Hinjawadi - Aundh Rd, Bhumkar Wasti, Bhumkar Chowk, Wakad, Pune, Pimpri-Chinchwad, Maharashtra-411057",
};

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Morya Travels, I would like to enquire about a cab booking. Please share availability and fare details.";

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "Packages", href: "/packages" },
  { label: "Corporate", href: "/corporate" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
