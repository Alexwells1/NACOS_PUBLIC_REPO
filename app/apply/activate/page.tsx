import type { Metadata } from "next";
import { ActivatePageClient } from "./activate-form";

export const metadata: Metadata = { title: "Activate your account" };

export default function ActivatePage() {
  return <ActivatePageClient />;
}
