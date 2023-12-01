/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'haideptrai.pythonanywhere.com',
            port: '',
          },
        ],
      },
};

module.exports = nextConfig;
