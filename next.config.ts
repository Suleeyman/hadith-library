import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: true, // ❗️❗️❗️❗️❗️ this removes the logging!
  },
};

export default nextConfig;
