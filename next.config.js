/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'haideptrai.pythonanywhere.com/',
            port: '8000',
          },
        ],
      },
};

module.exports = nextConfig;
