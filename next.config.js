// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",       // kalau buka root
        destination: "/docs", // langsung diarahkan ke /docs
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
