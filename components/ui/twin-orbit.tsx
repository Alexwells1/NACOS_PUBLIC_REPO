"use client";

import { cn } from "@/lib/utils";

export function TwinOrbit({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex size-12 items-center justify-center", className)}>
      {/* Center Dot */}
      <div className="size-2.5 rounded-full bg-primary animate-pulse" />
      
      {/* Orbiting Marker 1 */}
      <div className="absolute inset-0 animate-[spin_1.5s_linear_infinite]">
        <div className="size-2 rounded-full bg-primary/40" />
      </div>

      {/* Orbiting Marker 2 (Half-cycle offset) */}
      <div className="absolute inset-0 animate-[spin_1.5s_linear_infinite] [animation-delay:-0.75s]">
        <div className="absolute bottom-0 right-0 size-2 rounded-full bg-primary/80" />
      </div>
    </div>
  );
}