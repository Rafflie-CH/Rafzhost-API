// pages/docs.js

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css'; 

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDoc({ swagger }) {
  return (
    <div style={{ padding: '20px' }}>
      <SwaggerUI spec={swagger} />
    </div>
  );
}

export async function getServerSideProps() {
    
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
    
    // Konfigurasi Path Scanner
    apiFolder: 'pages/api', // Root tempat Next.js mencari API Route
    
    // 💥 FIX KRITIS: Hanya pindai pages/api
    files: [
        'pages/api/**/*.js', 
        // Hapus pemindaian 'src/**/*.js' untuk menghindari konflik runtime.
    ],
  });

  return {
    props: {
      swagger,
    },
  };
}
