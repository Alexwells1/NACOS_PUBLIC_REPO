import { apiClient } from "./client";
import { paths } from "./paths";

export interface ResolvedContactSlot {
  name: string;
  imageUrl: string;
  whatsapp: string | null;
  email: string | null;
}

export interface PublicContactInfo {
  financialDirector: ResolvedContactSlot | null;
  softwareDirector: ResolvedContactSlot | null;
}

export function getPublicContactInfo() {
  return apiClient.get<PublicContactInfo>(paths.contactInfo.public, { skipAuth: true });
}
