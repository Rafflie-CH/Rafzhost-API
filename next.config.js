/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        // DESTINASI BARU: /docs
        destination: '/docs', 
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig
