// src/pages/docs.js

// [1] Wajib: Menggunakan import dynamic untuk Client-Side Rendering
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

// [2] Wajib: Menggunakan require() di dalam fungsi untuk stabilitas serverless
export function getServerSideProps() {
    
  // Wajib menggunakan require() untuk menghindari TypeError di runtime Vercel
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
    
    // Path Scanner: Harus menyertakan 'src/' di awal setelah migrasi
    apiFolder: 'src/pages/api', 
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
