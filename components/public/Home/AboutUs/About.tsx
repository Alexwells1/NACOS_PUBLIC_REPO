"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AboutBadge } from "./AboutBadge";
import { AboutFeatures } from "./AboutFeatures";
import { AboutImage } from "./AboutImage";
import { upVariant, staggerContainer, easing } from "./animations";

export default function AboutUs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-gradient-to-br from-[#B7DAB2] to-[#DCEDDA] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/3 -left-1/3 w-[200%] h-[200%] border-[40px] border-[#168706] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-8 order-2 lg:order-1">
            <AboutBadge shouldReduceMotion={shouldReduceMotion} />

            <motion.h2
              className="text-3xl md:text-5xl font-bold text-[#082F02] leading-[1.1]"
              variants={upVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easing }}
            >
              Get to Know What{" "}
              <span className="text-[#168706]">NACOS FUNAAB</span> Is About
            </motion.h2>

            <motion.div
              className="space-y-5 text-[#082F02]/80 text-lg leading-relaxed"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.p variants={upVariant}>
                The <strong className="text-[#082F02]">Nigeria Association of Computing Students (NACOS)</strong> FUNAAB Chapter is the recognized body for all computing disciplines in FUNAAB.
              </motion.p>
              <motion.p variants={upVariant}>
                We connect students, foster collaboration, and equip members with the skills needed to thrive in tech.
              </motion.p>
            </motion.div>

            <AboutFeatures shouldReduceMotion={shouldReduceMotion} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/about-us"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#168706] text-white font-bold shadow-lg hover:bg-[#0D5104] transition-all group"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <AboutImage shouldReduceMotion={shouldReduceMotion} />
        </div>
      </div>
    </section>
  );
}