import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function QuickLinkCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="relative max-w-3xl mx-auto mt-16 text-center space-y-6"
    >
      {/* Decorative Divider Line */}
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#168706]/30 to-transparent mx-auto" />

      <div className="space-y-3">
        <p className="text-sm text-[#082F02]/60 font-medium tracking-wide">
          Can&apos;t find what you&apos;re looking for?
        </p>
        
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 px-8 py-3 rounded-tr-2xl rounded-bl-2xl 
                     bg-white text-[#168706] font-bold text-sm uppercase tracking-widest
                     border border-[#168706]/10 hover:border-[#168706]/40 
                     hover:shadow-[0_10px_20px_-10px_rgba(22,135,6,0.2)] 
                     transition-all duration-300"
        >
          Contact Support
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}