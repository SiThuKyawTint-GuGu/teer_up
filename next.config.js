/** @type {import('next').NextConfig} */

const cspHeader = `
    frame-ancestors 'none';
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
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
