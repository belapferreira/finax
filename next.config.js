/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['ui-avatars.com'],
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
