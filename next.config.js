// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // pastikan root "/" menuju index page (pages/index.js)
      // jika kamu memang mau index di "/", kamu bisa hapus ini.
      // Namun beberapa deployment/rewrites kadang mengarahkan ke /docs;
      // redirect ini memastikan pengguna yg buka "/" akan tetap ke "/".
      {
        source: '/',
        destination: '/index',
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
