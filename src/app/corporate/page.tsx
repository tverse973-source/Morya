import { buildMetadata } from "@/lib/seo";
import CorporateClient from "./CorporateClient";

export const metadata = buildMetadata({
  title: "Corporate Travel Solutions — Employee Shuttle & Client Pickups in Pune",
  description:
    "Reliable, scalable corporate transport solutions in Pune — employee shuttles, client pickups, outstation trips with GST-compliant invoices and dedicated managers.",
  canonical: "/corporate",
});

export default function CorporatePage() {
  return <CorporateClient />;
}
