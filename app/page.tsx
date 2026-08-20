"use client";

import { Suspense, lazy } from "react";
import AboutUs from "@/components/public/Home/AboutUs/About";
import QuickLinks from "@/components/public/Home/QuickLink/quickLink";
import Hero from "@/components/public/Home/hero/Hero";

// Lazy imports for below-fold sections
const Executives = lazy(() => import("@/components/public/Home/Executives"));
const NRAMembers = lazy(() => import("@/components/public/Home/NRAMembers"));
const Events = lazy(() => import("@/components/public/Home/Events/Events"));
const FAQ = lazy(() => import("@/components/public/Home/FAQ/FAQ"));
const ContactCTA = lazy(
  () => import("@/components/public/Home/contact/ContactCTA"),
);


function SectionSkeleton() {
  return (
    <div className="w-full py-16 px-4 sm:px-6 animate-pulse" aria-hidden="true">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Badge placeholder */}
        <div className="h-7 w-28 rounded-full bg-[#C8E0C4] mx-auto" />
        {/* Heading placeholder */}
        <div className="space-y-3 max-w-lg mx-auto">
          <div className="h-8 rounded-lg bg-[#C8E0C4]" />
          <div className="h-8 rounded-lg bg-[#C8E0C4] w-4/5 mx-auto" />
        </div>
        {/* Card row placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-52 rounded-2xl bg-[#C8E0C4]"
              style={{ opacity: 1 - i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* Above-fold — loaded immediately */}
      <Hero />
      <AboutUs />
      <QuickLinks />

      {/* Below-fold — lazy loaded, each with its own boundary so one slow
          chunk doesn't block the others from rendering */}
      <Suspense fallback={<SectionSkeleton />}>
        <Executives limit={4} showButton={true} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <NRAMembers limit={3} showButton={true} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Events />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ContactCTA />
      </Suspense>
    </>
  );
}
