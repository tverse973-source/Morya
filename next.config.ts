import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data: https:",
  "connect-src 'self' https:",
  "frame-src 'self' https://www.youtube.com https://wa.me",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.NODE_ENV === "development" ? ["localhost", "127.0.0.1"] : undefined,
  compress: true,
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "coresg-normal.trae.ai" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "en.wikipedia.org" },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: CSP },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
