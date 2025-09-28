/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  source: '/(.*).(jpg|jpeg|png|gif|svg|webp)',
  headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
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