import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Cab",
  description:
    "Book your cab in four simple steps — choose your route, date and vehicle, then confirm your enquiry on WhatsApp.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
