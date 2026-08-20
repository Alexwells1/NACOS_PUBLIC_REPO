// app/receipts/page.tsx
import type { Metadata } from "next";
import { ReceiptsSearch } from "./receipts-search";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Find my receipts" };

export default function ReceiptsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find my receipts</h1>
        <p className="mt-2 text-muted-foreground">
          Enter the matric number used for payment to retrieve your transaction history.
        </p>
      </header>
      
      {/* SearchParams hooks require Suspense in App Router */}
      <Suspense fallback={<div className="h-10 w-full animate-pulse bg-muted rounded-md" />}>
        <ReceiptsSearch />
      </Suspense>
    </div>
  );
}