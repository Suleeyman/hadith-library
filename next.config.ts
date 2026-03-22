import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: false, // ❗️❗️❗️❗️❗️ this removes the logging!
  },
};

export default nextConfig;
