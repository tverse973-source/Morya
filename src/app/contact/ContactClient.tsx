"use client";

import Image from "next/image";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { SITE, whatsappUrl } from "@/constants/site";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Wallet } from "lucide-react";
import { contactSchema } from "@/lib/seo";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const contactJsonLd = contactSchema();

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setError("Name, phone and message are required.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website-contact" }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Failed to send message.");
      const text = `Hi Morya Travels,\n\nName: ${form.name}\nEmail: ${form.email || "N/A"}\nPhone: ${form.phone}\nMessage: ${form.message}\n\nPlease assist me with this enquiry.`;
      window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <section className="py-12">
        <div className="container-page text-center">
          <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F1F5F9] shadow-sm">
            <SafeImage src="/images/brand/about-cover.jpg" alt="Morya Travels service area in Pune" sizes="(max-width: 900px) 100vw, 80rem" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GlassCard className="rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="mb-4 h-14 w-14 text-brand-blue" />
                <h3 className="mb-2 font-display text-2xl font-bold text-[#0F172A]">Message sent</h3>
                <p className="mb-6 text-sm text-[#64748B]">Your enquiry was saved. We also opened WhatsApp so you can continue the conversation.</p>
                <AnimatedButton variant="blue" size="md" onClick={() => { setForm({ name: "", email: "", phone: "", message: "" }); setSent(false); }}>Send another</AnimatedButton>
              </div>
            ) : (
              <>
                <h3 className="mb-6 font-display text-2xl font-bold text-[#0F172A]">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Name</span><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] outline-none focus:border-brand-blue" placeholder="Your name" /></label>
                    <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] outline-none focus:border-brand-blue" placeholder="you@example.com" /></label>
                  </div>
                  <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Phone</span><input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] outline-none focus:border-brand-blue" placeholder="+91 98765 43210" /></label>
                  <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Message</span><textarea rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] outline-none focus:border-brand-blue" placeholder="Tell us about your trip..." /></label>
                  {error ? <p className="text-sm text-brand-blue">{error}</p> : null}
                  <AnimatedButton variant="gold" size="lg" type="submit" className="w-full" disabled={submitting}>{submitting ? "Sending..." : "Send Message"}</AnimatedButton>
                </form>
              </>
            )}
          </GlassCard>

          <GlassCard className="rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
            <h3 className="mb-6 font-display text-2xl font-bold text-[#0F172A]">Get in touch</h3>
            <div className="space-y-4 text-sm text-[#334155]">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-brand-blue" /><div><p className="font-semibold text-[#0F172A]">Address</p><p className="text-[#64748B]">{SITE.address}</p></div></div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 text-brand-blue" /><div><p className="font-semibold text-[#0F172A]">Phone</p><a href={`tel:${SITE.phone}`} className="text-[#64748B] hover:text-brand-blue">{SITE.phoneDisplay}</a><br /><a href={`tel:${SITE.phone2}`} className="text-[#64748B] hover:text-brand-blue">{SITE.phone2Display}</a></div></div>
              <div className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 text-brand-blue" /><div><p className="font-semibold text-[#0F172A]">Email</p><a href={`mailto:${SITE.email}`} className="text-[#64748B] hover:text-brand-blue">{SITE.email}</a></div></div>
              <div className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 text-brand-blue" /><div><p className="font-semibold text-[#0F172A]">Hours</p><p className="text-[#64748B]">Open 24/7 for bookings and support</p></div></div>
              <div className="flex items-start gap-3"><InstagramIcon className="mt-0.5 h-5 w-5 text-brand-blue" /><div><p className="font-semibold text-[#0F172A]">Instagram</p><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-[#64748B] hover:text-brand-blue">@{SITE.instagramHandle}</a></div></div>
            </div>
            <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Wallet className="h-4 w-4 text-brand-blue" />UPI Payment</div>
              <p className="mt-1 text-sm text-[#64748B]">UPI ID: <span className="font-medium text-[#0F172A]">{SITE.upi}</span></p>
              <div className="mt-4 w-full max-w-[220px] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-2"><Image src={SITE.upiQr} alt={`UPI payment QR for ${SITE.name}`} width={220} height={220} className="h-auto w-full rounded-lg" /></div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
