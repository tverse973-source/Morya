import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = buildMetadata({
  title: "Contact Morya Travels — Pune Cab Booking & Enquiries",
  description:
    "Contact Morya Travels in Pune for cab bookings, outstation tours, airport transfers and corporate travel. Call +91 89995 14635 or WhatsApp 24/7.",
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Contact", href: "/contact" },
      ]} />
      <ContactClient />
    </div>
  );
}
