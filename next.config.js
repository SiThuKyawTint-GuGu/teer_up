/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "teeup-dev.s3.amazonaws.com",
      "teeup-dev.s3.ap-southeast-1.amazonaws.com",
      "karawanico.com",
      "via.placeholder.com",
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
