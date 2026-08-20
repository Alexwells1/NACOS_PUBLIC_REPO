"use client";

import { useQuery } from "@tanstack/react-query";
import * as socialLinksApi from "@/lib/api/social-links";

export const socialLinksKeys = {
  all: ["social-links"] as const,
};

export function usePublicSocialLinks() {
  return useQuery({
    queryKey: [...socialLinksKeys.all, "public"],
    queryFn: () => socialLinksApi.getPublicSocialLinks(),
    staleTime: 5 * 60 * 1000,
  });
}
