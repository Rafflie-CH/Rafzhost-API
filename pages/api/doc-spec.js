// pages/api/doc-spec.js

import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rafzhost API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi REST API untuk Downloader dan Tools.',
    },
    servers: [
      {
        url: '/api', // Ini menargetkan folder /api
      },
    ],
  },
  // Path ke file API Anda
  apiFolder: 'pages/api', 
});

export default swaggerHandler();
