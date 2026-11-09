"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "gold" | "blue" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

const variants = {
  gold: "bg-accent-gold text-white hover:bg-orange-500 hover:shadow-lg hover:shadow-accent-gold/25",
  blue: "bg-brand-blue text-white hover:bg-brand-blue-light hover:shadow-lg hover:shadow-brand-blue/25",
  ghost:
    "bg-transparent border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function AnimatedButton({
  children,
  variant = "gold",
  size = "md",
  loading = false,
  href,
  className,
  onClick,
  disabled,
  type = "button",
  "aria-label": ariaLabel,
}: AnimatedButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium min-h-11 transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  const showArrow = !onClick && !href ? false : !onClick;
  const content = (
    <>
      {children}
      {showArrow ? <ArrowRight className="w-4 h-4 shrink-0" /> : null}
    </>
  );

  if (loading) {
    return (
      <button type="button" disabled aria-label={ariaLabel} className={base}>
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        {children}
      </button>
    );
  }

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={base}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={base}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={base}
    >
      {content}
    </button>
  );
}
