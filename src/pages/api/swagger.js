// src/pages/api/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Konfigurasi Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rafzhost API",
      version: "1.0.0",
      description: "Dokumentasi API untuk Rafzhost",
    },
    servers: [
      {
        url: "https://api.rafzhost.xyz", // ganti sesuai domain
      },
    ],
  },
  apis: ["./src/pages/api/**/*.js"], // ambil semua file di api/ untuk swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(swaggerSpec);
}
