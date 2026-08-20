import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tabContent } from "@/constants/about";
import { TabButton } from "@/components/learnmore/TabButton";

type TabKey = keyof typeof tabContent;

export function AboutContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("story");

  const paragraphs = useMemo(() => {
    const content = tabContent[activeTab].content;
    return content.split("\n\n").filter(Boolean);
  }, [activeTab]);

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="grid grid-cols-3 gap-2 mb-16 p-1 bg-gray-100 rounded-xl">
        {(Object.keys(tabContent) as TabKey[]).map((key) => (
          <TabButton
            key={key}
            id={`${key}-tab-btn`}
            title={tabContent[key].title}
            isActive={activeTab === key}
            onClick={() => setActiveTab(key)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#082F02] tracking-tight">
            {tabContent[activeTab].title}
          </h2>
          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-20 pt-20 border-t border-gray-100">
        <h2 className="text-3xl font-bold text-[#082F02] mb-8">Who We Are</h2>
        <div className="grid md:grid-cols-2 gap-10 text-gray-600 leading-relaxed">
          <p>
            The <strong className="text-[#082F02]">Nigeria Association of Computing Students (NACOS)</strong>, 
            FUNAAB Chapter serves as a bridge between academic learning and industry practice.
          </p>
          <p>
            Through events and workshops, we help students enhance technical skills, 
            engage in hands-on projects, and stay updated with industry trends.
          </p>
        </div>
      </div>
    </section>
  );
}