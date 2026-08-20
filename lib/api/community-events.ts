import { apiClient } from "./client";
import { paths } from "./paths";

export interface CommunityEvent {
  _id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  category: string;
  imageUrl?: string;
  imagePublicId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getPublicEvents(upcomingOnly?: boolean) {
  const search = upcomingOnly ? "?upcoming=true" : "";
  return apiClient.get<CommunityEvent[]>(`${paths.communityEvents.public}${search}`, {
    skipAuth: true,
  });
}

export function getPublicEvent(id: string) {
  return apiClient.get<CommunityEvent>(paths.communityEvents.publicById(id), {
    skipAuth: true,
  });
}
