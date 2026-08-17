/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  transpilePackages: ["uuid"],
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
    };
  },
  publicRuntimeConfig: {
    serverDomain: process.env.serverDomain || "opensur.test",
    tenantsApiEndpoint:
      process.env.tenantsApiEndpoint || "https://opensur.test/api/servers/",
    supportEmail: process.env.supportEmail || "support@onehealth.com",
  },
  images: {
    loader: "akamai",
    path: "",
  },
  output: "standalone",
};

module.exports = nextConfig;
