"use client";

import * as React from "react";
import Link from "next/link";
import { Check, XCircle, Loader2, Download } from "lucide-react";
import { useVerifyPaymentCallback } from "@/hooks/use-payments";
import { useReceiptStatus, useDownloadReceipt } from "@/hooks/use-receipts";
import { Button } from "@/components/ui/button";
import {
  formatDateTime,
  triggerBlobDownload,
} from "@/lib/utils";

export function PaymentResult({ reference }: { reference: string | null }) {
  const verify = useVerifyPaymentCallback();
  const { mutate: verifyPayment } = verify;
  const download = useDownloadReceipt();
  const attempted = React.useRef(false);
  const autoDownloadedRef = React.useRef(false);
  const [pollTimedOut, setPollTimedOut] = React.useState(false);
  const pollStartedAtRef = React.useRef<number | null>(null);

  // Verification Logic
  React.useEffect(() => {
    if (!reference || attempted.current) return;
    attempted.current = true;
    verifyPayment(reference);
  }, [reference, verifyPayment]);

  const internalReference = verify.data?.internalReference;
  const paymentVerified = verify.data?.status === "success";

  const receiptStatus = useReceiptStatus(
    internalReference ?? "",
    paymentVerified && !pollTimedOut,
  );
  const receipt = receiptStatus.data;
  const receiptReady = !!receipt?.receiptUrl;

  // Poll Timeout logic
  React.useEffect(() => {
    if (!paymentVerified || !internalReference || receiptReady) return;
    if (!pollStartedAtRef.current) pollStartedAtRef.current = Date.now();
    if (Date.now() - pollStartedAtRef.current > 60000) setPollTimedOut(true);
  }, [
    paymentVerified,
    internalReference,
    receiptReady,
    receiptStatus.dataUpdatedAt,
  ]);

  const handleDownload = React.useCallback(() => {
    if (!internalReference) return;
    download.mutate(internalReference, {
      onSuccess: (blob) =>
        triggerBlobDownload(blob, `receipt-${internalReference}.pdf`),
    });
  }, [internalReference, download]);

  // Auto-download when receipt is ready and available
  React.useEffect(() => {
    if (receiptReady && internalReference && !autoDownloadedRef.current) {
      autoDownloadedRef.current = true;
      handleDownload();
    }
  }, [receiptReady, internalReference, handleDownload]);

  // 1. Missing Reference
  if (!reference) {
    return (
      <MockupShowcaseWrapper>
        <StatusCard
          icon={<XCircle className="size-12 text-destructive" />}
          title="Missing Reference"
          description="We couldn't find a valid transaction reference to verify."
          action={
            <Button
              asChild
              className="h-12 w-full rounded-2xl bg-zinc-950 font-medium text-white hover:bg-zinc-800"
            >
              <Link href="/pay">Return to Payment</Link>
            </Button>
          }
        />
      </MockupShowcaseWrapper>
    );
  }

  // 2. Loading Verification
  if (verify.isPending) {
    return (
      <MockupShowcaseWrapper>
        <StatusCard
          icon={<Loader2 className="size-10 animate-spin text-zinc-900" />}
          title="Verifying Payment..."
          description="Please wait while we confirm your transaction."
        />
      </MockupShowcaseWrapper>
    );
  }

  // 3. Payment Failed / Error
  if (verify.isError || verify.data?.status === "failed") {
    return (
      <MockupShowcaseWrapper>
        <StatusCard
          icon={
            <div className="flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-4 ring-red-50/50">
              <XCircle className="size-8" />
            </div>
          }
          title="Payment Failed"
          description="The transaction could not be completed or was declined."
          action={
            <Button
              asChild
              className="h-12 w-full rounded-2xl bg-zinc-950 font-medium text-white hover:bg-zinc-800"
            >
              <Link href="/pay">Try Again</Link>
            </Button>
          }
        />
      </MockupShowcaseWrapper>
    );
  }

  // 4. Payment Successful
  if (paymentVerified) {
    const referenceNo = receipt?.reference || internalReference || reference;
    const matricNumber = receipt?.matricNumber || "Verified";
    const dateFormatted = receipt?.createdAt
      ? formatDateTime(receipt.createdAt)
      : formatDateTime(new Date().toISOString());

    return (
      <MockupShowcaseWrapper>
        {/* Main Floating Card */}
        <div className="relative w-full max-w-[380px] sm:max-w-[390px] rounded-[32px] border border-zinc-100/90 bg-white p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)]">
          {/* Top Notch Handle Bar */}
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-zinc-200/80" />

          {/* Scalloped Success Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 flex size-14 items-center justify-center">
              <ScallopedBadge className="absolute inset-0 size-full text-emerald-100" />
              <Check className="relative size-6 stroke-[3] text-emerald-500" />
            </div>

            <h1 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl leading-snug">
              Your payment has been
              <br />
              successfully processed
            </h1>
          </div>

          {/* Inset Box with fields */}
          <div className="mt-6 rounded-2xl border border-zinc-100 bg-white p-1">
            <div className="divide-y divide-zinc-100/90">
              <DetailRow label="Reference No" value={referenceNo} isMono />
              <DetailRow label="Matric Number" value={matricNumber} />
              <DetailRow label="Date & Time" value={dateFormatted} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2">
            <Button
              onClick={handleDownload}
              disabled={download.isPending || !receiptReady}
              className="h-12 w-full rounded-2xl bg-zinc-950 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-70"
            >
              {download.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Downloading...
                </>
              ) : !receiptReady ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Preparing Receipt PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 size-4" />
                  Download Receipt PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </MockupShowcaseWrapper>
    );
  }

  return (
    <MockupShowcaseWrapper>
      <StatusCard
        icon={<Loader2 className="size-10 animate-spin text-zinc-900" />}
        title="Finalizing Details..."
        description="Please wait a moment."
      />
    </MockupShowcaseWrapper>
  );
}

// Inset Row Component
function DetailRow({
  label,
  value,
  isMono = false,
  highlight = false,
}: {
  label: string;
  value: string;
  isMono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-3.5 py-3 text-xs">
      <span className="text-zinc-400 font-medium">{label}</span>
      <span
        className={`truncate text-right max-w-[190px] ${
          highlight
            ? "text-sm font-bold text-zinc-900"
            : isMono
              ? "font-mono font-medium text-zinc-800"
              : "font-semibold text-zinc-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// Full-Page Background Showcase with Uniform Spacing & Dynamic Mobile Peeking
function MockupShowcaseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f6f7f9] flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-16 px-4">
      {/* 1. TOP PEEK CARD */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 sm:-top-44 left-1/2 -translate-x-1/2 w-[340px] sm:w-[390px] h-[280px] rounded-[36px] border border-zinc-200/60 bg-white/75 shadow-[0_15px_40px_rgba(0,0,0,0.02)] select-none"
      />

      {/* 2. BOTTOM PEEK CARD */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 sm:-bottom-70 left-1/2 -translate-x-1/2 w-[340px] sm:w-[390px] h-[320px] rounded-[36px] border border-zinc-200/60 bg-white/75 shadow-[0_15px_40px_rgba(0,0,0,0.02)] select-none"
      />

      {/* LEFT SIDE COLUMNS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-[calc(50%+120px)] left-1/2 -translate-x-[495px] flex flex-col gap-6 opacity-75 select-none"
      >
        <div className="w-[280px] h-[320px] rounded-[36px] border border-zinc-200/60 bg-white/75 shadow-sm" />
        <div className="w-[280px] h-[460px] rounded-[36px] border border-zinc-200/60 bg-white/75 shadow-sm" />
        <div className="w-[280px] h-[380px] rounded-[36px] border border-zinc-200/60 bg-white/75 shadow-sm" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-[calc(50%-80px)] left-1/2 -translate-x-[799px] flex flex-col gap-6 opacity-60 hidden sm:flex select-none"
      >
        <div className="w-[280px] h-[360px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[440px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[420px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-[calc(50%+160px)] left-1/2 -translate-x-[1103px] flex flex-col gap-6 opacity-45 hidden lg:flex select-none"
      >
        <div className="w-[280px] h-[340px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[440px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[480px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-[calc(50%-100px)] left-1/2 -translate-x-[1407px] flex flex-col gap-6 opacity-30 hidden 2xl:flex select-none"
      >
        <div className="w-[280px] h-[380px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[420px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[460px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
      </div>

      {/* RIGHT SIDE COLUMNS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-[calc(50%+120px)] left-1/2 translate-x-[215px] flex flex-col gap-6 opacity-75 select-none"
      >
        <div className="w-[280px] h-[340px] rounded-[36px] border border-zinc-200/60 bg-white/75 shadow-sm" />
        <div className="w-[280px] h-[460px] rounded-[36px] border border-zinc-200/60 bg-white/75 shadow-sm" />
        <div className="w-[280px] h-[380px] rounded-[36px] border border-zinc-200/60 bg-white/75 shadow-sm" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-[calc(50%-80px)] left-1/2 translate-x-[519px] flex flex-col gap-6 opacity-60 hidden sm:flex select-none"
      >
        <div className="w-[280px] h-[380px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[420px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[420px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-[calc(50%+160px)] left-1/2 translate-x-[823px] flex flex-col gap-6 opacity-45 hidden lg:flex select-none"
      >
        <div className="w-[280px] h-[320px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[440px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[480px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-[calc(50%-100px)] left-1/2 translate-x-[1127px] flex flex-col gap-6 opacity-30 hidden 2xl:flex select-none"
      >
        <div className="w-[280px] h-[360px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[420px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
        <div className="w-[280px] h-[460px] rounded-[36px] border border-zinc-200/60 bg-white/70 shadow-sm" />
      </div>

      {/* Main Focus Center Card */}
      <div className="relative z-10 flex w-full justify-center">{children}</div>
    </div>
  );
}

// Scalloped Badge SVG
function ScallopedBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M50 0 C56 10, 64 10, 75 5 C80 16, 88 20, 95 30 C93 41, 98 49, 100 60 C92 68, 92 76, 88 87 C77 88, 71 95, 60 98 C51 93, 43 96, 35 100 C27 92, 19 92, 10 88 C9 77, 2 71, 0 60 C6 51, 3 43, 0 35 C8 27, 8 19, 12 10 C23 9, 29 2, 40 0 Z" />
    </svg>
  );
}

// Fallback Status Card
function StatusCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[390px] rounded-[32px] border border-zinc-100 bg-white p-7 sm:p-8 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)]">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h2 className="text-xl font-bold tracking-tight text-zinc-900">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}