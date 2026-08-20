import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { publicServerFetch } from "@/lib/api/server-fetch";
import { paths } from "@/lib/api/paths";
import type { PublicTenantSummary, TenantType } from "@/lib/types";
import { TenantSelector, type TenantTypeGroup } from "./tenant-selector";
import { PayStatePanel } from "./pay-state-panel";

export const metadata: Metadata = { title: "Pay dues" };

export default async function PaySelectionPage() {
  let tenants: PublicTenantSummary[];
  try {
    tenants = await publicServerFetch<PublicTenantSummary[]>(paths.tenants.public);
  } catch {
    return <PayStatePanel variant="error" />;
  }

  const college = tenants.filter((t) => t.type === "COLLEGE");
  const department = tenants.filter((t) => t.type === "DEPARTMENT");

  const groups: TenantTypeGroup[] = [];
  for (const [type, list] of [
    ["COLLEGE", college],
    ["DEPARTMENT", department],
  ] as [TenantType, PublicTenantSummary[]][]) {
    const activeCount = list.filter((t) => t.status === "ACTIVE").length;
    if (activeCount > 0) groups.push({ type, tenants: list, activeCount });
  }

  if (groups.length === 0) {
    return <PayStatePanel variant="empty" />;
  }

  if (groups.length === 1 && groups[0].activeCount === 1) {
    const tenant = groups[0].tenants.find((t) => t.status === "ACTIVE")!;
    redirect(`/pay/${tenant.code}`);
  }

  return <TenantSelector groups={groups} />;
}