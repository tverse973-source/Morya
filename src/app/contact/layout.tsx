import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, WhatsApp or message Morya Travels for cab bookings in Pune and across Maharashtra. Open 24/7.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
