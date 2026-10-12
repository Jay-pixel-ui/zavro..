/** @type {import('next').NextConfig} */
const BACKEND_URL = process.env.BACKEND_URL || "https://zavro-backend.vercel.app";

const nextConfig = {
  // Zavro backend (leads, CRM, portal, AI). /api/chat stays in this app.
  async rewrites() {
    return [
      { source: "/api/leads", destination: `${BACKEND_URL}/api/leads` },
      { source: "/api/auth/:path*", destination: `${BACKEND_URL}/api/auth/:path*` },
      { source: "/api/crm/:path*", destination: `${BACKEND_URL}/api/crm/:path*` },
      { source: "/api/portal/:path*", destination: `${BACKEND_URL}/api/portal/:path*` },
      { source: "/api/ai/:path*", destination: `${BACKEND_URL}/api/ai/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
