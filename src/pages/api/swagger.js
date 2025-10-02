// src/pages/api/swagger.js

import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Rafzhost API",
    version: "1.0.0",
    description: "Dokumentasi API Rafzhost menggunakan Swagger UI",
  },
  servers: [
    {
      url: "https://api.rafzhost.xyz/api",
      description: "Server default Vercel",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/pages/api/**/*.js"], // baca semua endpoint dengan swagger comment
};

const swaggerSpec = swaggerJSDoc(options);

export default function handler(req, res) {
  res.status(200).json(swaggerSpec);
}
