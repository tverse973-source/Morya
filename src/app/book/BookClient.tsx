"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FLEET } from "@/constants/fleet";
import { SITE, whatsappUrl } from "@/constants/site";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, MapPin, MessageCircle, Users, Wallet } from "lucide-react";

const STEPS = ["Trip Details", "Vehicle Selection", "Passenger Info", "Confirm"];
const TRIP_TYPES = ["One way", "Round trip", "Airport transfer", "Pilgrimage", "Corporate"];

function initialState(search: URLSearchParams) {
  const vehicleId = search.get("vehicle") || "";
  const tripType = TRIP_TYPES.includes(search.get("tripType") || "") ? (search.get("tripType") as string) : "One way";
  return {
    pickup: search.get("pickup") || "",
    dropoff: search.get("destination") || search.get("dropoff") || "",
    date: search.get("date") || "",
    passengers: search.get("passengers") || "1-4",
    tripType,
    vehicleId: FLEET.some((v) => v.id === vehicleId) ? vehicleId : "",
    name: "",
    phone: "",
  };
}

function BookPageInner() {
  const search = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [bookingNumber, setBookingNumber] = useState("");
  const [form, setForm] = useState(() => initialState(search));

  const vehicle = useMemo(() => FLEET.find((v) => v.id === form.vehicleId), [form.vehicleId]);
  const progress = ((step + 1) / STEPS.length) * 100;
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.pickup.trim() || !form.dropoff.trim() || !form.date) {
      setSubmitStatus("error");
      setSubmitError("Please complete trip details and passenger information before booking.");
      return;
    }
    setSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          pickup: form.pickup,
          dropoff: form.dropoff,
          date: form.date,
          tripType: form.tripType,
          passengers: form.passengers,
          vehicleId: form.vehicleId || undefined,
          vehicleName: vehicle?.name || undefined,
          details: vehicle ? `Vehicle selected: ${vehicle.name}` : undefined,
          source: "website-booking-page",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; booking?: { booking_number?: string } };
      if (!res.ok) throw new Error(data.error || "Failed to submit booking.");
      setBookingNumber(data.booking?.booking_number || "");
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Failed to submit booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Book a Ride", href: "/book" },
      ]} />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h1 className="mb-3 font-display text-4xl font-bold text-[#0F172A] md:text-5xl">Book Your Ride</h1>
            <p className="text-[#64748B]">Simple booking request. Our team confirms availability, fare, and pickup details.</p>
          </div>

          <ol className="mb-8 flex items-start">
            {STEPS.map((s, i) => (
              <li key={s} className={`flex items-start ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                <div className="flex w-16 shrink-0 flex-col items-center gap-2 sm:w-24">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors ${i < step ? "bg-brand-blue text-white" : i === step ? "bg-accent-gold text-white" : "border border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]"}`}>{i + 1}</div>
                  <span className={`text-center font-body text-[11px] leading-tight sm:text-sm ${i <= step ? "text-[#0F172A]" : "text-[#64748B]"}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`mt-4 h-[2px] flex-1 ${i < step ? "bg-brand-blue" : "bg-[#E2E8F0]"}`} />}
              </li>
            ))}
          </ol>
          <div className="h-2 w-full overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F1F5F9]"><div className="h-full bg-brand-blue transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-8">
          <div className={step === 0 ? "block" : "hidden"}>
            <GlassCard className="rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="mb-6 font-display text-xl font-bold text-[#0F172A]">Trip Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Pickup Location</span><div className="flex items-center gap-2 rounded border border-[#E2E8F0] bg-white px-3 py-2 focus-within:border-brand-blue"><MapPin className="h-4 w-4 text-[#64748B]" /><input type="text" className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none" placeholder="Pune, Maharashtra" value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} /></div></label>
                <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Drop Location</span><div className="flex items-center gap-2 rounded border border-[#E2E8F0] bg-white px-3 py-2 focus-within:border-brand-blue"><MapPin className="h-4 w-4 text-[#64748B]" /><input type="text" className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none" placeholder="Shirdi, Maharashtra" value={form.dropoff} onChange={(e) => setForm({ ...form, dropoff: e.target.value })} /></div></label>
                <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Travel Date</span><div className="flex items-center gap-2 rounded border border-[#E2E8F0] bg-white px-3 py-2 focus-within:border-brand-blue"><Calendar className="h-4 w-4 text-[#64748B]" /><input type="date" className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div></label>
                <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Trip Type</span><select value={form.tripType} onChange={(e) => setForm({ ...form, tripType: e.target.value })} className="rounded border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-brand-blue">{TRIP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
                <label className="flex flex-col gap-2 sm:col-span-2"><span className="font-mono text-xs uppercase text-[#64748B]">Passengers</span><div className="flex items-center gap-2 rounded border border-[#E2E8F0] bg-white px-3 py-2 focus-within:border-brand-blue"><Users className="h-4 w-4 text-[#64748B]" /><select value={form.passengers} onChange={(e) => setForm({ ...form, passengers: e.target.value })} className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none">{["1-4","5-6","7-8","9-13","14-17"].map((p) => <option key={p} value={p}>{p}</option>)}</select></div></label>
              </div>
              <div className="mt-8 flex justify-end"><AnimatedButton variant="gold" size="md" onClick={next} className="w-auto">Next →</AnimatedButton></div>
            </GlassCard>
          </div>

          <div className={step === 1 ? "block" : "hidden"}>
            <GlassCard className="rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="mb-6 font-display text-xl font-bold text-[#0F172A]">Select Vehicle</h2>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FLEET.map((v) => {
                  const selected = form.vehicleId === v.id;
                  const rateText =
                    v.id === "mini-bus"
                      ? "₹24/km | ₹28/km"
                      : v.id === "tempo-traveller"
                        ? "₹25/km | ₹28/km"
                        : v.type === "tempo"
                          ? (v.packageRate != null ? `₹${v.packageRate} pkg` : `₹${v.ratePerKm}/km`)
                          : `₹${v.ratePerKm}/km`;
                  const subText = v.type === "tempo" ? (v.ac ? "AC / Non-AC" : "Non-AC") : `${v.minKm} km`;
                  return (
                    <button key={v.id} type="button" onClick={() => setForm({ ...form, vehicleId: v.id })} className={`overflow-hidden rounded-xl border text-left transition-all ${selected ? "border-brand-blue bg-brand-blue/10 shadow-[0_0_20px_rgba(30,79,216,0.20)]" : "border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1]"}`}>
                      <div className="relative h-28 w-full bg-[#EEF2FF]">
                        <Image src={v.image} alt={v.name} fill className="object-contain p-2" sizes="(max-width: 640px) 100vw, 33vw" />
                      </div>
                      <div className="p-4">
                        <div className="mb-2">
                          <div className="font-bold text-[#0F172A]">{v.name}</div>
                          <div className="font-mono text-xs text-[#64748B]">{v.seats} seats</div>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-mono text-sm font-bold text-brand-blue">{rateText}</span>
                          <span className="font-mono text-xs text-[#64748B] shrink-0">{subText}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between"><AnimatedButton variant="ghost" size="md" onClick={back} className="w-auto">← Back</AnimatedButton><AnimatedButton variant="blue" size="md" onClick={next} className="w-auto">Next →</AnimatedButton></div>
            </GlassCard>
          </div>

          <div className={step === 2 ? "block" : "hidden"}>
            <GlassCard className="rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="mb-6 font-display text-xl font-bold text-[#0F172A]">Passenger Information</h2>
              <div className="space-y-4">
                <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Full Name</span><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] outline-none focus:border-brand-blue" placeholder="Your name" autoComplete="name" /></label>
                <label className="flex flex-col gap-2"><span className="font-mono text-xs uppercase text-[#64748B]">Phone Number</span><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] outline-none focus:border-brand-blue" placeholder="+91 98765 43210" autoComplete="tel" /></label>
              </div>
              <div className="mt-8 flex items-center justify-between"><AnimatedButton variant="ghost" size="md" onClick={back} className="w-auto">← Back</AnimatedButton><AnimatedButton variant="blue" size="md" onClick={next} className="w-auto">Next →</AnimatedButton></div>
            </GlassCard>
          </div>

          <div className={step === 3 ? "block" : "hidden"}>
            <GlassCard className="rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
              {submitStatus === "success" ? (
                <div className="py-4 text-center">
                  <div className="booking-success-ring mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-blue/15">
                    <div className="booking-success-pop flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-blue shadow-[0_10px_30px_rgba(30,79,216,0.35)]">
                      <svg className="booking-success-check h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="booking-success-text mt-6">
                    <h2 className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">Booking Request Sent</h2>
                    {bookingNumber ? <p className="mt-2 font-mono text-sm font-semibold text-brand-blue">Ref: {bookingNumber}</p> : null}
                    <p className="mx-auto mt-3 max-w-md text-sm text-[#64748B]">Thank you{form.name ? `, ${form.name}` : ""}. Our team will contact you shortly to confirm availability and fare.</p>
                    <div className="mx-auto mt-6 max-w-md space-y-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left text-sm text-[#334155]">
                      <div className="flex justify-between gap-3"><span className="text-[#64748B]">Route</span><span className="font-medium text-[#0F172A] text-right">{form.pickup || "—"} → {form.dropoff || "—"}</span></div>
                      <div className="flex justify-between gap-3"><span className="text-[#64748B]">Date</span><span className="font-medium text-[#0F172A]">{form.date || "—"}</span></div>
                      <div className="flex justify-between gap-3"><span className="text-[#64748B]">Trip</span><span className="font-medium text-[#0F172A]">{form.tripType}</span></div>
                      <div className="flex justify-between gap-3"><span className="text-[#64748B]">Passengers</span><span className="font-medium text-[#0F172A]">{form.passengers}</span></div>
                      {vehicle ? <div className="flex justify-between gap-3"><span className="text-[#64748B]">Vehicle</span><span className="font-medium text-[#0F172A]">{vehicle.name}</span></div> : null}
                    </div>
                    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <AnimatedButton variant="gold" size="md" className="w-full sm:w-auto" onClick={() => { setSubmitStatus("idle"); setBookingNumber(""); setStep(0); setForm((f) => ({ ...f, pickup: "", dropoff: "", date: "", name: "", phone: "" })); }}>New Booking</AnimatedButton>
                      <a href={whatsappUrl(`Hi Morya Travels, I submitted a booking request${bookingNumber ? ` (Ref: ${bookingNumber})` : ""}.\n\nPickup: ${form.pickup}\nDrop-off: ${form.dropoff}\nDate: ${form.date}\nTrip type: ${form.tripType}\nPassengers: ${form.passengers}${vehicle ? `\nVehicle: ${vehicle.name}` : ""}\nName: ${form.name}\nPhone: ${form.phone}\n\nPlease confirm availability and fare.`)} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E2E8F0] px-6 py-3 font-body text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#F1F5F9] sm:w-auto"><MessageCircle className="h-4 w-4 shrink-0" /> WhatsApp</a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="mb-6 font-display text-xl font-bold text-[#0F172A]">Confirm Booking Request</h2>
                  <div className="mb-8 space-y-4 text-sm text-[#64748B]">
                    <div className="flex justify-between text-[#0F172A]"><span>Route</span><span>{form.pickup || "—"} → {form.dropoff || "—"}</span></div>
                    <div className="flex justify-between text-[#0F172A]"><span>Date</span><span>{form.date || "Not selected"}</span></div>
                    <div className="flex justify-between text-[#0F172A]"><span>Trip type</span><span>{form.tripType}</span></div>
                    <div className="flex justify-between text-[#0F172A]"><span>Passengers</span><span>{form.passengers}</span></div>
                      {vehicle && <><div className="flex justify-between text-[#0F172A]"><span>Vehicle</span><span>{vehicle.name}</span></div><div className="flex justify-between text-[#0F172A]"><span>Estimated rate</span><span className="font-mono font-bold">{vehicle.id === "mini-bus" ? "₹24/km | ₹28/km" : vehicle.id === "tempo-traveller" ? "₹25/km | ₹28/km" : vehicle.type === "tempo" ? (vehicle.packageRate != null ? `₹${vehicle.packageRate} pkg` : `₹${vehicle.ratePerKm}/km`) : `₹${vehicle.ratePerKm}/km`}</span></div></>}
                  </div>
                  <div className="space-y-3">
                    <AnimatedButton variant="gold" size="lg" className="w-full" disabled={submitting} onClick={handleSubmit}>{submitting ? "Submitting..." : "Submit Booking Request"}</AnimatedButton>
                    <a href={whatsappUrl(`Hi Morya Travels, I would like to request a booking.\n\nPickup: ${form.pickup || "Not specified"}\nDrop-off: ${form.dropoff || "Not specified"}\nDate: ${form.date || "Not selected"}\nTrip type: ${form.tripType}\nPassengers: ${form.passengers}${vehicle ? `\nVehicle: ${vehicle.name}` : ""}\nName: ${form.name || "Not specified"}\nPhone: ${form.phone || "Not specified"}\n\nPlease confirm availability and fare.`)} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E2E8F0] px-6 py-3 font-body text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#F1F5F9]"><MessageCircle className="h-4 w-4 shrink-0" /> Or message us on WhatsApp</a>
                  </div>
                  {submitStatus === "error" && <div className="mt-4 rounded-xl border border-brand-blue/30 bg-brand-blue/10 p-3 text-sm text-brand-blue">{submitError || "Failed to submit booking. Please try again or message us on WhatsApp."}</div>}
                  <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Wallet className="h-4 w-4 text-brand-blue" />Payment</div>
                    <p className="mt-1 text-sm text-[#64748B]">Payment is confirmed by our team after availability/fare confirmation. UPI: <span className="font-medium text-[#0F172A]">{SITE.upi}</span></p>
                    <div className="mt-3 w-full max-w-[180px] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-2"><Image src={SITE.upiQr} alt={`UPI payment QR for ${SITE.name}`} width={180} height={180} className="h-auto w-full rounded-lg" /></div>
                  </div>
                  <div className="mt-6"><AnimatedButton variant="ghost" size="md" onClick={back} className="mx-auto w-auto">← Back</AnimatedButton></div>
                </>
              )}
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookClient() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white px-6 py-16 text-slate-600">Loading booking form...</main>}>
      <BookPageInner />
    </Suspense>
  );
}
