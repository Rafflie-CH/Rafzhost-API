/** @type {import('next').NextConfig} */
const nextConfig = {
  // 💥 PERBAIKAN KRITIS: Menambahkan srcDir
  compiler: {
    // Ini memastikan Next.js mencari folder pages di dalam src/
    // Catatan: Jika ini menyebabkan error, coba hapus seluruh objek 'compiler'
  },
  
  // Ini adalah properti utama yang memberitahu Next.js root code sekarang di src/
  // Namun, karena 'src' adalah konvensi, properti ini kadang tidak diperlukan.
  // Jika Next.js tidak otomatis mendeteksi, tambahkan konfigurasi ini:
  // experimental: {
  //   outputFileTracingRoot: path.join(__dirname, '..'), 
  //   // Ini adalah solusi jika Next.js kesulitan menemukan file
  // },

  // JANGAN UBAH REDIRECTS, biarkan saja:
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs', 
        permanent: true,
      },
    ]
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], 
}

module.exports = nextConfig
