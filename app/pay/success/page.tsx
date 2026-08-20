import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentResult } from "./payment-result";
import { Loader2Icon } from "lucide-react";

export const metadata: Metadata = { title: "Payment Verification | NACOS" };

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const params = await searchParams;
  const reference = params.reference ?? params.trxref ?? null;

  return (
    <main className="min-h-[100dvh] w-full">
      <Suspense
        fallback={
          <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-3 bg-[#f6f7f9] p-4 text-center">
            <Loader2Icon className="size-9 animate-spin text-zinc-900" />
            <p className="text-xs font-medium text-zinc-500 animate-pulse">
              Initializing verification...
            </p>
          </div>
        }
      >
        <PaymentResult reference={reference} />
      </Suspense>
    </main>
  );
}