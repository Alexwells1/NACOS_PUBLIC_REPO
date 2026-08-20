"use client";

import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  placeholderSrc: string;
  alt: string;
  className?: string;
}

export const OptimizedImage = ({
  src,
  placeholderSrc,
  alt,
  className = "",
}: OptimizedImageProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={placeholderSrc}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
  );
};