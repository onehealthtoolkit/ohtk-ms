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
  },
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
