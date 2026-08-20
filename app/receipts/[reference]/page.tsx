import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicServerFetch } from "@/lib/api/server-fetch";
import { paths } from "@/lib/api/paths";
import { ApiClientError } from "@/lib/api/errors";
import type { ReceiptTransaction } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TransactionStatusBadge } from "@/components/shared/status-badge";
import { DownloadReceiptButton } from "./download-receipt-button";

export const metadata: Metadata = { title: "Receipt" };

export default async function ReceiptDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;

  let receipt: ReceiptTransaction;
  try {
    receipt = await publicServerFetch<ReceiptTransaction>(paths.receipts.byReference(reference));
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) notFound();
    throw error;
  }

  const rows: Array<[string, string]> = [
    ["Association", receipt.tenantId.name],
    ["Session", receipt.sessionId.label],
    ["Student", receipt.studentName],
    ["Matric number", receipt.matricNumber],
    ["Level", receipt.level],
    ["Payment type", receipt.paymentType === "online" ? "Online" : "Manual"],
    ["Date", formatDateTime(receipt.createdAt)],
    ["Reference", receipt.reference],
  ];

  return (
    <div className="mx-auto max-w-lg pb-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Receipt</p>
              <p className="text-2xl font-semibold num">{formatCurrency(receipt.baseAmount)}</p>
            </div>
            <TransactionStatusBadge status={receipt.status} />
          </div>

          <Separator className="my-5" />

          <dl className="space-y-3 text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <DownloadReceiptButton reference={receipt.reference} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
