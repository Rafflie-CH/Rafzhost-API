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
    {
      url: "https://api.rafzhost.xyz",
      description: "Production server",
    },
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["src/pages/api/**/*.js"], // relatif ke root project
};

const swaggerSpec = swaggerJSDoc(options);

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(swaggerSpec);
}
