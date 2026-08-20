import "server-only";
import { INTERNAL_API_URL } from "./config";
import { ApiClientError } from "./errors";
import type { ApiError, ApiSuccess } from "@/lib/types";

interface ServerFetchOptions {
  /** Query params to append. */
  searchParams?: Record<string, string | number | boolean | undefined>;
  /**
   * 'no-store' for anything role-sensitive/financial (default — spec §7.1);
   * pass { revalidate: N } only for genuinely public, low-sensitivity data.
   */
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

function buildUrl(path: string, searchParams?: ServerFetchOptions["searchParams"]) {
  const url = new URL(`${INTERNAL_API_URL}${path}`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

/** Public (unauthenticated) server fetch — no session cookie read. */
export async function publicServerFetch<T>(
  path: string,
  options: ServerFetchOptions = {}
): Promise<T> {
  const res = await fetch(buildUrl(path, options.searchParams), {
    cache: options.cache ?? "no-store",
    next: options.next,
  });

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
