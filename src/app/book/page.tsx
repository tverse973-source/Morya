import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import BookClient from "./BookClient";

export const metadata: Metadata = buildMetadata({
  title: "Book Your Ride — Pune Cab, Airport Transfer & Outstation Booking",
  description:
    "Book reliable cabs in Pune — outstation tours, airport transfers, pilgrimage and group travel. Simple booking request with transparent fare confirmation.",
  canonical: "/book",
});

export default function BookPage() {
  return <BookClient />;
}
