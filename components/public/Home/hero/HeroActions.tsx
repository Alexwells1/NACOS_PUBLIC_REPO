"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, ArrowRight } from "lucide-react";
import { staggerContainer, buttonVariants } from "./animations";

export function HeroActions() {
  const btnTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <motion.div 
      className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full" 
      variants={staggerContainer}
    >
      {/* PRIMARY BUTTON */}
      <motion.div variants={buttonVariants} transition={btnTransition} className="flex-1 sm:flex-none">
        <Link 
          href="/pay" 
          className="group/btn relative w-full inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#168706] hover:bg-[#127305] text-white px-3 py-3 sm:px-8 sm:py-4 rounded-xl shadow-2xl transition-all font-bold border-2 border-[#168706] hover:border-[#4ade80]/50 overflow-hidden text-[11px] sm:text-sm md:text-base whitespace-nowrap"
        >
          {/* Internal Shimmer for button: disabled via CSS for reduced motion to keep SSR tree identical */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 motion-reduce:hidden"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8 }}
          />
          <CreditCard className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover/btn:rotate-12 transition-transform" />
          PAY DUES
          <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* SECONDARY BUTTON */}
      <motion.div variants={buttonVariants} transition={btnTransition} className="flex-1 sm:flex-none">
        <Link 
          href="/about-us" 
          className="group/btn2 w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white px-3 py-3 sm:px-8 sm:py-4 rounded-xl border-2 border-white/20 hover:border-white/50 transition-all font-semibold text-[11px] sm:text-sm md:text-base whitespace-nowrap"
        >
          Learn More
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn2:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </motion.div>
  );
}