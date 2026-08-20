import type { Metadata } from "next";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { publicServerFetch } from "@/lib/api/server-fetch";
import { paths } from "@/lib/api/paths";
import { ApiClientError } from "@/lib/api/errors";
import type { ReceiptVerification } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Verify receipt" };

export default async function VerifyReceiptPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;

  let result: ReceiptVerification;
  try {
    result = await publicServerFetch<ReceiptVerification>(paths.receipts.verify(reference));
  } catch (error) {
    result = {
      verified: false,
      reference,
      status: error instanceof ApiClientError ? error.message : "Not found",
    };
  }

  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <div
            className={`flex size-14 items-center justify-center rounded-full ${
              result.verified ? "bg-primary-soft text-primary" : "bg-destructive/10 text-destructive"
            }`}
          >
            {result.verified ? <CheckCircle2Icon className="size-7" /> : <XCircleIcon className="size-7" />}
          </div>
          <div>
            <p className="text-lg font-semibold">
              {result.verified ? "Receipt verified" : "Not a valid receipt"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {result.verified ? `Status: ${result.status}` : "This reference couldn't be verified."}
            </p>
          </div>

          {result.verified && (
            <>
              <Separator className="my-2 w-full" />
              <dl className="w-full space-y-3 text-left text-sm">
                {result.studentName && (
                  <Row label="Student" value={result.studentName} />
                )}
                {result.matricNumber && <Row label="Matric number" value={result.matricNumber} />}
                {result.paidFor && <Row label="Paid to" value={result.paidFor} />}
                {result.session && <Row label="Session" value={result.session} />}
                {result.amount !== undefined && (
                  <Row label="Amount" value={formatCurrency(result.amount)} />
                )}
                {result.paymentDate && <Row label="Date" value={formatDateTime(result.paymentDate)} />}
                <Row label="Reference" value={result.reference} />
              </dl>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
