/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sipath-afaq.s3.amazonaws.com',
      },
  
    ],
  },
};

module.exports = nextConfig;
