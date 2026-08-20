import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  // Keep your other dev configs
  allowedDevOrigins: ["172.20.10.3"],

  /*
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: `${process.env.ADMIN_APP_URL}/admin/:path*`,
      },
    ];
  },
  */
};

export default nextConfig;