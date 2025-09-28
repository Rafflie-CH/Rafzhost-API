/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs', 
        permanent: true,
      },
    ]
  },
  // Tambahkan pageExtensions agar Next.js memproses file JSDoc dengan benar
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], 
}

module.exports = nextConfig
