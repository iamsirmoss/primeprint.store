import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  serverExternalPackages: ["@node-rs/argon2"],

  images: {
    // 🔥 autorise images locales + externes
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "images.stockcake.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // 🔥 IMPORTANT pour futur CDN / storage
      {
        protocol: "https",
        hostname: "**", // temporaire pour dev
      },
    ],
  },
};

export default nextConfig;