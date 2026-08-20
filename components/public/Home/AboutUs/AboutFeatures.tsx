import { motion, Variants } from "framer-motion";
import { easing } from "./animations";

const FEATURES = [
  "Tech Workshops & Seminars",
  "Hackathons & Competitions",
  "Industry Networking",
  "Career Development",
];

const leftVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function AboutFeatures({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {FEATURES.map((feature) => (
        <motion.div
          key={feature}
          variants={leftVariant}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, ease: easing }}
          className="flex items-center gap-3 group"
        >
          {/* A small "code bracket" icon instead of a dot */}
          <div className="flex items-center justify-center w-6 h-6 rounded bg-[#168706]/10 text-[#168706] group-hover:bg-[#168706] group-hover:text-white transition-colors duration-300">
             <span className="text-[10px] font-mono font-bold">&lt;/&gt;</span>
          </div>
          <span className="text-sm sm:text-base font-semibold text-[#082F02]/80 group-hover:text-[#082F02] transition-colors">
            {feature}
          </span>
        </motion.div>
      ))}
    </div>
  );
}