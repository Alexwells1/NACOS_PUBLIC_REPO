import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { publicServerFetch } from "@/lib/api/server-fetch";
import { paths } from "@/lib/api/paths";
import { ApiClientError } from "@/lib/api/errors";
import type { ReceiptVerification } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>;
}): Promise<Metadata> {
  const { reference } = await params;
  return {
    title: `Verify receipt • ${reference || "Verification"}`,
  };
}

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

  const isSuccess = Boolean(result.verified);

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center  p-4 sm:p-6 dark:bg-zinc-950">
      {/* Receipt Ticket Card */}
      <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-card text-card-foreground shadow-2xl shadow-slate-300/40 dark:shadow-none">
        
        {/* Top Section */}
        <div className="flex flex-col items-center px-6 pt-8 pb-4 text-center sm:px-8">
          {/* Status Icon */}
          <div
            className={`flex size-14 items-center justify-center rounded-full ${
              isSuccess
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {isSuccess ? (
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                <Check className="size-5 stroke-[2.5]" />
              </div>
            ) : (
              <div className="flex size-10 items-center justify-center rounded-full bg-destructive text-white shadow-sm">
                <X className="size-5 stroke-[2.5]" />
              </div>
            )}
          </div>

          {/* Title & Subtitle */}
          <h1 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-foreground">
            {isSuccess ? "Receipt Verified" : "Not a Valid Receipt"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            {isSuccess
              ? "Payment record authenticated successfully."
              : "This reference couldn't be verified."}
          </p>

          {/* Top Info (Reference & Date) */}
          <dl className="mt-6 w-full space-y-2.5 text-left text-xs sm:text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Bill Number:</dt>
              <dd className="font-mono text-xs font-semibold text-foreground break-all sm:text-right select-all">
                {result.reference}
              </dd>
            </div>
            {result.paymentDate && (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Date and Time:</dt>
                <dd className="font-medium text-foreground tabular-nums sm:text-right">
                  {formatDateTime(result.paymentDate)}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Perforated Ticket Notches & Dashed Divider */}
        <div className="relative flex items-center">
          <div className="absolute -left-3 size-6 rounded-full bg-[#ecf0fa] dark:bg-zinc-950" />
          <div className="w-full border-t border-dashed border-border" />
          <div className="absolute -right-3 size-6 rounded-full bg-[#ecf0fa] dark:bg-zinc-950" />
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 px-6 pt-4 pb-8 sm:px-8">
          <dl className="space-y-3 text-xs sm:text-sm">
            {isSuccess ? (
              <>
                {result.studentName && (
                  <ReceiptRow label="Student:" value={result.studentName} />
                )}
                {result.matricNumber && (
                  <ReceiptRow label="Matric Number:" value={result.matricNumber} />
                )}
                {result.paidFor && (
                  <ReceiptRow label="Paid to:" value={result.paidFor} />
                )}
                {result.session && (
                  <ReceiptRow label="Session:" value={result.session} />
                )}
                {result.amount !== undefined && (
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <dt className="font-medium text-muted-foreground">Payment Amount:</dt>
                    <dd className="text-base sm:text-lg font-bold text-foreground tabular-nums">
                      {formatCurrency(result.amount)}
                    </dd>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Error Reason:</dt>
                <dd className="font-semibold text-destructive">
                  {result.status || "Not found"}
                </dd>
              </div>
            )}
          </dl>

          {/* Status Box */}
          {result.status && (
            <div className="mt-4 rounded-xl bg-muted/60 p-3.5 text-xs">
              <span className="text-muted-foreground">Verification Status:</span>
              <p className="mt-0.5 font-medium text-foreground capitalize">
                {result.status}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground text-right break-words">{value}</dd>
    </div>
  );
}