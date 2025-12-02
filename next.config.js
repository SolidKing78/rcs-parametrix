/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/rcs-parametrix' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/rcs-parametrix' : '',
  trailingSlash: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

