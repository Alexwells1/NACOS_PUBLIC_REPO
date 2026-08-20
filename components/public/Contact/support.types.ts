import { LucideIcon } from "lucide-react";

export interface SupportOfficer {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  link: string;
}

export interface SupportAction {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export const easing = [0.16, 1, 0.3, 1] as const;