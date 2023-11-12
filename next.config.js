/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sipath-afaq.s3.amazonaws.com'],
  },
  webpack: (config) => {
    // ignore formidable warnings
  // ignore formidable warnings
  config.ignoreWarnings = [
    { module: /node_modules[\/\\]rc-time-picker[\/\\]lib[\/\\]TimePicker\.js/ },
    { file: /node_modules[\/\\]rc-time-picker[\/\\]lib[\/\\]index\.js/ },
  ];

    return config;
  },
};

module.exports = nextConfig;
