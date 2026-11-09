import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Choose from sedans, SUVs, luxury cars and tempo travellers — full specifications, seating capacity and transparent per-km rates.",
  alternates: { canonical: "/fleet" },
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
