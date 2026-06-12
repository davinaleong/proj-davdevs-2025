import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack has a bug resolving @vercel/turbopack-next internal font URLs.
  // Disable until the upstream fix lands.
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
