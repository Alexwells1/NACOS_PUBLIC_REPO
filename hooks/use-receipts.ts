"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import * as receiptsApi from "@/lib/api/receipts";

export function useReceiptsByMatric(matricNumber: string, enabled: boolean) {
  return useQuery({
    queryKey: ["receipts", "by-matric", matricNumber],
    queryFn: () => receiptsApi.getReceiptsByMatric(matricNumber),
    enabled,
  });
}

export function useReceiptVerification(reference: string) {
  return useQuery({
    queryKey: ["receipts", "verify", reference],
    queryFn: () => receiptsApi.verifyReceipt(reference),
    enabled: Boolean(reference),
    retry: false,
  });
}

export function useReceiptStatus(reference: string, enabled: boolean) {
  return useQuery({
    queryKey: ["receipts", "status", reference],
    queryFn: () => receiptsApi.getReceiptByReference(reference),
    enabled: Boolean(reference) && enabled,
    retry: false,
    refetchInterval: (query) => (query.state.data?.receiptUrl ? false : 1500),
  });
}

export function useDownloadReceipt() {
  return useMutation({
    mutationFn: (reference: string) => receiptsApi.downloadReceipt(reference),
  });
}
