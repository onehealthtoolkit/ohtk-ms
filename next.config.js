/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
    };
  },
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
