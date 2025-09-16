/** @type {import('next').NextConfig} */
export const images = {
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
};