/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
    };
  },
  publicRuntimeConfig: {
    serverDomain: process.env.serverDomain || "opensur.test",
    tenantsApiEndpoint:
      process.env.tenantsApiEndpoint || "https://opensur.test/api/servers/",
  },
  images: {
    loader: "akamai",
    path: "",
  },
  experimental: {
    outputStandalone: true, // next 12.1.x
    // for next 12.2.x -> root: { output: "standalone" }
  },
};

module.exports = nextConfig;
