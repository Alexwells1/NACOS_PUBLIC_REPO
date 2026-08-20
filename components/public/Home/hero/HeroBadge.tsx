import { motion, Variants } from "framer-motion";
import { Terminal } from "lucide-react";

interface HeroBadgeProps {
  shouldReduceMotion: boolean | null;
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function HeroBadge({ shouldReduceMotion }: HeroBadgeProps) {
  return (
    <motion.div
      variants={badgeVariants}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative inline-flex items-center gap-3 px-4 py-2 
                 bg-[#168706]/10 backdrop-blur-md 
                 border border-white/10 border-l-[#4ade80] border-l-2
                 rounded-tr-xl rounded-bl-xl" 
      /* ^ This creates the "Angled" tech look instead of a circle */
      
      whileHover={
        shouldReduceMotion 
          ? {} 
          : { 
              backgroundColor: "rgba(22, 135, 6, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              borderLeftColor: "#86efac"
            }
      }
    >
      {/* Decorative corner notch (Top Left) */}
      <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-[#4ade80] rounded-tl-sm" />

      {/* Pulsing status dot */}
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
      </span>

      <div className="flex items-center gap-2">
        <Terminal 
          className="w-3.5 h-3.5 text-[#86efac]" 
          strokeWidth={2} 
          aria-hidden="true" 
        />
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">
          <span className="text-[#4ade80] mr-1.5 font-mono opacity-50">&gt;</span>
          NACOS FUNAAB Chapter
        </span>
      </div>

      {/* Decorative corner notch (Bottom Right) */}
      <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white/20" />
    </motion.div>
  );
}