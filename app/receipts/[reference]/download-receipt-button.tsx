"use client";

import { DownloadIcon, Loader2Icon } from "lucide-react";
import { useDownloadReceipt } from "@/hooks/use-receipts";
import { triggerBlobDownload } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ApiClientError } from "@/lib/api/errors";

export function DownloadReceiptButton({ reference }: { reference: string }) {
  const download = useDownloadReceipt();

  function onClick() {
    download.mutate(reference, {
      onSuccess: (blob) => triggerBlobDownload(blob, `receipt-${reference}.pdf`),
      onError: (error) =>
        toast.error(error instanceof ApiClientError ? error.message : "Download failed."),
    });
  }

  return (
    <Button onClick={onClick} disabled={download.isPending} className="w-full">
      {download.isPending ? <Loader2Icon className="animate-spin" /> : <DownloadIcon />}
      {download.isPending ? "Preparing…" : "Download receipt"}
    </Button>
  );
}
