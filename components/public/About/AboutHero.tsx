"use client";

import { motion, Variants } from "framer-motion";
import { OptimizedImage } from "@/components/learnmore/OptimizedImage";

const reveal: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  },
};

const lineReveal: Variants = {
  hidden: { height: 0 },
  show: { 
    height: "100%", 
    transition: { duration: 1.2, ease: "circOut" } 
  },
};

export function AboutHero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] flex items-end overflow-hidden bg-[#082F02]">
      {/* Background Image with Mask */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="https://res.cloudinary.com/dqp54assh/image/upload/v1759983567/student_zcj9q6.jpg"
          placeholderSrc="https://res.cloudinary.com/dqp54assh/image/upload/w_50/v1759983567/student_zcj9q6.jpg"
          alt="NACOS FUNAAB"
          className="w-full h-full"
        />
        {/* Modern Gradient Mask: Darker at bottom/left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#082F02] via-[#082F02]/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-16 md:mb-24 flex gap-8">
        
        {/* Left Side: Vertical Tech Line */}
        <div className="hidden md:flex flex-col items-center gap-4">
           <span className="text-[10px] font-black text-[#168706] uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">
             Since 1999
           </span>
           <motion.div 
             variants={lineReveal}
             initial="hidden"
             animate="show"
             className="w-[1px] bg-gradient-to-b from-[#168706] to-transparent flex-1" 
           />
        </div>

        {/* Content Block */}
        <div className="flex-1 space-y-6">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {/* System Path / Breadcrumb */}
            <div className="flex items-center gap-2 text-[#168706] font-mono text-[10px] tracking-widest uppercase">
              <span className="opacity-50">Root</span>
              <span className="opacity-30">/</span>
              <span className="opacity-50">Pages</span>
              <span className="opacity-30">/</span>
              <span className="font-bold">About_Us</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
              The Core of <br />
              <span className="text-[#168706]">Innovation.</span>
            </h1>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed">
              We are more than a student body; we are a collective of creators, 
              engineers, and visionaries shaping the digital landscape of FUNAAB.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative "System Blade" Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
    </section>
  );
}