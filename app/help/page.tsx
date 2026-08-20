"use client";

import { FAQItem } from "@/components/public/Contact/FAQItem";
import { OfficerCard } from "@/components/public/Contact/OfficerCard";
import { SupportHero } from "@/components/public/Contact/SupportHero";
import { FAQ_DATA } from "@/components/public/Home/FAQ/faq.data";
import { usePublicContactInfo } from "@/hooks/use-contact-info";
import { useState } from "react";

function buildWhatsappLink(whatsapp: string, role: string): string {
  const message = encodeURIComponent(
    `Hello ${role}, I am reaching out and need some assistance.`,
  );
  return `https://wa.me/${whatsapp}?text=${message}`;
}

export default function HelpAndSupportPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { data: contactInfo } = usePublicContactInfo();

  return (
    <div className="min-h-screen bg-white">
      <SupportHero />

      <main className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-16">
        {/* Left Column: Officer Connection (Direct Support) */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-[#082F02] tracking-tighter uppercase">
              Direct <br /> <span className="text-[#168706]">Directors.</span>
            </h2>
            <p className="text-sm text-gray-500 font-medium max-w-xs">
              Initialize a secure chat session with our specialized officers for
              immediate help.
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo?.financialDirector?.whatsapp && (
              <OfficerCard
                officer={{
                  id: "DIR-01",
                  name: contactInfo.financialDirector.name,
                  role: "Payments & Dues",
                  expertise: ["Clearance", "Invoicing", "Refunds"],
                  link: buildWhatsappLink(
                    contactInfo.financialDirector.whatsapp,
                    "Financial Director",
                  ),
                }}
              />
            )}
            {contactInfo?.softwareDirector?.whatsapp && (
              <OfficerCard
                officer={{
                  id: "DIR-02",
                  name: contactInfo.softwareDirector.name,
                  role: "Portal & Technical",
                  expertise: ["Access", "Bugs", "Receipts"],
                  link: buildWhatsappLink(
                    contactInfo.softwareDirector.whatsapp,
                    "Software Director",
                  ),
                }}
              />
            )}
          </div>
        </div>

        {/* Right Column: Knowledge Base */}
        <div className="lg:col-span-7">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-[#082F02] tracking-tighter uppercase mb-4">
              Search <br /> <span className="text-[#168706]">Knowledge.</span>
            </h2>
            <div className="flex gap-4">
              {["Payments", "System", "Resources"].map((tag) => (
                <button
                  key={tag}
                  className="text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 px-3 py-1 hover:border-[#168706] hover:text-[#168706] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-black/5">
            {FAQ_DATA.map((faq, i: number) => (
              <FAQItem
                key={i}
                q={faq.question}
                a={faq.answer}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
