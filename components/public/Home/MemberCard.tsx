"use client";

import { optimizeCloudinary } from "@/utils/cloudinary";
import {
  MessageCircle,
  Mail,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import Image from "next/image";
import { JSX, useMemo } from "react";

interface MemberContacts {
  whatsapp?: string;
  email?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export interface MemberCardData {
  name: string;
  position: string;
  image: string;
  contacts?: MemberContacts;
}

interface MemberCardProps {
  member: MemberCardData;
  index: number;
  titlePrefix?: string;
}

export default function MemberCard({ member, titlePrefix }: MemberCardProps) {
  const handleAction = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const contacts = member.contacts;

  const socialLinks = useMemo(() => {
    if (!contacts) return [];
    const items = [
      { id: "whatsapp", icon: <MessageCircle className="w-3.5 h-3.5" />, url: contacts.whatsapp ? `https://wa.me/${contacts.whatsapp}` : null },
      { id: "email", icon: <Mail className="w-3.5 h-3.5" />, url: contacts.email ? `mailto:${contacts.email}` : null },
      { id: "twitter", icon: <Twitter className="w-3.5 h-3.5" />, url: contacts.twitter ? `https://twitter.com/${contacts.twitter.replace("@", "")}` : null },
      { id: "instagram", icon: <Instagram className="w-3.5 h-3.5" />, url: contacts.instagram ? `https://instagram.com/${contacts.instagram.replace("@", "")}` : null },
      { id: "linkedin", icon: <Linkedin className="w-3.5 h-3.5" />, url: contacts.linkedin ? (contacts.linkedin.includes("linkedin.com") ? contacts.linkedin : `https://linkedin.com/in/${contacts.linkedin}`) : null },
      { id: "github", icon: <Github className="w-3.5 h-3.5" />, url: contacts.github ? `https://github.com/${contacts.github}` : null },
    ];
    return items.filter(item => item.url !== null) as { id: string, icon: JSX.Element, url: string }[];
  }, [contacts]);

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl h-full">
      {/* Image Section */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 flex-shrink-0">
        <Image
          src={optimizeCloudinary(member.image)}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />

        {socialLinks.length > 0 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            {socialLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleAction(link.url)}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white text-[#082F02] rounded-full shadow-md hover:bg-[#168706] hover:text-white transition-colors"
              >
                {link.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-3 sm:p-4 text-center flex flex-col flex-1 border-t border-gray-50">
        {/* Name Area */}
        <div className="mb-2">
          <h3 className="font-bold text-[#082F02] text-sm sm:text-base leading-tight line-clamp-2 min-h-[2.2rem] sm:min-h-[2.5rem] flex items-center justify-center">
            {titlePrefix ? `${titlePrefix} ` : ""}{member.name}
          </h3>
        </div>

        {/* Position Area - Fixed to handle long text */}
        <div className="mt-auto flex justify-center">
          <div className="w-full  rounded-lg px-2 py-1.5 sm:px-3 sm:py-1">
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#168706] leading-[1.3] text-center break-words">
              {member.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}