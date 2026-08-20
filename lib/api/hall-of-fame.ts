import { apiClient } from "./client";
import { paths } from "./paths";

export interface HallOfFameEntry {
  _id: string;
  name: string;
  post?: string;
  contribution: string;
  imageUrl: string;
  imagePublicId: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getPublicHallOfFame() {
  return apiClient.get<HallOfFameEntry[]>(paths.hallOfFame.public, { skipAuth: true });
}
