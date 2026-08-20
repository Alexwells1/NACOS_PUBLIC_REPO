"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { HeroImage } from "./HeroImage";
import { HeroActions } from "./HeroActions";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const circleOneY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const circleTwoY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fluidReveal = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh pt-32 pb-16 lg:pt-32 lg:pb-20 bg-[#041601] overflow-hidden flex items-center"
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#168706]/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <HeroBackground
        circleOneY={circleOneY}
        circleTwoY={circleTwoY}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-14 sm:gap-16 lg:gap-16">
        {/* LEFT SIDE: TEXT CONTENT */}
        <motion.div
          className="flex-[1.2] max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            <motion.span variants={fluidReveal} className="block">
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8F3E6] to-white animate-gradient-x drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Empowering
              </span>
            </motion.span>

            <motion.span variants={fluidReveal} className="block text-white">
              students through
            </motion.span>

            <motion.span
              variants={fluidReveal}
              className="relative inline-block mt-1"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#168706] animate-gradient-x drop-shadow-[0_0_20px_rgba(22,135,6,0.4)]">
                technology &amp; innovation
              </span>
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fluidReveal}
            className="mt-6 text-lg lg:text-xl text-white/70 max-w-lg leading-relaxed"
          >
            A vibrant hub where students build and shape the future together
            through
            <span className="text-[#4ade80] font-semibold">
              {" "}
              cutting-edge technology
            </span>
            .
          </motion.p>

          <motion.div
            variants={fluidReveal}
            className="mt-8 lg:mt-10 w-full flex justify-center lg:justify-start"
          >
            <HeroActions />
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex-1 w-full max-w-[550px] lg:max-w-[720px] relative"
        >
          <div className="absolute inset-0 bg-[#168706]/20 blur-[100px] rounded-full pointer-events-none -z-10" />

          <div className="w-full">
            <HeroImage />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient-x { 
          0%, 100% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 8s ease infinite; }
      `}</style>
    </section>
  );
}