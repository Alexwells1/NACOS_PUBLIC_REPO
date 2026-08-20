import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { STATS_DATA } from "@/constants/about";
import { StatsCard } from "@/components/learnmore/StatsCard";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {STATS_DATA.map((stat, i) => (
            <motion.div key={i} variants={item}>
              <StatsCard value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}