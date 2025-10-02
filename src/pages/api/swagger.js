// src/pages/api/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

export default function handler(req, res) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Rafzhost API",
        version: "1.0.0",
        description: "Dokumentasi resmi untuk Rafzhost REST API",
      },
      servers: [
        {
          url: "https://api.rafzhost.xyz", // ganti sesuai domain deploy kamu
        },
      ],
    },
    // Ambil semua definisi swagger dari file API
    apis: [
      "./src/pages/api/**/*.js", // semua endpoint API
      "./src/downloader/**/*.js" // kalau ada tambahan swagger di helper
    ],
  };

  try {
    const swaggerSpec = swaggerJsdoc(options);
    res.status(200).json(swaggerSpec);
  } catch (err) {
    console.error("Swagger generation error:", err);
    res.status(500).json({ error: "Gagal generate Swagger docs" });
  }
}
