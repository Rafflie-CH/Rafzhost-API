// pages/docs.js

import dynamic from 'next/dynamic';
// Import CSS Swagger dari library React-nya
import 'swagger-ui-react/swagger-ui.css'; 

// Render komponen SwaggerUI hanya di sisi klien (browser)
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDoc({ swagger }) {
  return (
    <div style={{ padding: '20px' }}>
      {/* Menerima spesifikasi dari getServerSideProps */}
      <SwaggerUI spec={swagger} />
    </div>
  );
}

// Mengambil spesifikasi API saat request masuk (bukan saat build)
export async function getServerSideProps() {
    
  // Import next-swagger-doc di sini untuk menghindari error build Vercel
  const { generateApi } = await import('next-swagger-doc');

  const swagger = await generateApi({
    definition: {
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
    // Menunjuk ke folder API Anda untuk membaca JSDoc
    apiFolder: 'pages/api', 
  });

  return {
    props: {
      swagger,
    },
  };
}
