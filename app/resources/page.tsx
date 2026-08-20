"use client";

import { AcademicLevels } from "@/components/public/Resources/AcademicLevels";
import { ResourcesHero } from "@/components/public/Resources/ResourcesHero";
import { ShareCTA } from "@/components/public/Resources/ShareCTA";
import { TextbookSection } from "@/components/public/Resources/TextbookSection";



export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ResourcesHero />
      <main>
        <AcademicLevels />
        <TextbookSection />
        <ShareCTA />
      </main>
    </div>
  );
}