import { Terminal, ShieldCheck, LucideIcon } from "lucide-react";

export interface SupportChannel {
  label: string;
  role: string;
  whatsapp: string;
  icon: LucideIcon;
}

export const CHANNEL_ICONS: Record<"software" | "financial", LucideIcon> = {
  software: Terminal,
  financial: ShieldCheck,
};