"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function FAQItem({ q, a, isOpen, onToggle }: { q: string, a: string, isOpen: boolean, onToggle: () => void }) {
  return (
    <div className={`border-b border-black/5 transition-colors ${isOpen ? "bg-gray-50/50" : ""}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-4 py-5 px-4 text-left group">
        <ChevronRight className={`w-4 h-4 text-[#168706] transition-transform ${isOpen ? "rotate-90" : ""}`} />
        <span className="text-sm font-bold text-[#082F02] tracking-tight group-hover:text-[#168706] transition-colors">
          {q}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-12 pb-6">
              <p className="text-xs sm:text-sm text-gray-500 font-mono leading-relaxed border-l-2 border-[#168706]/20 pl-4">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}