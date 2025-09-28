// pages/docs.js

// ... (dynamic import dan komponen ApiDoc tetap sama)
// ...

// Mengambil spesifikasi API saat request masuk
export async function getServerSideProps() {
    
  const { generateApi } = await import('next-swagger-doc');

  const swagger = await generateApi({
    definition: {
      // ... (Definisi Swagger tetap sama)
      openapi: '3.0.0',
      info: {
        title: 'Rafzhost API Documentation',
        version: '1.0.0',
        description: 'Dokumentasi REST API untuk Downloader dan Tools.',
      },
      servers: [
        {
          url: '/api',
        },
      ],
    },
    
    // 💥 FIX KRITIS: KONFIGURASI PATH SCANNER
    // Path folder API utama (root untuk endpoint)
    apiFolder: 'pages/api', 
    
    // File/Folder yang harus dipindai untuk JSDoc
    // Kita menunjuk ke semua folder di dalam pages/api/
    files: [
        'pages/api/**/*.js',  // Memindai semua file JS di dalam pages/api/
        'src/downloader/**/*.js' // Tambahkan file logic Anda di src/
    ],
  });

  return {
    props: {
      swagger,
    },
  };
}
