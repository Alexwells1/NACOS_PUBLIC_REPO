import { Badge } from "@/components/ui/badge";
import type { TransactionStatus, TenantStatus, OnboardingStatus } from "@/lib/types";

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  if (status === "success") return <Badge variant="default">Success</Badge>;
  if (status === "pending") return <Badge variant="warning">Pending</Badge>;
  return <Badge variant="destructive">Failed</Badge>;
}

export function TenantStatusBadge({ status }: { status: TenantStatus }) {
  if (status === "ACTIVE") return <Badge variant="default">Active</Badge>;
  if (status === "FROZEN") return <Badge variant="warning">Frozen</Badge>;
  return <Badge variant="secondary">Archived</Badge>;
}

export function OnboardingStatusBadge({ status }: { status: OnboardingStatus }) {
  if (status === "APPROVED") return <Badge variant="default">Approved</Badge>;
  if (status === "PENDING") return <Badge variant="warning">Pending</Badge>;
  if (status === "REJECTED") return <Badge variant="destructive">Rejected</Badge>;
  if (status === "APPROVAL_FAILED") return <Badge variant="destructive">Approval failed</Badge>;
  return <Badge variant="secondary">Cancelled</Badge>;
}
