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
    
  // Pastikan import ini aman
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
    
    // 💥 PATH SCANNER (PALING AMAN):
    // Gunakan folder 'pages/api' sebagai root API.
    apiFolder: 'pages/api', 
    
    // Secara eksplisit panggil semua file API/JSDoc Anda.
    files: [
        'pages/api/**/*.js', 
        'src/**/*.js' // Pindai SEMUA file logic di src, jika logic Anda ada di sana
    ],
  });

  return {
    props: {
      swagger,
    },
  };
}
