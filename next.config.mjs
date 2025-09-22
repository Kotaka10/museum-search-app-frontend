/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "museum-search-app-theta.vercel.app",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "museum-research-app-backend.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;