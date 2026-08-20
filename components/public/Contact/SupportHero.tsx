"use client";

export function SupportHero() {
  return (
    <section className="bg-[#082F02] pt-28 pb-16 md:pt-40 md:pb-24 px-6 border-b border-[#168706]/20 relative overflow-hidden">
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#168706_1px,transparent_1px)] [background-size:30px_30px]" />
      
      {/* Subtle Header Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-[#168706]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#168706] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#168706]">
              System // Helpdesk
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
            How can we <br />
            <span className="text-[#168706]">assist you?</span>
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-mono max-w-xs leading-relaxed uppercase tracking-tight">
            Knowledge base access // 
            Terminal status: Online //
            Ready for query...
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 bg-[#168706]/20 blur-xl opacity-0 transition-opacity duration-500 group-focus-within:opacity-100" />
        </div>
      </div>
    </section>
  );
}