import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicServerFetch } from "@/lib/api/server-fetch";
import { paths } from "@/lib/api/paths";
import { ApiClientError } from "@/lib/api/errors";
import type { PublicTenant } from "@/lib/types";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = { title: "Pay dues" };

export default async function PayPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  let tenant: PublicTenant;
  try {
    tenant = await publicServerFetch<PublicTenant>(paths.tenants.publicByCode(code));
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) notFound();
    throw error;
  }

  return <CheckoutForm tenant={tenant} />;
}
