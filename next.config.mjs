/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "85.193.80.231"
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
