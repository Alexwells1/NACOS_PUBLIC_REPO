
export type TenantType = "COLLEGE" | "DEPARTMENT";
export type TenantStatus = "ACTIVE" | "FROZEN" | "ARCHIVED";
export interface Transaction {
  _id: string;
  reference: string;
  paystackReference?: string | null;
  studentName: string;
  matricNumber: string;
  email: string;
  phone: string;
  level: StudentLevel;
  studentStatus: StudentStatus;
  tenantId: string;
  tenantName?: string;
  tenantType?: TenantType;
  sessionId: string;
  sessionLabel?: string;
  amount: number;
  expectedAmount: number;
  baseAmount?: number;
  associationPayout: number;
  status: TransactionStatus;
  paymentType: PaymentType;
  gender?: string | null;
  roomNumber?: string | null;
  receiptUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}
export const STUDENT_LEVELS = [
  "100L",
  "200L",
  "200L(D.E)",
  "300L",
  "400L",
] as const;
export type StudentLevel = (typeof STUDENT_LEVELS)[number];

export type StudentStatus = "new" | "returning";
export type TransactionStatus = "pending" | "success" | "failed";
export type PaymentType = "online" | "manual";

export type OnboardingStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "APPROVAL_FAILED"
  | "CANCELLED";

// ─── Envelope (errorHandler.ts / every controller) ──────────────────────
export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[] | undefined>;
  code?: string;
  requestId?: string;
}

// ─── Tenant (models/Tenant.ts) ───────────────────────────────────────────
export interface Tenant {
  _id: string;
  name: string;
  code: string;
  type: TenantType;
  status: TenantStatus;
  financeDirectorId?: string | null;
  mainAdminId: string;
  bankName?: string | null;
  bankCode?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  logoUrl?: string | null;
  templateId: string;
  paystackSubaccountCode?: string | null;
  paystackSubaccountId?: number | null;
  normalizedName?: string | null;
  createdAt: string;
  updatedAt: string;
}


export type PublicTenant = Tenant & {
  feesLocked: boolean;
  newStudentFee: number;
  returningStudentFee: number;
};

// tenant.service.ts getPublicTenantsService() — a much slimmer projection
// than PublicTenant (used for the "pick your association" list).
export interface PublicTenantSummary {
  _id: string;
  name: string;
  code: string;
  type: TenantType;
  status: TenantStatus;
  logoUrl?: string | null;
  feesLocked: boolean;
  newStudentFee: number;
  returningStudentFee: number;
}

// ─── Onboarding (models/OnboardingRequest.ts) ────────────────────────────
export interface OnboardingRequest {
  _id: string;
  associationName: string;
  associationType: TenantType;
  contactFullName: string;
  contactPhone: string;
  associationEmail: string;
  financeDirectorFullName: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  resolvedAccountName: string;
  status: OnboardingStatus;
  submittedAt: string;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  resultingTenantId?: string | null;
  resultingFinanceDirectorId?: string | null;
  approvalAttempts: number;
  failureReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Bank {
  name: string;
  code: string;
  slug: string;
}

// ─── Payments (payment.service.ts) ───────────────────────────────────────
export interface InitializePaymentResult {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  internalReference: string;
  amount: number;
  baseAmount: number;
  totalPayable: number;
}

export interface VerifyCallbackResult {
  status: TransactionStatus;
  internalReference: string;
}

export interface PaymentMaintenanceStatus {
  maintenanceMode: boolean;
  message: string | null;
}

// ─── Receipts (receipt.service.ts — populated Transaction, email/phone
// stripped; tenantId/sessionId are populated objects, not id strings) ────
export interface ReceiptTransaction {
  _id: string;
  reference: string;
  paystackReference?: string | null;
  studentName: string;
  matricNumber: string;
  level: StudentLevel;
  studentStatus: StudentStatus;
  tenantId: { _id: string; name: string; type: TenantType; logoUrl?: string | null };
  sessionId: { _id: string; label: string };
  amount: number;
  baseAmount: number; // <--- Add this field
  expectedAmount: number;
  status: TransactionStatus;
  paymentType: PaymentType;
  receiptUrl?: string | null;
  createdAt: string;
}

// receipt.service.ts verifyReceiptService() — status here is a human-
// readable string, not a TransactionStatus enum value.
export interface ReceiptVerification {
  verified: boolean;
  reference: string;
  status: string;
  studentName?: string;
  matricNumber?: string;
  amount?: number;
  paymentDate?: string;
  session?: string;
  paidFor?: string;
  level?: StudentLevel;
  paymentType?: PaymentType;
  baseAmount?: number; 
}
