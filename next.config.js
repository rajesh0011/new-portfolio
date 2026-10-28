/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep the MongoDB driver out of the bundle; it is loaded at runtime in the Node.js function.
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
