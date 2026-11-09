"use client";

import dynamic from "next/dynamic";

const FloatingCTA = dynamic(
  () => import("@/components/ui/FloatingCTA").then((m) => m.FloatingCTA),
  { ssr: false }
);

export default FloatingCTA;
