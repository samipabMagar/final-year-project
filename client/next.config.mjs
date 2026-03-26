/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Allow all Unsplash images
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Allow profile images served from the local API server
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
