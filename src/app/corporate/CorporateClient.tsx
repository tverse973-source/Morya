"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE, whatsappUrl } from "@/constants/site";
import { cn } from "@/lib/utils";
import { organizationSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Check, Building2, Users, Shield, Clock, FileText, Headphones, Globe, Briefcase, Rocket, Star } from "lucide-react";

const corporateJsonLd = organizationSchema();

const FEATURES = [
  {
    icon: Building2,
    title: "GST Invoices",
    desc: "Compliant billing for every trip",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: Users,
    title: "Dedicated Manager",
    desc: "Single point of contact",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Round-the-clock support",
    color: "text-accent-gold",
    bg: "bg-accent-gold/10",
    border: "border-accent-gold/20",
  },
  {
    icon: Shield,
    title: "Vetted Drivers",
    desc: "Background-verified chauffeurs",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: FileText,
    title: "Monthly Reports",
    desc: "Detailed usage & cost reports",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: Headphones,
    title: "Priority Support",
    desc: "Fast response for corporates",
    color: "text-accent-gold",
    bg: "bg-accent-gold/10",
    border: "border-accent-gold/20",
  },
];

const PLANS = [
  {
    name: "Silver",
    rides: "Up to 50 rides/month",
    price: "₹11/km",
    highlight: false,
    features: ["GST-compliant invoices", "Standard support", "Email reporting", "Monthly billing"],
  },
  {
    name: "Gold",
    rides: "Up to 150 rides/month",
    price: "₹10/km",
    highlight: true,
    features: ["GST-compliant invoices", "Dedicated manager", "Priority support", "Monthly & quarterly reports", "Flexible billing cycles"],
  },
  {
    name: "Platinum",
    rides: "250+ rides/month",
    price: "Custom pricing",
    highlight: false,
    features: ["GST-compliant invoices", "Dedicated manager", "24/7 priority support", "Custom reports & analytics", "Negotiated rates", "SLA-backed service"],
  },
];

const STATS = [
  { value: "500+", label: "Corporate Clients" },
  { value: "10K+", label: "Monthly Rides" },
  { value: "99%", label: "On-Time Arrivals" },
  { value: "24/7", label: "Dedicated Support" },
];

const BENEFITS = [
  {
    icon: Rocket,
    title: "Employee Shuttle",
    desc: "Reliable daily commute for your workforce across Pune and PCMC.",
  },
  {
    icon: Briefcase,
    title: "Client Pickup & Drop",
    desc: "Impress clients with premium, on-time airport and meeting transfers.",
  },
  {
    icon: Globe,
    title: "Outstation Trips",
    desc: "Corporate travel to Shirdi, Nashik, Goa, and beyond with GST billing.",
  },
  {
    icon: Star,
    title: "Expense Tracking",
    desc: "Detailed monthly reports for seamless finance reconciliation.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rohan Deshmukh",
    role: "Operations Head, TechFirm Pune",
    text: "Morya has transformed our employee commute. Punctual, professional, and GST-compliant billing every month.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Admin Manager, GlobalCorp",
    text: "The dedicated manager makes everything seamless. Client pickups are always on time and the vehicles are impeccable.",
    rating: 5,
  },
];

export default function CorporateClient() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Corporate Travel", href: "/corporate" },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative py-8 md:py-10 overflow-hidden bg-white">
        <div className="container-page relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#0F172A] tracking-tight mb-2 leading-tight"
          >
            Move your team,<br />
            <span className="text-brand-blue">effortlessly.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl text-lg text-[#64748B] mb-3 leading-relaxed"
          >
            Reliable, scalable transport solutions for your business. From employee shuttles to client pickups, we handle your corporate mobility with care.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <AnimatedButton variant="gold" size="lg" href="/contact">
              Enquire Now
            </AnimatedButton>
            <AnimatedButton variant="ghost" size="lg" href="/fleet">
              View Fleet
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="container-page py-4 md:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.span
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-display font-bold text-[#0F172A] mb-1"
                >
                  {s.value}
                </motion.span>
                <p className="text-sm text-[#64748B] font-body">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Companies Choose Us */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-page">
          <SectionTitle
            title="Why Companies Choose Us"
            subtitle="Trusted by growing businesses for reliable, compliant corporate mobility."
            className="mx-auto max-w-2xl text-center mb-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <GlassCard
                  className={`p-6 rounded-2xl border ${f.border} shadow-sm hover:border-brand-blue transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center ${f.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-[#0F172A] mb-2">{f.title}</h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 md:py-12 bg-[#F8FAFC]">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-display font-bold text-[#0F172A] mb-4 leading-tight"
              >
                Built for <span className="text-brand-blue">corporate needs.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-[#64748B] mb-6 leading-relaxed"
              >
                Streamline your business travel with dedicated vehicles, vetted drivers, and transparent GST-compliant billing. Focus on your work while we handle the commute.
              </motion.p>
              <div className="space-y-4">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#0F172A] mb-1">{b.title}</h4>
                      <p className="text-sm text-[#64748B] leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <GlassCard className="p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:border-brand-blue transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                  <Rocket className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-[#0F172A] mb-2">End-to-End Management</h4>
                <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                  From booking to billing, we handle the complete corporate travel lifecycle with dedicated support.
                </p>
                <div className="flex items-center gap-3 text-sm text-[#64748B]">
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-blue" />Real-time tracking</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-blue" />Automated reports</div>
                </div>
              </GlassCard>
              <GlassCard className="p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:border-brand-blue transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-[#0F172A] mb-2">Safety & Compliance</h4>
                <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                  All vehicles GPS-enabled, drivers background-verified, and fully compliant with transport regulations.
                </p>
                <div className="flex items-center gap-3 text-sm text-[#64748B]">
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-blue" />GPS tracking</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-blue" />Driver verification</div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Plans */}
      <section className="py-8 md:py-12 border-t border-[#E2E8F0] bg-white">
        <div className="container-page">
          <SectionTitle
            title="Corporate Plans"
            subtitle="Flexible pricing designed for teams of every size."
            className="mx-auto max-w-2xl text-center mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "rounded-2xl p-6 bg-white",
                  p.highlight
                    ? "border border-brand-blue bg-brand-blue/5 shadow-[0_0_40px_rgba(30,79,216,0.15)] relative"
                    : "border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300"
                )}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-body font-bold tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}
                <h4 className="text-2xl font-display font-bold text-[#0F172A] mb-2">{p.name}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-mono font-bold text-brand-blue">{p.price}</span>
                  <span className="text-sm text-[#64748B]">/km</span>
                </div>
                <p className="text-sm text-[#64748B] mb-6">{p.rides}</p>
                <ul className="space-y-3 mb-6">
                  {p.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#64748B]">
                      <Check className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <AnimatedButton
                  variant={p.highlight ? "blue" : "gold"}
                  size="md"
                  className="w-full"
                  href="/contact"
                >
                  Get Started
                </AnimatedButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 md:py-12 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="container-page">
          <SectionTitle
            title="Trusted by Businesses"
            subtitle="What our corporate clients say about us."
            className="mx-auto max-w-2xl text-center mb-4"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <GlassCard
                key={t.name}
                className="rounded-2xl p-6 border-[#E2E8F0] shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= t.rating ? "text-accent-gold" : "text-[#E2E8F0]"}`}
                    />
                  ))}
                </div>
                <p className="text-base text-[#0F172A] leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-display font-bold text-[#0F172A]">{t.name}</h4>
                    <p className="text-sm text-[#64748B]">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-brand-blue">
        <div className="container-page text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Ready to partner with us?</h2>
          <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto">
            Contact {SITE.phoneDisplay} or email {SITE.email} for a custom corporate plan tailored to your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton variant="gold" size="lg" href="/contact">
              Contact Sales
            </AnimatedButton>
            <a href={whatsappUrl("Hi Morya Travels, I would like to enquire about corporate travel plans for my company. Please share plan details and pricing.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white text-[#0F172A] font-body font-semibold hover:bg-[#F1F5F9] transition-colors">
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}