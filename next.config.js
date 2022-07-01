/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/graphql/",
        destination: "http://opensur.test/graphql/", // Proxy to Backend
      },
    ];
  },
  publicRuntimeConfig: {
    serverUrl: "http://opensur.test:8000",
  },
};

module.exports = nextConfig;
