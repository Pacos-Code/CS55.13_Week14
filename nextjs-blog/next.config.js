/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-srjc-f2025-cs-55-13.pantheonsite.io',
      },
    ],
  },
};

module.exports = nextConfig;

