"use client";

import ScrollToTop from "@/components/public/Home/scroll";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const topRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // 1. Check if we are on the full-page success screen
  const isSuccessPage = pathname === "/pay/success" || pathname.startsWith("/pay/success");

  // 2. Define transactional routes (excluding the success page)
  const transactionalRoutes = ["/pay", "/receipts", "/apply", "/verify"];
  const isTransactional = !isSuccessPage && transactionalRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]); 

  return (
    <>
      <main
        ref={topRef}
        className="min-h-screen flex flex-col justify-between relative bg-gradient-to-b from-[#F7FFF9] via-white to-[#E8F5E8]"
      >
        <Header />
        <ScrollToTop />

        {/* 
            LOGIC:
            - If it's Success Page: pt-0 (Fills screen without extra gap)
            - If it's Transactional (Pay form, Receipts list): pt-24 lg:pt-32
            - If it's Hero Page (Home, About): pt-0
        */}
        <div className={cn(
          "flex-1", 
          isTransactional ? "pt-24 lg:pt-32" : "pt-0"
        )}>
          {children}
        </div>

        {/* If you want to hide the footer on the success page, you can do: {!isSuccessPage && <Footer />} */}
        {!isSuccessPage && <Footer />}
      </main>
    </>
  );
}