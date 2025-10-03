/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // ❌ Hapus redirect ke /docs, biarkan root "/" ke index.js
      // Kalau mau redirect lain tinggal tambahkan di sini
    ];
  },
};

module.exports = nextConfig;
