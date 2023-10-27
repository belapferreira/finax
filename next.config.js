/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['ui-avatars.com'],
  },

  basePath: '/finax',
};

module.exports = nextConfig;
