"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import * as paymentsApi from "@/lib/api/payments";

export function useMaintenanceStatus() {
  return useQuery({
    queryKey: ["payments", "maintenance-status"],
    queryFn: paymentsApi.getMaintenanceStatus,
    staleTime: 15 * 1000,
  });
}

export function useInitializePayment() {
  return useMutation({ mutationFn: paymentsApi.initializePayment });
}

export function useVerifyPaymentCallback() {
  return useMutation({ mutationFn: (reference: string) => paymentsApi.verifyPaymentCallback(reference) });
}
