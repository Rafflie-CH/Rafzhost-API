/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",       // kalau buka root
        destination: "/docs", // diarahkan ke /docs
        permanent: false,  // bisa ubah nanti kalau sudah fix
      },
    ];
  },
};

module.exports = nextConfig;
