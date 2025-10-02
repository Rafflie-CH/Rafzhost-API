// src/pages/api/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

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
        url: "https://api.rafzhost.xyz/api", // ubah sesuai domain produksi
      },
    ],
  },
  // TELL swagger-jsdoc to scan src/pages/api and src/pages
  apis: ["./src/pages/api/*.js", "./src/pages/**/*.js"],
};

export default function handler(req, res) {
  try {
    const swaggerSpec = swaggerJSDoc(options);
    return res.status(200).json(swaggerSpec);
  } catch (err) {
    return res.status(500).json({ error: "Failed to generate Swagger spec", details: err.message });
  }
}
