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

// 💥 PERBAIKAN KRITIS: Menggunakan require() SINKRON untuk menghindari TypeError Vercel
export function getServerSideProps() {
    
  // Gunakan require langsung di sini (bukan await import)
  const { generateApi } = require('next-swagger-doc');

  // Panggil generateApi secara sinkron
  const swagger = generateApi({
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
    
    // Path Scanner yang sudah kita sepakati (hanya pages/api)
    apiFolder: 'pages/api', 
    files: [
        'pages/api/**/*.js', 
    ],
  });

  return {
    props: {
      swagger,
    },
  };
}
