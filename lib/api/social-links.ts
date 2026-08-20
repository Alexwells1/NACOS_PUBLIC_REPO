import { apiClient } from "./client";
import { paths } from "./paths";

export const SOCIAL_PLATFORMS = [
  "facebook",
  "twitter",
  "instagram",
  "linkedin",
  "whatsapp",
  "youtube",
] as const;
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export type PublicSocialLinks = Partial<Record<SocialPlatform, string>>;

export function getPublicSocialLinks() {
  return apiClient.get<PublicSocialLinks>(paths.socialLinks.public, { skipAuth: true });
}
