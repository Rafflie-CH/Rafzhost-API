const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Rafzhost API Documentation',
    version: '1.0.0',
    description: 'Dokumentasi REST API untuk Downloader dan Tools yang dibangun dengan Next.js API Routes.',
  },
  servers: [
    {
      url: '/api', // Menargetkan semua Next.js API Routes
      description: 'Next.js API Routes Server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Tentukan path ke folder API Routes Anda untuk membaca komentar JSDoc
  apis: ['./pages/api/**/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
