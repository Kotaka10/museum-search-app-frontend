/** @type {import('next').NextConfig} */
export const images = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "example.com",
    },
    {
      protocol: "https",
      hostname: "another.com",
    },
  ],
};