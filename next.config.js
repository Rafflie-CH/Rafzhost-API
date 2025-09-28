/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi redirect
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs', 
        permanent: true,
      },
    ]
  },
  // Pastikan ekstensi file API Routes Anda terbaca
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], 
}

module.exports = nextConfig
