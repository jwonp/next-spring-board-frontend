/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1", "127.0.0.1:8000", process.env.IMAGES_PROMOTE_DOMAIN],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/files/display/**/**",
      },
      {
        protocol: "http",
        hostname: process.env.IMAGES_PROMOTE_HOSTNAME,
        port: process.env.IMAGES_PROMOTE_PORT,
        pathname: process.env.IMAGES_PROMOTE_PATHNAME,
      },
      {
        protocol: "https",
        hostname: process.env.IMAGES_PROMOTE_HOSTNAME,
        port: process.env.IMAGES_PROMOTE_PORT,
        pathname: process.env.IMAGES_PROMOTE_PATHNAME,
      },
    ],
  },
};

module.exports = nextConfig;
