/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs",
        permanent: true,
      },
    ];
  },
  pageExtensions: ['js','jsx','ts','tsx','md','mdx'],
};

module.exports = nextConfig;
