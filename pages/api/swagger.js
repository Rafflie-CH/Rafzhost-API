import { getSwaggerSpec } from "next-swagger-doc";

export default async function handler(req, res) {
  try {
    const swaggerSpec = getSwaggerSpec({
      title: "Rafzhost API",
      version: "1.0.0",
      description: "API documentation for Rafzhost",
      apiFolder: "./pages/api",
      basePath: "/api",
      schemes: ["https"],
    });
    res.status(200).json(swaggerSpec);
  } catch (error) {
    console.error("Swagger generation error:", error);
    res.status(500).json({ error: "Failed to generate Swagger spec" });
  }
}
