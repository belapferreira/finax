/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['ui-avatars.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
