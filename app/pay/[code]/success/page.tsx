import { redirect } from "next/navigation";

// See pay/success/page.tsx's comment: the backend's real Paystack callback
// target is /pay/success (no code segment). This route exists only so a
// link built from the spec's original table still works.
export default async function LegacyPaySuccessRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") qs.set(key, value);
  }
  const suffix = qs.toString();
  redirect(`/pay/success${suffix ? `?${suffix}` : ""}`);
}
