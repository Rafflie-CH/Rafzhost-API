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
    
  // Wajib menggunakan require()
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
    
    // 💥 KOREKSI ABSOLUT PATH: Hapus 'src/' dari konfigurasi path scanner
    // Biarkan next-swagger-doc menggunakan path relatif Next.js:
    apiFolder: 'pages/api', // Coba kembalikan ke path lama Next.js
    files: [
        'src/pages/api/**/*.js', // Tetap gunakan src/ di sini untuk JSDoc file scanning
    ],
  });

  return {
    props: {
      swagger,
    },
  };
}
