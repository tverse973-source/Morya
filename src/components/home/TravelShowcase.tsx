"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Compass, ShieldCheck, Clock3, MapPinned } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Smart route planning",
    text: "Best route based on time, traffic, and comfort so every journey feels effortless.",
  },
  {
    icon: ShieldCheck,
    title: "Safety first",
    text: "Verified drivers, maintained vehicles, and transparent support on every ride.",
  },
  {
    icon: Clock3,
    title: "On-time reliability",
    text: "We plan, confirm, and keep your schedule on track without last-minute surprises.",
  },
  {
    icon: MapPinned,
    title: "Made for Maharashtra",
    text: "Pilgrimage tours, airport rides, family trips, and weekend escapes all covered.",
  },
];

const locations = [
  { src: "/images/locations/location-01.jpg", name: "Lonavala, Pune" },
  { src: "/images/locations/location-02.jpg", name: "Gateway of India, Mumbai" },
  { src: "/images/locations/location-03.jpg", name: "Dahdushet Ganpati, Pune" },
  { src: "/images/locations/location-04.jpg", name: "Maharashtra Top Places" },
  { src: "/images/locations/location-05.jpg", name: "Aare Vare Beach" },
  { src: "/images/locations/location-06.jpg", name: "Saibaba Mandir, Shirdi" },
  { src: "/images/locations/location-07.jpg", name: "Bhimashankar" },
  { src: "/images/locations/location-08.jpg", name: "Mahabaleshwar" },
  { src: "/images/locations/location-09.jpg", name: "Ganpati Pule" },
  { src: "/images/locations/location-10.jpg", name: "Goa" },
  { src: "/images/locations/location-11.jpg", name: "Tamhini Ghat" },
  { src: "/images/locations/location-12.jpg", name: "Raigad" },
];

export function TravelShowcase() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % locations.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(30,79,216,0.06),transparent_50%)]" />
      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/10 bg-brand-blue/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-blue">
              Premium experience
            </div>

            <h2 className="text-3xl font-display font-bold leading-tight tracking-tight text-[#0F172A] md:text-5xl">
              Designed for smoother, calmer travel.
            </h2>

            <p className="text-lg leading-relaxed text-[#64748B] md:text-xl">
              Well-maintained vehicles, verified drivers, and transparent pricing so you can relax while we handle the journey.
            </p>

            <div className="space-y-5 pt-2">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/5 text-brand-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold leading-tight text-[#0F172A]">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{feature.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

<motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative aspect-[16/9] md:aspect-[4/3]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[#f5c76a]/20 blur-[60px] transition-colors duration-700 group-hover:bg-[#f5c76a]/30" />
            <div className="relative h-full overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-[#F8FAFC] shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
              <SafeImage
                src={locations[index].src}
                alt={locations[index].name}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="block h-full w-full object-cover object-center transition-opacity duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0F172A]/90 to-transparent p-6">
                <h3 className="font-display text-lg font-bold leading-tight text-white md:text-xl">{locations[index].name}</h3>
              </div>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {locations.map((loc, i) => (
                  <button
                    key={loc.src}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                    aria-label={`Go to ${loc.name}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
