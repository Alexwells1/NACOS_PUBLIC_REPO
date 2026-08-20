"use client";

import { useQuery } from "@tanstack/react-query";
import * as contactInfoApi from "@/lib/api/contact-info";

export const contactInfoKeys = {
  all: ["contact-info"] as const,
};

export function usePublicContactInfo() {
  return useQuery({
    queryKey: [...contactInfoKeys.all, "public"],
    queryFn: () => contactInfoApi.getPublicContactInfo(),
    staleTime: 5 * 60 * 1000,
  });
}
