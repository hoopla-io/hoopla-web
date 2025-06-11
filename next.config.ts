import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.hoopla.uz",
        port: "",
        pathname: "/images/**",
      },
    ],
    domains: ["api.hoopla.uz"],
  },
};

export default withNextIntl(nextConfig);
