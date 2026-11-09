"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowRight, MessageCircle, ArrowUp } from "lucide-react";
import { whatsappUrl } from "@/constants/site";
import { useRouter } from "next/navigation";

export function FloatingCTA() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const reached = latest > 600;
    setIsVisible(reached);
    setShowTop(latest > 200);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-5 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transition hover:bg-brand-blue-light"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-[100] w-auto"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-border-light bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
              <button
                onClick={() => router.push("/book")}
                className="group flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-xs font-bold text-white transition-all hover:bg-brand-blue-light hover:scale-105 active:scale-95"
              >
                Book Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border-light bg-white px-6 py-3 text-xs font-bold text-text-primary transition-all hover:bg-bg-card hover:scale-105 active:scale-95"
              >
                <MessageCircle className="h-4 w-4 text-brand-blue" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
