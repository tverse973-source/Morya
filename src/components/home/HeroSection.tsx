"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const TRIP_TYPES = ["One way", "Round trip", "Airport transfer", "Corporate", "Pilgrimage"];

type ShowcaseCar = {
  name: string;
  tag: string;
  image: string;
  accent: string;
  rate: string;
  seats: string;
};

const CARS: ShowcaseCar[] = [
  {
    name: "Swift Dzire",
    tag: "Economy",
    image: "/images/fleet/maruti-swift-dzire.png",
    accent: "#86efac",
    rate: "₹12/km",
    seats: "4 + 1",
  },
  {
    name: "Toyota Etios",
    tag: "Comfort",
    image: "/images/fleet/toyota-etios.png",
    accent: "#7ec8ff",
    rate: "₹12-13/km",
    seats: "4 + 1",
  },
  {
    name: "Suzuki Ertiga",
    tag: "Family MUV",
    image: "/images/fleet/maruti-suzuki-sedan.png",
    accent: "#38bdf8",
    rate: "₹14-15/km",
    seats: "6 + 1",
  },
  {
    name: "Toyota Innova",
    tag: "Best seller",
    image: "/images/fleet/toyota-innova.png",
    accent: "#93c5fd",
    rate: "₹19-20/km",
    seats: "6+1 / 7+1",
  },
  {
    name: "Kia Carens",
    tag: "Modern comfort",
    image: "/images/fleet/kia-carens.png",
    accent: "#c4b5fd",
    rate: "₹16-17/km",
    seats: "6+1 / 7+1",
  },
  {
    name: "Toyota Innova Crysta",
    tag: "Premium",
    image: "/images/fleet/toyota-innova-crysta.png",
    accent: "#f5c76a",
    rate: "₹19-20/km",
    seats: "4 + 1",
  },
  {
    name: "Mini Bus",
    tag: "Group",
    image: "/images/fleet/tempo-traveller-13-seater.png",
    accent: "#a5b4fc",
    rate: "₹24-28/km",
    seats: "6 + 1",
  },
  {
    name: "Tempo Traveller",
    tag: "Group travel",
    image: "/images/fleet/tempo-traveller-17-seater.png",
    accent: "#fdba74",
    rate: "₹25-28/km",
    seats: "6+1 / 7+1",
  },
];

export function HeroSection() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    date: "",
    tripType: "One way",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % CARS.length), 3600);
    return () => window.clearInterval(id);
  }, []);

  const car = CARS[active];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          pickup: form.pickup,
          dropoff: form.destination,
          date: form.date,
          tripType: form.tripType,
          passengers: form.details,
          details: form.details,
          source: "website",
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setForm({
          name: "",
          phone: "",
          pickup: "",
          destination: "",
          date: "",
          tripType: "One way",
          details: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#05080d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(245,199,107,0.22),transparent_18%),radial-gradient(circle_at_80%_70%,rgba(71,110,255,0.2),transparent_28%),linear-gradient(90deg,rgba(4,8,13,0.88)_0%,rgba(4,8,13,0.72)_34%,rgba(4,8,13,0.8)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,13,0.05)_0%,rgba(4,8,13,0.40)_35%,rgba(4,8,13,0.82)_100%)]" />

      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:68px_68px] [mask-image:linear-gradient(180deg,transparent_0%,black_18%,black_82%,transparent_100%)]" />

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 pb-14 pt-8 md:px-6 lg:px-8 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.04fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="pt-2"
          >
            <h1 className="text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] tracking-[-0.065em] text-[#f9f7f3]">
              Welcome to
              <span className="block bg-[linear-gradient(90deg,#f7d98c_0%,#fbf0d2_40%,#b7d5ff_100%)] bg-clip-text text-transparent">
                Morya Travels
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#dfe9f6] md:text-lg">
              Airport transfers, weekend escapes, pilgrimages, and family travel with safe drivers, premium cars, and a smooth booking experience from start to finish.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/book")}
                className="group inline-flex items-center gap-2 rounded-full bg-[#f5c76a] px-6 py-3.5 text-sm font-bold text-[#17120b] shadow-[0_18px_45px_rgba(245,199,107,0.32)] transition hover:bg-[#ffe2a5]"
              >
                Book your ride
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={() => router.push("/fleet")}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-[#f8f9fb] backdrop-blur-sm transition hover:border-[#f5c76a]/40 hover:text-[#f7d68d]"
              >
                View fleet
              </button>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#dfe9f6]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#f5c76a]" />
                Verified drivers
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-[#f5c76a] text-[#f5c76a]" />
                4.9 rated service
              </div>
            </div>
          </motion.div>

          <div className="relative flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative w-full max-w-[720px] flex justify-center items-center mt-4"
              >
                <div className="relative w-full h-[340px] md:h-[420px] w-full max-w-full">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    priority
                    className="object-contain md:scale-[1.05]"
                    sizes="(max-width: 768px) 560px, 760px"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-2 w-full mt-4">
            <motion.form
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-white/10 bg-[#0b1119]/70 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl w-full"
            >
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                <label className="space-y-1.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ccd7ea]">Full Name</span>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-[#f5c76a]/35">
                    <Users className="h-4 w-4 text-[#f5c76a]" />
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-transparent text-sm text-white placeholder:text-[#8f9db1] outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-1.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ccd7ea]">Mobile Number</span>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-[#f5c76a]/35">
                    <span className="text-sm font-semibold text-[#f5c76a]">+91</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Mobile number"
                      className="w-full bg-transparent text-sm text-white placeholder:text-[#8f9db1] outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-1.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ccd7ea]">Pickup Point</span>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-[#f5c76a]/35">
                    <MapPin className="h-4 w-4 text-[#f5c76a]" />
                    <input
                      value={form.pickup}
                      onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                      placeholder="Pickup location"
                      className="w-full bg-transparent text-sm text-white placeholder:text-[#8f9db1] outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-1.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ccd7ea]">Destination</span>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-[#f5c76a]/35">
                    <MapPin className="h-4 w-4 text-[#f5c76a]" />
                    <input
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      placeholder="Drop location"
                      className="w-full bg-transparent text-sm text-white placeholder:text-[#8f9db1] outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-1.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ccd7ea]">Travel Date</span>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-[#f5c76a]/35">
                    <CalendarDays className="h-4 w-4 text-[#f5c76a]" />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
                    />
                  </div>
                </label>

                <label className="space-y-1.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ccd7ea]">Trip Type</span>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-[#f5c76a]/35">
                    <select
                      value={form.tripType}
                      onChange={(e) => setForm({ ...form, tripType: e.target.value })}
                      className="w-full bg-transparent text-sm text-white outline-none"
                    >
                      {TRIP_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-[#0f151e]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              {submitStatus === "success" ? (
                <div className="mt-4 flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-[#f5c76a]/30 bg-[#f5c76a]/10 text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5c76a]/20 text-[#f5c76a]">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-white">Enquiry sent successfully</h3>
                  <p className="text-sm text-[#dfe9f6]">We&rsquo;ve received your booking request. Our team will contact you shortly on {form.phone}.</p>
                </div>
              ) : (
                <>
                  <div className="mt-4 flex flex-col gap-4">
                    <label className="space-y-1.5">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ccd7ea]">Message / Details</span>
                      <textarea
                        value={form.details}
                        onChange={(e) => setForm({ ...form, details: e.target.value })}
                        rows={2}
                        placeholder="Passengers, preferred car, pickup time..."
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-[#8f9db1] outline-none focus:border-[#f5c76a]/35"
                      />
                    </label>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5c76a] px-5 py-2.5 text-sm font-bold text-[#17120b] transition hover:bg-[#ffe0a3] shadow-[0_18px_45px_rgba(245,199,107,0.32)] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Sending..." : "Send Enquiry"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {submitStatus === "error" && (
                    <div className="mt-3 p-3 rounded-xl border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-sm">
                      Failed to send enquiry. Please try again.
                    </div>
                  )}
                </>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
