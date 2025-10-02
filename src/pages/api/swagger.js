// src/pages/api/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

export default function handler(req, res) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Rafzhost API",
        version: "1.0.0",
        description: "Dokumentasi API Rafzhost",
      },
      servers: [
        {
          url: "https://api.rafzhost.xyz", // ganti sesuai domain Vercel kamu
        },
      ],
    },
    apis: [
      "./src/pages/api/**/*.js",   // baca semua file endpoint
      "./src/downloader/**/*.js",  // kalau ada JSDoc di helper juga
    ],
  };

  const swaggerSpec = swaggerJsdoc(options);
  res.status(200).json(swaggerSpec);
}
