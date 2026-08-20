"use client";

import { useQuery } from "@tanstack/react-query";
import * as communityEventsApi from "@/lib/api/community-events";

export const communityEventKeys = {
  all: ["community-events"] as const,
};

export function usePublicEvents(upcomingOnly?: boolean) {
  return useQuery({
    queryKey: [...communityEventKeys.all, "public", upcomingOnly ?? false],
    queryFn: () => communityEventsApi.getPublicEvents(upcomingOnly),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicEvent(id: string | undefined) {
  return useQuery({
    queryKey: [...communityEventKeys.all, "public", id ?? ""],
    queryFn: () => communityEventsApi.getPublicEvent(id as string),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}
