"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface LightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export function Lightbox({ src, alt, open, onClose }: LightboxProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0F172A]/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80vh] w-[92vw] max-w-5xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="92vw"
              unoptimized
              className="rounded-xl object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
