"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FALLBACK_SRC =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  fallbackSrc = FALLBACK_SRC,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      src={failed ? fallbackSrc : src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover object-center", className)}
      onError={() => setFailed(true)}
    />
  );
}
