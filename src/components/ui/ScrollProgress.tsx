"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  if (pathname?.startsWith("/morya-admin-hq-9x")) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-blue"
    />
  );
}
