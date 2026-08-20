"use client";

import { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, useReducedMotion, Variants, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "./faq.data";
import { FAQItem } from "./FAQItem";

const easing = [0.16, 1, 0.3, 1] as const;
const MOBILE_PREVIEW_COUNT = 4; // Show only 4 items initially on mobile

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Determine items to display
  const visibleFaqs = showAll ? FAQ_DATA : FAQ_DATA.slice(0, MOBILE_PREVIEW_COUNT);
  const hasHiddenItems = FAQ_DATA.length > MOBILE_PREVIEW_COUNT;

  return (
    <section className="relative w-full bg-[#082F02] py-12 md:py-20 px-4 overflow-hidden">
      {/* Background Tech Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#168706_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header with tighter mobile spacing */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
        >
          <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 rounded-lg border border-white/10 mb-3 md:mb-6">
            <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#168706]" />
            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.25em]">
              Support Center
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 md:mb-4">
            Frequently Asked <span className="text-[#168706]">Questions</span>
          </h2>
          <p className="text-white/60 text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed px-2">
            Everything you need to know about NACOS FUNAAB membership, payment protocols, and system access.
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div className="space-y-2.5 md:space-y-3">
          <AnimatePresence initial={false}>
            {/* On desktop (md:), always show all FAQs. On mobile, respect the showAll state */}
            {(showAll ? FAQ_DATA : visibleFaqs).map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  shouldReduceMotion={shouldReduceMotion}
                  easing={easing}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile "Show More / Show Less" Button (hidden on desktop) */}
        {hasHiddenItems && (
          <div className="mt-4 flex justify-center md:hidden">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/80 active:bg-white/10 transition-colors"
            >
              <span>{showAll ? "Show Less" : `View all questions (${FAQ_DATA.length})`}</span>
              {showAll ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#168706]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#168706]" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}