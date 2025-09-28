// swagger.js

// HARUS MENGGUNAKAN require() di lingkungan Node.js/Serverless
const swaggerJSDoc = require('swagger-jsdoc'); 

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Rafzhost API Documentation',
    version: '1.0.0',
    description: 'Dokumentasi REST API untuk Downloader dan Tools.',
  },
  servers: [
    {
      url: '/api', // Ini menargetkan folder /api di Next.js
      description: 'Next.js API Routes',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Tentukan path ke folder API Anda untuk membaca komentar JSDoc
  apis: ['./pages/api/**/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

// HARUS MENGGUNAKAN module.exports untuk Next.js
module.exports = swaggerSpec;
