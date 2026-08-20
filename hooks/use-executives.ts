"use client";

import { useQuery } from "@tanstack/react-query";
import * as executivesApi from "@/lib/api/executives";
import type { ExecutiveGroup } from "@/lib/api/executives";

export const executiveKeys = {
  all: ["executives"] as const,
  list: (group?: ExecutiveGroup) => [...executiveKeys.all, "list", group ?? "all"] as const,
};

export function usePublicExecutives(group?: ExecutiveGroup) {
  return useQuery({
    queryKey: [...executiveKeys.list(group), "public"],
    queryFn: () => executivesApi.getPublicExecutives(group),
    staleTime: 5 * 60 * 1000,
  });
}
