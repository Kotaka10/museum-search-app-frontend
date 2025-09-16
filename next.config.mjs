import { defineConfig } from 'next';

export default defineConfig({
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
        hostname: "another.com",
      },
    ],
  },
});