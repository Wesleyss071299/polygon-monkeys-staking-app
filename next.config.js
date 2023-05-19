/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: { domains: ['https://www.arweave.net/', 'www.arweave.net'] },
  transpilePackages: [
    '@web3modal/ethereum',
    '@web3modal/react',
    '@web3modal/ui',
    '@web3modal/core'
  ]
};

module.exports = nextConfig;
