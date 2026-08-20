"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  SearchIcon,
  XCircleIcon,
  Loader2Icon,
} from "lucide-react";
import { useReceiptsByMatric } from "@/hooks/use-receipts";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/shared/state";
import { ApiClientError } from "@/lib/api/errors";
import { DownloadReceiptButton } from "./[reference]/download-receipt-button";
import { Skeleton } from "@/components/ui/skeleton";

const MATRIC_REGEX = /^20\d{6}$/;

export function ReceiptsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL as source of truth
  const query = searchParams.get("q") || "";
  const [inputValue, setInputValue] = React.useState(query);
  const [error, setError] = React.useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
    error: apiError,
    refetch,
  } = useReceiptsByMatric(query, Boolean(query));

  const updateUrl = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val) params.set("q", val);
    else params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) return;
    if (!MATRIC_REGEX.test(trimmed)) {
      setError("Please enter a valid 8-digit matric number starting with 20.");
      return;
    }

    setError(null);
    updateUrl(trimmed);
  };

  const clearSearch = () => {
    setInputValue("");
    setError(null);
    updateUrl("");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative group">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="e.g. 20123456"
              className="pl-9 pr-9 h-10 sm:h-11 text-sm sm:text-base"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError(null);
              }}
              aria-invalid={!!error}
              aria-describedby={error ? "search-error" : undefined}
            />
            {inputValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
              >
                <XCircleIcon className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
          <Button
            type="submit"
            className="h-10 sm:h-11 px-4 sm:px-6 shrink-0"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2Icon className="h-4 w-4 animate-spin sm:mr-2" />
            ) : null}
            <span className={isLoading ? "hidden sm:inline" : "inline"}>Search</span>
          </Button>
        </div>
        {error && (
          <p
            id="search-error"
            className="mt-2 text-xs sm:text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1"
          >
            {error}
          </p>
        )}
      </form>

      {/* Results Section */}
      <div aria-live="polite" className="min-h-[260px]">
        {!query && (
          <EmptyState
            title="Start your search"
            message="Enter your matric number above to find all associated payment receipts."
          />
        )}

        {query && isLoading && <ReceiptsSkeleton />}

        {query && isError && (
          <ErrorState
            message={
              apiError instanceof ApiClientError
                ? apiError.message
                : "We couldn't retrieve your receipts. Please try again."
            }
            onRetry={() => refetch()}
          />
        )}

        {query && !isLoading && !isError && data?.length === 0 && (
          <EmptyState
            title="No records found"
            message={`We couldn't find any payments associated with "${query}".`}
          />
        )}

        {query && data && data.length > 0 && (
          <div className="grid gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground px-0.5">
              {`Showing ${data.length} ${data.length === 1 ? "receipt" : "receipts"} for "${query}"`}
            </p>
            {data.map((receipt) => (
              <Card
                key={receipt._id}
                className="overflow-hidden hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-3.5 sm:p-5">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <Link
                      href={`/receipts/${receipt.reference}`}
                      className="group flex-1 min-w-0 space-y-0.5 sm:space-y-1"
                    >
                      <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                        {receipt.tenantId.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-muted-foreground">
                        <span>{receipt.sessionId.label}</span>
                        <span>•</span>
                        <span>{formatDate(receipt.createdAt)}</span>
                      </div>
                    </Link>

                    <div className="shrink-0 flex items-center">
                      <DownloadReceiptButton reference={receipt.reference} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReceiptsSkeleton() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <Skeleton className="h-4 w-32 mb-4" />
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-3.5 sm:p-5 flex justify-between items-center gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              <Skeleton className="h-4 sm:h-5 w-40 sm:w-48 max-w-full" />
              <Skeleton className="h-3.5 sm:h-4 w-28 sm:w-32" />
            </div>
            <Skeleton className="h-9 w-9 sm:h-10 sm:w-28 shrink-0 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}