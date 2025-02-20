// @ts-checks

import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const pwaConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/world\.openfoodfacts\.org\/.*$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "open-food-facts-api",
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = pwaConfig({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.openfoodfacts.org"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
});

export default nextConfig;
