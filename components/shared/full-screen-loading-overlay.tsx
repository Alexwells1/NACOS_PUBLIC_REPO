"use client";

import { TwinOrbit } from "../ui/twin-orbit";


export function FullScreenLoadingOverlay({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
      <div className="flex flex-col items-center gap-8">
        {/* The New Balanced Loader */}
        <TwinOrbit />

        <div className="flex flex-col items-center gap-2 text-center px-6">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            {title}
          </h2>
          {description && (
            <p className="max-w-[280px] text-sm leading-relaxed text-zinc-500 animate-in fade-in slide-in-from-bottom-2 duration-700">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {/* Subtle Bottom Note */}
      <div className="absolute bottom-10 flex items-center gap-2">
        <div className="size-1 rounded-full bg-zinc-300" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          Secure Processing
        </span>
        <div className="size-1 rounded-full bg-zinc-300" />
      </div>
    </div>
  );
}