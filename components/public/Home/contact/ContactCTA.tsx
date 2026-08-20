"use client";

import { CHANNEL_ICONS, type SupportChannel } from "./contact.types";
import { SupportAction } from "./SupportAction";
import { usePublicContactInfo } from "@/hooks/use-contact-info";

export default function ContactCTA() {
  const { data: contactInfo } = usePublicContactInfo();

  const channels: SupportChannel[] = [
    contactInfo?.softwareDirector?.whatsapp
      ? {
          label: "Technical Enquiries",
          role: "Software Director",
          whatsapp: contactInfo.softwareDirector.whatsapp,
          icon: CHANNEL_ICONS.software,
        }
      : null,
    contactInfo?.financialDirector?.whatsapp
      ? {
          label: "Financial Clearances",
          role: "Financial Director",
          whatsapp: contactInfo.financialDirector.whatsapp,
          icon: CHANNEL_ICONS.financial,
        }
      : null,
  ].filter((c): c is SupportChannel => c !== null);

  return (
    <section className="w-full bg-[#DCEDDA] py-16 lg:py-24 px-4 border-t border-[#168706]/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#168706]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#168706]">
                Assistance
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-[#082F02] tracking-tighter leading-none">
              Expert support <br />
              <span className="text-[#168706]">on demand.</span>
            </h2>
            
            <p className="text-sm text-[#082F02]/60 max-w-sm font-medium leading-relaxed">
              Have a specific issue? Connect with our directors directly. 
            </p>
          </div>

          {/* Actions List */}
          <div className="w-full">
            <div className="border-t border-[#168706]/10">
              {channels.map((channel, index) => (
                <SupportAction 
                  key={channel.label} 
                  channel={channel} 
                  index={index} 
                />
              ))}
            </div>
            
            {/* Minimal Footer Note */}
            <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#082F02]/30">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#168706]" />
                <span>Available Now</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}