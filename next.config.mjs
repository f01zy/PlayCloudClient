/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "94.241.171.213"
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
