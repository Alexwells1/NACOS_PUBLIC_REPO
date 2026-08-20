
export function optimizeCloudinary(url: string): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const [prefix, suffix] = url.split("/upload/");
  if (!suffix) return url;

  const firstSegment = suffix.split("/")[0];
  const looksLikeTransform = /[,_]/.test(firstSegment) && /^[a-z0-9_,.:%-]+$/i.test(firstSegment);
  if (looksLikeTransform) {
    return url;
  }

  return `${prefix}/upload/f_auto,q_auto/${suffix}`;
}
