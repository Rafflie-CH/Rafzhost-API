/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",          // buka root domain
        destination: "/docs", // arahkan ke swagger docs
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
