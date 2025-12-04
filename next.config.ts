import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false, 
  serverExternalPackages: ["@node-rs/argon2"] 
};

export default nextConfig;
