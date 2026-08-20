import type { ApiError } from "@/lib/types";

export class ApiClientError extends Error {
  status: number;
  errors?: ApiError["errors"];
  code?: string;
  isNetworkError: boolean;

  constructor(
    message: string,
    status: number,
    opts?: { errors?: ApiError["errors"]; code?: string; isNetworkError?: boolean }
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = opts?.errors;
    this.code = opts?.code;
    this.isNetworkError = opts?.isNetworkError ?? false;
  }
}
