// src/pages/docs.js

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

export function getServerSideProps() {
    
  // Menggunakan require() SINKRON untuk stabilitas Vercel
  const { generateApi } = require('next-swagger-doc');

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
    
    // Path scanner dari root Next.js:
    apiFolder: 'src/pages/api', // Diperlukan path lengkap setelah migrasi ke /src
    files: [
        'src/pages/api/**/*.js', 
    ],
  });

  return {
    props: {
      swagger,
    },
  };
}
