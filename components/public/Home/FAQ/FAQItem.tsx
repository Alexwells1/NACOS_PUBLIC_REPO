"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  shouldReduceMotion: boolean | null;
  easing: readonly number[];
}

export function FAQItem({ faq, isOpen, onToggle, shouldReduceMotion, easing }: FAQItemProps) {
  const dropVariant: Variants = {
    hidden: { opacity: 0, height: 0 },
    show: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <div
      className={`transition-all duration-300 rounded-tr-2xl rounded-bl-2xl border ${
        isOpen 
          ? "bg-white/10 border-[#168706]/50 shadow-lg" 
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 px-6 text-left group"
        aria-expanded={isOpen}
      >
        <h3 className="text-sm sm:text-base font-bold text-white pr-6 tracking-tight leading-relaxed">
          {faq.question}
        </h3>
        <div className={`flex-shrink-0 w-8 h-8 rounded-tr-lg rounded-bl-lg flex items-center justify-center transition-colors ${
          isOpen ? "bg-[#168706] text-white" : "bg-white/10 text-white/50 group-hover:text-white"
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : dropVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.4, ease: easing }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-mono border-l border-[#168706] pl-4">
                <span className="text-[#168706] mr-2 font-black">&gt;</span>
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}