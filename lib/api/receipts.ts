import { apiClient } from "./client";
import { paths } from "./paths";
import type { ReceiptTransaction, ReceiptVerification } from "@/lib/types";

export function getReceiptsByMatric(matricNumber: string) {
  return apiClient.get<ReceiptTransaction[]>(
    `${paths.receipts.byMatric}?matricNumber=${encodeURIComponent(matricNumber)}`,
    { skipAuth: true }
  );
}

export function getReceiptByReference(reference: string) {
  return apiClient.get<ReceiptTransaction>(paths.receipts.byReference(reference), {
    skipAuth: true,
  });
}

export function verifyReceipt(reference: string) {
  return apiClient.get<ReceiptVerification>(paths.receipts.verify(reference), { skipAuth: true });
}

export async function downloadReceipt(reference: string): Promise<Blob> {
  return apiClient.get<Blob>(paths.receipts.download(reference), {
    skipAuth: true,
    responseType: "blob",
  });
}
