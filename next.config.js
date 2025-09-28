/** @type {import('next').NextConfig} */
const nextConfig = {
  // Biarkan redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs', 
        permanent: true,
      },
    ]
  },
  // Tambahkan konfigurasi di sini untuk mengizinkan folder 'src'
  // Ini adalah cara untuk memberi tahu Next.js agar memproses kode di luar 'pages'
  // Karena Anda tidak menggunakan folder 'src' sebagai root, kita fokus pada keamanan:

  // Perluasan pageExtensions dan memastikan ia memproses file logic
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], 

  // Tambahkan fitur eksperimental yang dapat mengatasi masalah import path.
  // Jika ini membuat error, hapus saja. Kita coba yang paling aman.
  // experimental: {
  //   outputFileTracingRoot: path.join(__dirname, '../'), 
  // },
}

module.exports = nextConfig
