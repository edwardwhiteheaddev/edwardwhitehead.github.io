/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
