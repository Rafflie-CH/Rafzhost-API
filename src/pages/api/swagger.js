import swaggerJSDoc from "swagger-jsdoc";

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
  apis: ['./src/pages/api/**/*.js'], // path relatif, sudah benar
};

const swaggerSpec = swaggerJSDoc(options);

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send(JSON.stringify(swaggerSpec, null, 2));
}
