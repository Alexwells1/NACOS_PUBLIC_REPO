// Client-side calls (browser) always use the public URL. Server Components
// prefer an internal network path when one is configured (spec §2), falling
// back to the same public URL otherwise.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export const INTERNAL_API_URL = process.env.API_INTERNAL_URL ?? API_URL;
