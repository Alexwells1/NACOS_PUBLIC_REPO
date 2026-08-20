"use client";

import { useReducedMotion } from "framer-motion";
import { CreditCard, Calendar, BookOpen } from "lucide-react";
import { QuickLinkItem } from "./types";
import { QuickLinkCard } from "./QuickLinkCard";
import { QuickLinkHeading } from "./QuickLinkHeading";

const QUICK_LINKS: QuickLinkItem[] = [
  {
    title: "Pay Dues",
    description: "Keep your membership active and access exclusive chapter benefits.",
    icon: CreditCard,
    path: "/pay",
    color: "bg-[#082F02]",
    buttonText: "Pay Now",
    image: "/images/pay.png",
  },
  {
    title: "Upcoming Events",
    description: "Register for hackathons, technical workshops, and social meetups.",
    icon: Calendar,
    path: "/events",
    color: "bg-[#168706]",
    buttonText: "Explore",
    image: "/images/calender.png",
  },
  {
    title: "Resources",
    description: "Download past questions, project guidelines, and tech stacks.",
    icon: BookOpen,
    path: "/resources",
    color: "bg-[#0A3D03]",
    buttonText: "Download",
    image: "/images/folder.png",
  },
];

export default function QuickLinks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-[#E8F3E6] py-20 px-4">
      {/* Background Rings */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full border-[40px] border-[#168706]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <QuickLinkHeading shouldReduceMotion={shouldReduceMotion} />

        {/* Stacked container on mobile / Grid on desktop */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 mt-12">
          {QUICK_LINKS.map((link, index) => (
            <QuickLinkCard
              key={link.title}
              link={link}
              index={index}
              total={QUICK_LINKS.length}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}