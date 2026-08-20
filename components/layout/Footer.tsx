"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";
import { usePublicSocialLinks } from "@/hooks/use-social-links";
import type { SocialPlatform } from "@/lib/api/social-links";

// --- Types ---

export interface FooterLink {
  name: string;
  path: string;
}

export interface FooterLinks {
  [category: string]: FooterLink[];
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  link?: string;
  pronoun?: "his" | "her" | "their";
}

interface FooterProps {
  footerLinks?: FooterLinks;
  teamMembers?: TeamMember[];
}

// --- Constants & Data ---

const defaultFooterLinks: FooterLinks = {
  "Quick Links": [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Pay Dues", path: "/pay" },
    { name: "Resources", path: "/resources" },
  ],
  Support: [
    { name: "Help Center", path: "/help" },
    { name: "Contact Us", path: "/help" },
    { name: "Payment Issues", path: "/help" },
    { name: "Technical Support", path: "/help" },
  ],
};

const defaultTeamMembers: TeamMember[] = [
  {
    name: "Temi",
    role: "UI/UX Designer",
    avatar: "/images/temi.png",
    link: "#",
    pronoun: "his",
  },
  {
    name: "Mikun",
    role: "Full Stack Dev",
    avatar: "/images/mikun.png",
    link: "#",
    pronoun: "his",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Internal Sub-Components ---

const PLATFORM_ICONS: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
  youtube: Youtube,
};

const SocialLinks = () => {
  const { data: socialLinks } = usePublicSocialLinks();
  const entries = Object.entries(socialLinks ?? {}) as [
    SocialPlatform,
    string,
  ][];

  if (entries.length === 0) return null;

  return (
    <motion.div variants={itemVariants} className="flex items-center gap-3">
      {entries.map(([platform, url]) => {
        const Icon = PLATFORM_ICONS[platform];
        return (
          <motion.a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 bg-white shadow-md border border-gray-200 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00371E] to-[#168706] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Icon className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

// --- Main Footer Component ---

export default function Footer({
  footerLinks = defaultFooterLinks,
  teamMembers = defaultTeamMembers,
}: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-[#F1F5F9] border-t border-gray-200 relative overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-700/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-10 lg:pt-16 pb-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/nacos.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="drop-shadow-lg"
                />
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-tight bg-gradient-to-r from-[#00371E] to-[#168706] bg-clip-text text-transparent">
                    NACOS FUNAAB
                  </h3>
                </div>
              </Link>

              <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-md">
                Empowering computing students through innovation, collaboration,
                and technological excellence at the Federal University of
                Agriculture, Abeokuta.
              </p>

              <SocialLinks />
            </motion.div>

            {/* Nav Links Section */}
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                    {category}
                  </h4>
                  <nav className="flex flex-col gap-3">
                    {links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className="text-sm text-gray-500 hover:text-[#168706] transition-colors flex items-center group"
                      >
                        <span className="w-0 h-[1px] bg-[#168706] group-hover:w-3 transition-all mr-0 group-hover:mr-2" />
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Copyright Bar with Inline Clickable Avatars */}
          <div className="border-t border-gray-200 pt-6 mt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              {/* Copyright Info */}
              <div className="flex items-center gap-3">
                <Image
                  src="/nacos.png"
                  alt="NACOS"
                  width={20}
                  height={20}
                  className="grayscale opacity-50"
                />
                <p className="text-[12px] text-gray-400 font-medium">
                  © {new Date().getFullYear()} NACOS FUNAAB. All rights
                  reserved.
                </p>
              </div>

              {/* Compressed Clickable Team Avatars */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400 font-medium">
                  Built by
                </span>
                <div className="flex -space-x-2 items-center">
                  {teamMembers.map((member) => (
                    <a
                      key={member.name}
                      href={member.link || "#"}
                      target={member.link ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      title={`${member.name} — ${member.role}`}
                      aria-label={`Visit ${member.name}'s profile (${member.role})`}
                      className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-sm hover:z-20 hover:scale-110 hover:border-emerald-500 transition-all cursor-pointer bg-gray-100"
                    >
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
