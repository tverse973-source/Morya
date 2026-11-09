import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Travel",
  description:
    "Reliable corporate cab solutions in Pune — dedicated vehicles, monthly plans and employee transport tailored to your business.",
  alternates: { canonical: "/corporate" },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
