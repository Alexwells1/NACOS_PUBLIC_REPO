"use client";

import { useQuery } from "@tanstack/react-query";
import * as hallOfFameApi from "@/lib/api/hall-of-fame";

export function usePublicHallOfFame() {
  return useQuery({
    queryKey: ["hall-of-fame", "public"],
    queryFn: () => hallOfFameApi.getPublicHallOfFame(),
    staleTime: 5 * 60 * 1000,
  });
}
