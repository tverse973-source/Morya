"use client";

import { useRef, useEffect, useState } from "react";
import { RouteCard } from "@/components/ui/RouteCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

type RouteItem = {
  id: string;
  name: string;
  distance: string;
  duration: string;
  startingFrom: string;
  image: string;
};

type PopularRoutesProps = {
  routes: RouteItem[];
};

export function PopularRoutes({ routes }: PopularRoutesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 20);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
      const child = el.firstElementChild as HTMLElement | null;
      const step = child ? child.offsetWidth + 24 : 320;
      setActiveSlide(Math.round(el.scrollLeft / step));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const stepSize = () => {
    const el = ref.current;
    const child = el?.firstElementChild as HTMLElement | null;
    return child ? child.offsetWidth + 24 : 320;
  };

  const scroll = (dir: -1 | 1) => {
    ref.current?.scrollBy({ left: dir * stepSize(), behavior: "smooth" });
  };

  const goTo = (i: number) => {
    ref.current?.scrollTo({ left: i * stepSize(), behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="container-page relative z-10">
        <div className="flex items-end justify-between gap-4 mb-10">
          <SectionTitle
            className="text-left mb-0"
            title="Popular Routes"
            subtitle="Most requested destinations from Pune."
          />
          <div className="hidden sm:flex gap-2 shrink-0">
            <button
              type="button"
              aria-label="Scroll routes left"
              disabled={!canScrollLeft}
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center transition-all hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-[#64748B]" />
            </button>
            <button
              type="button"
              aria-label="Scroll routes right"
              disabled={!canScrollRight}
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center transition-all hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {routes.map((route) => (
            <div key={route.id} className="snap-start">
              <RouteCard route={route} />
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {routes.map((route, i) => (
            <button
              type="button"
              key={route.id}
              aria-label={`Go to ${route.name}`}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${activeSlide === i ? "bg-brand-blue" : "bg-[#E2E8F0]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
