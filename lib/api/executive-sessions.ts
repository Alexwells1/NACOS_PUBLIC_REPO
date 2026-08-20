import { apiClient } from "./client";
import { paths } from "./paths";

export interface PastExecutive {
  _id: string;
  executiveSessionId: string;
  name: string;
  post: string;
  imageUrl: string;
  imagePublicId: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExecutiveSession {
  _id: string;
  label: string;
  startYear: number;
  endYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublicExecutiveSession extends ExecutiveSession {
  pastExecutives: PastExecutive[];
}

export function getPublicExecutiveSessions() {
  return apiClient.get<PublicExecutiveSession[]>(paths.executiveSessions.public, {
    skipAuth: true,
  });
}
