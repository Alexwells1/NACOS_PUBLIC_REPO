"use client";

import { AboutContent } from "@/components/public/About/AboutContent";
import { AboutDepartments } from "@/components/public/About/AboutDepartments";
import { AboutHero } from "@/components/public/About/AboutHero";
import { AboutStats } from "@/components/public/About/AboutStats";
import { HallOfFame } from "@/components/public/About/HallOfFame";
import { PastExecutives } from "@/components/public/About/PastExecutives";
import Executives from "@/components/public/Home/Executives";
import NRAMembers from "@/components/public/Home/NRAMembers";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function AboutUsPage() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white selection:bg-[#082F02] selection:text-white">
      <AboutHero />
      
      <main className="relative">
        <AboutContent />
        <AboutStats />
        <AboutDepartments />
        
        <section id="executive" >
          <Executives showButton={false} />
        </section>
        
        <section id="nra" className=" bg-gray-50">
          <NRAMembers showButton={false} />
        </section>

        <HallOfFame />
        <PastExecutives />
      </main>
    </div>
  );
}