import { MessageCircle, ArrowRight } from "lucide-react";

export function ShareCTA() {
  const handleContactClick = () => {
    window.open("https://wa.me/2349161285212", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-5xl mx-auto rounded-tr-[3rem] rounded-bl-[3rem] bg-[#082F02] p-8 md:p-16 text-center relative overflow-hidden">
        {/* Subtle Tech Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#168706_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative z-10 space-y-6">
          <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase">
            Have Resources to Share?
          </h3>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto font-medium">
            Contribute to the community. If you have study guides or notes that could help your peers, synchronize them with our repository.
          </p>
          
          <button
            onClick={handleContactClick}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#168706] text-white rounded-tr-xl rounded-bl-xl font-black text-xs uppercase tracking-widest hover:bg-[#0D5104] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            contact
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}