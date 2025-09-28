/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fungsi untuk mengelola pengalihan URL
  async redirects() {
    return [
      {
        // Source: Rute utama (root URL)
        source: '/',
        // Destination: Rute ke Swagger UI Anda
        destination: '/api/docs',
        // Permanent: 301 (dikenal SEO) atau 308
        permanent: true,
      },
      // Anda bisa menambahkan redirect lain di sini jika diperlukan
    ]
  },
  
  // (Jika Anda memiliki konfigurasi Next.js lainnya, letakkan di sini)
}

module.exports = nextConfig
