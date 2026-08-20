"use client";

import { useQuery } from "@tanstack/react-query";
import * as executiveSessionsApi from "@/lib/api/executive-sessions";

export const executiveSessionKeys = {
  all: ["executive-sessions"] as const,
  pastExecutives: (sessionId: string) =>
    [...executiveSessionKeys.all, sessionId, "past-executives"] as const,
};

export function usePublicExecutiveSessions() {
  return useQuery({
    queryKey: [...executiveSessionKeys.all, "public"],
    queryFn: () => executiveSessionsApi.getPublicExecutiveSessions(),
    staleTime: 5 * 60 * 1000,
  });
}
