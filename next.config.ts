import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import type { NextConfig } from "next";

const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "mik",
      mongodb_password: "wrihnJumnhRf5d0u",
      mongodb_clustername: "cluster0",
      mongodb_database: isDev ? "my-site-dev" : "my-site",
    },
  };
};

export default nextConfig;
