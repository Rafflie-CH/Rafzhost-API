// pages/docs.js
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// Import komponen secara dinamis (hanya di client/browser)
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDoc({ swagger }) {
  return (
    <div style={{ padding: '20px' }}>
      <SwaggerUI spec={swagger} />
    </div>
  );
}

// Gunakan getServerSideProps untuk mengatasi masalah build Vercel
// Ini memastikan spesifikasi API diambil saat request, BUKAN saat build.
export async function getServerSideProps() {
    
  // Kita TIDAK lagi fetch dari http://localhost, kita langsung gunakan next-swagger-doc
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
    apiFolder: 'pages/api', // Path ke folder API Anda
  });

  return {
    props: {
      swagger,
    },
  };
}
