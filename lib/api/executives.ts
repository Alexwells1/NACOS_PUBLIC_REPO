import { apiClient } from "./client";
import { paths } from "./paths";

export type ExecutiveGroup = "LEADERSHIP" | "NRA";

export interface ExecutiveContacts {
  whatsapp?: string;
  email?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export interface Executive {
  _id: string;
  group: ExecutiveGroup;
  position: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  contacts?: ExecutiveContacts;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getPublicExecutives(group?: ExecutiveGroup) {
  const search = group ? `?group=${group}` : "";
  return apiClient.get<Executive[]>(`${paths.executives.public}${search}`, { skipAuth: true });
}
