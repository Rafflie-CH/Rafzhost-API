// src/pages/api/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

// Konfigurasi Swagger
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
    {
      url: "https://api.rafzhost.xyz/api",
      description: "Production server",
    },
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
  ],
};

// Opsi swagger-jsdoc → scan semua file API
const options = {
  definition: swaggerDefinition,
  apis: ["./src/pages/api/**/*.js"], // semua endpoint API (misal tiktok.js, downloader lain, dll)
};

// Buat spesifikasi
const swaggerSpec = swaggerJSDoc(options);

// Handler Next.js API
export default function handler(req, res) {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(swaggerSpec);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
