import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rafzhost API",
      version: "1.0.0",
      description: "Dokumentasi API Rafzhost",
    },
  },
  apis: ["./pages/api/*.js"], // Semua endpoint harus ada JSDoc
};

export default function handler(req, res) {
  try {
    const swaggerSpec = swaggerJSDoc(options);
    res.status(200).json(swaggerSpec);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate Swagger spec", details: err.message });
  }
}
