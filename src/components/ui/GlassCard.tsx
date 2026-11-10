"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}

export function GlassCard({ children, className, padded = true, ...props }: GlassCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "glass relative overflow-hidden group rounded-xl",

        padded && "p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
