"use client";

import { API_URL } from "./config";
import { ApiClientError } from "./errors";
import type { ApiError, ApiSuccess } from "@/lib/types";

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Skip attaching Authorization header (public endpoints). */
  skipAuth?: boolean;
  /** Skip the automatic 401 -> refresh -> retry-once cycle. */
  skipRefresh?: boolean;
  /** Parse response as a binary Blob instead of JSON (file downloads). */
  responseType?: "json" | "blob";
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, responseType = "json", headers, ...rest } = options;

  const doFetch = async (): Promise<Response> => {
    const finalHeaders: Record<string, string> = {
      ...(body !== undefined && !(body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      "ngrok-skip-browser-warning": "true", // <-- Bypasses ngrok warning page
      ...(headers as Record<string, string>),
    };

    return fetch(`${API_URL}${path}`, {
      ...rest,
      credentials: "include",
      headers: finalHeaders,
      body:
        body === undefined
          ? undefined
          : body instanceof FormData
            ? body
            : JSON.stringify(body),
    });
  };

  let res: Response;
  try {
    res = await doFetch();
  } catch {
    throw new ApiClientError("Can't reach the server, check your connection.", 0, {
      isNetworkError: true,
    });
  }

  if (responseType === "blob") {
    if (!res.ok) {
      throw new ApiClientError("Download failed.", res.status);
    }
    return (await res.blob()) as unknown as T;
  }

  let json: ApiSuccess<T> | ApiError | undefined;
  try {
    json = await res.json();
  } catch {
    // no body
  }

  if (!res.ok || !json?.success) {
    const errJson = json as ApiError | undefined;
    throw new ApiClientError(errJson?.message ?? `Request failed (${res.status})`, res.status, {
      errors: errJson?.errors,
      code: errJson?.code,
    });
  }

  return (json as ApiSuccess<T>).data;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};