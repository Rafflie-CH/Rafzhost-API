// src/pages/docs.js

const path = require('path');
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

  // Karena Next.js menggunakan src/, kita bisa mencoba path konvensional
  const apiDirectory = path.join(process.cwd(), 'src', 'pages', 'api');

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
    
    // MENGGUNAKAN PATH ABSOLUT YANG SEBELUMNYA KITA COBA
    // Ini adalah path yang paling andal:
    apiFolder: apiDirectory, 
    // Files menggunakan glob normal yang dipindai dari root:
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
