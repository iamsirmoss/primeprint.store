import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false, 
  serverExternalPackages: ["@node-rs/argon2"],
   images: {
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
    ],
  }, 
};

export default nextConfig;
