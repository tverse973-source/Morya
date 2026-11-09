"use client";

import { motion } from "framer-motion";
import { Shield, Truck, MapPin, Users, CheckCircle, Rocket } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const FEATURES = [
  { 
    icon: MapPin, 
    label: "GPS Equipped Vehicles", 
    text: "All vehicles are equipped with GPS for easy navigation and your safety throughout the journey.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Truck, 
    label: "Free Home Pickup & Drop", 
    text: "We provide free home pickup and drop service for your convenience within Pune city limits.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: CheckCircle, 
    label: "Economical & Reliable", 
    text: "Affordable tour packages with reliable service. No hidden charges or surprise fees.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Shield, 
    label: "Safe & Comfortable Journey", 
    text: "Comfortable and safe journey guaranteed with well-maintained, clean vehicles.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Rocket, 
    label: "Pre-Trip Vehicle Check", 
    text: "We test all cabs before sending them to ensure they are road-ready and trouble-free.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Users, 
    label: "Well Trained Drivers", 
    text: "Professional, courteous, and well-trained drivers who prioritize your safety and comfort.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="container-page relative z-10">
        <SectionTitle
          title="The Morya Advantage"
          subtitle="Setting the gold standard in premium travel services across Maharashtra."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SpotlightCard className="h-full border-border-light bg-white hover:border-brand-blue/20 transition-colors group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-[#0F172A] text-lg mb-3">{feature.label}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{feature.text}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
