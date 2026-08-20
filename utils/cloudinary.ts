/**
 * Inserts Cloudinary's automatic-format/automatic-quality transformation
 * into an existing Cloudinary delivery URL, e.g.:
 *   https://res.cloudinary.com/<cloud>/image/upload/v123/photo.jpg
 *   -> https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto/v123/photo.jpg
 *
 * Non-Cloudinary URLs (or URLs that already carry a transformation segment)
 * are returned unchanged.
 */
export function optimizeCloudinary(url: string): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const [prefix, suffix] = url.split("/upload/");
  if (!suffix) return url;

  // If the first path segment after /upload/ already looks like a
  // transformation string (contains a comma or a known transform key),
  // leave it as-is rather than double up.
  const firstSegment = suffix.split("/")[0];
  const looksLikeTransform = /[,_]/.test(firstSegment) && /^[a-z0-9_,.:%-]+$/i.test(firstSegment);
  if (looksLikeTransform) {
    return url;
  }

  return `${prefix}/upload/f_auto,q_auto/${suffix}`;
}
