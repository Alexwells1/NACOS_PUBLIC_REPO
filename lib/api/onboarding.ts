import { apiClient } from "./client";
import { paths } from "./paths";
import type { Bank, OnboardingRequest, TenantType } from "@/lib/types";

export function getBanks() {
  return apiClient.get<Bank[]>(paths.onboarding.banks, { skipAuth: true });
}

export function resolveAccount(bankCode: string, accountNumber: string) {
  return apiClient.post<{ accountName: string }>(
    paths.onboarding.resolveAccount,
    { bankCode, accountNumber },
    { skipAuth: true }
  );
}

export interface SubmitOnboardingInput {
  associationName: string;
  associationType: TenantType;
  contactFullName: string;
  contactPhone: string;
  associationEmail: string;
  financeDirectorFullName: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  overrideExistingPendingRequestId?: string;
}

export function submitOnboarding(input: SubmitOnboardingInput) {
  return apiClient.post<OnboardingRequest>(paths.onboarding.submit, input, { skipAuth: true });
}

export function activateFinanceDirector(token: string, newPassword: string) {
  return apiClient.post<{ message: string }>(
    paths.onboarding.activate,
    { token, newPassword },
    { skipAuth: true }
  );
}
