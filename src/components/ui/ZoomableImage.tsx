"use client";

import { useState } from "react";
import { SafeImage } from "./SafeImage";
import { Lightbox } from "./Lightbox";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders an image that can be clicked to open a full-screen zoom overlay.
 */
export function ZoomableImage({ src, alt, className, sizes, priority }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        aria-label={`View larger image: ${alt}`}
        className="group/zoom absolute inset-0 z-20 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
      >
        <SafeImage src={src} alt={alt} sizes={sizes} priority={priority} className={className} />
      </button>
      <Lightbox src={src} alt={alt} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
