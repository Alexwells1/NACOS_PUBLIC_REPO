import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { upVariant, easing } from "./animations";

export function AboutBadge({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      variants={upVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: shouldReduceMotion ? 0.3 : 1.1, ease: easing }}
      className="inline-flex items-center gap-2.5 px-4 py-2 
                 bg-white/60 backdrop-blur-md 
                 border border-[#147A05]/20 border-l-[#168706] border-l-2
                 rounded-tr-lg rounded-bl-lg w-fit"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#168706] opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#168706]" />
      </span>
      <Terminal className="w-3.5 h-3.5 text-[#147A05]" strokeWidth={2} />
      <span className="text-[10px] font-bold tracking-widest uppercase text-[#147A05]">
        About Us
      </span>
    </motion.div>
  );
}