// src/pages/docs.js

// Wajib mengimpor modul path Node.js
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
    
  // Wajib menggunakan require() untuk stabilitas
  const { generateApi } = require('next-swagger-doc');

  // 💥 PERBAIKAN ABSOLUT PATH: Solusi paling stabil untuk Vercel Error 500
  // process.cwd() adalah root proyek Vercel, lalu kita tambahkan path relatif ke API Routes.
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
    
    // MENGGUNAKAN PATH ABSOLUT yang dijamin dikenali oleh runtime Vercel
    apiFolder: apiDirectory, 
    // Menggunakan glob scanner normal untuk mencari file JSDoc
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
