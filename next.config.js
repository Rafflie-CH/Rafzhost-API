/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gunakan fungsi redirects Next.js
  async redirects() {
    return [
      {
        // Source: Rute utama (root URL)
        source: '/',
        // Destination: Rute ke Swagger UI Anda
        destination: '/api/docs',
        // Permanent: 308 (digunakan untuk pengalihan permanen)
        permanent: true, 
      },
    ]
  },
}

module.exports = nextConfig
