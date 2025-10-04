/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/index',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
