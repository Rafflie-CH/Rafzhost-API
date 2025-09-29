import swaggerJSDoc from "swagger-jsdoc";

export default function handler(req, res) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Rafzhost API",
        version: "1.0.0",
        description: "Rafzhost API Documentation",
      },
      servers: [
        { url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000" },
      ],
    },
    apis: ["./pages/api/*.js"], // Semua endpoint
  };

  try {
    const swaggerSpec = swaggerJSDoc(options);
    res.status(200).json(swaggerSpec);
  } catch (err) {
    console.error("Swagger generation error:", err);
    res.status(500).json({ error: "Failed to generate Swagger spec" });
  }
}
