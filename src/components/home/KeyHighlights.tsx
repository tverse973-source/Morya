"use client";

import { motion } from "framer-motion";
import { Building2, CreditCard, Tag, Users } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const HIGHLIGHTS = [
  {
    icon: Tag,
    label: "Economical Transfers",
    text: "Affordable cab rentals with transparent pricing and no hidden charges.",
    color: "bg-[#1E4FD8]/10 text-[#1E4FD8]",
  },
  {
    icon: Building2,
    label: "Car Hire Company in Pune",
    text: "Serving Kharadi, Chandan Nagar, and across Pune with local expertise.",
    color: "bg-[#1E4FD8]/10 text-[#1E4FD8]",
  },
  {
    icon: Users,
    label: "Well Trained Drivers",
    text: "Professional, courteous, and verified drivers who prioritize your safety.",
    color: "bg-[#1E4FD8]/10 text-[#1E4FD8]",
  },
  {
    icon: CreditCard,
    label: "Online Booking",
    text: "Book your ride in seconds through our quick online enquiry form.",
    color: "bg-[#1E4FD8]/10 text-[#1E4FD8]",
  },
];

export function KeyHighlights() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-page relative z-10">
        <SectionTitle
          title="Why Travel With Morya Travels"
          subtitle="Reliable, pocket-friendly car hire services across Pune."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex flex-col items-center text-center p-6 rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#1E4FD8]/30 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-[#0F172A] text-lg mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
