import { apiClient } from "./client";
import { paths } from "./paths";
import type {
  InitializePaymentResult,
  PaymentMaintenanceStatus,
  StudentLevel,
  StudentStatus,
  Transaction,
  VerifyCallbackResult,
} from "@/lib/types";

export function getMaintenanceStatus() {
  return apiClient.get<PaymentMaintenanceStatus>(paths.payments.maintenanceStatus, {
    skipAuth: true,
  });
}

export interface CheckoutInput {
  tenantCode: string;
  studentName: string;
  email: string;
  phone: string;
  matricNumber: string;
  level: StudentLevel;
  studentStatus: StudentStatus;
  gender?: string;
  roomNumber?: string;
}

export function initializePayment(input: CheckoutInput) {
  return apiClient.post<InitializePaymentResult>(paths.payments.initialize, input, {
    skipAuth: true,
  });
}

export function verifyPaymentCallback(reference: string) {
  return apiClient.post<VerifyCallbackResult>(
    paths.payments.verifyCallback,
    { reference },
    { skipAuth: true }
  );
}

export function getPaymentByReference(reference: string) {
  return apiClient.get<Transaction>(paths.payments.byReference(reference), { skipAuth: true });
}
