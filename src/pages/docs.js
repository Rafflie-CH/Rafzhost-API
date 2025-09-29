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

  // Menentukan path absolut paling stabil di Vercel
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
    
    // Menggunakan path absolut
    apiFolder: apiDirectory, 
    // Menggunakan glob scanner normal dari root Vercel:
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
