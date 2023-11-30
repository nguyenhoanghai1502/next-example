/** @type {import('next').NextConfig} */
const nextConfig = {
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
