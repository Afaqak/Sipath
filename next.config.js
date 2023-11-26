/** @type {import('next').NextConfig} */
const nextConfig = {


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sipath-afaq.s3.amazonaws.com',
      }
    ],
  },
};

module.exports = nextConfig;
