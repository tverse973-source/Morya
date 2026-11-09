"use client";

import { useState } from "react";
import { X, Phone, Calendar, MessageCircle, Loader2 } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { whatsappUrl } from "@/constants/site";

interface PackageBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle: string;
}

export function PackageBookingDialog({ isOpen, onClose, packageTitle }: PackageBookingDialogProps) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", passengers: "1-4" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date) {
      setStatus("error");
      setError("Please enter your name, phone number, and travel date.");
      return;
    }
    setSubmitting(true);
    setStatus("idle");
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          pickup: packageTitle,
          dropoff: packageTitle,
          date: form.date,
          tripType: "One way",
          passengers: form.passengers,
          details: `Package booking: ${packageTitle}`,
          source: "website-package-booking",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; booking?: { booking_number?: string } };
      if (!res.ok) throw new Error(data.error || "Failed to submit booking.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to submit booking. Please try again or message us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = `Hi Morya Travels, I would like to book the &ldquo;${packageTitle}&rdquo; package.\n\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date || "Not specified"}\nPassengers: ${form.passengers}\n\nPlease share availability and final fare details.`;

if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Book Package">
      <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-auto">
        <GlassCard className="rounded-2xl border border-[#E2E8F0] shadow-2xl bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">Book &ldquo;{packageTitle}&rdquo;</h2>
            <button type="button" onClick={onClose} className="rounded-full p-1.5 text-[#64748B] hover:bg-[#F1F5F9]"><X className="h-4 w-4" /></button>
          </div>

          {status === "success" ? (
            <div className="px-4 py-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#0F172A]">Booking Request Sent</h3>
              <p className="mt-1 text-xs text-[#64748B]">Thank you{form.name ? `, ${form.name}` : ""}. Our team will contact you shortly.</p>
              <div className="mt-4 flex flex-col gap-2">
                <AnimatedButton variant="ghost" size="sm" onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", date: "", passengers: "1-4" }); onClose(); }} className="w-full">Book Another</AnimatedButton>
                <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E2E8F0] px-4 py-2 font-body text-xs font-semibold text-[#0F172A] transition-colors hover:bg-[#F1F5F9]"><MessageCircle className="h-3.5 w-3.5 shrink-0" /> WhatsApp</a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-4 pb-4">
              <p className="text-xs text-[#64748B] mb-4">Just share your details and we&rsquo;ll take care of the rest.</p>

              <div className="space-y-3">
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase text-[#64748B]">Full Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-brand-blue"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase text-[#64748B]">Phone Number</span>
                  <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 focus-within:border-brand-blue">
                    <span className="text-[#64748B] text-sm">+91</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none"
                      placeholder="98765 43210"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase text-[#64748B]">Travel Date</span>
                  <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 focus-within:border-brand-blue">
                    <Calendar className="h-3.5 w-3.5 text-[#64748B]" />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none"
                      required
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase text-[#64748B]">Passengers</span>
                  <select
                    value={form.passengers}
                    onChange={(e) => setForm({ ...form, passengers: e.target.value })}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-brand-blue"
                  >
                    {["1-4", "5-6", "7-8", "9-13", "14-17"].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>

                {status === "error" && (
                  <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/10 p-2 text-xs text-brand-blue">{error}</div>
                )}
              </div>

              <div className="mt-5 space-y-2">
                <AnimatedButton variant="gold" size="md" type="submit" disabled={submitting} className="w-full py-2.5">
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Book Online"
                  )}
                </AnimatedButton>
                <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E2E8F0] px-4 py-2 font-body text-xs font-semibold text-[#0F172A] transition-colors hover:bg-[#F1F5F9]"><MessageCircle className="h-3.5 w-3.5 shrink-0" /> Or message us on WhatsApp</a>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
