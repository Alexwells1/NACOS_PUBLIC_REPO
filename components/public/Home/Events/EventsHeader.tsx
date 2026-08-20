export function EventsHeader() {
  return (
    <div className="space-y-4">
      <div className="inline-block px-3 py-1 rounded-md bg-[#168706]/10 border border-[#168706]/20">
        <span className="text-[#147A05] font-black text-[9px] uppercase tracking-[0.3em]">
          Up Next
        </span>
      </div>
      <h2 className="text-3xl lg:text-4xl font-black text-[#082F02] tracking-tighter leading-[0.9]">
        Community <br />
        <span className="text-[#168706]">Events.</span>
      </h2>
      <p className="text-sm text-[#082F02]/60 max-w-[240px] font-medium leading-relaxed">
        Stay synced with workshops and hackathons in the NACOS community.
      </p>
    </div>
  );
}