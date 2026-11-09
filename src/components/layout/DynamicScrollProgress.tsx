"use client";

import dynamic from "next/dynamic";

const ScrollProgress = dynamic(
  () => import("@/components/ui/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false }
);

export default ScrollProgress;
