"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

const serviceTags = [
  "Vehicles are equipped with GPS for easy navigation and your safety",
  "We provide free home pickup and drop where applicable",
  "Economical and reliable service",
  "Comfortable and safe journey guaranteed",
  "We check vehicles before dispatch",
  "We have well-trained drivers",
  "We provide efficient, timely service",
];

const stats = [
  { label: "Established", value: "2011" },
  { label: "Well Trained Drivers", value: "50+" },
  { label: "Vehicles in Fleet", value: "100+" },
  { label: "Happy Customers", value: "5K+" },
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 aspect-[16/9] w-full">
        <SafeImage
          src="/images/brand/about-journeys.png"
          alt="Morya Travels journey"
          sizes="100vw"
          className="block h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white" />
      </div>
      <div className="container-page relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-white">
              <div className="relative aspect-[16/10] w-full">
                <SafeImage
                  src="/images/brand/about-cover.jpg"
                  alt="Morya Travels cab service"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="block h-full w-full object-cover object-center bg-white"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[#E2E8F0] bg-white p-5">
                  <div className="text-2xl font-display font-bold text-[#0F172A]">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/10 bg-brand-blue/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-blue">
              About Us
            </div>

            <h2 className="text-3xl font-display font-bold leading-tight tracking-tight text-[#0F172A] md:text-5xl">
              Welcome To Morya Travels
            </h2>

            <p className="text-base leading-7 text-[#475569] md:text-lg">
              We offer affordable tour packages for everyone to enjoy cheerful moments and unforgettable experiences.
              Customer satisfaction is our priority.
            </p>

            <div className="space-y-3">
              {serviceTags.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#334155] shadow-sm"
                >
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3B72FF]"
            >
              Know more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
