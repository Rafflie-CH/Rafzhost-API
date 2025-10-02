import fs from 'fs';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Rafzhost API",
    version: "1.0.0",
    description: "📖 Dokumentasi resmi API Rafzhost",
    contact: {
      name: "Rafflie Aditya",
      url: "https://api.rafzhost.xyz",
    },
  },
  servers: [
    { url: "https://api.rafzhost.xyz", description: "Production server" },
    { url: "http://localhost:3000", description: "Local server" },
  ],
};

const options = {
  definition: swaggerDefinition,
  // Baca komentar JSDoc dari folder terpisah, misal src/swagger-docs/**/*.js
  apis: ['./src/swagger-docs/**/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

// Simpan ke file JSON
fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger JSON berhasil digenerate ke swagger.json');
