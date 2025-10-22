/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export only for Netlify builds
  ...(process.env.NETLIFY && { output: 'export' }),

  // Add trailing slash to ensure proper routing
  trailingSlash: true,

  // Keep image optimization disabled for compatibility
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
